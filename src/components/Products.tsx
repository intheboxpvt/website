import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Products = () => {
  const products = [
    {
      name: "Custom Paper Bags",
      description: "Premium paper bags with custom prints, handles, and finishes for retail and gifting.",
      icon: "🛍️",
      accent: "from-brushed-gold/20 to-brushed-gold/5",
    },
    {
      name: "Potli Bags",
      description: "Traditional fabric pouches with modern designs for jewelry, sweets, and special occasions.",
      icon: "👝",
      accent: "from-soft-purple/20 to-soft-purple/5",
    },
    {
      name: "Rigid Boxes",
      description: "Sturdy, luxurious boxes perfect for premium products, electronics, and high-end retail.",
      icon: "📦",
      accent: "from-primary/20 to-primary/5",
    },
    {
      name: "Foldable Boxes",
      description: "Space-efficient packaging that unfolds into elegant boxes for e-commerce and retail.",
      icon: "🎁",
      accent: "from-brushed-gold/20 to-brushed-gold/5",
    },
    {
      name: "Gift Hampers",
      description: "Curated luxury packaging for corporate gifts, festivals, and special celebrations.",
      icon: "🎀",
      accent: "from-soft-purple/20 to-soft-purple/5",
    },
    {
      name: "Stickers & Tissue",
      description: "Custom stickers, tissue papers, and finishing touches for complete branding.",
      icon: "✨",
      accent: "from-primary/20 to-primary/5",
    },
    {
      name: "Custom Sizing",
      description: "Bespoke packaging solutions tailored exactly to your product dimensions and needs.",
      icon: "📐",
      accent: "from-brushed-gold/20 to-brushed-gold/5",
    },
  ];

  return (
    <section id="products" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-brushed-gold"></span>
            <span className="font-satoshi text-sm tracking-widest uppercase text-muted-foreground font-medium">
              Our Products
            </span>
          </div>
          
          <h2 className="font-clash text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
            Custom Packaging{" "}
            <span className="text-soft-purple">Options</span>
          </h2>
          
          <p className="font-satoshi text-lg text-muted-foreground leading-relaxed">
            Explore our range of premium packaging products designed for brands 
            across fashion, beauty, food, lifestyle, and gifting.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.name}
              className="group relative bg-card rounded-2xl p-6 hover-lift cursor-pointer overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${product.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{product.icon}</span>
                </div>

                {/* Title */}
                <h3 className="font-clash text-lg font-semibold text-primary mb-3">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="font-satoshi text-sm text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Link */}
                <a 
                  href="#"
                  className="inline-flex items-center gap-2 font-satoshi text-sm font-medium text-brushed-gold hover:text-primary transition-colors"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              {/* Gold Accent Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-brushed-gold/10 transform rotate-45 translate-x-4 -translate-y-4 group-hover:bg-brushed-gold/30 transition-colors"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button variant="hero" size="xl" className="group">
            Explore All Products
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;