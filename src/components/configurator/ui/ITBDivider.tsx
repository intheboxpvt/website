import React from "react";
import { cn } from "@/lib/utils";

interface ITBDividerProps {
  className?: string;
}

export const ITBDivider = ({ className }: ITBDividerProps) => {
  return (
    <hr
      className={cn(
        "border-t border-[var(--itb-border)] my-6",
        className
      )}
    />
  );
};

export default ITBDivider;
