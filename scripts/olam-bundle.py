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
files = [p for p in PUB.iterdir() if p.is_file() and p != DEST and p.name != 'package-manifest.json']
files += sorted((ROOT / 'scripts').glob('olam-*'))
files += [ROOT / 'src/lib/olamGlobalModel.ts', ROOT / 'tests/olam-africa-strategy.ts']
files += [RESEARCH / n for n in ['baseline.json', 'membership-verification.csv', 'retrieval-manifest.json', 'country-panel.csv', 'regression-holdout.csv']]
files += sorted((RESEARCH / 'raw').glob('wdi_*.json'))
files += [RESEARCH / 'raw' / n for n in ['m49.csv', 'wpp-milestones.csv']]
assert all(p.is_file() for p in files)
manifest = {'version': '1.0.0', 'entries': [
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
print(json.dumps({'archive': DEST.name, 'files': len(files) + 1, 'bytes': DEST.stat().st_size}))
