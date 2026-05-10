import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "917087778689";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="relative">
        {/* Gold ring */}
        <div className="absolute -inset-1 bg-gradient-to-br from-gold-metallic to-gold-dark rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-emerald rounded-full animate-ping opacity-20"></div>
        
        {/* Button */}
        <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald to-forest-green rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
          <MessageCircle className="w-6 h-6 text-ivory" fill="currentColor" />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-royal-purple text-ivory text-xs font-sans font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            Chat with us!
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-royal-purple"></div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;