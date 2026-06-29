import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
    { title: "Starter Session", desc: "1-hour discovery call to understand your brand and packaging needs." },
    { title: "Deep Dive Workshop", desc: "Half-day intensive session with full brand packaging audit." },
    { title: "Advisory Pipeline", desc: "Ongoing structural design and material optimization support." },
  ];

  const designServices = [
    { icon: Palette, title: "Concept Development", desc: "Mood boards, raw sketches, and structural layout options aligned with your product identity." },
    { icon: Layers, title: "3D Rendering Preview", desc: "High-fidelity digital models and thickness representations before committing to manufacturing." },
    { icon: Sparkles, title: "Production Dielines", desc: "Exact dielines ready for print presses and plate preparation." },
  ];

  const manufacturingFeatures = [
    "Rigid boxes, kraft wraps, and custom inserts",
    "Soft-touch matte, high-gloss, and spot UV textures",
    "Precision foil hot-stamping & blind embossing",
    "Custom paperboard grades and agri-waste sheets",
    "Integrated logistics with doorstep shipping pan-India",
  ];

  const roadSteps = [
    { percentage: 0, icon: Search, title: "Discover & Consult", desc: "We study your product dimensions, target weight, and shipping parameters to start your consultation." },
    { percentage: 20, icon: Lightbulb, title: "Concept Blueprint", desc: "Our structural designers outline custom layout, opening parameters, and box dimensions." },
    { percentage: 40, icon: Box, title: "Prototype Mockup", desc: "Fabricating physical sample boxes for real-world verification of paperboard weight and size fit." },
    { percentage: 60, icon: CheckCircle, title: "Exacting Approval", desc: "Inspection of detailing, rigid closures, and final contract sign-off." },
    { percentage: 80, icon: Factory, title: "Volume Fabrication", desc: "High-volume printing, spot finishes, folding, gluing, and strict quality control." },
    { percentage: 100, icon: Truck, title: "Secure Delivery", desc: "Integrated logistics coordinates direct shipment to your corporate warehouses." },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SEO 
        title="Our Process & Services | Design to Delivery | InTheBox"
        description="Comprehensive packaging services from consultation and design to manufacturing and delivery. Your end-to-end partner for premium packaging."
        keywords="packaging design services, custom packaging manufacturer, packaging consultation, 3d packaging design, packaging delivery india"
      />
      <Navbar />
      
      {/* Page Header (Increased padding to avoid navbar cutting) */}
      <section className="pt-36 pb-8 px-6 lg:px-12 bg-black border-b border-white/5 relative overflow-hidden">
        {/* Subtle Watermark logo inside Header */}
        <div className="absolute -right-20 -top-20 w-[600px] h-[600px] pointer-events-none opacity-[0.015] z-0 select-none">
          <img 
            src="/assets/logo.png" 
            alt="" 
            className="w-full h-full object-contain filter invert brightness-0"
          />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <span className="inline-flex items-center gap-3 text-xs font-mono text-white/50 mb-6">
            <span className="w-12 h-px bg-white/20"></span>
            Services & Process
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif tracking-tight leading-[0.9] text-white">
            End-to-End<br/>
            <span className="text-white/30 italic">Packaging Solutions.</span>
          </h1>
          <p className="font-sans text-lg text-white/50 mt-8 max-w-xl">
            From initial consultation to final volume distribution, we operate the entire design-to-delivery lifecycle.
          </p>
        </div>
      </section>

      {/* Combined Consultation & Design Maze Grid */}
      <section className="py-24 px-6 lg:px-12 bg-[#050505] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <Palette className="w-5 h-5 text-[#38BDF8]" />
              <h2 className="font-serif text-3xl font-light text-white">Consultation & Structural Design Maze</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-6 border border-white/10 bg-black divide-white/10 relative z-10">
            {/* Cell 1: Starter Session */}
            <div className="md:col-span-3 border-r border-b border-white/10 p-8 lg:p-12 hover:border-[#38BDF8]/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider">01 // Starter Session</span>
                <MessageSquare className="w-5 h-5 text-white/20 group-hover:text-[#38BDF8] transition-colors" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-light text-white mb-2">{consultationServices[0].title}</h3>
                <p className="font-sans text-xs text-white/55 leading-relaxed">{consultationServices[0].desc}</p>
              </div>
            </div>

            {/* Cell 2: Deep Dive Workshop */}
            <div className="md:col-span-3 border-b border-white/10 p-8 lg:p-12 hover:border-[#38BDF8]/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider">02 // Deep Dive</span>
                <MessageSquare className="w-5 h-5 text-white/20 group-hover:text-[#38BDF8] transition-colors" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-light text-white mb-2">{consultationServices[1].title}</h3>
                <p className="font-sans text-xs text-white/55 leading-relaxed">{consultationServices[1].desc}</p>
              </div>
            </div>

            {/* Cell 3: Advisory Pipeline */}
            <div className="md:col-span-2 border-r border-b md:border-b-0 border-white/10 p-8 lg:p-12 hover:border-[#38BDF8]/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider">03 // Advisory</span>
                <MessageSquare className="w-5 h-5 text-white/20 group-hover:text-[#38BDF8] transition-colors" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-light text-white mb-2">{consultationServices[2].title}</h3>
                <p className="font-sans text-xs text-white/55 leading-relaxed">{consultationServices[2].desc}</p>
              </div>
            </div>

            {/* Cell 4: Concept Development */}
            <div className="md:col-span-4 border-b md:border-b-0 border-white/10 p-8 lg:p-12 hover:border-[#38BDF8]/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider">04 // Concepts</span>
                <Palette className="w-5 h-5 text-white/20 group-hover:text-[#38BDF8] transition-colors" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-light text-white mb-2">{designServices[0].title}</h3>
                <p className="font-sans text-xs text-white/55 leading-relaxed">{designServices[0].desc}</p>
              </div>
            </div>

            {/* Cell 5: 3D Rendering Preview */}
            <div className="md:col-span-3 border-r border-t border-white/10 md:border-t-0 p-8 lg:p-12 hover:border-[#38BDF8]/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider">05 // 3D Mockups</span>
                <Layers className="w-5 h-5 text-white/20 group-hover:text-[#38BDF8] transition-colors" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-light text-white mb-2">{designServices[1].title}</h3>
                <p className="font-sans text-xs text-white/55 leading-relaxed">{designServices[1].desc}</p>
              </div>
            </div>

            {/* Cell 6: Production Dielines */}
            <div className="md:col-span-3 border-t border-white/10 md:border-t-0 p-8 lg:p-12 hover:border-[#38BDF8]/40 transition-colors duration-300 flex flex-col justify-between group min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider">06 // Dielines</span>
                <Sparkles className="w-5 h-5 text-white/20 group-hover:text-[#38BDF8] transition-colors" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-light text-white mb-2">{designServices[2].title}</h3>
                <p className="font-sans text-xs text-white/55 leading-relaxed">{designServices[2].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Delivery Road Timeline */}
      <section className="py-32 px-6 lg:px-12 bg-black relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="text-left mb-24">
              <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider">Our Pipeline</span>
              <h2 className="font-serif text-4xl font-light text-white mt-4">The Custom Road Map</h2>
              <p className="font-sans text-sm text-white/50 max-w-sm mt-3">
                Scroll to move the delivery truck along our checkpoints from setup to final shipment.
              </p>
            </div>
          </ScrollReveal>

          {/* Road Segment Container */}
          <div ref={containerRef} className="relative max-w-4xl mx-auto min-h-[900px] py-10">
            
            {/* The Road: dashed path line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 border-l border-dashed border-white/20 z-0"></div>
            
            {/* The Active Path: colored overlay */}
            <div 
              className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 w-0.5 bg-[#38BDF8] z-0 transition-all duration-100 ease-out"
              style={{ height: `${truckProgress}%` }}
            ></div>

            {/* Moving Truck Icon Node */}
            <div 
              className="absolute left-6 md:left-1/2 z-20 w-10 h-10 bg-[#38BDF8] border border-black rounded-full flex items-center justify-center text-black shadow-2xl transition-all duration-200"
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
                          ? "bg-[#38BDF8] border-[#38BDF8] scale-110 shadow-[0_0_8px_#38BDF8]" 
                          : "bg-black border-white/30"
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
                      <div className={`p-6 border rounded-none bg-[#050505] transition-all duration-500 ${
                        isPassed ? "border-[#38BDF8]/40" : "border-white/10"
                      }`}>
                        <div className={`flex items-center gap-3 mb-3 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}>
                          <step.icon className={`w-4 h-4 ${isPassed ? "text-[#38BDF8]" : "text-white/40"}`} />
                          <span className="font-mono text-xs text-white/40">Step 0{idx + 1}</span>
                        </div>
                        <h3 className={`font-serif text-2xl font-light transition-colors duration-300 ${
                          isPassed ? "text-[#38BDF8]" : "text-white"
                        }`}>
                          {step.title}
                        </h3>
                        <p className="font-sans text-xs text-white/50 leading-relaxed mt-3">
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
              className="rounded-full bg-white hover:bg-white/90 text-black font-sans text-sm font-semibold py-6 px-12 transition-all duration-300"
            >
              Start off with Consultation <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

        </div>
      </section>

      {/* Manufacturing Section (No button inside, at the bottom) */}
      <section className="py-24 px-6 lg:px-12 bg-[#050505] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <Package className="w-5 h-5 text-[#38BDF8]" />
              <h2 className="font-serif text-3xl font-light text-white">Manufacturing & Finishes</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal className="space-y-8">
              <ul className="space-y-6">
                {manufacturingFeatures.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-4 font-sans text-sm text-white/75 leading-relaxed">
                    <Truck className="w-5 h-5 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="right">
              <div className="aspect-[4/3] rounded-none overflow-hidden border border-white/10 shadow-2xl relative">
                <img 
                  src="/about/manufacturing.png" 
                  alt="Packaging Manufacturing Process" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Services;
