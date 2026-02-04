import { Shield, Headphones, Leaf } from "lucide-react";

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Every product undergoes rigorous quality checks to ensure your brand receives only the finest packaging materials.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our dedicated team is always available to assist you with design consultations, order updates, and any queries.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Options",
      description: "Sustainable packaging solutions that help your brand make a positive environmental impact without compromising quality.",
    },
  ];

  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-deep-purple to-soft-purple rounded-2xl overflow-hidden relative">
              {/* Content Inside */}
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto mb-8 bg-cream/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cream/20">
                    <span className="text-7xl">🎁</span>
                  </div>
                  <p className="font-clash text-3xl font-bold text-cream mb-2">Quality First</p>
                  <p className="font-satoshi text-cream/70">Since 2018</p>
                </div>
              </div>

              {/* Gold Accents */}
              <div className="absolute top-8 right-8 w-4 h-4 bg-brushed-gold rounded-full"></div>
              <div className="absolute bottom-12 left-8 w-20 h-20 border border-brushed-gold/30 rounded-full"></div>

              {/* Pattern */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--cream)) 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 lg:right-0 bg-card card-soft p-6 rounded-xl">
              <p className="font-clash text-4xl font-bold text-primary">5+</p>
              <p className="font-satoshi text-sm text-muted-foreground">Years of Excellence</p>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-brushed-gold"></span>
              <span className="font-satoshi text-sm tracking-widest uppercase text-muted-foreground font-medium">
                Why Us
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-clash text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
              Why Brands Choose{" "}
              <span className="text-soft-purple">InTheBox</span>
            </h2>

            {/* Subtext */}
            <p className="font-satoshi text-lg text-muted-foreground leading-relaxed mb-12">
              From startup-ready quantities to full-scale production, we deliver 
              reliable, beautiful, and functional packaging designed exactly for 
              your brand's needs.
            </p>

            {/* Benefit Cards */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit.title}
                  className="group flex gap-6 p-6 rounded-xl bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-brushed-gold/10 flex items-center justify-center group-hover:bg-brushed-gold/20 transition-colors">
                    <benefit.icon className="w-6 h-6 text-brushed-gold" />
                  </div>
                  <div>
                    <h3 className="font-clash text-lg font-semibold text-primary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="font-satoshi text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;