import React, { useRef, useState } from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";
import ITBLabel from "./ui/ITBLabel";

export const LogoUpload = () => {
  const logoDataUrl = useConfigStore((s) => s.logoDataUrl);
  const logoFace = useConfigStore((s) => s.logoFace);
  const logoOpacity = useConfigStore((s) => s.logoOpacity);
  
  const setLogo = useConfigStore((s) => s.setLogo);
  const setLogoFace = useConfigStore((s) => s.setLogoFace);
  const setLogoOpacity = useConfigStore((s) => s.setLogoOpacity);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
  const maxBytes = 2 * 1024 * 1024; // 2MB

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
    <div className="space-y-4 mt-4 text-left w-full max-w-md">
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
          className={`flex flex-col items-center justify-center p-8 border border-dashed rounded-[var(--itb-radius)] cursor-pointer select-none transition-all duration-300 ${
            isDragging
              ? "border-[color:var(--itb-accent)] bg-[rgba(200,161,90,0.1)] scale-[0.99]"
              : "border-[rgba(200,161,90,0.3)] bg-[rgba(200,161,90,0.03)] hover:border-[color:var(--itb-accent)] hover:bg-[rgba(200,161,90,0.06)]"
          }`}
        >
          {/* Simple Inline SVG Upload Arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-8 h-8 text-[color:var(--itb-accent)] mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5h10.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z"
            />
          </svg>

          <span className="font-mono text-xs font-bold uppercase text-[color:var(--itb-fg)] tracking-wider">
            Drop your logo here
          </span>
          <span className="font-sans text-[10px] text-[color:var(--itb-muted)] mt-1.5">
            PNG, SVG or JPEG · Max 2MB
          </span>
        </div>
      ) : (
        // Uploaded Preview and Configuration State
        <div className="p-4 border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] bg-[color:var(--itb-bg)] space-y-4">
          <div className="flex items-center gap-4">
            {/* Thumbnail Preview Box */}
            <div className="w-16 h-16 rounded border border-[color:var(--itb-border)] bg-black/40 flex items-center justify-center p-2 flex-shrink-0 overflow-hidden">
              <img
                src={logoDataUrl}
                alt="Logo Preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col items-start gap-1">
              <button
                onClick={triggerFilePicker}
                className="font-mono text-[10px] uppercase text-[color:var(--itb-accent)] font-bold hover:underline"
              >
                Change logo
              </button>
              <button
                onClick={() => setLogo(null)}
                className="font-mono text-[10px] uppercase text-red-400 font-bold hover:underline"
              >
                Remove
              </button>
            </div>
          </div>

          {/* Logo Placement Face */}
          <div className="space-y-1.5">
            <ITBLabel text="Logo Placement" className="text-[9px]" />
            <div className="flex rounded-full bg-[color:var(--itb-surface)] p-0.5 border border-[color:var(--itb-border)] max-w-xs">
              <button
                onClick={() => setLogoFace("front")}
                className={`flex-1 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
                  logoFace === "front"
                    ? "bg-[color:var(--itb-accent)] text-black font-bold"
                    : "text-[color:var(--itb-muted)] hover:text-[color:var(--itb-fg)]"
                }`}
              >
                Front
              </button>
              <button
                onClick={() => setLogoFace("back")}
                className={`flex-1 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
                  logoFace === "back"
                    ? "bg-[color:var(--itb-accent)] text-black font-bold"
                    : "text-[color:var(--itb-muted)] hover:text-[color:var(--itb-fg)]"
                }`}
              >
                Back
              </button>
            </div>
          </div>

          {/* Logo Visibility/Opacity */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center max-w-xs">
              <ITBLabel text="Logo visibility" className="text-[9px]" />
              <span className="font-mono text-[10px] text-[color:var(--itb-fg)]">
                {Math.round(logoOpacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(logoOpacity * 100)}
              onChange={(e) => setLogoOpacity(parseFloat(e.target.value) / 100)}
              className="w-full max-w-xs bg-[color:var(--itb-border)] h-[2px] rounded-lg appearance-none cursor-pointer accent-[color:var(--itb-accent)] [&::-webkit-slider-thumb]:w-[14px] [&::-webkit-slider-thumb]:h-[14px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[color:var(--itb-accent)] [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:w-[14px] [&::-moz-range-thumb]:h-[14px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[color:var(--itb-accent)] [&::-moz-range-thumb]:border-none"
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <p className="text-xs text-red-500 font-sans mt-2 animate-fade-in leading-snug">
          {errorMsg}
        </p>
      )}

      {/* Privacy Notice */}
      <p className="text-[11px] font-sans text-[color:var(--itb-muted)] leading-relaxed select-none mt-1">
        Your logo is used only to preview this design.
        <br />
        It is not stored or shared without your permission.
      </p>
    </div>
  );
};

export default LogoUpload;
