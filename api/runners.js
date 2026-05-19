const DEFAULT_BACKEND_URL =
  process.env.RESULTS_API_URL?.trim() ||
  "https://delegate-bagginess-massive.ngrok-free.dev/api/runners";

module.exports = async function runnersProxy(req, res) {
  if (req.method && req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const incomingUrl = new URL(req.url, "http://localhost");
    const targetUrl = new URL(DEFAULT_BACKEND_URL);
    targetUrl.search = incomingUrl.search;

    const headers = {
      "ngrok-skip-browser-warning": "1",
    };

    if (process.env.RESULTS_API_KEY) {
      headers["x-api-key"] = process.env.RESULTS_API_KEY;
    }

    const response = await fetch(targetUrl.toString(), { headers });
    const body = await response.text();

    res.statusCode = response.status;
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/json; charset=utf-8",
    );
    res.setHeader("Cache-Control", "no-store");
    res.end(body);
  } catch (error) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Proxy error",
      }),
    );
  }
};
