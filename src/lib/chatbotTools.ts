import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { supabase } from "@/lib/supabase";

/** 챗봇 검색 결과 카드용 (OpenAIChatbot에서 사용) */
export interface SearchResultItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  code?: string;
  category?: string;
  stock?: number | null;
}

/** 챗봇에서 사용할 현재 사용자 이메일 전역 변수 */
export let currentUserEmail: string | null = null;

/** 챗봇에서 사용할 현재 사용자 ID 전역 변수 */
export let currentUserId: string | null = null;

/** 챗봇에서 사용할 현재 사용자 이름 전역 변수 */
export let currentUserName: string | null = null;

/**
 * currentUserEmail과 currentUserId, currentUserName을 설정하는 함수
 */
export function setCurrentUserEmail(email: string | null, userId?: string | null, userName?: string | null): void {
  currentUserEmail = email;
  currentUserId = userId || null;
  currentUserName = userName || null;
  if (email) {
    console.log(`로그인 정보 업데이트: ${email} (ID: ${userId || '없음'}, 이름: ${userName || '없음'})`);
  } else {
    console.log("로그인 정보 없음");
  }
}

/** 최근 search_products 검색 결과 (번호 선택용) */
export let lastSearchResults: SearchResultItem[] = [];

/**
 * 챗봇 시작 시 로그인 정보를 확인하는 함수
 * 확인 순서: localStorage → sessionStorage → Supabase Auth 세션
 */
export async function checkUserLogin(): Promise<void> {
  let email: string | null = null;

  // 1. localStorage에서 user 또는 userInfo 찾기
  try {
    const localUser = localStorage.getItem("user");
    const localUserInfo = localStorage.getItem("userInfo");

    if (localUser) {
      try {
        const parsed = JSON.parse(localUser);
        email = parsed?.email || parsed?.user?.email || null;
      } catch {
        // JSON 파싱 실패 시 무시
      }
    }

    if (!email && localUserInfo) {
      try {
        const parsed = JSON.parse(localUserInfo);
        email = parsed?.email || parsed?.user?.email || null;
      } catch {
        // JSON 파싱 실패 시 무시
      }
    }
  } catch {
    // localStorage 접근 실패 시 무시
  }

  // 2. sessionStorage에서 user 또는 userInfo 찾기
  if (!email) {
    try {
      const sessionUser = sessionStorage.getItem("user");
      const sessionUserInfo = sessionStorage.getItem("userInfo");

      if (sessionUser) {
        try {
          const parsed = JSON.parse(sessionUser);
          email = parsed?.email || parsed?.user?.email || null;
        } catch {
          // JSON 파싱 실패 시 무시
        }
      }

      if (!email && sessionUserInfo) {
        try {
          const parsed = JSON.parse(sessionUserInfo);
          email = parsed?.email || parsed?.user?.email || null;
        } catch {
          // JSON 파싱 실패 시 무시
        }
      }
    } catch {
      // sessionStorage 접근 실패 시 무시
    }
  }

  // 3. Supabase Auth 세션에서 user.email과 user.id 찾기
  let userId: string | null = null;
  let userName: string | null = null;
  if (!email) {
    try {
      const { data } = await supabase.auth.getSession();
      email = data?.session?.user?.email || null;
      userId = data?.session?.user?.id || null;
      userName = data?.session?.user?.user_metadata?.name || null;
    } catch {
      // Supabase 세션 조회 실패 시 무시
    }
  } else {
    // 이메일이 이미 있으면 Supabase 세션에서 user.id만 가져오기
    try {
      const { data } = await supabase.auth.getSession();
      userId = data?.session?.user?.id || null;
      userName = data?.session?.user?.user_metadata?.name || null;
    } catch {
      // 무시
    }
  }

  // 이메일과 사용자 ID를 찾으면 저장하고 콘솔 출력
  setCurrentUserEmail(email, userId, userName);
}

