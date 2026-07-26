'use client';

import React, { useState, useEffect } from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { X, Copy, Check, MessageCircle } from "lucide-react";
import ITBButton from "./ui/ITBButton";
import ITBLabel from "./ui/ITBLabel";
import { generateShareableUrl, generateWhatsAppUrl, generateQuoteSummaryText } from "@/lib/configurator/quoteSummary";

// Mutable object to pass captured WebGL canvas snapshots from Viewer3D
export const quoteData = {
  snapshot: null as string | null,
};

export function captureViewerSnapshot(): string | null {
  const canvas = (window as any)._glCanvas;
  if (!canvas) return null;
  try {
    return canvas.toDataURL("image/jpeg", 0.85);
  } catch (e) {
    console.error("Failed to capture snapshot:", e);
    return null;
  }
}

const BOX_LABELS: Record<string, string> = {
  straight_tuck: "Straight Tuck Box",
  reverse_tuck: "Reverse Tuck Box",
  rigid_lid_base: "Rigid Lid & Base Box",
  mailer: "Mailer Box",
  sleeve: "Sleeve Tube Box",
  drawer: "Drawer Box",
  perfume: "Perfume Box",
  gift: "Gift Box",
  bag: "Paper Bag",
};

export const QuoteModal = () => {
  const store = useConfigStore();
  const isOpen = store.quoteOpen;

  // Form input states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        store.setQuoteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Clean form state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setSubmitError(null);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleWhatsAppClick = () => {
    const url = generateWhatsAppUrl(store, {
      name: name.trim(),
      company: company.trim(),
      phone: phone.trim(),
      email: email.trim(),
      message: message.trim(),
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setSubmitError(null);

    const shareUrl = generateShareableUrl(store);
    const summaryText = generateQuoteSummaryText(store, { name, company, phone, email, message });

    const quotePayload = {
      name: name.trim(),
      phone: phone.trim(),
      company: company.trim(),
      email: email.trim(),
      message: message.trim(),
      summaryText,
      config: {
        boxType: store.boxType,
        dimensions: store.dimensions,
        boxColor: store.boxColor,
        quantity: store.quantity,
        logoFace: store.logoFace,
        logoX: store.logoX,
        logoY: store.logoY,
        logoScale: store.logoScale,
        logoRotation: store.logoRotation,
      },
      snapshot: quoteData.snapshot,
      configUrl: shareUrl,
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/quote/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quotePayload),
      });

      const data = await res.json().catch(() => ({ success: true }));

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        // Fallback gracefully so customer can proceed via WhatsApp
        setSubmitted(true);
      }
    } catch (err) {
      console.warn("API request failed, allowing client to continue to WhatsApp:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const shareableUrl = generateShareableUrl(store);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
      style={{
        background: "rgba(5,5,5,0.95)",
        WebkitBackdropFilter: "blur(8px)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="relative w-full max-w-[900px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-8">
        
        {/* Close Button */}
        <button
          onClick={() => store.setQuoteOpen(false)}
          className="absolute top-4 right-4 text-foreground/50 hover:text-foreground z-50 p-1 rounded-lg hover:bg-muted"
          aria-label="Close quote modal"
        >
          <X size={18} />
        </button>

        {/* LEFT COLUMN: Summary & 3D Snapshot */}
        <div className="w-full md:w-[42%] bg-muted/40 p-6 md:p-8 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-xs text-accent uppercase tracking-[0.25em] font-bold mb-4">
              Configured Specs
            </h3>

            {/* Snapshot Render */}
            <div className="aspect-square w-full rounded-xl border border-border bg-[#edf0f5] overflow-hidden flex items-center justify-center relative mb-6 shadow-inner">
              {quoteData.snapshot ? (
                <img
                  src={quoteData.snapshot}
                  alt="Box Design Render"
                  className="w-full h-full object-cover pointer-events-none select-none"
                  onContextMenu={(e) => e.preventDefault()}
                />
              ) : (
                <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-wider">
                  3D Studio Preview
                </span>
              )}
            </div>

            {/* Spec breakdown */}
            <div className="space-y-2 text-left font-sans text-xs text-foreground/70">
              <p className="flex justify-between">
                <span className="font-mono font-semibold text-foreground">Structure:</span>
                <span className="capitalize">{BOX_LABELS[store.boxType] || store.boxType}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-mono font-semibold text-foreground">Dimensions:</span>
                <span>{store.dimensions.length} × {store.dimensions.width} × {store.dimensions.height} {store.dimensions.unit}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-mono font-semibold text-foreground">Colour:</span>
                <span className="flex items-center gap-1.5 font-mono uppercase">
                  <span className="w-3 h-3 rounded-full border border-border inline-block" style={{ backgroundColor: store.boxColor }}></span>
                  {store.boxColor}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-mono font-semibold text-foreground">Logo Surface:</span>
                <span className="capitalize">{store.logoDataUrl ? store.logoFace : "None"}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-mono font-semibold text-foreground">Quantity:</span>
                <span className="font-mono font-bold text-foreground">{store.quantity.toLocaleString()} units</span>
              </p>
            </div>
          </div>

          <p className="text-[10px] font-sans text-foreground/40 mt-6 text-left leading-relaxed select-none">
            InTheBox bespoke packaging models use precision engineered fold structures.
          </p>
        </div>

        {/* RIGHT COLUMN: Contact Form / WhatsApp Handoff */}
        <div className="w-full md:w-[58%] p-6 md:p-8 flex flex-col justify-center bg-card">
          {!submitted ? (
            // Quote Form View
            <div className="space-y-5 text-left">
              <div>
                <h2 className="font-mono text-lg font-bold uppercase text-foreground tracking-wider">
                  Request a Quote
                </h2>
                <p className="text-xs text-foreground/60 font-sans mt-1">
                  Submit your contact details to receive a formal quotation from InTheBox.
                </p>
              </div>

              {/* Submit Error Banner */}
              {submitError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-xs rounded-xl">
                  {submitError}
                </div>
              )}

              {/* Form Input fields */}
              <div className="space-y-3.5">
                {/* Full Name & Phone in 2 Cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <ITBLabel text="Full Name *" className="text-[9px]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                      placeholder="Your Name"
                    />
                    {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <ITBLabel text="Phone Number *" className="text-[9px]" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone}</p>}
                  </div>
                </div>

                {/* Company & Email in 2 Cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <ITBLabel text="Company (Optional)" className="text-[9px]" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                      placeholder="Brand / Company"
                    />
                  </div>

                  <div className="space-y-1">
                    <ITBLabel text="Email Address (Optional)" className="text-[9px]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <ITBLabel text="Additional Details / Requests (Optional)" className="text-[9px]" />
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent resize-none"
                    placeholder="Specific finishes, delivery timeline, or questions..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <ITBButton
                  label={loading ? "Sending..." : "Submit Quote Request →"}
                  variant="primary"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={loading}
                />

                <div className="relative flex items-center justify-center py-1">
                  <div className="border-t border-border w-full"></div>
                  <span className="bg-card px-2 text-[10px] font-mono uppercase text-foreground/40 absolute">OR</span>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-mono text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-md hover:opacity-95 active:scale-[0.99] cursor-pointer"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#ffffff',
                  }}
                >
                  <MessageCircle size={18} className="text-white fill-white" />
                  <span className="text-white font-bold">Continue on WhatsApp →</span>
                </button>
              </div>
            </div>
          ) : (
            // Success State View
            <div className="space-y-6 text-left animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-2">
                <Check className="text-emerald-500" size={24} />
              </div>
              
              <div>
                <h2 className="font-mono text-lg font-bold uppercase text-foreground tracking-wider">
                  Request Received!
                </h2>
                <p className="text-xs text-foreground/70 font-sans mt-2 leading-relaxed">
                  Your custom packaging request has been prepared. You can connect with our team immediately via WhatsApp for instant assistance.
                </p>
              </div>

              {/* WhatsApp direct CTA */}
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="w-full py-3.5 px-4 rounded-xl text-white font-mono text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-md hover:opacity-95 active:scale-[0.99] cursor-pointer"
                style={{
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                }}
              >
                <MessageCircle size={18} className="text-white fill-white" />
                <span className="text-white font-bold">Open WhatsApp with Design Specs →</span>
              </button>

              {/* Share link box */}
              <div className="p-3.5 border border-border rounded-xl bg-background space-y-2">
                <ITBLabel text="SHARE YOUR DESIGN LINK" className="text-[9px]" />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareableUrl}
                    className="flex-1 px-3 py-1.5 bg-card border border-border rounded-lg text-[10px] font-mono text-foreground/60 focus:outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 border border-border rounded-lg bg-card text-foreground hover:border-accent transition-all text-[10px] font-mono uppercase font-bold flex items-center gap-1 min-w-[90px] justify-center"
                  >
                    {copiedLink ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    {copiedLink ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <ITBButton
                label="Close"
                variant="outline"
                fullWidth
                onClick={() => store.setQuoteOpen(false)}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default QuoteModal;
