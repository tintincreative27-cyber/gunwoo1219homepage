import { useNavigate, useSearchParams } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentFail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  // 결제 실패 정보 정리
  const handleClose = () => {
    localStorage.removeItem("pendingPayment");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center">
          <XCircle className="h-20 w-20 text-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">결제가 실패했습니다</h1>
          <p className="text-muted-foreground">
            {orderId && `주문번호: ${orderId}`}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            결제를 다시 시도하시거나 다른 결제 수단을 선택해주세요.
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <Button onClick={handleClose}>홈으로</Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            이전 페이지로
          </Button>
        </div>
      </div>
    </div>
  );
}

