import { useState, lazy, Suspense } from "react";
import { FlightNavbar } from "../components/flight/FlightNavbar";
import { FlightHero } from "../components/flight/FlightHero";

// Las secciones "below the fold" se cargan solo cuando se necesitan
const FlightExperience = lazy(() =>
  import("../components/flight/FlightExperience").then((m) => ({
    default: m.FlightExperience,
  })),
);
const FlightServices = lazy(() =>
  import("../components/flight/FlightServices").then((m) => ({
    default: m.FlightServices,
  })),
);
const FlightPricing = lazy(() =>
  import("../components/flight/FlightPricing").then((m) => ({
    default: m.FlightPricing,
  })),
);
const WhyChooseUs = lazy(() =>
  import("../components/flight/WhyChooseUs").then((m) => ({
    default: m.WhyChooseUs,
  })),
);
const FlightGallery = lazy(() =>
  import("../components/flight/FlightGallery").then((m) => ({
    default: m.FlightGallery,
  })),
);
const FlightTestimonials = lazy(() =>
  import("../components/flight/FlightTestimonials").then((m) => ({
    default: m.FlightTestimonials,
  })),
);
const FlightCTA = lazy(() =>
  import("../components/flight/FlightCTA").then((m) => ({
    default: m.FlightCTA,
  })),
);
const FlightRaceSection = lazy(() =>
  import("../components/flight/FlightRaceSection").then((m) => ({
    default: m.FlightRaceSection,
  })),
);
const FlightFooter = lazy(() =>
  import("../components/flight/FlightFooter").then((m) => ({
    default: m.FlightFooter,
  })),
);
const BookingModal = lazy(() =>
  import("../components/flight/BookingModal").then((m) => ({
    default: m.BookingModal,
  })),
);
const WhatsAppButton = lazy(() =>
  import("../components/flight/WhatsAppButton").then((m) => ({
    default: m.WhatsAppButton,
  })),
);

// Placeholder mínimo mientras carga una sección
const SectionLoader = () => <div className="py-24 bg-white" />;

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <FlightNavbar onBookNow={() => setIsBookingOpen(true)} />
      <FlightHero onBookNow={() => setIsBookingOpen(true)} />

      <Suspense fallback={<SectionLoader />}>
        <FlightExperience />
        <FlightServices onBookNow={() => setIsBookingOpen(true)} />
        <FlightPricing onBookNow={() => setIsBookingOpen(true)} />
        <WhyChooseUs />
        <FlightGallery />
        <FlightRaceSection />
        <FlightTestimonials />
        <FlightCTA />
        <FlightFooter />

        {/* Modal de Reservas */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />

        {/* Botón flotante de WhatsApp */}
        <WhatsAppButton />
      </Suspense>
    </div>
  );
}
