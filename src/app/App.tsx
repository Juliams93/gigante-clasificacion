import GigantePage from "./pages/GigantePage";

export default function App() {
  const hostname =
    typeof globalThis !== "undefined" && globalThis.window
      ? globalThis.window.location.hostname
      : "";
  const isVercelHost = hostname.endsWith(".vercel.app");

  if (isVercelHost) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0b1220",
          color: "#e5e7eb",
          padding: "24px",
          textAlign: "center",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        <section>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            Sitio temporalmente no disponible
          </h1>
          <p style={{ opacity: 0.9 }}>
            Este enlace ha sido desactivado temporalmente.
          </p>
        </section>
      </main>
    );
  }

  return <GigantePage />;
}
