import React from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { Finish } from "@/lib/configurator/types";

interface FinishCard {
  id: Finish;
  label: string;
  desc: string;
}

export const FinishPicker = () => {
  const selectedFinish = useConfigStore((s) => s.finish);
  const setFinish = useConfigStore((s) => s.setFinish);

  const list: FinishCard[] = [
    {
      id: "matte_lamination",
      label: "Matte Lamination",
      desc: "Smooth · Elegant · Non-reflective",
    },
    {
      id: "gloss_lamination",
      label: "Gloss Lamination",
      desc: "High shine · Vivid · Reflective",
    },
    {
      id: "soft_touch",
      label: "Soft Touch Matte",
      desc: "Velvety · Ultra-premium · Tactile",
    },
    {
      id: "aqueous_coating",
      label: "Aqueous Coating",
      desc: "Satin · Subtle sheen · Eco-friendly",
    },
    {
      id: "no_finish",
      label: "No Finish",
      desc: "Raw · Minimal · Natural texture",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {list.map((item) => {
        const isSelected = selectedFinish === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setFinish(item.id)}
            className={`flex flex-col items-start p-4 text-left rounded-[var(--itb-radius)] border transition-all duration-300 ${
              isSelected
                ? "border-[color:var(--itb-accent)] bg-[rgba(200,161,90,0.06)] shadow-sm"
                : "border-[color:var(--itb-border)] hover:bg-white/[0.04]"
            } ${item.id === "no_finish" ? "col-span-2" : ""}`}
            aria-label={`${item.label} finish: ${item.desc}`}
          >
            <span className="font-mono text-xs font-bold uppercase text-[color:var(--itb-fg)]">
              {item.label}
            </span>
            <span className="font-sans text-[10px] text-[color:var(--itb-muted)] mt-1 leading-snug">
              {item.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FinishPicker;
