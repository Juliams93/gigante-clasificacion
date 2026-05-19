import { useMemo, useState } from "react";
import {
  Search,
  Hash,
  Trophy,
  Clock,
  RefreshCw,
  Wifi,
  WifiOff,
  Mountain,
  Filter,
} from "lucide-react";
import { useRaceResults } from "../hooks/useRaceResults";
import type { Runner } from "../../types/supabase";

const CATEGORIA_LABEL: Record<string, string> = {
  TODAS: "Todas",
  ABSOLUTA_M: "Absoluta M",
  ABSOLUTA_F: "Absoluta F",
  VETERANO_M: "Veterano M",
  VETERANA_F: "Veterana F",
  SUB23_M: "Sub-23 M",
  SUB23_F: "Sub-23 F",
};

const CONTROL_KEYS = [
  "control1",
  "control2",
  "control3",
  "control4",
  "control5",
  "control6",
] as const;

const ESTADO_BADGE: Record<
  Runner["estado"],
  { label: string; className: string }
> = {
  INSCRITO: { label: "Inscrito", className: "bg-gray-100 text-gray-600" },
  EN_CARRERA: {
    label: "En carrera",
    className: "bg-blue-100 text-blue-700 animate-pulse",
  },
  FINALIZADO: { label: "Finalizado", className: "bg-green-100 text-green-700" },
  RETIRADO: { label: "Retirado", className: "bg-red-100 text-red-600" },
  DNS: { label: "No salió", className: "bg-gray-100 text-gray-400" },
};

function PodiumIcon({ pos }: { pos: number | null }) {
  return <span className="text-sm font-bold text-gray-700">{pos ?? "—"}</span>;
}

function CategoryPositionBadge({ pos }: { pos: number | null }) {
  if (pos === 1) return <span className="text-base">🥇</span>;
  if (pos === 2) return <span className="text-base">🥈</span>;
  if (pos === 3) return <span className="text-base">🥉</span>;
  return <span className="text-sm text-gray-400 font-mono">{pos ?? "—"}</span>;
}

