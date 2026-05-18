import { motion } from 'motion/react';
import { Check, MapPin, Clock, TrendingUp, Mountain, Bike } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Modalities() {
  const modalities = [
    {
      name: 'GIGANTE',
      distance: '75',
      unit: 'km',
      elevation: '2,500',
      elevUnit: 'm+',
      color: 'red',
      description: 'El desafío definitivo',
      image: 'https://images.unsplash.com/photo-1771151581599-4f17ce6e5317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjBkb3duaGlsbCUyMGFjdGlvbnxlbnwxfHx8fDE3NzQzNjk0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'SMALL',
      distance: '45',
      unit: 'km',
      elevation: '1,200',
      elevUnit: 'm+',
      color: 'red',
      description: 'Reto intermedio',
      image: 'https://images.unsplash.com/photo-1760462568686-f16dfaf44678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjByYWNlJTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc0MzY5NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'TRAIL GIGANTE DEL CASTILLO',
      distance: '35',
      unit: 'km',
      elevation: '900',
      elevUnit: 'm+',
      color: 'blue',
      description: 'Aventura trail running',
      image: 'https://images.unsplash.com/photo-1610863491854-c66386f70815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjB0cmFpbCUyMHJpZGVyfGVufDF8fHx8MTc3NDM1OTE2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { accent: string; glow: string; border: string }> = {
      red: {
        accent: 'from-red-600 via-red-500 to-orange-500',
        glow: 'shadow-[0_0_40px_rgba(239,68,68,0.6)]',
        border: 'border-red-500',
      },
      blue: {
        accent: 'from-blue-600 via-blue-500 to-cyan-500',
        glow: 'shadow-[0_0_40px_rgba(59,130,246,0.6)]',
        border: 'border-blue-500',
      },
    };
    return colors[color];
  };

  return (
    <section id="modalidades" className="py-20 px-4 bg-black">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Modalidades
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Elige tu desafío y supera tus límites
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {modalities.map((modality, index) => {
            const colors = getColorClasses(modality.color);
            return (
              <motion.div
                key={modality.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="relative h-[550px] rounded-2xl overflow-hidden cursor-pointer">
                  {/* Background Image with Parallax Effect */}
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <img
                      src={modality.image}
                      alt={modality.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>

                  {/* Colored Accent Border */}
                  <div className={`absolute inset-0 border-2 ${colors.border} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-8">
                    {/* Top Badge */}
                    <div className="flex justify-end">
                      <motion.div
                        className={`bg-gradient-to-r ${colors.accent} px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-wider`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {modality.description}
                      </motion.div>
                    </div>

                    {/* Bottom Content */}
                    <div className="space-y-6">
                      {/* Title */}
                      <motion.h3
                        className="text-4xl font-black text-white leading-tight min-h-[100px] flex items-end"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.15 + 0.3 }}
                      >
                        {modality.name}
                      </motion.h3>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Distance */}
                        <motion.div
                          className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="text-white" size={20} />
                            <span className="text-gray-300 text-xs uppercase tracking-wider">Distancia</span>
                          </div>
                          <div className="text-4xl font-black text-white">
                            {modality.distance}
                            <span className="text-xl ml-1">{modality.unit}</span>
                          </div>
                        </motion.div>

                        {/* Elevation */}
                        <motion.div
                          className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="text-white" size={20} />
                            <span className="text-gray-300 text-xs uppercase tracking-wider">Desnivel</span>
                          </div>
                          <div className="text-4xl font-black text-white">
                            {modality.elevation}
                            <span className="text-xl ml-1">{modality.elevUnit}</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* CTA Button */}
                      <button
                        className={`w-full bg-gradient-to-r ${colors.accent} text-white font-bold py-4 px-6 rounded-xl text-lg uppercase tracking-wider shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300`}
                      >
                        <span className="relative z-10">Más información</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}