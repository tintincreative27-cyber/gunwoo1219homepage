import React from "react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { useLanguage } from "@/context/LanguageContext";

const WeeklyBest: React.FC = () => {
  const { t } = useLanguage();
  // 상위 3개 상품 가져오기 (여기서는 첫 3개를 사용)
  const weeklyProducts = products.slice(0, 3);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("weeklyBest")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("weeklyBestDesc")}
          </p>
        </div>

        {/* 상품 카드 한 줄로 가로 나열 (모바일: 가로 스크롤 가능) */}
        <div className="w-full">
          <div className="flex flex-row gap-6 md:gap-8 overflow-x-auto overscroll-x-contain weekly-best-scroll px-2 md:px-0 pb-4">
            {weeklyProducts.map((product, index) => (
              <div key={product.id} className="flex-shrink-0 w-[280px] md:w-[320px]">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyBest;
