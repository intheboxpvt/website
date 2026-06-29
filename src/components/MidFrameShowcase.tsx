import ScrollReveal from "./ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const MidFrameShowcase = () => {
  return (
    <section className="bg-[#050505] text-white py-24 px-6 lg:px-12 relative overflow-hidden border-y border-white/5">
      <div className="max-w-[1400px] mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Architectural Typography on Dark Background */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <ScrollReveal>
            <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-4">Precision Engineering</span>
            <h2 className="text-4xl md:text-6xl font-sans font-bold text-white mb-6 leading-tight">
              Bespoke Structural Blueprints
            </h2>
            <p className="font-sans text-base text-white/70 leading-relaxed mb-8">
              We manufacture exact double wall corrugated containers and custom rigid box inserts with high precision plate preparation, ensuring every box fits your product dimensions perfectly.
            </p>
            <div>
              <Button 
                onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                className="bg-accent text-white font-sans text-xs font-semibold px-8 py-5 rounded-lg transition-all duration-300 shadow-md"
              >
                Start Structuring
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Full Uncut High Res Visual */}
        <div className="lg:col-span-7 relative h-[320px] md:h-[480px] w-full overflow-hidden border border-white/10 shadow-2xl">
          <img 
            src="/products/mid-frame.png" 
            alt="Bespoke Packaging Blueprint" 
            className="w-full h-full object-cover select-none transition-transform duration-700 hover:scale-[1.01]"
          />
          {/* Subtle gradient vignette to blend edge with black theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        </div>
      </div>
    </section>
  );
};
