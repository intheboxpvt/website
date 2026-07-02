import React, { useState, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { RotateCw, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import ITBButton from "@/components/configurator/ui/ITBButton";
import ITBLabel from "@/components/configurator/ui/ITBLabel";
import ITBDivider from "@/components/configurator/ui/ITBDivider";
import { useConfigStore } from "@/lib/configurator/store";

// ConfigPanel input components
import BoxTypeSelector from "@/components/configurator/BoxTypeSelector";
import DimensionsInput from "@/components/configurator/DimensionsInput";
import MaterialPicker from "@/components/configurator/MaterialPicker";
import FinishPicker from "@/components/configurator/FinishPicker";
import FoilSelect from "@/components/configurator/FoilSelect";
import PrintingSelect from "@/components/configurator/PrintingSelect";
import QuantityInput from "@/components/configurator/QuantityInput";

// Dynamic import helper for Vite React SPA
function dynamic<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options?: { ssr?: boolean; loading?: () => React.ReactNode }
) {
  const LazyComponent = React.lazy(importFunc);
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={options?.loading ? options.loading() : null}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// Dynamically import Viewer3D with SSR disabled
const Viewer3D = dynamic(
  () => import("@/components/configurator/Viewer3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#050505] text-[color:var(--itb-muted)] font-mono text-xs uppercase tracking-[0.2em]">
        Loading viewer...
      </div>
    ),
  }
);

export const Customize = () => {
  const [searchParams] = useSearchParams();
  const preset = searchParams.get("preset");
  const config = searchParams.get("config");

  // State for mobile guide strip expand/collapse
  const [isGuideExpanded, setIsGuideExpanded] = useState(false);

  // Zustand Store variables
  const store = useConfigStore();

  const steps = [
    { num: "01", label: "Choose Box", desc: "Select a container blueprint" },
    { num: "02", label: "Set Dimensions", desc: "Define precise packaging size" },
    { num: "03", label: "Add Your Brand", desc: "Upload logo & pick finishes" },
    { num: "04", label: "Request Quote", desc: "Get high volume pricing" },
  ];

  const templates = [
    { id: "1", label: "Premium Rigid Box", desc: "Luxury presentation style" },
    { id: "2", label: "Kraft Mailer", desc: "Eco-friendly shipping" },
    { id: "3", label: "Cosmetic Jar Box", desc: "Bespoke retail packaging" },
    { id: "4", label: "Thank You Card", desc: "Stationery customizer" },
  ];

  return (
    <div className="min-h-screen bg-[color:var(--itb-bg)] text-[color:var(--itb-fg)] font-body flex flex-col overflow-x-hidden">
      <SEO 
        title="Design Your Packaging | InTheBox Configurator"
        description="Visualize your custom packaging in 3D..."
      />
      <Helmet>
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navbar />

      {/* Main Container shifted below Navbar */}
      <div className="pt-[var(--itb-nav-h)] flex-1 flex flex-col">
        
        {/* ZONE A: TOP GUIDE STRIP */}
        <section className="w-full bg-[color:var(--itb-surface)] border-b border-[color:var(--itb-border)] z-30">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-auto md:h-20 flex flex-col md:flex-row md:items-center justify-between py-4 md:py-0">
            {/* Mobile guide strip trigger */}
            <div 
              className="md:hidden flex items-center justify-between w-full cursor-pointer py-1 select-none"
              onClick={() => setIsGuideExpanded(!isGuideExpanded)}
            >
              <span className="font-mono text-xs text-[color:var(--itb-accent)] uppercase tracking-widest font-bold">
                How it works
              </span>
              <div className="flex items-center gap-1.5 text-[color:var(--itb-muted)]">
                <span className="text-[10px] font-mono">Steps 01-04</span>
                {isGuideExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>

            {/* Steps wrapper - hidden on mobile unless expanded */}
            <div className={`md:flex flex-col md:flex-row items-stretch md:items-center justify-between w-full gap-4 mt-4 md:mt-0 ${
              isGuideExpanded ? "flex" : "hidden"
            }`}>
              {steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-start md:items-center gap-3 py-2 md:py-0">
                    <span className="font-mono text-sm text-[color:var(--itb-accent)] font-bold">
                      {step.num}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[color:var(--itb-fg)]">
                        {step.label}
                      </span>
                      <span className="font-sans text-[10px] text-[color:var(--itb-muted)] whitespace-nowrap">
                        {step.desc}
                      </span>
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <span className="hidden md:inline text-[color:var(--itb-muted)] px-2 select-none font-mono font-light">
                      →
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ZONE B: MAIN TWO-COLUMN AREA */}
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* Left Column: 3D Canvas Area */}
          <div className="w-full md:w-[55%] bg-[color:var(--itb-bg)] md:sticky md:top-[calc(var(--itb-nav-h)+80px)] h-[50vh] md:h-[calc(100vh-var(--itb-nav-h)-80px)] flex flex-col justify-between p-6 md:p-8 z-10">
            {/* Center Canvas or Dieline Placeholder */}
            <div className="flex-1 flex items-center justify-center border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] overflow-hidden bg-[#050505]">
              {store.viewMode === "3d" ? (
                <Viewer3D />
              ) : (
                <span className="font-mono text-xs text-[color:var(--itb-muted)] uppercase tracking-[0.2em] text-center px-4">
                  Dieline view coming soon
                </span>
              )}
            </div>

            {/* Controls Rows */}
            <div className="mt-6 space-y-4">
              {/* Row 1: View mode toggle */}
              <div className="flex items-center gap-3">
                <ITBLabel text="View Option" className="w-24 flex-shrink-0" />
                <div className="inline-flex rounded-full bg-[color:var(--itb-surface)] p-0.5 border border-[color:var(--itb-border)]">
                  <button
                    onClick={() => store.setViewMode("3d")}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
                      store.viewMode === "3d" 
                        ? "bg-[color:var(--itb-accent)] text-black font-bold animate-pulse-soft" 
                        : "text-[color:var(--itb-muted)] hover:text-[color:var(--itb-fg)]"
                    }`}
                  >
                    3D
                  </button>
                  <button
                    onClick={() => store.setViewMode("dieline")}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
                      store.viewMode === "dieline" 
                        ? "bg-[color:var(--itb-accent)] text-black font-bold" 
                        : "text-[color:var(--itb-muted)] hover:text-[color:var(--itb-fg)]"
                    }`}
                  >
                    Dieline
                  </button>
                </div>
              </div>

              {/* Row 2: Auto-rotate toggle */}
              <div className="flex items-center gap-3">
                <ITBLabel text="Auto Rotate" className="w-24 flex-shrink-0" />
                <button
                  onClick={() => store.setIsRotating(!store.isRotating)}
                  className={`p-2 rounded-full border transition-all duration-300 ${
                    store.isRotating 
                      ? "border-[color:var(--itb-accent)] text-[color:var(--itb-accent)] bg-[rgba(200,161,90,0.08)] ring-1 ring-[color:var(--itb-accent)]" 
                      : "border-[color:var(--itb-border)] text-[color:var(--itb-muted)] hover:text-[color:var(--itb-fg)] hover:border-[color:var(--itb-muted)]"
                  }`}
                  title="Toggle Auto Rotation"
                >
                  <RotateCw size={14} className={store.isRotating ? "animate-spin" : ""} style={{ animationDuration: "8s" }} />
                </button>
              </div>

              {/* Row 3: Open / Close Slider */}
              <div className="flex items-center gap-3">
                <ITBLabel text="Fold Status" className="w-24 flex-shrink-0" />
                <div className="flex-1 flex items-center gap-4 max-w-xs">
                  <span className="font-mono text-[9px] text-[color:var(--itb-muted)] uppercase tracking-wider">Close</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={Math.round(store.lidOpenAmount * 100)}
                    onChange={(e) => store.setLidOpen(parseInt(e.target.value) / 100)}
                    className="flex-1 bg-[color:var(--itb-border)] h-[2px] rounded-lg appearance-none cursor-pointer accent-[color:var(--itb-accent)] [&::-webkit-slider-thumb]:w-[14px] [&::-webkit-slider-thumb]:h-[14px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[color:var(--itb-accent)] [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:w-[14px] [&::-moz-range-thumb]:h-[14px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[color:var(--itb-accent)] [&::-moz-range-thumb]:border-none"
                  />
                  <span className="font-mono text-[9px] text-[color:var(--itb-muted)] uppercase tracking-wider">Open</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Configurator Panel */}
          <div className="w-full md:w-[45%] bg-[color:var(--itb-surface)] border-t md:border-t-0 md:border-l border-[color:var(--itb-border)] p-6 md:p-8 flex flex-col justify-between z-10 h-auto md:h-[calc(100vh-var(--itb-nav-h)-80px)] md:overflow-y-auto">
            {/* Input Sections Scroll Area */}
            <div className="space-y-0">
              
              {/* BOX TYPE Section */}
              <div className="py-6">
                <ITBLabel text="BOX TYPE" />
                <BoxTypeSelector />
              </div>
              <ITBDivider className="my-0" />

              {/* DIMENSIONS Section */}
              <div className="py-6">
                <ITBLabel text="DIMENSIONS" />
                <DimensionsInput />
              </div>
              <ITBDivider className="my-0" />

              {/* MATERIAL Section */}
              <div className="py-6">
                <ITBLabel text="MATERIAL" />
                <MaterialPicker />
              </div>
              <ITBDivider className="my-0" />

              {/* FINISHING Section */}
              <div className="py-6">
                <ITBLabel text="FINISHING" />
                <FinishPicker />
              </div>
              <ITBDivider className="my-0" />

              {/* FOIL STAMPING Section */}
              <div className="py-6">
                <ITBLabel text="FOIL STAMPING" />
                <FoilSelect />
              </div>
              <ITBDivider className="my-0" />

              {/* PRINTING SIDES Section */}
              <div className="py-6">
                <ITBLabel text="PRINTING SIDES" />
                <PrintingSelect />
              </div>
              <ITBDivider className="my-0" />

              {/* QUANTITY Section */}
              <div className="py-6">
                <ITBLabel text="QUANTITY" />
                <QuantityInput />
              </div>
              <ITBDivider className="my-0" />

              {/* YOUR LOGO Section */}
              <div className="py-6">
                <ITBLabel text="YOUR LOGO" />
                <p className="text-xs text-[color:var(--itb-muted)] font-sans mt-2 italic text-left">
                  (placeholder — built in Prompt 5)
                </p>
              </div>
              <ITBDivider className="my-0" />
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-8 space-y-3">
              <ITBButton 
                label="Save Custom Design" 
                variant="outline" 
                fullWidth 
                onClick={() => console.log("Save Custom Design clicked:", store)}
              />
              <ITBButton 
                label="Request Quote →" 
                variant="primary" 
                fullWidth 
                onClick={() => console.log("Request Quote clicked:", store)}
              />
            </div>
          </div>
        </div>

        {/* ZONE C: TEMPLATES ROW */}
        <section className="w-full bg-[color:var(--itb-bg)] border-t border-[color:var(--itb-border)] py-12 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <h3 className="font-mono text-xs text-[color:var(--itb-accent)] uppercase tracking-[0.25em] mb-6">
              Start from a template
            </h3>
            
            {/* Horizontal Scrollable Row */}
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10">
              {templates.map((tmpl) => (
                <div 
                  key={tmpl.id} 
                  className="flex-shrink-0 w-72 bg-[color:var(--itb-surface)] border border-[color:var(--itb-border)] hover:border-[color:var(--itb-accent)] p-6 transition-all duration-300 group cursor-pointer"
                >
                  <div className="h-28 bg-[color:var(--itb-bg)] rounded-[var(--itb-radius)] border border-[color:var(--itb-border)] flex items-center justify-center mb-4 relative overflow-hidden">
                    <span className="font-mono text-[10px] text-[color:var(--itb-muted)] uppercase tracking-wider z-10">
                      Sample Geometry
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h4 className="font-mono text-xs font-bold uppercase text-[color:var(--itb-fg)]">
                    {tmpl.label}
                  </h4>
                  <p className="font-sans text-[11px] text-[color:var(--itb-muted)] mt-1.5">
                    {tmpl.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Customize;
