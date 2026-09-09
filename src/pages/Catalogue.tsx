import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Download, ArrowRight, Maximize2 } from "lucide-react";
import { Link } from "react-router-dom";
import FoldedCard3D from "@/components/FoldedCard3D";
import SEO from "@/components/SEO";

const Catalogue = () => {
  const [filter, setFilter] = useState("all");
  const [frontText, setFrontText] = useState("Your Brand Here");
  const [insideText, setInsideText] = useState("Tell your brand story and thank your customers in style. This interior space is yours to design.");
  
  const categories = ["all", "rigid", "kraft", "luxury", "sustainable", "stationery"];
  
  const products: Array<{
    name: string;
    category: string;
    moq: string;
    desc: string;
    configuratorPreset: string;
  }> = [
    { name: "Premium Thank You Card", category: "stationery", moq: "100-500", desc: "Folded luxury cards with foil stamping.", configuratorPreset: "straight_tuck" }, // Closest folding net style
    { name: "Classic Rigid Box", category: "rigid", moq: "100-500", desc: "Premium rigid boxes with magnetic closure.", configuratorPreset: "rigid_lid_base" },
    { name: "Kraft Mailer", category: "kraft", moq: "250-1000", desc: "Eco-friendly kraft mailers for shipping.", configuratorPreset: "mailer" },
    { name: "Luxury Gift Box", category: "luxury", moq: "50-200", desc: "High-end gift boxes with ribbon closure.", configuratorPreset: "gift" },
    { name: "Eco Board Box", category: "sustainable", moq: "200-800", desc: "Agri-waste hybrid board packaging.", configuratorPreset: "reverse_tuck" },
    { name: "Drawer Box", category: "rigid", moq: "100-400", desc: "Sliding drawer style rigid boxes.", configuratorPreset: "drawer" },
    { name: "Kraft Paper Bag", category: "kraft", moq: "500-2000", desc: "Custom printed kraft bags.", configuratorPreset: "straight_tuck" }, // Closest outline silhouette
    { name: "Corrugated Shipper", category: "kraft", moq: "500-2000", desc: "Durable custom shipping boxes.", configuratorPreset: "mailer" },
    { name: "Cosmetic Glass Jar Box", category: "luxury", moq: "100-500", desc: "Premium retail boxes for cosmetics.", configuratorPreset: "perfume" },
    { name: "Apparel Sleeve", category: "sustainable", moq: "200-1000", desc: "Eco-friendly sleeves for clothing packaging.", configuratorPreset: "sleeve" },
  ];

  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO 
        title="Product Catalogue | Custom Boxes & Packaging Solutions"
        description="Browse our extensive catalogue of custom packaging solutions. From rigid luxury boxes to eco-friendly kraft mailers, find the perfect fit for your brand."
        keywords="packaging catalogue, custom boxes, rigid boxes, kraft mailers, eco-friendly packaging, wholesale packaging"
      />
      <Navbar />
 
      {/* Page Header — uses royal-purple gradient consistent with all other pages */}
      <section className="pt-24 pb-6 px-6 lg:px-12 section-royal border-b border-white/5 relative overflow-hidden">
        {/* Subtle Watermark logo inside Header */}
        <div className="absolute -right-20 -top-20 w-[600px] h-[600px] pointer-events-none opacity-[0.015] z-0 select-none">
          <img 
            src="/assets/logo.png" 
            alt="" 
            className="w-full h-full object-contain filter invert brightness-0"
          />
        </div>
 
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-3 text-xs font-mono text-white/50 mb-3">
                <span className="w-12 h-px bg-white/20"></span>
                Catalogue
              </span>
              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="text-3xl md:text-4xl lg:text-[4.5rem] font-sans font-bold tracking-tight leading-none text-white">
                  Explore Our <span className="text-accent italic font-semibold">Collection.</span>
                </h1>
                
                {/* Collapsible hover download button */}
                <a 
                  href="/inthebox_catalogue.pdf" 
                  download="InTheBox_Catalogue.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-500 rounded-full p-3 group overflow-hidden max-w-[46px] hover:max-w-[240px] h-[46px] relative shadow-lg"
                >
                  <Download className="w-5 h-5 flex-shrink-0" />
                  <span className="font-mono text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-1">
                    Download PDF Catalogue
                  </span>
                </a>
              </div>
              <p className="font-sans text-sm text-white/50 mt-4 max-w-xl">
                Browse our structural archive of rigid luxury boxes, eco-board containers, and corporate stationery.
              </p>
            </div>
          </div>
        </div>
      </section>
 
      {/* 3D Virtual Customizer Section */}
      <section className="py-16 px-6 lg:px-12 bg-background border-b border-border relative">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-12">
            <h2 className="font-sans text-3xl font-bold text-foreground leading-tight">3D Virtual <span className="text-accent">Customizer</span></h2>
            <p className="font-sans text-xs text-foreground/60 mt-2">
              Customize your brand name and interior message to preview your bespoke packaging structure in real-time.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left Column: 3D Visualizer Canvas - redesigned to be inviting with golden hover glow */}
            <div className="flex flex-col items-center justify-center bg-card border-2 border-border hover:border-accent p-8 h-[480px] relative group/viewer shadow-md hover:shadow-gold transition-all duration-500 rounded-lg">
              
              {/* Expand Button Overlay - Prominent and Golden */}
              <Link 
                to="/customize?preset=straight_tuck&source=catalogue"
                className="absolute top-4 right-4 z-30 px-4 py-2 bg-accent hover:bg-[#1c0f24] text-white hover:text-white border border-accent hover:border-accent transition-all duration-300 rounded-lg shadow-md flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider font-bold animate-pulse-soft"
                aria-label="Expand to full 3D customizer workspace"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Expand to 3D Studio</span>
              </Link>

              {/* Verified Workspace Tag */}
              <div className="absolute top-4 left-4 z-20 bg-background/90 backdrop-blur-sm px-3 py-1.5 border border-border rounded-lg shadow-sm flex items-center gap-1.5 select-none pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald animate-ping"></span>
                <span className="font-mono text-[9px] text-foreground font-bold uppercase tracking-wider">Interactive 3D</span>
              </div>

              <FoldedCard3D 
                frontImage="/products/premium_thank_you_card.png" 
                insideImage="/products/thank_you_card_texture.png"
                frontText={frontText}
                insideText={insideText}
                className="w-[240px] h-[165px] md:w-[320px] md:h-[220px]"
              />
              <div className="mt-6 p-2 bg-accent/5 border border-accent/20 w-full text-center">
                <p className="text-[10px] font-mono text-accent leading-relaxed animate-pulse">
                  // Drag to rotate in 3D. Click to open and read inside card.
                </p>
              </div>
            </div>
 
            {/* Right Column: Customizer Controls - Redesigned with Invite Block */}
            <div className="space-y-6 bg-card p-8 border border-border flex flex-col justify-between h-[480px] rounded-lg shadow-sm">
              <div className="space-y-4">
                {/* Expanding Invitation Callout */}
                <div className="p-3.5 bg-accent/5 border border-accent/20 rounded-lg text-left">
                  <p className="font-sans text-[11px] text-[#1c0f24] leading-relaxed">
                    <strong className="font-semibold text-accent uppercase font-mono tracking-wider text-[10px] block mb-1">💡 Prototyping Workshop</strong>
                    Want to custom-build mailers, rigid lids, or sleeves? Click <strong className="font-bold">"Expand to 3D Studio"</strong> on the viewer to open the full scale 3D workspace.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-foreground/60 uppercase tracking-wider mb-2">Front Foil Branding Text</label>
                  <input 
                    type="text" 
                    value={frontText} 
                    onChange={(e) => setFrontText(e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-background/50 font-sans text-sm text-foreground focus:outline-none focus:border-accent transition-colors rounded-lg"
                    placeholder="Enter brand name..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-foreground/60 uppercase tracking-wider mb-2">Interior Message Body</label>
                  <textarea 
                    value={insideText} 
                    onChange={(e) => setInsideText(e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-background/50 font-sans text-sm text-foreground focus:outline-none focus:border-accent transition-colors h-16 resize-none rounded-lg"
                    placeholder="Type interior content..."
                  />
                </div>
              </div>
 
              <div className="border-t border-border pt-4 space-y-4">
                <div className="grid grid-cols-3 gap-4 text-left">
                  <div>
                    <p className="text-[9px] font-mono text-foreground/50 uppercase tracking-widest">Base Board</p>
                    <p className="text-xs font-sans text-foreground/90 font-semibold mt-1">300GSM Premium</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-foreground/50 uppercase tracking-widest">Imprint</p>
                    <p className="text-xs font-sans text-foreground/90 font-semibold mt-1">Stamping Finish</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-foreground/50 uppercase tracking-widest">Start MOQ</p>
                    <p className="text-xs font-sans text-foreground/90 font-semibold mt-1">100 Units</p>
                  </div>
                </div>
 
                <Button 
                  onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                  className="w-full btn-premium-gold py-5"
                >
                  Request Mockup Quote
                </Button>
              </div>
            </div>
 
          </div>
        </div>
      </section>
 
      {/* Catalog Grid Section */}
      <section className="py-24 px-6 lg:px-12 bg-background">
        <div className="max-w-[1400px] mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-16">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)} 
                className={`px-6 py-2 border-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-sm ${
                  filter === cat 
                    ? "bg-[#1c0f24] border-[#1c0f24] text-white font-semibold" 
                    : "bg-card border-border text-foreground/60 hover:text-accent hover:border-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
 
          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <div 
                key={p.name} 
                className="bg-card border border-border rounded-none overflow-hidden hover:border-accent group transition-all duration-500 flex flex-col justify-between"
              >
                <div className="aspect-[4/3] overflow-hidden bg-white/5 relative">
                  <Link to={`/product/${p.configuratorPreset}`}>
                    <img 
                      src={`/products/${p.name.toLowerCase().replace(/ /g, "_")}.png`} 
                      alt={p.name}
                      className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-102"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase text-accent tracking-widest bg-background/95 border border-accent/20 px-3 py-1">
                    {p.category}
                  </span>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <Link to={`/product/${(p as any).configuratorPreset}`} className="hover:text-accent transition-colors">
                      <h3 className="font-sans text-xl font-bold text-foreground">{p.name}</h3>
                    </Link>
                    <p className="font-sans text-sm text-foreground/60 mt-3 leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border flex flex-col gap-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-foreground/50 uppercase">Minimum Order</span>
                      <span className="text-foreground font-medium">{p.moq} pcs</span>
                    </div>
                    <Button 
                      onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                      className="w-full btn-premium-gold py-4 text-xs"
                    >
                      Request Prototype Sample
                    </Button>
                    <Link
                      to={`/customize?preset=${p.configuratorPreset}&source=catalogue&name=${encodeURIComponent(p.name)}`}
                      aria-label={`Customize ${p.name} in 3D configurator`}
                      className="w-full text-center py-2 text-xs font-mono tracking-wider text-foreground/40 hover:text-accent transition-all duration-300 hover:underline inline-block"
                    >
                      Customize in 3D →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Catalogue;