import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const AboutPreview = () => {
  return (
    <section className="section-padding bg-light-purple/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gold-metallic/5 to-royal-purple/5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-ivory to-light-purple/30 rounded-3xl overflow-hidden shadow-elevated border border-royal-purple/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gold-metallic/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-5xl">✨</span>
                    </div>
                    <p className="font-serif text-xl text-royal-purple">Crafting Stories</p>
                  </div>
                </div>
              </div>
              {/* Accent element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-metallic/20 rounded-2xl -z-10"></div>
            </div>
          </ScrollReveal>

          {/* Content Side */}
          <ScrollReveal delay={200}>
            <span className="font-sans text-sm tracking-widest uppercase text-gold-metallic font-medium">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-royal-purple mt-4 mb-6">
              Every Box Tells a Story
            </h2>
            <p className="font-sans text-lg text-aubergine/80 leading-relaxed mb-6">
              InTheBox was born from a simple belief: packaging isn't just a container—it's the 
              first physical touchpoint between your brand and your customer. It's a moment of 
              anticipation, discovery, and delight.
            </p>
            <p className="font-sans text-aubergine/70 leading-relaxed mb-8">
              We combine cinematic design sensibility with sustainable manufacturing to create 
              packaging experiences that brands and their customers love. From startups to 
              established brands, we partner with those who believe in the power of presentation.
            </p>
            <Link to="/about">
              <Button variant="gold" size="lg" className="group">
                Learn Our Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;