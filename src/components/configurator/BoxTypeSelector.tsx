import React from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { BoxType } from "@/lib/configurator/types";

interface BoxTypeCard {
  id: BoxType;
  label: string;
  desc: string;
  svg: React.ReactNode;
}

export const BoxTypeSelector = () => {
  const selectedType = useConfigStore((s) => s.boxType);
  const setBoxType = useConfigStore((s) => s.setBoxType);

  const primaryStructures: BoxTypeCard[] = [
    {
      id: "rigid_lid_base",
      label: "Rigid Box",
      desc: "Luxury 2-piece base and lid set",
      svg: (
        <svg viewBox="0 0 40 40" className="w-9 h-9 stroke-current fill-none" aria-hidden="true">
          <rect x="10" y="21" width="20" height="11" rx="1.5" strokeWidth="1.5" />
          <rect x="9" y="11" width="22" height="7" rx="1.5" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: "mailer",
      label: "Mailer Box",
      desc: "E-commerce shipper with flap wings",
      svg: (
        <svg viewBox="0 0 40 40" className="w-9 h-9 stroke-current fill-none" aria-hidden="true">
          <rect x="6" y="14" width="28" height="16" rx="1.5" strokeWidth="1.5" />
          <path d="M6 14 l14 9.5 l14 -9.5" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: "drawer",
      label: "Drawer Box",
      desc: "Sliding tray inside protective sleeve",
      svg: (
        <svg viewBox="0 0 40 40" className="w-9 h-9 stroke-current fill-none" aria-hidden="true">
          <rect x="7" y="11" width="22" height="18" rx="1.5" strokeWidth="1.5" />
          <rect x="13" y="14" width="20" height="12" rx="1" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      ),
    },
    {
      id: "straight_tuck",
      label: "Tuck Carton",
      desc: "Lightweight folding carton with tuck flap",
      svg: (
        <svg viewBox="0 0 40 40" className="w-9 h-9 stroke-current fill-none" aria-hidden="true">
          <rect x="13" y="11" width="14" height="20" rx="1.5" strokeWidth="1.5" />
          <path d="M13 11 l2.5 -4 h9 l2.5 4" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      {primaryStructures.map((item) => {
        // Match exact id or group equivalent types (e.g. reverse_tuck/perfume -> straight_tuck, gift -> rigid)
        const isSelected = selectedType === item.id ||
          (item.id === "straight_tuck" && (selectedType === "reverse_tuck" || selectedType === "perfume")) ||
          (item.id === "rigid_lid_base" && selectedType === "gift");

        return (
          <button
            key={item.id}
            onClick={() => setBoxType(item.id)}
            className={`flex flex-col items-start p-3.5 text-left rounded-xl border transition-all duration-200 ${
              isSelected
                ? "border-accent bg-accent/10 text-accent font-semibold shadow-sm"
                : "border-border hover:border-accent/40 bg-card text-foreground/80 hover:text-foreground"
            }`}
            aria-label={`${item.label} box structure`}
          >
            <div className="mb-2.5 text-accent">{item.svg}</div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider">
              {item.label}
            </div>
            <div className="font-sans text-[10px] text-foreground/60 mt-1 leading-snug">
              {item.desc}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default BoxTypeSelector;

