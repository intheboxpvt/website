'use client';

import React from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { TEMPLATES, ConfigTemplate } from "@/lib/configurator/templates";
import ITBButton from "./ui/ITBButton";
import { toast } from "sonner";

export const TemplateGallery = () => {
  const store = useConfigStore();

  const handleUseTemplate = (template: ConfigTemplate) => {
    // Populate store configuration
    store.setBoxType(template.config.boxType);
    store.setDimensions({
      length: template.config.dimensions.length,
      width: template.config.dimensions.width,
      height: template.config.dimensions.height,
      unit: template.config.dimensions.unit,
    });
    store.setMaterial(template.config.material);
    store.setFinish(template.config.finish);
    store.setFoilEffect(template.config.foilEffect);
    store.setPrintingSide(template.config.printingSide);
    store.setQuantity(template.config.quantity);

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Show confirmation toast
    toast.success("Template loaded. Customize away.");
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-[color:var(--itb-fg)]" style={{ fontFamily: "var(--font-clash)" }}>
          Start from a template
        </h2>
        <p className="text-xs text-[color:var(--itb-muted)] font-sans mt-1">
          Choose a premium preconfigured starting point and customize it to match your brand specifications.
        </p>
      </div>

      {/* Responsive grid of cards (no horizontal scrollbar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            className="w-full h-[330px] bg-[color:var(--itb-surface)] border border-[color:var(--itb-border)] hover:border-[rgba(200,161,90,0.4)] rounded-[var(--itb-radius)] overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-sm"
          >
            {/* Top 58% - Preview Image */}
            <div className="h-[58%] w-full bg-black/5 overflow-hidden relative border-b border-[color:var(--itb-border)] flex items-center justify-center">
              <img
                src={tmpl.previewImage}
                alt={tmpl.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102 select-none pointer-events-none"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>

            {/* Bottom 42% - Metadata & Action */}
            <div className="h-[42%] p-4 flex flex-col justify-between bg-black/[0.02] text-left">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-[color:var(--itb-fg)] truncate">
                  {tmpl.name}
                </h4>
                <p className="text-[10px] text-[color:var(--itb-muted)] line-clamp-2 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              <div className="pt-2">
                <ITBButton
                  label="Use this →"
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => handleUseTemplate(tmpl)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
