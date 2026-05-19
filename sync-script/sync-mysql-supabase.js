/**
 * sync-mysql-supabase.js
 * ─────────────────────────────────────────────────────────
 * Script que corre en el PC del evento (donde está el chip timing).
 * Lee la tabla de resultados de MySQL cada N segundos y la sube
 * a Supabase para que la web la muestre en tiempo real.
 *
 * INSTALACIÓN (solo la primera vez):
 *   cd sync-script
 *   npm install mysql2 @supabase/supabase-js dotenv
 *
 * USO el día de la carrera:
 *   node sync-mysql-supabase.js
 * ─────────────────────────────────────────────────────────
 */

require("dotenv").config();
const mysql = require("mysql2/promise");
const { createClient } = require("@supabase/supabase-js");

// ─── Configuración (edita el archivo .env) ────────────────
const INTERVAL_MS = 10_000; // cada cuántos ms sincroniza (10 s)
const MYSQL_TABLE = process.env.MYSQL_TABLE ?? "resultados";
const MYSQL_TABLES = (process.env.MYSQL_TABLES ?? MYSQL_TABLE)
  .split(",")
  .map((t) => t.trim())
  .filter(Boolean);
const SUPABASE_TABLE = "runners";

// ─── Clientes ─────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY, // ← usa la SERVICE KEY (no la anon)
);

async function getDb() {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST ?? "localhost",
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });
}

