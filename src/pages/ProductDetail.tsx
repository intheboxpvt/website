import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ArrowRight, Sparkles, Package, Leaf } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";

export const ProductDetail = () => {
  const { preset } = useParams<{ preset: string }>();
  
  // Find current product
  const product = PRODUCTS.find((p) => p.configuratorPreset === preset) || PRODUCTS[0];

  // Get related products (excluding current product)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

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
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover select-none pointer-events-none opacity-90"
              decoding="async"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes("landing-page.jpg")) {
                  target.src = "/products/landing-page.jpg";
                }
              }}
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            <span className="absolute bottom-6 left-6 font-mono text-[10px] uppercase text-accent tracking-widest bg-card border border-accent/20 px-3 py-1 rounded">
              {product.category}
            </span>
          </div>

          {/* Description & Specs */}
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

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
              <Button asChild className="bg-accent hover:bg-accent/90 text-primary-foreground font-medium px-6 py-3 rounded-lg shadow-md transition-all flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
                <Link to={`/customize?preset=${preset}&source=catalogue&name=${encodeURIComponent(product.name)}`}>
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                  Customize in 3D Studio
                </Link>
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                className="border-border hover:bg-accent/10 text-foreground font-medium px-6 py-3 rounded-lg text-xs font-mono uppercase tracking-wider"
              >
                Request Custom Quote
              </Button>
            </div>
          </div>
        </div>

        {/* Explore Other Products Section */}
        <div className="space-y-8 text-left border-t border-border pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold">Catalogue Selection</span>
              <h3 className="text-2xl md:text-3xl font-bold font-sans tracking-tight text-foreground mt-1">
                Explore Other <span className="text-accent italic font-semibold">Packaging Solutions</span>
              </h3>
            </div>
            <Link 
              to="/catalogue" 
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent hover:text-foreground transition-colors font-bold"
            >
              View Full Catalogue
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
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
                      <h4 className="font-sans text-base font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                        {p.name}
                      </h4>
                    </Link>
                    <p className="font-sans text-xs text-foreground/60 line-clamp-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-foreground/50">
                      MOQ: <strong className="text-foreground">{p.moq}</strong> units
                    </span>
                    <Link
                      to={`/product/${p.configuratorPreset}`}
                      className="text-xs font-mono uppercase tracking-wider text-accent hover:text-foreground transition-colors flex items-center gap-1.5 font-bold"
                    >
                      View Details
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
};

export default ProductDetail;
