import { useEffect, useState } from "react";

/**
 * Hook que registra sesiones activas en el backend
 * Se ejecuta al cargar la página y cada 2 minutos después
 */
export function useSessionTracking(apiBaseUrl: string = "https://gigante-clasificacion.onrender.com") {
  useEffect(() => {
    let sessionId: string;

    const trackSession = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/sessions?id=${encodeURIComponent(sessionId || `session-${Date.now()}-${Math.random()}`)}`,
          { method: "GET" }
        );
        const data = await response.json();
        sessionId = data.sessionId;
      } catch (error) {
        console.debug("Session tracking error (non-critical):", error);
      }
    };

    // Registra sesión inicial
    trackSession();

    // Heartbeat cada 2 minutos
    const interval = setInterval(trackSession, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [apiBaseUrl]);
}

/**
 * Hook que obtiene el conteo actual de sesiones activas
 */
export function useActiveSessions(apiBaseUrl: string = "https://gigante-clasificacion.onrender.com") {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/sessions-count`);
        const data = await response.json();
        setCount(data.active);
      } catch (error) {
        console.debug("Failed to fetch session count:", error);
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 10 * 1000); // Actualiza cada 10 segundos

    return () => clearInterval(interval);
  }, [apiBaseUrl]);

  return count;
}
