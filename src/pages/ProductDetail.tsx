import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Shield, Lock, Globe, Check } from "lucide-react";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArcReactorButton from "@/components/ArcReactorButton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Link to="/products" className="text-accent hover:underline">
              Return to Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

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

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to quote request`, {
      description: "View your cart to submit the request.",
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
            <span className="text-sm uppercase tracking-wider">Back to Catalog</span>
          </Link>

          {/* Product Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Section */}
            <div className="relative">
              <div className="defense-card rounded-xl overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
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
                  <span className="text-xs font-medium text-foreground">ITAR Compliant</span>
                </div>
                <div className="trust-badge flex items-center gap-2 px-3 py-1.5 rounded-lg">
                  <Globe className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-foreground">NATO Standard</span>
                </div>
                <div className="trust-badge flex items-center gap-2 px-3 py-1.5 rounded-lg">
                  <Lock className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-foreground">Cyber-Secure</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Specs */}
              <div className="bg-secondary/50 rounded-xl p-6 mb-8 border border-border">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                  Technical Specifications
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

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 bg-card rounded-xl border border-border">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Unit Price (Est.)
                  </span>
                  <p className="text-3xl font-bold text-accent">
                    {formatPrice(product.price)}
                  </p>
                </div>
                
                <ArcReactorButton size="lg" onClick={handleAddToCart}>
                  <Plus className="w-5 h-5" />
                  Add to Quote
                </ArcReactorButton>
              </div>

              {/* Security Notice */}
              <p className="text-xs text-muted-foreground mt-6 flex items-start gap-2">
                <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  This product is subject to export controls. Government credentials 
                  and end-user certificates required for procurement.
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
