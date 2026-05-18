// ============================================================
//  TIPOS TYPESCRIPT - Fénix Flight
//  Centraliza aquí todas las interfaces y tipos del proyecto.
// ============================================================

// ─── Reservas ─────────────────────────────────────────────

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
}

export interface BookingState {
  step: 1 | 2 | 3;
  selectedDate: Date | null;
  selectedTime: string;
  duration: number;
  formData: BookingFormData;
}

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Galería ──────────────────────────────────────────────

export interface GalleryImage {
  url: string;
  title: string;
  description: string;
}

// ─── Testimonios ──────────────────────────────────────────

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

// ─── Servicios ────────────────────────────────────────────

export interface ServiceCard {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconBg: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface AdditionalService {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  gradient: string;
}

// ─── Props comunes ────────────────────────────────────────

export interface OnBookNowProp {
  onBookNow: () => void;
}
