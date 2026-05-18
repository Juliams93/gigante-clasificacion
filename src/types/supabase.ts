// Tipos para la base de datos Supabase
// Generados manualmente — coincide con el schema SQL de la carrera

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      runners: {
        Row: Runner;
        Insert: Omit<Runner, "created_at">;
        Update: Partial<Omit<Runner, "id" | "created_at">>;
      };
    };
  };
}

export interface Runner {
  id: number;
  dorsal: number;
  nombre: string;
  apellidos: string;
  modalidad?: string | null;
  source_table?: string | null;
  categoria: string; // 'ABSOLUTA_M' | 'ABSOLUTA_F' | 'VETERANO_M' | etc.
  club: string | null;
  localidad: string | null;
  tiempo_oficial: string | null; // formato 'HH:MM:SS'
  tiempo_neto: string | null; // formato 'HH:MM:SS'
  controles: string | null;
  control1?: string | null;
  control2?: string | null;
  control3?: string | null;
  control4?: string | null;
  control5?: string | null;
  control6?: string | null;
  puesto_general: number | null;
  puesto_categoria: number | null;
  estado: "INSCRITO" | "EN_CARRERA" | "FINALIZADO" | "RETIRADO" | "DNS";
  ultimo_checkpoint: string | null;
  hora_salida: string | null;
  updated_at: string;
  created_at: string;
}
