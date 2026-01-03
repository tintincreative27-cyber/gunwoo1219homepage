import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  icon: LucideIcon;
  label: string;
  className?: string;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon: Icon, label, className }) => {
  return (
    <div
      className={cn(
        "trust-badge flex items-center gap-2 px-4 py-2 rounded-lg",
        className
      )}
    >
      <Icon className="w-5 h-5 text-accent" />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
};

export default TrustBadge;
