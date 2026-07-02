import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { RotateCw, ChevronDown, ChevronUp, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ITBButton from "@/components/configurator/ui/ITBButton";
import ITBLabel from "@/components/configurator/ui/ITBLabel";
import ITBDivider from "@/components/configurator/ui/ITBDivider";
import { useConfigStore } from "@/lib/configurator/store";
import TemplateGallery from "@/components/configurator/TemplateGallery";
import { TEMPLATES } from "@/lib/configurator/templates";

// ConfigPanel input components
import BoxTypeSelector from "@/components/configurator/BoxTypeSelector";
import DimensionsInput from "@/components/configurator/DimensionsInput";
import MaterialPicker from "@/components/configurator/MaterialPicker";
import FinishPicker from "@/components/configurator/FinishPicker";
import FoilSelect from "@/components/configurator/FoilSelect";
import PrintingSelect from "@/components/configurator/PrintingSelect";
import QuantityInput from "@/components/configurator/QuantityInput";
import LogoUpload from "@/components/configurator/LogoUpload";
import DielineView from "@/components/configurator/DielineView";
import QuoteModal, { quoteData, captureViewerSnapshot } from "@/components/configurator/QuoteModal";
import ScreenshotOverlay from "@/components/configurator/ScreenshotOverlay";

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
      <div className="w-full h-full flex items-center justify-center bg-[color:var(--itb-bg)] text-[color:var(--itb-muted)] font-mono text-xs uppercase tracking-[0.2em]">
        Loading 3D Workspace...
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

  // State for dismissible banner when coming from the product catalogue
  const [showCatalogueBanner, setShowCatalogueBanner] = useState(
    searchParams.get("source") === "catalogue"
  );
  const catalogueProductName = searchParams.get("name") || "";

  // Zustand Store variables
  const store = useConfigStore();

  // Load configuration template dynamically if template query param is present
  const templateId = searchParams.get("template");
  React.useEffect(() => {
    if (templateId) {
      const found = TEMPLATES.find((t) => t.id === templateId);
      if (found) {
        store.setBoxType(found.config.boxType);
        store.setDimensions(found.config.dimensions);
        store.setMaterial(found.config.material);
        store.setFinish(found.config.finish);
        store.setFoilEffect(found.config.foilEffect);
        store.setPrintingSide(found.config.printingSide);
        store.setQuantity(found.config.quantity);
      }
    }
  }, [templateId]);

  // Block Ctrl+S and Cmd+S save shortcuts
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const ctrl = isMac ? e.metaKey : e.ctrlKey;
      if (ctrl && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
      }
      if (ctrl && e.shiftKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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
                      <span className="font-sans text-[10px] text-[color:var(--itb-muted)] whitespace-normal leading-tight">
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
          <div className="w-full md:w-[55%] bg-[color:var(--itb-bg)] md:sticky md:top-[calc(var(--itb-nav-h)+80px)] h-[50vh] md:h-[calc(100vh-var(--itb-nav-h)-80px)] flex flex-col justify-between p-6 md:p-8 z-10 configurator-viewer viewer-watermark">
            {/* Center Canvas with Dieline crossfade */}
            <div className="flex-1 border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] overflow-hidden bg-[color:var(--itb-bg)] relative">
              {/* InTheBox Branding Badge Overlay */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 border border-[color:var(--itb-border)] rounded-lg shadow-sm flex items-center gap-1.5 select-none pointer-events-none">
                <img src="/assets/logo.png" alt="InTheBox" className="h-6 w-auto brightness-0" />
                <span className="font-mono text-[9px] text-[#1c0f24]/50 uppercase tracking-widest font-bold border-l border-[color:var(--itb-border)] pl-1.5">3D Workspace</span>
              </div>

              <div 
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  store.viewMode === "3d" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <Viewer3D />
              </div>
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  store.viewMode === "dieline" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <DielineView />
              </div>
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

              <div className="flex items-center gap-3">
                <ITBLabel text="Auto Rotate" className="w-24 flex-shrink-0" />
                <button
                  onClick={() => store.setIsRotating(!store.isRotating)}
                  className={`p-2 rounded-full border transition-all duration-300 ${
                    store.isRotating 
                      ? "border-[color:var(--itb-accent)] text-[color:var(--itb-accent)] bg-[rgba(200,161,90,0.08)] ring-1 ring-[color:var(--itb-accent)]" 
                      : "border-[color:var(--itb-border)] text-[color:var(--itb-muted)] hover:text-[color:var(--itb-fg)] hover:border-[color:var(--itb-muted)]"
                  }`}
                  aria-label={store.isRotating ? "Stop auto rotation" : "Start auto rotation"}
                  aria-pressed={store.isRotating}
                >
                  <RotateCw size={14} className={store.isRotating ? "animate-spin" : ""} style={{ animationDuration: "8s" }} />
                </button>
              </div>

              {/* Zoom controls */}
              <div className="flex items-center gap-3">
                <ITBLabel text="Zoom Space" className="w-24 flex-shrink-0" />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("configurator-zoom-out"))}
                    className="w-8 h-8 rounded-full border border-[color:var(--itb-border)] bg-[color:var(--itb-surface)] text-[color:var(--itb-fg)] hover:bg-[color:var(--itb-accent)] hover:text-white flex items-center justify-center font-bold font-mono text-sm transition-all duration-300 shadow-sm"
                    title="Zoom Out"
                  >
                    -
                  </button>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("configurator-zoom-in"))}
                    className="w-8 h-8 rounded-full border border-[color:var(--itb-border)] bg-[color:var(--itb-surface)] text-[color:var(--itb-fg)] hover:bg-[color:var(--itb-accent)] hover:text-white flex items-center justify-center font-bold font-mono text-sm transition-all duration-300 shadow-sm"
                    title="Zoom In"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Row 3: Open / Close Slider */}
              <div className="flex items-center gap-3">
                <ITBLabel text="Fold Status" className="w-24 flex-shrink-0" />
                <div className="flex-1 flex items-center gap-4 max-w-xs">
                  <span className="font-mono text-[9px] text-[color:var(--itb-muted)] uppercase tracking-wider">Close</span>
                  <input
                    type="range"
                    id="lid-open-slider"
                    min="0"
                    max="100"
                    value={Math.round(store.lidOpenAmount * 100)}
                    onChange={(e) => store.setLidOpen(parseInt(e.target.value) / 100)}
                    aria-label="Lid open amount"
                    aria-valuetext={`${Math.round(store.lidOpenAmount * 100)}% open`}
                    className="flex-1 bg-[color:var(--itb-border)] h-[2px] rounded-lg appearance-none cursor-pointer accent-[color:var(--itb-accent)] [&::-webkit-slider-thumb]:w-[14px] [&::-webkit-slider-thumb]:h-[14px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[color:var(--itb-accent)] [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:w-[14px] [&::-moz-range-thumb]:h-[14px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[color:var(--itb-accent)] [&::-moz-range-thumb]:border-none"
                  />
                  <span className="font-mono text-[9px] text-[color:var(--itb-muted)] uppercase tracking-wider">Open</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Configurator Panel */}
          <div className="w-full md:w-[45%] bg-[color:var(--itb-surface)] border-t md:border-t-0 md:border-l border-[color:var(--itb-border)] p-6 md:p-8 flex flex-col justify-between z-10 h-auto md:h-[calc(100vh-var(--itb-nav-h)-80px)] md:overflow-y-auto configurator-panel">
            {/* Input Sections Scroll Area */}
            <div className="space-y-0">
              
              {showCatalogueBanner && catalogueProductName && (
                <div className="mb-6 p-4 bg-[color:var(--itb-card)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] flex items-center justify-between text-[11px] text-[color:var(--itb-muted)] font-sans">
                  <div className="flex-1 text-left leading-relaxed">
                    <span className="text-[color:var(--itb-fg)] font-mono font-medium">Starting from:</span> {decodeURIComponent(catalogueProductName)}
                    <span className="mx-2">·</span>
                    <span>Switch box type anytime using the selector below.</span>
                  </div>
                  <button
                    onClick={() => setShowCatalogueBanner(false)}
                    className="text-[color:var(--itb-muted)] hover:text-[color:var(--itb-fg)] p-1 ml-4 flex-shrink-0"
                    aria-label="Dismiss banner"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

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
                <LogoUpload />
              </div>
              <ITBDivider className="my-0" />
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-8 space-y-3">
              <ITBButton 
                label="Save Custom Design" 
                variant="outline" 
                fullWidth 
                onClick={() => {
                  // Save design to localStorage via store action
                  store.saveDesign?.();
                }}
              />
              <ITBButton 
                label="Request Quote →" 
                variant="primary" 
                fullWidth 
                onClick={() => {
                  const snapshot = captureViewerSnapshot();
                  quoteData.snapshot = snapshot;
                  store.setQuoteOpen(true);
                }}
              />
            </div>
            
            <QuoteModal />
          </div>
        </div>

        <ScreenshotOverlay />

        {/* ZONE C: TEMPLATES ROW */}
        <section className="w-full bg-[color:var(--itb-bg)] border-t border-[color:var(--itb-border)] py-12 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <TemplateGallery />
          </div>
        </section>

        <Footer />

      </div>
    </div>
  );
};

export default Customize;
