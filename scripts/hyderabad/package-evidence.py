"""Package the approved release and preserve the historical audit trail."""
import hashlib, json, pathlib, shutil, zipfile

ROOT = pathlib.Path(__file__).resolve().parents[2]
R = ROOT / 'research/hyderabad'
P = ROOT / 'public/case-studies/hyderabad-political-intelligence'
shutil.copyfile(ROOT / '.hyderabad-build/validation.json', R / 'presentation-validation.json')
checksums = {}
for name in ['Manash-Protim-Deori-Hyderabad.pptx','Manash-Protim-Deori-Hyderabad.pdf','manifest.json','deck-content.json']:
    data = (P / name).read_bytes()
    checksums[name] = {'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()}
(R / 'artifact-checksums.json').write_text(json.dumps(checksums,indent=2)+'\n')
with zipfile.ZipFile(P / 'Hyderabad-Evidence-Package.zip','w',zipfile.ZIP_DEFLATED) as z:
    for file in sorted(R.rglob('*')):
        if file.is_file(): z.write(file, 'research/'+file.relative_to(R).as_posix())
    for file in sorted((ROOT / 'scripts/hyderabad').glob('*')):
        if file.is_file(): z.write(file, 'generation/'+file.name)
print(json.dumps({'evidence_zip_bytes':(P / 'Hyderabad-Evidence-Package.zip').stat().st_size,'artifacts':checksums}))
