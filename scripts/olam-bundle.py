"""Bundle final artifacts, exact public-statistics inputs and reproduction code."""
from pathlib import Path
import hashlib
import json
import zipfile

ROOT = Path(__file__).resolve().parents[1]
PUB = ROOT / 'public/case-studies/olam-global'
RESEARCH = ROOT / 'research/olam-global'
DEST = PUB / 'olam-global-research-v1.zip'

for aux in PUB.glob('*.inspect.ndjson'):
    aux.unlink()
for report in PUB.glob('*.md'):
    report.write_text('\n'.join(line.rstrip() for line in report.read_text().splitlines()) + '\n')
files = [p for p in PUB.iterdir() if p.is_file() and p != DEST and p.name != 'package-manifest.json']
files += sorted((ROOT / 'scripts').glob('olam-*'))
files += [ROOT / n for n in ['src/lib/olamGlobalModel.ts', 'src/lib/olamNigeriaDecisionModel.ts', 'tests/olam-africa-strategy.ts', 'src/pages/OlamAfricaGrowthStrategyPage.tsx', 'src/pages/OlamGlobalStrategy.css', 'package.json', 'package-lock.json']]
files += [RESEARCH / n for n in ['baseline.json', 'membership-verification.csv', 'retrieval-manifest.json', 'country-panel.csv', 'regression-holdout.csv']]
files += [RESEARCH / n for n in ['master-prompt.md', 'extended-retrieval-manifest.json', 'indicator-metadata.json', 'wpp-variants.csv', 'extended-country-panel.csv']]
files += sorted((RESEARCH / 'raw').glob('wdi_*.json'))
files += sorted((RESEARCH / 'raw').glob('wdi-metadata-*.json'))
files += [RESEARCH / 'raw' / n for n in ['m49.csv', 'wpp-milestones.csv']]
assert all(p.is_file() for p in files)
version = json.loads((PUB / 'deck.json').read_text())['version']
environment = json.loads((PUB / 'environment.json').read_text())
environment['version'] = version
(PUB / 'environment.json').write_text(json.dumps(environment, indent=2) + '\n')
manifest = {'version': version, 'entries': [
    {'path': str(p.relative_to(ROOT)), 'bytes': p.stat().st_size,
     'sha256': hashlib.sha256(p.read_bytes()).hexdigest()}
    for p in sorted(set(files))
]}
(PUB / 'package-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
with zipfile.ZipFile(DEST, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for p in sorted(set(files)):
        z.write(p, str(p.relative_to(ROOT)))
    z.write(PUB / 'package-manifest.json', 'package-manifest.json')
with zipfile.ZipFile(DEST) as z:
    assert z.testzip() is None
parts_dir = RESEARCH / 'package-parts'
parts_dir.mkdir(exist_ok=True)
archive = DEST.read_bytes()
parts = []
for i, offset in enumerate(range(0, len(archive), 8_000_000), 1):
    data = archive[offset:offset+8_000_000]
    name = f'part-{i:03}.bin'
    (parts_dir / name).write_bytes(data)
    parts.append({'file': name, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
index = {'version': version, 'bytes': len(archive), 'sha256': hashlib.sha256(archive).hexdigest(), 'parts': parts}
(parts_dir / 'index.json').write_text(json.dumps(index, indent=2) + '\n')
print(json.dumps({'archive': DEST.name, 'files': len(files) + 1, 'bytes': DEST.stat().st_size}))
