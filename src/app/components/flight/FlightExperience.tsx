import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage, translations } from '../../lib/i18n';

export function FlightExperience() {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="experiencia" className="pt-32 pb-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Image Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1617408779038-519491bd1a9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrcGl0JTIwYWlycGxhbmUlMjBwaWxvdCUyMHZpZXd8ZW58MXx8fHwxNzc0NDQ5NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Cabina Airbus A320"
                className="w-full h-[500px] object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg">
                <div className="text-[#B85C50] font-bold text-2xl">100%</div>
                <div className="text-gray-700 text-sm font-semibold">{t.why.features[0].statLabel}</div>
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span className="text-[#B85C50] font-bold text-sm tracking-wider uppercase">
                {t.experience.badge}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t.experience.title}
              <span className="text-[#B85C50]">{t.experience.titleHighlight}</span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t.experience.description}
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {t.experience.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#B85C50] flex items-center justify-center">
                    <Check className="text-white" size={14} />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => scrollToSection('contacto')}
              size="lg"
              className="bg-[#B85C50] hover:bg-[#a04f43] text-white font-bold px-8 py-6 rounded-lg shadow-lg"
            >
              {t.experience.cta}
            </Button>
          </motion.div>
        </div>

        {/* Emotional Quote */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 border border-gray-200">
            <p className="text-2xl md:text-3xl text-gray-800 font-light leading-relaxed italic">
              {t.experience.quote}
              <span className="text-[#B85C50] font-semibold">{t.experience.quoteHighlight}</span>
              {t.experience.quoteEnd}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
