import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import FoldedCard3D from "@/components/FoldedCard3D";
import SEO from "@/components/SEO";

const Catalogue = () => {
  const [filter, setFilter] = useState("all");
  const [frontText, setFrontText] = useState("Your Brand Here");
  const [insideText, setInsideText] = useState("Tell your brand story and thank your customers in style. This interior space is yours to design.");
  
  const categories = ["all", "rigid", "kraft", "luxury", "sustainable", "stationery"];
  
  const products = [
    { name: "Premium Thank You Card", category: "stationery", moq: "100-500", desc: "Folded luxury cards with gold foil stamping." },
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
    <main className="min-h-screen">
      <SEO 
        title="Product Catalogue | Custom Boxes & Packaging Solutions"
        description="Browse our extensive catalogue of custom packaging solutions. From rigid luxury boxes to eco-friendly kraft mailers, find the perfect fit for your brand."
        keywords="packaging catalogue, custom boxes, rigid boxes, kraft mailers, eco-friendly packaging, wholesale packaging"
      />
      <Navbar />
      <section className="pt-32 pb-20 px-6 lg:px-12 bg-gradient-to-b from-light-purple/20 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-display text-sm tracking-widest uppercase text-accent font-medium">Catalogue</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mt-4">Explore Our Collection</h1>
          <p className="font-display text-lg text-muted-foreground mt-6 max-w-2xl mx-auto font-normal">Browse our range of premium packaging solutions.</p>
          <a href="/inthebox_catalogue.pdf" download="InTheBox_Catalogue.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="gold" size="lg" className="mt-8"><Download className="w-4 h-4 mr-2" />Download Full PDF Catalogue</Button>
          </a>
        </div>
      </section>

      {/* Featured 3D Section */}
      <section className="py-12 px-6 lg:px-12 bg-white/50 backdrop-blur-sm border-y border-royal-purple/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 flex flex-col items-center py-10">
              <FoldedCard3D 
                frontImage="/products/premium_thank_you_card.png" 
                insideImage="/products/thank_you_card_texture.png"
                frontText={frontText}
                insideText={insideText}
                className="w-[320px] h-[220px] md:w-[400px] md:h-[280px]"
              />
              <div className="mt-8 p-4 bg-gold-metallic/5 rounded-lg border border-gold-metallic/10 max-w-sm text-center">
                <p className="text-xs font-sans text-soft-purple italic">
                  "Replication precision: This interactive mode simulates a real 300GSM bi-fold card with gold foil stamping."
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 rounded-full bg-gold-metallic/10 border border-gold-metallic/20">
                  <span className="text-[10px] font-sans font-bold text-gold-metallic uppercase tracking-wider">Functional Preview</span>
                </div>
                <span className="text-xs font-sans text-soft-purple font-medium uppercase tracking-widest">3D Customizer</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-royal-purple mb-6">Experience Interactive Replication</h2>
              
              <div className="space-y-6 bg-ivory/50 p-6 rounded-2xl border border-royal-purple/5 shadow-sm">
                <div>
                  <label className="block text-xs font-sans font-bold text-royal-purple uppercase tracking-widest mb-2">Front Branding (Gold Foil)</label>
                  <input 
                    type="text" 
                    value={frontText} 
                    onChange={(e) => setFrontText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-royal-purple/10 bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-metallic/50"
                    placeholder="Enter brand name..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-bold text-royal-purple uppercase tracking-widest mb-2">Interior Message</label>
                  <textarea 
                    value={insideText} 
                    onChange={(e) => setInsideText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-royal-purple/10 bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-metallic/50 h-32 resize-none"
                    placeholder="Type your brand story..."
                  />
                </div>
                <Link to="/studio">
                  <Button variant="gold" size="lg" className="w-full">Explore 3D Customizer</Button>
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-[10px] font-sans font-bold text-gold-metallic uppercase">Paper</p>
                  <p className="text-xs text-soft-purple">300GSM Matte</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-sans font-bold text-gold-metallic uppercase">Finish</p>
                  <p className="text-xs text-soft-purple">Gold Foil</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-sans font-bold text-gold-metallic uppercase">MOQ</p>
                  <p className="text-xs text-soft-purple">100 Units</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-full font-display text-sm font-medium transition-all ${filter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <div key={p.name} className="card-elevated overflow-hidden hover-lift group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={`/products/${p.name.toLowerCase().replace(/ /g, "_")}.png`} 
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="font-display text-xs uppercase tracking-wide text-accent font-medium">{p.category}</span>
                  <h3 className="font-display text-xl font-semibold text-primary mt-1">{p.name}</h3>
                  <p className="font-display text-sm text-muted-foreground mt-2 font-normal">{p.desc}</p>
                  <p className="font-display text-sm text-foreground mt-3 font-normal">MOQ: <span className="font-medium">{p.moq}</span></p>
                  <Button variant="hero-outline" size="sm" className="mt-4 w-full">Request Sample</Button>
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