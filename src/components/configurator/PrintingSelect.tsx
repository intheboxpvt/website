import React, { useState } from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { PrintingSide } from "@/lib/configurator/types";
import { Info } from "lucide-react";

export const PrintingSelect = () => {
  const selectedSide = useConfigStore((s) => s.printingSide);
  const setPrintingSide = useConfigStore((s) => s.setPrintingSide);

  const [hoveredButton, setHoveredButton] = useState<PrintingSide | null>(null);

  const options: { id: PrintingSide; label: string }[] = [
    { id: "outside", label: "Outside Only" },
    { id: "inside", label: "Inside Only" },
    { id: "both", label: "Double Sided (Both)" },
  ];

  const tooltipText = "Interior print is available for Rigid and Mailer boxes only.";

  return (
    <div className="relative mt-4 w-full max-w-md">
      {/* Segmented Button Group */}
      <div className="flex rounded-full bg-[color:var(--itb-bg)] p-0.5 border border-[color:var(--itb-border)]">
        {options.map((opt) => {
          const isSelected = selectedSide === opt.id;
          const isRestricted = opt.id === "inside" || opt.id === "both";

          return (
            <button
              key={opt.id}
              onClick={() => setPrintingSide(opt.id)}
              onMouseEnter={() => isRestricted && setHoveredButton(opt.id)}
              onMouseLeave={() => isRestricted && setHoveredButton(null)}
              className={`flex-1 px-4 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all duration-300 relative ${
                isSelected
                  ? "bg-[color:var(--itb-accent)] text-black font-bold"
                  : "text-[color:var(--itb-muted)] hover:text-[color:var(--itb-fg)]"
              }`}
              aria-label={`Print ${opt.label}`}
            >
              <span className="flex items-center justify-center gap-1">
                {opt.label}
                {isRestricted && (
                  <Info size={10} className="opacity-40 hover:opacity-100 flex-shrink-0" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating Tooltip Box */}
      {hoveredButton !== null && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-40 bg-[color:var(--itb-card)] border border-[color:var(--itb-border)] p-2 rounded shadow-2xl text-[10px] font-sans text-center text-[color:var(--itb-muted)] w-64 animate-fade-in pointer-events-none">
          <p>{tooltipText}</p>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] w-2.5 h-2.5 rotate-45 bg-[color:var(--itb-card)] border-r border-b border-[color:var(--itb-border)]" />
        </div>
      )}
    </div>
  );
};

export default PrintingSelect;