// ─── Mapeo MySQL → Supabase ───────────────────────────────
// Compatible con tablas como:
// cicloturista, cicloturistag, especial, parejas, parejasG
// (columnas observadas: dorsal, nombre/nombres, apellidos, categoria,
//  club, control1/2/3, meta, orden1, poscate1/poscate, RETIRADO/retirado)
function toInt(value) {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function hasValue(value) {
  return value !== null && value !== undefined && String(value).trim() !== "";
}

function asUpper(value) {
  return String(value ?? "")
    .trim()
    .toUpperCase();
}

function isTruthyFlag(value) {
  const v = asUpper(value);
  return (
    v === "1" ||
    v === "SI" ||
    v === "S" ||
    v === "YES" ||
    v === "Y" ||
    v === "TRUE" ||
    v === "RETIRADO"
  );
}

function stableHashInt(input) {
  let hash = 0;
  const str = String(input ?? "");
  for (let i = 0; i < str.length; i += 1) {
    hash = Math.trunc((hash << 5) - hash + str.codePointAt(i));
  }
  return Math.abs(hash);
}

function normalizeTableName(table) {
  return String(table ?? "")
    .trim()
    .toLowerCase();
}

function normalizeCategoria(value) {
  return String(value ?? "GENERAL")
    .trim()
    .toUpperCase();
}

function getRetiradoValue(row) {
  return row.retirado ?? row.RETIRADO ?? row.Retirado ?? row.RET;
}

function getLatestCheckpoint(row) {
  return (
    row.control6 ??
    row.control5 ??
    row.control4 ??
    row.control3 ??
    row.control2 ??
    row.control1 ??
    null
  );
}

function getLatestControlTime(row) {
  if (hasValue(row.controles)) {
    return String(row.controles);
  }

  return (
    row.control6 ??
    row.control5 ??
    row.control4 ??
    row.control3 ??
    row.control2 ??
    row.control1 ??
    null
  );
}

function getControlTime(row, key) {
  const value = row[key] ?? row[key.toUpperCase()] ?? null;
  return hasValue(value) ? String(value) : null;
}

function getNombreApellidos(row, tableName) {
  if (hasValue(row.nombres)) {
    return {
      nombre: String(row.nombres),
      apellidos: tableName.includes("parejas") ? "PAREJA" : "",
    };
  }

  return {
    nombre: String(row.nombre ?? ""),
    apellidos: String(row.apellidos ?? ""),
  };
}

function getDorsal(row, tableName, nombre) {
  const dorsal = toInt(row.dorsal ?? row.DORSAL ?? row.numero ?? row.BIB);
  if (dorsal !== null) return dorsal;

  // En tablas de parejas no siempre existe dorsal.
  // Generamos uno estable para cumplir el esquema de Supabase.
  const synthetic = stableHashInt(`${tableName}:${nombre}`) % 900000;
  return 100000 + synthetic;
}

function buildRunnerId(row, tableName, dorsal, nombre, apellidos) {
  const idFromSource = toInt(row.id ?? row.ID);
  if (idFromSource !== null) return idFromSource;

  // id estable entre sincronizaciones aunque no exista columna id
  const key = `${tableName}:${dorsal}:${nombre}:${apellidos}`;
  return stableHashInt(key);
}

function resolveEstado(row) {
  const rawEstado = asUpper(row.estado ?? row.STATUS ?? row.status);
  const retirado = getRetiradoValue(row);
  const meta = row.meta ?? row.tiempo_oficial ?? row.tiempo_neto;
  const c1 = row.control1;
  const c2 = row.control2;
  const c3 = row.control3;
  const c4 = row.control4;
  const c5 = row.control5;
  const c6 = row.control6;

  if (rawEstado.includes("DNS")) return "DNS";
  if (
    rawEstado.includes("RETIR") ||
    rawEstado.includes("DNF") ||
    isTruthyFlag(retirado)
  )
    return "RETIRADO";
  if (
    rawEstado.includes("FINISH") ||
    rawEstado === "F" ||
    rawEstado === "FINALIZADO" ||
    hasValue(meta)
  )
    return "FINALIZADO";
  if (
    rawEstado.includes("RUN") ||
    rawEstado === "EN_CARRERA" ||
    hasValue(c1) ||
    hasValue(c2) ||
    hasValue(c3) ||
    hasValue(c4) ||
    hasValue(c5) ||
    hasValue(c6)
  )
    return "EN_CARRERA";
  return "INSCRITO";
}

function mapRow(row, sourceTable) {
  const tableName = normalizeTableName(sourceTable);
  const { nombre, apellidos } = getNombreApellidos(row, tableName);
  const dorsal = getDorsal(row, tableName, nombre);
  const id = buildRunnerId(row, tableName, dorsal, nombre, apellidos);

  return {
    id,
    dorsal,
    nombre,
    apellidos,
    categoria: normalizeCategoria(row.categoria ?? row.CATEGORY ?? "GENERAL"),
    club: row.club ?? row.CLUB ?? null,
    localidad: row.localidad ?? row.CITY ?? null,
    // En tus tablas el tiempo final suele venir en "meta"
    tiempo_oficial: row.meta ?? row.tiempo_oficial ?? row.GUN_TIME ?? null,
    tiempo_neto: row.meta ?? row.tiempo_neto ?? row.NET_TIME ?? null,
    control1: getControlTime(row, "control1"),
    control2: getControlTime(row, "control2"),
    control3: getControlTime(row, "control3"),
    control4: getControlTime(row, "control4"),
    control5: getControlTime(row, "control5"),
    control6: getControlTime(row, "control6"),
    controles: getLatestControlTime(row),
    puesto_general: toInt(row.orden1 ?? row.puesto_general ?? row.RANK),
    puesto_categoria: toInt(
      row.poscate1 ?? row.poscate ?? row.puesto_categoria ?? row.CAT_RANK,
    ),
    estado: resolveEstado(row),
    ultimo_checkpoint:
      getLatestCheckpoint(row) ??
      row.ultimo_checkpoint ??
      row.LAST_SPLIT ??
      null,
    hora_salida: row.hora_salida ?? row.START_TIME ?? null,
    modalidad: tableName.toUpperCase(),
    source_table: tableName,
    updated_at: new Date().toISOString(),
  };
}

// ─── Lógica de sincronización ─────────────────────────────
let lastSyncCount = 0;

async function sync() {
  let db;
  try {
    db = await getDb();
    const allMapped = [];

    for (const tableName of MYSQL_TABLES) {
      const [rows] = await db.execute(`SELECT * FROM \`${tableName}\``);
      const mapped = rows.map((row) => mapRow(row, tableName));
      allMapped.push(...mapped);
    }

    await db.end();

    if (allMapped.length === 0) return;

    // upsert: inserta o actualiza basándose en el campo `id`
    const { error } = await supabase
      .from(SUPABASE_TABLE)
      .upsert(allMapped, { onConflict: "id" });

    if (error) {
      console.error(`[${ts()}] ❌ Error Supabase:`, error.message);
    } else if (allMapped.length === lastSyncCount) {
      process.stdout.write(".");
    } else {
      console.log(
        `[${ts()}] ✅ Sincronizados ${allMapped.length} corredores (${MYSQL_TABLES.join(", ")})`,
      );
      lastSyncCount = allMapped.length;
    }
  } catch (err) {
    if (db) await db.end().catch(() => {});
    console.error(`[${ts()}] ❌ Error MySQL:`, err.message);
  }
}

function ts() {
  return new Date().toLocaleTimeString("es-ES");
}

// ─── Arranque ─────────────────────────────────────────────
console.log("╔══════════════════════════════════════════╗");
console.log("║  Sync MySQL → Supabase · La Gigante      ║");
console.log(
  `║  Intervalo: ${INTERVAL_MS / 1000}s  |  Tablas: ${String(MYSQL_TABLES.length).padEnd(13)}║`,
);
console.log("╚══════════════════════════════════════════╝");
console.log(
  `Conectando a MySQL en ${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT ?? 3306}...\n`,
);
console.log(`Tablas activas: ${MYSQL_TABLES.join(", ")}\n`);

sync(); // primera ejecución inmediata
setInterval(sync, INTERVAL_MS);
