import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import SEO from "@/components/SEO";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you soon.");
  };

  return (
    <main className="min-h-screen">
      <SEO 
        title="Contact Us | Get a Quote for Custom Packaging"
        description="Get in touch with InTheBox for premium custom packaging solutions. located in Mohali. Call, email, or visit us to start your project."
        keywords="contact inthebox, packaging quote, packaging manufacturer contact, mohali packaging company client support"
      />
      <Navbar />
      <section className="pt-32 pb-20 px-6 lg:px-12 bg-gradient-to-b from-light-purple/20 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-display text-sm tracking-widest uppercase text-accent font-medium">Contact</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mt-4">Let's Create Together</h1>
          <p className="font-display text-lg text-muted-foreground mt-6 max-w-2xl mx-auto font-normal">Ready to elevate your packaging? Get in touch with our team.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary mb-8">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-border bg-card font-display focus:outline-none focus:ring-2 focus:ring-accent" />
              <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-border bg-card font-display focus:outline-none focus:ring-2 focus:ring-accent" />
              <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border bg-card font-display focus:outline-none focus:ring-2 focus:ring-accent" />
              <textarea placeholder="Tell us about your project..." value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows={4} required className="w-full px-4 py-3 rounded-xl border border-border bg-card font-display focus:outline-none focus:ring-2 focus:ring-accent resize-none"></textarea>
              <Button type="submit" variant="hero" size="lg" className="w-full">Send Message</Button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="card-elevated p-8">
              <h3 className="font-display text-xl font-semibold text-primary mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4"><Phone className="w-5 h-5 text-accent" /><span className="font-display font-normal">+91 70877 78689</span></div>
                <div className="flex items-center gap-4"><Mail className="w-5 h-5 text-accent" /><span className="font-display font-normal">founder@inthebox.co.in</span></div>
                <div className="flex items-center gap-4"><MapPin className="w-5 h-5 text-accent" /><span className="font-display font-normal">Mohali, India</span></div>
              </div>
            </div>

            <a href="https://wa.me/917087778689" target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="whatsapp" size="xl" className="w-full">
                <MessageCircle className="w-5 h-5" />Chat on WhatsApp
              </Button>
            </a>

            <div className="card-elevated overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109744.22675777876!2d76.6346359!3d30.7046486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee906da6f81f%3A0x512998f16ce508d8!2sMohali%2C%20Punjab!5e0!3m2!1sen!2sin!4v1600000000000" width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy" className="rounded-xl"></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Contact;