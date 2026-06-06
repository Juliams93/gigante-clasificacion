import { useEffect, useState } from "react";

/**
 * Hook que registra sesiones activas en el backend
 * Se ejecuta al cargar la página y cada 2 minutos después
 */
export function useSessionTracking(
  apiBaseUrl: string = "https://gigante-clasificacion.onrender.com",
) {
  useEffect(() => {
    let sessionId: string | null = null;

    const trackSession = async () => {
      try {
        const id = sessionId || `session-${Date.now()}-${Math.random()}`;
        const response = await fetch(
          `${apiBaseUrl}/api/sessions?id=${encodeURIComponent(id)}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) {
          console.warn(
            `Session tracking failed: ${response.status} ${response.statusText}`,
          );
          return;
        }
        const data = await response.json();
        sessionId = data.sessionId;
        console.debug(
          `Session registered: ${sessionId}, active: ${data.activeCount}`,
        );
      } catch (error) {
        console.warn("Session tracking error:", error);
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
export function useActiveSessions(
  apiBaseUrl: string = "https://gigante-clasificacion.onrender.com",
) {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/sessions-count`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          console.warn(`Failed to fetch session count: ${response.status}`);
          setError(`Error ${response.status}`);
          setCount(null);
          return;
        }

        const data = await response.json();
        setCount(data.active);
        setError(null);
        console.debug(`Active sessions: ${data.active}`);
      } catch (err) {
        console.warn("Failed to fetch session count:", err);
        setError("Conexión");
        setCount(null);
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 10 * 1000); // Actualiza cada 10 segundos

    return () => clearInterval(interval);
  }, [apiBaseUrl]);

  return error ? 0 : count;
}
