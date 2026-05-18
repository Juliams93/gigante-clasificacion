import { motion } from 'motion/react';

export function Sponsors() {
  const sponsors = [
    { name: 'Comunitat de l\'Esport', category: 'Patrocinador Principal' },
    { name: 'Diputació de Castelló', category: 'Patrocinador Oro' },
    { name: 'Nutrinovex', category: 'Patrocinador Oro' },
    { name: 'Faster', category: 'Patrocinador Plata' },
    { name: 'L\'Alcora Ajuntament', category: 'Patrocinador Plata' },
    { name: 'Expo Jamar', category: 'Patrocinador Bronce' },
    { name: 'Coca-Cola', category: 'Patrocinador Bronce' },
    { name: 'Ayuntamiento Sant Joan de Moró', category: 'Patrocinador Bronce' },
    { name: 'Caja Rural de Alcora', category: 'Patrocinador Bronce' },
    { name: 'Y3 Cicles AB', category: 'Patrocinador Bronce' },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Sponsors
          </h2>
          <p className="text-xl text-gray-600">
            Gracias a quienes hacen posible Gigante de Piedra
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 flex flex-col items-center justify-center hover:shadow-xl transition-shadow border-2 border-gray-100"
            >
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {sponsor.name}
              </div>
              <div className="text-xs text-gray-500 text-center">
                {sponsor.category}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            ¿Quieres ser patrocinador de Gigante de Piedra 2026?
          </p>
          <a
            href="mailto:sponsors@ganpedi.com"
            className="text-red-600 font-semibold hover:text-red-700 underline text-lg"
          >
            Contáctanos
          </a>
        </motion.div>
      </div>
    </section>
  );
}