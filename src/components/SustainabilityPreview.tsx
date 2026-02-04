import { Leaf, Recycle, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const SustainabilityPreview = () => {
  return (
    <section className="section-padding bg-ivory relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-metallic/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <ScrollReveal>
            <span className="font-sans text-sm tracking-widest uppercase text-emerald font-medium">
              Sustainability
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mt-4 mb-6 text-royal-purple">
              Packaging That Cares for the Planet
            </h2>
            <p className="font-sans text-lg text-aubergine/80 leading-relaxed mb-8">
              Our sustainability mode features agri-waste hybrid boards made from rice husk and 
              straw—materials that would otherwise contribute to crop-burning. Stronger than 
              traditional board, 100% compostable, and making a real impact.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-emerald/5 rounded-xl">
                <Leaf className="w-8 h-8 text-emerald mx-auto mb-3" />
                <p className="font-sans text-sm font-medium text-royal-purple">Compostable</p>
              </div>
              <div className="text-center p-4 bg-emerald/5 rounded-xl">
                <Recycle className="w-8 h-8 text-emerald mx-auto mb-3" />
                <p className="font-sans text-sm font-medium text-royal-purple">Recyclable</p>
              </div>
              <div className="text-center p-4 bg-emerald/5 rounded-xl">
                <TreePine className="w-8 h-8 text-emerald mx-auto mb-3" />
                <p className="font-sans text-sm font-medium text-royal-purple">Carbon Negative</p>
              </div>
            </div>

            <Link to="/sustainability">
              <Button variant="gold" size="lg" className="group">
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </ScrollReveal>

          {/* Visual */}
          <ScrollReveal delay={200} direction="right">
            <div className="aspect-square bg-gradient-to-br from-emerald/10 to-gold-metallic/10 rounded-3xl flex items-center justify-center border border-emerald/20">
              <div className="text-center">
                <div className="w-32 h-32 bg-emerald/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-6xl">🌱</span>
                </div>
                <p className="font-serif text-2xl font-medium text-royal-purple">Eco-Conscious</p>
                <p className="font-sans text-sm text-aubergine/70 mt-2">Materials & Processes</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityPreview;