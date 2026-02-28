import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { CHATBOT_TOOLS, runChatbotTool, checkUserLogin, currentUserEmail, setCurrentUserEmail, setPaymentWidgetCallback } from "@/lib/chatbotTools";
import type { SearchResultItem } from "@/lib/chatbotTools";
import SearchResultCard from "@/components/SearchResultCard";
import { supabase } from "@/lib/supabase";
import TossPaymentWidget from "@/components/TossPaymentWidget";

// 개발 시 Vite 프록시(/api/openai) 사용 → CORS 없음, API 키 서버에만 유지
const OPENAI_API_URL = "/api/openai/v1/chat/completions";
const MODEL = "gpt-4o-mini";
const MAX_TOOL_ROUNDS = 5;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  searchResults?: SearchResultItem[];
  /** 추천 결과일 때 카드 위에 표시할 멘트 (예: "이런 상품 어떠세요?") */
  recommendationTitle?: string;
}

// API 요청/응답용 타입 (Function Calling)
type ApiMessage =
  | { role: "system"; content: string }
  | { role: "user"; content: string }
  | { role: "assistant"; content: string | null; tool_calls?: ApiToolCall[] }
  | { role: "tool"; content: string; tool_call_id: string };
interface ApiToolCall {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
}

const prompts: Record<string, { title: string; placeholder: string; welcome: string }> = {
  ko: {
    title: "챗봇",
    placeholder: "메시지를 입력하세요...",
    welcome: "안녕하세요! 무엇을 도와드릴까요?",
  },
  en: {
    title: "Chatbot",
    placeholder: "Type a message...",
    welcome: "Hello! How can I help you?",
  },
  "zh-CN": {
    title: "聊天",
    placeholder: "输入消息...",
    welcome: "你好！有什么可以帮您？",
  },
  "zh-TW": {
    title: "聊天",
    placeholder: "輸入訊息...",
    welcome: "你好！有什麼可以幫您？",
  },
  ja: {
    title: "チャット",
    placeholder: "メッセージを入力...",
    welcome: "こんにちは！何かお手伝いしましょうか？",
  },
  de: { title: "Chat", placeholder: "Nachricht eingeben...", welcome: "Hallo! Wie kann ich helfen?" },
  fr: { title: "Chat", placeholder: "Écrivez un message...", welcome: "Bonjour ! Comment puis-je vous aider ?" },
  es: { title: "Chat", placeholder: "Escribe un mensaje...", welcome: "¡Hola! ¿En qué puedo ayudarte?" },
  ru: { title: "Чат", placeholder: "Введите сообщение...", welcome: "Здравствуйте! Чем могу помочь?" },
};

