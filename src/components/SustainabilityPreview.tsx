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
            <div className="relative group aspect-square rounded-3xl overflow-hidden shadow-2xl border border-emerald/20">
              <div className="absolute inset-0 bg-emerald/10 blur-xl transition-all duration-300 group-hover:bg-emerald/20"></div>
              <img 
                src="/products/packaging-1.jpg" 
                alt="Sustainable Packaging" 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Floating Eco Badge */}
              <div className="absolute bottom-6 left-6 bg-ivory/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-emerald/20 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald" />
                <span className="text-sm font-medium text-emerald">100% Eco-Friendly</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityPreview;