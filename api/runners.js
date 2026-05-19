import http from "node:http";
import https from "node:https";

const DEFAULT_BACKEND_URL = process.env.RESULTS_API_URL?.trim();

function requestText(urlString, headers) {
  return new Promise((resolve, reject) => {
    const target = new URL(urlString);
    const client = target.protocol === "https:" ? https : http;

    const request = client.request(
      {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port || undefined,
        path: `${target.pathname}${target.search}`,
        method: "GET",
        headers,
      },
      (response) => {
        let data = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          resolve({
            status: response.statusCode || 502,
            body: data,
            contentType: response.headers["content-type"],
          });
        });
      },
    );

    request.on("error", (error) => {
      reject(error);
    });

    request.setTimeout(15_000, () => {
      request.destroy(new Error("Upstream timeout"));
    });

    request.end();
  });
}

export default async function runnersProxy(req, res) {
  if (req.method && req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    if (!DEFAULT_BACKEND_URL) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(
        JSON.stringify({
          error: "Missing RESULTS_API_URL in Vercel environment variables",
        }),
      );
      return;
    }

    const incomingUrl = new URL(req.url, "http://localhost");
    const targetUrl = new URL(DEFAULT_BACKEND_URL);
    targetUrl.search = incomingUrl.search;

    const headers = {
      "ngrok-skip-browser-warning": "1",
    };

    if (process.env.RESULTS_API_KEY) {
      headers["x-api-key"] = process.env.RESULTS_API_KEY;
    }

    const response = await requestText(targetUrl.toString(), headers);

    res.statusCode = response.status;
    res.setHeader(
      "Content-Type",
      response.contentType || "application/json; charset=utf-8",
    );
    res.setHeader("Cache-Control", "no-store");
    res.end(response.body);
  } catch (error) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Proxy error",
      }),
    );
  }
}
