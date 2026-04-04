/**
 * Convert large PNGs (>450 KB) to WebP to save bandwidth (e.g. photo screenshots).
 * After running, update any references from .png → .webp in content.
 *
 * Run: npm run optimize:images
 */
import { readdir, readFile, writeFile, unlink, stat } from 'node:fs/promises';
import { dirname, join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dirs = [join(root, 'projects'), join(root, 'public', 'images')];

const MIN_PNG_BYTES = 450_000;

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, files);
    else files.push(p);
  }
  return files;
}

async function main() {
  let all = [];
  for (const d of dirs) {
    try {
      all = all.concat(await walk(d));
    } catch {
      /* missing dir */
    }
  }

  for (const absPath of all) {
    if (extname(absPath).toLowerCase() !== '.png') continue;
    const before = (await stat(absPath)).size;
    if (before <= MIN_PNG_BYTES) continue;

    const input = await readFile(absPath);
    const dir = absPath.slice(0, -basename(absPath).length);
    const base = basename(absPath, '.png');
    const outPath = join(dir, `${base}.webp`);
    const buf = await sharp(input).webp({ quality: 85, effort: 6 }).toBuffer();
    await writeFile(outPath, buf);
    await unlink(absPath);
    console.log(
      `WebP ${(before / 1024).toFixed(0)} KB → ${(buf.length / 1024).toFixed(0)} KB: ${outPath.replace(root + '/', '')}`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
