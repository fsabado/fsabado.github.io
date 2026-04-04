/**
 * Rasterize public/favicon.ico to PNG icons for the web app manifest.
 * Run after changing the favicon: `npm run pwa:icons`
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseICO } from 'icojs';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const icoPath = join(root, 'public/favicon.ico');
const outDir = join(root, 'public/icons');

async function main() {
  const buf = await readFile(icoPath);
  const images = await parseICO(buf, 'image/png');
  if (!images.length) {
    throw new Error('No images decoded from favicon.ico');
  }
  images.sort((a, b) => b.width - a.width);
  const input = Buffer.from(images[0].buffer);
  await mkdir(outDir, { recursive: true });
  await sharp(input).resize(192, 192).png().toFile(join(outDir, 'icon-192.png'));
  await sharp(input).resize(512, 512).png().toFile(join(outDir, 'icon-512.png'));
  console.log('Wrote public/icons/icon-192.png and icon-512.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
