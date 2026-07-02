import { Leaf, Recycle, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const SustainabilityPreview = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden border-t border-border">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/[0.02] rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.01] rounded-full blur-3xl"></div>
 
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Content */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="inline-flex items-center gap-3 text-xs font-mono text-emerald font-semibold mb-6">
                <span className="w-12 h-px bg-emerald/30"></span>
                Sustainability
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-sans font-bold tracking-tight leading-[0.9] text-foreground mb-8">
                Packaging<br/>
                <span className="text-foreground/30 italic font-semibold">That Cares.</span>
              </h2>
              <p className="font-sans text-lg text-foreground/80 leading-relaxed mb-8">
                Our sustainability mode features agri-waste hybrid boards made from rice husk and 
                straw—materials that would otherwise contribute to crop-burning. Stronger than 
                traditional board, 100% compostable, and making a real impact.
              </p>
 
              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                <div className="text-center p-6 bg-card border border-border rounded-none shadow-soft">
                  <Leaf className="w-5 h-5 text-emerald mx-auto mb-3" />
                  <p className="font-sans text-xs font-medium text-foreground/90">Compostable</p>
                </div>
                <div className="text-center p-6 bg-card border border-border rounded-none shadow-soft">
                  <Recycle className="w-5 h-5 text-emerald mx-auto mb-3" />
                  <p className="font-sans text-xs font-medium text-foreground/90">Recyclable</p>
                </div>
                <div className="text-center p-6 bg-card border border-border rounded-none shadow-soft">
                  <TreePine className="w-5 h-5 text-emerald mx-auto mb-3" />
                  <p className="font-sans text-xs font-medium text-foreground/90">Carbon Negative</p>
                </div>
              </div>
 
               <Link to="/about">
                <Button className="group btn-premium-gold px-8 py-6 text-sm">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>
 
          {/* Visual */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={200} direction="right">
              <div className="relative group aspect-square rounded-none overflow-hidden border border-border shadow-2xl">
                <img 
                  src="/products/packaging-1.jpg" 
                  alt="Sustainable Packaging" 
                  className="w-full h-full object-cover opacity-85 transform transition-transform duration-700 group-hover:scale-[1.02]"
                />
                {/* Floating Eco Badge */}
                <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur-md px-4 py-2 rounded-none border border-border flex items-center gap-2 shadow-soft">
                  <Leaf className="w-3.5 h-3.5 text-emerald" />
                  <span className="text-xs font-mono text-foreground/90">100% Eco-Friendly</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
 
        </div>
      </div>
    </section>
  );
};

export default SustainabilityPreview;