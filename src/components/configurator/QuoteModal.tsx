'use client';

import React, { useState, useEffect } from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { X, Copy, Check, Info } from "lucide-react";
import ITBButton from "./ui/ITBButton";
import ITBLabel from "./ui/ITBLabel";

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

const MATERIAL_LABELS: Record<string, string> = {
  white_cardboard: "White Cardboard",
  kraft: "Natural Kraft",
  black_cardboard: "Black Board",
  rigid_greyboard: "Rigid Greyboard",
};

const FINISH_LABELS: Record<string, string> = {
  matte_lamination: "Matte Lamination",
  gloss_lamination: "Gloss Lamination",
  soft_touch: "Soft Touch Matte",
  aqueous_coating: "Aqueous Coating",
  no_finish: "No Finish (Raw)",
};

const FOIL_LABELS: Record<string, string> = {
  none: "No Foil",
  gold_foil: "Gold Hot Foil",
  silver_foil: "Silver Hot Foil",
  holographic: "Holographic Foil",
  rose_gold_foil: "Rose Gold Foil",
};

const PRINTING_LABELS: Record<string, string> = {
  outside: "Outside Only",
  inside: "Inside Only",
  both: "Double Sided (Both)",
};

export const QuoteModal = () => {
  const store = useConfigStore();
  const isOpen = store.quoteOpen;

  // Form input states
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [timeline, setTimeline] = useState("As soon as possible");
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

  // Clean form when modal state changes
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
      nextErrors.name = "Full Name is required.";
    }
    if (!company.trim()) {
      nextErrors.company = "Company name is required.";
    }
    if (!email.trim()) {
      nextErrors.email = "Email address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        nextErrors.email = "Please enter a valid email address.";
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setSubmitError(null);

    const quotePayload = {
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      productDescription: productDesc.trim(),
      timeline,
      message: message.trim(),
      config: {
        boxType: store.boxType,
        dimensions: store.dimensions,
        material: store.material,
        finish: store.finish,
        foilEffect: store.foilEffect,
        printingSide: store.printingSide,
        quantity: store.quantity,
        lidOpenAmount: store.lidOpenAmount,
      },
      snapshot: quoteData.snapshot,
      configUrl: store.savedConfigId 
        ? `${window.location.origin}/customize?config=${store.savedConfigId}`
        : window.location.href,
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

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Quote submit error:", err);
      setSubmitError("Failed to reach server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Generate shareable URL
  const shareableUrl = store.savedConfigId 
    ? `${window.location.origin}/customize?config=${store.savedConfigId}`
    : window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
      style={{
        // Fallback for browsers without backdrop-filter support (older Firefox, some Safari)
        background: "rgba(5,5,5,0.96)",
        WebkitBackdropFilter: "blur(8px)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="relative w-full max-w-[900px] bg-[color:var(--itb-surface)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] shadow-2xl overflow-hidden flex flex-col md:flex-row my-8">
        
        {/* Close Button */}
        <button
          onClick={() => store.setQuoteOpen(false)}
          className="absolute top-4 right-4 text-[color:var(--itb-muted)] hover:text-[color:var(--itb-fg)] z-50 p-1"
          aria-label="Close quote modal"
        >
          <X size={18} />
        </button>

        {/* LEFT COLUMN: Summary (40% on Desktop) */}
        <div className="w-full md:w-[40%] bg-black/40 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[color:var(--itb-border)] flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-xs text-[color:var(--itb-accent)] uppercase tracking-[0.25em] mb-4">
              Your Configuration
            </h3>
            {/* Snapshot */}
            <div className="aspect-square w-full rounded border border-[color:var(--itb-border)] bg-[#050505] overflow-hidden flex items-center justify-center relative mb-6">
              {quoteData.snapshot ? (
                <img
                  src={quoteData.snapshot}
                  alt="Box Design Render"
                  className="w-full h-full object-cover pointer-events-none select-none"
                  onContextMenu={(e) => e.preventDefault()}
                />
              ) : (
                <span className="font-mono text-[10px] text-[color:var(--itb-muted)] uppercase tracking-wider">
                  No preview generated
                </span>
              )}
            </div>

            {/* Spec lines */}
            <div className="space-y-2 text-left font-sans text-xs text-[color:var(--itb-muted)]">
              <p>
                <strong className="text-[color:var(--itb-fg)] font-mono">Box Style:</strong>{" "}
                {BOX_LABELS[store.boxType] || store.boxType}
              </p>
              <p>
                <strong className="text-[color:var(--itb-fg)] font-mono">Size:</strong>{" "}
                {store.dimensions.length} × {store.dimensions.width} × {store.dimensions.height} {store.dimensions.unit}
              </p>
              <p>
                <strong className="text-[color:var(--itb-fg)] font-mono">Material:</strong>{" "}
                {MATERIAL_LABELS[store.material] || store.material}
              </p>
              <p>
                <strong className="text-[color:var(--itb-fg)] font-mono">Finish:</strong>{" "}
                {FINISH_LABELS[store.finish] || store.finish}
              </p>
              <p>
                <strong className="text-[color:var(--itb-fg)] font-mono">Foil accents:</strong>{" "}
                {FOIL_LABELS[store.foilEffect] || store.foilEffect}
              </p>
              <p>
                <strong className="text-[color:var(--itb-fg)] font-mono">Print coverage:</strong>{" "}
                {PRINTING_LABELS[store.printingSide] || store.printingSide}
              </p>
              <p>
                <strong className="text-[color:var(--itb-fg)] font-mono">Quantity:</strong>{" "}
                {store.quantity.toLocaleString()} units
              </p>
            </div>
          </div>

          <div className="text-[10px] text-[color:var(--itb-muted)] mt-6 text-left leading-relaxed select-none">
            InTheBox packaging models use structural folds suited for custom printing.
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Form / Success (60% on Desktop) */}
        <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-center bg-[color:var(--itb-surface)]">
          {!submitted ? (
            // Quote Form View
            <div className="space-y-5 text-left">
              <div>
                <h2 className="font-mono text-lg font-bold uppercase text-[color:var(--itb-fg)] tracking-wider">
                  Request a Quote
                </h2>
                <p className="text-xs text-[color:var(--itb-muted)] font-sans mt-1">
                  We'll review your design specs and respond within 24 hours.
                </p>
              </div>

              {/* Submit Error Banner */}
              {submitError && (
                <div className="p-3 bg-red-950/40 border border-red-800 text-red-200 text-xs rounded">
                  {submitError}
                </div>
              )}

              {/* Form Input fields */}
              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="quote-name" className="block">
                    <ITBLabel text="Full Name *" className="text-[9px]" />
                  </label>
                  <input
                    id="quote-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-xs text-[color:var(--itb-fg)] focus:outline-none focus:ring-2 focus:ring-[rgba(200,161,90,0.5)] focus:border-[color:var(--itb-accent)]"
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Company Name */}
                <div className="space-y-1">
                  <label htmlFor="quote-company" className="block">
                    <ITBLabel text="Company / Brand Name *" className="text-[9px]" />
                  </label>
                  <input
                    id="quote-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-xs text-[color:var(--itb-fg)] focus:outline-none focus:ring-2 focus:ring-[rgba(200,161,90,0.5)] focus:border-[color:var(--itb-accent)]"
                    placeholder="Acme Packaging"
                  />
                  {errors.company && <p className="text-[10px] text-red-400 mt-1">{errors.company}</p>}
                </div>

                {/* Grid for Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="quote-email" className="block">
                      <ITBLabel text="Email Address *" className="text-[9px]" />
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-xs text-[color:var(--itb-fg)] focus:outline-none focus:ring-2 focus:ring-[rgba(200,161,90,0.5)] focus:border-[color:var(--itb-accent)]"
                      placeholder="jane@company.com"
                    />
                    {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="quote-phone" className="block">
                      <ITBLabel text="Phone Number (Optional)" className="text-[9px]" />
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-xs text-[color:var(--itb-fg)] focus:outline-none focus:ring-2 focus:ring-[rgba(200,161,90,0.5)] focus:border-[color:var(--itb-accent)]"
                      placeholder="+1 (555) 000-0000"
                    />
                    <p className="text-[9px] text-[color:var(--itb-muted)] mt-1">Helps us reach you faster</p>
                  </div>
                </div>

                {/* Product Description */}
                <div className="space-y-1">
                  <label htmlFor="quote-desc" className="block">
                    <ITBLabel text="What will go inside the box? (Optional)" className="text-[9px]" />
                  </label>
                  <textarea
                    id="quote-desc"
                    rows={2}
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-xs text-[color:var(--itb-fg)] focus:outline-none focus:ring-2 focus:ring-[rgba(200,161,90,0.5)] focus:border-[color:var(--itb-accent)] resize-none"
                    placeholder="e.g. Cosmetics bottles, perfume container, brand packaging"
                  />
                </div>

                {/* Timeline and Message Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Timeline Select */}
                  <div className="space-y-1">
                    <label htmlFor="quote-timeline" className="block">
                      <ITBLabel text="Project Timeline" className="text-[9px]" />
                    </label>
                    <select
                      id="quote-timeline"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3 py-2 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-xs text-[color:var(--itb-fg)] focus:outline-none focus:ring-2 focus:ring-[rgba(200,161,90,0.5)] focus:border-[color:var(--itb-accent)] cursor-pointer"
                    >
                      <option>As soon as possible</option>
                      <option>1–2 months</option>
                      <option>3–6 months</option>
                      <option>Just exploring</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="quote-message" className="block">
                      <ITBLabel text="Message or Details (Optional)" className="text-[9px]" />
                    </label>
                    <textarea
                      id="quote-message"
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-[color:var(--itb-bg)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-xs text-[color:var(--itb-fg)] focus:outline-none focus:ring-2 focus:ring-[rgba(200,161,90,0.5)] focus:border-[color:var(--itb-accent)] resize-none"
                      placeholder="Special laminations, bulk orders, specific material requests..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <ITBButton
                label={loading ? "Sending Request..." : "Send Quote Request →"}
                variant="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
              />
            </div>
          ) : (
            // Quote Success Screen View
            <div className="space-y-6 text-left animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-[rgba(200,161,90,0.1)] border border-[color:var(--itb-accent)] flex items-center justify-center mb-2">
                <Check className="text-[color:var(--itb-accent)]" size={24} />
              </div>
              
              <div>
                <h2 className="font-mono text-lg font-bold uppercase text-[color:var(--itb-fg)] tracking-wider">
                  Your request is on its way.
                </h2>
                <p className="text-xs text-[color:var(--itb-muted)] font-sans mt-2 leading-relaxed">
                  We have received your custom specifications. Our packaging team will review the details and get back to you at <strong className="text-[color:var(--itb-fg)] font-mono">{email}</strong> within 24 hours.
                </p>
              </div>

              {/* Share section */}
              <div className="p-4 border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] bg-[color:var(--itb-bg)] space-y-2">
                <ITBLabel text="Share your design" className="text-[9px]" />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareableUrl}
                    className="flex-1 px-3 py-2 bg-[color:var(--itb-surface)] border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] text-[10px] font-mono text-[color:var(--itb-muted)] focus:outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    aria-label={copiedLink ? "Link copied to clipboard" : "Copy shareable link"}
                    className="p-2 border border-[color:var(--itb-border)] rounded-[var(--itb-radius)] bg-[color:var(--itb-surface)] text-[color:var(--itb-muted)] hover:text-[color:var(--itb-accent)] hover:border-[color:var(--itb-accent)] transition-all duration-300 flex items-center justify-center gap-1.5 min-w-[100px]"
                  >
                    {copiedLink ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span className="font-mono text-[9px] uppercase tracking-wider">Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Close Action */}
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
