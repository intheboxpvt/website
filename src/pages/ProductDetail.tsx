import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { TEMPLATES } from "@/lib/configurator/templates";
import { ArrowRight, Sparkles, CheckCircle, Package } from "lucide-react";

const PRODUCTS = [
  { name: "Premium Thank You Card", category: "stationery", moq: "100-500", desc: "Folded luxury cards with foil stamping.", configuratorPreset: "straight_tuck", longDesc: "Crafted with premium weights and exquisite detail, our customized thank-you stationery is designed to elevate the unboxing experience. Ideal for boutique brands seeking premium foil accents." },
  { name: "Classic Rigid Box", category: "rigid", moq: "100-500", desc: "Premium rigid boxes with magnetic closure.", configuratorPreset: "rigid_lid_base", longDesc: "Our flagship rigid gift containers feature thick greyboard lining, seamless paper wrap, and magnetic front lid flaps. Hand-finished to guarantee an unmatched premium presentation." },
  { name: "Kraft Mailer", category: "kraft", moq: "250-1000", desc: "Eco-friendly kraft mailers for shipping.", configuratorPreset: "mailer", longDesc: "Sustainable E-commerce shippers made of recycled corrugated fiberboard. Resilient structural flaps protect your merchandise without requiring excess filler material." },
  { name: "Luxury Gift Box", category: "luxury", moq: "50-200", desc: "High-end gift boxes with ribbon closure.", configuratorPreset: "gift", longDesc: "A elegant shallow box with high-grade gloss lamination, matching ribbon closures, and metallic corner reinforcements. Perfect for gourmet packaging and fashion accessories." },
  { name: "Eco Board Box", category: "sustainable", moq: "200-800", desc: "Agri-waste hybrid board packaging.", configuratorPreset: "reverse_tuck", longDesc: "Engineered from organic agricultural residues, these hybrid board cartons minimize environmental footprints while preserving high tensile strength and print clarity." },
  { name: "Drawer Box", category: "rigid", moq: "100-400", desc: "Sliding drawer style rigid boxes.", configuratorPreset: "drawer", longDesc: "A modern sliding sleeve design containing a thick card draw tray. Features ribbon pull tabs and custom fitted insert templates to secure premium products." },
  { name: "Kraft Paper Bag", category: "kraft", moq: "500-2000", desc: "Custom printed kraft bags.", configuratorPreset: "straight_tuck", longDesc: "High-density kraft paper shopping carriers with twisted handles. Built with reinforced cardboard base plates for heavy-duty structural integrity." },
  { name: "Corrugated Shipper", category: "kraft", moq: "500-2000", desc: "Durable custom shipping boxes.", configuratorPreset: "mailer", longDesc: "Heavy-duty double wall shipping cartons designed to protect cargo across bulk distribution routes. Customizable dimensions and strength ratings." },
  { name: "Cosmetic Glass Jar Box", category: "luxury", moq: "100-500", desc: "Premium retail boxes for cosmetics.", configuratorPreset: "perfume", longDesc: "Tall, slender tuck-end folding packaging custom-tailored for perfume containers, skincare tubes, and retail cosmetics jars. Ideal for high-end boutique shelves." },
  { name: "Apparel Sleeve", category: "sustainable", moq: "200-1000", desc: "Eco-friendly sleeves for clothing packaging.", configuratorPreset: "sleeve", longDesc: "A slide-on protective wrapper that wraps around folded apparel, textiles, or flat goods. Lightweight and fully recyclable." }
];

