import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "android", "app", "src", "main", "assets", "www");

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const name of ["index.html", "app.js", "styles.css", "manifest.webmanifest", "public"]) {
  await cp(join(root, name), join(out, name), { recursive: true });
}

console.log(`Android assets synced to ${out}`);
