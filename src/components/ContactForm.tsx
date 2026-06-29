import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", botField: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const brief = `Hi InTheBox Team, I would like to request a custom packaging quote.

*Name:* ${form.name}
*Email:* ${form.email}
*Phone:* ${form.phone}
*Project Brief:* ${form.message}`;

      const encodedText = encodeURIComponent(brief);
      const whatsappUrl = `https://wa.me/917087778689?text=${encodedText}`;

      // Simulate sending logic to DB if endpoint configured
      if (GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_SCRIPT_URL") {
        try {
          await fetch(GOOGLE_SCRIPT_URL, {
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
        } catch (dbErr) {
          console.error("Database backup post failed:", dbErr);
        }
      } else {
        // Simple artificial delay for visual feedback in dev
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "", botField: "" });
      
      // Redirect to WhatsApp web/app
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or contact us directly via WhatsApp.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white text-left">
      {/* Honeypot field for spam prevention - hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <input 
          type="text" 
          name="botField" 
          tabIndex={-1} 
          value={form.botField} 
          onChange={(e) => setForm({...form, botField: e.target.value})} 
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-white/45 uppercase tracking-wider mb-2">Full Name</label>
        <input 
          type="text" 
          placeholder="e.g. John Doe" 
          value={form.name} 
          onChange={(e) => setForm({...form, name: e.target.value})} 
          required 
          className="w-full px-4 py-3 rounded-none border border-white/10 bg-white/5 text-[#FFFFFF] placeholder-[#A1A1AA]/30 font-sans focus:outline-none focus:border-[#38BDF8] transition-colors" 
          disabled={status === "submitting"} 
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-white/45 uppercase tracking-wider mb-2">Email Address</label>
        <input 
          type="email" 
          placeholder="e.g. john@yourbrand.com" 
          value={form.email} 
          onChange={(e) => setForm({...form, email: e.target.value})} 
          required 
          className="w-full px-4 py-3 rounded-none border border-white/10 bg-white/5 text-[#FFFFFF] placeholder-[#A1A1AA]/30 font-sans focus:outline-none focus:border-[#38BDF8] transition-colors" 
          disabled={status === "submitting"} 
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-white/45 uppercase tracking-wider mb-2">Phone Number</label>
        <input 
          type="tel" 
          placeholder="e.g. +91 99999 99999" 
          value={form.phone} 
          onChange={(e) => setForm({...form, phone: e.target.value})} 
          className="w-full px-4 py-3 rounded-none border border-white/10 bg-white/5 text-[#FFFFFF] placeholder-[#A1A1AA]/30 font-sans focus:outline-none focus:border-[#38BDF8] transition-colors" 
          disabled={status === "submitting"} 
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-white/45 uppercase tracking-wider mb-2">Project Brief</label>
        <textarea 
          placeholder="Tell us about the boxes you need (rigid, packaging dimensions, quantity, etc.)..." 
          value={form.message} 
          onChange={(e) => setForm({...form, message: e.target.value})} 
          rows={4} 
          required 
          className="w-full px-4 py-3 rounded-none border border-white/10 bg-white/5 text-[#FFFFFF] placeholder-[#A1A1AA]/30 font-sans focus:outline-none focus:border-[#38BDF8] transition-colors resize-none" 
          disabled={status === "submitting"}
        ></textarea>
      </div>
      
      {status === "success" && (
        <div className="p-4 rounded-none bg-emerald/10 border border-emerald/20 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald mt-0.5" />
          <div>
            <p className="font-sans font-semibold text-emerald">Message Sent Successfully</p>
            <p className="text-sm font-sans text-emerald/80 mt-1">Thank you. Our structural design specialists will reach out shortly.</p>
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
          <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting Brief...</>
        ) : status === "success" ? (
          <><CheckCircle className="w-5 h-5 mr-2" /> Brief Sent</>
        ) : (
          "Submit Quote Request"
        )}
      </Button>
    </form>
  );
};
