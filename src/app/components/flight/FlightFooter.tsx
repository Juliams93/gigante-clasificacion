import { Plane, Mail, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useLanguage, translations } from '../../lib/i18n';
import heroLogo from "../../../assets/1901e02e3facbb21b28df6307491488cbdbf0799.png";

export function FlightFooter() {
  const { language } = useLanguage();
  const t = translations[language];

  const footerLinks = {
    services: [
      { name: t.services.flight.title, href: '#servicios' },
      { name: t.services.training.title, href: '#servicios' },
      { name: t.services.manufacturing.title, href: '#servicios' },
    ],
    company: [
      { name: t.nav.experience, href: '#experiencia' },
      { name: t.nav.gallery, href: '#galeria' },
      { name: t.nav.contact, href: '#contacto' },
    ],
    legal: [
      { name: 'Política de Privacidad', href: '#' },
      { name: 'Términos de Servicio', href: '#' },
      { name: 'Cookies', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img src={heroLogo} alt="Fénix Flight" className="h-12" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-gray-800 hover:bg-brand p-2.5 rounded-lg transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.services}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-brand transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.company}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-brand transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.legal}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-brand transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-bold text-xl mb-2">{t.footer.newsletter}</h3>
            <p className="text-gray-400 mb-4 text-sm">{t.footer.newsletterSub}</p>
            <div className="flex">
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:border-brand w-full md:w-64"
              />
              <button className="bg-brand hover:bg-brand-dark px-6 py-2 rounded-r-lg font-semibold transition-all duration-300 flex items-center">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              © 2025 Fénix Flight. {t.footer.rights}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Plane size={16} className="text-brand" />
                <span>{t.footer.location}</span>
              </div>
              <span>•</span>
              <span>{t.footer.simulator}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
