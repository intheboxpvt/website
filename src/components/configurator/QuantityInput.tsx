import React from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { Minus, Plus } from "lucide-react";

export const QuantityInput = () => {
  const quantity = useConfigStore((s) => s.quantity);
  const setQuantity = useConfigStore((s) => s.setQuantity);

  const handleDecrement = () => {
    if (quantity <= 100) return;
    
    let nextQty = quantity;
    if (quantity <= 10000) {
      nextQty = quantity - 100;
    } else {
      nextQty = quantity - 1000;
    }
    
    // Ensure we don't drop below 100
    setQuantity(Math.max(100, nextQty));
  };

  const handleIncrement = () => {
    let nextQty = quantity;
    if (quantity < 10000) {
      nextQty = quantity + 100;
    } else {
      nextQty = quantity + 1000;
    }

    // Ensure we don't exceed 100000
    setQuantity(Math.min(100000, nextQty));
  };

  const handleManualChange = (valStr: string) => {
    const parsed = parseInt(valStr, 10);
    if (!isNaN(parsed)) {
      setQuantity(parsed);
    } else if (valStr === "") {
      setQuantity(100);
    }
  };

  const handleBlur = () => {
    // Enforce bounds on focus loss
    if (quantity < 100) {
      setQuantity(100);
    } else if (quantity > 100000) {
      setQuantity(100000);
    }
  };

  return (
    <div className="space-y-2 mt-4 text-left">
      <div className="flex items-center gap-2 max-w-[200px]">
        <label htmlFor="quantity-input" className="sr-only">
          Production Run Quantity
        </label>
        
        {/* Minus Stepper Button */}
        <button
          onClick={handleDecrement}
          disabled={quantity <= 100}
          className="p-2.5 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-[color:var(--itb-muted)] hover:text-[color:var(--itb-fg)] hover:border-[color:var(--itb-muted)] transition-all duration-300 disabled:opacity-30 disabled:hover:text-[color:var(--itb-muted)] disabled:hover:border-[color:var(--itb-border)]"
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>

        {/* Numeric Input */}
        <input
          id="quantity-input"
          type="number"
          value={quantity}
          onChange={(e) => handleManualChange(e.target.value)}
          onBlur={handleBlur}
          className="flex-1 min-w-[80px] text-center py-2 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-xs font-mono text-[color:var(--itb-fg)] focus:outline-none focus:ring-2 focus:ring-[rgba(200,161,90,0.5)] focus:border-[color:var(--itb-accent)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          min="100"
          max="100000"
        />

        {/* Plus Stepper Button */}
        <button
          onClick={handleIncrement}
          disabled={quantity >= 100000}
          className="p-2.5 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-[color:var(--itb-muted)] hover:text-[color:var(--itb-fg)] hover:border-[color:var(--itb-muted)] transition-all duration-300 disabled:opacity-30 disabled:hover:text-[color:var(--itb-muted)] disabled:hover:border-[color:var(--itb-border)]"
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="text-[10px] font-sans text-[color:var(--itb-muted)]">
        * Minimum order: 100 units.
      </div>
    </div>
  );
};

export default QuantityInput;
