import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="min-h-screen pt-24 lg:pt-28 overflow-hidden relative">
      {/* Royal Purple Background with parallax */}
      <div 
        className="absolute inset-0 hero-gradient"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%),
                           radial-gradient(circle at 40% 80%, rgba(255,255,255,0.02) 0%, transparent 60%)`
        }}></div>
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-aubergine/50 via-transparent to-aubergine/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-[calc(100vh-7rem)] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full py-12 lg:py-0">
          {/* Left Side - Content */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-[2px] bg-gold-metallic"></div>
              <span className="font-sans text-sm tracking-widest uppercase text-gold-light font-medium">
                Premium Packaging Studio Platform
              </span>
            </div>

            {/* Headline - Royal Serif */}
            <h1 
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-ivory mb-6 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Packaging That Makes a{" "}
              <span className="text-gold-metallic">Difference</span>
            </h1>

            {/* Subtext - Clean Sans */}
            <p 
              className="font-sans text-lg md:text-xl text-ivory/80 leading-relaxed mb-10 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              Design-led, experience-driven packaging that helps brands 
              stand out, connect, and be remembered.
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Link to="/contact">
                <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                  Get a Quote
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/catalogue">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  View Catalogue
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div 
              className="mt-14 pt-8 border-t border-ivory/20 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-10">
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-gold-metallic">500+</p>
                  <p className="font-sans text-sm text-ivory/70 mt-1">Brands Served</p>
                </div>
                <div className="w-[1px] h-12 bg-ivory/20"></div>
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-gold-metallic">50K+</p>
                  <p className="font-sans text-sm text-ivory/70 mt-1">Orders Delivered</p>
                </div>
                <div className="w-[1px] h-12 bg-ivory/20 hidden sm:block"></div>
                <div className="text-center hidden sm:block">
                  <p className="font-serif text-3xl font-bold text-gold-metallic">98%</p>
                  <p className="font-sans text-sm text-ivory/70 mt-1">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div 
            className="relative opacity-0 animate-slide-in-right hidden lg:block"
            style={{ animationDelay: "0.4s" }}
          >
            {/* Main Visual Container */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold-metallic/20 via-transparent to-transparent rounded-3xl blur-2xl"></div>
              <img 
                src="/products/landing-page.jpg" 
                alt="Premium Packaging Solutions" 
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-ivory/10 transform hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;