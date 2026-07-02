import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Factory, Heart, Leaf, Recycle, TreePine, Droplets, TrendingDown } from "lucide-react";
import SEO from "@/components/SEO";
import { AsciiArt } from "@/components/ui/ascii-art";

const About = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const teamMembers = [
    {
      name: "Liv Arpit",
      role: "Founder and CEO",
      image: "/team/LivArpit.jpeg",
      bio: "4+ years of industrial print and box fabrication engineering experience. Dedicated to zero emissions logistics."
    },
    {
      name: "Aashvi Chawla",
      role: "MD, COO",
      image: "/team/AashviChalwa.jpeg",
      bio: "Oversees all structural prototype testing and manufacturing operations at the Mohali plant."
    },
    {
      name: "Ishan Kumar",
      role: "Co founder, CMO",
      image: "/team/Ishan.jpeg",
      bio: "Leads premium design studio partnerships, sustainability initiatives, and corporate client relations."
    }
  ];

  const coreValues = [
    { icon: Award, title: "Quality First", desc: "Premium materials and meticulous craftsmanship in every piece" },
    { icon: Users, title: "Client Focus", desc: "Your success is our success. We listen, understand, and deliver" },
    { icon: Factory, title: "Innovation", desc: "Constantly evolving our techniques and sustainable practices" },
    { icon: Heart, title: "Integrity", desc: "Transparent pricing, honest timelines, and genuine partnerships" },
  ];

  const sustainabilityFeatures = [
    { icon: Leaf, title: "Agri Waste Hybrid Boards", desc: "Made from rice husk and wheat straw that would otherwise be burned, reducing air pollution in Punjab." },
    { icon: Recycle, title: "100% Recyclable", desc: "All our packaging can be recycled through standard municipal systems across India." },
    { icon: TreePine, title: "Compostable Options", desc: "Select materials break down naturally within 90 days in commercial composting facilities." },
    { icon: Droplets, title: "Water Based Inks", desc: "Eco friendly printing that is safe for the environment and completely non toxic." },
  ];

  const impactStats = [
    { value: "2,500+", label: "Tons of Agri Waste Diverted", icon: TrendingDown },
    { value: "1,200+", label: "Farmers Supported", icon: Users },
    { value: "100%", label: "Recyclable and Compostable", icon: Leaf },
  ];

  const lifecycleSteps = [
    { step: "1", title: "Source", desc: "Agri waste collected from local Punjab farmers" },
    { step: "2", title: "Process", desc: "Transformed into premium hybrid boards" },
    { step: "3", title: "Create", desc: "Crafted into beautiful packaging" },
    { step: "4", title: "Return", desc: "100% recyclable or compostable end of life" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO 
        title="Our Story, Team & Sustainability | InTheBox Packaging"
        description="Meet the team behind InTheBox and explore our commitment to sustainable packaging. From rigid luxury boxes to agri-waste hybrid boards."
        keywords="packaging team, inthebox story, packaging manufacturers india, luxury packaging team, sustainable packaging, eco friendly boxes"
      />
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-24 pb-6 px-6 lg:px-12 bg-[#1d0a27] border-b border-white/5 relative overflow-hidden text-white">
        {/* Subtle Watermark logo inside Header */}
        <div className="absolute -right-20 -top-20 w-[600px] h-[600px] pointer-events-none opacity-[0.015] z-0 select-none">
          <img 
            src="/assets/logo.png" 
            alt="" 
            className="w-full h-full object-contain filter invert brightness-0"
          />
        </div>
 
        <div className="max-w-[1400px] mx-auto relative z-10">
          <span className="inline-flex items-center gap-3 text-xs font-mono text-white/50 mb-4">
            <span className="w-12 h-px bg-white/20"></span>
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-sans font-bold tracking-tight leading-[0.9] text-white">
            Engineering Premium<br/>
            <span className="text-accent italic font-semibold">Packaging Legacies.</span>
          </h1>
          <p className="font-sans text-base text-white/50 mt-4 max-w-xl">
            From structural engineers to production specialists, we work as an extension of your brand to scale your packaging operations seamlessly.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 px-6 lg:px-12 bg-background">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-mono text-xs text-accent uppercase tracking-wider block mb-4">Who We Are</span>
            <h2 className="font-sans text-4xl font-bold text-foreground mb-8">
              Engineering Premium <span className="text-accent">Packaging Experiences</span>
            </h2>
            <div className="space-y-6 font-sans text-base text-foreground/75 leading-relaxed">
              <p>
                Founded on a legacy of manufacturing excellence, InTheBox has evolved into a premier B2B packaging partner. We combine cutting edge structural design with robust production capabilities to deliver packaging that not only protects but elevates your brand.
              </p>
              <p>
                We understand that your packaging is the physical handshake between your product and your customer. By operating our own manufacturing infrastructure in Mohali, we maintain uncompromising control over quality, timelines, and material sourcing—ensuring every unit meets exacting standards.
              </p>
              <p>
                From sustainable agri waste innovations to luxury rigid boxes, our team of structural engineers, designers, and production specialists works to deliver unboxing experiences that drive customer retention.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-none overflow-hidden border border-border shadow-2xl">
              <img 
                src="/products/about_us_packaging.png" 
                alt="InTheBox Team Studio"
                className="w-full h-full object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-card border border-accent/20 rounded-none p-6 shadow-2xl z-10">
              <p className="font-sans text-4xl font-extrabold text-accent">4+</p>
              <p className="font-mono text-xs text-foreground/50 uppercase tracking-widest mt-1">Years of Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section (Maze Timeline View) */}
      <section className="py-24 px-6 lg:px-12 bg-background border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-left mb-16">
            <span className="font-mono text-xs text-accent uppercase tracking-wider">What We Stand For</span>
            <h2 className="font-sans text-4xl font-bold text-foreground mt-4">Our Core <span className="text-accent">Values</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 border border-border bg-card divide-y md:divide-y-0 divide-border relative z-10">
            {/* Cell 1: Quality First */}
            <div className="md:col-span-3 border-r border-b border-border p-8 lg:p-12 hover:border-accent/40 transition-colors duration-300 flex flex-col justify-between group min-h-[220px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-accent uppercase tracking-wider">01 // Quality First</span>
                <Award className="w-5 h-5 text-foreground/20 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{coreValues[0].title}</h3>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">{coreValues[0].desc}</p>
              </div>
            </div>

            {/* Cell 2: Client Focus */}
            <div className="md:col-span-3 border-b border-border p-8 lg:p-12 hover:border-accent/40 transition-colors duration-300 flex flex-col justify-between group min-h-[220px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-accent uppercase tracking-wider">02 // Client Focus</span>
                <Users className="w-5 h-5 text-foreground/20 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{coreValues[1].title}</h3>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">{coreValues[1].desc}</p>
              </div>
            </div>

            {/* Cell 3: Innovation */}
            <div className="md:col-span-2 border-r border-border p-8 lg:p-12 hover:border-accent/40 transition-colors duration-300 flex flex-col justify-between group min-h-[220px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-accent uppercase tracking-wider">03 // Innovation</span>
                <Factory className="w-5 h-5 text-foreground/20 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{coreValues[2].title}</h3>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">{coreValues[2].desc}</p>
              </div>
            </div>

            {/* Cell 4: Integrity */}
            <div className="md:col-span-4 p-8 lg:p-12 hover:border-accent/40 transition-colors duration-300 flex flex-col justify-between group min-h-[220px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-accent uppercase tracking-wider">04 // Integrity</span>
                <Heart className="w-5 h-5 text-foreground/20 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{coreValues[3].title}</h3>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">{coreValues[3].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section (Merged, Maze Timeline View) */}
      <section className="py-24 px-6 lg:px-12 bg-background" id="sustainability">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-left mb-16">
            <span className="font-mono text-xs text-emerald uppercase tracking-wider">Environmental Stewardship</span>
            <h2 className="font-sans text-4xl font-bold text-foreground mt-4">Packaging That <span className="text-emerald">Cares</span></h2>
            <p className="font-sans text-base text-foreground/60 max-w-xl mt-4">
              Our commitment to sustainable packaging without compromising on luxury, structural integrity, or brand prestige.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 border border-border bg-card divide-y md:divide-y-0 divide-border mb-20 relative z-10">
            {/* Cell 1: Agri-Waste Hybrid Boards */}
            <div className="md:col-span-4 border-r border-b border-border p-8 lg:p-12 hover:border-emerald/40 transition-colors duration-300 flex flex-col justify-between group min-h-[220px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-emerald uppercase tracking-wider">01 // Eco Boards</span>
                <Leaf className="w-5 h-5 text-foreground/20 group-hover:text-emerald transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{sustainabilityFeatures[0].title}</h3>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">{sustainabilityFeatures[0].desc}</p>
              </div>
            </div>

            {/* Cell 2: 100% Recyclable */}
            <div className="md:col-span-2 border-b border-border p-8 lg:p-12 hover:border-emerald/40 transition-colors duration-300 flex flex-col justify-between group min-h-[220px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-emerald uppercase tracking-wider">02 // Recyclable</span>
                <Recycle className="w-5 h-5 text-foreground/20 group-hover:text-emerald transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{sustainabilityFeatures[1].title}</h3>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">{sustainabilityFeatures[1].desc}</p>
              </div>
            </div>

            {/* Cell 3: Compostable Options */}
            <div className="md:col-span-3 border-r border-border p-8 lg:p-12 hover:border-emerald/40 transition-colors duration-300 flex flex-col justify-between group min-h-[220px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-emerald uppercase tracking-wider">03 // Compostable</span>
                <TreePine className="w-5 h-5 text-foreground/20 group-hover:text-emerald transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{sustainabilityFeatures[2].title}</h3>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">{sustainabilityFeatures[2].desc}</p>
              </div>
            </div>

            {/* Cell 4: Water-Based Inks */}
            <div className="md:col-span-3 p-8 lg:p-12 hover:border-emerald/40 transition-colors duration-300 flex flex-col justify-between group min-h-[220px]">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-emerald uppercase tracking-wider">04 // Water Inks</span>
                <Droplets className="w-5 h-5 text-foreground/20 group-hover:text-emerald transition-colors" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">{sustainabilityFeatures[3].title}</h3>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">{sustainabilityFeatures[3].desc}</p>
              </div>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="border-t border-border pt-16 grid md:grid-cols-3 gap-8">
            {impactStats.map((stat, i) => (
              <div key={i} className="bg-card border border-border p-8 rounded-none text-center">
                <stat.icon className="w-6 h-6 text-emerald mx-auto mb-4" />
                <p className="font-sans text-4xl md:text-5xl text-foreground font-bold">{stat.value}</p>
                <p className="font-mono text-xs text-foreground/50 mt-2 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-card border border-border p-8 lg:p-12 text-center rounded-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald/[0.02] rounded-full blur-3xl"></div>
            <h3 className="font-sans text-3xl font-bold text-foreground mb-6">Impact on Punjab Crop Burning</h3>
            <p className="font-sans text-base text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              By using agri waste hybrid boards made from rice husk and wheat straw, we help local farmers monetize crop residue instead of burning it. This directly combats the seasonal air pollution crisis across North India.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 lg:px-12 bg-background border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-left mb-16">
            <span className="font-mono text-xs text-accent uppercase tracking-wider">Meet Our Team</span>
            <h2 className="font-sans text-4xl font-bold text-foreground mt-4">The People Behind <span className="text-accent">InTheBox</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="group w-full relative cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-square rounded-none overflow-hidden mb-6 border border-border">
                  {hoveredIndex === index ? (
                    <AsciiArt 
                      src={member.image} 
                      resolution={65} 
                      color="#fbbf24" 
                      className="w-full h-full bg-[#050505] p-1 flex items-center justify-center transition-all duration-300"
                    />
                  ) : (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/65 to-transparent border border-accent/20 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-1">{member.role}</p>
                    <h4 className="font-sans text-xl font-bold text-white mb-3">{member.name}</h4>
                    <p className="font-sans text-xs text-white/80 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
                <h3 className="font-sans text-xl font-bold text-foreground">{member.name}</h3>
                <p className="font-mono text-xs text-accent uppercase tracking-wider mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 bg-card border-t border-border text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
            Ready to Elevate Your <span className="text-accent">Brand?</span>
          </h2>
          <p className="font-sans text-base text-foreground/60 mb-10 max-w-xl mx-auto">
            Let us design custom, eco friendly rigid packaging tailored to your specifications.
          </p>
          <Button 
            onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
            className="group btn-premium-gold py-6 px-10 text-sm"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default About;