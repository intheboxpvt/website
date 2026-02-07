import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, MessageCircle, Linkedin } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Services & Process", href: "/services" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/inthebox.co.in/", label: "Instagram" },
    { icon: MessageCircle, href: "https://wa.me/917087778689", label: "WhatsApp" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/intheboxpvt/", label: "LinkedIn" },
  ];

  return (
    <footer className="footer-royal text-ivory">
      {/* Gold divider line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold-metallic to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <img 
                src="/assets/logo.png" 
                alt="InTheBox Logo" 
                className="h-24 w-auto brightness-0 invert"
              />
            </Link>
            
            <p className="font-sans text-ivory/80 leading-relaxed max-w-md mb-8">
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
                  className="w-10 h-10 rounded-lg bg-ivory/10 flex items-center justify-center text-ivory/80 hover:bg-gold-metallic hover:text-royal-purple transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans text-sm tracking-widest uppercase text-gold-metallic mb-6 font-semibold">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-sans text-ivory/80 hover:text-gold-metallic transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-sans text-sm tracking-widest uppercase text-gold-metallic mb-6 font-semibold">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=Mohali,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 font-sans text-ivory/80 hover:text-gold-metallic transition-colors"
                >
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-gold-metallic" />
                  <span>Mohali, India</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+917087778689"
                  className="flex items-center gap-3 font-sans text-ivory/80 hover:text-gold-metallic transition-colors"
                >
                  <Phone className="w-5 h-5 text-gold-metallic" />
                  <span>+91 70877 78689</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:founder@inthebox.co.in"
                  className="flex items-center gap-3 font-sans text-ivory/80 hover:text-gold-metallic transition-colors"
                >
                  <Mail className="w-5 h-5 text-gold-metallic" />
                  <span>founder@inthebox.co.in</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-ivory/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-ivory/60">
            © {new Date().getFullYear()} InTheBox. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-sm text-ivory/60 hover:text-gold-metallic transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-sans text-sm text-ivory/60 hover:text-gold-metallic transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;