export default function OpenAIChatbot() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(crypto.randomUUID());

  // 결제 위젯 상태
  const [paymentWidgetOpen, setPaymentWidgetOpen] = useState(false);
  const [paymentParams, setPaymentParams] = useState<{
    amount: number;
    orderName: string;
    customerName: string;
    customerEmail: string;
  } | null>(null);
  const paymentResolveRef = useRef<((result: { success: boolean; message?: string }) => void) | null>(null);

  const t = prompts[language] ?? prompts.en;

  // 로그인 정보 확인 (컴포넌트 마운트 시 한 번만)
  useEffect(() => {
    // AuthContext의 user가 있으면 바로 사용, 없으면 checkUserLogin 호출
    if (user?.email) {
      setCurrentUserEmail(user.email, user.id, user.name);
    } else {
      checkUserLogin();
    }
  }, []);

  // AuthContext의 user가 변경될 때마다 currentUserEmail 업데이트
  useEffect(() => {
    if (user?.email) {
      // AuthContext에서 직접 이메일과 ID, 이름을 가져와서 업데이트
      setCurrentUserEmail(user.email, user.id, user.name);
    } else {
      // 로그아웃 시에만 다시 확인
      checkUserLogin();
    }
  }, [user]);

  // 챗봇이 열릴 때 채팅 내역 불러오기 (로그인 정보는 이미 확인됨)
  useEffect(() => {
    if (open) {
      loadChatHistory();
    }
  }, [open]);

  // 결제 위젯 콜백 등록
  useEffect(() => {
    setPaymentWidgetCallback(async (params) => {
      return new Promise((resolve) => {
        paymentResolveRef.current = resolve;
        setPaymentParams(params);
        setPaymentWidgetOpen(true);
      });
    });

    return () => {
      setPaymentWidgetCallback(null);
    };
  }, []);

  // 채팅 내역 불러오기
  const loadChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("session_id", sessionIdRef.current)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("채팅 내역 불러오기 오류:", error);
        return;
      }

      if (data && data.length > 0) {
        const loadedMessages: Message[] = data
          .filter((msg) => msg.role === "user" || msg.role === "assistant")
          .map((msg) => {
            const base: Message = {
              id: msg.id,
              role: msg.role as "user" | "assistant",
              content: msg.content,
            };
            const searchResults = msg.search_results as SearchResultItem[] | null | undefined;
            const recommendationTitle = msg.recommendation_title as string | null | undefined;
            if (Array.isArray(searchResults) && searchResults.length > 0) {
              base.searchResults = searchResults;
              if (recommendationTitle) base.recommendationTitle = recommendationTitle;
            }
            return base;
          });
        setMessages(loadedMessages);
      }
    } catch (err) {
      console.error("채팅 내역 불러오기 중 예외:", err);
    }
  };

  // 채팅 메시지 DB에 저장 (assistant 메시지에 검색/추천 결과가 있으면 함께 저장해 재진입 시 카드 복원)
  const saveChatMessage = async (
    role: "user" | "assistant",
    content: string,
    extra?: { searchResults?: SearchResultItem[]; recommendationTitle?: string }
  ) => {
    try {
      const userEmail = currentUserEmail || user?.email || null;

      // 채팅 세션 생성/업데이트
      const { error: sessionError } = await supabase.from("chat_sessions").upsert(
        {
          session_id: sessionIdRef.current,
          user_email: userEmail,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "session_id" }
      );

      if (sessionError) {
        console.error("채팅 세션 저장 오류:", sessionError);
        console.error("세션 데이터:", { session_id: sessionIdRef.current, user_email: userEmail });
      }

      const payload: Record<string, unknown> = {
        session_id: sessionIdRef.current,
        user_email: userEmail,
        role,
        content,
      };
      if (role === "assistant" && extra?.searchResults?.length) {
        payload.search_results = extra.searchResults;
        if (extra.recommendationTitle) payload.recommendation_title = extra.recommendationTitle;
      }

      const { error: messageError } = await supabase.from("chat_messages").insert(payload);

      if (messageError) {
        console.error("채팅 메시지 저장 오류:", messageError);
        console.error("메시지 데이터:", { session_id: sessionIdRef.current, role, content: content.substring(0, 50) });
      }
    } catch (err) {
      console.error("채팅 메시지 저장 중 예외:", err);
      // 저장 실패해도 채팅은 계속 진행
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**
   * currentUserEmail 값에 따라 시스템 프롬프트를 동적으로 생성
   */
  function getSystemPrompt(): string {
    let basePrompt = "";

    if (currentUserEmail) {
      // 로그인 상태
      basePrompt = `사용자 이메일은 이미 확인되었습니다: ${currentUserEmail}
이메일을 다시 묻지 마세요.
customers 테이블에 이 이메일이 없으면 이름만 물어보세요.`;
    } else {
      // 비로그인 상태
      basePrompt = `사용자는 현재 로그인되어 있지 않습니다! 
로그인하지 않으면 상품을 주문하거나 결제할 수 없습니다. 
사용자가 주문이나 결제를 요청하면 **"상품을 주문하시려면 먼저 우측 상단의 프로필 또는 사이트 메뉴를 통해 로그인해 주세요."** 라고 명확하게 안내하세요.`;
    }

    // 카테고리 매핑 규칙 및 추천 규칙 추가
    basePrompt += `

## 상품 추천 규칙 (최우선)
- 사용자가 "추천해줘", "상품 추천", "뭐 살만해?", "골라줘", "전체에서 추천", "모든 상품 중에 골라줘" 등 **추천/골라달라**고 하면 **get_recommendations**를 **바로** 호출하세요. 카테고리를 묻지 마세요.
- 추천 시 category는 **선택사항**입니다. 사용자가 "육상 제품 추천", "해상에서 골라줘"처럼 카테고리를 직접 말했을 때만 category를 넣고, 그렇지 않으면 category 없이 호출(전체 상품 중 랜덤 3개).
- "전체", "모든 상품"이라고 해도 추천/골라줘 요청이면 get_recommendations()로 전체 중 3개만 보여주세요. get_products를 전체로 호출해 모든 물품을 나열하지 마세요.
- 전체 목록을 정말로 요청할 때만 get_products를 사용하세요(예: "전체 제품 목록 보여줘", "모든 상품 목록").

## 검색 결과가 비었을 때 규칙 (search_products)
search_products 호출 결과가 비어 있으면 반드시 다음 순서로 진행하세요.
1. **검색어 쪼개서 재검색**: 검색어를 띄어쓰기나 조사 기준으로 쪼갠 뒤, 각 단어(또는 가장 의미 있는 단어)로 search_products를 다시 호출하세요. 예: "빨간 티셔츠" → "티셔츠" 또는 "빨간"으로 재검색.
2. **그래도 없으면**: "이건 없지만 비슷한 상품 보여드릴게요!"라고 말한 뒤, **관련 키워드**로 search_products를 한 번 더 호출하세요. 예: 사용자가 "OO"를 찾았는데 없으면, OO와 유사한 카테고리·기능 키워드(예: 레이더, 센서, 시스템 등)로 재검색해 결과를 보여주세요.

## 상품 카테고리 인식 규칙 (get_products 사용 시)
get_products 함수를 사용할 때 category 파라미터는 반드시 다음 중 하나여야 합니다:
- "Land" (육상, 지상, 땅)
- "Sea" (해상, 바다, 해양)
- "Air" (공중, 항공, 하늘)

사용자가 다음과 같이 말하면:
- "육상", "지상", "Land 카테고리", "땅" → category: "Land"
- "해상", "바다", "Sea 카테고리", "해양" → category: "Sea"
- "공중", "항공", "Air 카테고리", "하늘" → category: "Air"
- "전체", "모든", "all", "전체 상품", "모든 상품" → category 파라미터를 전달하지 않음 (전체 조회 시에도 목록은 제한된 개수만 반환됨)

## 지시어·대명사 해석 ("그거", "이거" 등)
- "그거", "그 상품", "이거", "거기" 등은 **직전 대화에서 언급된 상품**으로 해석하세요. lastSearchResults나 직전에 말한 상품이 있으면 그걸로 처리합니다.
- **어떤 상품인지 전혀 알 수 없을 때만** "어떤 상품을 말씀하시는 건가요?"라고 **한 번만** 물어보세요. 불필요하게 반복해서 묻지 마세요.

## 주문 시 번호 및 수량 인식 규칙

**직전에 상품 목록을 보여준 경우**(search_products, get_products, get_recommendations, get_product_details 결과): 사용자가 "첫 번째", "1번", "두 번째", "2번" 등만 말해도 **목록의 해당 순서 상품**으로 자동 처리하세요. 추가 확인 없이 lastSearchResults에서 해당 인덱스로 처리합니다.

### 번호 인식 (직전에 보여준 상품 목록 기준으로 자동 처리):
- "첫 번째", "1번" → 목록 첫 번째 상품 (lastSearchResults[0])
- "두 번째", "2번" → 목록 두 번째 상품 (lastSearchResults[1])
- "3번", "세 번째" → lastSearchResults[2]
- "4번", "네 번째" → lastSearchResults[3]
- "5번", "다섯 번째" → lastSearchResults[4]
- 일반적으로 "N번" 또는 "N번째" → lastSearchResults[N-1]의 id를 product_id로 사용 (product_id: N-1)

### 수량 인식:
- "2개" → quantity: 2
- "세 개" → quantity: 3
- "1개", "한 개", "하나" → quantity: 1
- "4개", "네 개" → quantity: 4
- "5개", "다섯 개" → quantity: 5
- 숫자 + "개" 형식으로 표현된 수량을 정확히 파싱하여 quantity로 전달

### 예외 처리:
- lastSearchResults가 비어있으면 "먼저 상품을 검색해주세요"라고 안내
- create_order 함수를 호출하기 전에 lastSearchResults가 비어있는지 확인
- 사용자가 번호로 주문하려고 할 때 해당 번호가 lastSearchResults 범위를 벗어나면 "검색 결과에 해당 번호의 상품이 없습니다"라고 안내

### 재고 부족 시 (create_order 결과로 재고 부족 응답이 온 경우):
1. **현재 재고 수량 알려주기**: "현재 재고는 N개예요"처럼 재고 수량을 먼저 안내하세요.
2. **선택 질문하기**: 다음 둘 중 하나를 골라 사용자에게 물어보세요.
   - "재고만큼만 주문하시겠어요?"
   - "비슷한 상품 찾아드릴까요?"
   (둘 다 제시해도 되고, 상황에 맞는 한 가지로 물어봐도 됩니다.)

### 주문 예시:
- "1번 주문해줘" → product_id: 0, quantity: 1
- "2번 3개 주문" → product_id: 1, quantity: 3
- "첫 번째 상품 2개 주문해줘" → product_id: 0, quantity: 2
- "두 번째 5개 주문" → product_id: 1, quantity: 5

### 결제 요청:
- 사용자가 "결제한다", "결제해줘", "결제할게", "결제 진행" 등 결제를 요청하면:
  1. lastSearchResults에서 최근 검색한 상품 확인
  2. 상품이 없으면 "먼저 상품을 검색해주세요" 안내
  3. 상품이 있으면 create_order 함수를 호출하여 바로 결제창 열기
  4. 수량을 명시하지 않으면 기본값 1개 사용
  5. "1번 결제", "2번 결제" 등으로 특정 상품 결제 가능

## 도움이 안 될 때 (최종 안내)
- 어떻게 해도 도움이 되지 않거나 답을 찾기 어려울 때는 **반드시** "고객센터(1234-5678)로 연락주세요!"라고 안내하세요.
- **절대** "모르겠어요", "잘 모르겠어요" 등으로만 끝내지 마세요. 항상 고객센터 연락처 안내를 붙이세요.`;

    return basePrompt;
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    // 사용자 메시지 DB에 저장
    await saveChatMessage("user", text);

    setInput("");
    setLoading(true);

    try {
      // 시스템 메시지 생성 (매 요청마다 currentUserEmail을 확인하여 동적으로 생성)
      const systemMessage: ApiMessage = {
        role: "system",
        content: getSystemPrompt(),
      };

      // 기존 메시지와 새 사용자 메시지 추가 (시스템 메시지는 항상 첫 번째에 포함)
      let apiMessages: ApiMessage[] = [
        systemMessage,
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user" as const, content: text },
      ];

      let lastContent: string | null = null;
      let rounds = 0;
      let searchResultsThisTurn: SearchResultItem[] | null = null;
      let isRecommendationThisTurn = false;

      while (rounds < MAX_TOOL_ROUNDS) {
        rounds++;
        const body: { model: string; messages: ApiMessage[]; tools?: typeof CHATBOT_TOOLS } = {
          model: MODEL,
          messages: apiMessages,
          tools: CHATBOT_TOOLS,
        };

        const response = await fetch(OPENAI_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error((err as { error?: { message?: string } })?.error?.message || response.statusText);
        }

        const data = (await response.json()) as {
          choices?: Array<{
            message?: {
              content?: string | null;
              tool_calls?: ApiToolCall[];
            };
          }>;
        };
        const msg = data.choices?.[0]?.message;
        lastContent = msg?.content?.trim() ?? null;

        if (!msg?.tool_calls?.length) {
          break;
        }

        const assistantMsg: ApiMessage = {
          role: "assistant",
          content: msg.content ?? null,
          tool_calls: msg.tool_calls,
        };
        apiMessages = [...apiMessages, assistantMsg];

        for (const tc of msg.tool_calls) {
          let result: string;
          try {
            const args = tc.function.arguments ? JSON.parse(tc.function.arguments) : {};
            result = await runChatbotTool(
              tc.function.name as "search_products" | "get_products" | "get_recommendations" | "check_stock" | "get_product_details" | "get_current_time" | "get_site_pages" | "create_order",
              args
            );
            if (tc.function.name === "search_products" || tc.function.name === "get_products" || tc.function.name === "get_recommendations" || tc.function.name === "get_product_details") {
              try {
                const parsed = JSON.parse(result) as { results?: SearchResultItem[] };
                if (Array.isArray(parsed.results) && parsed.results.length > 0) {
                  searchResultsThisTurn = parsed.results;
                  if (tc.function.name === "get_recommendations") {
                    isRecommendationThisTurn = true;
                  }
                }
              } catch {
                /* ignore */
              }
            }
          } catch {
            result = JSON.stringify({ error: "Invalid tool arguments" });
          }
          apiMessages.push({
            role: "tool",
            content: result,
            tool_call_id: tc.id,
          });
        }
      }

      const content = lastContent || "응답을 생성할 수 없습니다.";
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content,
        ...(searchResultsThisTurn?.length ? { searchResults: searchResultsThisTurn } : {}),
        ...(searchResultsThisTurn?.length && isRecommendationThisTurn
          ? { recommendationTitle: "이런 상품 어떠세요?" }
          : {}),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // AI 응답 DB에 저장 (검색/추천 결과가 있으면 함께 저장해 재진입 시 카드로 복원)
      await saveChatMessage("assistant", content, {
        searchResults: searchResultsThisTurn ?? undefined,
        recommendationTitle: searchResultsThisTurn?.length && isRecommendationThisTurn ? "이런 상품 어떠세요?" : undefined,
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "오류가 발생했습니다.";
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `오류: ${message}`,
      };

      setMessages((prev) => [...prev, errorMsg]);

      // 에러 메시지도 DB에 저장
      await saveChatMessage("assistant", `오류: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg"
            aria-label={t.title}
          >
            <MessageCircle className="h-7 w-7" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-md">
          <SheetHeader className="border-b px-4 py-3">
            <SheetTitle>{t.title}</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 px-4 py-3">
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-sm">{t.welcome}</p>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className={m.role === "user" ? "ml-8" : "mr-8"}>
                    <div
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm",
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {m.content}
                    </div>
                    {m.role === "assistant" && m.searchResults && m.searchResults.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {m.recommendationTitle && (
                          <p className="text-sm font-medium text-foreground">{m.recommendationTitle}</p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {m.searchResults.map((item, idx) => (
                            <SearchResultCard key={item.id + idx} item={item} index={idx} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="mr-8 flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-muted-foreground">입력 중...</span>
                  </div>
                )}
              </div>
            )}
            <div ref={scrollRef} />
          </ScrollArea>
          <div className="flex gap-2 border-t p-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder={t.placeholder}
              disabled={loading}
              className="flex-1"
            />
            <Button size="icon" onClick={sendMessage} disabled={loading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* 토스페이먼츠 결제 위젯 */}
      {paymentParams && (
        <TossPaymentWidget
          open={paymentWidgetOpen}
          onClose={() => {
            setPaymentWidgetOpen(false);
            if (paymentResolveRef.current) {
              paymentResolveRef.current({ success: false, message: "결제가 취소되었습니다" });
              paymentResolveRef.current = null;
            }
          }}
          amount={paymentParams.amount}
          orderName={paymentParams.orderName}
          customerName={paymentParams.customerName}
          customerEmail={paymentParams.customerEmail}
          onSuccess={() => {
            setPaymentWidgetOpen(false);
            if (paymentResolveRef.current) {
              paymentResolveRef.current({ success: true, message: "결제가 완료되었습니다" });
              paymentResolveRef.current = null;
            }
          }}
          onFail={() => {
            setPaymentWidgetOpen(false);
            if (paymentResolveRef.current) {
              paymentResolveRef.current({ success: false, message: "결제가 실패했습니다" });
              paymentResolveRef.current = null;
            }
          }}
        />
      )}
    </>
  );
}
