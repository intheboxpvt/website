import React from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { FoilEffect } from "@/lib/configurator/types";
import ITBLabel from "./ui/ITBLabel";

export const FoilSelect = () => {
  const selectedFoil = useConfigStore((s) => s.foilEffect);
  const setFoilEffect = useConfigStore((s) => s.setFoilEffect);

  const foilColors: Record<FoilEffect, string> = {
    none: "transparent",
    gold_foil: "#C8A15A",
    silver_foil: "#C8C8C8",
    holographic: "linear-gradient(45deg, #f43f5e, #3b82f6, #10b981)",
    rose_gold_foil: "#B76E79",
  };

  const getDotStyle = (foil: FoilEffect): React.CSSProperties => {
    const col = foilColors[foil];
    if (foil === "holographic") {
      return { backgroundImage: col };
    }
    return { backgroundColor: col };
  };

  return (
    <div className="flex items-center gap-4 mt-4 w-full max-w-sm">
      <label htmlFor="foil-select" className="sr-only">
        Foil Stamping Finish
      </label>
      
      {/* Dynamic Colored Indicator Dot */}
      <div 
        className={`w-4 h-4 rounded-full border border-white/20 flex-shrink-0 transition-all duration-300 ${
          selectedFoil === "none" ? "bg-transparent border-dashed" : ""
        }`}
        style={getDotStyle(selectedFoil)}
        aria-hidden="true"
      />

      {/* Stylized native select */}
      <select
        id="foil-select"
        value={selectedFoil}
        onChange={(e) => setFoilEffect(e.target.value as FoilEffect)}
        className="flex-1 px-4 py-2.5 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-xs font-mono text-[color:var(--itb-fg)] focus:outline-none focus:ring-2 focus:ring-[rgba(200,161,90,0.5)] focus:border-[color:var(--itb-accent)] cursor-pointer"
      >
        <option value="none">No Foil Stamping</option>
        <option value="gold_foil">Gold Hot Foil</option>
        <option value="silver_foil">Silver Hot Foil</option>
        <option value="holographic">Holographic Rainbow Foil</option>
        <option value="rose_gold_foil">Rose Gold Hot Foil</option>
      </select>
    </div>
  );
};

export default FoilSelect;
