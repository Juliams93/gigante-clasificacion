import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  const quickLinks = [
    { name: 'Sobre Nosotros', href: '#evento' },
    { name: 'Modalidades', href: '#modalidades' },
    { name: 'Galería', href: '#galeria' },
    { name: 'FAQ', href: '#faq' },
  ];

  const legalLinks = [
    { name: 'Aviso Legal', href: '#' },
    { name: 'Política de Privacidad', href: '#' },
    { name: 'Política de Cookies', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">
              Suscríbete a nuestro newsletter
            </h3>
            <p className="text-gray-400 mb-6">
              Recibe noticias, consejos y ofertas exclusivas de Gigante de Piedra
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Tu email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button className="bg-red-600 hover:bg-red-700 whitespace-nowrap">
                Suscribirme
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-2xl font-bold mb-4">GIGANTE DE PIEDRA</h3>
            <p className="text-gray-400 mb-4">
              El evento de ciclismo de montaña más emocionante de España. 
              Únete a nosotros y vive la aventura.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-gray-800 hover:bg-red-600 p-2 rounded-full transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <span>Sierra de Guadarrama<br />Madrid, España</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={20} className="flex-shrink-0" />
                <a href="mailto:info@ganpedi.com" className="hover:text-red-500 transition-colors">
                  info@ganpedi.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={20} className="flex-shrink-0" />
                <a href="tel:+34912345678" className="hover:text-red-500 transition-colors">
                  +34 912 345 678
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2026 Gigante de Piedra. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-sm">
              Hecho con ❤️ para los amantes del ciclismo de montaña
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}