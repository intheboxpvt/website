import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-accent text-white border border-[#1c0f24]/10 shadow-[0_0_0_3px_#d5a037_inset] hover:bg-accent/90 transform hover:-translate-y-0.5 transition duration-300 rounded-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg",
        outline: "bg-transparent text-accent border border-accent shadow-[0_0_0_3px_#d5a037_inset] hover:bg-accent/10 transform hover:-translate-y-0.5 transition duration-300 rounded-lg",
        secondary: "bg-card border border-border text-foreground hover:bg-accent/5 rounded-lg shadow-sm",
        ghost: "hover:bg-muted hover:text-foreground rounded-lg",
        link: "text-primary underline-offset-4 hover:underline",
        // Royal Premium variants
        gold: "bg-accent text-white border border-[#1c0f24]/10 shadow-[0_0_0_3px_#d5a037_inset] hover:bg-accent/90 transform hover:-translate-y-0.5 transition duration-300 rounded-lg",
        "gold-outline": "bg-transparent text-accent border border-accent shadow-[0_0_0_3px_#d5a037_inset] hover:bg-accent/10 transform hover:-translate-y-0.5 transition duration-300 rounded-lg",
        hero: "bg-accent text-white border border-[#1c0f24]/10 shadow-[0_0_0_3px_#d5a037_inset] hover:bg-accent/90 transform hover:-translate-y-1 transition duration-300 rounded-lg font-semibold text-base",
        "hero-outline": "bg-transparent text-white border border-white/20 shadow-[0_0_0_3px_#ffffff_inset] hover:bg-white/10 transform hover:-translate-y-1 transition duration-300 rounded-lg font-semibold",
        royal: "bg-[#1d0a27] text-white border border-white/10 shadow-[0_0_0_3px_#1d0a27_inset] hover:bg-[#35124e] transform hover:-translate-y-0.5 transition duration-300 rounded-lg font-semibold",
        "royal-outline": "border border-border bg-transparent text-foreground hover:border-accent rounded-lg font-semibold",
        ivory: "bg-[#faf9f5] text-[#1c0f24] border border-[#1c0f24]/15 shadow-[0_0_0_3px_#faf9f5_inset] hover:bg-[#eae8e2] transform hover:-translate-y-0.5 transition duration-300 rounded-lg font-semibold",
        whatsapp: "bg-emerald text-white hover:bg-emerald/90 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-7 py-2 text-sm",
        sm: "h-9 px-5 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };