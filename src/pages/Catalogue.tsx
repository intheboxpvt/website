import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FoldedCard3D from "@/components/FoldedCard3D";
import SEO from "@/components/SEO";

const Catalogue = () => {
  const [filter, setFilter] = useState("all");
  const [frontText, setFrontText] = useState("Your Brand Here");
  const [insideText, setInsideText] = useState("Tell your brand story and thank your customers in style. This interior space is yours to design.");
  
  const categories = ["all", "rigid", "kraft", "luxury", "sustainable", "stationery"];
  
  const products = [
    { name: "Premium Thank You Card", category: "stationery", moq: "100-500", desc: "Folded luxury cards with foil stamping." },
    { name: "Classic Rigid Box", category: "rigid", moq: "100-500", desc: "Premium rigid boxes with magnetic closure." },
    { name: "Kraft Mailer", category: "kraft", moq: "250-1000", desc: "Eco-friendly kraft mailers for shipping." },
    { name: "Luxury Gift Box", category: "luxury", moq: "50-200", desc: "High-end gift boxes with ribbon closure." },
    { name: "Eco Board Box", category: "sustainable", moq: "200-800", desc: "Agri-waste hybrid board packaging." },
    { name: "Drawer Box", category: "rigid", moq: "100-400", desc: "Sliding drawer style rigid boxes." },
    { name: "Kraft Paper Bag", category: "kraft", moq: "500-2000", desc: "Custom printed kraft bags." },
    { name: "Corrugated Shipper", category: "kraft", moq: "500-2000", desc: "Durable custom shipping boxes." },
    { name: "Cosmetic Glass Jar Box", category: "luxury", moq: "100-500", desc: "Premium retail boxes for cosmetics." },
    { name: "Apparel Sleeve", category: "sustainable", moq: "200-1000", desc: "Eco-friendly sleeves for clothing packaging." },
  ];

  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SEO 
        title="Product Catalogue | Custom Boxes & Packaging Solutions"
        description="Browse our extensive catalogue of custom packaging solutions. From rigid luxury boxes to eco-friendly kraft mailers, find the perfect fit for your brand."
        keywords="packaging catalogue, custom boxes, rigid boxes, kraft mailers, eco-friendly packaging, wholesale packaging"
      />
      <Navbar />

      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 lg:px-12 bg-black border-b border-white/5 relative overflow-hidden">
        {/* Subtle Watermark logo inside Header */}
        <div className="absolute -right-20 -top-20 w-[600px] h-[600px] pointer-events-none opacity-[0.015] z-0 select-none">
          <img 
            src="/assets/logo.png" 
            alt="" 
            className="w-full h-full object-contain filter invert brightness-0"
          />
        </div>

        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-mono text-white/50 mb-6">
              <span className="w-12 h-px bg-white/20"></span>
              Catalogue
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif tracking-tight leading-[0.9] text-white">
              Explore Our<br/>
              <span className="text-white/30 italic">Collection.</span>
            </h1>
            <p className="font-sans text-lg text-white/50 mt-8 max-w-xl">
              Browse our structural archive of rigid luxury boxes, eco-board containers, and corporate stationery.
            </p>
          </div>
          <a href="/inthebox_catalogue.pdf" download="InTheBox_Catalogue.pdf" target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full bg-white hover:bg-white/90 text-black font-sans text-sm font-semibold py-6 px-8 transition-all duration-300">
              <Download className="w-4 h-4 mr-2" />Download PDF Catalogue
            </Button>
          </a>
        </div>
      </section>

      {/* Featured 3D Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#050505] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 flex flex-col items-center py-10">
              <FoldedCard3D 
                frontImage="/products/premium_thank_you_card.png" 
                insideImage="/products/thank_you_card_texture.png"
                frontText={frontText}
                insideText={insideText}
                className="w-[320px] h-[220px] md:w-[400px] md:h-[280px]"
              />
              <div className="mt-8 p-4 bg-[#38BDF8]/5 rounded-none border border-[#38BDF8]/20 max-w-sm text-center">
                <p className="text-xs font-mono text-[#38BDF8] leading-relaxed">
                  // Interactive 3D structural mapping. Drag to rotate card.
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider block mb-2">Functional Prototyping</span>
                <h2 className="font-serif text-4xl font-light text-white leading-tight">3D Virtual Customizer</h2>
                <p className="font-sans text-sm text-white/60 mt-4 leading-relaxed">
                  Real-time bi-fold replication simulating 300GSM matte board thickness, foil stamping reflection, and interior canvas branding fields.
                </p>
              </div>
              
              <div className="space-y-6 bg-black p-8 border border-white/10 rounded-none shadow-2xl">
                <div>
                  <label className="block text-xs font-mono text-white/45 uppercase tracking-wider mb-2">Front Foil Branding Text</label>
                  <input 
                    type="text" 
                    value={frontText} 
                    onChange={(e) => setFrontText(e.target.value)}
                    className="w-full px-4 py-3 rounded-none border border-white/10 bg-white/5 font-sans text-sm text-white focus:outline-none focus:border-[#38BDF8] transition-colors"
                    placeholder="Enter brand name..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/45 uppercase tracking-wider mb-2">Interior Message Body</label>
                  <textarea 
                    value={insideText} 
                    onChange={(e) => setInsideText(e.target.value)}
                    className="w-full px-4 py-3 rounded-none border border-white/10 bg-white/5 font-sans text-sm text-white focus:outline-none focus:border-[#38BDF8] transition-colors h-32 resize-none"
                    placeholder="Type interior content..."
                  />
                </div>
                <Link to="/studio">
                  <Button className="w-full rounded-full bg-white hover:bg-white/90 text-black font-sans text-sm font-semibold py-6 transition-all duration-300">
                    Explore Studio Creator <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
                <div>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Base Board</p>
                  <p className="text-sm font-sans text-white/80 mt-1 font-semibold">300GSM Premium</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Imprint</p>
                  <p className="text-sm font-sans text-white/80 mt-1 font-semibold">Stamping Finish</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Start MOQ</p>
                  <p className="text-sm font-sans text-white/80 mt-1 font-semibold">100 Units</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-16">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)} 
                className={`px-6 py-2 border rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  filter === cat 
                    ? "bg-[#38BDF8] border-[#38BDF8] text-black font-semibold" 
                    : "bg-black border-white/10 text-white/60 hover:text-white hover:border-white/30"
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
                className="bg-black border border-white/10 rounded-none overflow-hidden hover:border-white/30 group transition-all duration-500 flex flex-col justify-between"
              >
                <div className="aspect-[4/3] overflow-hidden bg-white/5 relative">
                  <img 
                    src={`/products/${p.name.toLowerCase().replace(/ /g, "_")}.png`} 
                    alt={p.name}
                    className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"></div>
                  <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase text-[#38BDF8] tracking-widest bg-[#050505]/95 border border-[#38BDF8]/20 px-3 py-1">
                    {p.category}
                  </span>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-serif text-2xl font-light text-white">{p.name}</h3>
                    <p className="font-sans text-sm text-white/50 mt-3 leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-white/5 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-white/40 uppercase">Minimum Order</span>
                      <span className="text-white font-medium">{p.moq} pcs</span>
                    </div>
                    <Button 
                      onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                      className="w-full rounded-full bg-white hover:bg-white/90 text-black font-sans text-xs font-semibold py-5 transition-all duration-300"
                    >
                      Request Prototype Sample
                    </Button>
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