import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin, Gift } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useLanguage, translations } from '../../lib/i18n';

export function FlightCTA() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="contacto" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decorative */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Info */}
            <div>
              <div className="mb-6">
                <span className="text-brand font-bold text-sm tracking-wider uppercase">
                  {t.contact.badge}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {t.contact.title}
                <span className="block text-brand">{t.contact.titleHighlight}</span>
              </h2>

              <p className="text-gray-300 text-lg mb-8">
                {t.contact.subtitle}
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="bg-brand p-3 rounded-lg flex-shrink-0">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">{t.contact.call}</div>
                    <div className="text-white font-semibold">+34 960 XXX XXX</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="bg-brand p-3 rounded-lg flex-shrink-0">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">{t.contact.email}</div>
                    <div className="text-white font-semibold">fenixfli@fenixflight.es</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="bg-brand p-3 rounded-lg flex-shrink-0">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">{t.contact.location}</div>
                    <div className="text-white font-semibold">Valencia, España</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="bg-brand text-white text-center font-bold py-3 rounded-lg mb-6">
                {t.contact.formTitle}
              </div>

              <form className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder={t.contact.name}
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder={t.contact.subject}
                    className="w-full"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder={t.contact.message}
                    rows={4}
                    className="w-full resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-dark text-white font-bold h-12 rounded-lg shadow-lg group"
                >
                  <Send className="mr-2" size={18} />
                  {t.contact.send}
                </Button>
              </form>
            </div>
          </div>

          {/* Gift Section */}
          <motion.div
            className="mt-20 bg-gradient-to-r from-brand to-brand-dark rounded-2xl p-12 text-center shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Gift className="mx-auto mb-4 text-white" size={48} />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.contact.giftTitle}
            </h3>
            <p className="text-white/90 text-lg mb-6">
              {t.contact.giftSubtitle}
            </p>
            <Button
              size="lg"
              className="bg-white text-brand hover:bg-gray-100 font-bold px-10 py-6 rounded-lg shadow-xl"
            >
              {t.contact.giftCta}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}