export const ProductDetail = () => {
  const { preset } = useParams<{ preset: string }>();
  
  // Find current product
  const product = PRODUCTS.find((p) => p.configuratorPreset === preset) || PRODUCTS[1];

  // Get 3 relevant templates (filter by active boxType, pad with others if needed)
  const matchedTemplates = TEMPLATES.filter((t) => t.config.boxType === preset);
  const fallbackTemplates = TEMPLATES.filter((t) => t.config.boxType !== preset);
  const relevantTemplates = [...matchedTemplates, ...fallbackTemplates].slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <SEO 
        title={`${product.name} | Custom Packaging Detail`}
        description={product.desc}
      />
      <Navbar />

      <div className="flex-1 max-w-[1200px] mx-auto w-full px-6 pt-32 pb-24 space-y-16">
        
        {/* Product Meta Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border bg-card relative shadow-sm">
            <img 
              src={`/products/${product.name.toLowerCase().replace(/ /g, "_")}.png`} 
              alt={product.name}
              className="w-full h-full object-cover select-none pointer-events-none opacity-90"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            <span className="absolute bottom-6 left-6 font-mono text-[10px] uppercase text-accent tracking-widest bg-card border border-accent/20 px-3 py-1 rounded">
              {product.category}
            </span>
          </div>

          {/* Description */}
          <div className="space-y-6 text-left">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Product Catalogue</span>
              <h1 className="text-3xl md:text-5xl font-bold font-sans mt-2 tracking-tight text-foreground">
                {product.name}
              </h1>
            </div>
            
            <p className="text-sm text-foreground/75 leading-relaxed font-sans">
              {product.longDesc}
            </p>

            <div className="space-y-3 font-mono text-xs text-foreground/50 border-t border-border pt-6">
              <div className="flex justify-between items-center">
                <span>Minimum Order (MOQ)</span>
                <span className="text-foreground font-bold">{product.moq} units</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Base Material Stock</span>
                <span className="text-foreground font-bold">Customizable</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Structural Model Blueprint</span>
                <span className="text-foreground font-bold uppercase">{preset}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Visualizer Prominent CTA Block */}
        <div className="border border-border rounded-lg bg-card p-8 md:p-12 text-center max-w-[900px] mx-auto space-y-6 relative overflow-hidden shadow-sm">
          {/* Subtle gold decoration */}
          <div className="absolute -left-12 -top-12 w-24 h-24 rounded-full bg-accent/10 blur-xl pointer-events-none" />
          <div className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-accent/10 blur-xl pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-background border border-border rounded-full font-mono text-[9px] uppercase tracking-wider text-accent font-semibold">
              <Sparkles size={10} /> Live 3D Previews
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-sans tracking-tight uppercase text-foreground" style={{ fontFamily: "var(--font-clash)" }}>
              Visualize this in 3D
            </h2>
            <p className="text-xs text-foreground/60 font-sans max-w-md mx-auto leading-relaxed">
              Configure length, width, and height, apply textures, upload your company branding logo — then request a custom quote in minutes.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to={`/customize?preset=${preset}&source=catalogue&name=${encodeURIComponent(product.name)}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-[#1c0f24] text-white hover:text-white font-semibold rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              Open 3D Configurator
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Related Templates section */}
        <div className="space-y-6 text-left border-t border-border pt-12">
          <div>
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-foreground" style={{ fontFamily: "var(--font-clash)" }}>
              Recommended Templates
            </h3>
            <p className="text-xs text-foreground/50 font-sans mt-1">
              Select one of our starting configurations to load the 3D visualizer instantly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relevantTemplates.map((tmpl) => (
              <div 
                key={tmpl.id}
                className="bg-card border border-border hover:border-accent hover:shadow-gold rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 group"
              >
                {/* SVG Preview */}
                <div className="aspect-[4/3] bg-black/5 overflow-hidden relative flex items-center justify-center border-b border-border">
                  <img 
                    src={tmpl.previewImage} 
                    alt={tmpl.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                </div>
                
                {/* Text and actions */}
                <div className="p-4 flex flex-col justify-between flex-grow bg-black/[0.01]">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-foreground truncate">{tmpl.name}</h4>
                    <p className="text-[10px] text-foreground/50 line-clamp-2 leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-2 border-t border-border flex items-center justify-between">
                    <span className="text-[9px] font-mono text-accent uppercase font-bold">
                      Preset: {tmpl.config.boxType}
                    </span>
                    <Link
                      to={`/customize?preset=${tmpl.config.boxType}&template=${tmpl.id}`}
                      className="text-[10px] font-mono uppercase tracking-wider text-accent hover:text-foreground transition-colors flex items-center gap-1 font-bold"
                    >
                      Use Template
                      <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default ProductDetail;
