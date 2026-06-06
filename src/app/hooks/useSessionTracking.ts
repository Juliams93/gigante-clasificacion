import { useEffect, useState } from "react";

// Almacenamiento local de sesiones (fallback cuando backend no responde)
const SESSION_STORAGE_KEY = "gigante_sessions";

function getLocalActiveSessions(): number {
  try {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return 1;
    const sessions = JSON.parse(stored);
    const now = Date.now();
    // Limpia sesiones expiradas (5 minutos)
    const active = Object.entries(sessions).filter(([, timestamp]: [string, any]) => 
      now - timestamp < 5 * 60 * 1000
    );
    const updated = Object.fromEntries(active);
    if (Object.keys(updated).length === 0) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return 1;
    }
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));
    return active.length;
  } catch {
    return 1;
  }
}

function recordLocalSession(): void {
  try {
    const sessionId = `session-${Date.now()}-${Math.random()}`;
    const sessions = (() => {
      try {
        return JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY) || "{}");
      } catch {
        return {};
      }
    })();
    sessions[sessionId] = Date.now();
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Hook que registra sesiones activas en el backend (con fallback a localStorage)
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
            headers: { "Content-Type": "application/json" }
          },
        );
        if (response.ok) {
          const data = await response.json();
          sessionId = data.sessionId;
          console.debug(`Session registered: ${sessionId}, active: ${data.activeCount}`);
          return;
        }
      } catch (error) {
        // Fallback to localStorage
        console.debug("Backend session tracking unavailable, using local fallback");
      }
      
      // Fallback: record locally
      recordLocalSession();
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
 * Primero intenta el backend, si falla usa localStorage
 */
export function useActiveSessions(
  apiBaseUrl: string = "https://gigante-clasificacion.onrender.com",
) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/sessions-count`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        
        if (response.ok) {
          const data = await response.json();
          setCount(data.active);
          console.debug(`Active sessions (backend): ${data.active}`);
          return;
        }
      } catch (err) {
        console.debug("Backend sessions endpoint unavailable");
      }
      
      // Fallback: usar localStorage
      const localCount = getLocalActiveSessions();
      setCount(localCount);
      console.debug(`Active sessions (local): ${localCount}`);
    };

    fetchCount();
    const interval = setInterval(fetchCount, 10 * 1000); // Actualiza cada 10 segundos

    return () => clearInterval(interval);
  }, [apiBaseUrl]);

  return count;
}
