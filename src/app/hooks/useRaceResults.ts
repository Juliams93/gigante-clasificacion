import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import type { Runner } from "../../types/supabase";
import { MOCK_RUNNERS } from "../data/mockRunners";

// Backend API URL configuration
const CONFIGURED_RESULTS_API_URL = (
  import.meta.env.VITE_RESULTS_API_URL as string | undefined
)?.trim();

function getResultsApiUrl(): string {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return "";
  }

  // If explicitly configured, use it
  if (CONFIGURED_RESULTS_API_URL) {
    return CONFIGURED_RESULTS_API_URL;
  }

  // Check if we're on localhost
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (isLocalhost) {
    // In development, use local API proxy
    return "/api/runners";
  }

  // In production without explicit config, return empty to trigger demo mode
  return "";
}

function isLocalBackendUrl(url: string): boolean {
  return /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?\//i.test(url);
}

const RESULTS_API_URL = getResultsApiUrl();
const RESULTS_API_KEY = (
  import.meta.env.VITE_RESULTS_API_KEY as string | undefined
)?.trim();

export type SortField = "puesto_general" | "tiempo_neto" | "dorsal";

interface UseRaceResultsOptions {
  categoria?: string;
  modalidad?: string;
  search?: string;
  dorsal?: string;
  nombre?: string;
  demoMode?: boolean;
  sortBy?: SortField;
}

interface UseRaceResultsReturn {
  runners: Runner[];
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  totalFinishers: number;
  isLive: boolean;
}

// Comparadores extraídos para evitar anidamiento excesivo
function replaceRunner(list: Runner[], updated: Runner): Runner[] {
  return list.map((r) => (r.id === updated.id ? updated : r));
}

function removeById(list: Runner[], id: number): Runner[] {
  return list.filter((r) => r.id !== id);
}

function matchesCategoria(runner: Runner, categoria?: string): boolean {
  if (!categoria || categoria === "TODAS") return true;
  return (
    runner.categoria.trim().toUpperCase() === categoria.trim().toUpperCase()
  );
}

function matchesModalidad(runner: Runner, modalidad?: string): boolean {
  if (!modalidad || modalidad === "TODAS") return true;
  const value = (
    runner.modalidad ??
    runner.source_table ??
    "GENERAL"
  ).toUpperCase();
  return value === modalidad;
}

function matchesDorsal(runner: Runner, dorsal?: string): boolean {
  if (!dorsal || String(dorsal).trim().length === 0) return true;
  const dorsalNumber = Number(String(dorsal).trim());
  if (Number.isNaN(dorsalNumber)) return true;
  return runner.dorsal === dorsalNumber;
}

function matchesNombre(runner: Runner, nombre?: string): boolean {
  if (!nombre || nombre.trim().length === 0) return true;
  const term = nombre.trim().toLowerCase();
  const fullName = `${runner.nombre} ${runner.apellidos}`.toLowerCase();
  return fullName.includes(term);
}

function matchesSearch(runner: Runner, search?: string): boolean {
  if (!search || search.trim().length === 0) return true;
  const term = search.trim().toLowerCase();
  const byName = `${runner.nombre} ${runner.apellidos}`
    .toLowerCase()
    .includes(term);
  const byDorsal = String(runner.dorsal).includes(term);
  return byName || byDorsal;
}

