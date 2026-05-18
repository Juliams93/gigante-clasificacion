import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// ─── Configuración Supabase ───────────────────────────────
// Crea tu proyecto gratuito en https://supabase.com
// Luego copia las credenciales en el archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase] Faltan VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env');
}

export const supabase = createClient<Database>(supabaseUrl ?? '', supabaseKey ?? '');
