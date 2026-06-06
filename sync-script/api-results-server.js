require("dotenv").config();

const http = require("node:http");
const nodeFs = require("node:fs");
const mysql = require("mysql2/promise");

const API_PORT = Number(process.env.PORT ?? process.env.API_PORT ?? 8787);
const API_KEY = process.env.API_KEY ?? "";
const RESULTS_SOURCE = String(
  process.env.RESULTS_SOURCE ?? "mysql",
).toLowerCase();
const MYSQL_TABLE = process.env.MYSQL_TABLE ?? "resultados";
const MYSQL_TABLES = (process.env.MYSQL_TABLES ?? MYSQL_TABLE)
  .split(",")
  .map((t) => t.trim())
  .filter(Boolean);
const CSV_FILE = process.env.CSV_FILE ?? "";
const CSV_URL = process.env.CSV_URL ?? "";
const CSV_SOURCE_TABLE = (process.env.CSV_SOURCE_TABLE ?? "csv").toUpperCase();

function toInt(value) {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function hasValue(value) {
  return value !== null && value !== undefined && String(value).trim() !== "";
}

function isMeaningfulRaceTime(value) {
  if (!hasValue(value)) return false;
  const time = String(value).trim();
  if (time === "0" || time === "00:00" || time === "00:00:00") return false;
  if (/^0{1,2}:0{2}:0{2}(?:\.0+)?$/.test(time)) return false;
  return true;
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
    const code = str.codePointAt(i) ?? 0;
    hash = (hash * 31 + code) % 2147483647;
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
  const synthetic = stableHashInt(`${tableName}:${nombre}`) % 900000;
  return 100000 + synthetic;
}

function buildRunnerId(row, tableName, dorsal, nombre, apellidos) {
  const idFromSource = toInt(row.id ?? row.ID);
  if (idFromSource !== null) return idFromSource;
  const key = `${tableName}:${dorsal}:${nombre}:${apellidos}`;
  return stableHashInt(key);
}

function resolveEstado(row) {
  const rawEstado = asUpper(row.estado ?? row.STATUS ?? row.status);
  const retirado = getRetiradoValue(row);
  const meta = row.meta ?? row.tiempo_oficial ?? row.tiempo_neto;
  const hasMetaFinishTime = isMeaningfulRaceTime(meta);
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
    hasMetaFinishTime
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
  const nowIso = new Date().toISOString();

  return {
    id,
    dorsal,
    nombre,
    apellidos,
    categoria: String(row.categoria ?? row.CATEGORY ?? "GENERAL"),
    club: row.club ?? row.CLUB ?? null,
    localidad: row.localidad ?? row.CITY ?? null,
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
    updated_at: nowIso,
    created_at: nowIso,
  };
}

async function getDb() {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST ?? "localhost",
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });
}

function parseCsvLine(line, delimiter) {
  const out = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === delimiter && !inQuotes) {
      out.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  out.push(current.trim());
  return out;
}

function parseCsvRows(content) {
  const cleaned = content.replace(/^\uFEFF/, "");
  const lines = cleaned.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];
  const delimiter = lines[0].includes(";") ? ";" : ",";
  const headers = parseCsvLine(lines[0], delimiter).map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line, delimiter);
    const row = {};
    headers.forEach((header, i) => {
      row[header] = values[i] ?? null;
    });
    return row;
  });
}

async function loadFromMysql() {
  const db = await getDb();
  try {
    const runners = [];
    for (const tableName of MYSQL_TABLES) {
      const [rows] = await db.execute(`SELECT * FROM \`${tableName}\``);
      runners.push(...rows.map((row) => mapRow(row, tableName)));
    }
    return runners;
  } finally {
    await db.end();
  }
}

async function loadFromCsv() {
  if (!CSV_FILE) {
    throw new Error("CSV_FILE no configurado en .env");
  }
  if (!nodeFs.existsSync(CSV_FILE)) {
    throw new Error(`No existe el CSV: ${CSV_FILE}`);
  }

  const content = nodeFs.readFileSync(CSV_FILE, "utf8");
  const rows = parseCsvRows(content);
  return rows.map((row) => mapRow(row, CSV_SOURCE_TABLE));
}

async function loadFromCsvUrl() {
  if (!CSV_URL) {
    throw new Error("CSV_URL no configurado en .env");
  }

  const response = await fetch(CSV_URL);
  if (!response.ok) {
    throw new Error(
      `No se pudo descargar el CSV: ${response.status} ${response.statusText}`,
    );
  }

  const content = await response.text();
  const rows = parseCsvRows(content);
  return rows.map((row) => mapRow(row, CSV_SOURCE_TABLE));
}

