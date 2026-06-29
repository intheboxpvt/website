import { Palette, Leaf, Package } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ValueCards = () => {
  const values = [
    {
      icon: Palette,
      title: "Design-Led Packaging",
      description: "Every box is crafted with intention. We turn your brand vision into a tangible, memorable experience.",
    },
    {
      icon: Leaf,
      title: "Sustainable Options",
      description: "Eco-conscious materials and processes that don't compromise on quality or aesthetics.",
    },
    {
      icon: Package,
      title: "Low MOQ Manufacturing",
      description: "Start with as few as 100 units. Premium packaging shouldn't require enterprise-scale orders.",
    },
  ];

  return (
    <section className="section-padding bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-20 lg:mb-24">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-xs font-mono text-white/50 mb-6">
                <span className="w-12 h-px bg-white/20"></span>
                Why Choose InTheBox
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif tracking-tight leading-[0.9] text-white">
                Packaging<br/>
                <span className="text-white/30 italic">Excellence, Delivered.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p className="text-lg text-white/50 leading-relaxed font-sans">
                We combine cinematic design sensibility with custom engineering and sustainable processes to build box experiences that tell your brand's unique story.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {values.map((value, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className="relative bg-black border border-white/10 p-8 lg:p-12 hover:border-white/30 group h-full transition-all duration-500 rounded-none flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-white/40 block mb-6">0{index + 1}</span>
                  
                  {/* Content */}
                  <h3 className="text-2xl lg:text-3xl font-serif text-[#FFFFFF] mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {value.title}
                  </h3>
                  <p className="font-sans text-[#A1A1AA] text-base leading-relaxed">
                    {value.description}
                  </p>
                </div>
                
                {/* Accent Icon at the bottom */}
                <div className="mt-8 flex items-center justify-start text-[#38BDF8] opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  <value.icon className="w-5 h-5" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueCards;