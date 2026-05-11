import { MessageSquare, Palette, Factory, ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Packaging Consultation",
      description: "We help brands choose the right materials, structures, and formats that align with their budget, audience, and product experience.",
      features: ["Material Selection", "Budget Planning", "Format Strategy"],
    },
    {
      number: "02",
      icon: Palette,
      title: "Packaging Design",
      description: "We create visually refined and structurally functional packaging engineered for a premium unboxing experience.",
      features: ["Visual Design", "Structural Engineering", "Brand Alignment"],
    },
    {
      number: "03",
      icon: Factory,
      title: "Manufacturing & Production",
      description: "High-quality production using premium materials, advanced machinery, and strict quality control.",
      features: ["Premium Materials", "Quality Control", "Timely Delivery"],
    },
  ];

  return (
    <section id="services" className="section-padding bg-deep-purple">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-brushed-gold"></span>
            <span className="font-satoshi text-sm tracking-widest uppercase text-cream/60 font-medium">
              Our Services
            </span>
            <span className="w-8 h-[2px] bg-brushed-gold"></span>
          </div>
          
          <h2 className="font-clash text-4xl lg:text-5xl xl:text-6xl font-bold text-cream leading-tight mb-6">
            From Concept to{" "}
            <span className="text-brushed-gold">Creation</span>
          </h2>
          
          <p className="font-satoshi text-lg text-cream/70 max-w-2xl mx-auto">
            A seamless journey from initial consultation through design to final production.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group relative bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-2xl p-8 lg:p-10 hover:bg-cream/10 transition-all duration-500"
            >
              {/* Number */}
              <span className="absolute -top-4 left-8 font-clash text-6xl font-bold text-brushed-gold/20">
                {service.number}
              </span>

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 rounded-xl bg-brushed-gold/10 flex items-center justify-center mb-8 group-hover:bg-brushed-gold/20 transition-colors">
                <service.icon className="w-7 h-7 text-brushed-gold" />
              </div>

              {/* Content */}
              <h3 className="font-clash text-xl font-semibold text-cream mb-4">
                {service.title}
              </h3>
              
              <p className="font-satoshi text-cream/70 leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 font-satoshi text-sm text-cream/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-brushed-gold"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn More Link */}
              <a 
                href="#"
                className="inline-flex items-center gap-2 font-satoshi text-sm font-medium text-brushed-gold hover:text-cream transition-colors group/link"
              >
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </a>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brushed-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl"></div>
            </div>
          ))}
        </div>

        {/* Process Flow Line */}
        <div className="hidden md:flex items-center justify-center mt-12 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brushed-gold"></span>
            <span className="w-24 h-[2px] bg-gradient-to-r from-brushed-gold to-cream/20"></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brushed-gold/60"></span>
            <span className="w-24 h-[2px] bg-gradient-to-r from-brushed-gold/60 to-cream/20"></span>
          </div>
          <span className="w-3 h-3 rounded-full bg-cream/40"></span>
        </div>
      </div>
    </section>
  );
};

export default Services;