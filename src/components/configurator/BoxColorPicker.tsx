import { useState } from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { Check } from "lucide-react";

interface ColorPreset {
  name: string;
  hex: string;
  border?: string;
  isKraft?: boolean;
}

const PRESETS: ColorPreset[] = [
  { name: "White", hex: "#FFFFFF", border: "#E2E8F0" },
  { name: "Kraft", hex: "#C4975A", isKraft: true },
  { name: "Black", hex: "#1C1C1C" },
  { name: "Navy", hex: "#1D0A27" },
  { name: "Royal Purple", hex: "#3B1859" },
];

export const BoxColorPicker = () => {
  const boxColor = useConfigStore((s) => s.boxColor);
  const setBoxColor = useConfigStore((s) => s.setBoxColor);
  const material = useConfigStore((s) => s.material);
  const setMaterial = useConfigStore((s) => s.setMaterial);

  const [customHex, setCustomHex] = useState(boxColor || "#FFFFFF");

  const handleSelectPreset = (preset: ColorPreset) => {
    if (preset.isKraft) {
      setMaterial("kraft");
      setBoxColor("#C4975A");
    } else {
      if (material === "kraft") {
        setMaterial("white_cardboard");
      }
      setBoxColor(preset.hex);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomHex(val);
    if (material === "kraft") {
      setMaterial("white_cardboard");
    }
    setBoxColor(val);
  };

  return (
    <div className="space-y-3 mt-3">
      {/* Presets Grid */}
      <div className="grid grid-cols-5 gap-2">
        {PRESETS.map((p) => {
          const isSelected = (p.isKraft && material === "kraft") || boxColor.toUpperCase() === p.hex.toUpperCase();
          return (
            <button
              key={p.name}
              onClick={() => handleSelectPreset(p)}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                isSelected
                  ? "border-accent bg-accent/10 shadow-sm"
                  : "border-border hover:border-accent/40 bg-card"
              }`}
              title={p.name}
            >
              <div
                className="w-7 h-7 rounded-full border shadow-inner flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundColor: p.hex,
                  borderColor: p.border || "rgba(0,0,0,0.15)",
                }}
              >
                {isSelected && (
                  <Check className={`w-3.5 h-3.5 ${p.hex === "#FFFFFF" ? "text-black" : "text-white"}`} />
                )}
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-foreground/70 truncate w-full text-center">
                {p.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Color Input */}
      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <label htmlFor="custom-hex-color" className="font-mono text-[10px] uppercase text-foreground/60 tracking-wider">
          Custom Color:
        </label>
        <div className="flex items-center gap-2 flex-1">
          <input
            id="custom-hex-color"
            type="color"
            value={boxColor || "#FFFFFF"}
            onChange={handleCustomChange}
            className="w-8 h-8 rounded-lg border border-border cursor-pointer bg-transparent"
          />
          <input
            type="text"
            value={boxColor || "#FFFFFF"}
            onChange={(e) => {
              const val = e.target.value;
              setCustomHex(val);
              if (/^#[0-9A-F]{6}$/i.test(val)) {
                if (material === "kraft") setMaterial("white_cardboard");
                setBoxColor(val);
              }
            }}
            placeholder="#FFFFFF"
            className="w-24 px-2.5 py-1 bg-card border border-border rounded-lg font-mono text-xs text-foreground focus:outline-none focus:border-accent"
          />
        </div>
      </div>
    </div>
  );
};

export default BoxColorPicker;
