import { Package } from "lucide-react";
import type { SearchResultItem } from "@/lib/chatbotTools";
import { cn } from "@/lib/utils";

interface SearchResultCardProps {
  item: SearchResultItem;
  index: number;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(num);
}

export default function SearchResultCard({ item, index }: SearchResultCardProps) {
  const imageUrl = item.imageUrl && String(item.imageUrl).trim() ? String(item.imageUrl) : null;
  const stock = item.stock ?? null;
  const displayNumber = index + 1;

  const handleClick = () => {
    window.location.href = `/product/${item.id}`;
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group relative block overflow-hidden rounded-xl border border-border/50 bg-card",
        "shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/60",
        "hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      )}
    >
      {/* 번호 배지 */}
      <div className="absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md ring-2 ring-background">
        {displayNumber}
      </div>

      {/* 이미지 영역 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Package className="h-12 w-12 opacity-30" />
          </div>
        )}
        {/* 이미지 오버레이 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* 카드 내용 */}
      <div className="p-4 space-y-3">
        {/* 상품 이름 */}
        <h4 className="font-semibold text-sm leading-tight line-clamp-2 text-foreground min-h-[2.5rem] group-hover:text-primary transition-colors">
          {item.name}
        </h4>

        {/* 가격 */}
        <div className="flex items-baseline gap-1">
          <span className="font-bold text-lg text-primary tabular-nums">
            {formatPrice(Number(item.price))}
          </span>
        </div>

        {/* 재고 수량 */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-xs font-medium text-muted-foreground">재고 수량</span>
          <span className={cn(
            "text-xs font-semibold tabular-nums px-2 py-1 rounded-md",
            stock !== null && stock > 0 
              ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30" 
              : stock === 0 
              ? "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30"
              : "text-muted-foreground bg-muted"
          )}>
            {stock !== null ? `${formatNumber(stock)}개` : "확인 불가"}
          </span>
        </div>
      </div>
    </div>
  );
}
