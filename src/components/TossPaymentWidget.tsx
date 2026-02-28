import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";

interface TossPaymentWidgetProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  orderName: string;
  customerName: string;
  customerEmail: string;
  onSuccess: () => void;
  onFail: () => void;
}

// 토스페이먼츠 클라이언트 키 (테스트용 - 실제 운영 시 환경 변수로 관리)
const TOSS_CLIENT_KEY = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"; // 공식 테스트 키

export default function TossPaymentWidget({
  open,
  onClose,
  amount,
  orderName,
  customerName,
  customerEmail,
  onSuccess,
  onFail,
}: TossPaymentWidgetProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);
  const agreementWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderAgreement"]> | null>(null);

  // 결제 위젯 초기화
  useEffect(() => {
    if (!open) {
      // 모달이 닫히면 위젯 정리
      if (paymentMethodsWidgetRef.current && typeof paymentMethodsWidgetRef.current.destroy === "function") {
        try {
          paymentMethodsWidgetRef.current.destroy();
        } catch (e) {
          console.error("결제 수단 위젯 정리 오류:", e);
        }
        paymentMethodsWidgetRef.current = null;
      }
      if (agreementWidgetRef.current && typeof agreementWidgetRef.current.destroy === "function") {
        try {
          agreementWidgetRef.current.destroy();
        } catch (e) {
          console.error("이용약관 위젯 정리 오류:", e);
        }
        agreementWidgetRef.current = null;
      }
      paymentWidgetRef.current = null;
      setIsWidgetReady(false);
      return;
    }

    const initPaymentWidget = async () => {
      try {
        // 결제 위젯 초기화
        const paymentWidget = await loadPaymentWidget(TOSS_CLIENT_KEY, customerEmail);
        paymentWidgetRef.current = paymentWidget;

        // 결제 수단 위젯 렌더링
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
          "#payment-method",
          { value: amount },
          { variantKey: "DEFAULT" }
        );
        paymentMethodsWidgetRef.current = paymentMethodsWidget;

        // 이용약관 위젯 렌더링 
        const agreementWidget = paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
        agreementWidgetRef.current = agreementWidget;

        // 위젯이 완전히 렌더링된 후 ready 상태 적용
        paymentMethodsWidget.on("ready", () => {
          setIsWidgetReady(true);
        });
      } catch (error) {
        console.error("결제 위젯 초기화 오류:", error);
        onFail();
      }
    };

    // 약간의 지연 후 위젯 초기화 (DOM이 준비된 후)
    const timer = setTimeout(() => {
      initPaymentWidget();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [open, amount, customerEmail, onFail]);

  const handlePayment = async () => {
    if (!paymentWidgetRef.current || !isWidgetReady) {
      console.error("결제 위젯이 아직 준비되지 않았습니다");
      return;
    }

    setIsProcessing(true);
    
    try {
      // 주문 ID 생성
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // 결제 정보를 localStorage에 저장 (리다이렉트 후 확인용)
      localStorage.setItem("pendingPayment", JSON.stringify({
        orderId,
        orderName,
        amount,
        customerEmail,
        customerName,
      }));

      // 결제 화면으로 이동
      await paymentWidgetRef.current.requestPayment({
        orderId: orderId,
        orderName: orderName,
        successUrl: `${window.location.origin}/payment/success?orderId=${orderId}`,
        failUrl: `${window.location.origin}/payment/fail?orderId=${orderId}`,
        customerEmail: customerEmail,
        customerName: customerName,
        amount: {
          currency: "KRW",
          value: amount,
        },
      });

      // 리다이렉트되므로 여기 도달하지 않음
    } catch (error: any) {
      console.error("결제 요청 오류:", error);
      localStorage.removeItem("pendingPayment");
      setIsProcessing(false);
      
      // 사용자가 결제를 취소한 경우는 onFail 호출하지 않음 (정상적인 취소)
      if (error?.code !== "USER_CANCEL") {
        onFail();
      } else {
        onClose();
      }
    }
  };

  // 금액 포맷팅
  const formattedAmount = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);

  // Radix Dialog onOpenChange(open: boolean) — 닫을 때만 onClose 호출
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>결제하기</DialogTitle>
          <DialogDescription>
            결제하실 상품 정보를 확인하고 결제 수단을 선택해주세요.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* 상품 정보 */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-lg">{orderName}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    고객: {customerName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    이메일: {customerEmail}
                  </p>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border/50">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">결제 금액</span>
                  <span className="text-2xl font-bold text-primary">
                    {formattedAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 결제 수단 위젯 */}
          <div>
            <h3 className="text-sm font-medium mb-2">결제 수단 선택</h3>
            <div id="payment-method" className="min-h-[300px]" />
          </div>

          {/* 이용약관 위젯 */}
          <div>
            <div id="agreement" />
          </div>

          {/* 버튼 */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isProcessing || !isWidgetReady}
              className="flex-1"
            >
              {isProcessing ? "처리 중..." : isWidgetReady ? "결제하기" : "로딩 중..."}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

