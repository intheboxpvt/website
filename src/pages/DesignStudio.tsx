import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import EditorSidebar from "@/components/studio/EditorSidebar";
import CardScene from "@/components/studio/CardScene";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";

const DesignStudio = () => {
  const [searchParams] = useSearchParams();
  const [customization, setCustomization] = useState({
    bgColor: "#" + (searchParams.get("color") || "D4AF37"),
    textColor: "#1e1e1e",
    frontText: "InTheBox",
    insideText: "Memorable unboxing experiences start here.",
    fontSize: 24,
    isOpen: 0.1,
    foilEffect: true,
    autoRotate: true,
    type: searchParams.get("type") || "card",
    side: "outside",
    interiorColor: "#fafafa"
  });

  return (
    <main className="min-h-screen bg-[#fafafa] overflow-hidden flex flex-col">
      <SEO 
        title="Interactive 3D Studio | InTheBox"
        description="Design and customize your premium packaging in our cinematic interactive product studio."
      />
      <Navbar />
      
      <div className="flex-1 flex flex-col lg:flex-row pt-20">
        {/* LEFT SIDE: Customization Sidebar */}
        <div className="w-full lg:w-[420px] h-[50vh] lg:h-[calc(100vh-5rem)] border-r border-black/5 bg-white z-20 overflow-y-auto">
          <EditorSidebar 
            settings={customization} 
            onChange={setCustomization} 
          />
        </div>

        {/* RIGHT SIDE: Sticky 3D Preview */}
        <div className="flex-1 relative bg-[#f0f0f0] h-[50vh] lg:h-[calc(100vh-5rem)] sticky top-20">
          <CardScene settings={customization} />
          
          {/* Studio HUD overlay */}
          <div className="absolute bottom-8 right-8 flex gap-4">
             <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-soft border border-black/5">
                <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-royal-purple">
                   Cinematic Preview Mode
                </p>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DesignStudio;
