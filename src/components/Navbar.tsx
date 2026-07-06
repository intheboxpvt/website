import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Services & Process", href: "/services" },
    { label: "Sustainability", href: "/sustainability" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const isDarkBg = scrolled || location.pathname !== "/";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-black/5 shadow-sm py-1.5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo - Black Monochrome */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/logo.png"
              alt="InTheBox Logo"
              className="h-10 sm:h-12 md:h-12 lg:h-14 w-auto max-w-none lg:max-w-[280px] object-contain brightness-0"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`font-sans text-sm font-medium tracking-tight transition-all duration-300 relative py-2 ${isActive(link.href)
                    ? "text-[#1c0f24] font-semibold"
                    : "text-[#1c0f24]/60 hover:text-[#1c0f24]"
                  }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"></span>
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
              className="btn-premium-gold text-xs px-5 py-2 min-h-0 h-9"
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#1c0f24] p-2 hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Full-screen Overlay */}
        {isOpen && (
          <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#1c0f24] z-40 flex flex-col justify-center px-8 lg:hidden animate-fade-in">
            {/* Top Bar inside menu to allow close */}
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, i) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${i * 100}ms` }}
                  className={`font-sans text-2xl tracking-wider uppercase transition-colors py-2 animate-fade-up ${isActive(link.href)
                      ? "text-accent font-semibold"
                      : "text-white/70 hover:text-white"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-8 mx-auto w-full max-w-xs animate-fade-up" style={{ animationDelay: '600ms' }}>
                <Button
                  onClick={() => { setIsOpen(false); window.dispatchEvent(new CustomEvent("open-quote-modal")); }}
                  className="w-full btn-premium-gold py-4 text-xs uppercase tracking-widest"
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;