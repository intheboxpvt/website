import React, { useEffect, useRef, useState } from "react";

interface AsciiArtProps {
  src: string;
  resolution?: number;
  color?: string;
  animationStyle?: "fade" | "none";
  animationDuration?: number;
  animateOnView?: boolean;
  className?: string;
}

export const AsciiArt: React.FC<AsciiArtProps> = ({
  src,
  resolution = 65,
  color = "#fbbf24",
  className = "",
}) => {
  const [ascii, setAscii] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = resolution;
      const height = Math.round((img.height / img.width) * width * 0.46);

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      try {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // Custom high-contrast density ramp
        const asciiChars = "@#S%?*+;:,. ";

        let result = "";
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
            result += asciiChars[charIndex];
          }
          result += "\n";
        }
        setAscii(result);
      } catch (err) {
        console.error("Failed to read image pixel data for ASCII translation:", err);
      }
    };
  }, [src, resolution]);

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="hidden" />
      <pre 
        className="font-mono text-[7px] leading-[0.78] tracking-widest whitespace-pre"
        style={{ color, fontFamily: "monospace, Courier New, Courier" }}
      >
        {ascii}
      </pre>
    </div>
  );
};
