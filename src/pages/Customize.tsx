import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { RotateCw, X, Box, Palette, FileText, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ITBButton from "@/components/configurator/ui/ITBButton";
import ITBLabel from "@/components/configurator/ui/ITBLabel";
import ITBDivider from "@/components/configurator/ui/ITBDivider";
import { useConfigStore } from "@/lib/configurator/store";
import { TEMPLATES } from "@/lib/configurator/templates";
import { parseUrlConfig } from "@/lib/configurator/quoteSummary";

// ConfigPanel components
import BoxTypeSelector from "@/components/configurator/BoxTypeSelector";
import DimensionsInput from "@/components/configurator/DimensionsInput";
import BoxColorPicker from "@/components/configurator/BoxColorPicker";
import QuantityInput from "@/components/configurator/QuantityInput";
import LogoUpload from "@/components/configurator/LogoUpload";
import DielineView from "@/components/configurator/DielineView";
import QuoteModal, { quoteData, captureViewerSnapshot } from "@/components/configurator/QuoteModal";
import ScreenshotOverlay from "@/components/configurator/ScreenshotOverlay";
import TemplatePresetSelector from "@/components/configurator/TemplatePresetSelector";

// Dynamic import helper
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

// Dynamically import Viewer3D
const Viewer3D = dynamic(
  () => import("@/components/configurator/Viewer3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#edf0f5] text-foreground/50 font-mono text-xs uppercase tracking-[0.2em]">
        Loading 3D Studio...
      </div>
    ),
  }
);