/** OpenAI Function Calling용 도구 정의 */
export const CHATBOT_TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "search_products",
      description:
        "사용자가 말한 상품 이름이나 검색어로 Supabase 'products' 테이블에서 상품을 검색합니다. 사용자가 특정 상품 이름을 말하거나 'OO 검색해줘', 'OO 있는지 찾아줘'처럼 상품 검색을 요청할 때 이 함수를 사용하세요.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "사용자가 말한 상품 이름 또는 검색어",
          },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_products",
      description:
        "제품 **목록**을 조회할 때만 사용합니다. 추천/골라줘 요청은 get_recommendations를 사용하세요. 카테고리(Land/Sea/Air)나 검색어로 필터링 가능하며, 조건 없이 전체를 요청해도 일부만 반환됩니다.",
      parameters: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: ["Land", "Sea", "Air"],
            description: "제품 카테고리 (Land: 육상, Sea: 해상, Air: 공중)",
          },
          search: {
            type: "string",
            description: "제품명/설명 검색어 (선택)",
          },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_recommendations",
      description:
        "상품 추천 요청 시 **반드시 이 함수를 사용**합니다. 사용자가 '추천해줘', '상품 추천', '뭐 살만해?', '골라줘', '전체에서 골라줘' 등이라고 하면 **카테고리를 묻지 말고** 바로 이 함수를 호출하세요. category는 선택사항이며, 사용자가 육상/해상/공중을 직접 말했을 때만 넣고, 아니면 생략하면 전체에서 랜덤 3개를 반환합니다. 전체 목록이 아닌 **3개만** 반환합니다.",
      parameters: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: ["Land", "Sea", "Air"],
            description: "선택사항. 추천 범위를 이 카테고리로 한정할 때만 사용 (Land: 육상, Sea: 해상, Air: 공중)",
          },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "check_stock",
      description:
        "특정 상품의 재고 또는 남은 수량을 확인할 때 **반드시 이 함수를 사용**합니다. 사용자가 '재고 있어?', '남은 수량 알려줘', '몇 개 있어?', '재고 확인해줘', '품절이야?', 'OO 재고', 'OO 남은 개수' 등 재고·남은 수량을 물어보면 이 함수를 호출하세요. 상품 이름을 인자로 넘기면 해당 상품의 재고만 반환합니다.",
      parameters: {
        type: "object",
        properties: {
          product_name: {
            type: "string",
            description: "재고(남은 수량)를 확인할 상품 이름. 사용자가 말한 상품명을 그대로 사용합니다.",
          },
        },
        required: ["product_name"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_product_details",
      description:
        "상품의 **상세정보**나 **자세히 보기**를 요청할 때 **반드시 이 함수를 사용**합니다. 사용자가 '상세정보 알려줘', '자세히 보여줘', '이 상품 자세히', 'O번 상품 상세보기', '상세 조회', '전체 정보 보여줘' 등 상세정보·자세히 보기를 요청하면 이 함수를 호출하세요. product_id에는 lastSearchResults에서 해당 상품의 id를 넘깁니다. 이미지, 이름, 가격, 재고, 설명 전체를 보여주고 하단에 주문 안내를 추가합니다.",
      parameters: {
        type: "object",
        properties: {
          product_id: {
            type: "string",
            description: "상품 ID (products 테이블의 id, 또는 lastSearchResults에서 조회한 상품의 id)",
          },
        },
        required: ["product_id"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_current_time",
      description:
        "현재 날짜와 시간을 가져옵니다. 사용자가 '지금 몇 시', '오늘 날짜', '현재 시간' 등을 물을 때 사용하세요.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_site_pages",
      description:
        "사이트 내 페이지(홈, 제품목록, 장바구니, 구매, 마이페이지 등) 경로와 설명을 반환합니다. 사용자가 특정 페이지로 가고 싶어할 때 사용하세요.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "create_order",
      description: "상품을 주문하고 결제를 진행합니다.",
      parameters: {
        type: "object",
        properties: {
          product_id: {
            type: "number",
            description: "상품 번호 (1번 = 0, 2번 = 1, ...). lastSearchResults 배열의 인덱스입니다.",
          },
          quantity: {
            type: "number",
            description: "주문 수량",
          },
          customer_email: {
            type: "string",
            description: "고객 이메일 (선택사항, 없으면 currentUserEmail 사용)",
          },
          customer_name: {
            type: "string",
            description: "고객 이름 (선택사항, customers 테이블에 없을 때만 사용)",
          },
        },
        required: [],
      },
    },
  },
];

type ToolName = "search_products" | "get_products" | "get_recommendations" | "check_stock" | "get_product_details" | "get_current_time" | "get_site_pages" | "create_order";

interface GetProductsArgs {
  category?: "Land" | "Sea" | "Air";
  search?: string;
}

interface CheckStockArgs {
  product_name: string;
}

interface GetProductDetailsArgs {
  product_id: string;
}

interface GetRecommendationsArgs {
  category?: "Land" | "Sea" | "Air";
}

interface SearchProductsArgs {
  query: string;
}

interface CreateOrderArgs {
  product_id?: number;
  quantity?: number;
  customer_email?: string;
  customer_name?: string;
}

interface PaymentParams {
  amount: number;
  orderName: string;
  customerName: string;
  customerEmail: string;
}

interface PaymentResult {
  success: boolean;
  message?: string;
}

// 결제 위젯을 표시하기 위한 콜백 함수 타입
type PaymentWidgetCallback = (params: PaymentParams) => Promise<PaymentResult>;

// 결제 위젯 콜백 함수 (외부에서 설정)
let paymentWidgetCallback: PaymentWidgetCallback | null = null;

/**
 * 결제 위젯 콜백 함수를 설정하는 함수
 * OpenAIChatbot 컴포넌트에서 결제 위젯을 표시하고 결과를 반환하는 함수를 등록
 */
export function setPaymentWidgetCallback(callback: PaymentWidgetCallback | null): void {
  paymentWidgetCallback = callback;
}

/**
 * products 테이블에서 상품을 랜덤으로 3개 추천합니다.
 * @param category 선택사항. 있으면 해당 카테고리 내에서, 없으면 전체에서 랜덤 추출
 * @returns 최대 3개의 SearchResultItem 배열
 */
export async function get_recommendations(
  category?: "Land" | "Sea" | "Air"
): Promise<SearchResultItem[]> {
  let query = supabase.from("products").select("*");
  if (category) {
    query = query.eq("category", category);
  }
  const { data, error } = await query;
  if (error) {
    console.error("[get_recommendations] Supabase 오류:", error);
    return [];
  }
  if (!data || data.length === 0) return [];

  // Fisher–Yates 셔플 후 상위 3개
  const shuffled = [...data];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const three = shuffled.slice(0, 3);

  return three.map((row: Record<string, unknown>) => ({
    id: row.id,
    code: row.code,
    name: row.name,
    category: row.category,
    price: row.price,
    imageUrl: row.image_url ?? row.imageUrl ?? null,
    stock: row.stock ?? 100,
    description:
      typeof row.description === "string"
        ? row.description.slice(0, 150) + (row.description.length > 150 ? "..." : "")
        : row.description,
  })) as SearchResultItem[];
}

/**
 * 결제 처리 함수
 * paymentWidgetCallback이 설정되어 있으면 실제 토스페이먼츠 위젯 사용
 * 없으면 시뮬레이션으로 처리
 */
async function processPayment(params: PaymentParams): Promise<PaymentResult> {
  const { amount, orderName, customerName, customerEmail } = params;

  // 결제 위젯 콜백이 있으면 실제 결제 위젯 사용
  if (paymentWidgetCallback) {
    console.log("[processPayment] 토스페이먼츠 결제 위젯 호출");
    return await paymentWidgetCallback(params);
  }

  // 시뮬레이션: 간단한 지연 후 성공 처리 (개발용)
  console.log("[processPayment] 시뮬레이션 모드 (결제 위젯 미설정)");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "결제가 완료되었습니다",
  };
}

