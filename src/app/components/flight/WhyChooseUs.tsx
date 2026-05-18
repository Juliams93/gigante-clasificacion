import { motion } from 'motion/react';
import { Shield, Award, MapPin, Sparkles } from 'lucide-react';
import { useLanguage, translations } from '../../lib/i18n';

export function WhyChooseUs() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      icon: Sparkles,
      title: t.why.features[0].title,
      description: t.why.features[0].description,
      stat: t.why.features[0].stat,
      statLabel: t.why.features[0].statLabel
    },
    {
      icon: Award,
      title: t.why.features[1].title,
      description: t.why.features[1].description,
      stat: t.why.features[1].stat,
      statLabel: t.why.features[1].statLabel
    },
    {
      icon: Shield,
      title: t.why.features[2].title,
      description: t.why.features[2].description,
      stat: t.why.features[2].stat,
      statLabel: t.why.features[2].statLabel
    },
    {
      icon: MapPin,
      title: t.why.features[3].title,
      description: t.why.features[3].description,
      stat: t.why.features[3].stat,
      statLabel: t.why.features[3].statLabel
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <span className="text-brand font-bold text-sm tracking-wider uppercase">
              {t.why.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.why.title}
            <span className="block text-brand">{t.why.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.why.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="group bg-white border-2 border-gray-100 rounded-xl p-6 h-full hover:border-brand hover:shadow-xl transition-all duration-300">
                {/* Icon with stat */}
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-brand w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <feature.icon className="text-white" size={28} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-brand">{feature.stat}</div>
                    <div className="text-xs text-gray-500 font-semibold">{feature.statLabel}</div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          className="mt-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-brand to-brand-dark rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {t.why.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-white/90 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}