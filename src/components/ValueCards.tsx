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
    <section className="section-padding section-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-sans text-sm tracking-widest uppercase text-gold-metallic font-semibold">
              Why Choose InTheBox
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-royal-purple mt-4">
              Packaging Excellence, Delivered
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className="card-royal p-8 hover-lift group h-full">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gold-metallic/10 flex items-center justify-center mb-6 group-hover:bg-gold-metallic/20 transition-colors">
                  <value.icon className="w-8 h-8 text-gold-metallic" />
                </div>
                
                {/* Content */}
                <h3 className="font-serif text-xl text-royal-purple mb-4">
                  {value.title}
                </h3>
                <p className="font-sans text-aubergine/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueCards;