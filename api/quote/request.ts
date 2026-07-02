import { Resend } from "resend";

// In-memory rate limiting map
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true; // allowed
  }
  if (entry.count >= 5) return false; // blocked (max 5 requests per hour)
  entry.count++;
  return true; // allowed;
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

export default async function handler(req: any, res: any) {
  // CORS Headers support
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 1. IP Rate Limiting
  const ip =
    (req.headers["x-forwarded-for"] as string) ||
    (req.headers["x-real-ip"] as string) ||
    "unknown";
  
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  // 2. Validate Payload
  const {
    name,
    company,
    email,
    phone,
    productDescription,
    timeline,
    message,
    config,
    snapshot,
    configUrl,
    submittedAt,
  } = req.body || {};

  if (!name || !company || !email) {
    return res.status(400).json({ error: "Name, Company, and Email are required." });
  }

  const boxLabel = BOX_LABELS[config?.boxType] || config?.boxType || "Unknown Box";
  const materialLabel = MATERIAL_LABELS[config?.material] || config?.material || "Unknown Material";
  const finishLabel = FINISH_LABELS[config?.finish] || config?.finish || "Unknown Finish";
  const foilLabel = FOIL_LABELS[config?.foilEffect] || config?.foilEffect || "None";
  const printingLabel = PRINTING_LABELS[config?.printingSide] || config?.printingSide || "Outside";
  const dimsLabel = config?.dimensions
    ? `${config.dimensions.length} × ${config.dimensions.width} × ${config.dimensions.height} ${config.dimensions.unit}`
    : "Not specified";
  const quantityLabel = config?.quantity ? config.quantity.toLocaleString() : "500";

  // Build HTML emails
  const ownerHtml = `
    <h2>New Quote Request — ${boxLabel} from ${company}</h2>
    <table border="1" cellpadding="6" style="border-collapse:collapse;border-color:#eee;font-family:sans-serif;font-size:13px">
      <tr><td><strong>From:</strong></td><td>${name} &lt;${email}&gt;</td></tr>
      <tr><td><strong>Company:</strong></td><td>${company}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>${phone || "Not provided"}</td></tr>
      <tr><td><strong>Box Type:</strong></td><td>${boxLabel}</td></tr>
      <tr><td><strong>Dimensions:</strong></td><td>${dimsLabel}</td></tr>
      <tr><td><strong>Material:</strong></td><td>${materialLabel}</td></tr>
      <tr><td><strong>Finishing:</strong></td><td>${finishLabel}</td></tr>
      <tr><td><strong>Foil Stamping:</strong></td><td>${foilLabel}</td></tr>
      <tr><td><strong>Printing Sides:</strong></td><td>${printingLabel}</td></tr>
      <tr><td><strong>Quantity:</strong></td><td>${quantityLabel} units</td></tr>
      <tr><td><strong>Timeline:</strong></td><td>${timeline}</td></tr>
      <tr><td><strong>Product Description:</strong></td><td>${productDescription || "Not provided"}</td></tr>
      <tr><td><strong>Message:</strong></td><td>${message || "Not provided"}</td></tr>
    </table>
    <p><a href="${configUrl}" style="background:#C8A15A;color:#000;padding:8px 16px;text-decoration:none;font-weight:bold;font-family:sans-serif;font-size:12px;border-radius:4px">View Client's Saved Design →</a></p>
    ${snapshot ? `<p><strong>Box Snapshot Preview:</strong></p><img src="${snapshot}" width="400" style="border:1px solid #ccc;border-radius:4px" />` : ""}
    <p style="color:#999;font-size:11px;font-family:sans-serif">
      Submitted: ${submittedAt} · InTheBox Configurator
    </p>
  `;

  const firstName = name.split(" ")[0];
  const clientHtml = `
    <h2>Your InTheBox quote request</h2>
    <p>Hi ${firstName},</p>
    <p>We've received your quote request for:</p>
    <p><strong>${boxLabel} — ${dimsLabel} — ${materialLabel} / ${finishLabel}<br>
    ${quantityLabel} units</strong></p>
    <p>Our team will review your design specifications and respond within 24 hours.</p>
    ${configUrl ? `<p>You can revisit or modify your design here:<br><a href="${configUrl}">${configUrl}</a></p>` : ""}
    <p>Questions? Simply reply to this email.</p>
    <p>— The InTheBox Team</p>
  `;

  // 3. Dispatch Emails
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL || "info@inthebox-packaging.com";

  if (!apiKey) {
    // Development Mock Mode: print emails to console and mock success
    console.log("---------------- MOCK EMAIL TO OWNER ----------------");
    console.log(`To: ${ownerEmail}`);
    console.log("Subject:", `New Quote Request — ${boxLabel} from ${company}`);
    console.log("HTML:", ownerHtml);
    console.log("---------------- MOCK EMAIL TO CLIENT ---------------");
    console.log(`To: ${email}`);
    console.log("Subject:", "Your InTheBox quote request");
    console.log("HTML:", clientHtml);
    console.log("-----------------------------------------------------");
    
    return res.status(200).json({ success: true, quoteId: "mock-dev-id-12345" });
  }

  try {
    const resend = new Resend(apiKey);
    
    // Send email to owner
    await resend.emails.send({
      from: "InTheBox Configurator <quotes@inthebox-packaging.com>",
      to: ownerEmail,
      subject: `New Quote Request — ${boxLabel} from ${company}`,
      html: ownerHtml,
    });

    // Send confirmation to client
    await resend.emails.send({
      from: "InTheBox Packaging <info@inthebox-packaging.com>",
      to: email,
      subject: "Your InTheBox quote request",
      html: clientHtml,
    });

    return res.status(200).json({ success: true, quoteId: "quote-" + Math.random().toString(36).substr(2, 9) });
  } catch (err: any) {
    console.error("Resend API dispatch failed:", err);
    return res.status(500).json({ error: err.message || "Failed to dispatch emails via Resend." });
  }
}
