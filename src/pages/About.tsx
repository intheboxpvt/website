import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Factory, Heart, Leaf, Recycle, TreePine, Droplets, TrendingDown } from "lucide-react";
import SEO from "@/components/SEO";

const About = () => {
  const teamMembers = [
    {
      name: "Liv Arpit",
      role: "Founder & CEO",
      image: "/team/LivArpit.jpeg",
      bio: "14+ years of industrial print and box fabrication engineering experience. Dedicated to zero-emissions logistics."
    },
    {
      name: "Aashvi Chawla",
      role: "MD, COO",
      image: "/team/AashviChalwa.jpeg",
      bio: "Oversees all structural prototype testing and manufacturing operations at the Mohali plant."
    },
    {
      name: "Ishan Kumar",
      role: "Co-founder, CMO",
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
    { icon: Leaf, title: "Agri-Waste Hybrid Boards", desc: "Made from rice husk and wheat straw that would otherwise be burned, reducing air pollution in Punjab." },
    { icon: Recycle, title: "100% Recyclable", desc: "All our packaging can be recycled through standard municipal systems across India." },
    { icon: TreePine, title: "Compostable Options", desc: "Select materials break down naturally within 90 days in commercial composting facilities." },
    { icon: Droplets, title: "Water-Based Inks", desc: "Eco-friendly printing that's safe for the environment and completely non-toxic." },
  ];

  const impactStats = [
    { value: "2,500+", label: "Tons of Agri-Waste Diverted", icon: TrendingDown },
    { value: "1,200+", label: "Farmers Supported", icon: Users },
    { value: "100%", label: "Recyclable & Compostable", icon: Leaf },
  ];

  const lifecycleSteps = [
    { step: "1", title: "Source", desc: "Agri-waste collected from local Punjab farmers" },
    { step: "2", title: "Process", desc: "Transformed into premium hybrid boards" },
    { step: "3", title: "Create", desc: "Crafted into beautiful packaging" },
    { step: "4", title: "Return", desc: "100% recyclable or compostable end-of-life" },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SEO 
        title="Our Story, Team & Sustainability | InTheBox Packaging"
        description="Meet the team behind InTheBox and explore our commitment to sustainable packaging. From rigid luxury boxes to agri-waste hybrid boards."
        keywords="packaging team, inthebox story, packaging manufacturers india, luxury packaging team, sustainable packaging, eco-friendly boxes"
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

        <div className="max-w-[1400px] mx-auto relative z-10">
          <span className="inline-flex items-center gap-3 text-xs font-mono text-white/50 mb-6">
            <span className="w-12 h-px bg-white/20"></span>
            Our Story
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif tracking-tight leading-[0.9] text-white">
            Engineering Premium<br/>
            <span className="text-white/30 italic">Packaging Legacies.</span>
          </h1>
          <p className="font-sans text-lg text-white/50 mt-8 max-w-xl">
            From structural engineers to production specialists, we work as an extension of your brand to scale your packaging operations seamlessly.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 px-6 lg:px-12 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider block mb-4">Who We Are</span>
            <h2 className="font-serif text-4xl font-light text-white mb-8">
              Engineering Premium Packaging Experiences
            </h2>
            <div className="space-y-6 font-sans text-base text-white/60 leading-relaxed">
              <p>
                Founded on a legacy of manufacturing excellence, InTheBox has evolved into a premier B2B packaging partner. We combine cutting-edge structural design with robust production capabilities to deliver packaging that not only protects but elevates your brand.
              </p>
              <p>
                We understand that your packaging is the physical handshake between your product and your customer. By operating our own manufacturing infrastructure in Mohali, we maintain uncompromising control over quality, timelines, and material sourcing—ensuring every unit meets exacting standards.
              </p>
              <p>
                From sustainable agri-waste innovations to luxury rigid boxes, our team of structural engineers, designers, and production specialists works to deliver unboxing experiences that drive customer retention.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-none overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="/about/who_we_are.png" 
                alt="InTheBox Team Studio"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-black border border-[#38BDF8]/20 rounded-none p-6 shadow-2xl z-10">
              <p className="font-serif text-4xl font-bold text-[#38BDF8]">4+</p>
              <p className="font-mono text-xs text-white/50 uppercase tracking-widest mt-1">Years of Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section (Maze Timeline View) */}
      <section className="py-24 px-6 lg:px-12 bg-black border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-left mb-16">
            <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider">What We Stand For</span>
            <h2 className="font-serif text-4xl font-light text-white mt-4">Our Core Values</h2>
          </div>
          
          <div className="relative border-l border-white/10 pl-8 space-y-16 py-8">
            {coreValues.map((value, index) => (
              <div key={index} className="relative group">
                {/* Horizontal connector line */}
                <div className="absolute -left-8 top-5 w-8 h-px bg-white/20 group-hover:bg-[#38BDF8] transition-colors duration-500"></div>
                {/* Vertical grid timeline node */}
                <div className="absolute -left-[39px] top-3.5 w-3.5 h-3.5 bg-black border border-white/40 rounded-full group-hover:border-[#38BDF8] group-hover:bg-[#38BDF8] transition-colors duration-500 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-black"></div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 items-start">
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="w-10 h-10 bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8]">
                      <value.icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs text-[#38BDF8] tracking-widest uppercase">0{index + 1} / {value.title}</span>
                  </div>
                  <div className="max-w-3xl">
                    <p className="font-sans text-sm text-white/55 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section (Merged, Maze Timeline View) */}
      <section className="py-24 px-6 lg:px-12 bg-[#050505]" id="sustainability">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-left mb-16">
            <span className="font-mono text-xs text-emerald uppercase tracking-wider">Environmental Stewardship</span>
            <h2 className="font-serif text-4xl font-light text-white mt-4">Packaging That Cares</h2>
            <p className="font-sans text-base text-white/50 max-w-xl mt-4">
              Our commitment to sustainable packaging without compromising on luxury, structural integrity, or brand prestige.
            </p>
          </div>
          
          <div className="relative border-l border-white/10 pl-8 space-y-16 py-8 mb-20">
            {sustainabilityFeatures.map((f, index) => (
              <div key={index} className="relative group">
                {/* Horizontal connector line */}
                <div className="absolute -left-8 top-5 w-8 h-px bg-white/20 group-hover:bg-emerald transition-colors duration-500"></div>
                {/* Vertical grid timeline node */}
                <div className="absolute -left-[39px] top-3.5 w-3.5 h-3.5 bg-black border border-white/40 rounded-full group-hover:border-emerald group-hover:bg-emerald transition-colors duration-500 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-black"></div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 items-start">
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="w-10 h-10 bg-emerald/10 border border-emerald/20 flex items-center justify-center text-emerald">
                      <f.icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs text-emerald tracking-widest uppercase">0{index + 1} / {f.title}</span>
                  </div>
                  <div className="max-w-3xl">
                    <p className="font-sans text-sm text-white/55 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Impact Stats */}
          <div className="border-t border-white/10 pt-16 grid md:grid-cols-3 gap-8">
            {impactStats.map((stat, i) => (
              <div key={i} className="bg-black border border-white/10 p-8 rounded-none text-center">
                <stat.icon className="w-6 h-6 text-emerald mx-auto mb-4" />
                <p className="font-serif text-4xl md:text-5xl text-white font-light">{stat.value}</p>
                <p className="font-mono text-xs text-white/40 mt-2 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-black border border-white/10 p-8 lg:p-12 text-center rounded-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald/[0.02] rounded-full blur-3xl"></div>
            <h3 className="font-serif text-3xl font-light text-white mb-6">Impact on Punjab Crop Burning</h3>
            <p className="font-sans text-base text-white/60 max-w-3xl mx-auto leading-relaxed">
              By using agri-waste hybrid boards made from rice husk and wheat straw, we help local farmers monetize crop residue instead of burning it. This directly combats the seasonal air pollution crisis across North India.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 lg:px-12 bg-black border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-left mb-16">
            <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider">Meet Our Team</span>
            <h2 className="font-serif text-4xl font-light text-white mt-4">The People Behind InTheBox</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group w-full relative">
                <div className="relative aspect-square rounded-none overflow-hidden mb-6 border border-white/10">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[#050505]/95 border border-[#38BDF8]/20 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="font-mono text-[10px] text-[#38BDF8] uppercase tracking-widest mb-1">{member.role}</p>
                    <h4 className="font-serif text-2xl text-white mb-3">{member.name}</h4>
                    <p className="font-sans text-xs text-white/70 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-light text-white">{member.name}</h3>
                <p className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#050505] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
            Ready to Elevate Your Brand?
          </h2>
          <p className="font-sans text-base text-white/55 mb-10 max-w-xl mx-auto">
            Let us design custom, eco-friendly rigid packaging tailored to your specifications.
          </p>
          <Button 
            onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
            size="xl" 
            className="group rounded-full bg-white hover:bg-white/90 text-black font-sans text-sm font-semibold py-6 transition-all duration-300"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default About;