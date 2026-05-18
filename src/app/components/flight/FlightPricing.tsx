import { motion } from 'motion/react';
import { Clock, Euro, Gift, Calendar, Check, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage, translations } from '../../lib/i18n';

interface FlightPricingProps {
  onBookNow: () => void;
}

export function FlightPricing({ onBookNow }: FlightPricingProps) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="precios" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <span className="text-brand font-bold text-sm tracking-wider uppercase">
              {t.pricing.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.pricing.title} <span className="text-brand">{t.pricing.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Precio por Hora */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:border-brand transition-all duration-300 relative overflow-hidden group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand bg-opacity-10 mb-6">
                <Clock className="text-brand" size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.pricing.hourly.title}</h3>
              <p className="text-gray-600 mb-6">{t.pricing.hourly.description}</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-6xl font-bold text-gray-900">60</span>
                <span className="text-2xl text-gray-600 ml-2">€</span>
                <span className="text-gray-500 ml-3">/ {t.pricing.hourly.unit}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {t.pricing.hourly.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-brand mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={onBookNow}
                className="w-full bg-brand hover:bg-brand-dark text-white py-6 text-lg font-semibold rounded-xl transition-all duration-300 group-hover:shadow-2xl"
              >
                <Calendar className="mr-2" size={20} />
                {t.pricing.hourly.cta}
              </Button>
            </div>
          </motion.div>

          {/* Precio de Reserva */}
          <motion.div
            className="bg-gradient-to-br from-brand to-brand-dark rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Popular Badge */}
            <div className="absolute top-6 right-6">
              <div className="bg-white text-brand px-4 py-1 rounded-full text-xs font-bold flex items-center">
                <Sparkles size={14} className="mr-1" />
                {t.pricing.reservation.badge}
              </div>
            </div>

            <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -ml-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white bg-opacity-20 mb-6">
                <Euro className="text-white" size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{t.pricing.reservation.title}</h3>
              <p className="text-white text-opacity-90 mb-6">{t.pricing.reservation.description}</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-6xl font-bold text-white">5</span>
                <span className="text-2xl text-white ml-2">€</span>
                <span className="text-white text-opacity-80 ml-3">/ {t.pricing.reservation.unit}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {t.pricing.reservation.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-white mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={onBookNow}
                className="w-full bg-white text-brand hover:bg-gray-100 py-6 text-lg font-semibold rounded-xl transition-all duration-300 group-hover:shadow-2xl"
              >
                <Gift className="mr-2" size={20} />
                {t.pricing.reservation.cta}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Info adicional */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-blue-50 border-l-4 border-brand rounded-lg p-6">
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong className="text-brand">ℹ️ {t.pricing.note.title}</strong> {t.pricing.note.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
