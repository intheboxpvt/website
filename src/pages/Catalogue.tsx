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

      {/* Catalogue Customizer Section */}
      <section className="pt-28 pb-16 px-6 lg:px-12 bg-black border-b border-white/5 relative overflow-hidden">
        {/* Subtle Watermark logo */}
        <div className="absolute -right-20 -top-20 w-[600px] h-[600px] pointer-events-none opacity-[0.015] z-0 select-none">
          <img 
            src="/assets/logo.png" 
            alt="" 
            className="w-full h-full object-contain filter invert brightness-0"
          />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Title, description, download buttons & mini specs */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div>
                <span className="inline-flex items-center gap-3 text-xs font-mono text-white/50 mb-3">
                  <span className="w-12 h-px bg-white/20"></span>
                  Catalogue
                </span>
                <h1 className="text-4xl md:text-5xl font-serif tracking-tight leading-[1.1] text-white">
                  Explore Our<br/>
                  <span className="text-white/30 italic">Collection.</span>
                </h1>
                <p className="font-sans text-xs text-white/50 mt-3 leading-relaxed">
                  Browse our structural archive of rigid luxury boxes, eco-board containers, and corporate stationery.
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="font-mono text-[10px] text-[#38BDF8] uppercase tracking-wider block mb-1">Functional Prototyping</span>
                <h2 className="font-serif text-xl font-light text-white leading-tight">3D Virtual Customizer</h2>
                <p className="font-sans text-[11px] text-white/60 mt-2 leading-relaxed">
                  Real-time bi-fold replication simulating 300GSM matte board thickness, foil stamping reflection, and interior canvas branding fields.
                </p>
              </div>

              <a href="/inthebox_catalogue.pdf" download="InTheBox_Catalogue.pdf" target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full rounded-full bg-white hover:bg-white/90 text-black font-sans text-xs font-semibold py-4 transition-all duration-300">
                  <Download className="w-4 h-4 mr-2" />Download PDF Catalogue
                </Button>
              </a>
            </div>

            {/* Center Column: 3D Visualizer Canvas */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center bg-[#050505] border border-white/10 p-6 relative">
              <FoldedCard3D 
                frontImage="/products/premium_thank_you_card.png" 
                insideImage="/products/thank_you_card_texture.png"
                frontText={frontText}
                insideText={insideText}
                className="w-[240px] h-[165px] md:w-[280px] md:h-[190px]"
              />
              <div className="mt-4 p-2 bg-[#38BDF8]/5 border border-[#38BDF8]/20 w-full text-center">
                <p className="text-[9px] font-mono text-[#38BDF8] leading-relaxed">
                  // Interactive 3D structural mapping. Drag to rotate card.
                </p>
              </div>
            </div>

            {/* Right Column: Customizer Controls & Modal Triggers */}
            <div className="lg:col-span-4 space-y-4 bg-black p-6 border border-white/10 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-white/45 uppercase tracking-wider mb-1">Front Foil Branding Text</label>
                  <input 
                    type="text" 
                    value={frontText} 
                    onChange={(e) => setFrontText(e.target.value)}
                    className="w-full px-3 py-2 border border-white/10 bg-white/5 font-sans text-xs text-white focus:outline-none focus:border-[#38BDF8] transition-colors"
                    placeholder="Enter brand name..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-white/45 uppercase tracking-wider mb-1">Interior Message Body</label>
                  <textarea 
                    value={insideText} 
                    onChange={(e) => setInsideText(e.target.value)}
                    className="w-full px-3 py-2 border border-white/10 bg-white/5 font-sans text-xs text-white focus:outline-none focus:border-[#38BDF8] transition-colors h-16 resize-none"
                    placeholder="Type interior content..."
                  />
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="grid grid-cols-3 gap-2 text-left">
                  <div>
                    <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Base Board</p>
                    <p className="text-[10px] font-sans text-white/80 font-semibold">300GSM Premium</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Imprint</p>
                    <p className="text-[10px] font-sans text-white/80 font-semibold">Stamping Finish</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Start MOQ</p>
                    <p className="text-[10px] font-sans text-white/80 font-semibold">100 Units</p>
                  </div>
                </div>

                <Button 
                  onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                  className="w-full rounded-full bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-black font-sans text-xs font-semibold py-4 transition-all duration-300"
                >
                  Request Mockup Quote
                </Button>
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