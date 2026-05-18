import { motion } from 'motion/react';
import { Mountain, Bike, MapPin, Clock, Users, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function EventInfo() {
  const stats = [
    { icon: Users, value: '500+', label: 'Participantes' },
    { icon: Mountain, value: '75km', label: 'Recorrido máximo' },
    { icon: Clock, value: '3-6h', label: 'Duración estimada' },
    { icon: Award, value: 'Premios', label: 'Para los mejores' },
  ];

  const details = [
    {
      icon: MapPin,
      title: 'Ubicación',
      description: 'Sierra de Guadarrama, Madrid, España',
    },
    {
      icon: Clock,
      title: 'Hora de inicio',
      description: 'Salida a las 09:00 AM',
    },
    {
      icon: Bike,
      title: 'Categorías',
      description: 'Gigante, Small y Trail para todos los niveles',
    },
  ];

  return (
    <section id="evento" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sobre el Evento
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gigante de Piedra es más que una carrera, es una experiencia única en las montañas españolas.
            Desafía tus límites y disfruta del paisaje más espectacular.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-xl transition-shadow border-2">
                  <CardContent className="pt-6 pb-6">
                    <Icon className="w-12 h-12 mx-auto mb-3 text-red-600" />
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-3 gap-8">
          {details.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">
                          {detail.title}
                        </h3>
                        <p className="text-gray-600">
                          {detail.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}