import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";

function flattenSetCookie(value) {
  if (!value) return "";
  return value
    .split(/,(?=[^;,]+=)/)
    .map((part) => part.split(";")[0].trim())
    .filter(Boolean)
    .join(";");
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml"
};

createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://127.0.0.1:${port}`);
  const proxyHosts = {
    "/proxy/codemao/": "https://api.codemao.cn",
    "/proxy/creation/": "https://api-creation.codemao.cn",
    "/proxy/open-service/": "https://open-service.codemao.cn"
  };
  const proxyPrefix = Object.keys(proxyHosts).find((prefix) => url.pathname.startsWith(prefix));

  if (proxyPrefix) {
    const upstreamPath = url.pathname.replace(proxyPrefix.slice(0, -1), "");
    const upstream = `${proxyHosts[proxyPrefix]}${upstreamPath}${url.search}`;

    try {
      const chunks = [];
      for await (const chunk of request) {
        chunks.push(chunk);
      }
      const requestBody = chunks.length ? Buffer.concat(chunks) : undefined;
      const token = request.headers["x-codemao-token"];
      const cookie = request.headers["x-codemao-cookie"];
      const captchaTicket = request.headers["x-captcha-ticket"];
      const headers = {
        "user-agent": "Pickcat-Reborn/0.1",
        "accept": request.headers.accept || "application/json",
        "content-type": request.headers["content-type"] || "application/json"
      };
      if (token) {
        headers.authorization = `Bearer ${token}`;
        headers.cookie = `authorization=${token}; auth=${token}; token=${token}`;
      }
      if (cookie) {
        headers.cookie = cookie;
      }
      if (captchaTicket) {
        headers["x-captcha-ticket"] = captchaTicket;
      }

      const upstreamResponse = await fetch(upstream, {
        method: request.method,
        headers,
        body: request.method === "GET" || request.method === "HEAD" ? undefined : requestBody
      });
      const responseBody = await upstreamResponse.arrayBuffer();
      const setCookie = upstreamResponse.headers.get("set-cookie");
      const codemaoCookie = flattenSetCookie(setCookie);
      response.writeHead(upstreamResponse.status, {
        "content-type": upstreamResponse.headers.get("content-type") || "application/json; charset=utf-8",
        "access-control-allow-origin": "*",
        "access-control-expose-headers": "x-codemao-cookie",
        ...(codemaoCookie ? { "x-codemao-cookie": codemaoCookie } : {}),
        ...(setCookie ? { "set-cookie": setCookie } : {}),
        "cache-control": "no-store"
      });
      response.end(Buffer.from(responseBody));
    } catch (error) {
      response.writeHead(502, {
        "content-type": "application/json; charset=utf-8",
        "access-control-allow-origin": "*"
      });
      response.end(JSON.stringify({ error: "Proxy failed", detail: String(error) }));
    }
    return;
  }

  const pathname = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const target = normalize(join(root, pathname));

  if (!target.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(target);
    response.writeHead(200, {
      "content-type": types[extname(target)] || "application/octet-stream",
      "cache-control": "no-store"
    });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, host, () => {
  console.log(`Pickcat Reborn running at http://${host}:${port}`);
});
