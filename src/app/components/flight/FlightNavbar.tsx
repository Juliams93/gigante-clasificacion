import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useLanguage, translations } from "../../lib/i18n";
import heroLogo from "../../../assets/fenixflight-logo.png";

interface FlightNavbarProps {
  onBookNow?: () => void;
}

export function FlightNavbar({ onBookNow }: FlightNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "servicios", label: t.nav.services },
    {
      id: "clasificacion",
      label: language === "es" ? "CLASIFICACION" : "RACE LIVE",
    },
    { id: "precios", label: "PRECIOS" },
    { id: "experiencia", label: t.nav.experience },
    { id: "galeria", label: t.nav.gallery },
    { id: "testimonios", label: t.nav.testimonials },
    { id: "contacto", label: t.nav.contact },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center hover:opacity-80 transition-opacity -ml-4"
          >
            <img src={heroLogo} alt="Fénix Flight" className="h-16" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-medium text-sm tracking-wide transition-colors text-gray-700 hover:text-brand"
              >
                {item.label}
              </button>
            ))}

            {/* Language Selector */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage("es")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  language === "es"
                    ? "bg-brand text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  language === "en"
                    ? "bg-brand text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                EN
              </button>
            </div>

            <Button
              onClick={() =>
                onBookNow ? onBookNow() : scrollToSection("contacto")
              }
              className="bg-brand hover:bg-brand-dark text-white font-bold rounded-md shadow-lg"
            >
              {t.nav.book}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-brand hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Language Selector */}
            <div className="flex items-center justify-center space-x-2 bg-gray-100 rounded-lg p-2">
              <button
                onClick={() => setLanguage("es")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  language === "es" ? "bg-brand text-white" : "text-gray-600"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  language === "en" ? "bg-brand text-white" : "text-gray-600"
                }`}
              >
                EN
              </button>
            </div>

            <Button
              onClick={() =>
                onBookNow ? onBookNow() : scrollToSection("contacto")
              }
              className="w-full bg-brand hover:bg-brand-dark text-white font-bold"
            >
              {t.nav.book}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
