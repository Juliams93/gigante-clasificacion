import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

// ─── Configuración Supabase ───────────────────────────────
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || null;
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || null;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "[Supabase] Faltan VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env — modo sin Supabase activo",
  );
}

// Usa una URL placeholder si no hay credenciales para evitar crash en modo demo
export const supabase = createClient<Database>(
  supabaseUrl ?? "https://placeholder.supabase.co",
  supabaseKey ?? "placeholder-key",
);
