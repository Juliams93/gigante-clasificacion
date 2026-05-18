import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Carlos Martínez',
      location: 'Madrid',
      category: 'Gigante 2025',
      rating: 5,
      text: 'Una experiencia inolvidable. El recorrido es desafiante pero las vistas son espectaculares. La organización fue impecable y el ambiente increíble. ¡Volveré sin duda!',
      initials: 'CM',
    },
    {
      name: 'Laura García',
      location: 'Barcelona',
      category: 'Small 2025',
      rating: 5,
      text: 'Mi primera carrera de MTB y no pudo ser mejor. El trazado de Small fue perfecto para mi nivel, y el apoyo del equipo de organización me hizo sentir segura todo el tiempo.',
      initials: 'LG',
    },
    {
      name: 'Javier Ruiz',
      location: 'Valencia',
      category: 'Trail 2025',
      rating: 5,
      text: 'Perfecto para ir en familia. Disfrutamos del paisaje sin la presión de una competición extrema. Los niños también pudieron participar. ¡Experiencia 10/10!',
      initials: 'JR',
    },
    {
      name: 'Ana López',
      location: 'Sevilla',
      category: 'Gigante del Castillo 2024',
      rating: 5,
      text: 'He participado en muchas carreras, pero Gigante de Piedra es diferente. La pasión de los organizadores se nota en cada detalle. Las zonas de avituallamiento estaban perfectamente ubicadas.',
      initials: 'AL',
    },
    {
      name: 'Miguel Sánchez',
      location: 'Bilbao',
      category: 'Small 2024',
      rating: 5,
      text: 'Excelente relación calidad-precio. El recorrido está muy bien señalizado y la medalla finisher es preciosa. Ya estoy entrenando para la próxima edición.',
      initials: 'MS',
    },
    {
      name: 'Isabel Torres',
      location: 'Zaragoza',
      category: 'Trail 2025',
      rating: 5,
      text: 'Como principiante estaba nerviosa, pero el ambiente fue súper acogedor. Todos se animan mutuamente. Los voluntarios son encantadores. ¡Gracias Gigante de Piedra!',
      initials: 'IT',
    },
  ];

  return (
    <section id="testimonios" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros participantes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Miles de ciclistas ya han vivido la experiencia Gigante de Piedra
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow border-2">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <Quote className="text-red-600 opacity-20" size={40} />
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="text-yellow-400 fill-yellow-400"
                          size={16}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center space-x-3 pt-4 border-t">
                    <Avatar className="bg-red-600 text-white">
                      <AvatarFallback className="bg-red-600 text-white font-bold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.location} • {testimonial.category}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
            <Star className="fill-green-600 text-green-600" size={20} />
            <span>4.9/5 estrellas basado en 1,250+ opiniones</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}