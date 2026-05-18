// ============================================================
//  CONFIGURACIÓN DEL NEGOCIO - Fénix Flight Services
//  Edita este archivo para cambiar datos de contacto,
//  precios, horarios y redes sociales en toda la web.
// ============================================================

export const BUSINESS = {
  // --- Información general ---
  name: 'Fénix Flight Services',
  tagline: 'Simuladores de vuelo Airbus A320 en Valencia',
  location: 'Valencia, España',

  // --- Contacto ---
  contact: {
    phone: '+34 960 000 000',
    email: 'fenixfli@fenixflight.es',
    whatsapp: '34960000000', // Sin el + para la URL de WhatsApp
    address: 'Valencia, España',
  },

  // --- Redes sociales ---
  social: {
    instagram: 'https://instagram.com/fenixflight',
    facebook:  'https://facebook.com/fenixflight',
    twitter:   'https://twitter.com/fenixflight',
    linkedin:  'https://linkedin.com/company/fenixflight',
  },

  // --- Precios (€) ---
  pricing: {
    hourlyRate: 60,        // Precio por hora de vuelo
    reservationFee: 5,     // Tarifa de reserva (se descuenta del total)
    maxHours: 3,           // Máximo de horas reservables
  },

  // --- Horarios de apertura ---
  schedule: {
    openTime: '09:00',
    closeTime: '20:00',
    // Genera slots cada hora entre openTime y closeTime
    timeSlots: [
      '09:00', '10:00', '11:00', '12:00', '13:00',
      '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
    ],
  },

  // --- Estadísticas para la sección "¿Por qué elegirnos?" ---
  stats: {
    flightsCompleted: '+5.000',
    satisfactionRate: '98%',
    support: '24/7',
    rating: '4.9★',
    yearsExperience: '15+',
    reviewsCount: '+300',
  },
} as const;

// Calcula el total de una reserva
export function calculateBookingTotal(hours: number): number {
  return BUSINESS.pricing.reservationFee + hours * BUSINESS.pricing.hourlyRate;
}
