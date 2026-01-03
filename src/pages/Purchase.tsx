import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ArcReactorButton from "@/components/ArcReactorButton";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const Purchase: React.FC = () => {
  const navigate = useNavigate();
  const { items } = useCart();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Purchase Information:", formData);
    alert("Purchase information has been submitted.");
    setFormData({
      purchaseItem: "",
      purchaseLocation: "",
      purchaseTime: "",
    });
    navigate("/");
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
            Back to Home
          </Link>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Purchase Information
            </h1>
            <p className="text-muted-foreground">
              Please provide your purchase details
            </p>
          </div>

          {/* Form */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="purchaseItem">Purchase Item *</Label>
                <Input
                  id="purchaseItem"
                  name="purchaseItem"
                  type="text"
                  placeholder="Enter the item you purchased"
                  value={formData.purchaseItem}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseLocation">Purchase Location *</Label>
                <Input
                  id="purchaseLocation"
                  name="purchaseLocation"
                  type="text"
                  placeholder="Enter the purchase location"
                  value={formData.purchaseLocation}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseTime">Purchase Time *</Label>
                <Input
                  id="purchaseTime"
                  name="purchaseTime"
                  type="datetime-local"
                  value={formData.purchaseTime}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <ArcReactorButton type="submit" className="flex-1" size="lg">
                  Submit
                </ArcReactorButton>
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

