import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Waves, Mountain, Hotel } from 'lucide-react';

export function Location() {
  const accommodations = [
    {
      name: 'Eurohotel Castellón',
      address: 'Carrer del Pintor Oliet, 9, 12006 Castelló de la Plana, Castelló',
      phone: '+34 964 34 25 59',
      email: 'reservas@eurohotelcastello.com',
    },
    {
      name: 'Hotel El Prat',
      description: 'Nuestro Hotel se encuentra en Lucena del Cid (un pueblo montañoso perdido en plena naturaleza) a 12km de Alcora.',
      phone: '+34 964 380 203',
      email: 'hoteldelprat@gmail.com',
    },
    {
      name: 'Casas Elina',
      phone: '659 657 598 / 621 536 916',
      email: 'casaelinalucena@gmail.com',
    },
    {
      name: "Cau de l'art",
      description: 'Es una edificación rehabilitada de finales del S.XVIII, en un enclave singular encima de un espolón rocoso que domina el barranco de la Pedrenyera y el rio Llucena.',
      address: 'C/San Antoni s/n 12120 Lucena del Cid Castellón España',
      phone: '642 639 016',
      email: 'info@caudelart.com',
    },
  ];

  return (
    <section id="castellon" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            El Entorno
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Castellón, la provincia más septentrional de la Comunidad Valenciana y la segunda más montañosa de España, 
            te ofrece un litoral con playas excelentes en sus más de 120 kilómetros de costa, junto a un interior diverso 
            y natural que no te dejará indiferente.
          </p>
        </motion.div>

        {/* Intro Text */}
        <motion.div
          className="max-w-4xl mx-auto mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg text-gray-700 leading-relaxed">
            Castellón Interior es sinónimo de naturaleza, de patrimonio histórico-artístico, de gastronomía, 
            de fiestas, de tradición, de alojamientos donde te sentirás mejor que en casa… ven y descúbrelo.
          </p>
        </motion.div>

        {/* Costa and Interior Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Costa */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <Waves className="text-blue-600" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Costa</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              El paisaje de Castellón no sólo invita a su contemplación, sino que anima a la práctica de todo tipo 
              de deportes y actividades al aire libre.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Vela, surf, kitesurf, BTT, espeleología, barranquismo, hípica, parapente, vuelo con y sin motor, 
              paracaidismo… son casi infinitas las actividades que se pueden practicar en Castellón.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Deportes náuticos, donde aprovechar los más de 120 Km de costa y los 6 puertos deportivos, en una de 
              las zonas de vientos más importantes del Mediterráneo, como lo demuestra la celebración todos los años 
              de regatas de primer nivel como la Regata Castellón-Costa Azahar.
            </p>
          </motion.div>

          {/* Interior */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-4 rounded-full mr-4">
                <Mountain className="text-green-600" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Interior</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Más de 1.200 km de senderos señalizados a lo largo y ancho de la provincia, permiten conocer caminando 
              los mejores parajes naturales de Castellón. Son 5 los senderos de largo recorrido GR que atraviesan la 
              provincia entre los que destaca el GR-7, que la cruza de norte a sur.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              El golf es otra actividad importante, realzada por el hecho de ser Castellón la patria de Sergio García, 
              nuestro mejor golfista.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Las carreteras de Castellón son apreciadas por los cicloturistas de toda España y Europa por su calidad, 
              tranquilidad y seguridad. No solo el buen clima y la calidad del asfalto, sino la variedad de desniveles, 
              paisajes y niveles de esfuerzo, hacen de Castellón un destino por descubrir para los de la bicicleta.
            </p>
          </motion.div>
        </div>

        {/* Accommodations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 p-4 rounded-full">
                <Hotel className="text-red-600" size={40} />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Alojamientos
            </h3>
            <p className="text-lg text-gray-600">
              Encuentra el lugar perfecto para tu estancia durante el evento
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {accommodations.map((hotel, index) => (
              <motion.div
                key={hotel.name}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h4 className="text-xl font-bold text-gray-900 mb-3">{hotel.name}</h4>
                
                {hotel.description && (
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{hotel.description}</p>
                )}
                
                <div className="space-y-2">
                  {hotel.address && (
                    <div className="flex items-start space-x-2">
                      <MapPin size={18} className="text-gray-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">{hotel.address}</span>
                    </div>
                  )}
                  
                  {hotel.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone size={18} className="text-gray-400 flex-shrink-0" />
                      <a 
                        href={`tel:${hotel.phone.replace(/\s/g, '')}`}
                        className="text-gray-700 hover:text-red-600 transition-colors text-sm"
                      >
                        {hotel.phone}
                      </a>
                    </div>
                  )}
                  
                  {hotel.email && (
                    <div className="flex items-center space-x-2">
                      <Mail size={18} className="text-gray-400 flex-shrink-0" />
                      <a 
                        href={`mailto:${hotel.email}`}
                        className="text-gray-700 hover:text-red-600 transition-colors text-sm break-all"
                      >
                        {hotel.email}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}