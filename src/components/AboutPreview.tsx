import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const AboutPreview = () => {
  return (
    <section className="section-padding bg-[#0B0B0B] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading and Manifesto text */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="inline-flex items-center gap-3 text-xs font-mono text-white/50 mb-6">
                <span className="w-12 h-px bg-white/20"></span>
                Our Story
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif tracking-tight leading-[0.9] text-white mb-8">
                Every Box<br/>
                <span className="text-white/30 italic">Tells a Story.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="max-w-xl space-y-6">
                <p className="font-sans text-lg text-white/80 leading-relaxed">
                  InTheBox was born from a simple belief: packaging isn't just a container—it's the 
                  first physical touchpoint between your brand and your customer. It's a moment of 
                  anticipation, discovery, and delight.
                </p>
                <p className="font-sans text-white/50 text-base leading-relaxed mb-8">
                  We combine cinematic design sensibility with sustainable manufacturing to create 
                  packaging experiences that brands and their customers love. From startups to 
                  established brands, we partner with those who believe in the power of presentation.
                </p>
                <div className="pt-4">
                  <Link to="/about">
                    <Button className="group bg-white hover:bg-white/90 text-black font-sans text-sm font-semibold px-8 py-6 rounded-full transition-all duration-300">
                      Learn Our Story
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Sharp Cinematic Visual */}
          <div className="lg:col-span-5 pt-8 lg:pt-20">
            <ScrollReveal delay={300} direction="right">
              <div className="relative group">
                <div className="aspect-[4/5] rounded-none overflow-hidden shadow-2xl border border-white/10">
                  <img 
                    src="/products/creating-stories.jpg" 
                    alt="Every Box Tells a Story" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-90"
                  />
                </div>
                {/* Thin overlay outline */}
                <div className="absolute inset-0 border border-white/20 pointer-events-none"></div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutPreview;