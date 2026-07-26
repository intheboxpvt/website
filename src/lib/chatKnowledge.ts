// InTheBox Chat Knowledge Base
// Intent-based Q&A engine — no API key required

export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  answer: string;
  followUp?: string;
}

export const WHATSAPP_NUMBER = "917087778689";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const knowledge: KnowledgeEntry[] = [
  // WHO WE ARE
  {
    id: "who",
    keywords: ["who", "about", "inthebox", "company", "what is", "tell me", "you", "your"],
    answer:
      "**InTheBox** is a premium custom packaging company based in Mohali, India 🇮🇳\n\nWe design and manufacture luxury rigid boxes, eco-board packaging, kraft mailers, and corporate stationery — built to make your brand unforgettable at first touch.\n\nOur team includes structural engineers, print specialists, and sustainability advocates.",
    followUp: "What would you like to know more about — our products, process, or sustainability?",
  },
  // PRODUCTS / CATALOGUE
  {
    id: "products",
    keywords: ["product", "catalogue", "box", "boxes", "packaging", "what do you make", "offer", "items", "range", "types"],
    answer:
      "We offer a wide range of premium packaging:\n\n• 📦 **Rigid Boxes** — magnetic closure, lid & base\n• 🧡 **Kraft Mailers** — eco-friendly shipper boxes\n• 🎁 **Luxury Gift Boxes** — ribbon closure, premium finishes\n• 🌿 **Eco-Board Boxes** — agri-waste hybrid boards\n• 🎴 **Drawer Boxes** — sliding style rigid boxes\n• 🧴 **Cosmetic Boxes** — for perfume, skincare\n• 📝 **Corporate Stationery** — thank you cards, sleeves\n\nAll with options for spot UV, foil stamping, embossing, and matte/gloss finishes.",
    followUp: "Want to explore our 3D Virtual Customizer in the Catalogue?",
  },
  // SUSTAINABILITY
  {
    id: "sustainability",
    keywords: ["eco", "green", "sustainable", "compost", "recyclable", "environment", "agri", "waste", "carbon", "rice husk", "straw", "planet"],
    answer:
      "Sustainability is at our core 🌿\n\nOur **Eco-Board** packaging is made from rice husks and wheat straw collected directly from Punjab farms — waste that would otherwise be burned.\n\n✅ 100% Recyclable\n✅ Compostable within 90 days\n✅ Carbon Negative production\n✅ Water-based inks only\n\nWe've diverted 2,500+ tons of agri-waste and support 1,200+ farmers.",
  },
  // MOQ / MINIMUM ORDER
  {
    id: "moq",
    keywords: ["moq", "minimum", "order", "quantity", "how many", "units", "pieces"],
    answer:
      "Our MOQs vary by product:\n\n• Rigid Boxes: **100–500 units**\n• Kraft Mailers: **250–1,000 units**\n• Luxury Gift Boxes: **50–200 units**\n• Eco-Board Boxes: **200–800 units**\n• Corporate Stationery: **100–500 units**\n\nFor exact pricing and bulk quotes, I'd recommend chatting directly with our team on WhatsApp 👇",
    followUp: "whatsapp_cta:pricing_query",
  },
  // PRICING / COST
  {
    id: "pricing",
    keywords: ["price", "cost", "rate", "how much", "budget", "expensive", "cheap", "affordable", "quote"],
    answer:
      "Pricing depends on box type, size, finish, and quantity. We offer competitive rates for premium packaging.\n\nFor an accurate quote tailored to your needs, our team can get back to you quickly on WhatsApp:",
    followUp: "whatsapp_cta:get_quote",
  },
  // PROCESS / HOW IT WORKS
  {
    id: "process",
    keywords: ["process", "how", "steps", "timeline", "how long", "delivery", "turnaround", "lead time", "work"],
    answer:
      "Here's how we work with you — from idea to delivery:\n\n**Step 1 🔍 Discover & Consult** — We understand your dimensions, brand, and goals\n**Step 2 💡 Concept Blueprint** — Custom layout and structural design\n**Step 3 📦 Prototype Mockup** — Physical sample for real-world verification\n**Step 4 ✅ Exacting Approval** — Sign-off on every detail\n**Step 5 🏭 Volume Fabrication** — Precision printing, finishing, and QC\n**Step 6 🚚 Secure Delivery** — Direct to your warehouse, pan India\n\nTypical lead time: **15–30 days** from approval.",
  },
  // LOCATION / SHIPPING
  {
    id: "location",
    keywords: ["location", "where", "address", "mohali", "india", "ship", "shipping", "deliver", "delivery", "pan india"],
    answer:
      "We're based in **Mohali, Punjab, India** 📍\n\nWe ship pan-India via integrated logistics, with direct doorstep delivery to your corporate warehouse or fulfillment center.",
  },
  // CONTACT / REACH
  {
    id: "contact",
    keywords: ["contact", "reach", "call", "phone", "email", "talk", "speak", "human", "person", "number"],
    answer:
      "You can reach the InTheBox team directly:\n\n📞 **+91 70877 78689**\n📧 **founder@inthebox.co.in**\n📍 Mohali, India\n\nOr click below to start a WhatsApp conversation right now:",
    followUp: "whatsapp_cta:say_hello",
  },
  // CUSTOMIZATION
  {
    id: "customization",
    keywords: ["custom", "customize", "branding", "logo", "design", "print", "foil", "emboss", "finish", "texture"],
    answer:
      "Everything we make is **fully custom** to your brand:\n\n🎨 Your logo, colors, and typography\n✨ Foil hot stamping (gold, silver, rose gold)\n🌑 Blind embossing & debossing\n🖐️ Soft-touch matte or high-gloss lamination\n🔆 Spot UV highlights\n\nYou can even try our **3D Virtual Customizer** in the Catalogue to see your brand on a box in real-time!",
  },
  // TEAM
  {
    id: "team",
    keywords: ["team", "founder", "ceo", "who runs", "arpit", "aashvi", "ishan", "people"],
    answer:
      "The InTheBox team:\n\n👤 **Liv Arpit** — Founder & CEO\n4+ years in industrial print and box fabrication engineering\n\n👤 **Aashvi Chawla** — MD & COO\nOversees structural prototyping and manufacturing at Mohali\n\n👤 **Ishan Kumar** — Co-Founder & CMO\nLeads design studio partnerships and sustainability initiatives",
  },
  // SAMPLES
  {
    id: "samples",
    keywords: ["sample", "prototype", "mockup", "test", "try", "see", "physical"],
    answer:
      "Yes! We create **physical prototype mockups** before full production runs — so you can hold it, open it, and approve every detail before committing to volume.\n\nSamples are typically ready within 7–10 days. Want to request one? Chat with us on WhatsApp:",
    followUp: "whatsapp_cta:request_sample",
  },
];

