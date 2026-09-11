import React, { useState } from "react";
import { PackagingConfig } from "@/types/studio";
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface StepperSidebarProps {
    config: PackagingConfig;
    onChange: (config: PackagingConfig) => void;
    currentStep: number;
    onStepChange: (step: number) => void;
}

export const STEPS = [
    { id: 1, title: "Dimensions", description: "Define your packaging size" },
    { id: 2, title: "Material & Finish", description: "Select color and texture" },
    { id: 3, title: "Branding", description: "Add logos and watermarks" },
    { id: 4, title: "Review & Quote", description: "Review design and submit" },
] as const;

// Helper to convert BLOB reference to base64 payload
const convertBlobToBase64 = async (blobUrl: string): Promise<string> => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

const StepperSidebar = ({ config, onChange, currentStep, onStepChange }: StepperSidebarProps) => {
    // Local states for Contact/Quote form logic
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        quantity: 1000,
        notes: ""
    });
    const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            onStepChange(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            onStepChange(currentStep - 1);
        }
    };

    // Convert dimensions between units on toggle
    const handleUnitToggle = () => {
        const isMM = config.dimensions.unit === "mm";
        const nextUnit = isMM ? "in" : "mm";
        const factor = isMM ? 1 / 25.4 : 25.4;

        onChange({
            ...config,
            dimensions: {
                width: isMM
                    ? Math.round((config.dimensions.width * factor) * 10) / 10
                    : Math.round(config.dimensions.width * factor),
                height: isMM
                    ? Math.round((config.dimensions.height * factor) * 10) / 10
                    : Math.round(config.dimensions.height * factor),
                depth: isMM
                    ? Math.round((config.dimensions.depth * factor) * 10) / 10
                    : Math.round(config.dimensions.depth * factor),
                unit: nextUnit,
            }
        });
    };

    // Branding Custom Logo handlers
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Size / Type validations
        const validTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (!validTypes.includes(file.type)) {
            alert("Invalid format! Please upload a PNG or JPEG logo.");
            return;
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert("File is too large! Maximum limit is 5MB.");
            return;
        }

        const dataUrl = URL.createObjectURL(file);
        onChange({
            ...config,
            logo: {
                ...config.logo,
                file: dataUrl,
            }
        });
    };

    const handleRemoveFile = () => {
        if (config.logo.file) {
            URL.revokeObjectURL(config.logo.file);
        }
        onChange({
            ...config,
            logo: {
                ...config.logo,
                file: null,
            }
        });
    };

    // PRICING ESTIMATION LOGIC
    const getMMVal = (val: number, unit: "mm" | "in") => {
        return unit === "in" ? val * 25.4 : val;
    };

    const wVal = getMMVal(config.dimensions.width, config.dimensions.unit);
    const hVal = getMMVal(config.dimensions.height, config.dimensions.unit);
    const dVal = getMMVal(config.dimensions.depth, config.dimensions.unit);

    // Total flat surface area in square meters
    const surfaceAreaM2 = (2 * (wVal * hVal + hVal * dVal + wVal * dVal)) / 1000000;

    // Preset texture multipliers
    const presetMultiplier =
        config.texturePreset === "kraft" ? 1.45 :
            config.texturePreset === "subtle-grain" ? 2.10 : 1.0;

    const finishMultiplier = config.finish === "gloss" ? 1.15 : 1.0;
    const foilAdd = config.foilEffect ? 0.35 : 0.0;

    // Unit Cost calculations before volume scale discount
    const calculatedUnitCost = (surfaceAreaM2 * 8.2 * presetMultiplier * finishMultiplier) + foilAdd + 0.55;
    const clampedUnitCost = Math.max(0.65, calculatedUnitCost);

    // Volume scale discounts (power curve discount)
    const qtyDiscount = Math.max(0.65, Math.pow(form.quantity, -0.07) * 1.6);

    const minCost = clampedUnitCost * qtyDiscount * 0.9;
    const maxCost = clampedUnitCost * qtyDiscount * 1.15;

    const totalMin = minCost * form.quantity;
    const totalMax = maxCost * form.quantity;

    // SUBMIT QUOTE FLOW
    const handleQuoteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Client side form validation
        const nextErrors: Record<string, string> = {};
        if (!form.name.trim()) nextErrors.name = "Full Name is required.";
        if (!form.company.trim()) nextErrors.company = "Company is required.";
        if (!form.email.trim()) {
            nextErrors.email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            nextErrors.email = "Please enter a valid email.";
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        setSubmitStatus("submitting");
        setErrors({});

        try {
            // 1. Convert local blob logo url to base64 string
            let base64Logo: string | null = null;
            if (config.logo.file && config.logo.file.startsWith("blob:")) {
                try {
                    base64Logo = await convertBlobToBase64(config.logo.file);
                } catch (imgErr) {
                    console.error("Failed to encode blob logo data:", imgErr);
                }
            } else {
                base64Logo = config.logo.file;
            }

            // 2. Fetch canvas rendering snapshot
            const canvas = document.querySelector("canvas");
            let snapshot: string | null = null;
            if (canvas) {
                try {
                    snapshot = canvas.toDataURL("image/jpeg", 0.85);
                } catch (canvasErr) {
                    console.error("Web GL snapshot failed:", canvasErr);
                }
            }

            // 3. Serialised payload structure matching request.ts expectations
            const payload = {
                name: form.name.trim(),
                company: form.company.trim(),
                email: form.email.trim(),
                phone: "",
                productDescription: form.notes.trim() || undefined,
                timeline: "As soon as possible",
                message: `Interactive 3D Configurator Request. Finish: ${config.finish}, foil: ${config.foilEffect ? "Gold Foil" : "none"}, Watermark: ${config.watermarkEnabled ? "Enabled" : "Disabled"}. Texture Preset: ${config.texturePreset}. Estimate Range: $${minCost.toFixed(2)}-$${maxCost.toFixed(2)}`,
                config: {
                    boxType: config.boxType,
                    dimensions: {
                        length: config.dimensions.width,
                        width: config.dimensions.depth,
                        height: config.dimensions.height,
                        unit: config.dimensions.unit
                    },
                    material: config.texturePreset,
                    finish: config.finish,
                    foilEffect: config.foilEffect ? "gold_foil" : "none",
                    printingSide: config.logo.face === "inside" ? "inside" : "outside",
                    quantity: form.quantity
                },
                snapshot,
                logoBase64: base64Logo,
                configUrl: window.location.href,
                submittedAt: new Date().toISOString()
            };

            const res = await fetch("/api/quote/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error("Submit response not OK");
            }

            const resData = await res.json();
            if (resData.success) {
                setSubmitStatus("success");
            } else {
                throw new Error(resData.error || "Mail dispatch error");
            }

        } catch (err) {
            console.error("Form dispatch failed:", err);
            setSubmitStatus("error");
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#1c0f24] text-white p-6 justify-between select-none">
            {/* Stepper Header */}
            <div>
                <header className="mb-6">
                    <h1 className="font-serif text-2xl text-[#fbbf24]">Product Studio</h1>
                    <p className="text-xs font-sans text-white/50 uppercase tracking-widest mt-1">
                        Bespoke Customizer
                    </p>
                </header>

                {/* Steps Progress Indicator */}
                <div className="relative flex justify-between items-center mb-8 w-full">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/10 z-0"></div>
                    <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#fbbf24] z-0 transition-all duration-300"
                        style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                    ></div>
                    {STEPS.map((step, idx) => {
                        const isActive = idx === currentStep;
                        const isCompleted = idx < currentStep;
                        return (
                            <button
                                key={step.id}
                                onClick={() => onStepChange(idx)}
                                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-300 font-bold ${isActive
                                    ? "bg-[#fbbf24] text-[#1c0f24] ring-4 ring-[#fbbf24]/20"
                                    : isCompleted
                                        ? "bg-[#d9b870] text-[#1c0f24]"
                                        : "bg-[#1d0a27] border border-white/20 text-white/60 hover:border-white/40"
                                    }`}
                                title={step.title}
                            >
                                {step.id}
                            </button>
                        );
                    })}
                </div>

                {/* Active Step Panel Title */}
                <div className="mb-6">
                    <span className="text-[10px] font-mono text-[#d9b870] uppercase tracking-wider">Step {currentStep + 1} of {STEPS.length}</span>
                    <h2 className="text-xl font-serif text-white leading-tight mt-1">{STEPS[currentStep].title}</h2>
                    <p className="text-xs font-sans text-white/60 mt-1">{STEPS[currentStep].description}</p>
                </div>

                {/* Step Configuration Form Fields */}
                <div className="space-y-6 pt-4 border-t border-white/10 min-h-[30vh]">
                    {/* STEP 1: DIMENSIONS */}
                    {currentStep === 0 && (
                        <div className="space-y-4">
                            {/* Unit Toggle */}
                            <div className="flex items-center justify-between p-4 bg-[#1d0a27] border border-white/5">
                                <span className="text-xs font-sans text-white/50 uppercase tracking-wider font-bold">Measurement Unit</span>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-mono transition-colors duration-200 ${config.dimensions.unit === "mm" ? "text-[#fbbf24] font-bold" : "text-white/40"}`}>mm</span>
                                    <button
                                        onClick={handleUnitToggle}
                                        className="w-10 h-5 rounded-full bg-[#1c0f24] border border-[#fbbf24]/30 relative transition-colors"
                                    >
                                        <div
                                            className={`w-3.5 h-3.5 rounded-full bg-[#fbbf24] absolute top-0.5 transition-all duration-300 ${config.dimensions.unit === "in" ? "left-5.5" : "left-0.5"
                                                }`}
                                        ></div>
                                    </button>
                                    <span className={`text-[10px] font-mono transition-colors duration-200 ${config.dimensions.unit === "in" ? "text-[#fbbf24] font-bold" : "text-white/40"}`}>in</span>
                                </div>
                            </div>

                            {/* Dimension sliders and inputs */}
                            {(["width", "height", "depth"] as const).map((dim) => {
                                const label = dim.charAt(0).toUpperCase() + dim.slice(1);
                                const val = config.dimensions[dim];
                                const isMM = config.dimensions.unit === "mm";
                                const min = isMM ? 50 : 2;
                                const max = isMM ? 500 : 20;
                                const step = isMM ? 5 : 0.5;

                                const handleSliderChange = (newVal: number) => {
                                    onChange({
                                        ...config,
                                        dimensions: {
                                            ...config.dimensions,
                                            [dim]: newVal,
                                        },
                                    });
                                };

                                const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                    const inputVal = parseFloat(e.target.value);
                                    if (!isNaN(inputVal)) {
                                        onChange({
                                            ...config,
                                            dimensions: {
                                                ...config.dimensions,
                                                [dim]: inputVal,
                                            },
                                        });
                                    }
                                };

                                return (
                                    <div key={dim} className="space-y-2 bg-[#1d0a27] p-4 border border-white/5">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[10px] uppercase tracking-wider text-white/50 font-bold">{label}</label>
                                            <div className="flex items-center gap-1.5">
                                                <input
                                                    type="number"
                                                    value={val}
                                                    onChange={handleInputChange}
                                                    className="w-16 bg-[#1c0f24] border border-white/10 text-right px-2 py-0.5 text-xs font-mono text-[#fbbf24] focus:outline-none focus:border-[#fbbf24] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    min={min}
                                                    max={max}
                                                    step={step}
                                                />
                                                <span className="text-[9px] font-mono text-white/40">{config.dimensions.unit}</span>
                                            </div>
                                        </div>
                                        <Slider
                                            value={[val]}
                                            onValueChange={(v) => handleSliderChange(v[0])}
                                            max={max}
                                            min={min}
                                            step={step}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* STEP 2: MATERIAL & FINISH */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            {/* Swatch Color Picker */}
                            <div className="bg-[#1d0a27] p-4 border border-white/5 space-y-3">
                                <label className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest block">Base Material Color</label>
                                <div className="flex flex-wrap items-center gap-3">
                                    {[
                                        { value: "#1c0f24", name: "Royal Purple" },
                                        { value: "#4c1d95", name: "Burgundy" },
                                        { value: "#0f172a", name: "Midnight Blue" },
                                        { value: "#064e3b", name: "Forest Green" },
                                        { value: "#faf0e6", name: "Ivory Cream" },
                                        { value: "#111827", name: "Matte Black" }
                                    ].map((color) => {
                                        const isSelected = config.materialColor.toLowerCase() === color.value.toLowerCase();
                                        return (
                                            <button
                                                key={color.value}
                                                title={color.name}
                                                onClick={() => onChange({ ...config, materialColor: color.value })}
                                                className={`w-7 h-7 rounded-full border transition-all duration-300 ${isSelected
                                                    ? "border-[#fbbf24] scale-110 ring-2 ring-[#fbbf24]/20"
                                                    : "border-white/10 hover:scale-105"
                                                    }`}
                                                style={{ backgroundColor: color.value }}
                                            />
                                        );
                                    })}
                                    {/* Custom color picker */}
                                    <div className="relative w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:scale-105 overflow-hidden transition-all duration-300">
                                        <input
                                            type="color"
                                            value={config.materialColor}
                                            onChange={(e) => onChange({ ...config, materialColor: e.target.value })}
                                            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                                        />
                                        <div className="w-3.5 h-3.5 bg-transparent border-2 border-dashed border-white/40 rounded-full" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-[9px] font-mono text-white/40 pt-1">
                                    <span>Current Hex:</span>
                                    <span className="text-[#fbbf24] uppercase">{config.materialColor}</span>
                                </div>
                            </div>

                            {/* Texture/Pattern Preset Selector */}
                            <div className="bg-[#1d0a27] p-4 border border-white/5 space-y-3">
                                <label className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest block">Texture Pattern Preset</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: "solid", label: "Pure Solid", desc: "No grain" },
                                        { id: "kraft", label: "Kraft Paper", desc: "Rustic feel" },
                                        { id: "subtle-grain", label: "Fine Grain", desc: "Luxury feel" }
                                    ].map((preset) => {
                                        const isSelected = config.texturePreset === preset.id;
                                        return (
                                            <button
                                                key={preset.id}
                                                onClick={() => onChange({ ...config, texturePreset: preset.id as any })}
                                                className={`p-3 border text-left transition-all duration-300 flex flex-col justify-between h-20 ${isSelected
                                                    ? "bg-[#1c0f24] border-[#fbbf24] text-white ring-2 ring-[#fbbf24]/20"
                                                    : "bg-[#1c0f24]/50 border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                                                    }`}
                                            >
                                                <span className="text-xs font-bold leading-tight">{preset.label}</span>
                                                <span className="text-[9px] text-white/40 leading-none">{preset.desc}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Finish Coating / Details */}
                            <div className="bg-[#1d0a27] p-4 border border-white/5 space-y-4">
                                <label className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest block">Coating Finish Details</label>

                                {/* Finish tab select */}
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-white/70 font-semibold">Finish Coating</span>
                                    <div className="flex bg-[#1c0f24] p-1 border border-white/10 rounded-sm">
                                        {(["matte", "gloss"] as const).map((mode) => {
                                            const isSelected = config.finish === mode;
                                            return (
                                                <button
                                                    key={mode}
                                                    onClick={() => onChange({ ...config, finish: mode })}
                                                    className={`px-3 py-1 font-sans text-[10px] uppercase tracking-wider transition-all duration-300 font-bold ${isSelected
                                                        ? "bg-[#fbbf24] text-[#1c0f24]"
                                                        : "text-white/50 hover:text-white"
                                                        }`}
                                                >
                                                    {mode}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Foil Stamping Toggle */}
                                <div className="flex justify-between items-center pt-3 border-t border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-white/70 font-semibold">Gold Foil Embossing</span>
                                        <span className="text-[9px] text-white/40">Apply reflective details to visual edges</span>
                                    </div>
                                    <button
                                        onClick={() => onChange({ ...config, foilEffect: !config.foilEffect })}
                                        className={`w-10 h-5 rounded-full border transition-all duration-300 relative ${config.foilEffect
                                            ? "bg-[#fbbf24] border-[#fbbf24]"
                                            : "bg-[#1c0f24] border-white/20"
                                            }`}
                                    >
                                        <div
                                            className={`w-3.5 h-3.5 rounded-full absolute top-0.5 transition-all duration-300 ${config.foilEffect
                                                ? "left-5.5 bg-[#1c0f24]"
                                                : "left-0.5 bg-white/60"
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: BRANDING (LOGO & WATERMARKS) */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            {/* File Input Layer */}
                            <div className="bg-[#1d0a27] p-4 border border-white/5 space-y-3">
                                <label className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest block">Upload Logo Artwork</label>

                                {config.logo.file ? (
                                    <div className="flex items-center justify-between bg-[#1c0f24] p-3 border border-[#fbbf24]/20">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 border border-white/10 overflow-hidden bg-black flex items-center justify-center">
                                                <img
                                                    src={config.logo.file}
                                                    alt="Logo Preview"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <span className="text-xs text-white/60 font-mono">logo_loaded.png</span>
                                        </div>
                                        <button
                                            onClick={handleRemoveFile}
                                            className="text-xs font-bold text-red-400 hover:text-red-300 font-mono"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border border-dashed border-white/20 hover:border-[#fbbf24]/50 p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors relative">
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <span className="text-xs font-sans text-white/60 font-semibold mb-1">Click to Upload Logo</span>
                                        <span className="text-[9px] font-mono text-white/35">PNG or JPEG format (max. 5MB)</span>
                                    </div>
                                )}
                            </div>

                            {config.logo.file && (
                                <>
                                    {/* Face Placement */}
                                    <div className="bg-[#1d0a27] p-4 border border-white/5 space-y-3">
                                        <label className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest block">Logo Face Position</label>
                                        <div className="grid grid-cols-4 gap-1.5">
                                            {(["front", "back", "top", "inside"] as const).map((f) => {
                                                const isSelected = config.logo.face === f;
                                                return (
                                                    <button
                                                        key={f}
                                                        onClick={() => onChange({
                                                            ...config,
                                                            logo: { ...config.logo, face: f }
                                                        })}
                                                        className={`py-2 text-[10px] font-mono font-bold uppercase border transition-all duration-300 ${isSelected
                                                            ? "bg-[#fbbf24] border-[#fbbf24] text-[#1c0f24]"
                                                            : "bg-[#1c0f24] border-white/10 text-white/60 hover:text-white hover:border-white/20"
                                                            }`}
                                                    >
                                                        {f}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Positioning Sliders */}
                                    <div className="bg-[#1d0a27] p-4 border border-white/5 space-y-4">
                                        <label className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest block">Transform & Scale</label>

                                        {/* Scale */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-xs font-sans text-white/70">
                                                <span>Logo Scale</span>
                                                <span className="font-mono text-[#fbbf24]">{config.logo.scale}x</span>
                                            </div>
                                            <Slider
                                                value={[config.logo.scale]}
                                                onValueChange={(v) => onChange({
                                                    ...config,
                                                    logo: { ...config.logo, scale: v[0] }
                                                })}
                                                min={0.2}
                                                max={2.0}
                                                step={0.1}
                                            />
                                        </div>

                                        {/* Horizontal Offset */}
                                        <div className="space-y-2 pt-2 border-t border-white/5">
                                            <div className="flex justify-between items-center text-xs font-sans text-white/70">
                                                <span>Horizontal Offset (X)</span>
                                                <span className="font-mono text-[#fbbf24]">{config.logo.position[0]}%</span>
                                            </div>
                                            <Slider
                                                value={[config.logo.position[0]]}
                                                onValueChange={(v) => onChange({
                                                    ...config,
                                                    logo: { ...config.logo, position: [v[0], config.logo.position[1]] }
                                                })}
                                                min={-50}
                                                max={50}
                                                step={1}
                                            />
                                        </div>

                                        {/* Vertical Offset */}
                                        <div className="space-y-2 pt-2 border-t border-white/5">
                                            <div className="flex justify-between items-center text-xs font-sans text-white/70">
                                                <span>Vertical Offset (Y)</span>
                                                <span className="font-mono text-[#fbbf24]">{config.logo.position[1]}%</span>
                                            </div>
                                            <Slider
                                                value={[config.logo.position[1]]}
                                                onValueChange={(v) => onChange({
                                                    ...config,
                                                    logo: { ...config.logo, position: [config.logo.position[0], v[0]] }
                                                })}
                                                min={-50}
                                                max={50}
                                                step={1}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Watermark Selector */}
                            <div className="bg-[#1d0a27] p-4 border border-white/5 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-xs text-white/70 font-semibold">Branding Frame Watermark</span>
                                    <span className="text-[9px] text-white/40">Apply base InTheBox border watermarks</span>
                                </div>
                                <button
                                    onClick={() => onChange({ ...config, watermarkEnabled: !config.watermarkEnabled })}
                                    className={`w-10 h-5 rounded-full border transition-all duration-300 relative ${config.watermarkEnabled
                                        ? "bg-[#fbbf24] border-[#fbbf24]"
                                        : "bg-[#1c0f24] border-white/20"
                                        }`}
                                >
                                    <div
                                        className={`w-3.5 h-3.5 rounded-full absolute top-0.5 transition-all duration-300 ${config.watermarkEnabled
                                            ? "left-5.5 bg-[#1c0f24]"
                                            : "left-0.5 bg-white/60"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: REVIEW & SUBMIT QUOTE */}
                    {currentStep === 3 && (
                        <div className="space-y-4">
                            {submitStatus === "success" ? (
                                // SUCCESS SCREEN
                                <div className="bg-[#1d0a27] p-6 border border-emerald-500/20 text-center space-y-4 animate-fade-in">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center mx-auto mb-2">
                                        <CheckCircle className="text-emerald-400 w-6 h-6" />
                                    </div>
                                    <h3 className="font-serif text-lg text-white">Quote Request Received</h3>
                                    <p className="text-xs text-white/65 font-sans leading-relaxed">
                                        Thank you. We have received your structural configuration details. Our design specialists will review your design and send structural quotes at <strong className="text-[#fbbf24] font-mono">{form.email}</strong> directly via WhatsApp / Email within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setSubmitStatus("idle")}
                                        className="w-full py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider transition-all font-sans"
                                    >
                                        Send Another Configuration
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                                    {/* Summary Card */}
                                    <div className="bg-[#1d0a27] p-4 border border-white/5 space-y-2.5 text-xs text-left">
                                        <h4 className="text-[10px] font-mono font-bold text-[#fbbf24] uppercase tracking-widest">Configuration Summary</h4>
                                        <div className="divide-y divide-white/5 space-y-1.5 font-sans text-white/70">
                                            <div className="flex justify-between py-1 pt-0">
                                                <span>Box Style:</span>
                                                <span className="font-bold text-white capitalize">{config.boxType}</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>Dimensions:</span>
                                                <span className="font-bold text-white font-mono">{config.dimensions.width}x{config.dimensions.depth}x{config.dimensions.height} {config.dimensions.unit}</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>Background Coating:</span>
                                                <span className="font-bold text-white capitalize">{config.finish} Coat ({config.texturePreset})</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>Custom Logo Artwork:</span>
                                                <span className="font-bold text-white">{config.logo.file ? `Present (${config.logo.face})` : "None"}</span>
                                            </div>
                                            <div className="flex justify-between py-1 pb-0">
                                                <span>Frame Watermark:</span>
                                                <span className="font-bold text-white">{config.watermarkEnabled ? "Enabled" : "Disabled"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pricing & Mockup Info Box */}
                                    <div className="bg-[#1d0a27] p-4 border border-[#fbbf24]/25 space-y-2 text-left relative overflow-hidden">
                                        <div className="absolute right-0 top-0 w-24 h-24 bg-[#fbbf24]/5 rounded-full filter blur-xl pointer-events-none"></div>
                                        <label className="text-[10px] font-mono font-bold text-[#fbbf24] uppercase tracking-widest block">Pricing &amp; Mockups</label>
                                        <p className="text-xs text-white/70 leading-relaxed font-sans">
                                            Final estimated pricing and structural mockups for your design will be shared with you directly via WhatsApp / Email.
                                        </p>
                                    </div>

                                    {/* Submission Error Banner */}
                                    {submitStatus === "error" && (
                                        <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex gap-2 items-center">
                                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                                            <span>Form dispatch error. Please try again later.</span>
                                        </div>
                                    )}

                                    {/* Contact Info Inputs */}
                                    <div className="bg-[#1d0a27] p-4 border border-white/5 space-y-3.5 text-left">
                                        <label className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest block">Contact Details</label>

                                        {/* Name */}
                                        <div className="space-y-1">
                                            <input
                                                type="text"
                                                placeholder="Full Name *"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                className="w-full bg-[#1c0f24] border border-white/10 rounded-none px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#fbbf24]"
                                                disabled={submitStatus === "submitting"}
                                            />
                                            {errors.name && <p className="text-[9px] text-red-400 font-mono mt-0.5">{errors.name}</p>}
                                        </div>

                                        {/* Company */}
                                        <div className="space-y-1">
                                            <input
                                                type="text"
                                                placeholder="Company / Brand Name *"
                                                value={form.company}
                                                onChange={(e) => setForm({ ...form, company: e.target.value })}
                                                className="w-full bg-[#1c0f24] border border-white/10 rounded-none px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#fbbf24]"
                                                disabled={submitStatus === "submitting"}
                                            />
                                            {errors.company && <p className="text-[9px] text-red-400 font-mono mt-0.5">{errors.company}</p>}
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-1">
                                            <input
                                                type="email"
                                                placeholder="Email Address *"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                className="w-full bg-[#1c0f24] border border-white/10 rounded-none px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#fbbf24]"
                                                disabled={submitStatus === "submitting"}
                                            />
                                            {errors.email && <p className="text-[9px] text-red-400 font-mono mt-0.5">{errors.email}</p>}
                                        </div>

                                        {/* Quantity Choice */}
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-mono text-white/40 block">Production Run Quantity *</label>
                                            <select
                                                value={form.quantity}
                                                onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
                                                className="w-full bg-[#1c0f24] border border-white/10 rounded-none px-3 py-2 text-xs font-mono text-[#fbbf24] focus:outline-none focus:border-[#fbbf24] cursor-pointer"
                                                disabled={submitStatus === "submitting"}
                                            >
                                                <option value="250">250 units</option>
                                                <option value="500">500 units</option>
                                                <option value="1000">1,000 units</option>
                                                <option value="2500">2,500 units</option>
                                                <option value="5000">5,000 units</option>
                                                <option value="10000">10,000+ units</option>
                                            </select>
                                        </div>

                                        {/* Notes */}
                                        <div>
                                            <textarea
                                                placeholder="Special Requests (embossing, materials, timelines, delivery addresses...)"
                                                value={form.notes}
                                                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                                rows={3}
                                                className="w-full bg-[#1c0f24] border border-white/10 rounded-none px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#fbbf24] resize-none"
                                                disabled={submitStatus === "submitting"}
                                            />
                                        </div>
                                    </div>

                                    {/* Submission Trigger */}
                                    <button
                                        type="submit"
                                        disabled={submitStatus === "submitting"}
                                        className="w-full py-4 bg-[#fbbf24] text-[#1c0f24] hover:bg-[#d9b870] font-sans text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-300 mt-2 select-none"
                                    >
                                        {submitStatus === "submitting" ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin text-[#1c0f24]" />
                                                Dispatching Request...
                                            </>
                                        ) : (
                                            "Submit Quote Request →"
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Stepper Footer Controls */}
            <div className="flex gap-4 pt-6 border-t border-white/10 mt-8 shrink-0">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`flex-1 py-3.5 px-4 font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 ${currentStep === 0
                        ? "opacity-30 cursor-not-allowed border border-white/10 text-white/30"
                        : "border border-white/20 text-white hover:bg-white/5 hover:border-white/40"
                        }`}
                >
                    <ChevronLeft className="w-4.5 h-4.5" />
                    Back
                </button>
                {currentStep < STEPS.length - 1 && (
                    <button
                        onClick={handleNext}
                        className="flex-1 py-3.5 px-4 font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 bg-[#fbbf24] text-[#1c0f24] hover:bg-[#d9b870]"
                    >
                        Next
                        <ChevronRight className="w-4.5 h-4.5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default StepperSidebar;
