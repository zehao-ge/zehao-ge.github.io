import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createGzip } from "node:zlib";

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT || 4174);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".pdf": "application/pdf", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8" };

createServer((request, response) => {
  const pathname = new URL(request.url || "/", "http://localhost").pathname;
  let target = normalize(join(root, pathname));
  if (!target.startsWith(root)) { response.writeHead(403).end(); return; }
  try { if (statSync(target).isDirectory()) target = join(target, "index.html"); }
  catch { target = join(root, "404.html"); }
  const type = types[extname(target)] || "application/octet-stream";
  const headers = { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable" };
  if (/\.(html|css|js|svg|xml|txt)$/.test(target) && request.headers["accept-encoding"]?.includes("gzip")) {
    response.writeHead(200, { ...headers, "Content-Encoding": "gzip", Vary: "Accept-Encoding" });
    createReadStream(target).pipe(createGzip()).pipe(response);
  } else {
    response.writeHead(200, headers);
    createReadStream(target).pipe(response);
  }
}).listen(port, "127.0.0.1");
