import React, { useState, useEffect, useRef } from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { Unit } from "@/lib/configurator/types";
import ITBLabel from "./ui/ITBLabel";

export const DimensionsInput = () => {
  const dimensions = useConfigStore((s) => s.dimensions);
  const setDimensions = useConfigStore((s) => s.setDimensions);
  const setUnit = useConfigStore((s) => s.setUnit);

  // Local state to allow instant keystroke feedback
  const [localL, setLocalL] = useState(dimensions.length.toString());
  const [localW, setLocalW] = useState(dimensions.width.toString());
  const [localH, setLocalH] = useState(dimensions.height.toString());

  // Ref to hold debounce timers
  const timeoutLRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutWRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutHRef = useRef<NodeJS.Timeout | null>(null);

  // Sync local state when store dimensions are converted (e.g. unit toggle clicked)
  useEffect(() => {
    setLocalL(dimensions.length.toString());
    setLocalW(dimensions.width.toString());
    setLocalH(dimensions.height.toString());
  }, [dimensions.length, dimensions.width, dimensions.height]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timeoutLRef.current) clearTimeout(timeoutLRef.current);
      if (timeoutWRef.current) clearTimeout(timeoutWRef.current);
      if (timeoutHRef.current) clearTimeout(timeoutHRef.current);
    };
  }, []);

  const handleLChange = (valStr: string) => {
    setLocalL(valStr);
    const parsed = parseFloat(valStr);
    if (!isNaN(parsed) && parsed > 0) {
      if (timeoutLRef.current) clearTimeout(timeoutLRef.current);
      timeoutLRef.current = setTimeout(() => {
        setDimensions({ length: parsed });
      }, 150);
    }
  };

  const handleWChange = (valStr: string) => {
    setLocalW(valStr);
    const parsed = parseFloat(valStr);
    if (!isNaN(parsed) && parsed > 0) {
      if (timeoutWRef.current) clearTimeout(timeoutWRef.current);
      timeoutWRef.current = setTimeout(() => {
        setDimensions({ width: parsed });
      }, 150);
    }
  };

  const handleHChange = (valStr: string) => {
    setLocalH(valStr);
    const parsed = parseFloat(valStr);
    if (!isNaN(parsed) && parsed > 0) {
      if (timeoutHRef.current) clearTimeout(timeoutHRef.current);
      timeoutHRef.current = setTimeout(() => {
        setDimensions({ height: parsed });
      }, 150);
    }
  };

  const units: Unit[] = ["mm", "cm", "in"];

  return (
    <div className="space-y-5 mt-4">
      {/* Unit Segmented Control */}
      <div className="flex items-center gap-3">
        <ITBLabel text="Unit" className="w-12 text-[9px]" />
        <div className="flex rounded-full bg-[color:var(--itb-bg)] p-0.5 border border-[color:var(--itb-border)]">
          {units.map((u) => {
            const isSelected = dimensions.unit === u;
            return (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "bg-[color:var(--itb-accent)] text-black font-bold"
                    : "text-[color:var(--itb-muted)] hover:text-[color:var(--itb-fg)]"
                }`}
                aria-label={`Switch unit to ${u}`}
              >
                {u}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-3 gap-3">
        {/* Length L */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="dim-l" className="block">
            <ITBLabel text="L" className="text-[9px]" />
          </label>
          <div className="relative flex items-center">
            <input
              id="dim-l"
              type="number"
              value={localL}
              onChange={(e) => handleLChange(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[rgba(200,161,90,0.5)] focus:border-[color:var(--itb-accent)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
              min="1"
            />
            <span className="absolute right-3 text-[9px] font-mono text-[color:var(--itb-muted)] select-none">
              {dimensions.unit}
            </span>
          </div>
        </div>

        {/* Width W */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="dim-w" className="block">
            <ITBLabel text="W" className="text-[9px]" />
          </label>
          <div className="relative flex items-center">
            <input
              id="dim-w"
              type="number"
              value={localW}
              onChange={(e) => handleWChange(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[rgba(200,161,90,0.5)] focus:border-[color:var(--itb-accent)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
              min="1"
            />
            <span className="absolute right-3 text-[9px] font-mono text-[color:var(--itb-muted)] select-none">
              {dimensions.unit}
            </span>
          </div>
        </div>

        {/* Height H */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="dim-h" className="block">
            <ITBLabel text="H" className="text-[9px]" />
          </label>
          <div className="relative flex items-center">
            <input
              id="dim-h"
              type="number"
              value={localH}
              onChange={(e) => handleHChange(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[rgba(200,161,90,0.5)] focus:border-[color:var(--itb-accent)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
              min="1"
            />
            <span className="absolute right-3 text-[9px] font-mono text-[color:var(--itb-muted)] select-none">
              {dimensions.unit}
            </span>
          </div>
        </div>
      </div>

      <div className="text-[11px] font-sans text-[color:var(--itb-muted)] italic text-left select-none leading-none mt-1">
        * Inner (inside) measurements
      </div>
    </div>
  );
};

export default DimensionsInput;
