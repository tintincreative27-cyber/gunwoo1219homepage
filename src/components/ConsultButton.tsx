import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ConsultButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/purchase");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 group cursor-pointer"
      aria-label="Purchase Information"
    >
      {/* M자 모양의 버튼 배경 */}
      <div className="relative w-20 h-20 md:w-24 md:h-24">
        {/* M자 모양 SVG - 음양 문양 하단 느낌 */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="absolute inset-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 음양 문양 하단의 반원형 베이스 (아래쪽이 둥근 형태) */}
          <path
            d="M 10 90 Q 50 100 90 90 L 90 100 L 10 100 Z"
            fill="hsl(var(--accent))"
            className="transition-all duration-300 group-hover:fill-[hsl(var(--accent))] group-hover:brightness-110"
          />
          {/* M자 모양 (명확한 M자 형태) */}
          <path
            d="M 15 90 L 15 25 L 28 48 L 50 15 L 72 48 L 85 25 L 85 90"
            fill="hsl(var(--accent-foreground))"
            className="transition-all duration-300 group-hover:opacity-90"
            stroke="hsl(var(--accent))"
            strokeWidth="1"
          />
          {/* 음양 문양의 구분선 (S자 커브 - 하단의 음양 느낌) */}
          <path
            d="M 10 90 Q 25 85 30 75 Q 35 65 50 70 Q 65 65 70 75 Q 75 85 90 90"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
        </svg>

        {/* 아이콘 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <MessageCircle
            className={cn(
              "w-8 h-8 md:w-10 md:h-10 text-background",
              "transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12",
              "drop-shadow-lg"
            )}
          />
        </div>

        {/* 호버 시 글로우 효과 */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent/20 blur-xl -z-10" />
        
        {/* 펄스 애니메이션 */}
        <div className="absolute inset-0 rounded-lg animate-ping opacity-10 bg-accent pointer-events-none" style={{ animationDuration: "2s" }} />
      </div>
    </button>
  );
};

export default ConsultButton;