/** 도구 이름에 맞는 함수 실행 후 결과 문자열 반환 */
export async function runChatbotTool(
  name: ToolName,
  args: Record<string, unknown>
): Promise<string> {
  switch (name) {
    case "search_products": {
      const { query } = args as SearchProductsArgs;
      const q = (query ?? "").toString().trim();

      console.log("[search_products] 검색어:", q);
      console.log("[search_products] products 테이블에서 검색 시작");

      if (!q) {
        return JSON.stringify({ error: "검색어를 입력해 주세요.", results: [] });
      }
      const pattern = `%${q}%`;

      console.log("[search_products] 검색 패턴:", pattern);
      console.log("[search_products] 쿼리: products 테이블에서 name, description, code로 검색");

      // 먼저 전체 데이터 개수 확인 (RLS 정책 테스트)
      const { count: totalCount, error: countError } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      console.log("[search_products] 전체 상품 개수 (RLS 테스트):", totalCount);
      if (countError) {
        console.error("[search_products] 전체 개수 조회 오류:", countError);
      }

      // 실제 검색 쿼리 실행
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, category, code, image_url")
        .or(`name.ilike.${pattern},description.ilike.${pattern},code.ilike.${pattern}`);

      if (error) {
        console.error("[search_products] Supabase 오류:", error);
        console.error("[search_products] 오류 코드:", error.code);
        console.error("[search_products] 오류 메시지:", error.message);
        console.error("[search_products] 오류 상세:", error.details);
        console.error("[search_products] 오류 힌트:", error.hint);
        return JSON.stringify({
          error: error.message,
          hint: "Supabase 'products' 테이블이 없거나 컬럼이 다를 수 있습니다. RLS 정책을 확인하세요.",
          results: [],
        });
      }

      console.log("[search_products] 조회 결과:", { count: data?.length || 0 });
      console.log("[search_products] 전체 데이터:", data);
      if (data && data.length > 0) {
        console.log("[search_products] 첫 번째 결과:", data[0]);
      } else {
        console.warn("[search_products] ⚠️ 검색 결과가 0개입니다!");
        console.warn("[search_products] 가능한 원인:");
        console.warn("  1. RLS 정책이 데이터 접근을 차단하고 있음");
        console.warn("  2. 실제로 검색어에 맞는 데이터가 없음");
        console.warn("  3. 테이블에 데이터가 없음");

        // 전체 데이터 조회 시도 (필터 없이)
        const { data: allData, error: allError } = await supabase
          .from("products")
          .select("id, name, category")
          .limit(5);

        console.log("[search_products] 전체 데이터 조회 테스트:", { count: allData?.length || 0, error: allError });
        if (allData && allData.length > 0) {
          console.log("[search_products] 전체 데이터 샘플:", allData);
        }
      }

      if (!data?.length) {
        // 검색 결과가 없으면 lastSearchResults를 비웁니다.
        lastSearchResults = [];
        return JSON.stringify({
          message: "조건에 맞는 상품이 없습니다.",
          results: [],
        });
      }
      const results = data.map((row: Record<string, unknown>) => ({
        id: row.id,
        code: row.code,
        name: row.name,
        category: row.category,
        price: row.price,
        imageUrl: row.image_url ?? row.imageUrl ?? null,
        stock: row.stock ?? 100, // stock이 없으면 기본값 100
        description:
          typeof row.description === "string"
            ? row.description.slice(0, 150) + (row.description.length > 150 ? "..." : "")
            : row.description,
      })) as SearchResultItem[];

      // 마지막 검색 결과를 전역 변수에 저장 (번호 선택용)
      lastSearchResults = results;

      return JSON.stringify({ count: results.length, results }, null, 2);
    }
    case "get_products": {
      const { category, search } = args as GetProductsArgs;

      console.log("[get_products] 요청 파라미터:", { category, search });

      // Supabase에서 상품 조회
      // stock 컬럼이 없을 수 있으므로 먼저 기본 컬럼만 조회
      let query = supabase.from("products").select("*");

      // RLS 정책 문제를 확인하기 위해 먼저 간단한 쿼리 테스트
      const testQuery = supabase.from("products").select("id").limit(1);
      const { data: testData, error: testError } = await testQuery;

      if (testError) {
        console.error("[get_products] 테스트 쿼리 오류:", testError);
        console.error("[get_products] 오류 코드:", testError.code);
        console.error("[get_products] 오류 메시지:", testError.message);
        console.error("[get_products] 오류 상세:", testError.details);
        console.error("[get_products] 오류 힌트:", testError.hint);
      } else {
        console.log("[get_products] 테스트 쿼리 성공, 데이터 개수:", testData?.length || 0);
      }

      if (category) {
        console.log("[get_products] 카테고리 필터 적용:", category);
        query = query.eq("category", category);
      }

      if (search && search.trim()) {
        const q = search.trim();
        const pattern = `%${q}%`;
        console.log("[get_products] 검색어 필터 적용:", q);
        query = query.or(`name.ilike.${pattern},description.ilike.${pattern},code.ilike.${pattern}`);
      }

      // 카테고리·검색 조건 없이 전체 조회일 때는 개수 제한 (전체 물품이 다 나오지 않도록)
      if (!category && !(search && search.trim())) {
        query = query.limit(20);
      }

      const { data, error } = await query;

      if (error) {
        console.error("[get_products] Supabase 오류:", error);
        console.error("[get_products] 오류 코드:", error.code);
        console.error("[get_products] 오류 메시지:", error.message);
        console.error("[get_products] 오류 상세:", error.details);
        console.error("[get_products] 오류 힌트:", error.hint);
        return JSON.stringify({
          error: error.message,
          hint: "Supabase 'products' 테이블이 없거나 컬럼이 다를 수 있습니다. RLS 정책을 확인하세요.",
          code: error.code,
          details: error.details,
          results: [],
        });
      }

      console.log("[get_products] 조회 결과:", { count: data?.length || 0, data });

      if (!data || data.length === 0) {
        lastSearchResults = [];
        return JSON.stringify({
          message: category
            ? `${category} 카테고리에 조건에 맞는 제품이 없습니다.`
            : "조건에 맞는 제품이 없습니다.",
          results: [],
        });
      }

      // SearchResultItem 형식으로 변환
      const results = data.map((row: Record<string, unknown>) => ({
        id: row.id,
        code: row.code,
        name: row.name,
        category: row.category,
        price: row.price,
        imageUrl: row.image_url ?? row.imageUrl ?? null,
        stock: row.stock ?? 100, // stock이 없으면 기본값 100
        description:
          typeof row.description === "string"
            ? row.description.slice(0, 150) + (row.description.length > 150 ? "..." : "")
            : row.description,
      })) as SearchResultItem[];

      // 마지막 검색 결과를 전역 변수에 저장 (번호 선택용)
      lastSearchResults = results;

      return JSON.stringify({ count: results.length, results }, null, 2);
    }
    case "get_recommendations": {
      const { category } = args as GetRecommendationsArgs;
      const results = await get_recommendations(category);
      lastSearchResults = results;
      return JSON.stringify(
        {
          count: results.length,
          results,
          message:
            results.length > 0
              ? `추천 상품 ${results.length}건입니다. 번호로 주문할 수 있습니다.`
              : "추천할 수 있는 상품이 없습니다.",
        },
        null,
        2
      );
    }
    case "check_stock": {
      const { product_name } = args as CheckStockArgs;
      const name = (product_name ?? "").toString().trim();
      if (!name) {
        return JSON.stringify({ message: "상품 이름을 알려주세요." });
      }
      const pattern = `%${name}%`;
      const { data, error } = await supabase
        .from("products")
        .select("name, stock")
        .ilike("name", pattern)
        .limit(1);

      if (error) {
        console.error("[check_stock] Supabase 오류:", error);
        return JSON.stringify({ message: "재고 확인 중 오류가 발생했습니다." });
      }
      const row = data?.[0] as { name?: string; stock?: number | null } | undefined;
      if (!row) {
        return JSON.stringify({ message: `'${name}'에 해당하는 상품을 찾을 수 없습니다.` });
      }
      const displayName = row.name ?? name;
      const stock = row.stock;
      const message =
        stock !== null && stock !== undefined && Number(stock) > 0
          ? `${displayName}: 재고 ${Number(stock)}개`
          : `${displayName}: 품절`;
      return JSON.stringify({ message });
    }
    case "get_product_details": {
      const { product_id } = args as GetProductDetailsArgs;
      const id = (product_id ?? "").toString().trim();
      if (!id) {
        return JSON.stringify({ message: "상품 ID를 알려주세요.", results: [] });
      }
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .limit(1)
        .single();

      if (error || !data) {
        console.error("[get_product_details] Supabase 오류:", error);
        return JSON.stringify({
          message: "해당 상품을 찾을 수 없습니다.",
          results: [],
        });
      }

      const row = data as Record<string, unknown>;
      const description = typeof row.description === "string" ? row.description : "";
      const price = Number(row.price) ?? 0;
      const stock = row.stock !== null && row.stock !== undefined ? Number(row.stock) : null;
      const name = typeof row.name === "string" ? row.name : String(row.name ?? "");

      const item: SearchResultItem = {
        id: String(row.id),
        code: row.code != null ? String(row.code) : undefined,
        name,
        category: row.category != null ? String(row.category) : undefined,
        price,
        imageUrl: row.image_url ?? row.imageUrl ?? null,
        stock: stock ?? undefined,
        description,
      };

      const formattedPrice = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
      const stockText = stock !== null && stock > 0 ? `${stock}개` : "품절";
      const detailMessage = `${name}\n\n${description}\n\n가격: ${formattedPrice}\n재고: ${stockText}\n\n주문하시겠어요?`;

      lastSearchResults = [item];
      return JSON.stringify({
        results: [item],
        message: detailMessage,
      });
    }
    case "get_current_time": {
      const now = new Date();
      return Promise.resolve(
        JSON.stringify({
          iso: now.toISOString(),
          locale: now.toLocaleString("ko-KR", {
            dateStyle: "full",
            timeStyle: "medium",
          }),
          date: now.toLocaleDateString("ko-KR"),
          time: now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        })
      );
    }
    case "get_site_pages": {
      const pages = [
        { path: "/", name: "홈", description: "메인 페이지" },
        { path: "/products", name: "제품 목록", description: "전체 제품 보기" },
        { path: "/product/:id", name: "제품 상세", description: "제품 ID로 상세 페이지 (예: /product/1)" },
        { path: "/cart", name: "장바구니", description: "장바구니 확인" },
        { path: "/purchase", name: "구매", description: "결제/구매 진행" },
        { path: "/mypage", name: "마이페이지", description: "내 정보 및 주문" },
      ];
      return Promise.resolve(JSON.stringify(pages, null, 2));
    }
    case "create_order": {
      const { product_id, quantity, customer_email, customer_name } = args as CreateOrderArgs;

      console.log("[create_order] 요청 파라미터:", { product_id, quantity, customer_email, customer_name });
      console.log("[create_order] currentUserEmail:", currentUserEmail);
      console.log("[create_order] currentUserId:", currentUserId);

      // --- 로그인 필수 체크 ---
      if (!currentUserEmail || !currentUserId) {
        return JSON.stringify({
          error: "로그인이 필요합니다",
          message: "상품을 주문하시려면 먼저 로그인을 해주세요.",
          requires_login: true,
        });
      }

      // 1. 이메일 결정: 로그인된 사용자 이메일 우선 사용 (customer_email이 있어도 무시하고 currentUserEmail 사용)
      const email = currentUserEmail;

      console.log("[create_order] 결정된 이메일:", email);

      // 2. 이메일이 없으면 에러 반환
      if (!email) {
        return JSON.stringify({
          error: "이메일을 알려주세요",
          message: "주문을 진행하려면 이메일이 필요합니다.",
        });
      }

      // 3. customers 테이블에서 이메일로 조회 (이름이 없는 경우에만)
      let customerData: { name?: string; email?: string } | null = null;

      if (!currentUserName) {
        try {
          console.log("[create_order] customers 테이블 조회 시작:", email);
          const { data, error } = await supabase
            .from("customers")
            .select("name, email")
            .eq("email", email)
            .single();

          if (error) {
            if (error.code === "PGRST116") {
              // PGRST116은 "no rows returned" 에러, 이건 정상 (고객이 없는 경우)
              console.log("[create_order] 고객 정보 없음 (새 고객)");
            } else {
              console.error("[create_order] customers 테이블 조회 오류:", error);
            }
          } else if (data) {
            customerData = data;
            console.log("[create_order] 기존 고객 정보 찾음:", customerData);
          }
        } catch (err) {
          console.error("[create_order] customers 테이블 조회 중 예외:", err);
        }
      } else {
        console.log("[create_order] 로그인된 사용자 이름 존재, customers 테이블 조회 생략");
      }

      // 4. 이름 결정: 로그인 유저 이름, 없으면 customers에서 찾은 이름, 없으면 customer_name
      const name = currentUserName || customerData?.name || customer_name?.trim();

      console.log("[create_order] 결정된 이름:", name);
      console.log("[create_order] currentUserName:", currentUserName);
      console.log("[create_order] customer_name:", customer_name);

      // 5. 이름도 없으면 에러 반환
      if (!name) {
        return JSON.stringify({
          error: "이름을 알 수 없습니다",
          message: "문제가 발생했습니다. 프로필 이름이 설정되어 있는지 확인해주세요.",
        });
      }

      // 여기까지 고객 정보 확인 완료
      console.log("[create_order] 고객 정보 확인 완료:", { email, name });

      // 6. product_id로 products 테이블 조회
      // product_id는 lastSearchResults 배열의 인덱스 (0부터 시작)
      if (product_id === undefined || product_id === null) {
        return JSON.stringify({
          error: "상품 번호를 알려주세요",
          message: "어떤 상품을 주문하시겠어요? (예: 1번, 2번)",
        });
      }

      // lastSearchResults에서 상품 선택
      if (!lastSearchResults || lastSearchResults.length === 0) {
        return JSON.stringify({
          error: "먼저 상품을 검색해주세요",
          message: "주문하기 전에 상품을 검색해주세요.",
        });
      }

      if (product_id < 0 || product_id >= lastSearchResults.length) {
        return JSON.stringify({
          error: "유효하지 않은 상품 번호입니다",
          message: `검색 결과에 ${product_id + 1}번 상품이 없습니다.`,
        });
      }

      const selectedProduct = lastSearchResults[product_id];
      const actualProductId = selectedProduct.id;

      console.log("[create_order] 선택된 상품:", { product_id, actualProductId, selectedProduct });

      // products 테이블에서 상품 정보 조회
      let productData: { id: string; name: string; price: number; stock: number | null } | null = null;
      try {
        console.log("[create_order] products 테이블 조회 시작:", actualProductId);
        const { data, error } = await supabase
          .from("products")
          .select("id, name, price, stock")
          .eq("id", actualProductId)
          .single();

        if (error) {
          if (error.code === "PGRST116") {
            // 상품을 찾을 수 없음
            console.error("[create_order] 상품을 찾을 수 없음:", actualProductId);
            return JSON.stringify({
              error: "상품을 찾을 수 없어요",
              message: `상품 ID ${actualProductId}를 찾을 수 없습니다.`,
            });
          }
          console.error("[create_order] products 테이블 조회 오류:", error);
          return JSON.stringify({
            error: "상품 조회 중 오류가 발생했습니다",
            message: error.message,
          });
        }

        if (data) {
          productData = data;
          console.log("[create_order] 상품 정보 조회 완료:", productData);
        }
      } catch (err) {
        console.error("[create_order] products 테이블 조회 중 예외:", err);
        return JSON.stringify({
          error: "상품 조회 중 오류가 발생했습니다",
          message: err instanceof Error ? err.message : "알 수 없는 오류",
        });
      }

      // 7. 상품 없으면 에러
      if (!productData) {
        return JSON.stringify({
          error: "상품을 찾을 수 없어요",
          message: `상품 ID ${actualProductId}를 찾을 수 없습니다.`,
        });
      }

      // quantity가 없으면 기본값 1로 설정
      const orderQuantity = quantity ?? 1;
      console.log("[create_order] 주문 수량:", orderQuantity);

      // 8. 재고 확인: product.stock < quantity 이면 에러
      if (productData.stock !== null && productData.stock < orderQuantity) {
        return JSON.stringify({
          error: "재고가 부족해요",
          message: `현재 재고: ${productData.stock}개 (주문 수량: ${orderQuantity}개)`,
          current_stock: productData.stock,
          requested_quantity: orderQuantity,
        });
      }

      // 9. 총 금액 계산: product.price * quantity
      const totalPrice = Number(productData.price) * orderQuantity;
      console.log("[create_order] 총 금액 계산:", { price: productData.price, quantity: orderQuantity, totalPrice });

      // 주문 정보 객체 만들기
      const orderInfo = {
        customer_name: name,
        customer_email: email,
        product_id: productData.id,
        product_name: productData.name,
        quantity: orderQuantity,
        total_price: totalPrice,
        status: "pending" as const,
      };

      console.log("[create_order] 주문 정보 객체 생성 완료:", orderInfo);

      // 결제 정보를 임시 저장 (결제 성공 후 주문 저장용)
      const pendingOrderInfo = {
        customer_name: name,
        customer_email: email,
        product_id: productData.id,
        product_name: productData.name,
        quantity: orderQuantity,
        total_price: totalPrice,
      };

      // 결제 정보를 localStorage에 저장 (결제 성공 페이지에서 사용)
      localStorage.setItem("pendingOrderInfo", JSON.stringify(pendingOrderInfo));

      // 결제 진행
      console.log("[create_order] 결제 시작:", {
        amount: totalPrice,
        orderName: `${productData.name} ${orderQuantity}개`,
        customerName: name,
        customerEmail: email,
      });

      try {
        // 2. 결제 함수 호출 (바로 결제창 열기)
        const paymentResult = await processPayment({
          amount: totalPrice,
          orderName: `${productData.name} ${orderQuantity}개`,
          customerName: name,
          customerEmail: email,
        });

        console.log("[create_order] 결제 결과:", paymentResult);

        // 3. 결제 성공하면 - 주문 정보는 PaymentSuccess 페이지에서 저장됨
        if (paymentResult.success) {
          // 결제 성공 - 주문 정보는 PaymentSuccess 페이지에서 저장됨
          // 여기서는 성공 메시지만 반환
          return JSON.stringify({
            success: true,
            message: "결제 화면으로 이동합니다.",
            redirect: true,
          });
        } else {
          // 4. 결제 실패하면
          // 주문 저장 안 함
          localStorage.removeItem("pendingOrderInfo");
          return JSON.stringify({
            error: "결제가 취소되었습니다",
            message: paymentResult.message || "결제가 취소되었습니다",
          });
        }
      } catch (paymentError) {
        console.error("[create_order] 결제 처리 중 오류:", paymentError);
        localStorage.removeItem("pendingOrderInfo");
        return JSON.stringify({
          error: "결제 처리 중 오류가 발생했습니다",
          message: paymentError instanceof Error ? paymentError.message : "알 수 없는 오류",
        });
      }
    }
    default:
      return Promise.resolve(JSON.stringify({ error: `Unknown tool: ${name}` }));
  }
}
