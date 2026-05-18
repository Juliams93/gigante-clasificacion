import { motion } from 'motion/react';
import { MapPin, Mountain, Flag } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function RouteMap() {
  const routes = [
    {
      name: 'GIGANTE',
      color: 'bg-red-600',
      points: [
        { km: 0, name: 'Salida - Puerto de Navacerrada', elevation: '1,860m' },
        { km: 15, name: 'Primer avituallamiento', elevation: '1,650m' },
        { km: 30, name: 'Alto de la Morcuera', elevation: '1,796m' },
        { km: 45, name: 'Segundo avituallamiento', elevation: '1,420m' },
        { km: 60, name: 'Paso de Cotos', elevation: '1,830m' },
        { km: 75, name: 'Meta - Puerto de Navacerrada', elevation: '1,860m' },
      ],
    },
    {
      name: 'SMALL',
      color: 'bg-blue-600',
      points: [
        { km: 0, name: 'Salida - Puerto de Navacerrada', elevation: '1,860m' },
        { km: 15, name: 'Primer avituallamiento', elevation: '1,650m' },
        { km: 30, name: 'Alto de la Morcuera', elevation: '1,796m' },
        { km: 45, name: 'Meta - Puerto de Navacerrada', elevation: '1,860m' },
      ],
    },
    {
      name: 'TRAIL',
      color: 'bg-green-600',
      points: [
        { km: 0, name: 'Salida - Puerto de Navacerrada', elevation: '1,860m' },
        { km: 12, name: 'Mirador panorámico', elevation: '1,750m' },
        { km: 25, name: 'Meta - Puerto de Navacerrada', elevation: '1,860m' },
      ],
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Recorridos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce los puntos clave de cada modalidad
          </p>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-200"
        >
          <div className="relative bg-gradient-to-br from-green-100 to-blue-100 aspect-video flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1683041132892-0fe990b3afc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHNwYWluJTIwbmF0dXJlfGVufDF8fHx8MTc3NDM2ODY2NHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Sierra de Guadarrama"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <Mountain size={64} className="mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">Sierra de Guadarrama</h3>
                <p className="text-lg">Madrid, España</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Route Details */}
        <div className="space-y-8">
          {routes.map((route, routeIndex) => (
            <motion.div
              key={route.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: routeIndex * 0.2 }}
            >
              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`${route.color} text-white px-4 py-2 rounded-lg font-bold text-lg`}>
                      {route.name}
                    </div>
                    <span className="text-gray-600">
                      {route.points.length} puntos de control
                    </span>
                  </div>

                  <div className="space-y-4">
                    {route.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          {pointIndex === 0 ? (
                            <div className="bg-green-100 p-2 rounded-full">
                              <Flag className="text-green-600" size={20} />
                            </div>
                          ) : pointIndex === route.points.length - 1 ? (
                            <div className="bg-red-100 p-2 rounded-full">
                              <Flag className="text-red-600" size={20} />
                            </div>
                          ) : (
                            <div className="bg-blue-100 p-2 rounded-full">
                              <MapPin className="text-blue-600" size={20} />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 border-l-2 border-gray-200 pl-6 pb-4">
                          <div className="flex items-baseline justify-between mb-1">
                            <h4 className="font-bold text-gray-900">
                              {point.name}
                            </h4>
                            <span className={`${route.color} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                              KM {point.km}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600 text-sm">
                            <Mountain size={16} />
                            <span>Altitud: {point.elevation}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
