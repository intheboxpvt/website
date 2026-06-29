import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

// NOTE: hero footage is a v1 placeholder (720p/10s, non-seamless loop, generic boxes). Swap source files here when final cinematic footage (branded packaging, ideally 4K, true seamless loop) is delivered. No other code changes required.
const Hero = () => {
  const [triggerStats, setTriggerStats] = useState(false);

  useEffect(() => {
    // Start stats count-up animation shortly after load
    const timer = setTimeout(() => setTriggerStats(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const materialsCount = useCountUp(200, 2000, triggerStats);
  const capacityCount = useCountUp(10, 2000, triggerStats);
  const productionCount = useCountUp(100, 2000, triggerStats);

  // Easing constant matching expo-out feel
  const easeTransition = [0.16, 1, 0.3, 1];

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden bg-[#1d0a27] text-[#FFFFFF] px-6 lg:px-12 pt-20">
      {/* Background Cinematic Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <div className="absolute inset-0 bg-[#35124e]/30 z-10"></div>
        {/* Subtle slow zoom animation on video */}
        <motion.div 
          className="w-full h-full"
          animate={{ scale: [1, 1.05] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto" 
            poster="/products/landing-page.jpg"
            className="w-full h-full object-cover opacity-90"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
        
        {/* Wireframe matrix grid overlay */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
          <div className="absolute h-px bg-white/10" style={{ top: "12.5%", left: 0, right: 0 }}></div>
          <div className="absolute h-px bg-white/10" style={{ top: "25%", left: 0, right: 0 }}></div>
          <div className="absolute h-px bg-white/10" style={{ top: "37.5%", left: 0, right: 0 }}></div>
          <div className="absolute h-px bg-white/10" style={{ top: "50%", left: 0, right: 0 }}></div>
          <div className="absolute h-px bg-white/10" style={{ top: "62.5%", left: 0, right: 0 }}></div>
          <div className="absolute h-px bg-white/10" style={{ top: "75%", left: 0, right: 0 }}></div>
          <div className="absolute h-px bg-white/10" style={{ top: "87.5%", left: 0, right: 0 }}></div>
          <div className="absolute h-px bg-white/10" style={{ top: "100%", left: 0, right: 0 }}></div>

          <div className="absolute w-px bg-white/10" style={{ left: "8.33%", top: 0, bottom: 0 }}></div>
          <div className="absolute w-px bg-white/10" style={{ left: "16.66%", top: 0, bottom: 0 }}></div>
          <div className="absolute w-px bg-white/10" style={{ left: "24.99%", top: 0, bottom: 0 }}></div>
          <div className="absolute w-px bg-white/10" style={{ left: "33.32%", top: 0, bottom: 0 }}></div>
          <div className="absolute w-px bg-white/10" style={{ left: "41.65%", top: 0, bottom: 0 }}></div>
          <div className="absolute w-px bg-white/10" style={{ left: "49.98%", top: 0, bottom: 0 }}></div>
          <div className="absolute w-px bg-white/10" style={{ left: "58.31%", top: 0, bottom: 0 }}></div>
          <div className="absolute w-px bg-white/10" style={{ left: "66.64%", top: 0, bottom: 0 }}></div>
          <div className="absolute w-px bg-white/10" style={{ left: "74.97%", top: 0, bottom: 0 }}></div>
          <div className="absolute w-px bg-white/10" style={{ left: "83.3%", top: 0, bottom: 0 }}></div>
          <div className="absolute w-px bg-white/10" style={{ left: "91.63%", top: 0, bottom: 0 }}></div>
          <div className="absolute w-px bg-white/10" style={{ left: "99.96%", top: 0, bottom: 0 }}></div>
        </div>
        
        {/* Noise overlay texture */}
        <div className="film-grain z-20"></div>
        
        {/* Cinematic dark scrim overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d0a27] via-[#35124e]/20 to-[#35124e]/40 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,#1d0a27_95%)] z-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full pt-16 pb-12 flex flex-col justify-between min-h-[calc(100vh-5rem)]">
        {/* Content Column */}
        <div className="max-w-3xl my-auto">
          {/* Eyebrow Label */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeTransition, delay: 0.1 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 text-xs font-mono text-white/60">
              <span className="w-8 h-px bg-white/30"></span>
              Premium Packaging Studio Platform
            </span>
          </motion.div>

          {/* Large Editorial Headline */}
          <h1 className="font-sans font-bold text-[clamp(2.2rem,6.5vw,5.2rem)] leading-[1.05] tracking-tight text-[#FFFFFF] mb-10">
            <span className="block overflow-hidden relative py-1">
              <motion.span 
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: easeTransition, delay: 0.2 }}
              >
                Packaging That
              </motion.span>
            </span>
            <span className="block overflow-hidden relative py-1">
              <motion.span 
                className="block text-white"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: easeTransition, delay: 0.3 }}
              >
                Makes a <span className="text-accent">Difference</span>
              </motion.span>
            </span>
          </h1>

          {/* Subtext description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeTransition, delay: 0.5 }}
            className="font-sans text-lg text-white/60 leading-relaxed max-w-xl mb-12"
          >
            Design-led, experience-driven packaging that helps brands stand out, connect, and be remembered.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeTransition, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
              size="lg" 
              className="group btn-premium-gold px-8 py-6 text-sm"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Link to="/catalogue">
              <Button size="lg" className="btn-premium-outline px-8 py-6 text-sm">
                View Catalogue
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Cinematic Metric Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: easeTransition, delay: 0.8 }}
          className="border-t border-white/10 pt-10 mt-16 max-w-[1400px] w-full"
        >
          <div className="flex items-start gap-12 lg:gap-24 flex-wrap">
            <div className="flex flex-col gap-2">
              <span className="text-3xl lg:text-4xl font-serif text-white">{materialsCount}+</span>
              <span className="text-xs text-white/50 font-mono tracking-tight leading-tight">premium materials available</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl lg:text-4xl font-serif text-white">{capacityCount}M+</span>
              <span className="text-xs text-white/50 font-mono tracking-tight leading-tight">monthly output capacity</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl lg:text-4xl font-serif text-white">{productionCount}%</span>
              <span className="text-xs text-white/50 font-mono tracking-tight leading-tight">in-house production SLA</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;