import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage, translations } from '../../lib/i18n';

export function WhatsAppButton() {
  const { language } = useLanguage();
  const t = translations[language];

  const phoneNumber = '34960000000'; // Reemplazar con el número real
  const message = encodeURIComponent(t.whatsapp.message);

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse animation */}
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
      
      {/* Main button */}
      <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300">
        <MessageCircle size={32} className="drop-shadow-lg" />
      </div>

      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold shadow-xl">
          {t.whatsapp.tooltip}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      </div>
    </motion.a>
  );
}
