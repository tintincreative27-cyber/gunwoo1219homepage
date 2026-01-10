import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const ScrollToTop: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤을 300px 이상 내렸을 때 버튼 표시
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-28 right-6 z-50 p-3 rounded-full bg-accent text-accent-foreground",
        "shadow-lg transition-all duration-300 group",
        "hover:bg-accent/90 hover:scale-110 hover:shadow-xl",
        showButton
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="맨 위로 이동"
      title="맨 위로 이동"
    >
      <ArrowUp
        className={cn(
          "w-5 h-5 transition-transform duration-300",
          "group-hover:-translate-y-1"
        )}
      />
      
      {/* 호버 시 글로우 효과 */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent/30 blur-xl -z-10" />
    </button>
  );
};

export default ScrollToTop;

