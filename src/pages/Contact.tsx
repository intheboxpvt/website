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
    <main className="min-h-screen bg-[#050505] text-white">
      <SEO 
        title="Contact Us | Get a Quote for Custom Packaging"
        description="Get in touch with InTheBox for premium custom packaging solutions. located in Mohali. Call, email, or visit us to start your project."
        keywords="contact inthebox, packaging quote, packaging manufacturer contact, mohali packaging company client support"
      />
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 lg:px-12 bg-black border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <span className="inline-flex items-center gap-3 text-xs font-mono text-white/50 mb-6">
            <span className="w-12 h-px bg-white/20"></span>
            Contact
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif tracking-tight leading-[0.9] text-white">
            Let's Create<br/>
            <span className="text-white/30 italic">Together.</span>
          </h1>
          <p className="font-sans text-lg text-white/50 mt-8 max-w-xl">
            Ready to elevate your packaging? Get in touch with our team of custom design specialists.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-3xl font-light text-[#FFFFFF] mb-8">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field for spam prevention - hidden from real users */}
              <div className="hidden" aria-hidden="true">
                <input type="text" name="botField" tabIndex={-1} value={form.botField} onChange={(e) => setForm({...form, botField: e.target.value})} />
              </div>

              <input 
                type="text" 
                placeholder="Your Name" 
                value={form.name} 
                onChange={(e) => setForm({...form, name: e.target.value})} 
                required 
                className="w-full px-4 py-3 rounded-none border border-white/10 bg-white/5 text-[#FFFFFF] placeholder-[#A1A1AA]/50 font-sans focus:outline-none focus:border-white/40 transition-colors" 
                disabled={status === "submitting"} 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={form.email} 
                onChange={(e) => setForm({...form, email: e.target.value})} 
                required 
                className="w-full px-4 py-3 rounded-none border border-white/10 bg-white/5 text-[#FFFFFF] placeholder-[#A1A1AA]/50 font-sans focus:outline-none focus:border-white/40 transition-colors" 
                disabled={status === "submitting"} 
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={form.phone} 
                onChange={(e) => setForm({...form, phone: e.target.value})} 
                className="w-full px-4 py-3 rounded-none border border-white/10 bg-white/5 text-[#FFFFFF] placeholder-[#A1A1AA]/50 font-sans focus:outline-none focus:border-white/40 transition-colors" 
                disabled={status === "submitting"} 
              />
              <textarea 
                placeholder="Tell us about your project..." 
                value={form.message} 
                onChange={(e) => setForm({...form, message: e.target.value})} 
                rows={4} 
                required 
                className="w-full px-4 py-3 rounded-none border border-white/10 bg-white/5 text-[#FFFFFF] placeholder-[#A1A1AA]/50 font-sans focus:outline-none focus:border-white/40 transition-colors resize-none" 
                disabled={status === "submitting"}
              ></textarea>
              
              {status === "success" && (
                <div className="p-4 rounded-none bg-emerald/10 border border-emerald/20 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald mt-0.5" />
                  <div>
                    <p className="font-sans font-semibold text-emerald">Message Sent Successfully</p>
                    <p className="text-sm font-sans text-emerald/80 mt-1">Thank you for reaching out. Our packaging specialists will contact you shortly.</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-none bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-sans font-semibold text-red-500">Submission Failed</p>
                    <p className="text-sm font-sans text-red-500/80 mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full group rounded-full bg-white hover:bg-white/90 text-black font-sans text-sm font-semibold py-6 transition-all duration-300" 
                disabled={status === "submitting" || status === "success"}
              >
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
            <div className="bg-black border border-white/10 p-8 rounded-none shadow-2xl">
              <h3 className="font-serif text-2xl font-light text-[#FFFFFF] mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4"><Phone className="w-4 h-4 text-white/50" /><span className="font-mono text-sm text-white/80">+91 70877 78689</span></div>
                <div className="flex items-center gap-4"><Mail className="w-4 h-4 text-white/50" /><span className="font-mono text-sm text-white/80">founder@inthebox.co.in</span></div>
                <div className="flex items-center gap-4"><MapPin className="w-4 h-4 text-white/50" /><span className="font-mono text-sm text-white/80">Mohali, India</span></div>
              </div>
            </div>

            <a href="https://wa.me/917087778689" target="_blank" rel="noopener noreferrer" className="block">
              <Button size="xl" className="w-full rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white font-sans text-sm font-semibold py-6 transition-all duration-300">
                <MessageCircle className="w-4 h-4 mr-2" />Chat on WhatsApp
              </Button>
            </a>

            <div className="bg-black border border-white/10 overflow-hidden rounded-none shadow-2xl">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109744.22675777876!2d76.6346359!3d30.7046486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee906da6f81f%3A0x512998f16ce508d8!2sMohali%2C%20Punjab!5e0!3m2!1sen!2sin!4v1600000000000" width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy" className="opacity-70 hover:opacity-90 transition-opacity duration-300"></iframe>
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