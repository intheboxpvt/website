import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Leaf, Recycle, TreePine, Droplets, Users, TrendingDown, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { SmoothScrollProvider } from "@/components/SmoothScroll";

const Sustainability = () => {
  const sustainabilityFeatures = [
    { 
      icon: Leaf, 
      title: "Agri Waste Hybrid Boards", 
      desc: "Made from rice husk and wheat straw that would otherwise be burned, reducing air pollution in Punjab." 
    },
    { 
      icon: Recycle, 
      title: "100% Recyclable", 
      desc: "All our packaging can be recycled through standard municipal systems across India." 
    },
    { 
      icon: TreePine, 
      title: "Compostable Options", 
      desc: "Select materials break down naturally within 90 days in commercial composting facilities." 
    },
    { 
      icon: Droplets, 
      title: "Water Based Inks", 
      desc: "Eco friendly printing that is safe for the environment and completely non toxic." 
    },
  ];

  const impactStats = [
    { value: "2,500+", label: "Tons of Agri Waste Diverted", icon: TrendingDown },
    { value: "1,200+", label: "Farmers Supported", icon: Users },
    { value: "100%", label: "Recyclable and Compostable", icon: Leaf },
  ];

  const lifecycleSteps = [
    { step: "01", title: "Source", desc: "Agri waste collected from local Punjab farmers" },
    { step: "02", title: "Process", desc: "Transformed into premium hybrid boards" },
    { step: "03", title: "Create", desc: "Crafted into beautiful custom packaging" },
    { step: "04", title: "Return", desc: "100% recyclable or compostable end of life" },
  ];

  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-background text-foreground">
        <SEO 
          title="Sustainable Custom Packaging Solutions | InTheBox"
          description="Fusing luxury with sustainability. Explore our agri-waste hybrid boards, eco-friendly water-based inks, and circular packaging solutions."
          keywords="sustainable packaging, eco-friendly box, custom recycled packaging, circular packaging, crop residue boards"
        />
        <Navbar />

        {/* Page Header */}
        <section className="pt-32 pb-16 px-6 lg:px-12 bg-[#1d0a27] border-b border-white/5 relative overflow-hidden text-white">
          <div className="absolute -right-20 -top-20 w-[600px] h-[600px] pointer-events-none opacity-[0.015] z-0 select-none">
            <img 
              src="/assets/logo.png" 
              alt="" 
              className="w-full h-full object-contain filter invert brightness-0"
            />
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <span className="inline-flex items-center gap-3 text-xs font-mono text-emerald font-semibold mb-4">
              <span className="w-12 h-px bg-emerald/30"></span>
              Environmental Stewardship
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-sans font-bold tracking-tight leading-[0.9] text-white">
              Packaging<br/>
              <span className="text-accent italic font-semibold">That Cares.</span>
            </h1>
            <p className="font-sans text-base text-white/60 mt-6 max-w-xl leading-relaxed">
              Our commitment to sustainable packaging without compromising on luxury, structural integrity, or brand prestige.
            </p>
          </div>
        </section>

        {/* Agri-Waste & Impact Story */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <span className="inline-flex items-center gap-3 text-xs font-mono text-emerald font-semibold mb-4">
                    <span className="w-8 h-px bg-emerald/30"></span>
                    The Circular Concept
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-foreground mb-6">
                    Impact on Punjab <span className="text-emerald">Crop Burning</span>
                  </h2>
                  <p className="font-sans text-lg text-foreground/80 leading-relaxed mb-6">
                    Our sustainability mode features agri-waste hybrid boards made from rice husk and straw—materials that would otherwise contribute to crop-burning. Stronger than traditional board, 100% compostable, and making a real impact.
                  </p>
                  <p className="font-sans text-base text-foreground/60 leading-relaxed mb-8">
                    By using agri waste hybrid boards made from rice husk and wheat straw, we help local farmers monetize crop residue instead of burning it. This directly combats the seasonal air pollution crisis across North India and builds a secondary revenue stream for farming families.
                  </p>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-5">
                <ScrollReveal delay={200} direction="right">
                  <div className="relative group aspect-square rounded-none overflow-hidden border border-border shadow-2xl">
                    <img 
                      src="/products/packaging-1.jpg" 
                      alt="Sustainable Packaging Showcase" 
                      className="w-full h-full object-cover opacity-90 transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur-md px-4 py-2 border border-border flex items-center gap-2 shadow-soft">
                      <Leaf className="w-3.5 h-3.5 text-emerald" />
                      <span className="text-xs font-mono text-foreground/90">100% Eco-Friendly</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 px-6 lg:px-12 bg-background/50 border-t border-b border-border">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-left mb-16">
              <span className="font-mono text-xs text-emerald uppercase tracking-wider">Our Eco Practices</span>
              <h2 className="font-sans text-3xl font-bold text-foreground mt-4">Sustainable Design Pillars</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border bg-card divide-y lg:divide-y-0 lg:divide-x divide-border relative z-10">
              {sustainabilityFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="p-8 lg:p-12 hover:border-emerald/40 transition-colors duration-300 flex flex-col justify-between group min-h-[240px]">
                    <div className="flex justify-between items-start mb-8">
                      <span className="font-mono text-xs text-emerald uppercase tracking-wider">0{idx + 1} // Eco</span>
                      <Icon className="w-5 h-5 text-foreground/20 group-hover:text-emerald transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-sans text-lg font-bold text-foreground mb-2">{feat.title}</h3>
                      <p className="font-sans text-sm text-foreground/60 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lifecycle Steps */}
        <section className="section-padding bg-background">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <span className="font-mono text-xs text-emerald uppercase tracking-wider">Circular Lifecycle</span>
              <h2 className="font-sans text-3xl font-bold text-foreground mt-4">The Journey of a Box</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {lifecycleSteps.map((step, idx) => (
                <ScrollReveal key={idx} delay={idx * 150}>
                  <div className="bg-card border border-border p-8 rounded-none relative h-full flex flex-col justify-between hover:border-emerald/35 transition-colors group">
                    <span className="font-mono text-3xl text-emerald/30 group-hover:text-emerald transition-colors font-extrabold">{step.step}</span>
                    <div className="mt-8">
                      <h3 className="font-sans text-xl font-bold text-foreground mb-3">{step.title}</h3>
                      <p className="font-sans text-sm text-foreground/60 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20 px-6 lg:px-12 bg-[#1d0a27] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,#1d0a27_95%)] z-0"></div>
          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="font-mono text-xs text-emerald uppercase tracking-wider">Real Impact</span>
              <h2 className="font-sans text-3xl font-bold text-white mt-4">Measurable Environmental Change</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {impactStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white/[0.03] border border-white/10 p-8 rounded-none text-center backdrop-blur-sm">
                    <Icon className="w-6 h-6 text-emerald mx-auto mb-4" />
                    <p className="font-sans text-4xl md:text-5xl text-white font-bold">{stat.value}</p>
                    <p className="font-mono text-xs text-white/50 mt-2 uppercase tracking-widest">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-background border-t border-border">
          <div className="max-w-[1400px] mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-foreground mb-6">
                Ready to make the <span className="text-emerald">Eco-Friendly</span> switch?
              </h2>
              <p className="font-sans text-base text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                Design custom luxury boxes with carbon-negative agri-waste hybrid boards. Maintain premium brand prestige while showing absolute stewardship for our environment.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Button 
                  onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                  className="btn-premium-gold px-8 py-6 text-sm"
                >
                  Get Custom Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    </SmoothScrollProvider>
  );
};

export default Sustainability;
