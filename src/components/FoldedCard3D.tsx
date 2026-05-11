import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FoldedCard3DProps {
  frontImage: string;
  insideImage: string;
  frontText?: string;
  insideText?: string;
  className?: string;
}

const FoldedCard3D = ({ frontImage, insideImage, frontText, insideText, className }: FoldedCard3DProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={cn("relative perspective-1000 w-[300px] h-[200px] cursor-pointer group", className)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div 
        className={cn(
          "relative w-full h-full transition-transform duration-1000 transform-style-3d",
          isOpen ? "rotate-y-180" : ""
        )}
      >
        {/* Front Page */}
        <div className="absolute inset-0 backface-hidden z-20">
          <div className="w-full h-full rounded-lg shadow-xl overflow-hidden border border-royal-purple/10 relative">
            <img src={frontImage} alt="Card Front" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-royal-purple/20 to-transparent"></div>
            
            {/* Dynamic Text Overlay */}
            {frontText && (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none">
                <p className="font-serif text-2xl md:text-3xl text-gold-metallic drop-shadow-lg leading-tight uppercase tracking-widest font-bold">
                  {frontText}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back Page (Inside Right) */}
        <div className="absolute inset-0 transform rotate-y-180 backface-hidden z-10">
          <div className="w-full h-full rounded-lg shadow-xl overflow-hidden border border-royal-purple/10 bg-ivory relative">
            <img src={insideImage} alt="Card Inside" className="w-full h-full object-cover opacity-20" />
            
            {/* Dynamic Inside Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none">
              <div className="w-12 h-[1px] bg-gold-metallic/30 mb-4"></div>
              <p className="font-sans text-sm md:text-base text-royal-purple leading-relaxed italic">
                {insideText}
              </p>
              <div className="w-12 h-[1px] bg-gold-metallic/30 mt-4"></div>
            </div>
          </div>
        </div>

        {/* Inside Left Page (Optional, but let's keep it simple for now) */}
      </div>

      {/* Control Hint */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-xs font-sans text-soft-purple uppercase tracking-widest font-medium">
          Click to {isOpen ? "Close" : "Open"} 3D View
        </p>
      </div>
    </div>
  );
};

export default FoldedCard3D;
