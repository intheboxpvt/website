import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Leaf, Recycle, TreePine, Droplets, TrendingDown, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Sustainability = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { icon: Leaf, title: "Agri-Waste Hybrid Boards", desc: "Made from rice husk and wheat straw that would otherwise be burned, reducing air pollution in Punjab." },
    { icon: Recycle, title: "100% Recyclable", desc: "All our packaging can be recycled through standard municipal systems across India." },
    { icon: TreePine, title: "Compostable Options", desc: "Select materials break down naturally within 90 days in commercial composting facilities." },
    { icon: Droplets, title: "Water-Based Inks", desc: "Eco-friendly printing that's safe for the environment and completely non-toxic." },
  ];

  const impactStats = [
    { value: "50+", label: "Tons of Agri-Waste Diverted", icon: TrendingDown },
    { value: "100+", label: "Farmers Supported", icon: Users },
    { value: "30%", label: "Stronger Than Traditional", icon: Leaf },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <section className="pt-32 lg:pt-36 pb-20 px-6 lg:px-12 relative overflow-hidden section-royal">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 30% 40%, hsl(160 50% 35% / 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, hsl(42 70% 50% / 0.2) 0%, transparent 50%)',
            transform: `translateY(${scrollY * 0.2}px)` 
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-emerald"></div>
            <span className="font-sans text-sm tracking-widest uppercase text-emerald font-semibold">Sustainability</span>
            <div className="w-12 h-[2px] bg-emerald"></div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mt-4">
            Packaging That <span className="text-emerald">Cares</span>
          </h1>
          <p className="font-sans text-lg text-ivory/80 mt-6 max-w-2xl mx-auto">
            Our commitment to sustainable packaging without compromising on luxury, quality, or brand experience.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding section-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, index) => (
              <div 
                key={f.title} 
                className="card-royal p-8 hover-lift group border-l-4 eco-border"
              >
                <div className="w-14 h-14 eco-bg rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald/20 transition-colors">
                  <f.icon className="w-7 h-7 text-emerald" />
                </div>
                <h3 className="font-serif text-2xl text-royal-purple mb-3">{f.title}</h3>
                <p className="font-sans text-soft-purple leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section with Parallax */}
      <section className="section-padding section-royal relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(160 50% 35% / 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(42 70% 50% / 0.3) 0%, transparent 50%)',
            transform: `translateY(${scrollY * 0.1}px)` 
          }}
        ></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-sans text-sm tracking-widest uppercase text-emerald font-semibold">Our Impact</span>
          <h2 className="font-serif text-3xl md:text-4xl text-ivory mt-4 mb-6">
            Impact on Punjab Crop Burning
          </h2>
          <p className="font-sans text-lg text-ivory/80 leading-relaxed mb-12">
            By using agri-waste hybrid boards made from rice husk and wheat straw, we help farmers 
            monetize crop residue instead of burning it. This directly reduces the seasonal air 
            pollution crisis affecting millions across North India.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center bg-ivory/5 backdrop-blur-sm rounded-xl p-8 border border-ivory/10">
                <stat.icon className="w-8 h-8 text-emerald mx-auto mb-4" />
                <p className="font-serif text-4xl text-gold-metallic font-bold">{stat.value}</p>
                <p className="font-sans text-sm text-ivory/70 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifecycle Infographic */}
      <section className="section-padding section-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-sm tracking-widest uppercase text-emerald font-semibold">Full Cycle</span>
            <h2 className="font-serif text-3xl md:text-4xl text-royal-purple mt-4">Sustainable Lifecycle</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Source", desc: "Agri-waste collected from local Punjab farmers" },
              { step: "2", title: "Process", desc: "Transformed into premium hybrid boards" },
              { step: "3", title: "Create", desc: "Crafted into beautiful packaging" },
              { step: "4", title: "Return", desc: "100% recyclable or compostable end-of-life" },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-serif text-2xl font-bold text-emerald">{item.step}</span>
                  </div>
                  <h3 className="font-serif text-xl text-royal-purple mb-2">{item.title}</h3>
                  <p className="font-sans text-soft-purple text-sm">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-[2px] bg-gradient-to-r from-emerald/50 to-transparent translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-emerald/10 to-gold-metallic/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-royal-purple mb-6">
            Join the Sustainable Packaging Movement
          </h2>
          <p className="font-sans text-lg text-soft-purple mb-8">
            Make your brand part of the solution while delivering a premium unboxing experience.
          </p>
          <Link to="/contact">
            <Button variant="whatsapp" size="xl">
              Explore Sustainable Options
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Sustainability;