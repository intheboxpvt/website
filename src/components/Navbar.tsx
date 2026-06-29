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
    { label: "Contact", href: "/contact" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isDarkBg 
          ? "bg-[#050505]/85 backdrop-blur-md border-white/8 shadow-2xl py-2" 
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo - Inverted for dark canvas */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/assets/logo.png" 
              alt="InTheBox Logo" 
              className="h-16 sm:h-[4.5rem] md:h-16 lg:h-20 w-auto max-w-none lg:max-w-[320px] object-contain brightness-0 invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`font-sans text-sm font-medium tracking-tight transition-all duration-300 relative py-2 ${
                  isActive(link.href) 
                    ? "text-white font-semibold" 
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-white"></span>
                )}
              </Link>
            ))}
          </div>
 
          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/contact">
              <Button className="bg-white hover:bg-white/90 text-black font-sans text-xs font-semibold px-6 py-2.5 rounded-full transition-all duration-300">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#FFFFFF] p-2 hover:bg-white/5 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Full-screen Overlay */}
        {isOpen && (
          <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#050505]/95 z-40 flex flex-col justify-center px-8 lg:hidden animate-fade-in">
            {/* Top Bar inside menu to allow close */}
            <div className="absolute top-6 right-6">
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#FFFFFF] p-2 hover:bg-white/5 rounded-full transition-colors"
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
                  className={`font-sans text-2xl tracking-wider uppercase transition-colors py-2 animate-fade-up ${
                    isActive(link.href) 
                      ? "text-[#C8A15A] font-semibold" 
                      : "text-[#A1A1AA] hover:text-[#FFFFFF]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setIsOpen(false)} className="mt-8 mx-auto w-full max-w-xs animate-fade-up" style={{ animationDelay: '600ms' }}>
                <Button variant="gold" size="lg" className="w-full bg-[#C8A15A] hover:bg-[#C8A15A]/90 text-[#050505] font-sans text-xs tracking-widest uppercase font-medium py-6">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;