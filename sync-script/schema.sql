-- ═══════════════════════════════════════════════════════════
--  SCHEMA SUPABASE · La Gigante de Piedra
--  Ejecuta este SQL en Supabase → SQL Editor → New query
-- ═══════════════════════════════════════════════════════════

-- Tabla principal de corredores
create table if not exists public.runners (
  id                 bigint primary key,
  dorsal             integer not null,
  nombre             text    not null default '',
  apellidos          text    not null default '',
  modalidad          text    not null default 'GENERAL',
  source_table       text    not null default 'resultados',
  categoria          text    not null default 'ABSOLUTA_M',
  club               text,
  localidad          text,
  tiempo_oficial     text,            -- formato HH:MM:SS
  tiempo_neto        text,            -- formato HH:MM:SS
  controles          text,
  control1           text,
  control2           text,
  control3           text,
  control4           text,
  control5           text,
  control6           text,
  puesto_general     integer,
  puesto_categoria   integer,
  estado             text    not null default 'INSCRITO'
                     check (estado in ('INSCRITO','EN_CARRERA','FINALIZADO','RETIRADO','DNS')),
  ultimo_checkpoint  text,
  hora_salida        text,
  updated_at         timestamptz not null default now(),
  created_at         timestamptz not null default now()
);

-- Soporte para entornos ya creados antes de esta versión
alter table public.runners add column if not exists modalidad text not null default 'GENERAL';
alter table public.runners add column if not exists source_table text not null default 'resultados';
alter table public.runners add column if not exists controles text;
alter table public.runners add column if not exists control1 text;
alter table public.runners add column if not exists control2 text;
alter table public.runners add column if not exists control3 text;
alter table public.runners add column if not exists control4 text;
alter table public.runners add column if not exists control5 text;
alter table public.runners add column if not exists control6 text;

-- Índices para búsquedas rápidas
create index if not exists runners_dorsal_idx       on public.runners (dorsal);
create index if not exists runners_modalidad_idx    on public.runners (modalidad);
create index if not exists runners_categoria_idx    on public.runners (categoria);
create index if not exists runners_estado_idx       on public.runners (estado);
create index if not exists runners_puesto_idx       on public.runners (puesto_general);

-- Actualiza updated_at automáticamente
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger runners_updated_at
  before update on public.runners
  for each row execute procedure update_updated_at();

-- ─── Seguridad (Row Level Security) ──────────────────────
-- La web solo puede LEER. El script de sync usa la SERVICE KEY
-- que bypasea RLS, así que puede escribir sin problema.
alter table public.runners enable row level security;

create policy "Lectura pública de resultados"
  on public.runners for select
  using (true);

-- Habilitar realtime para esta tabla
alter publication supabase_realtime add table public.runners;
