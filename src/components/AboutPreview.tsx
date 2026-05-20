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
            <div className="relative group">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated border border-royal-purple/10">
                <img 
                  src="/products/creating-stories.jpg" 
                  alt="Every Box Tells a Story" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Accent element */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-gold-metallic/30 rounded-3xl -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
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
                Learn Our Story of InTheBox
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