export default function GigantePage() {
  const hasBackendApi = Boolean(import.meta.env.VITE_RESULTS_API_URL);
  const isProduction =
    typeof globalThis !== "undefined" &&
    globalThis.window !== undefined &&
    globalThis.window.location.hostname !== "localhost" &&
    globalThis.window.location.hostname !== "127.0.0.1";

  // In production without backend API, always use demo mode
  // Otherwise, allow demo mode to be controlled via URL parameter
  const searchParams = new URLSearchParams(window.location.search);
  const isDemoMode =
    (isProduction && !hasBackendApi) || searchParams.get("demo") === "1";

  const [dorsal, setDorsal] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("TODAS");

  const { runners, loading, error, lastUpdate, totalFinishers, isLive } =
    useRaceResults({
      categoria,
      dorsal,
      nombre,
      demoMode: isDemoMode,
    });

  const categoriasDisponibles = useMemo(() => {
    const uniques = Array.from(
      new Set(
        runners
          .map((r) => r.categoria)
          .map((value) => value?.trim().toUpperCase() ?? "")
          .filter((value) => value.length > 0),
      ),
    ).sort((a, b) => a.localeCompare(b, "es"));

    return ["TODAS", ...uniques];
  }, [runners]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ── Cabecera ────────────────────────────────────────── */}
      <header className="bg-gradient-to-br from-gray-900 via-stone-900 to-gray-900 border-b border-stone-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-5 md:py-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
            <div>
              <div className="flex items-center gap-2 md:gap-6 mb-3 md:mb-4 min-w-0">
                <img
                  src="/imagenes/logo-gigante-negro.png"
                  alt="La Gigante de Piedra"
                  className="h-12 w-12 md:h-28 md:w-auto object-contain flex-shrink-0"
                />
                <img
                  src="/imagenes/LETRAS_LOGO GIGANTE_Grises.png"
                  alt="Gigante"
                  className="h-12 sm:h-14 md:h-40 w-auto object-contain object-left min-w-0 max-w-[calc(100vw-80px)] md:max-w-none"
                />
              </div>
              <span className="text-amber-400 font-bold text-xs md:text-sm tracking-widest uppercase block">
                Clasificación Oficial
              </span>
            </div>

            {/* Estado en vivo */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                  isLive
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {isLive ? (
                  <>
                    <Wifi size={14} className="animate-pulse" /> EN DIRECTO
                  </>
                ) : (
                  <>
                    <WifiOff size={14} /> DESCONECTADO
                  </>
                )}
              </div>
              {isDemoMode && (
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-1 rounded-md">
                  MODO DEMO (datos simulados)
                </span>
              )}
              {lastUpdate && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <RefreshCw size={10} />
                  Última actualización: {lastUpdate.toLocaleTimeString("es-ES")}
                </span>
              )}
            </div>
          </div>

          {/* Filtros arriba */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            <div className="relative">
              <Hash
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Filtrar por dorsal"
                value={dorsal}
                onChange={(e) =>
                  setDorsal(e.target.value.replaceAll(/\D/g, ""))
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="relative sm:col-span-1 lg:col-span-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Filtrar por nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="relative">
              <Filter
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-8 pr-8 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer"
              >
                {categoriasDisponibles.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "TODAS" ? "Categorias" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats rápidos */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-stone-800/60 rounded-xl p-4 border border-stone-700/40">
              <div className="text-2xl font-black text-amber-400">
                {runners.length}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Mostrando</div>
            </div>
            <div className="bg-stone-800/60 rounded-xl p-4 border border-stone-700/40">
              <div className="text-2xl font-black text-green-400">
                {totalFinishers}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Finalizados</div>
            </div>
            <div className="bg-stone-800/60 rounded-xl p-4 border border-stone-700/40">
              <div className="text-2xl font-black text-blue-400">
                {runners.filter((r) => r.estado === "EN_CARRERA").length}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">En carrera</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Tabla de resultados ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        {error && (
          <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 mb-6 text-red-300 text-sm">
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={`skeleton-${i}`}
                className="h-14 bg-gray-800/60 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : runners.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <Trophy size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">No hay resultados todavía</p>
            <p className="text-sm mt-1">
              La clasificación se actualizará en cuanto comiencen las llegadas
            </p>
          </div>
        ) : (
          <>
            {/* Cabecera de tabla — solo desktop */}
            <div className="hidden md:grid grid-cols-[56px_110px_60px_1fr_120px_130px_280px_100px] gap-3 px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              <span className="text-center">Pos. general</span>
              <span>Pos. categoría</span>
              <span className="text-center">Dorsal</span>
              <span>Nombre</span>
              <span>Categoría</span>
              <span>Meta</span>
              <span>Controles C1-C6</span>
              <span>Estado</span>
            </div>

            <div className="space-y-2">
              {runners.map((runner, index) => (
                <RunnerRow
                  key={runner.id}
                  runner={runner}
                  generalPosition={index + 1}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Footer mínimo ───────────────────────────────────── */}
      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-600">
        Clasificación en tiempo real · La Gigante de Piedra
      </footer>
    </div>
  );
}

// ── Fila de corredor ──────────────────────────────────────
function RunnerRow({
  runner,
  generalPosition,
}: {
  runner: Runner;
  generalPosition: number;
}) {
  const badge = ESTADO_BADGE[runner.estado];
  const isTop3 = generalPosition <= 3 && runner.estado === "FINALIZADO";

  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isTop3
          ? "bg-amber-500/10 border-amber-500/30"
          : runner.estado === "EN_CARRERA"
            ? "bg-blue-500/5 border-blue-500/20"
            : "bg-gray-800/50 border-gray-700/30 hover:bg-gray-800/80"
      }`}
    >
      {/* Movil */}
      <div className="md:hidden flex items-center gap-2 px-3 py-3">
        <div className="w-7 text-center flex-shrink-0 text-sm font-bold text-gray-300">
          {generalPosition}
        </div>
        <span className="text-xs font-mono font-bold text-gray-300 bg-gray-700/60 px-1.5 py-0.5 rounded flex-shrink-0">
          {runner.dorsal}
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white text-sm leading-tight truncate">
            {runner.nombre} {runner.apellidos}
          </div>
          {runner.club && (
            <div className="text-xs text-gray-500 truncate">{runner.club}</div>
          )}
        </div>
        <div className="flex-shrink-0 text-right">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
          {runner.tiempo_neto && (
            <div className="text-xs font-mono text-amber-300 mt-0.5">
              {runner.tiempo_neto}
            </div>
          )}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-[56px_110px_60px_1fr_120px_130px_280px_100px] gap-3 items-center px-4 py-3.5">
        <div className="flex justify-center">
          <PodiumIcon pos={generalPosition} />
        </div>
        <div className="flex items-center gap-1">
          <CategoryPositionBadge pos={runner.puesto_categoria} />
        </div>
        <div className="text-center">
          <span className="text-sm font-mono font-bold text-gray-300 bg-gray-700/60 px-2 py-0.5 rounded">
            {runner.dorsal}
          </span>
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-white text-sm leading-tight truncate">
            {runner.nombre} {runner.apellidos}
          </div>
          {runner.club && (
            <div className="text-xs text-gray-500 mt-0.5 truncate">
              {runner.club}
            </div>
          )}
        </div>
        <div>
          <span className="text-xs text-gray-400 bg-gray-700/40 px-2 py-0.5 rounded font-medium">
            {CATEGORIA_LABEL[runner.categoria] ?? runner.categoria}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-gray-500 shrink-0" />
          <span
            className={`text-sm font-mono font-bold ${runner.tiempo_neto ? "text-amber-300" : "text-gray-600"}`}
          >
            {runner.tiempo_neto ?? "—"}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {CONTROL_KEYS.map((controlKey, index) => {
            const value = runner[controlKey];
            return (
              <div
                key={`${runner.id}-${controlKey}`}
                className="rounded bg-gray-800/80 border border-gray-700/50 px-1.5 py-1"
              >
                <div className="text-[10px] leading-none text-gray-500">
                  C{index + 1}
                </div>
                <div
                  className={`text-[11px] leading-tight font-mono font-semibold ${value ? "text-amber-300" : "text-gray-600"}`}
                >
                  {value ?? "--:--:--"}
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>
      </div>
    </div>
  );
}

