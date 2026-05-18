import { motion } from 'motion/react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage, translations } from '../../lib/i18n';
import galleryImg1 from '../../../assets/ba7ed9c174a43a9023a0f7085c331dae9a2afe0d.png';
import galleryImg2 from '../../../assets/b8bbd62ed50ef296d270596bb555dcb226e17284.png';
import galleryImg3 from '../../../assets/0c48346689d12862e79d39c59b3a203c9093db88.png';
import galleryImg4 from '../../../assets/291c979f8388b539a7be454f99a306ea31267910.png';
import galleryImg5 from '../../../assets/366ddd79914e3db15dbda7bcc491b297ae1bb6cb.png';
import galleryImg6 from '../../../assets/80715fa46347dd8755a27a34a3dc81c73f61b7a2.png';

export function FlightGallery() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const realImages = [galleryImg1, galleryImg2, galleryImg3, galleryImg4, galleryImg5, galleryImg6];

  const images = t.gallery.images.map((img, idx) => ({
    url: realImages[idx],
    title: img.title,
    description: img.description
  }));

  return (
    <section id="galeria" className="py-24 bg-white relative overflow-hidden">
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
              {t.gallery.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.gallery.title}
            <span className="block text-brand">{t.gallery.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl mb-1">{image.title}</h3>
                <p className="text-gray-200 text-sm">{image.description}</p>
              </div>

              {/* Border effect */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-brand rounded-xl transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-brand transition-colors bg-white/10 backdrop-blur-sm rounded-full p-3"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <div className="max-w-5xl w-full">
              <img
                src={images[selectedImage].url}
                alt={images[selectedImage].title}
                className="w-full h-auto rounded-xl shadow-2xl"
              />
              <div className="text-center mt-6">
                <h3 className="text-white text-2xl font-bold mb-2">{images[selectedImage].title}</h3>
                <p className="text-gray-300">{images[selectedImage].description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}