import { motion } from "motion/react";
import {
  Plane,
  GraduationCap,
  Wrench,
  ArrowRight,
  Check,
  Euro,
  Target,
  BookOpen,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { useLanguage, translations } from "../../lib/i18n";

interface FlightServicesProps {
  onBookNow?: () => void;
}

export function FlightServices({ onBookNow }: FlightServicesProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const handleServiceAction = (index: number) => {
    if (index === 0) {
      if (onBookNow) onBookNow();
      else scrollToSection("contacto");
      return;
    }

    scrollToSection("contacto");
  };

  const services = [
    {
      icon: Plane,
      iconBg: "var(--color-brand)",
      title: t.services.flight.title,
      description: t.services.flight.description,
      features: t.services.flight.features,
      cta: t.services.flight.cta,
      popular: true,
    },
    {
      icon: GraduationCap,
      iconBg: "var(--color-brand)",
      title: t.services.training.title,
      description: t.services.training.description,
      features: t.services.training.features,
      cta: t.services.training.cta,
      popular: false,
    },
    {
      icon: Wrench,
      iconBg: "var(--color-brand)",
      title: t.services.manufacturing.title,
      description: t.services.manufacturing.description,
      features: t.services.manufacturing.features,
      cta: t.services.manufacturing.cta,
      popular: false,
    },
  ];

  const additionalServices = [
    {
      icon: Euro,
      title: t.services.additional[0].title,
      description: t.services.additional[0].description,
      gradient: "from-brand to-brand-dark", // Coral principal
    },
    {
      icon: Target,
      title: t.services.additional[1].title,
      description: t.services.additional[1].description,
      gradient: "from-[#E88B82] to-brand", // Coral claro
    },
    {
      icon: BookOpen,
      title: t.services.additional[2].title,
      description: t.services.additional[2].description,
      gradient: "from-[#B85850] to-[#A54A43]", // Coral oscuro
    },
    {
      icon: Users,
      title: t.services.additional[3].title,
      description: t.services.additional[3].description,
      gradient: "from-[#F4A599] to-[#E88B82]", // Coral muy claro
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
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
              {t.services.badge}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.services.title}
            <span className="block text-brand">
              {t.services.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Main Service Cards - All same size */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-brand text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                    {t.services.flight.popular}
                  </div>
                </div>
              )}

              <div
                className={`bg-white rounded-2xl p-8 h-full transition-all duration-300 ${
                  service.popular
                    ? "border-2 border-brand shadow-2xl"
                    : "border-2 border-gray-100 hover:border-brand hover:shadow-xl"
                }`}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg"
                  style={{ backgroundColor: service.iconBg }}
                >
                  <service.icon className="text-white" size={32} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[40px]">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 min-h-[140px]">
                  {service.features.map((feature) => (
                    <li
                      key={`${service.title}-${feature}`}
                      className="flex items-start space-x-3 text-gray-700 text-sm"
                    >
                      <div className="w-5 h-5 rounded-sm bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="text-brand" size={12} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handleServiceAction(index)}
                  className={`w-full font-bold rounded-lg group transition-all ${
                    service.popular
                      ? "bg-brand hover:bg-brand-dark text-white shadow-lg"
                      : "bg-brand hover:bg-brand-dark text-white"
                  }`}
                >
                  {service.cta}
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services - Circle Icons */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.title}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${service.gradient} mb-4 mx-auto shadow-2xl group-hover:shadow-3xl transition-all duration-300`}
              >
                <service.icon className="text-white drop-shadow-lg" size={48} />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-2">
                {service.title}
              </h4>
              <p className="text-gray-600 text-xs leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
