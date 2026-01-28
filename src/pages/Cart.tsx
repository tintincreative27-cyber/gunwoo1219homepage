import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, FileText, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedProductName } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArcReactorButton from "@/components/ArcReactorButton";
import { toast } from "sonner";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, updateItemOptions, clearCart, totalPrice } = useCart();
  const { t, language, formatPrice } = useLanguage();

  const [optionsOpenFor, setOptionsOpenFor] = React.useState<string | null>(null);
  const [tempOptions, setTempOptions] = React.useState({ configuration: "", notes: "" });
  const [expandedOptionsFor, setExpandedOptionsFor] = React.useState<string | null>(null);

  const handleOpenOptions = (productId: string) => {
    const item = items.find(i => i.product.id === productId);
    setTempOptions({ configuration: item?.options?.configuration || "", notes: item?.options?.notes || "" });
    setOptionsOpenFor(productId);
  };

  const handleSaveOptions = () => {
    if (!optionsOpenFor) return;
    updateItemOptions(optionsOpenFor, tempOptions);
    setOptionsOpenFor(null);
  };

  const handleCloseOptions = () => setOptionsOpenFor(null);

  const getSelectedOptionsText = (productId: string, selectedOptionIds?: string[]) => {
    if (!selectedOptionIds || selectedOptionIds.length === 0) return null;
    const item = items.find(i => i.product.id === productId);
    if (!item) return null;
    
    const optionNames = selectedOptionIds
      .map(optionId => {
        const option = item.product.options.find(opt => opt.id === optionId);
        return option ? (language === "ko" ? option.nameKo : option.nameEn) : null;
      })
      .filter(Boolean);
    
    return optionNames.length > 0 ? optionNames.join(", ") : null;
  };

  const getItemOptionsPrice = (item: typeof items[0]) => {
    if (!item.options?.selectedOptions) return 0;
    return item.options.selectedOptions.reduce((sum, optId) => {
      const option = item.product.options.find(opt => opt.id === optId);
      return sum + (option?.price || 0);
    }, 0);
  };

  const getItemTotalPrice = (item: typeof items[0]) => {
    const basePrice = item.product.price;
    const optionsPrice = getItemOptionsPrice(item);
    return (basePrice + optionsPrice) * item.quantity;
  };

  const handleRequestQuote = () => {
    toast.success(t("quoteRequestSubmitted"), {
      description: t("procurementSpecialistContact"),
    });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-secondary flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                {t("yourQuoteCartEmpty")}
              </h1>
              <p className="text-muted-foreground mb-8">
                {t("browseDefenseCatalog")}
              </p>
              <Link to="/products">
                <ArcReactorButton size="lg">
                  <ArrowLeft className="w-5 h-5" />
                  {t("browseCatalog")}
                </ArcReactorButton>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm uppercase tracking-wider">{t("continueBrowsing")}</span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">{t("quoteRequest")}</h1>
            <p className="text-muted-foreground mt-2">
              {t("reviewSelectedSystems")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                {/* Table Header */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-secondary/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <div className="col-span-5">{t("product")}</div>
                  <div className="col-span-2 text-center">{t("unitPrice")}</div>
                  <div className="col-span-2 text-center">{t("quantity")}</div>
                  <div className="col-span-3 text-right">{t("total")}</div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-border">
                  {items.map(item => (
                    <div key={item.product.id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Product Info */}
                        <div className="md:col-span-5 flex items-center gap-4">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg border border-border"
                          />
                          <div>
                            <span className="text-xs font-mono text-accent">{item.product.code}</span>
                            <h3 className="font-medium text-foreground">{getLocalizedProductName(item.product, language)}</h3>
                            <span className="text-xs text-muted-foreground">{item.product.category}</span>
                          </div>
                        </div>

                        {/* Unit Price */}
                        <div className="md:col-span-2 flex md:justify-center items-center">
                          <span className="md:hidden text-xs text-muted-foreground mr-2">{t("unitPrice")}:</span>
                          <span className="text-foreground text-xs md:text-sm break-all">{formatPrice(item.product.price)}</span>
                        </div>

                        {/* Quantity */}
                        <div className="md:col-span-2 flex items-center justify-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 rounded bg-secondary hover:bg-accent/20 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4 text-foreground" />
                          </button>
                          <span className="w-8 text-center font-medium text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 rounded bg-secondary hover:bg-accent/20 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4 text-foreground" />
                          </button>
                        </div>

                        {/* Total & Actions */}
                        <div className="md:col-span-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                          <div className="flex flex-col items-start md:items-end w-full">
                            <span className="text-xs md:text-sm font-semibold text-accent break-all">
                              {formatPrice(getItemTotalPrice(item))}
                            </span>
                            {/* Options Toggle Button */}
                            {item.options?.selectedOptions && item.options.selectedOptions.length > 0 && (
                              <button
                                onClick={() => setExpandedOptionsFor(expandedOptionsFor === item.product.id ? null : item.product.id)}
                                className="text-xs text-muted-foreground hover:text-accent transition-colors underline mt-1"
                              >
                                {expandedOptionsFor === item.product.id 
                                  ? (language === "ko" ? "옵션 숨기기" : "Hide Options")
                                  : (language === "ko" ? "옵션 보기" : "View Options")}
                              </button>
                            )}
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 rounded hover:bg-destructive/20 transition-colors group"
                          >
                            <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
                          </button>
                        </div>
                      </div>

                      {/* Selected Options Display - Collapsible */}
                      {expandedOptionsFor === item.product.id && item.options?.selectedOptions && item.options.selectedOptions.length > 0 && (
                        <div className="mt-3 p-3 bg-secondary/30 rounded-lg animate-in slide-in-from-top-2 duration-200">
                          <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                            {language === "ko" ? "선택된 옵션" : "Selected Options"}:
                          </div>
                          <div className="space-y-1">
                            {item.options.selectedOptions.map(optId => {
                              const option = item.product.options.find(opt => opt.id === optId);
                              if (!option) return null;
                              return (
                                <div key={optId} className="flex justify-between text-sm gap-2">
                                  <span className="text-foreground flex-1">
                                    • {language === "ko" ? option.nameKo : option.nameEn}
                                  </span>
                                  {option.price && (
                                    <span className="text-accent font-medium whitespace-nowrap text-xs">
                                      +{formatPrice(option.price)}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                            {getItemOptionsPrice(item) > 0 && (
                              <div className="pt-2 mt-2 border-t border-border/50 flex justify-between text-sm font-semibold">
                                <span className="text-muted-foreground">
                                  {language === "ko" ? "옵션 소계" : "Options Subtotal"}:
                                </span>
                                <span className="text-accent text-xs">
                                  {formatPrice(getItemOptionsPrice(item) * item.quantity)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Configuration & Notes (if present) */}
                      {(item.options?.configuration || item.options?.notes) && (
                        <div className="mt-3 text-sm text-muted-foreground">
                          {item.options.configuration && (
                            <div><strong>{t("configuration")}:</strong> {item.options.configuration}</div>
                          )}
                          {item.options.notes && (
                            <div><strong>{t("notes")}:</strong> {item.options.notes}</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  {t("quoteSummary")}
                </h2>

                {/* Items Summary */}
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex justify-between gap-2 text-xs">
                      <span className="text-muted-foreground truncate">
                        {item.product.code} × {item.quantity}
                      </span>
                      <span className="text-foreground text-right break-all">
                        {formatPrice(getItemTotalPrice(item))}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-muted-foreground text-sm">{t("subtotal")}</span>
                    <span className="text-foreground text-sm text-right break-all">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-muted-foreground">{t("finalPricingNote")}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-foreground text-sm">{t("estimatedTotal")}</span>
                    <span className="text-xl font-bold text-accent break-all">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <ArcReactorButton size="lg" className="w-full" onClick={handleRequestQuote}>
                  <FileText className="w-5 h-5" />
                  {t("requestOfficialQuote")}
                </ArcReactorButton>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  {t("secureTransmission")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Options Modal */}
      {optionsOpenFor && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t("itemOptions")}</h3>

            <label className="block mb-3">
              <span className="text-sm text-muted-foreground">{t("configuration")}</span>
              <input
                value={(tempOptions as any).configuration}
                onChange={e => setTempOptions(prev => ({ ...prev, configuration: e.target.value }))}
                className="w-full mt-2 p-2 rounded border border-border bg-input text-foreground"
              />
            </label>

            <label className="block mb-3">
              <span className="text-sm text-muted-foreground">{t("notes")}</span>
              <textarea
                value={(tempOptions as any).notes}
                onChange={e => setTempOptions(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full mt-2 p-2 rounded border border-border bg-input text-foreground h-24"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button onClick={handleCloseOptions} className="px-4 py-2 rounded bg-secondary/80">{t("cancel")}</button>
              <button onClick={handleSaveOptions} className="px-4 py-2 rounded bg-accent text-accent-foreground">{t("save")}</button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Purchase Button - Fixed Bottom Right */}
      {items.length > 0 && (
        <button
          onClick={() => navigate("/purchase")}
          className="fixed bottom-6 right-6 z-50 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold shadow-lg hover:bg-accent/90 transition-all duration-300 flex items-center gap-2 group"
          aria-label={t("purchase")}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>{t("purchase")}</span>
        </button>
      )}
    </div>
  );
};

export default Cart;
