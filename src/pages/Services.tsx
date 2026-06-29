import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { MessageSquare, Palette, Layers, Package, Sparkles, Truck, Search, Lightbulb, Box, CheckCircle, Factory } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";

const Services = () => {
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

  const processSteps = [
    { icon: Search, title: "Discover", desc: "We study your product dimensions, target weight, and shipping parameters." },
    { icon: Lightbulb, title: "Concept", desc: "Our structural designers outline custom layout and closing options." },
    { icon: Box, title: "Prototype", desc: "Fabricating physical mockups for fit, strength, and texture verification." },
    { icon: CheckCircle, title: "Sign-off", desc: "Exacting specifications approval and volume pricing agreements." },
    { icon: Factory, title: "Production", desc: "High-volume printing, folding, gluing, and quality inspection." },
    { icon: Truck, title: "Logistics", desc: "Secure shipping and delivery direct to your warehouse hubs." },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SEO 
        title="Our Process & Services | Design to Delivery | InTheBox"
        description="Comprehensive packaging services from consultation and design to manufacturing and delivery. Your end-to-end partner for premium packaging."
        keywords="packaging design services, custom packaging manufacturer, packaging consultation, 3d packaging design, packaging delivery india"
      />
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 lg:px-12 bg-black border-b border-white/5 relative overflow-hidden">
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

      {/* Consultation Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <MessageSquare className="w-5 h-5 text-[#38BDF8]" />
              <h2 className="font-serif text-3xl font-light text-white">Packaging Consultation</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6">
            {consultationServices.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 100}>
                <div className="bg-black border border-white/10 p-8 rounded-none hover:border-white/30 transition-all duration-300 h-full">
                  <h3 className="font-serif text-2xl font-light text-white mb-4">{s.title}</h3>
                  <p className="font-sans text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Design Section */}
      <section className="py-24 px-6 lg:px-12 bg-black border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <Palette className="w-5 h-5 text-[#38BDF8]" />
              <h2 className="font-serif text-3xl font-light text-white">Structural Design & Engineering</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6">
            {designServices.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 100}>
                <div className="bg-[#050505] border border-white/10 p-8 rounded-none hover:border-[#38BDF8]/40 transition-all duration-300 h-full">
                  <s.icon className="w-6 h-6 text-[#38BDF8] mb-6" />
                  <h3 className="font-serif text-2xl font-light text-white mb-4">{s.title}</h3>
                  <p className="font-sans text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <Package className="w-5 h-5 text-[#38BDF8]" />
              <h2 className="font-serif text-3xl font-light text-white">Manufacturing & Finishes</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal className="space-y-8">
              <ul className="space-y-4">
                {manufacturingFeatures.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-4 font-sans text-sm text-white/70">
                    <Truck className="w-5 h-5 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                size="lg" 
                className="rounded-full bg-white hover:bg-white/90 text-black font-sans text-sm font-semibold py-6 px-8 transition-all duration-300"
              >
                Request Consultation Brief
              </Button>
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

      {/* Process Map Section */}
      <section className="py-24 px-6 lg:px-12 bg-black border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="text-left mb-16">
              <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider">Our Pipeline</span>
              <h2 className="font-serif text-4xl font-light text-white mt-4">From Concept to Creation</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 100}>
                <div className="relative bg-[#050505] border border-white/10 rounded-none p-8 h-full flex flex-col justify-between hover:border-white/30 transition-all duration-300">
                  <div>
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#38BDF8] rounded-full flex items-center justify-center font-mono font-bold text-black text-xs shadow-lg">{i + 1}</div>
                    <step.icon className="w-6 h-6 text-[#38BDF8] mb-6 mt-2" />
                    <h3 className="font-serif text-2xl font-light text-white mb-3">{step.title}</h3>
                    <p className="font-sans text-sm text-white/50 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Services;
