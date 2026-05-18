import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Calendar from 'react-calendar';
import { X, Clock, Calendar as CalendarIcon, Check, ArrowRight, User, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useLanguage, translations } from '../../lib/i18n';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { BUSINESS, calculateBookingTotal } from '../../../config/business';
import type { BookingModalProps, BookingFormData } from '../../../types';

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const locale = language === 'es' ? es : enUS;

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState<number>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: ''
  });

  // Horarios disponibles — editar en src/config/business.ts
  const timeSlots = BUSINESS.schedule.timeSlots;

  // Fechas no disponibles (ejemplo: los próximos 3 días)
  const isDateDisabled = ({ date }: { date: Date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const calculateTotal = () => calculateBookingTotal(duration);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío
    alert(`${t.booking.success}\n${t.booking.date}: ${selectedDate ? format(selectedDate, 'PPP', { locale }) : ''}\n${t.booking.time}: ${selectedTime}\n${t.booking.duration}: ${duration}h\nTotal: ${calculateTotal()}€`);
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime('');
    setDuration(1);
    setFormData({ name: '', email: '', phone: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-brand to-brand-dark text-white p-6 relative">
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                >
                  <X size={24} />
                </button>
                <h2 className="text-3xl font-bold mb-2">{t.booking.title}</h2>
                <p className="text-white text-opacity-90">{t.booking.subtitle}</p>
                
                {/* Progress Steps */}
                <div className="flex items-center space-x-4 mt-6">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        step >= s ? 'bg-white text-brand' : 'bg-white bg-opacity-20 text-white'
                      }`}>
                        {s}
                      </div>
                      {s < 3 && (
                        <div className={`w-12 h-1 mx-2 rounded transition-all ${
                          step > s ? 'bg-white' : 'bg-white bg-opacity-20'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Step 1: Select Date & Time */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.booking.step1}</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Calendar */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          <CalendarIcon className="inline mr-2" size={18} />
                          {t.booking.selectDate}
                        </label>
                        <div className="calendar-wrapper">
                          <Calendar
                            onChange={(value) => setSelectedDate(value as Date)}
                            value={selectedDate}
                            tileDisabled={isDateDisabled}
                            minDate={new Date()}
                            locale={language}
                            className="border-2 border-gray-200 rounded-xl p-4 w-full"
                          />
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          <Clock className="inline mr-2" size={18} />
                          {t.booking.selectTime}
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                                selectedTime === time
                                  ? 'bg-brand text-white shadow-lg scale-105'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>

                        {/* Duration */}
                        <div className="mt-6">
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            {t.booking.duration}
                          </label>
                          <div className="flex space-x-3">
                            {Array.from({ length: BUSINESS.pricing.maxHours }, (_, i) => i + 1).map((hours) => (
                              <button
                                key={hours}
                                onClick={() => setDuration(hours)}
                                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                                  duration === hours
                                    ? 'bg-brand text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {hours}h
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <Button
                        onClick={() => setStep(2)}
                        disabled={!selectedDate || !selectedTime}
                        className="bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded-xl disabled:opacity-50"
                      >
                        {t.booking.continue} <ArrowRight className="ml-2" size={18} />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Personal Info */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.booking.step2}</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <User className="inline mr-2" size={18} />
                          {t.booking.name}
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t.booking.namePlaceholder}
                          className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="inline mr-2" size={18} />
                          {t.booking.email}
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t.booking.emailPlaceholder}
                          className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Phone className="inline mr-2" size={18} />
                          {t.booking.phone}
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t.booking.phonePlaceholder}
                          className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button
                        onClick={() => setStep(1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-xl"
                      >
                        {t.booking.back}
                      </Button>
                      <Button
                        onClick={() => setStep(3)}
                        disabled={!formData.name || !formData.email || !formData.phone}
                        className="bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded-xl disabled:opacity-50"
                      >
                        {t.booking.continue} <ArrowRight className="ml-2" size={18} />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.booking.step3}</h3>
                    
                    <div className="bg-gray-50 rounded-2xl p-6 space-y-4 mb-6">
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="text-gray-600">{t.booking.date}:</span>
                        <span className="font-bold text-gray-900">
                          {selectedDate ? format(selectedDate, 'PPP', { locale }) : ''}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="text-gray-600">{t.booking.time}:</span>
                        <span className="font-bold text-gray-900">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="text-gray-600">{t.booking.duration}:</span>
                        <span className="font-bold text-gray-900">{duration} {duration === 1 ? 'hora' : 'horas'}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="text-gray-600">{t.booking.name}:</span>
                        <span className="font-bold text-gray-900">{formData.name}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="text-gray-600">{t.booking.email}:</span>
                        <span className="font-bold text-gray-900">{formData.email}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3">
                        <span className="text-gray-600">{t.booking.phone}:</span>
                        <span className="font-bold text-gray-900">{formData.phone}</span>
                      </div>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="bg-gradient-to-br from-brand to-brand-dark text-white rounded-2xl p-6 mb-6">
                      <h4 className="text-xl font-bold mb-4">{t.booking.summary}</h4>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span>{t.booking.reservationFee}:</span>
                          <span>5€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t.booking.flightTime} ({duration}h × 60€):</span>
                          <span>{duration * 60}€</span>
                        </div>
                      </div>
                      <div className="border-t border-white border-opacity-30 pt-3">
                        <div className="flex justify-between items-center text-2xl font-bold">
                          <span>Total:</span>
                          <span>{calculateTotal()}€</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        onClick={() => setStep(2)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-xl"
                      >
                        {t.booking.back}
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        className="bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded-xl"
                      >
                        <Check className="mr-2" size={18} />
                        {t.booking.confirm}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}