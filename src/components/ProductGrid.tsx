import React, { useState, useMemo } from "react";
import { products, ProductCategory } from "@/data/products";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";
import { Plane, Ship, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "latest" | "price-low" | "price-high";

const ProductGrid: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">("All");
  const [sortOption, setSortOption] = useState<SortOption>("latest");

  const categories: { value: ProductCategory | "All"; label: string; icon: React.ReactNode }[] = [
    { value: "All", label: t("allSystems"), icon: null },
    { value: "Land", label: t("land"), icon: <Truck className="w-4 h-4" /> },
    { value: "Sea", label: t("sea"), icon: <Ship className="w-4 h-4" /> },
    { value: "Air", label: t("air"), icon: <Plane className="w-4 h-4" /> },
  ];

  // 필터링 및 정렬된 상품 목록
  const filteredAndSortedProducts = useMemo(() => {
    // 1. 카테고리 필터링
    let filtered = selectedCategory === "All"
      ? [...products]
      : products.filter(p => p.category === selectedCategory);

    // 2. 정렬 적용
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "latest":
          // 최신순: 배열 순서 유지 (id 기준 오름차순)
          return parseInt(a.id) - parseInt(b.id);
        case "price-low":
          // 낮은 가격순
          return a.price - b.price;
        case "price-high":
          // 높은 가격순
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, sortOption]);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("defenseSysCatalog")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("defenseSysCatalogDesc")}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wider",
                "border transition-all duration-300",
                selectedCategory === category.value
                  ? "bg-accent/10 border-accent text-accent arc-reactor-glow"
                  : "bg-secondary border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
              )}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center justify-end mb-8">
          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="text-sm font-medium text-muted-foreground">
              {t("sortBy")}:
            </label>
            <Select value={sortOption} onValueChange={(value) => setSortOption(value as typeof sortOption)}>
              <SelectTrigger id="sort-select" className="w-[180px]">
                <SelectValue placeholder={t("sortBy")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">{t("latest")}</SelectItem>
                <SelectItem value="price-low">{t("priceLowToHigh")}</SelectItem>
                <SelectItem value="price-high">{t("priceHighToLow")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredAndSortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">{t("noProductsFound")}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
