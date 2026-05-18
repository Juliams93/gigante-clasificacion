import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['inicio', 'evento', 'modalidades', 'galeria', 'testimonios', 'castellon', 'faq'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 140; // Adjusted for two-row menu
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const mainNavItems = [
    { id: 'modalidades', label: 'Gigante', color: 'text-white' },
    { id: 'modalidades', label: 'Small', color: 'text-red-500' },
    { id: 'modalidades', label: 'Trail Gigante del Castillo', color: 'text-white' },
    { id: 'castellon', label: 'Entorno', color: 'text-white' },
  ];

  const secondaryNavItems = [
    { id: 'recorrido', label: 'Recorrido' },
    { id: 'reglamento', label: 'Reglamento' },
    { id: 'info', label: 'Información general' },
    { id: 'clasificaciones', label: 'Clasificaciones' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      {/* Top bar - Black background with main navigation */}
      <div className="bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('inicio')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://images.unsplash.com/photo-1570665253733-063428674dea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsaXN0JTIwaGVsbWV0JTIwZ2VhciUyMGNsb3NldXB8ZW58MXx8fHwxNzc0MzY4NjY1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gigante de Piedra Logo"
                className="h-10 w-10 rounded-full object-cover"
              />
            </button>

            {/* Desktop Main Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {mainNavItems.map((item, index) => (
                <button
                  key={`${item.id}-${index}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`${item.color} hover:opacity-80 transition-opacity font-medium`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Second bar - Red background with secondary navigation */}
      <div className="bg-red-600">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center justify-center space-x-8 h-12">
            {secondaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id === 'info' ? 'evento' : item.id)}
                className="text-white hover:text-white/80 transition-colors text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {mainNavItems.map((item, index) => (
              <button
                key={`${item.id}-mobile-${index}`}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-2 ${item.color} hover:bg-white/5 rounded-md transition-colors font-medium`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-gray-800 my-2 pt-2">
              {secondaryNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id === 'info' ? 'evento' : item.id)}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-white/5 rounded-md transition-colors text-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}