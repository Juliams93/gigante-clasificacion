import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage, translations } from '../../lib/i18n';

export function FlightTestimonials() {
  const { language } = useLanguage();
  const t = translations[language];

  // Solo un testimonio
  const testimonial = {
    name: 'Jesus Canario',
    role: 'Cliente',
    text: 'Simulador 737 completo con cabina y todos los elementos interiores',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
  };

  return (
    <section id="testimonios" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-brand opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-40 w-96 h-96 bg-brand opacity-5 rounded-full blur-3xl"></div>
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
              {t.testimonials.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.testimonials.title}
            <span className="block text-brand">{t.testimonials.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Single Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-white rounded-3xl p-10 shadow-2xl border-2 border-gray-100 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 left-10">
              <div className="w-16 h-16 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center shadow-xl">
                <Quote className="text-white" size={32} />
              </div>
            </div>

            {/* Content */}
            <div className="mt-6">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-brand fill-brand" size={24} />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center italic">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-dark rounded-full blur-md opacity-50"></div>
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="relative w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand bg-opacity-10 mb-4">
              <Star className="text-brand fill-brand" size={28} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
            <div className="text-gray-600 text-sm">+200 reseñas</div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand bg-opacity-10 mb-4">
              <svg className="text-brand" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">+5.000</div>
            <div className="text-gray-600 text-sm">Vuelos completados</div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand bg-opacity-10 mb-4">
              <svg className="text-brand" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
            <div className="text-gray-600 text-sm">Clientes satisfechos</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}