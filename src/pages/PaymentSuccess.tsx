import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    // 결제 성공 후 주문 정보를 DB에 저장
    const pendingOrderInfo = localStorage.getItem("pendingOrderInfo");
    if (pendingOrderInfo) {
      const saveOrder = async () => {
        try {
          const orderInfo = JSON.parse(pendingOrderInfo);
          console.log("결제 성공, 주문 정보 저장:", orderInfo);

          // Supabase에서 현재 사용자 ID 가져오기
          const { data: sessionData } = await supabase.auth.getSession();
          const userId = sessionData?.session?.user?.id;

          if (!userId) {
            console.error("사용자 ID를 찾을 수 없습니다");
            return;
          }

          // orders 테이블에 주문 정보 저장
          const { error: orderError } = await supabase.from("orders").insert({
            user_id: userId,
            order_number: orderId, // 결제 시 생성된 주문 번호 추가
            customer_name: orderInfo.customer_name,
            customer_email: orderInfo.customer_email,
            product_id: orderInfo.product_id,
            product_name: orderInfo.product_name,
            quantity: orderInfo.quantity,
            total_amount: orderInfo.total_price, // total_price 대신 total_amount 컬럼 사용
            status: "completed",
            created_at: new Date().toISOString(),
          });

          if (orderError) {
            console.error("주문 저장 오류:", orderError);
          } else {
            console.log("주문 저장 완료");

            // 재고 감소 로직 (RPC 함수 대신 직접 조회 후 업데이트)
            try {
              const { data: productData, error: fetchError } = await supabase
                .from("products")
                .select("stock")
                .eq("id", orderInfo.product_id)
                .single();

              if (fetchError) {
                console.error("재고 조회 오류:", fetchError);
              } else if (productData && productData.stock !== null) {
                const { error: updateError } = await supabase
                  .from("products")
                  .update({ stock: Math.max(0, productData.stock - orderInfo.quantity) })
                  .eq("id", orderInfo.product_id);

                if (updateError) {
                  console.error("재고 차감 업데이트 오류:", updateError);
                } else {
                  console.log("재고 차감 완료");
                }
              }
            } catch (stockProcessError) {
              console.error("재고 처리 중 예외 발생:", stockProcessError);
            }
          }

          // 임시 저장 정보 삭제
          localStorage.removeItem("pendingOrderInfo");
          localStorage.removeItem("pendingPayment");
        } catch (e) {
          console.error("주문 저장 중 오류:", e);
        }
      };

      saveOrder();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center">
          <CheckCircle2 className="h-20 w-20 text-green-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">결제가 완료되었습니다</h1>
          <p className="text-muted-foreground">
            주문번호: {orderId || "확인 중..."}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <Button onClick={() => navigate("/")}>홈으로</Button>
          <Button variant="outline" onClick={() => navigate("/mypage")}>
            주문 내역 보기
          </Button>
        </div>
      </div>
    </div>
  );
}

