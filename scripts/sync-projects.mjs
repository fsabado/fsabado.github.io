/**
 * Mirror `projects/*` → `public/projects/` so /projects/... URLs work in dev and build.
 * Same assets CI used to copy via shell; `predev` / `prebuild` run this automatically.
 */
import { cp, mkdir } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const src = join(root, 'projects');
const dest = join(root, 'public', 'projects');

async function main() {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (const ent of entries) {
    await cp(join(src, ent.name), join(dest, ent.name), { recursive: true });
  }
  console.log('Synced projects/ → public/projects/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
