import React from "react";
import { cn } from "@/lib/utils";

interface ITBButtonProps {
  label?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ITBButton = ({
  label,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
  fullWidth,
  className,
  children,
}: ITBButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-mono uppercase tracking-wider transition-all duration-300 select-none rounded-[var(--itb-radius)] border";

  const variants = {
    primary: "border-[var(--itb-accent)] text-[var(--itb-accent)] bg-transparent hover:bg-[rgba(200,161,90,0.08)] disabled:opacity-50 disabled:hover:bg-transparent",
    ghost: "border-transparent text-[var(--itb-muted)] hover:text-[var(--itb-fg)] hover:bg-white/5 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[var(--itb-muted)]",
    outline: "border-[var(--itb-border)] text-[var(--itb-fg)] bg-transparent hover:border-[var(--itb-muted)] disabled:opacity-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px] h-8",
    md: "px-6 py-3 text-[11px] h-10",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className
      )}
    >
      {children || label}
    </button>
  );
};

export default ITBButton;