export const Customize = () => {
  const [searchParams] = useSearchParams();
  const preset = searchParams.get("preset");
  const templateId = searchParams.get("template");
  
  const [showCatalogueBanner, setShowCatalogueBanner] = useState(
    searchParams.get("source") === "catalogue"
  );
  const catalogueProductName = searchParams.get("name") || "";

  const store = useConfigStore();
  const [activeStep, setActiveStep] = useState(1);

  // Restore state from shareable URL params or preset query on mount
  useEffect(() => {
    const urlConfig = parseUrlConfig(searchParams);
    if (urlConfig) {
      if (urlConfig.boxType) store.setBoxType(urlConfig.boxType);
      if (urlConfig.dimensions) store.setDimensions(urlConfig.dimensions);
      if (urlConfig.boxColor) store.setBoxColor(urlConfig.boxColor);
      if (urlConfig.quantity) store.setQuantity(urlConfig.quantity);
      if (urlConfig.logoFace) store.setLogoFace(urlConfig.logoFace as any);
      if (urlConfig.logoX !== undefined) store.setLogoX(urlConfig.logoX);
      if (urlConfig.logoY !== undefined) store.setLogoY(urlConfig.logoY);
      if (urlConfig.logoScale !== undefined) store.setLogoScale(urlConfig.logoScale);
      if (urlConfig.logoRotation !== undefined) store.setLogoRotation(urlConfig.logoRotation);
    } else if (preset) {
      store.setBoxType(preset as any);
    }
  }, [searchParams]);

  useEffect(() => {
    if (templateId) {
      const found = TEMPLATES.find((t) => t.id === templateId);
      if (found) {
        store.setBoxType(found.config.boxType);
        store.setDimensions(found.config.dimensions);
        store.setMaterial(found.config.material);
        store.setQuantity(found.config.quantity);
      }
    }
  }, [templateId]);

  // Block Ctrl+S save shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const ctrl = isMac ? e.metaKey : e.ctrlKey;
      if (ctrl && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Simplified 3-Step Workflow: 1 PRODUCT -> 2 DESIGN -> 3 REVIEW
  const steps = [
    { id: 1, name: "Product", desc: "Structure & Preset", icon: Box },
    { id: 2, name: "Design", desc: "Size, Color & Artwork", icon: Palette },
    { id: 3, name: "Review", desc: "Quantity & Quote", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body flex flex-col overflow-x-hidden">
      <SEO 
        title="3D Packaging Studio | Custom Packaging Customizer | InTheBox"
        description="Design and customize your bespoke packaging in real-time 3D. Choose box structures, dimensions, custom colors, and upload your brand artwork."
      />
      <Helmet>
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navbar />

      <div className="pt-20 flex-1 flex flex-col">
        
        {/* STEPPER HEADER */}
        <section className="w-full bg-card border-b border-border z-30 shadow-xs">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-8 w-full justify-between md:justify-start">
              {steps.map((step) => {
                const isActive = activeStep === step.id;
                const isPassed = activeStep > step.id;

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`flex items-center gap-2.5 py-2 px-4 rounded-xl transition-all ${
                      isActive
                        ? "bg-[#1c0f24] border border-accent/40 shadow-sm"
                        : isPassed
                          ? "text-accent font-medium hover:bg-card"
                          : "text-foreground/50 hover:text-foreground hover:bg-card"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] ${
                      isActive 
                        ? "bg-accent text-[#1d0a27] font-bold" 
                        : isPassed
                          ? "bg-accent/20 text-accent font-bold"
                          : "bg-muted text-foreground/50"
                    }`}>
                      {isPassed ? <Check className="w-3.5 h-3.5" /> : step.id}
                    </div>
                    <div className="text-left hidden sm:block">
                      <p className={`font-mono text-xs uppercase tracking-wider leading-none ${
                        isActive 
                          ? "text-accent font-bold" 
                          : isPassed
                            ? "text-accent/90 font-semibold"
                            : "text-foreground/70"
                      }`}>
                        {step.name}
                      </p>
                      <p className={`font-sans text-[10px] mt-0.5 ${
                        isActive ? "text-white/90" : "text-foreground/50"
                      }`}>
                        {step.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* MAIN WORKSPACE SPLIT VIEW */}
        <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-140px)]">
          
          {/* LEFT COLUMN: 3D / Dieline Viewport (60% Desktop) */}
          <div className="w-full md:w-[60%] bg-[#edf0f5] relative flex flex-col justify-between p-4 md:p-6 border-b md:border-b-0 md:border-r border-border">
            
            {/* Viewport Header Overlay */}
            <div className="flex items-center justify-between z-20 mb-3 select-none">
              <div className="flex items-center gap-2 bg-background/90 backdrop-blur-md px-3.5 py-1.5 border border-border rounded-xl shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  {store.viewMode === "3d" ? "3D Preview" : "2D Dieline Blueprint"}
                </span>
              </div>

              {/* View Mode Toggle Switch */}
              <div className="inline-flex rounded-xl bg-background/90 backdrop-blur-md p-1 border border-border shadow-xs">
                <button
                  onClick={() => store.setViewMode("3d")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                    store.viewMode === "3d"
                      ? "bg-[#1c0f24] text-white font-semibold"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  3D
                </button>
                <button
                  onClick={() => store.setViewMode("dieline")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                    store.viewMode === "dieline"
                      ? "bg-[#1c0f24] text-white font-semibold"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  Dieline
                </button>
              </div>
            </div>

            {/* Viewport Canvas Container */}
            <div className="flex-1 rounded-2xl overflow-hidden relative shadow-inner border border-border/50 bg-[#edf0f5]">
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ${
                  store.viewMode === "3d" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <Viewer3D />
              </div>
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ${
                  store.viewMode === "dieline" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <DielineView />
              </div>
            </div>

            {/* 3D-Only Controls Bar — Hidden when in Dieline mode */}
            {store.viewMode === "3d" && (
              <div className="mt-3 bg-background/90 backdrop-blur-md border border-border rounded-xl p-3 flex flex-wrap items-center justify-between gap-4 z-20 shadow-xs">
                {/* Fold Open/Close Slider */}
                <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                  <ITBLabel text="Fold Status" className="text-[10px] w-20 flex-shrink-0" />
                  <div className="flex-1 flex items-center gap-3">
                    <span className="font-mono text-[10px] text-foreground/50">Close</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={Math.round(store.lidOpenAmount * 100)}
                      onChange={(e) => store.setLidOpen(parseInt(e.target.value) / 100)}
                      aria-label="Lid fold amount"
                      className="flex-1 bg-border h-[3px] rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <span className="font-mono text-[10px] text-foreground/50">Open</span>
                  </div>
                </div>

                {/* Controls Action Group */}
                <div className="flex items-center gap-2">
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent("configurator-zoom-out"))}
                      className="w-7 h-7 rounded-lg border border-border bg-card text-foreground hover:bg-accent hover:text-[#1d0a27] font-bold font-mono text-xs transition-all flex items-center justify-center"
                      title="Zoom Out"
                    >
                      -
                    </button>
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent("configurator-zoom-in"))}
                      className="w-7 h-7 rounded-lg border border-border bg-card text-foreground hover:bg-accent hover:text-[#1d0a27] font-bold font-mono text-xs transition-all flex items-center justify-center"
                      title="Zoom In"
                    >
                      +
                    </button>
                  </div>

                  {/* Auto Rotate Toggle */}
                  <button
                    onClick={() => store.setIsRotating(!store.isRotating)}
                    className={`p-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
                      store.isRotating 
                        ? "border-accent text-accent bg-accent/10 font-semibold" 
                        : "border-border text-foreground/60 hover:text-foreground hover:border-foreground/30"
                    }`}
                    title="Toggle Auto Rotation"
                  >
                    <RotateCw size={12} className={store.isRotating ? "animate-spin" : ""} style={{ animationDuration: "8s" }} />
                    <span className="hidden sm:inline text-[10px]">Rotate</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Configuration Controls Panel (40% Desktop) */}
          <div className="w-full md:w-[40%] bg-card p-6 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-140px)]">
            
            <div className="space-y-6">
              
              {/* Catalogue Origin Banner */}
              {showCatalogueBanner && catalogueProductName && (
                <div className="p-3.5 bg-accent/10 border border-accent/30 rounded-xl flex items-center justify-between text-xs text-foreground font-sans">
                  <div className="flex-1">
                    <span className="font-mono text-accent font-semibold">Configuring:</span> {decodeURIComponent(catalogueProductName)}
                  </div>
                  <button
                    onClick={() => setShowCatalogueBanner(false)}
                    className="text-foreground/50 hover:text-foreground p-1 ml-2"
                    aria-label="Dismiss banner"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* STEP 1: PRODUCT STRUCTURE & PRESETS */}
              {activeStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <ITBLabel text="SELECT PRIMARY STRUCTURE" />
                    <BoxTypeSelector />
                  </div>

                  <ITBDivider />

                  {/* Start From Template Presets */}
                  <TemplatePresetSelector />

                  <ITBButton
                    label="Continue to Design & Size →"
                    variant="primary"
                    fullWidth
                    onClick={() => setActiveStep(2)}
                  />
                </div>
              )}

              {/* STEP 2: DESIGN & SIZE (Combined Size + Color + Logo) */}
              {activeStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Dimensions & Size */}
                  <div>
                    <ITBLabel text="DIMENSIONS & SIZE" />
                    <DimensionsInput />
                  </div>

                  <ITBDivider />

                  {/* Box Color */}
                  <div>
                    <ITBLabel text="BOX COLOR" />
                    <BoxColorPicker />
                  </div>
                  
                  <ITBDivider />

                  {/* Your Logo & Placement */}
                  <div>
                    <ITBLabel text="YOUR LOGO & BRANDING" />
                    <LogoUpload />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-border">
                    <ITBButton
                      label="← Back"
                      variant="outline"
                      onClick={() => setActiveStep(1)}
                    />
                    <ITBButton
                      label="Continue to Review →"
                      variant="primary"
                      fullWidth
                      onClick={() => setActiveStep(3)}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: REVIEW & QUANTITY */}
              {activeStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <ITBLabel text="ORDER QUANTITY" />
                    <QuantityInput />
                  </div>

                  <ITBDivider />

                  {/* Design Specification Summary Card */}
                  <div className="p-4 rounded-xl bg-background border border-border space-y-3 shadow-xs">
                    <p className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                      Configuration Summary
                    </p>
                    <div className="space-y-2 text-xs font-sans text-foreground/70">
                      <div className="flex justify-between">
                        <span>Structure:</span>
                        <span className="font-mono font-semibold text-foreground capitalize">
                          {store.boxType.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimensions:</span>
                        <span className="font-mono font-semibold text-foreground">
                          {store.dimensions.length} × {store.dimensions.width} × {store.dimensions.height} {store.dimensions.unit}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Color:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full border border-border inline-block" style={{ backgroundColor: store.boxColor }}></span>
                          <span className="font-mono font-semibold text-foreground uppercase">{store.boxColor}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Logo:</span>
                        <span className="font-mono font-semibold text-foreground">
                          {store.logoDataUrl ? `Uploaded (${store.logoFace.toUpperCase()})` : 'None'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span className="font-mono font-semibold text-foreground">{store.quantity.toLocaleString()} units</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 Review Actions */}
                  <div className="space-y-3 pt-2">
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

                    <ITBButton
                      label="← Back to Design"
                      variant="outline"
                      fullWidth
                      onClick={() => setActiveStep(2)}
                    />
                  </div>
                </div>
              )}

            </div>

            <QuoteModal />
          </div>
        </div>

        <ScreenshotOverlay />

        <Footer />

      </div>
    </div>
  );
};

export default Customize;
