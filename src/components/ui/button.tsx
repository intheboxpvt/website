import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm rounded-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg",
        outline: "border-2 border-primary/30 bg-transparent text-primary hover:bg-primary hover:text-primary-foreground rounded-lg",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg",
        ghost: "hover:bg-muted hover:text-foreground rounded-lg",
        link: "text-primary underline-offset-4 hover:underline",
        // Royal Premium variants
        gold: "bg-gold-metallic text-royal-purple hover:bg-gold-dark hover:shadow-lg rounded-lg shadow-md font-semibold",
        "gold-outline": "border-2 border-gold-metallic bg-transparent text-gold-metallic hover:bg-gold-metallic hover:text-royal-purple rounded-lg font-semibold",
        hero: "bg-gold-metallic text-royal-purple hover:bg-gold-dark hover:shadow-lg transform hover:-translate-y-0.5 rounded-lg font-semibold shadow-md text-base",
        "hero-outline": "border-2 border-gold-metallic/50 bg-transparent text-ivory hover:border-gold-metallic hover:text-gold-metallic rounded-lg font-semibold",
        royal: "bg-royal-purple text-ivory hover:bg-deep-plum rounded-lg font-semibold shadow-md",
        "royal-outline": "border-2 border-royal-purple bg-transparent text-royal-purple hover:bg-royal-purple hover:text-ivory rounded-lg font-semibold",
        ivory: "bg-ivory text-royal-purple hover:bg-warm-ivory rounded-lg font-semibold shadow-md",
        whatsapp: "bg-emerald text-ivory hover:bg-forest-green rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
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