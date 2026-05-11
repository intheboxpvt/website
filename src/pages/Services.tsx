import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { MessageSquare, Palette, Layers, Package, Sparkles, Truck, Search, Lightbulb, Box, CheckCircle, Factory } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";

const Services = () => {
  const consultationServices = [
    { title: "Starter Session", desc: "1-hour discovery call to understand your brand and packaging needs." },
    { title: "Deep Dive Workshop", desc: "Half-day intensive session with full brand packaging audit." },
    { title: "Monthly Advisory", desc: "Ongoing packaging strategy support for growing brands." },
  ];

  const designServices = [
    { icon: Palette, title: "Concept Development", desc: "From mood boards to final concepts aligned with your brand." },
    { icon: Layers, title: "3D Preview", desc: "Realistic 3D renders of your packaging before production." },
    { icon: Sparkles, title: "Production-Ready Files", desc: "Print-ready artwork with all specifications." },
  ];

  const manufacturingFeatures = [
    "Rigid boxes, kraft, premium materials",
    "Matte, soft-touch, spot UV finishes",
    "Foil stamping & embossing",
    "Custom inserts & tissue",
    "Doorstep delivery pan-India",
  ];

  const processSteps = [
    { icon: Search, title: "Discover", desc: "We learn about your brand, audience, and packaging goals." },
    { icon: Lightbulb, title: "Concept", desc: "Our designers create custom concepts and mood boards." },
    { icon: Box, title: "Prototype", desc: "Physical samples for your review and approval." },
    { icon: CheckCircle, title: "Approval", desc: "Final sign-off on designs and specifications." },
    { icon: Factory, title: "Manufacturing", desc: "Production with rigorous quality control." },
    { icon: Truck, title: "Delivery", desc: "Doorstep delivery across India." },
  ];

  return (
    <main className="min-h-screen">
      <SEO 
        title="Our Process & Services | Design to Delivery | InTheBox"
        description="Comprehensive packaging services from consultation and design to manufacturing and delivery. Your end-to-end partner for premium packaging."
        keywords="packaging design services, custom packaging manufacturer, packaging consultation, 3d packaging design, packaging delivery india"
      />
      <Navbar />
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-gradient-to-b from-light-purple/20 to-ivory">
        <div className="max-w-7xl mx-auto text-center">
          <ScrollReveal>
            <span className="font-sans text-sm tracking-widest uppercase text-gold-metallic font-medium">Services & Process</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-royal-purple mt-4">End-to-End Packaging Solutions</h1>
            <p className="font-sans text-lg text-aubergine/80 mt-6 max-w-2xl mx-auto">From initial concept to doorstep delivery, we handle every aspect of your packaging journey.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-6 h-6 text-gold-metallic" />
              <h2 className="font-serif text-3xl font-semibold text-royal-purple">Packaging Consultation</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {consultationServices.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 100}>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-royal-purple/10 hover:shadow-xl transition-shadow">
                  <h3 className="font-serif text-xl font-semibold text-royal-purple mb-3">{s.title}</h3>
                  <p className="font-sans text-aubergine/70">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-light-purple/10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <Palette className="w-6 h-6 text-gold-metallic" />
              <h2 className="font-serif text-3xl font-semibold text-royal-purple">Packaging Design</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {designServices.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 100}>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-royal-purple/10 hover:shadow-xl transition-shadow">
                  <s.icon className="w-10 h-10 text-gold-metallic mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-royal-purple mb-3">{s.title}</h3>
                  <p className="font-sans text-aubergine/70">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <Package className="w-6 h-6 text-gold-metallic" />
              <h2 className="font-serif text-3xl font-semibold text-royal-purple">Manufacturing & Finishing</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <ul className="space-y-4">
                {manufacturingFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-sans text-aubergine">
                    <Truck className="w-5 h-5 text-gold-metallic flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link to="/contact"><Button variant="gold" size="lg" className="mt-8">Get a Quote</Button></Link>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="right">
              <div className="aspect-square bg-gradient-to-br from-light-purple/30 to-gold-metallic/10 rounded-3xl flex items-center justify-center border border-royal-purple/10">
                <span className="text-8xl">📦</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-6 lg:px-12 bg-royal-purple">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="font-sans text-sm tracking-widest uppercase text-gold-metallic font-medium">Our Process</span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ivory mt-4">From Concept to Creation</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 100}>
                <div className="relative bg-ivory/10 backdrop-blur-sm border border-ivory/20 rounded-2xl p-6">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gold-metallic rounded-full flex items-center justify-center font-sans font-bold text-royal-purple text-sm">{i + 1}</div>
                  <step.icon className="w-8 h-8 text-gold-metallic mb-3" />
                  <h3 className="font-serif text-lg font-semibold text-ivory mb-2">{step.title}</h3>
                  <p className="font-sans text-ivory/80 text-sm">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Services;
