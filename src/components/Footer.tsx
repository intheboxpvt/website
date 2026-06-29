import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, MessageCircle, Linkedin } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Services & Process", href: "/services" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/inthebox.co.in/", label: "Instagram" },
    { icon: MessageCircle, href: "https://wa.me/917087778689", label: "WhatsApp" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/intheboxpvt/", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#1d0a27] text-white border-t border-white/10 relative overflow-hidden">
      {/* Full-width brand showcase image banner at the top of the footer */}
      <div className="w-full h-[180px] md:h-[260px] overflow-hidden relative select-none border-b border-white/10">
        <img 
          src="/products/footer-image.png" 
          alt="InTheBox Production Showcase" 
          className="w-full h-full object-cover opacity-85 transition-transform duration-[2000ms] hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1d0a27]/30 to-[#1d0a27]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 lg:py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <img 
                src="/assets/logo.png" 
                alt="InTheBox Logo" 
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            
            <p className="font-sans text-sm text-white/60 leading-relaxed max-w-md mb-8">
              Premium custom packaging solutions that help brands stand out, 
              sell more, and create memorable unboxing experiences.
            </p>
 
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-black transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
 
          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-xs tracking-wider uppercase text-white/40 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Contact Info */}
          <div>
            <h3 className="font-mono text-xs tracking-wider uppercase text-white/40 mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=Mohali,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 font-sans text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-1 text-white/40" />
                  <span>Mohali, India</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+917087778689"
                  className="flex items-center gap-3 font-sans text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-white/40" />
                  <span>+91 70877 78689</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:founder@inthebox.co.in"
                  className="flex items-center gap-3 font-sans text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-white/40" />
                  <span>founder@inthebox.co.in</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
 
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-white/40">
            © {new Date().getFullYear()} InTheBox. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="font-mono text-xs text-white/40 hover:text-white transition-colors duration-300">
              Sustainability
            </Link>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
              className="font-mono text-xs text-white/40 hover:text-white transition-colors duration-300"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;