function matchesCategoria(runner, categoria) {
  if (!categoria || categoria === "TODAS") return true;
  return normalizeCategoria(runner.categoria) === normalizeCategoria(categoria);
}

function matchesModalidad(runner, modalidad) {
  return (
    !modalidad ||
    modalidad === "TODAS" ||
    (runner.modalidad ?? "").toUpperCase() === modalidad.toUpperCase()
  );
}

function matchesDorsal(runner, dorsal) {
  if (!dorsal || dorsal.trim() === "") return true;
  const dorsalNum = Number(dorsal.trim());
  if (Number.isNaN(dorsalNum)) return true;
  return runner.dorsal === dorsalNum;
}

function matchesNombre(runner, nombre) {
  if (!nombre || nombre.trim() === "") return true;
  const term = nombre.trim().toLowerCase();
  const fullName = `${runner.nombre} ${runner.apellidos}`.toLowerCase();
  return fullName.includes(term);
}

function matchesSearch(runner, q) {
  if (!q || q.trim() === "") return true;
  const term = q.trim().toLowerCase();
  const byName = `${runner.nombre} ${runner.apellidos}`
    .toLowerCase()
    .includes(term);
  const byDorsal = String(runner.dorsal).includes(term);
  return byName || byDorsal;
}

function sortRunners(runners, sortBy = "puesto_general") {
  return [...runners].sort((a, b) => {
    if (sortBy === "tiempo_neto") {
      if (!a.tiempo_neto) return 1;
      if (!b.tiempo_neto) return -1;
      return String(a.tiempo_neto).localeCompare(String(b.tiempo_neto));
    }
    if (sortBy === "dorsal") return a.dorsal - b.dorsal;
    if (!a.puesto_general) return 1;
    if (!b.puesto_general) return -1;
    return a.puesto_general - b.puesto_general;
  });
}

function filterRunners(runners, params) {
  const categoria = params.get("categoria");
  const modalidad = params.get("modalidad");
  const dorsal = params.get("dorsal");
  const nombre = params.get("nombre");
  const q = params.get("q");

  return runners.filter(
    (runner) =>
      matchesCategoria(runner, categoria) &&
      matchesModalidad(runner, modalidad) &&
      matchesDorsal(runner, dorsal) &&
      matchesNombre(runner, nombre) &&
      matchesSearch(runner, q),
  );
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function isAuthorized(req, url) {
  if (!API_KEY) return true;
  const headerKey = req.headers["x-api-key"];
  const queryKey = url.searchParams.get("apiKey");
  return headerKey === API_KEY || queryKey === API_KEY;
}

const server = http.createServer(async (req, res) => {
  if (!req.url) return sendJson(res, 400, { error: "Bad request" });

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/health") {
    return sendJson(res, 200, {
      ok: true,
      source: RESULTS_SOURCE,
      time: new Date().toISOString(),
    });
  }

  if (url.pathname !== "/api/runners") {
    return sendJson(res, 404, { error: "Not found" });
  }

  if (!isAuthorized(req, url)) {
    return sendJson(res, 401, { error: "Unauthorized" });
  }

  try {
    let sourceRows;
    if (RESULTS_SOURCE === "csv") {
      sourceRows = await loadFromCsv();
    } else if (RESULTS_SOURCE === "csv-url") {
      sourceRows = await loadFromCsvUrl();
    } else {
      sourceRows = await loadFromMysql();
    }

    const filtered = filterRunners(sourceRows, url.searchParams);
    const sortBy = url.searchParams.get("sortBy") ?? "puesto_general";
    const sorted = sortRunners(filtered, sortBy);

    return sendJson(res, 200, {
      source: RESULTS_SOURCE,
      count: sorted.length,
      lastUpdate: new Date().toISOString(),
      runners: sorted,
    });
  } catch (error) {
    return sendJson(res, 500, {
      error: error.message,
      source: RESULTS_SOURCE,
    });
  }
});

server.listen(API_PORT, () => {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  API Resultados · La Gigante             ║");
  console.log(
    `║  Puerto: ${String(API_PORT).padEnd(6)}  Fuente: ${RESULTS_SOURCE.padEnd(10)}║`,
  );
  console.log("╚══════════════════════════════════════════╝");
  console.log(`URL API: http://localhost:${API_PORT}/api/runners`);
  console.log("Health:  /health\n");
});
