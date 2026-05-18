import { motion } from 'motion/react';
import { useState } from 'react';

export function Gallery() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1760462568686-f16dfaf44678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjByYWNlJTIwZG93bmhpbGwlMjBhY3Rpb258ZW58MXx8fHwxNzc0MzY4NjYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Descenso extremo',
    },
    {
      url: 'https://images.unsplash.com/photo-1719328325171-6aca0451581b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjB0cmFpbCUyMGZvcmVzdCUyMHNwYWlufGVufDF8fHx8MTc3NDM2ODY2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Senderos del bosque',
    },
    {
      url: 'https://images.unsplash.com/photo-1683616667040-8a2e34ad3522?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsaW5nJTIwZXZlbnQlMjBmaW5pc2glMjBsaW5lJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzc0MzY4NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Meta y celebración',
    },
    {
      url: 'https://images.unsplash.com/photo-1768264260571-f33c3d457587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjByaWRlcnMlMjBncm91cCUyMG91dGRvb3J8ZW58MXx8fHwxNzc0MzY4NjY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Grupo de ciclistas',
    },
    {
      url: 'https://images.unsplash.com/photo-1683041132892-0fe990b3afc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHNwYWluJTIwbmF0dXJlfGVufDF8fHx8MTc3NDM2ODY2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Paisaje montañoso',
    },
    {
      url: 'https://images.unsplash.com/photo-1570665253733-063428674dea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsaXN0JTIwaGVsbWV0JTIwZ2VhciUyMGNsb3NldXB8ZW58MXx8fHwxNzc0MzY4NjY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Equipo de ciclismo',
    },
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="galeria" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Galería
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Momentos memorables de ediciones anteriores
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold">{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={images[selectedImage].url}
              alt={images[selectedImage].title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}
