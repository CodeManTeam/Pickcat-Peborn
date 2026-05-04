import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { extname, join, dirname } from "https://deno.land/std@0.208.0/path/mod.ts"; // 导入 dirname

// 获取当前文件所在的目录
const __dirname = new URL(".", import.meta.url).pathname;

// 本地文件服务的根目录
const localFileRoot = join(__dirname);

// 端口号
const port = 8000;

// MIME 类型映射表
const mimeTypes: { [key: string]: string } = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".webp": "image/webp",
  // 添加更多你需要的 MIME 类型
};

console.log(`Serving local files from ${localFileRoot} or proxying to flowecho-site.deno.dev on http://localhost:${port}`);

serve(async (req: Request) => {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // 检查路径是否以 "/wave/" 开头
    // 如果以 "/wave/" 开头，则提供本地文件
    let filePath = decodeURIComponent(pathname); // 移除 /wave 前缀

    // Handle root path redirects based on query parameters
    // Handle root path redirects based on query parameters
    if (pathname === "/" || pathname === "") {
        const type = url.searchParams.get('type');
        const id = url.searchParams.get('id');

        let redirectUrl: string | null = null;

        if (!type || type === 'editor') {
            redirectUrl = 'https://ccp.be-a.dev/editor';
        } else if (type === 'player' && id) {
            redirectUrl = `https://coco.codemao.cn/http-widget-proxy/https://ccp.be-a.dev/editor/player/?id=${id}`;
        }

        if (redirectUrl) {
            console.log(`Redirecting to: ${redirectUrl}`);
            return new Response(null, {
                status: 302, // Found (temporary redirect)
                headers: {
                    'Location': redirectUrl
                }
            });
        } else {
            // If no redirect matches for the root path, return 404
            console.log("No redirect match for root path, returning 404");
            return new Response("Not Found", { status: 404 });
        }
    }

    // 构建完整的文件路径，相对于 localFileRoot
    let fullPath = join(localFileRoot, filePath);

    console.log("pathname: " + pathname + ", local file: " + fullPath)

    // 防止路径遍历攻击
    if (!fullPath.startsWith(localFileRoot)) {
        return new Response("Forbidden", { status: 403 });
    }

    const requestedExt = extname(pathname); // Get extension from the requested pathname

    try {
        if (requestedExt === "") {
            // If no extension is provided, first try to serve the .html version
            const htmlPath = fullPath + ".html";
            try {
                const htmlStat = await Deno.stat(htmlPath);
                if (htmlStat.isFile) {
                    const file = await Deno.open(htmlPath, { read: true });
                    const headers = new Headers({
                        "content-type": "text/html", // Explicitly set HTML content type
                    });
                    console.log(`Serving ${htmlPath}`);
                    return new Response(file.readable, { headers });
                }
            } catch (eHtml) {
                if (!(eHtml instanceof Deno.errors.NotFound)) {
                    // Handle other errors when checking for .html
                    console.error("Error checking for potential .html file:", eHtml);
                    return new Response("Internal Server Error", { status: 500 });
                }
                // If .html not found, fall through to try the original path
            }

            // If .html version was not found or not a file, try the original path
            try {
                const stat = await Deno.stat(fullPath);
                if (stat.isFile) {
                    const ext = extname(fullPath).toLowerCase();
                    const contentType = mimeTypes[ext] || "application/octet-stream";
                    const file = await Deno.open(fullPath, { read: true });
                    const headers = new Headers({
                        "content-type": contentType,
                    });
                    console.log(`Serving ${fullPath}`);
                    return new Response(file.readable, { headers });
                } else if (stat.isDirectory) {
                    // If original path is a directory, try serving index.html
                    const indexPath = join(fullPath, "index.html");
                    try {
                        const indexStat = await Deno.stat(indexPath);
                        if (indexStat.isFile) {
                            const file = await Deno.open(indexPath, { read: true });
                            const headers = new Headers({
                                "content-type": "text/html",
                            });
                            console.log(`Serving ${indexPath}`);
                            return new Response(file.readable, { headers });
                        } else {
                            // index.html exists but is not a file
                            console.log(`Directory Listing Not Supported for ${fullPath}`);
                            return new Response("Directory Listing Not Supported", { status: 404 });
                        }
                    } catch (eIndex) {
                        if (eIndex instanceof Deno.errors.NotFound) {
                            // index.html not found in directory
                            console.log(`Directory Listing Not Supported for ${fullPath}`);
                            return new Response("Directory Listing Not Supported", { status: 404 });
                        }
                        // Other errors checking index.html
                        console.error("Error serving directory index:", eIndex);
                        return new Response("Internal Server Error", { status: 500 });
                    }
                } else {
                     // Original path exists but is not a file or directory
                    console.log(`Not Found: ${fullPath}`);
                    return new Response("Not Found", { status: 404 });
                }
            } catch (eOriginal) {
                 if (eOriginal instanceof Deno.errors.NotFound) {
                    // Original path not found either
                    console.log(`Not Found: ${fullPath}`);
                    return new Response("Not Found", { status: 404 });
                 }
                 // Other errors statting original path
                 console.error("Error serving original path:", eOriginal);
                 return new Response("Internal Server Error", { status: 500 });
            }

        } else {
            // If an extension is provided, just try to serve the original path
            try {
                const stat = await Deno.stat(fullPath);
                if (stat.isFile) {
                    const ext = extname(fullPath).toLowerCase();
                    const contentType = mimeTypes[ext] || "application/octet-stream";
                    const file = await Deno.open(fullPath, { read: true });
                    const headers = new Headers({
                        "content-type": contentType,
                    });
                    console.log(`Serving ${fullPath}`);
                    return new Response(file.readable, { headers });
                } else {
                    // Path exists but is not a file (e.g., directory with extension)
                    console.log(`Not Found: ${fullPath}`);
                    return new Response("Not Found", { status: 404 });
                }
            } catch (e) {
                if (e instanceof Deno.errors.NotFound) {
                    // File not found with extension
                    console.log(`Not Found: ${fullPath}`);
                    return new Response("Not Found", { status: 404 });
                }
                // Other errors statting path with extension
                console.error("Error serving file with extension:", e);
                return new Response("Internal Server Error", { status: 500 });
            }
        }

    } catch (e) {
        // Catch any unexpected errors during the process
        console.error("Unexpected error in file serving logic:", e);
        return new Response("Internal Server Error", { status: 500 });
    }
}, { port });