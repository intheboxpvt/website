import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "917087778689";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-[#1d0a27]/95 border border-white/10 hover:border-accent/40 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20"></div>
        
        {/* Icon */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-white group-hover:text-accent transition-colors duration-300">
          <MessageCircle className="w-4 h-4" />
        </div>
      </div>
      
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors duration-300 pr-1">
        Chat
      </span>
    </a>
  );
};

export default WhatsAppButton;