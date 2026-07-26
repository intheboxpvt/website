import React, { useRef, useState } from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { Upload, Trash2, RotateCw, MoveHorizontal, MoveVertical, Maximize2, Eye } from "lucide-react";
import ITBLabel from "./ui/ITBLabel";
import { getAvailableSurfaces } from "@/lib/configurator/surfaceMapper";

export const LogoUpload = () => {
  const logoDataUrl = useConfigStore((s) => s.logoDataUrl);
  const logoFace = useConfigStore((s) => s.logoFace);
  const logoX = useConfigStore((s) => s.logoX);
  const logoY = useConfigStore((s) => s.logoY);
  const logoScale = useConfigStore((s) => s.logoScale);
  const logoRotation = useConfigStore((s) => s.logoRotation);
  const logoOpacity = useConfigStore((s) => s.logoOpacity);
  const boxType = useConfigStore((s) => s.boxType);

  const setLogo = useConfigStore((s) => s.setLogo);
  const setLogoFace = useConfigStore((s) => s.setLogoFace);
  const setLogoX = useConfigStore((s) => s.setLogoX);
  const setLogoY = useConfigStore((s) => s.setLogoY);
  const setLogoScale = useConfigStore((s) => s.setLogoScale);
  const setLogoRotation = useConfigStore((s) => s.setLogoRotation);
  const setLogoOpacity = useConfigStore((s) => s.setLogoOpacity);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
  const maxBytes = 2 * 1024 * 1024; // 2MB

  const availableSurfaces = getAvailableSurfaces(boxType);

  const validateAndReadFile = (file: File) => {
    setErrorMsg(null);

    if (!allowedTypes.includes(file.type)) {
      setErrorMsg("Please upload a PNG, SVG or JPEG file.");
      return;
    }

    if (file.size > maxBytes) {
      setErrorMsg("File too large. Please keep logos under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setLogo(e.target.result as string);
      }
    };
    reader.onerror = () => {
      setErrorMsg("Failed to read file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndReadFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndReadFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4 text-left w-full">
      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.svg"
        onChange={handleFileChange}
        className="hidden"
      />

      {!logoDataUrl ? (
        // Drop Zone Empty State
        <div
          onClick={triggerFilePicker}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer select-none transition-all duration-300 ${
            isDragging
              ? "border-accent bg-accent/10 scale-[0.99]"
              : "border-border bg-card hover:border-accent hover:bg-accent/5"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
            <Upload size={18} />
          </div>
          <span className="font-mono text-xs font-bold uppercase text-foreground tracking-wider">
            Upload Brand Logo
          </span>
          <span className="font-sans text-[11px] text-foreground/50 mt-1">
            PNG, SVG or JPEG · Max 2MB
          </span>
        </div>
      ) : (
        // Uploaded Preview and Configuration Controls State
        <div className="p-4 border border-border rounded-xl bg-card space-y-5">
          {/* Header Preview & Action Buttons */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg border border-border bg-white flex items-center justify-center p-1.5 overflow-hidden shadow-xs">
                <img
                  src={logoDataUrl}
                  alt="Logo Preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <p className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">Logo Active</p>
                <p className="font-sans text-[10px] text-foreground/50">Ready for placement</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={triggerFilePicker}
                className="px-2.5 py-1 rounded-lg border border-border text-[10px] font-mono uppercase font-semibold text-foreground/70 hover:text-foreground hover:bg-muted transition-all"
              >
                Replace
              </button>
              <button
                onClick={() => setLogo(null)}
                className="p-1 rounded-lg text-red-500 hover:bg-red-500/10 transition-all"
                title="Remove Logo"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          {/* Surface Selector */}
          <div className="space-y-1.5">
            <ITBLabel text="PRINTABLE SURFACE" className="text-[10px]" />
            <div className="grid grid-cols-2 gap-2">
              {availableSurfaces.map((surf) => {
                const isSelected = logoFace === surf.id;
                return (
                  <button
                    key={surf.id}
                    onClick={() => setLogoFace(surf.id)}
                    className={`py-2 px-3 rounded-lg text-left transition-all border ${
                      isSelected
                        ? "bg-[#1c0f24] text-white border-[#1c0f24] font-semibold shadow-xs"
                        : "bg-background text-foreground/70 border-border hover:border-foreground/30"
                    }`}
                  >
                    <p className="font-mono text-xs uppercase tracking-wider leading-none">{surf.label}</p>
                    <p className="font-sans text-[9px] text-foreground/50 mt-1 truncate">{surf.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Placement Sliders */}
          <div className="space-y-3.5 pt-2">
            <ITBLabel text="LOGO POSITION & SIZE" className="text-[10px]" />

            {/* Horizontal Position (X) */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-foreground/60 flex items-center gap-1">
                  <MoveHorizontal size={11} /> Position X
                </span>
                <span className="font-bold text-foreground">{Math.round(logoX * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.01"
                value={logoX}
                onChange={(e) => setLogoX(parseFloat(e.target.value))}
                className="w-full bg-border h-[3px] rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Vertical Position (Y) */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-foreground/60 flex items-center gap-1">
                  <MoveVertical size={11} /> Position Y
                </span>
                <span className="font-bold text-foreground">{Math.round(logoY * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.01"
                value={logoY}
                onChange={(e) => setLogoY(parseFloat(e.target.value))}
                className="w-full bg-border h-[3px] rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Scale / Size */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-foreground/60 flex items-center gap-1">
                  <Maximize2 size={11} /> Logo Size
                </span>
                <span className="font-bold text-foreground">{Math.round(logoScale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.15"
                max="1.2"
                step="0.01"
                value={logoScale}
                onChange={(e) => setLogoScale(parseFloat(e.target.value))}
                className="w-full bg-border h-[3px] rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Rotation */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-foreground/60 flex items-center gap-1">
                  <RotateCw size={11} /> Rotation
                </span>
                <span className="font-bold text-foreground">{logoRotation}°</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                step="5"
                value={logoRotation}
                onChange={(e) => setLogoRotation(parseInt(e.target.value))}
                className="w-full bg-border h-[3px] rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Opacity */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-foreground/60 flex items-center gap-1">
                  <Eye size={11} /> Opacity
                </span>
                <span className="font-bold text-foreground">{Math.round(logoOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={logoOpacity}
                onChange={(e) => setLogoOpacity(parseFloat(e.target.value))}
                className="w-full bg-border h-[3px] rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <p className="text-xs text-red-500 font-sans mt-2 leading-snug">
          {errorMsg}
        </p>
      )}

      {/* Privacy Notice */}
      <p className="text-[10px] font-sans text-foreground/40 leading-relaxed select-none">
        Your logo is used only for real-time 3D preview. It is not stored or shared.
      </p>
    </div>
  );
};

export default LogoUpload;
