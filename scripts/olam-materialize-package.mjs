/** Reassemble the research archive from bounded Git upload parts. */
import { readFile, writeFile, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const root = process.cwd();
const partsRoot = path.join(root, 'research/olam-global/package-parts');
const index = JSON.parse(await readFile(path.join(partsRoot, 'index.json'), 'utf8'));
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const parts = [];
for (const part of index.parts) {
  if (!/^part-\d{3}\.bin$/.test(part.file)) throw new Error('Invalid research part filename');
  const data = await readFile(path.join(partsRoot, part.file));
  if (data.length !== part.bytes || sha256(data) !== part.sha256) throw new Error('Research part checksum mismatch: ' + part.file);
  parts.push(data);
}
const archive = Buffer.concat(parts);
if (archive.length !== index.bytes || sha256(archive) !== index.sha256) throw new Error('Research archive checksum mismatch');
const target = path.join(root, 'public/case-studies/olam-global/olam-global-research-v1.zip');
await writeFile(target + '.tmp', archive);
await rename(target + '.tmp', target);
console.log('Olam research archive verified and materialized:', archive.length, 'bytes');
