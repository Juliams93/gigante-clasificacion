# ✈️ Fénix Flight - Landing Page Profesional

Landing page premium para **Fénix Flight Services** - Simuladores de vuelo Airbus A320 en Valencia.

---

## ✅ **ESTADO ACTUAL - ÚLTIMA ACTUALIZACIÓN**

### ✨ **COMPLETADO EN ESTA SESIÓN**
- ✅ **Email actualizado**: fenixfli@fenixflight.es
- ✅ **Sección de Testimonios**: 3 testimonios con diseño circular + trust indicators
- ✅ **Sección de Precios**: 60€/hora + 5€ reserva con diseño premium
- ✅ **Modal de Reservas**: Sistema completo de 3 pasos (Fecha/Hora → Datos → Confirmación)
- ✅ **Botón WhatsApp flotante**: Bottom-right con animación pulse
- ✅ **4 Iconos circulares únicos**: Cada servicio adicional con su propio icono y gradiente
  - 💰 Asequibles (verde)
  - 🎯 Reales (azul)
  - 📚 Instrucción virtual (morado)
  - 👥 Cursos A320 (coral)

---

## 📐 **Estructura de la Landing (9 Secciones + Extras)**

### 1️⃣ **Hero Section**
- Video/imagen de cockpit de fondo
- Título impactante "Vuela un Airbus A320"
- 2 CTAs: **"Reservar Experiencia"** (abre modal) + "Ver Simuladores"
- Badge con "Simulación Profesional · Experiencia Real"

### 2️⃣ **Experiencia**
- Layout de 2 columnas (texto + imagen)
- 4 features principales con iconos
- Frase emotiva tipo quote
- CTA "Regala esta experiencia"

### 3️⃣ **Servicios** ⭐
- **3 cards principales** (Vuelos, Formación, Fabricación)
- Badge "MÁS POPULAR" en la card de vuelos
- **4 iconos circulares** con gradientes únicos:
  - 💰 Asequibles → Verde
  - 🎯 Reales → Azul
  - 📚 Instrucción virtual → Morado
  - 👥 Cursos A320 → Coral

### 4️⃣ **Precios** 💰 ⭐ NUEVO
- **Card 1**: Vuelo por Hora (60€/hora)
  - Fondo blanco
  - 4 features incluidas
  - CTA "Reservar Ahora"
  
- **Card 2**: Reserva de Plaza (5€/reserva)
  - Fondo gradiente coral
  - Badge "NECESARIA"
  - 4 features de la reserva
  - CTA "Hacer Reserva"
  
- **Nota informativa**: Cálculo del total (ejemplo: 65€ por 1h)

### 5️⃣ **Por Qué Elegirnos**
- Grid de 4 features con stats
- Barra de estadísticas inferior:
  - +5.000 Vuelos Completados
  - 98% Satisfacción
  - 24/7 Soporte
  - 4.9★ Valoración

### 6️⃣ **Galería**
- Grid responsive 3 columnas
- 6 imágenes profesionales
- Lightbox al hacer clic
- Hover effects con overlay

### 7️⃣ **Testimonios** 💬 ⭐ RESTAURADO
- 3 testimonios con diseño card premium
- Foto circular + nombre + rol
- Rating de 5 estrellas coral
- Quote icon decorativo
- **Trust indicators**:
  - 4.9/5 con +200 reseñas
  - +5.000 Vuelos completados
  - 98% Clientes satisfechos

### 8️⃣ **Contacto + CTA**
- Layout 2 columnas:
  - Izquierda: info de contacto (teléfono, email, ubicación)
  - Derecha: formulario de contacto
- Sección especial "REGALA UN VUELO" destacada
- Fondo oscuro con gradientes

### 9️⃣ **Footer**
- 5 columnas: Brand + Servicios + Empresa + Legal + Newsletter
- Links organizados por categoría
- Newsletter con input de email
- Social media icons
- Bottom bar con copyright

---

## 🆕 **NUEVAS FUNCIONALIDADES**

### 📅 **Sistema de Reservas (Modal de 3 Pasos)**

**Acceso**:
- Botón "Reservar Experiencia" en Hero
- Botón "Reservar Ahora" en sección Precios
- Link "PRECIOS" en navbar

**Paso 1: Fecha y Hora**
- Calendario interactivo (react-calendar)
- 12 slots horarios (9:00 - 20:00)
- Selector de duración (1h, 2h, 3h)
- Validación de fechas pasadas

**Paso 2: Datos Personales**
- Nombre completo
- Email
- Teléfono
- Validación de campos

**Paso 3: Confirmación**
- Resumen completo de la reserva
- Desglose de precios:
  - Reserva de plaza: 5€
  - Tiempo de vuelo: [horas] × 60€
  - **Total**: [calculado]
- Botón "Confirmar Reserva"

**Features del Modal**:
- ✅ Animaciones suaves (Motion/Framer)
- ✅ Backdrop blur
- ✅ Progress steps visuales (3 pasos)
- ✅ Navegación adelante/atrás
- ✅ Validaciones en tiempo real
- ✅ Responsive (móvil y desktop)
- ✅ Bilingüe (ES/EN)

### 💬 **Botón WhatsApp Flotante**

