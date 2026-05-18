import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export function FAQ() {
  const faqs = [
    {
      question: '¿Cuál es la fecha límite para inscribirse?',
      answer: 'Las inscripciones estarán abiertas hasta el 10 de junio de 2026 o hasta agotar plazas. Te recomendamos inscribirte con anticipación ya que las plazas son limitadas.',
    },
    {
      question: '¿Qué incluye la inscripción?',
      answer: 'La inscripción incluye: dorsal numerado, chip de cronometraje, avituallamiento en ruta y meta, asistencia mecánica básica, seguro de accidentes, medalla finisher y diploma de participación.',
    },
    {
      question: '¿Puedo cambiar de modalidad después de inscribirme?',
      answer: 'Sí, puedes cambiar de modalidad hasta 7 días antes del evento contactando con la organización. Si cambias a una categoría más cara, deberás abonar la diferencia. Los cambios a categorías más económicas no son reembolsables.',
    },
    {
      question: '¿Hay límite de edad para participar?',
      answer: 'Para Gigante y Small, la edad mínima es 18 años. Para Trail, mayores de 16 años pueden participar con autorización de padres/tutores. Los menores de 16 años pueden participar acompañados de un adulto responsable.',
    },
    {
      question: '¿Qué pasa si el día del evento hace mal tiempo?',
      answer: 'El evento se realizará independientemente de las condiciones meteorológicas. Solo se suspenderá en caso de condiciones extremas que pongan en peligro la seguridad de los participantes. No hay devoluciones por cancelaciones voluntarias.',
    },
    {
      question: '¿Necesito traer mi propia bicicleta?',
      answer: 'Sí, cada participante debe traer su propia bicicleta en buen estado. Recomendamos una revisión mecánica completa antes del evento. No hay servicio de alquiler de bicicletas.',
    },
    {
      question: '¿Hay premios para los ganadores?',
      answer: 'Sí, hay premios para los 3 primeros clasificados de cada categoría (masculino y femenino). Además, todos los finishers reciben medalla conmemorativa y diploma.',
    },
    {
      question: '¿Puedo llevar acompañantes que no participen?',
      answer: 'Por supuesto. Los acompañantes son bienvenidos en la zona de salida y meta. También hay rutas de senderismo cercanas para que puedan disfrutar mientras esperas.',
    },
    {
      question: '¿Hay servicio de guardabicicletas?',
      answer: 'Sí, hay una zona vigilada de guardabicicletas en el área de meta. Sin embargo, recomendamos usar tu propio candado para mayor seguridad.',
    },
    {
      question: '¿Cómo llego al punto de salida?',
      answer: 'El punto de salida está en Sierra de Guadarrama, accesible por carretera. Hay parking gratuito disponible. También organizamos autobuses desde Madrid centro (consulta horarios y tarifas en el email de confirmación).',
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Todo lo que necesitas saber sobre Gigante de Piedra
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border-2 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-red-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center bg-white p-8 rounded-2xl border-2 shadow-sm"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            ¿Tienes más preguntas?
          </h3>
          <p className="text-gray-600 mb-4">
            Nuestro equipo está aquí para ayudarte
          </p>
          <a
            href="mailto:info@ganpedi.com"
            className="text-red-600 font-semibold hover:text-red-700 underline"
          >
            info@ganpedi.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}