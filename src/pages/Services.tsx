import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MessageSquare, Palette, Layers, Package, Sparkles, Truck, Search, Lightbulb, Box, CheckCircle, Factory, ArrowRight, Download } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [truckProgress, setTruckProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
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
      setTruckProgress(Math.max(0, Math.min(100, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const consultationServices = [
    { title: "Starter Session", desc: "1-hour discovery call to analyze your brand identity, product dimensions, unboxing vision, and custom material requirements." },
    { title: "Deep Dive Workshop", desc: "Half-day intensive structural workshop featuring comprehensive packaging audits, board weight tests, and cost optimization strategy." },
    { title: "Advisory Pipeline", desc: "Continuous structural engineering advisory covering sustainable paperboard upgrades, custom inserts, and press quality control." },
  ];

  const designServices = [
    { icon: Palette, title: "Concept Development", desc: "Mood boards, raw CAD sketches, opening mechanism blueprints, and custom surface graphics designed to elevate product unboxing." },
    { icon: Layers, title: "3D Rendering Preview", desc: "High-fidelity digital 3D prototypes with realistic studio lighting, true cardboard thickness representations, and finish previews." },
    { icon: Sparkles, title: "Production Dielines", desc: "Millimeter-accurate vector dielines formatted with cut, crease, and bleed specifications ready for high-speed commercial printing presses." },
  ];

  const manufacturingFeatures = [
    "Rigid boxes, kraft wraps, and custom inserts",
    "Soft touch matte, high gloss, and spot UV textures",
    "Precision foil hot stamping and blind embossing",
    "Custom paperboard grades and agri waste sheets",
    "Integrated logistics with doorstep shipping pan India",
  ];

  const roadSteps = [
    { percentage: 0, icon: Search, title: "Discover & Consult", desc: "We study your product weight, structural dimensions, transit protection needs, and brand aesthetic parameters to start your consultation." },
    { percentage: 20, icon: Lightbulb, title: "Concept Blueprint", desc: "Our structural CAD engineers outline custom box geometry, locking tab mechanisms, lid closures, and board caliper specifications." },
    { percentage: 40, icon: Box, title: "Prototype Mockup", desc: "Fabricating physical unprinted sample boxes for hands-on dimensional fit checks, paperboard rigidity testing, and real-world handling." },
    { percentage: 60, icon: CheckCircle, title: "Exacting Approval", desc: "Rigorous inspection of magnetic closures, hot foil stamping alignment, surface texture quality, and final contract sign off." },
    { percentage: 80, icon: Factory, title: "Volume Fabrication", desc: "Automated offset printing, spot UV application, die-cutting, folding, gluing, and stringent multi-point quality assurance checks." },
    { percentage: 100, icon: Truck, title: "Secure Delivery", desc: "Integrated nationwide logistics coordinates direct freight shipment and inventory delivery directly to your regional warehouse facilities." },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO 
        title="Our Process & Services | Design to Delivery | InTheBox"
        description="Comprehensive packaging services from consultation and design to manufacturing and delivery. Your end to end partner for premium packaging."
        keywords="packaging design services, custom packaging manufacturer, packaging consultation, 3d packaging design, packaging delivery india"
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
              <span className="uppercase tracking-widest font-semibold">Services & Process</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
              Complete Packaging <span className="text-accent italic font-semibold">Solutions</span>
            </h1>
            <p className="text-sm md:text-base text-white/70 font-sans leading-relaxed max-w-xl">
              From initial structural prototyping to high-volume manufacturing and nationwide logistics, we operate the complete packaging lifecycle to elevate your unboxing experience.
            </p>
          </div>
        </div>
      </section>

      {/* Combined Consultation & Design Maze Grid */}
      <section className="py-24 px-6 lg:px-12 bg-background border-b border-border">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <Palette className="w-5 h-5 text-accent" />
              <h2 className="font-sans text-3xl font-bold text-foreground">Consultation and Structural <span className="text-accent">Design Maze</span></h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-6 border border-border bg-card divide-y md:divide-y-0 divide-border relative z-10">
            {/* Cell 1: Starter Session */}
            <div className="md:col-span-3 border-r border-b border-border p-8 lg:p-12 hover:border-accent/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-accent uppercase tracking-wider">01 // Starter Session</span>
                <MessageSquare className="w-5 h-5 text-foreground/20 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{consultationServices[0].title}</h3>
                <p className="font-sans text-xs text-foreground/60 leading-relaxed">{consultationServices[0].desc}</p>
              </div>
            </div>

            {/* Cell 2: Deep Dive Workshop */}
            <div className="md:col-span-3 border-b border-border p-8 lg:p-12 hover:border-accent/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-accent uppercase tracking-wider">02 // Deep Dive</span>
                <MessageSquare className="w-5 h-5 text-foreground/20 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{consultationServices[1].title}</h3>
                <p className="font-sans text-xs text-foreground/60 leading-relaxed">{consultationServices[1].desc}</p>
              </div>
            </div>

            {/* Cell 3: Advisory Pipeline */}
            <div className="md:col-span-2 border-r border-b md:border-b-0 border-border p-8 lg:p-12 hover:border-accent/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-accent uppercase tracking-wider">03 // Advisory</span>
                <MessageSquare className="w-5 h-5 text-foreground/20 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{consultationServices[2].title}</h3>
                <p className="font-sans text-xs text-foreground/60 leading-relaxed">{consultationServices[2].desc}</p>
              </div>
            </div>

            {/* Cell 4: Concept Development */}
            <div className="md:col-span-4 border-b md:border-b-0 border-border p-8 lg:p-12 hover:border-accent/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-accent uppercase tracking-wider">04 // Concepts</span>
                <Palette className="w-5 h-5 text-foreground/20 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{designServices[0].title}</h3>
                <p className="font-sans text-xs text-foreground/60 leading-relaxed">{designServices[0].desc}</p>
              </div>
            </div>

            {/* Cell 5: 3D Rendering Preview */}
            <div className="md:col-span-3 border-r border-t border-border md:border-t-0 p-8 lg:p-12 hover:border-accent/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-accent uppercase tracking-wider">05 // 3D Mockups</span>
                <Layers className="w-5 h-5 text-foreground/20 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{designServices[1].title}</h3>
                <p className="font-sans text-xs text-foreground/60 leading-relaxed">{designServices[1].desc}</p>
              </div>
            </div>

            {/* Cell 6: Production Dielines */}
            <div className="md:col-span-3 border-t border-border md:border-t-0 p-8 lg:p-12 hover:border-accent/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-accent uppercase tracking-wider">06 // Dielines</span>
                <Sparkles className="w-5 h-5 text-foreground/20 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{designServices[2].title}</h3>
                <p className="font-sans text-xs text-foreground/60 leading-relaxed">{designServices[2].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process and Logistics Landscape Banner */}
      <section className="w-full h-[300px] md:h-[400px] overflow-hidden relative select-none">
        <img 
          src="/products/card2_image.jpeg" 
          alt="InTheBox Manufacturing Logistics" 
          className="w-full h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-[1.02]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d0a27] via-transparent to-[#050505]"></div>
      </section>

      {/* Interactive Delivery Road Timeline */}
      <section className="py-32 px-6 lg:px-12 bg-[#050505] text-white relative overflow-hidden border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="text-left mb-24">
              <span className="font-mono text-xs text-accent uppercase tracking-wider">Our Pipeline</span>
              <h2 className="font-sans text-4xl font-bold text-white mt-4">The Custom <span className="text-accent">Road Map</span></h2>
              <p className="font-sans text-sm text-white/60 max-w-md mt-3 leading-relaxed">
                Scroll down to track our delivery truck through each milestone checkpoint from initial structural setup to final nationwide warehouse distribution.
              </p>
            </div>
          </ScrollReveal>

          {/* Road Segment Container */}
          <div ref={containerRef} className="relative max-w-4xl mx-auto min-h-[900px] py-10">
            
            {/* The Road: dashed path line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 border-l border-dashed border-white/10 z-0"></div>
            
            {/* The Active Path: colored overlay */}
            <div 
              className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 w-0.5 bg-accent z-0 transition-all duration-100 ease-out"
              style={{ height: `${truckProgress}%` }}
            ></div>

            {/* Moving Truck Icon Node */}
            <div 
              className="absolute left-6 md:left-1/2 z-20 w-10 h-10 bg-accent border border-white/20 rounded-full flex items-center justify-center text-[#1c0f24] shadow-2xl transition-all duration-200"
              style={{ 
                top: `${truckProgress}%`, 
                transform: `translate(-50%, -50%)`
              }}
            >
              <Truck className="w-5 h-5 fill-current" />
            </div>

            {/* Checkpoints */}
            <div className="relative space-y-24 md:space-y-36">
              {roadSteps.map((step, idx) => {
                const isPassed = truckProgress >= step.percentage;
                const isEven = idx % 2 === 0;

                return (
                  <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center">
                    
                    {/* Roadmap Dot Node */}
                    <div 
                      className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border z-10 transition-all duration-300 ${
                        isPassed 
                          ? "bg-accent border-accent scale-110 shadow-gold" 
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
                        isPassed ? "border-accent/40" : "border-white/10"
                      }`}>
                        <div className={`flex items-center gap-3 mb-3 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}>
                          <step.icon className={`w-4 h-4 ${isPassed ? "text-accent" : "text-white/40"}`} />
                          <span className="font-mono text-xs text-white/40">Step 0{idx + 1}</span>
                        </div>
                        <h3 className={`font-sans text-xl font-bold transition-colors duration-300 ${
                          isPassed ? "text-accent" : "text-white"
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

          <div className="text-center mt-24">
            <Button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
              className="btn-premium-gold py-6 px-8 sm:px-12 text-sm w-full sm:w-auto"
            >
              Start off with Consultation <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