function sortRunners(runners: Runner[], sortBy: SortField): Runner[] {
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

function filterLocalRunners(
  runners: Runner[],
  options: {
    categoria?: string;
    modalidad?: string;
    dorsal?: string;
    nombre?: string;
    search?: string;
    sortBy: SortField;
  },
): Runner[] {
  const filtered = runners.filter(
    (runner) =>
      matchesCategoria(runner, options.categoria) &&
      matchesModalidad(runner, options.modalidad) &&
      matchesDorsal(runner, options.dorsal) &&
      matchesNombre(runner, options.nombre) &&
      matchesSearch(runner, options.search),
  );

  return sortRunners(filtered, options.sortBy);
}

function buildApiQuery({
  categoria,
  modalidad,
  dorsal,
  nombre,
  search,
  sortBy,
}: {
  categoria?: string;
  modalidad?: string;
  dorsal?: string;
  nombre?: string;
  search?: string;
  sortBy: SortField;
}) {
  const params = new URLSearchParams();
  if (categoria && categoria !== "TODAS") params.set("categoria", categoria);
  if (modalidad && modalidad !== "TODAS") params.set("modalidad", modalidad);
  if (dorsal && dorsal.trim().length > 0) params.set("dorsal", dorsal.trim());
  if (nombre && nombre.trim().length > 0) params.set("nombre", nombre.trim());
  if (search && search.trim().length > 0) params.set("q", search.trim());
  params.set("sortBy", sortBy);
  return params;
}

async function fetchRunnersFromApi(
  apiUrl: string,
  params: URLSearchParams,
): Promise<Runner[]> {
  const headers: Record<string, string> = {};
  if (RESULTS_API_KEY) headers["x-api-key"] = RESULTS_API_KEY;

  const response = await fetch(`${apiUrl}?${params.toString()}`, { headers });
  const json = await response.json();
  if (!response.ok || !Array.isArray(json.runners)) {
    throw new Error(json?.error ?? "Error API");
  }
  return json.runners as Runner[];
}

export function useRaceResults({
  categoria,
  modalidad,
  search,
  dorsal,
  nombre,
  demoMode = false,
  sortBy = "puesto_general",
}: UseRaceResultsOptions = {}): UseRaceResultsReturn {
  const [runners, setRunners] = useState<Runner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [totalFinishers, setTotalFinishers] = useState(0);

  // Determine if we should use API or demo mode
  // Get API URL at render time (not at module load time)
  const apiUrl = getResultsApiUrl();
  const shouldUseDemoMode = demoMode || !apiUrl;
  const usingApi = Boolean(apiUrl);

  // Carga inicial
  useEffect(() => {
    let active = true;

    if (shouldUseDemoMode) {
      const demoRunners = filterLocalRunners(MOCK_RUNNERS, {
        categoria,
        modalidad,
        dorsal,
        nombre,
        search,
        sortBy,
      });

      setLoading(false);
      setError(null);
      setRunners(demoRunners);
      setLastUpdate(new Date());
      setTotalFinishers(
        demoRunners.filter((r) => r.estado === "FINALIZADO").length,
      );
      return () => {
        active = false;
      };
    }

    if (usingApi && apiUrl) {
      const fetchFromApi = async () => {
        setLoading(true);
        setError(null);

        try {
          const params = buildApiQuery({
            categoria,
            modalidad,
            dorsal,
            nombre,
            search,
            sortBy,
          });
          const apiRunners = await fetchRunnersFromApi(apiUrl, params);
          if (!active) return;

          setRunners(apiRunners);
          setLastUpdate(new Date());
          setTotalFinishers(
            apiRunners.filter((r) => r.estado === "FINALIZADO").length,
          );
        } catch {
          if (!active) return;

          // Fallback visible en producción: si el backend falla, mostramos datos demo.
          const demoRunners = filterLocalRunners(MOCK_RUNNERS, {
            categoria,
            modalidad,
            dorsal,
            nombre,
            search,
            sortBy,
          });

          setRunners(demoRunners);
          setLastUpdate(new Date());
          setTotalFinishers(
            demoRunners.filter((r) => r.estado === "FINALIZADO").length,
          );
          setError(null);
        } finally {
          if (active) setLoading(false);
        }
      };

      fetchFromApi();
      const intervalId = setInterval(fetchFromApi, 45_000);

      return () => {
        active = false;
        clearInterval(intervalId);
      };
    }

    async function fetchRunners() {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("runners")
        .select("*")
        .neq("estado", "INSCRITO")
        .order(sortBy, { ascending: true, nullsFirst: false });

      if (categoria && categoria !== "TODAS") {
        query = query.eq("categoria", categoria);
      }

      if (modalidad && modalidad !== "TODAS") {
        query = query.eq("modalidad", modalidad);
      }

      if (dorsal && String(dorsal).trim().length > 0) {
        const dorsalNumber = Number(String(dorsal).trim());
        if (!Number.isNaN(dorsalNumber)) {
          query = query.eq("dorsal", dorsalNumber);
        }
      }

      if (nombre && nombre.trim().length > 1) {
        const term = nombre.trim();
        query = query.or(`nombre.ilike.%${term}%,apellidos.ilike.%${term}%`);
      }

      if (search && search.trim().length > 1) {
        const term = search.trim();
        query = query.or(
          `nombre.ilike.%${term}%,apellidos.ilike.%${term}%,dorsal.eq.${Number(term) || 0}`,
        );
      }

      const { data, error: err } = await query;
      if (!active) return;

      if (err) {
        setError("Error al cargar la clasificación. Comprueba la conexión.");
      } else {
        setRunners(data ?? []);
        setLastUpdate(new Date());
        setTotalFinishers(
          (data ?? []).filter((r) => r.estado === "FINALIZADO").length,
        );
      }
      setLoading(false);
    }

    fetchRunners();
    return () => {
      active = false;
    };
  }, [
    categoria,
    modalidad,
    search,
    dorsal,
    nombre,
    sortBy,
    demoMode,
    usingApi,
  ]);

  // Handlers para tiempo real — definidos fuera del channel callback
  const handleInsert = useCallback(
    (r: Runner) => setRunners((prev) => [...prev, r]),
    [],
  );
  const handleUpdate = useCallback((r: Runner) => {
    setRunners((prev) => replaceRunner(prev, r));
    if (r.estado === "FINALIZADO") setTotalFinishers((prev) => prev + 1);
  }, []);
  const handleDelete = useCallback((id: number) => {
    setRunners((prev) => removeById(prev, id));
  }, []);

  // Suscripción en tiempo real
  useEffect(() => {
    if (demoMode || usingApi) return;

    function onDbChange(payload: {
      eventType: string;
      new: unknown;
      old: unknown;
    }) {
      setLastUpdate(new Date());
      if (payload.eventType === "INSERT") handleInsert(payload.new as Runner);
      else if (payload.eventType === "UPDATE")
        handleUpdate(payload.new as Runner);
      else if (payload.eventType === "DELETE")
        handleDelete((payload.old as Runner).id);
    }

    const channel = supabase
      .channel("runners-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "runners" },
        onDbChange,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [handleInsert, handleUpdate, handleDelete, demoMode, usingApi]);

  // Filtra en cliente para reflejar cambios en tiempo real y modo demo
  const filteredRunners = runners.filter(
    (runner) =>
      matchesCategoria(runner, categoria) &&
      matchesModalidad(runner, modalidad) &&
      matchesDorsal(runner, dorsal) &&
      matchesNombre(runner, nombre) &&
      matchesSearch(runner, search),
  );

  const sorted = [...filteredRunners].sort((a, b) => {
    if (sortBy === "tiempo_neto") {
      if (!a.tiempo_neto) return 1;
      if (!b.tiempo_neto) return -1;
      return a.tiempo_neto.localeCompare(b.tiempo_neto);
    }
    if (sortBy === "puesto_general") {
      if (!a.puesto_general) return 1;
      if (!b.puesto_general) return -1;
      return a.puesto_general - b.puesto_general;
    }
    return a.dorsal - b.dorsal;
  });

  return {
    runners: sorted,
    loading,
    error,
    lastUpdate,
    totalFinishers: sorted.filter((r) => r.estado === "FINALIZADO").length,
    isLive: !demoMode,
  };
}
