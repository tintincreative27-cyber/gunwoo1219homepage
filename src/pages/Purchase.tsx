import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ArcReactorButton from "@/components/ArcReactorButton";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";

const Purchase: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart, totalPrice } = useCart();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    purchaseItem: "",
    purchaseLocation: "",
    purchaseTime: "",
  });

  // 장바구니 아이템을 구매 물품 필드에 자동 입력
  useEffect(() => {
    if (items.length > 0) {
      const cartItemsText = items
        .map(item => `${item.product.name} (${item.product.code}) × ${item.quantity}`)
        .join(", ");
      setFormData((prev) => ({
        ...prev,
        purchaseItem: cartItemsText,
      }));
    }
  }, [items]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setLoading(true);

    try {
      // 총 금액 계산
      const totalAmount = items.reduce(
        (sum, item) => sum + (item.product.price || 0) * item.quantity,
        0
      );

      toast({
        title: t("purchaseComplete"),
        description: t("purchaseSuccessDesc"),
      });

      // 장바구니 비우기
      clearCart();

      // 폼 초기화
      setFormData({
        purchaseItem: "",
        purchaseLocation: "",
        purchaseTime: "",
      });

      // 홈으로 이동
      navigate("/");
    } catch (error: any) {
      console.error("구매 처리 중 오류:", error);
      toast({
        variant: "destructive",
        title: t("purchaseFailed"),
        description: error.message || t("purchaseFailed"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToHome")}
          </Link>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("purchaseInformation")}
            </h1>
            <p className="text-muted-foreground">
              {t("providePurchaseDetails")}
            </p>
          </div>

          {/* Form */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="purchaseItem">{t("purchaseItem")} *</Label>
                <Input
                  id="purchaseItem"
                  name="purchaseItem"
                  type="text"
                  placeholder={t("enterPurchaseItem")}
                  value={formData.purchaseItem}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseLocation">{t("purchaseLocation")} *</Label>
                <Input
                  id="purchaseLocation"
                  name="purchaseLocation"
                  type="text"
                  placeholder={t("enterPurchaseLocation")}
                  value={formData.purchaseLocation}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseTime">{t("purchaseTime")} *</Label>
                <Input
                  id="purchaseTime"
                  name="purchaseTime"
                  type="datetime-local"
                  value={formData.purchaseTime}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/")}
                  disabled={loading}
                >
                  {t("cancel")}
                </Button>
                <div className="flex-1">
                  <ArcReactorButton 
                    className="w-full" 
                    size="lg" 
                    disabled={loading}
                    onClick={() => handleSubmit()}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t("processing")}
                      </>
                    ) : (
                      t("submit")
                    )}
                  </ArcReactorButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Purchase;

