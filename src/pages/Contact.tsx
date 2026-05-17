import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import SEO from "@/components/SEO";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", botField: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // IMPORTANT: Replace this URL with your deployed Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      // If no URL is set, simulate backend success for demonstration
      if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL") {
        setTimeout(() => {
          setStatus("success");
          setForm({ name: "", email: "", phone: "", message: "", botField: "" });
        }, 1500);
        return;
      }

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source: "Website Contact Form"
        }),
      });

      // no-cors mode won't return a readable response body, assuming success if no throw
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "", botField: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or contact us directly via WhatsApp.");
    }
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
              {/* Honeypot field for spam prevention - hidden from real users */}
              <div className="hidden" aria-hidden="true">
                <input type="text" name="botField" tabIndex={-1} value={form.botField} onChange={(e) => setForm({...form, botField: e.target.value})} />
              </div>

              <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-border bg-card font-sans focus:outline-none focus:ring-2 focus:ring-gold-metallic/50" disabled={status === "submitting"} />
              <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-border bg-card font-sans focus:outline-none focus:ring-2 focus:ring-gold-metallic/50" disabled={status === "submitting"} />
              <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border bg-card font-sans focus:outline-none focus:ring-2 focus:ring-gold-metallic/50" disabled={status === "submitting"} />
              <textarea placeholder="Tell us about your project..." value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows={4} required className="w-full px-4 py-3 rounded-xl border border-border bg-card font-sans focus:outline-none focus:ring-2 focus:ring-gold-metallic/50 resize-none" disabled={status === "submitting"}></textarea>
              
              {status === "success" && (
                <div className="p-4 rounded-xl bg-emerald/10 border border-emerald/20 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald mt-0.5" />
                  <div>
                    <p className="font-serif font-semibold text-emerald">Message Sent Successfully</p>
                    <p className="text-sm font-sans text-emerald/80 mt-1">Thank you for reaching out. Our packaging specialists will contact you shortly.</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-serif font-semibold text-red-500">Submission Failed</p>
                    <p className="text-sm font-sans text-red-500/80 mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}

              <Button type="submit" variant="hero" size="lg" className="w-full group" disabled={status === "submitting" || status === "success"}>
                {status === "submitting" ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...</>
                ) : status === "success" ? (
                  <><CheckCircle className="w-5 h-5 mr-2" /> Sent successfully</>
                ) : (
                  "Send Message"
                )}
              </Button>
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