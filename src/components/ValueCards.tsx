import { Palette, Leaf, Package } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ValueCards = () => {
  const values = [
    {
      icon: Palette,
      title: "Design Led Packaging",
      description: "Every box is crafted with intention. We turn your brand vision into a tangible, memorable experience.",
      num: "01"
    },
    {
      icon: Leaf,
      title: "Sustainable Options",
      description: "Eco conscious materials and processes that do not compromise on quality or aesthetics.",
      num: "02"
    },
    {
      icon: Package,
      title: "Low MOQ Manufacturing",
      description: "Start with as few as 100 units. Premium packaging should not require enterprise scale orders.",
      num: "03"
    },
  ];

  return (
    <section className="section-padding bg-background relative overflow-hidden border-t border-border">
      {/* Background Watermark */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] pointer-events-none opacity-[0.012] select-none z-0">
        <img src="/assets/logo.png" alt="" className="w-full h-full object-contain filter invert brightness-0" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header with Overflowing Bonsai Image (Matching screenshot 4) */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20 lg:mb-28">
          {/* Huge Architectural Typography */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <span className="inline-flex items-center gap-3 text-xs font-mono text-foreground/50 mb-6">
                <span className="w-12 h-px bg-border"></span>
                Why Choose InTheBox
              </span>
              <h2 className="text-6xl md:text-8xl font-sans font-bold tracking-tight leading-[0.95] text-foreground">
                Design.<br/>
                <span className="text-foreground/30">Structure.</span><br/>
                <span className="text-foreground/15">Deliver.</span>
              </h2>
              <p className="text-lg text-foreground/75 leading-relaxed font-sans mt-8 max-w-lg">
                We combine custom structural engineering with premium finishes to build box experiences that make a difference.
              </p>
            </ScrollReveal>
          </div>
          
          {/* Floating High-Res Bonsai Visual extending beyond container bounds */}
          <div className="lg:col-span-6 relative h-[380px] md:h-[450px] flex items-center justify-center">
            <ScrollReveal delay={200} direction="right">
              <div className="relative group select-none">
                {/* Background soft glow aura */}
                <div className="absolute -inset-10 bg-accent/15 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                {/* Large floating product image */}
                <img 
                  src="/products/card_image.png" 
                  alt="Luxury Bonsai Packaging Box" 
                  className="w-[320px] md:w-[420px] h-auto object-contain relative z-10 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Value Cards (No images inside cards, matching screenshot 4 footer grid) */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => {
            const isMiddle = index === 1;
            return (
              <ScrollReveal key={index} delay={index * 150}>
                <div
                  className={`relative p-8 lg:p-12 group h-full transition-all duration-500 flex flex-col justify-between shadow-soft rounded-none overflow-hidden hover:-translate-y-1 border ${
                    isMiddle
                      ? "bg-[#1c0f24] text-white border-accent shadow-gold"
                      : "bg-card text-foreground border-border hover:border-accent hover:shadow-gold"
                  }`}
                >
                  {/* Accent Top Line for contrast */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-accent/20 group-hover:bg-accent transition-colors duration-500"></div>

                  {/* Shining sweep effect */}
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shine z-20 pointer-events-none"></div>
                  
                  <div>
                    <span className="font-mono text-xs text-accent font-semibold block mb-8">{value.num}</span>
                    
                    {/* Content */}
                    <h3 className={`text-2xl lg:text-3xl font-sans font-bold mb-4 group-hover:translate-x-2 transition-transform duration-500 ${isMiddle ? "text-white" : "text-foreground"}`}>
                      {value.title}
                    </h3>
                    <p className={`font-sans text-sm leading-relaxed mb-6 ${isMiddle ? "text-white/80" : "text-foreground/75"}`}>
                      {value.description}
                    </p>
                  </div>

                  {/* Accent Icon at the bottom */}
                  <div className="flex items-center justify-between text-accent mt-8">
                    <value.icon className="w-5 h-5" />
                    <span className={`font-mono text-[9px] uppercase tracking-wider group-hover:text-accent transition-colors ${isMiddle ? "text-white/40" : "text-foreground/40"}`}>InTheBox Pvt Ltd</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueCards;