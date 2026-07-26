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
    keywords: ["who", "about", "inthebox", "company", "what is", "tell me", "you", "your", "story"],
    answer:
      "InTheBox is a premium custom packaging company based in Mohali, India.\n\nWe design and manufacture luxury rigid boxes, eco-board packaging, kraft mailers, and corporate stationery built to make your brand unforgettable at first touch.\n\nOur team includes structural engineers, print specialists, and sustainability advocates.",
    followUp: "What would you like to know more about: our products, process, or sustainability?",
  },
  // PRODUCTS / CATALOGUE
  {
    id: "products",
    keywords: ["product", "catalogue", "box", "boxes", "packaging", "what do you make", "offer", "items", "range", "types"],
    answer:
      "We offer a wide range of premium packaging:\n\n• Rigid Boxes: magnetic closure, lid & base\n• Kraft Mailers: eco-friendly shipper boxes\n• Luxury Gift Boxes: ribbon closure, premium finishes\n• Eco-Board Boxes: agri-waste hybrid boards\n• Drawer Boxes: sliding style rigid boxes\n• Cosmetic Boxes: for perfume, skincare\n• Corporate Stationery: thank you cards, sleeves\n\nAll with options for spot UV, foil stamping, embossing, and matte/gloss finishes.",
    followUp: "Want to explore our 3D Virtual Customizer in the Catalogue?",
  },
  // RIGID BOXES
  {
    id: "rigid",
    keywords: ["rigid", "magnetic", "lid and base", "hard box", "luxury box", "premium box"],
    answer:
      "Our Rigid Boxes are crafted using high-density chipboard wrapped in premium paper stock.\n\nKey features:\n• Magnetic flap closures\n• Two-piece lid and base options\n• Custom velvet or foam inserts\n• Ideal for jewelry, electronics, and luxury gifts",
  },
  // KRAFT MAILERS
  {
    id: "kraft",
    keywords: ["kraft", "mailer", "shipping box", "corrugated", "shipper", "ecommerce"],
    answer:
      "Kraft Mailers are heavy-duty eco-friendly shipping boxes designed for e-commerce brands.\n\nKey features:\n• High burst strength corrugated walls\n• Easy fold assembly with self-seal strips\n• 100% recyclable unbleached kraft paper\n• Custom exterior and interior printing",
  },
  // COSMETIC & PERFUME BOXES
  {
    id: "cosmetics",
    keywords: ["cosmetic", "perfume", "skincare", "beauty", "bottle", "jar"],
    answer:
      "We engineer specialized packaging for beauty, skincare, and fragrance brands.\n\nFeatures include leak-proof bottle inserts, soft-touch tactile coatings, micro-embossing, and metallic foil accents to make your products shine on store shelves.",
  },
  // SUSTAINABILITY
  {
    id: "sustainability",
    keywords: ["eco", "green", "sustainable", "compost", "recyclable", "environment", "agri", "waste", "carbon", "rice husk", "straw", "planet"],
    answer:
      "Sustainability is at our core.\n\nOur Eco-Board packaging is made from rice husks and wheat straw collected directly from Punjab farms, waste that would otherwise be burned.\n\n• 100% Recyclable\n• Compostable within 90 days\n• Carbon negative production footprint\n• Water based non toxic inks only\n\nWe have diverted over 2,500 tons of agricultural waste and support 1,200 plus regional farmers.",
  },
  // MOQ / MINIMUM ORDER
  {
    id: "moq",
    keywords: ["moq", "minimum", "order", "quantity", "how many", "units", "pieces", "small order"],
    answer:
      "Our Minimum Order Quantities vary by product category:\n\n• Rigid Boxes: 100 to 500 units\n• Kraft Mailers: 250 to 1,000 units\n• Luxury Gift Boxes: 50 to 200 units\n• Eco-Board Boxes: 200 to 800 units\n• Corporate Stationery: 100 to 500 units\n\nFor exact volume discounts and custom orders, chat directly with our team on WhatsApp.",
    followUp: "whatsapp_cta:pricing_query",
  },
  // PRICING / COST
  {
    id: "pricing",
    keywords: ["price", "cost", "rate", "how much", "budget", "expensive", "cheap", "affordable", "quote", "estimation"],
    answer:
      "Pricing depends on box dimensions, material choice, quantity, and finishing effects like foil or spot UV.\n\nWe offer competitive manufacturer direct rates. Contact us on WhatsApp for an instant custom quotation tailored to your specifications.",
    followUp: "whatsapp_cta:get_quote",
  },
  // FINISHES & CUSTOMIZATION
  {
    id: "customization",
    keywords: ["custom", "customize", "branding", "logo", "design", "print", "foil", "emboss", "finish", "texture", "spot uv", "gold", "silver"],
    answer:
      "Everything we manufacture is fully custom to your brand specifications:\n\n• Your exact dimensions, logo, colors, and typography\n• Foil hot stamping in gold, silver, or rose gold\n• Blind embossing and debossing\n• Soft-touch matte or high-gloss lamination\n• Spot UV glossy highlights\n\nTry our 3D Virtual Customizer in the Catalogue section to preview your design in real time.",
  },
  // PROCESS / HOW IT WORKS
  {
    id: "process",
    keywords: ["process", "how", "steps", "timeline", "how long", "delivery", "turnaround", "lead time", "work", "stages"],
    answer:
      "Here is our standard production workflow:\n\nStep 1 Discover and Consult: We review your product dimensions, weight, and brand aesthetic.\nStep 2 Structural Blueprint: Custom dieline layout and 3D mockup.\nStep 3 Prototype Sample: Physical mockup produced within 7 to 10 days.\nStep 4 Production Sign Off: Final approval on print quality, colors, and fit.\nStep 5 Volume Fabrication: Mass production with automated precision.\nStep 6 Quality Check and Delivery: Direct shipping to your warehouse.\n\nStandard production lead time is 15 to 25 business days following sample approval.",
  },
  // SAMPLES / PROTOTYPES
  {
    id: "samples",
    keywords: ["sample", "prototype", "mockup", "test", "try", "see", "physical", "proof"],
    answer:
      "Yes, we produce physical prototype mockups before mass manufacturing so you can verify size, fit, opening mechanism, and material quality in hand.\n\nSample prototypes are ready within 7 to 10 business days. You can request a sample through WhatsApp.",
    followUp: "whatsapp_cta:request_sample",
  },
  // LOCATION / SHIPPING
  {
    id: "location",
    keywords: ["location", "where", "address", "mohali", "india", "ship", "shipping", "deliver", "delivery", "pan india", "international"],
    answer:
      "We are located in Mohali, Punjab, India.\n\nWe provide nationwide shipping across India with secure palletized freight for bulk packaging orders, as well as export shipping options for international clients.",
  },
  // CONTACT / REACH
  {
    id: "contact",
    keywords: ["contact", "reach", "call", "phone", "email", "talk", "speak", "human", "person", "number", "whatsapp"],
    answer:
      "You can contact our sales and engineering team directly:\n\nPhone: +91 70877 78689\nEmail: founder@inthebox.co.in\nHeadquarters: Mohali, Punjab, India\n\nClick below to connect with us instantly on WhatsApp.",
    followUp: "whatsapp_cta:say_hello",
  },
  // TEAM & FOUNDERS
  {
    id: "team",
    keywords: ["team", "founder", "ceo", "who runs", "arpit", "aashvi", "ishan", "people", "leadership"],
    answer:
      "Leadership Team at InTheBox:\n\nLiv Arpit: Founder and CEO with deep engineering expertise in industrial packaging fabrication.\nAashvi Chawla: Managing Director and COO overseeing factory operations and prototyping.\nIshan Kumar: Co-Founder and CMO leading design partnerships and sustainable growth.",
  },
  // DESIGN ASSISTANCE
  {
    id: "design",
    keywords: ["design", "help", "dieline", "artwork", "help me design", "template", "creative"],
    answer:
      "Our internal structural engineering team provides full design assistance. We generate exact dielines and 3D renderings to ensure your artwork aligns perfectly with fold lines and closures.",
    followUp: "Want to try our 3D Virtual Customizer in the Catalogue section?",
  },
];

// Greeting messages
export const GREETINGS = [
  "hello", "hi", "hey", "hii", "namaste", "good morning", "good afternoon", "good evening", "yo", "sup"
];

export const GREETING_RESPONSE = "Welcome to InTheBox.\n\nI am your packaging assistant. I can help you with:\n• Products and Catalogue\n• Pricing and Minimum Order Quantities\n• Sustainable Eco-Board options\n• Production process and timelines\n• Direct team assistance\n\nWhat would you like to know today?";

// WhatsApp pre-filled messages
export const WA_MESSAGES: Record<string, string> = {
  get_quote: "Hi InTheBox Team! I would like to get a quote for custom packaging.",
  pricing_query: "Hi InTheBox Team! I have a question about pricing and MOQs.",
  request_sample: "Hi InTheBox Team! I would like to request a packaging prototype sample.",
  say_hello: "Hi InTheBox Team! I would like to learn more about your packaging solutions.",
  general: "Hi InTheBox Team! I have a question about custom packaging.",
};

export function getWhatsAppUrl(key: string = "general"): string {
  const message = WA_MESSAGES[key] ?? WA_MESSAGES.general;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

// Intent matching engine
export function matchIntent(userInput: string): KnowledgeEntry | null {
  const lower = userInput.toLowerCase().trim();
  
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledge) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore >= 3 ? bestMatch : null;
}

export function isGreeting(input: string): boolean {
  const lower = input.toLowerCase().trim();
  return GREETINGS.some(g => lower === g || lower.startsWith(g + " ") || lower.endsWith(" " + g));
}

