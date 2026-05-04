const { app, BrowserWindow } = require("electron");
const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const { extname, join, normalize } = require("node:path");

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function flattenSetCookie(value) {
  if (!value) return "";
  return value
    .split(/,(?=[^;,]+=)/)
    .map((part) => part.split(";")[0].trim())
    .filter(Boolean)
    .join(";");
}

function appRoot() {
  return app.isPackaged ? join(process.resourcesPath, "app") : join(__dirname, "..");
}

function startLocalServer(root) {
  const proxyHosts = {
    "/proxy/codemao/": "https://api.codemao.cn",
    "/proxy/creation/": "https://api-creation.codemao.cn",
    "/proxy/open-service/": "https://open-service.codemao.cn"
  };

  const server = createServer(async (request, response) => {
    const url = new URL(request.url || "/", "http://127.0.0.1");

    if (url.pathname === "/proxy/media") {
      const target = url.searchParams.get("url") || "";
      if (!/^https?:\/\//i.test(target)) {
        response.writeHead(400, { "content-type": "text/plain; charset=utf-8", "access-control-allow-origin": "*" });
        response.end("Bad media url");
        return;
      }
      try {
        const upstreamResponse = await fetch(target, {
          headers: {
            "user-agent": "Pickcat-Reborn/0.1 Desktop",
            accept: request.headers.accept || "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
            referer: "https://shequ.codemao.cn/"
          }
        });
        const body = Buffer.from(await upstreamResponse.arrayBuffer());
        response.writeHead(upstreamResponse.status, {
          "content-type": upstreamResponse.headers.get("content-type") || "application/octet-stream",
          "access-control-allow-origin": "*",
          "cache-control": "public, max-age=86400"
        });
        response.end(body);
      } catch (error) {
        response.writeHead(502, { "content-type": "text/plain; charset=utf-8", "access-control-allow-origin": "*" });
        response.end(`Media proxy failed: ${String(error)}`);
      }
      return;
    }

    const proxyPrefix = Object.keys(proxyHosts).find((prefix) => url.pathname.startsWith(prefix));
    if (proxyPrefix) {
      const upstreamPath = url.pathname.replace(proxyPrefix.slice(0, -1), "");
      const upstream = `${proxyHosts[proxyPrefix]}${upstreamPath}${url.search}`;
      try {
        const chunks = [];
        for await (const chunk of request) chunks.push(chunk);
        const body = chunks.length ? Buffer.concat(chunks) : undefined;
        const token = request.headers["x-codemao-token"];
        const cookie = request.headers["x-codemao-cookie"];
        const captchaTicket = request.headers["x-captcha-ticket"];
        const headers = {
          "user-agent": "Pickcat-Reborn/0.1 Desktop",
          accept: request.headers.accept || "application/json",
          "content-type": request.headers["content-type"] || "application/json"
        };
        if (token) {
          headers.authorization = `Bearer ${token}`;
          headers.cookie = `authorization=${token}; auth=${token}; token=${token}`;
        }
        if (cookie) headers.cookie = cookie;
        if (captchaTicket) headers["x-captcha-ticket"] = captchaTicket;

        const upstreamResponse = await fetch(upstream, {
          method: request.method,
          headers,
          body: request.method === "GET" || request.method === "HEAD" ? undefined : body
        });
        const responseBody = Buffer.from(await upstreamResponse.arrayBuffer());
        const setCookie = upstreamResponse.headers.get("set-cookie");
        const codemaoCookie = flattenSetCookie(setCookie);
        response.writeHead(upstreamResponse.status, {
          "content-type": upstreamResponse.headers.get("content-type") || "application/json; charset=utf-8",
          "access-control-allow-origin": "*",
          "access-control-expose-headers": "x-codemao-cookie",
          ...(codemaoCookie ? { "x-codemao-cookie": codemaoCookie } : {}),
          "cache-control": "no-store"
        });
        response.end(responseBody);
      } catch (error) {
        response.writeHead(502, { "content-type": "application/json; charset=utf-8" });
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
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

async function createWindow() {
  const { server, port } = await startLocalServer(appRoot());
  app.on("before-quit", () => server.close());

  const win = new BrowserWindow({
    width: 460,
    height: 860,
    minWidth: 380,
    minHeight: 720,
    title: "Pickcat Reborn",
    autoHideMenuBar: true,
    backgroundColor: "#dde6f3",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  await win.loadURL(`http://127.0.0.1:${port}/`);
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
