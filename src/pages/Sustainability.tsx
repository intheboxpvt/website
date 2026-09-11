import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Leaf, Recycle, TreePine, Droplets, TrendingDown, Users, Search, Lightbulb, Box, CheckCircle, Factory, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";

const Sustainability = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leafProgress, setLeafProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;
          const sectionTop = rect.top;
          const windowHeight = window.innerHeight;

          // Start calculating when section top hits 70% of screen height
          const start = windowHeight * 0.7;
          // End when section bottom hits 30% of screen height
          const end = -sectionHeight + windowHeight * 0.3;
          const current = sectionTop;

          let progress = 0;
          if (current <= start) {
            progress = ((start - current) / (start - end)) * 100;
          }
          setLeafProgress(Math.max(0, Math.min(100, progress)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { title: "Agri-Waste Hybrid Boards", desc: "Made from rice husk and wheat straw that would otherwise be burned, reducing air pollution in Punjab." },
    { title: "100% Recyclable", desc: "All our packaging can be recycled through standard municipal systems across India." },
    { title: "Compostable Options", desc: "Select materials break down naturally within 90 days in commercial composting facilities." },
    { title: "Water-Based Inks", desc: "Eco-friendly printing that's safe for the environment and completely non-toxic." },
  ];

  const roadSteps = [
    { percentage: 0, icon: Search, title: "1. Waste Collection", desc: "Agri-waste rice husks and wheat straws are collected directly from local Punjab farms, preventing seasonal field burning." },
    { percentage: 33, icon: Lightbulb, title: "2. Clean Pulping", desc: "Raw fibers are processed with zero-formaldehyde organic binders in a carbon-neutral mill." },
    { percentage: 66, icon: Box, title: "3. Premium Fabrication", desc: "The pulp is hot-pressed into high-density 300GSM structural boards, ready for folding and custom logo printing." },
    { percentage: 100, icon: Recycle, title: "4. Circular End-of-Life", desc: "The finished boxes are 100% recyclable or break down naturally in commercial compost within 90 days." },
  ];

  const impactStats = [
    { value: "2,500+", label: "Tons of Agri-Waste Diverted", icon: TrendingDown },
    { value: "1,200+", label: "Farmers Supported", icon: Users },
    { value: "100%", label: "Recyclable & Compostable", icon: Leaf },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO 
        title="Eco-Friendly & Sustainable Packaging | InTheBox"
        description="Sustainable packaging solutions made from agri-waste. 100% recyclable, compostable, and carbon-negative options to reduce Punjab crop burning."
        keywords="sustainable packaging, eco-friendly boxes, biodegradable packaging, agri-waste packaging, green packaging india"
      />
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-24 pb-10 px-6 lg:px-12 bg-[#1c0f24] border-b border-white/10 relative overflow-hidden text-white">
        {/* Watermark logo background */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[320px] h-[320px] pointer-events-none opacity-[0.04] select-none z-0">
          <img 
            src="/images/inthebox-logo.png" 
            alt="" 
            className="w-full h-full object-contain filter invert brightness-0"
          />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent">
              <span className="w-8 h-px bg-accent"></span>
              <span className="uppercase tracking-widest font-semibold">Sustainability & Impact</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
              Sustainable Packaging <span className="text-accent italic font-semibold">Solutions</span>
            </h1>
            <p className="text-sm md:text-base text-white/70 font-sans leading-relaxed">
              Our commitment to eco-friendly packaging without compromising on luxury, structural integrity, or brand prestige.
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability Maze Grid */}
      <section className="py-24 px-6 lg:px-12 bg-background border-b border-border">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <Leaf className="w-5 h-5 text-emerald" />
              <h2 className="font-sans text-3xl font-bold text-foreground">Eco-Friendly <span className="text-emerald">Material Maze</span></h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-6 border border-border bg-card divide-y md:divide-y-0 divide-border relative z-10">
            {/* Cell 1: Agri-Waste Hybrid Boards */}
            <div className="md:col-span-3 border-r border-b border-border p-8 lg:p-12 hover:border-emerald/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-emerald uppercase tracking-wider">01 // Eco Boards</span>
                <Leaf className="w-5 h-5 text-foreground/20 group-hover:text-emerald transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{features[0].title}</h3>
                <p className="font-sans text-xs text-foreground/60 leading-relaxed">{features[0].desc}</p>
              </div>
            </div>

            {/* Cell 2: 100% Recyclable */}
            <div className="md:col-span-3 border-b border-border p-8 lg:p-12 hover:border-emerald/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-emerald uppercase tracking-wider">02 // Recyclable</span>
                <Recycle className="w-5 h-5 text-foreground/20 group-hover:text-emerald transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{features[1].title}</h3>
                <p className="font-sans text-xs text-foreground/60 leading-relaxed">{features[1].desc}</p>
              </div>
            </div>

            {/* Cell 3: Compostable Options */}
            <div className="md:col-span-2 border-r border-b md:border-b-0 border-border p-8 lg:p-12 hover:border-emerald/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-emerald uppercase tracking-wider">03 // Compostable</span>
                <TreePine className="w-5 h-5 text-foreground/20 group-hover:text-emerald transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{features[2].title}</h3>
                <p className="font-sans text-xs text-foreground/60 leading-relaxed">{features[2].desc}</p>
              </div>
            </div>

            {/* Cell 4: Water-Based Inks */}
            <div className="md:col-span-4 border-b md:border-b-0 border-border p-8 lg:p-12 hover:border-emerald/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-emerald uppercase tracking-wider">04 // Water Inks</span>
                <Droplets className="w-5 h-5 text-foreground/20 group-hover:text-emerald transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{features[3].title}</h3>
                <p className="font-sans text-xs text-foreground/60 leading-relaxed">{features[3].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process and Logistics Landscape Banner */}
      <section className="w-full h-[300px] md:h-[400px] overflow-hidden relative select-none">
        <img 
          src="/products/packaging-1.jpg" 
          alt="InTheBox Sustainable Forestry" 
          className="w-full h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-[1.02]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d0a27] via-transparent to-[#050505]"></div>
      </section>

      {/* Interactive Delivery Road Timeline */}
      <section className="py-32 px-6 lg:px-12 bg-[#050505] text-white relative overflow-hidden border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="text-left mb-24">
              <span className="font-mono text-xs text-emerald uppercase tracking-wider">Circular Lifecycle</span>
              <h2 className="font-sans text-4xl font-bold text-white mt-4">The Sustainable <span className="text-emerald">Lifecycle Pathway</span></h2>
              <p className="font-sans text-sm text-white/60 max-w-sm mt-3">
                Scroll to move the active leaf pointer along our checkpoints from organic waste harvest to standard return.
              </p>
            </div>
          </ScrollReveal>

          {/* Road Segment Container */}
          <div ref={containerRef} className="relative max-w-4xl mx-auto min-h-[700px] py-10">
            
            {/* The Road: dashed path line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 border-l border-dashed border-white/10 z-0"></div>
            
            {/* The Active Path: colored overlay */}
            <div 
              className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 w-0.5 bg-emerald z-0 transition-all duration-100 ease-out"
              style={{ height: `${leafProgress}%` }}
            ></div>

            {/* Moving Leaf Icon Node */}
            <div 
              className="absolute left-6 md:left-1/2 z-20 w-10 h-10 bg-emerald border border-white/20 rounded-full flex items-center justify-center text-[#1c0f24] shadow-2xl transition-all duration-200"
              style={{ 
                top: `${leafProgress}%`, 
                transform: `translate(-50%, -50%)`
              }}
            >
              <Leaf className="w-5 h-5 fill-current text-white" />
            </div>

            {/* Checkpoints */}
            <div className="relative space-y-24 md:space-y-36">
              {roadSteps.map((step, idx) => {
                const isPassed = leafProgress >= step.percentage;
                const isEven = idx % 2 === 0;

                return (
                  <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center">
                    
                    {/* Roadmap Dot Node */}
                    <div 
                      className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border z-10 transition-all duration-300 ${
                        isPassed 
                          ? "bg-emerald border-emerald scale-110 shadow-gold" 
                          : "bg-[#1d0a27] border-white/10"
                      }`}
                      style={{ top: "12px" }}
                    ></div>

                    {/* Content Card (Left on Desktop, Right on Mobile) */}
                    <div 
                      className={`pl-16 md:pl-0 w-full md:w-[42%] transition-all duration-500 ${
                        isEven 
                          ? "md:mr-auto md:text-right md:pr-12" 
                          : "md:ml-auto md:text-left md:pl-12"
                      }`}
                    >
                      <div className={`p-6 border rounded-none bg-[#1d0a27]/40 transition-all duration-500 ${
                        isPassed ? "border-emerald/40" : "border-white/10"
                      }`}>
                        <div className={`flex items-center gap-3 mb-3 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}>
                          <step.icon className={`w-4 h-4 ${isPassed ? "text-emerald" : "text-white/40"}`} />
                          <span className="font-mono text-xs text-white/40">Step 0{idx + 1}</span>
                        </div>
                        <h3 className={`font-sans text-xl font-bold transition-colors duration-300 ${
                          isPassed ? "text-emerald" : "text-white"
                        }`}>
                          {step.title}
                        </h3>
                        <p className="font-sans text-xs text-white/60 leading-relaxed mt-3">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-white/10 pt-20 mt-24 text-center">
            <span className="font-mono text-xs text-emerald uppercase tracking-wider">Punjab Field Pollution Diverted</span>
            <div className="grid md:grid-cols-3 gap-8 mt-10">
              {impactStats.map((stat, i) => (
                <div key={i} className="bg-card/5 border border-white/10 p-8 rounded-none text-center">
                  <stat.icon className="w-8 h-8 text-emerald mx-auto mb-4" />
                  <p className="font-sans text-4xl md:text-5xl text-white font-bold">{stat.value}</p>
                  <p className="font-mono text-xs text-white/50 mt-2 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-24">
            <Button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
              className="btn-premium-gold py-6 px-8 sm:px-12 text-sm w-full sm:w-auto"
            >
              Request Eco Mockup Quote <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Sustainability;
