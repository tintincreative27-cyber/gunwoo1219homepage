import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Shield, Lock, Globe, Check } from "lucide-react";
import { getProductById, getLocalizedProductName, getLocalizedProductDescription, getLocalizedProductFullDescription } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArcReactorButton from "@/components/ArcReactorButton";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const { t, language, formatPrice } = useLanguage();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">{t("productNotFound")}</h1>
            <Link to="/products" className="text-accent hover:underline">
              {t("returnToProducts")}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Land":
        return "category-badge-land";
      case "Sea":
        return "category-badge-sea";
      case "Air":
        return "category-badge-air";
      default:
        return "";
    }
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleAddToCart = () => {
    addToCart(product, { selectedOptions });
    toast.success(`${getLocalizedProductName(product, language)} ${t("addedToQuote")}`, {
      description: t("viewCartToSubmit"),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">{t("backToCatalog")}</span>
          </Link>

          {/* Product Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Section */}
            <div className="relative">
              <div className="defense-card rounded-xl overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={getLocalizedProductName(product, language)}
                  className="w-full aspect-square object-cover"
                />
              </div>
              
              {/* Category Badge Overlay */}
              <div className="absolute top-4 left-4">
                <span className={cn("category-badge", getCategoryBadgeClass(product.category))}>
                  {product.category}
                </span>
              </div>
              
              {/* Product Code */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-2 text-sm font-mono font-bold text-accent bg-background/90 rounded-lg border border-accent/30">
                  {product.code}
                </span>
              </div>
            </div>

            {/* Info Section */}
            <div className="animate-slide-in-right">
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="trust-badge flex items-center gap-2 px-3 py-1.5 rounded-lg">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-foreground">{t("itarCompliant")}</span>
                </div>
                <div className="trust-badge flex items-center gap-2 px-3 py-1.5 rounded-lg">
                  <Globe className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-foreground">{t("natoStandard")}</span>
                </div>
                <div className="trust-badge flex items-center gap-2 px-3 py-1.5 rounded-lg">
                  <Lock className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-foreground">{t("cyberSecure")}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {getLocalizedProductName(product, language)}
              </h1>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {getLocalizedProductFullDescription(product, language)}
              </p>

              {/* Specs */}
              <div className="bg-secondary/50 rounded-xl p-6 mb-8 border border-border">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                  {t("technicalSpecs")}
                </h3>
                <ul className="space-y-3">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Options */}
              {product.options && product.options.length > 0 && (
                <div className="bg-secondary/50 rounded-xl p-6 mb-8 border border-border">
                  <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                    {language === "ko" ? "추가 옵션" : "Additional Options"}
                  </h3>
                  <div className="space-y-3">
                    {product.options.map((option) => (
                      <div key={option.id} className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <Checkbox
                            id={option.id}
                            checked={selectedOptions.includes(option.id)}
                            onCheckedChange={() => toggleOption(option.id)}
                            className="mt-0.5"
                          />
                          <label
                            htmlFor={option.id}
                            className="text-sm text-foreground cursor-pointer flex-1"
                          >
                            {language === "ko" ? option.nameKo : option.nameEn}
                          </label>
                        </div>
                        {option.price && (
                          <span className="text-sm font-semibold text-accent whitespace-nowrap">
                            +{formatPrice(option.price)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  {selectedOptions.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          {language === "ko" ? "선택된 옵션 총액" : "Selected Options Total"}:
                        </span>
                        <span className="font-semibold text-accent">
                          {formatPrice(
                            selectedOptions.reduce((sum, optId) => {
                              const opt = product.options.find(o => o.id === optId);
                              return sum + (opt?.price || 0);
                            }, 0)
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 bg-card rounded-xl border border-border">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t("unitPriceEst")}
                  </span>
                  <p className="text-3xl font-bold text-accent">
                    {formatPrice(product.price)}
                  </p>
                </div>
                
                <ArcReactorButton size="lg" onClick={handleAddToCart}>
                  <Plus className="w-5 h-5" />
                  {t("addToQuote")}
                </ArcReactorButton>
              </div>

              {/* Security Notice */}
              <p className="text-xs text-muted-foreground mt-6 flex items-start gap-2">
                <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  {t("exportControlNotice")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
