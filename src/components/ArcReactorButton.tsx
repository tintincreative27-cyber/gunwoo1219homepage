import React from "react";
import { cn } from "@/lib/utils";

interface ArcReactorButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

const ArcReactorButton: React.FC<ArcReactorButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative group overflow-hidden",
        "font-semibold uppercase tracking-wider",
        "transition-all duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        className
      )}
    >
      {/* Outer metallic ring */}
      <span
        className={cn(
          "absolute inset-0 rounded-lg",
          "arc-reactor-ring",
          "transition-all duration-300",
          variant === "primary" && "group-hover:border-accent"
        )}
      />

      {/* Inner glow core */}
      <span
        className={cn(
          "absolute inset-[3px] rounded-md",
          "bg-gradient-to-br from-accent/20 via-accent/10 to-transparent",
          variant === "primary" && [
            "arc-reactor-glow",
            "group-hover:animate-arc-pulse"
          ]
        )}
      />

      {/* Animated energy lines */}
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <span
          className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px]",
            "bg-gradient-to-r from-transparent via-accent to-transparent",
            "opacity-50 group-hover:opacity-100",
            "transition-opacity duration-300"
          )}
        />
        <span
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px]",
            "bg-gradient-to-r from-transparent via-accent to-transparent",
            "opacity-50 group-hover:opacity-100",
            "transition-opacity duration-300"
          )}
        />
      </span>

      {/* Hexagonal corner accents */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent/50 rounded-tl group-hover:border-accent transition-colors" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent/50 rounded-tr group-hover:border-accent transition-colors" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent/50 rounded-bl group-hover:border-accent transition-colors" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent/50 rounded-br group-hover:border-accent transition-colors" />

      {/* Button text */}
      <span
        className={cn(
          "relative z-10 flex items-center justify-center gap-2",
          variant === "primary" ? "text-accent" : "text-foreground",
          "group-hover:text-glow transition-all duration-300"
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default ArcReactorButton;
