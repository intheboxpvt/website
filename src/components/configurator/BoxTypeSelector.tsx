import React from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { BoxType } from "@/lib/configurator/types";
import ITBLabel from "./ui/ITBLabel";

interface BoxTypeCard {
  id: BoxType;
  label: string;
  desc: string;
  svg: React.ReactNode;
}

export const BoxTypeSelector = () => {
  const selectedType = useConfigStore((s) => s.boxType);
  const setBoxType = useConfigStore((s) => s.setBoxType);

  const list: BoxTypeCard[] = [
    {
      id: "straight_tuck",
      label: "Straight Tuck",
      desc: "Tall carton with folding tabs",
      svg: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-[var(--itb-accent)] fill-none" aria-hidden="true">
          <rect x="12" y="11" width="16" height="20" rx="1" />
          <path d="M12 11 l3.5 -4 h9 l3.5 4" />
        </svg>
      ),
    },
    {
      id: "reverse_tuck",
      label: "Reverse Tuck",
      desc: "Carton with reversed flap folds",
      svg: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-[var(--itb-accent)] fill-none" aria-hidden="true">
          <rect x="12" y="9" width="16" height="20" rx="1" />
          <path d="M12 29 l3.5 4 h9 l3.5 -4" />
        </svg>
      ),
    },
    {
      id: "rigid_lid_base",
      label: "Rigid Box",
      desc: "Premium gift lid and base set",
      svg: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-[var(--itb-accent)] fill-none" aria-hidden="true">
          <rect x="10" y="21" width="20" height="11" rx="1" />
          <rect x="9" y="11" width="22" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: "mailer",
      label: "Mailer Box",
      desc: "Shipping carton with front tabs",
      svg: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-[var(--itb-accent)] fill-none" aria-hidden="true">
          <rect x="6" y="14" width="28" height="16" rx="1" />
          <path d="M6 14 l14 9.5 l14 -9.5" />
        </svg>
      ),
    },
    {
      id: "sleeve",
      label: "Outer Sleeve",
      desc: "Open sliding sleeve overlay",
      svg: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-[var(--itb-accent)] fill-none" aria-hidden="true">
          <rect x="8" y="11" width="24" height="18" rx="1" />
          <rect x="12" y="14" width="16" height="12" rx="0.5" strokeDasharray="2 2" />
        </svg>
      ),
    },
    {
      id: "drawer",
      label: "Drawer Box",
      desc: "Slide-out tray inside sleeve",
      svg: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-[var(--itb-accent)] fill-none" aria-hidden="true">
          <rect x="8" y="11" width="24" height="18" rx="1" />
          <rect x="13" y="14" width="19" height="12" rx="0.5" />
        </svg>
      ),
    },
    {
      id: "perfume",
      label: "Perfume Box",
      desc: "Narrow cosmetics tuck folding carton",
      svg: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-[var(--itb-accent)] fill-none" aria-hidden="true">
          <rect x="15" y="9" width="10" height="25" rx="1" />
          <path d="M15 9 l2 -4 h6 l2 4" />
        </svg>
      ),
    },
    {
      id: "gift",
      label: "Gift Box",
      desc: "Shallow base & lid styling",
      svg: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-[var(--itb-accent)] fill-none" aria-hidden="true">
          <rect x="6" y="24" width="28" height="9" rx="1" />
          <rect x="5" y="16" width="30" height="6" rx="1" />
        </svg>
      ),
    },
    {
      id: "bag",
      label: "Paper Bag",
      desc: "Premium carrier bag with handle",
      svg: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-[var(--itb-accent)] fill-none" aria-hidden="true">
          <path d="M15 15 c0 -3, 10 -3, 10 0" />
          <rect x="11" y="15" width="18" height="18" rx="1" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {list.map((item) => {
        const isSelected = selectedType === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setBoxType(item.id)}
            className={`flex flex-col items-start p-4 text-left rounded-[var(--itb-radius)] border transition-all duration-300 ${
              isSelected
                ? "border-[color:var(--itb-accent)] bg-[rgba(200,161,90,0.06)] shadow-sm"
                : "border-[color:var(--itb-border)] hover:bg-white/[0.04]"
            }`}
            aria-label={`${item.label} box type: ${item.desc}`}
          >
            <div className="mb-3">{item.svg}</div>
            <div className="font-mono text-xs font-bold uppercase text-[color:var(--itb-fg)]">
              {item.label}
            </div>
            <div className="font-sans text-[10px] text-[color:var(--itb-muted)] mt-1 leading-snug">
              {item.desc}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default BoxTypeSelector;
