import React from "react";
import { cn } from "@/lib/utils";

interface ITBLabelProps {
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ITBLabel = ({ text, className, children }: ITBLabelProps) => {
  return (
    <span
      className={cn(
        "block font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--itb-muted)]",
        className
      )}
    >
      {children || text}
    </span>
  );
};

export default ITBLabel;
