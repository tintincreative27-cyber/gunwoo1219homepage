import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, FileText, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArcReactorButton from "@/components/ArcReactorButton";
import { toast } from "sonner";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, updateItemOptions, clearCart, totalPrice } = useCart();

  const [optionsOpenFor, setOptionsOpenFor] = React.useState<string | null>(null);
  const [tempOptions, setTempOptions] = React.useState({ configuration: "", notes: "" });

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleRequestQuote = () => {
    toast.success("Quote Request Submitted", {
      description: "A procurement specialist will contact you within 24 hours.",
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
                Your Quote Cart is Empty
              </h1>
              <p className="text-muted-foreground mb-8">
                Browse our defense systems catalog to add items for your official quote request.
              </p>
              <Link to="/products">
                <ArcReactorButton size="lg">
                  <ArrowLeft className="w-5 h-5" />
                  Browse Catalog
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
              <span className="text-sm uppercase tracking-wider">Continue Browsing</span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Quote Request</h1>
            <p className="text-muted-foreground mt-2">
              Review your selected systems before submitting your official procurement request.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                {/* Table Header */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-secondary/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-border">
                  {items.map(item => (
                    <div key={item.product.id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Product Info */}
                        <div className="md:col-span-6 flex items-center gap-4">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg border border-border"
                          />
                          <div>
                            <span className="text-xs font-mono text-accent">{item.product.code}</span>
                            <h3 className="font-medium text-foreground">{item.product.name}</h3>
                            <span className="text-xs text-muted-foreground">{item.product.category}</span>
                          </div>
                        </div>

                        {/* Unit Price */}
                        <div className="md:col-span-2 text-center">
                          <span className="md:hidden text-xs text-muted-foreground mr-2">Unit:</span>
                          <span className="text-foreground">{formatPrice(item.product.price)}</span>
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

                        {/* Total & Remove */}
                        <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-accent">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>

                            {/* Options Button */}
                            <button
                              onClick={() => handleOpenOptions(item.product.id)}
                              className="p-2 rounded bg-secondary hover:bg-secondary/80 transition-colors text-sm"
                            >
                              Options
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 rounded hover:bg-destructive/20 transition-colors group"
                          >
                            <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
                          </button>
                        </div>
                      </div>

                      {/* Options Summary (if present) */}
                      {item.options && (
                        <div className="mt-3 text-sm text-muted-foreground">
                          <strong>Options:</strong> {item.options.configuration || item.options.notes}
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
                  Quote Summary
                </h2>

                {/* Items Summary */}
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product.code} × {item.quantity}
                      </span>
                      <span className="text-foreground">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">*Final pricing subject to contract negotiation</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-foreground">Estimated Total</span>
                    <span className="text-2xl font-bold text-accent">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <ArcReactorButton size="lg" className="w-full" onClick={handleRequestQuote}>
                  <FileText className="w-5 h-5" />
                  Request Official Quote
                </ArcReactorButton>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Secure transmission • Government verification required
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
            <h3 className="text-lg font-semibold text-foreground mb-4">Item Options</h3>

            <label className="block mb-3">
              <span className="text-sm text-muted-foreground">Configuration</span>
              <input
                value={(tempOptions as any).configuration}
                onChange={e => setTempOptions(prev => ({ ...prev, configuration: e.target.value }))}
                className="w-full mt-2 p-2 rounded border border-border bg-input text-foreground"
              />
            </label>

            <label className="block mb-3">
              <span className="text-sm text-muted-foreground">Notes</span>
              <textarea
                value={(tempOptions as any).notes}
                onChange={e => setTempOptions(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full mt-2 p-2 rounded border border-border bg-input text-foreground h-24"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button onClick={handleCloseOptions} className="px-4 py-2 rounded bg-secondary/80">Cancel</button>
              <button onClick={handleSaveOptions} className="px-4 py-2 rounded bg-accent text-accent-foreground">Save</button>
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
          aria-label="Go to Purchase"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Purchase</span>
        </button>
      )}
    </div>
  );
};

export default Cart;
