import React from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { Product, getLocalizedProductName, getLocalizedProductDescription } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import ArcReactorButton from "./ArcReactorButton";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { language, formatPrice } = useLanguage();
  
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

  return (
    <div
      className="defense-card group rounded-xl bg-card overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={cn("category-badge", getCategoryBadgeClass(product.category))}>
            {product.category}
          </span>
        </div>

        {/* Product Code */}
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 text-xs font-mono font-bold text-accent bg-background/80 rounded border border-accent/30">
            {product.code}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {getLocalizedProductName(product, language)}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {getLocalizedProductDescription(product, language)}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Starting at</span>
          <p className="text-xl font-bold text-accent">{formatPrice(product.price)}</p>
        </div>

        {/* Action Button */}
        <Link to={`/product/${product.id}`}>
          <ArcReactorButton size="sm" className="w-full">
            <Eye className="w-4 h-4" />
            View Details
          </ArcReactorButton>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
