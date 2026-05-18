import { create } from 'zustand';
import { es } from '../../config/translations/es';
import { en } from '../../config/translations/en';

// ─── Tipos ────────────────────────────────────────────────
export type Language = 'es' | 'en';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// ─── Store de idioma (Zustand) ────────────────────────────
export const useLanguage = create<LanguageStore>((set) => ({
  language: 'es',
  setLanguage: (lang) => set({ language: lang }),
}));

// ─── Traducciones ─────────────────────────────────────────
// Para editar textos, ve a:
//   src/config/translations/es.ts  → español
//   src/config/translations/en.ts  → inglés
export const translations = { es, en };