// Greeting messages
export const GREETINGS = [
  "hello", "hi", "hey", "hii", "namaste", "good morning", "good afternoon", "good evening", "yo", "sup"
];

export const GREETING_RESPONSE = "Hey there! 👋 Welcome to **InTheBox**.\n\nI'm your packaging assistant. I can help you with:\n• Our products & catalogue\n• Pricing & MOQs\n• Sustainability\n• Our process & timeline\n• Contacting our team\n\nWhat would you like to know?";

// WhatsApp pre-filled messages
export const WA_MESSAGES: Record<string, string> = {
  get_quote: "Hi InTheBox Team! I'd like to get a quote for custom packaging.",
  pricing_query: "Hi InTheBox Team! I have a question about pricing and MOQs.",
  request_sample: "Hi InTheBox Team! I'd like to request a packaging prototype sample.",
  say_hello: "Hi InTheBox Team! I'd like to learn more about your packaging solutions.",
  general: "Hi InTheBox Team! I have a question and need some help.",
};

export function getWhatsAppUrl(key: string = "general"): string {
  const message = WA_MESSAGES[key] ?? WA_MESSAGES.general;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

// Simple intent matching engine
export function matchIntent(userInput: string): KnowledgeEntry | null {
  const lower = userInput.toLowerCase().trim();
  
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledge) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.length; // longer keywords score higher (more specific)
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // threshold: at least 3 chars matched
  return bestScore >= 3 ? bestMatch : null;
}

export function isGreeting(input: string): boolean {
  const lower = input.toLowerCase().trim();
  return GREETINGS.some(g => lower === g || lower.startsWith(g + " ") || lower.endsWith(" " + g));
}
