import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Sparkles, Box } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PRODUCTS, Product } from "@/data/products";

const CATEGORIES = [
  { id: "All", label: "All Products" },
  { id: "Boxes", label: "Boxes" },
  { id: "Bags", label: "Bags" },
  { id: "Printables", label: "Printables" },
  { id: "Sustainability", label: "Sustainability", icon: Leaf },
];

const Catalogue = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All"
    ? PRODUCTS
    : activeCategory === "Sustainability"
      ? PRODUCTS.filter((p) => p.category === "Sustainability" || p.isSustainable)
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const scrollToGrid = () => {
    document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <SEO 
        title="Product Catalogue | Custom Packaging Solutions | InTheBox"
        description="Browse our complete range of custom rigid boxes, eco-board containers, kraft mailers, bags, and corporate stationery. Get instant quotes and customize in 3D."
        keywords="packaging catalogue, custom boxes, rigid boxes, kraft mailers, eco-friendly packaging, wholesale packaging"
      />
      <Navbar />

      {/* Compact Page Header */}
      <section className="pt-24 pb-10 px-6 lg:px-12 section-royal border-b border-white/10 relative overflow-hidden">
        {/* Watermark logo background */}
        <div className="absolute right-0 top-0 w-[320px] h-[320px] pointer-events-none opacity-[0.03] select-none">
          <img 
            src="/assets/logo.png" 
            alt="" 
            className="w-full h-full object-contain filter invert brightness-0"
          />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-white/50">
                <span className="w-8 h-px bg-accent"></span>
                <span>Catalogue & Archive</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
                Explore Our Packaging <span className="text-accent italic">Collection</span>
              </h1>
              <p className="font-sans text-sm text-white/70 leading-relaxed">
                Discover bespoke rigid boxes, eco-board shippers, shopping bags, and premium printables engineered for high-impact brand unboxing.
              </p>
            </div>

            {/* Header CTAs */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button
                onClick={scrollToGrid}
                className="bg-accent hover:bg-accent/80 text-[#1d0a27] font-semibold text-xs font-mono uppercase tracking-wider px-5 py-3 rounded-lg shadow-md transition-all"
              >
                Explore Products
              </Button>
              <Link
                to="/customize"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-mono uppercase tracking-wider px-5 py-3 rounded-lg transition-all"
              >
                <span>Open 3D Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Discovery Section */}
      <section id="product-grid" className="py-12 px-6 lg:px-12 bg-background flex-1">
        <div className="max-w-[1400px] mx-auto space-y-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 justify-start border-b border-border pb-6">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#1c0f24] text-white border border-[#1c0f24] shadow-sm"
                      : "bg-card text-foreground/70 border border-border hover:border-accent hover:text-accent"
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-emerald-500"}`} />}
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-muted text-foreground/50"
                  }`}>
                    {cat.id === "All" 
                      ? PRODUCTS.length 
                      : cat.id === "Sustainability" 
                        ? PRODUCTS.filter(p => p.category === "Sustainability" || p.isSustainable).length
                        : PRODUCTS.filter(p => p.category === cat.id).length
                    }
                  </span>
                </button>
              );
            })}
          </div>

          {/* Product Grid — 4 Columns on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p: Product) => (
              <div 
                key={p.id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/60 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                {/* Image Area */}
                <div className="aspect-[4/3] overflow-hidden bg-muted/40 relative">
                  <Link to={`/product/${p.configuratorPreset}`}>
                    <img 
                      src={p.image} 
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm border border-border px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider text-foreground">
                    {p.isSustainable && <Leaf className="w-3 h-3 text-emerald-500" />}
                    <span>{p.category}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <Link to={`/product/${p.configuratorPreset}`}>
                      <h2 className="font-sans text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                        {p.name}
                      </h2>
                    </Link>
                    <p className="font-sans text-xs text-foreground/60 line-clamp-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Details & Actions */}
                  <div className="space-y-3 pt-3 border-t border-border">
                    <div className="flex justify-between items-center text-[11px] font-mono">
                      <span className="text-foreground/50 uppercase">Min Order</span>
                      <span className="text-foreground font-semibold">{p.moq} pcs</span>
                    </div>

                    {/* CTAs */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        to={`/customize?preset=${p.configuratorPreset}&source=catalogue&name=${encodeURIComponent(p.name)}`}
                        className="w-full py-2.5 px-3 bg-card hover:bg-accent text-foreground hover:text-[#1d0a27] border border-border hover:border-accent font-mono text-[11px] font-semibold uppercase tracking-wider rounded-lg transition-all text-center flex items-center justify-center gap-1"
                      >
                        <Box className="w-3 h-3" />
                        <span>Customize</span>
                      </Link>

                      <Button
                        onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                        className="w-full py-2.5 px-3 btn-premium-gold text-xs font-mono uppercase tracking-wider rounded-lg text-center"
                      >
                        Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3D Studio Teaser Banner */}
          <div className="mt-16 p-8 rounded-2xl bg-card border border-border flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
            <div className="space-y-2 text-left max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Packaging Workshop</span>
              </span>
              <h2 className="text-xl md:text-2xl font-bold font-sans text-foreground">
                Want to custom-build mailers, rigid boxes, or sleeves?
              </h2>
              <p className="text-xs text-foreground/60 leading-relaxed font-sans">
                Jump into our interactive 3D studio to adjust dimensions, materials, finishes, and upload your brand logo in real-time.
              </p>
            </div>

            <Link
              to="/customize"
              className="inline-flex items-center gap-2 bg-[#1c0f24] hover:bg-accent text-white hover:text-[#1d0a27] font-mono text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md flex-shrink-0"
            >
              <span>Start from a Template</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Catalogue;