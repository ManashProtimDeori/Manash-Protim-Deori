import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const src = resolve(root, 'src/generated/commercial-ev-assets');
const out = resolve(root, 'public/case-studies/commercial-ev-growth-advisory');

const assets = [
  { name: 'Manash-Protim-Deori-Commercial-EV-Growth-Advisory-Case.pptx', parts: 1 },
  { name: 'Manash-Protim-Deori-Commercial-EV-Growth-Advisory-Case.pdf', parts: 1 },
  { name: 'Manash-Protim-Deori-Commercial-EV-Model.xlsx', parts: 1 },
  { name: 'Commercial-EV-Case-Interview-Defence.pdf', parts: 1 },
];

await mkdir(out, { recursive: true });

for (const asset of assets) {
  let encoded = '';
  for (let i = 1; i <= asset.parts; i += 1) {
    const file = resolve(src, asset.name + '.' + String(i).padStart(2, '0') + '.b64');
    encoded += (await readFile(file, 'utf8')).trim();
  }
  const bytes = Buffer.from(encoded, 'base64');
  await writeFile(resolve(out, asset.name), bytes);
  console.log('[commercial-ev-assets] materialized', asset.name, bytes.length, 'bytes');
}