**Ubicación**: Bottom-right, siempre visible
**Features**:
- 🟢 Animación pulse constante
- 📱 Link directo a WhatsApp con mensaje prellenado
- 💡 Tooltip "Chatea con nosotros" al hover
- 🎨 Gradiente verde WhatsApp oficial
- 📲 Abre en nueva pestaña
- ⚡ Aparece con delay de 1 segundo
- 🌐 Mensaje en español o inglés según idioma

**Mensaje prellenado**:
- ES: "Hola! Quiero información sobre los simuladores de vuelo"
- EN: "Hello! I want information about flight simulators"

---

## 💰 **Sistema de Precios**

### Tarifa Horaria
- **60€ por hora** de simulación
- Incluye:
  - Simulación completa A320
  - Instructor certificado
  - Todas las funcionalidades
  - Certificado digital de vuelo

### Reserva de Plaza
- **5€ por reserva** (obligatoria)
- Se descuenta del total final
- Reembolsable hasta 48h antes
- Confirmación inmediata

### Ejemplos de Precios Totales
- **1 hora**: 5€ (reserva) + 60€ (vuelo) = **65€**
- **2 horas**: 5€ (reserva) + 120€ (vuelo) = **125€**
- **3 horas**: 5€ (reserva) + 180€ (vuelo) = **185€**

---

## 🎨 **Diseño**

### Colores
```css
--primary: #DA6F65;        /* Coral/rojo principal */
--primary-hover: #c96059;  /* Hover states */
--background: #ffffff;      /* Fondo principal */
--background-alt: #f9fafb; /* Fondo alternativo */
--dark: #111827;           /* Textos oscuros */
--gray: #6b7280;           /* Textos secundarios */
```

### Tipografía
- Sistema de fuentes nativo
- Tamaños definidos en `/src/styles/theme.css`
- Peso: Regular (400) y Bold (700)

### Espaciado
- Secciones: `py-20` o `py-24`
- Contenedor: `container mx-auto px-4`
- Max-width: `max-w-7xl` para contenido

---

## 🌐 **Sistema Bilingüe**

### Cambio de idioma
- Toggle ES/EN en el navbar (top-right)
- Estado global con Zustand
- Traducciones centralizadas en `/src/app/lib/i18n.ts`

### Uso en componentes
```tsx
import { useLanguage, translations } from '../../lib/i18n';

const { language } = useLanguage();
const t = translations[language];

<h2>{t.hero.title}</h2>
```

---

## 📂 **Estructura de Archivos**

```
/src/app
├── components/
│   ├── flight/                  # Componentes de la landing
│   │   ├── FlightNavbar.tsx     # Navegación + idioma
│   │   ├── FlightHero.tsx       # Hero section
│   │   ├── FlightExperience.tsx # Sección experiencia
│   │   ├── FlightServices.tsx   # Servicios (cards + iconos)
│   │   ├── WhyChooseUs.tsx      # Por qué elegirnos
│   │   ├── FlightGallery.tsx    # Galería con lightbox
│   │   ├── FlightTestimonials.tsx # Testimonios
│   │   ├── FlightCTA.tsx        # Contacto + CTA regalo
│   │   └── FlightFooter.tsx     # Footer completo
│   └── ui/                      # Componentes UI base
│       ├── button.tsx
│       ├── input.tsx
│       └── textarea.tsx
├── lib/
│   └── i18n.ts                  # Sistema de traducciones
├── pages/
│   └── HomePage.tsx             # Página principal
└── App.tsx                      # Entry point
```

---

## 📧 **Datos de Contacto**

- **Email**: fenixfli@fenixflight.es
- **Teléfono**: +34 960 XXX XXX
- **Ubicación**: Valencia, España
- **Web**: fenixflight.es (placeholder)

---

## 🚀 **Próximas Mejoras Sugeridas**

Ver archivo `/MEJORAS_SUGERIDAS.md` para:
- 📅 **Calendario de reservas** (PRIORIDAD 1)
- 💰 **Sección de precios visible** (PRIORIDAD 1)
- 💬 **Botón WhatsApp flotante** (PRIORIDAD 1)
- ❓ **FAQ Section**
- 🎥 **Video del simulador**
- 🗺️ **Mapa interactivo**
- 🏆 **Trust badges/certificaciones**
- 📊 **Comparador de paquetes**

---

## 🛠️ **Stack Tecnológico**

- **React 18** - Framework principal
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Estilos
- **Motion (Framer Motion)** - Animaciones
- **Zustand** - Estado global (idioma)
- **Lucide React** - Iconos SVG
- **Vite** - Build tool

---

## 📱 **Responsive**

- ✅ Mobile First design
- ✅ Breakpoints: sm, md, lg, xl, 2xl
- ✅ Touch-friendly buttons
- ✅ Mobile menu hamburger
- ✅ Optimized images

---

## ⚡ **Performance**

- Lazy loading de imágenes
- Code splitting por rutas
- Optimización de animaciones (will-change)
- Prefetch de assets críticos

---

## 🎯 **SEO Ready**

- Semantic HTML5
- Alt text en todas las imágenes
- Meta tags (por implementar)
- Structured data (por implementar)

---

## 📞 **Contacto del Proyecto**

**Fénix Flight Services**  
Simuladores de vuelo asequibles para cualquier bolsillo  
Valencia, España  
fenixfli@fenixflight.es

---

_Última actualización: Marzo 2025_