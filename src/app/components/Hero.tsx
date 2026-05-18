import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

export function Hero() {
  const scrollToEvent = () => {
    const element = document.getElementById('evento');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1760462568686-f16dfaf44678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjByYWNlJTIwZG93bmhpbGwlMjBhY3Rpb258ZW58MXx8fHwxNzc0MzY4NjYyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Mountain Bike Race"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight uppercase"
              style={{
                textShadow: `
                  3px 3px 0px #333,
                  4px 4px 0px #333,
                  5px 5px 0px #333,
                  6px 6px 0px #333,
                  7px 7px 0px #222,
                  8px 8px 0px #222,
                  9px 9px 10px rgba(0,0,0,0.8)
                `,
                WebkitTextStroke: '2px #888',
                paintOrder: 'stroke fill'
              }}
          >
            GIGANTE DE PIEDRA
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
            El evento de ciclismo más emocionante del año
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Vive la aventura en las montañas. Desafía tus límites. Une fuerzas con otros ciclistas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToEvent}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-2xl"
            >
              QUIERO INSCRIBIRME
            </Button>
            <Button
              onClick={scrollToEvent}
              size="lg"
              variant="outline"
              className="bg-white/90 hover:bg-white border-2 border-gray-800 text-gray-900 hover:text-black font-bold text-lg px-8 py-6 rounded-lg shadow-xl"
            >
              MÁS INFORMACIÓN
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToEvent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown size={40} />
      </motion.button>
    </section>
  );
}