import React from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { Material } from "@/lib/configurator/types";

interface MaterialCard {
  id: Material;
  label: string;
  gsm: string;
  color: string;
}

export const MaterialPicker = () => {
  const selectedMaterial = useConfigStore((s) => s.material);
  const setMaterial = useConfigStore((s) => s.setMaterial);

  const list: MaterialCard[] = [
    {
      id: "white_cardboard",
      label: "White Cardboard",
      gsm: "220–300 gsm",
      color: "#F5F0EB",
    },
    {
      id: "kraft",
      label: "Natural Kraft",
      gsm: "Natural Fibers",
      color: "#C4975A",
    },
    {
      id: "black_cardboard",
      label: "Black Board",
      gsm: "Black-core Stock",
      color: "#1C1C1C",
    },
    {
      id: "rigid_greyboard",
      label: "Rigid Greyboard",
      gsm: "1500+ gsm Thick",
      color: "#8A8A8A",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {list.map((item) => {
        const isSelected = selectedMaterial === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setMaterial(item.id)}
            className={`flex items-center gap-3 p-3.5 text-left rounded-[var(--itb-radius)] border transition-all duration-300 ${
              isSelected
                ? "border-[color:var(--itb-accent)] bg-[rgba(200,161,90,0.06)] shadow-sm"
                : "border-[color:var(--itb-border)] hover:bg-white/[0.04]"
            }`}
            aria-label={`${item.label} material: ${item.gsm}`}
          >
            {/* Color Swatch */}
            <div
              className="w-6 h-6 rounded-[2px] border border-white/10 flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            {/* Texts */}
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold uppercase text-[color:var(--itb-fg)] leading-tight">
                {item.label}
              </span>
              <span className="font-sans text-[10px] text-[color:var(--itb-muted)] mt-0.5 leading-none">
                {item.gsm}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default MaterialPicker;
