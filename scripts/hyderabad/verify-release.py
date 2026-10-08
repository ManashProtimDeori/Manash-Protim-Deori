"""Check cross-format release consistency; this does not verify source truth."""
import collections, hashlib, json, os, pathlib, re, zipfile
import fitz
from PIL import Image
from xml.etree import ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parents[2]
R = ROOT / 'research/hyderabad'
P = ROOT / 'public/case-studies/hyderabad-political-intelligence'
d = json.loads((R / 'deck-content.json').read_text())
m = json.loads((P / 'manifest.json').read_text())
assert d == json.loads((P / 'deck-content.json').read_text())
assert d['content_version'] == m['contentVersion'] == 'v21'
assert len(d['slides']) == m['total'] == 77
assert d['main_count'] == m['mainCount'] == 32
assert d['slides'][31]['layout'] == 'thanks'
assert d['slides'][32]['section'] == 'Appendix navigation'
assert len(d['facts']) == 41 and len(d['claims']) == 131 and len(d['sources']) == 30
claim_ids = {c['id'] for c in d['claims']}
fact_ids = {f['id'] for f in d['facts']}
source_ids = {s['id'] for s in d['sources']}
assert len(claim_ids) == 131 and len(fact_ids) == 41 and len(source_ids) == 30
assert not claim_ids.intersection({'C01', 'R01', 'C32', 'R32'})
assert {f['id'] for f in d['facts'] if f['verification_status'] == 'Blocked'} == {'F08','F09','F10','F11','F16'}
assert collections.Counter(f['verification_status'] for f in d['facts']) == {'Supported':22,'Qualified':14,'Blocked':5}
for c in d['claims']:
    assert set(c['sources']) <= source_ids, c['id']
    if c['id'].startswith('R'): assert c['type'] == 'Proposed work product' and c['verification_status'] == 'Proposal', c['id']
for f in d['facts']: assert set(f['sources']) <= source_ids, f['id']
for s, ms in zip(d['slides'], m['slides']):
    assert s['number'] == ms['number'] and s['notes'] == ms['notes']
    assert set(s.get('facts', [])) <= fact_ids
    active = json.dumps(s, ensure_ascii=False)
    for identifier in re.findall(r'\b(?:F|I|R|C|S)\d{2}\b', active):
        assert identifier in claim_ids | source_ids, (s['number'], identifier)
    assert 'manashdeori 09@gmail.com' not in active
    with Image.open(P / 'slides' / ms['image']) as im: assert im.size == (1280,720)
assert 'manashdeori09@gmail.com' in d['slides'][31]['body']
assert len(d['iterations']) == 20
assert all((R / f'versions/v{i:02}.json').exists() for i in range(1,22))
assert sum([64,39,8,7,1]) == 119 and sum([7,7,1]) == 15
assert sum([99,4,44,2,1]) == sum([56,48,44,2,0]) == 150
assert [46153-45275,62185-60148,99776-18116] == [878,2037,81660]
assert round((47267.28/36480.87-1)*100,1) == 29.6

pdf = fitz.open(P / 'Manash-Protim-Deori-Hyderabad.pdf')
assert len(pdf) == len(pdf.get_toc()) == 77
assert sum(len(p.get_links()) for p in pdf) == 32
assert pdf.embfile_count() >= 1
assert 'manashdeori09@gmail.com' in pdf[31].get_text()
assert '81660' in pdf[10].get_text() and '47267.28' in pdf[17].get_text()
assert 'manashdeori 09@gmail.com' not in ''.join(p.get_text() for p in pdf)

ns = {'c':'http://schemas.openxmlformats.org/drawingml/2006/chart'}
with zipfile.ZipFile(P / 'Manash-Protim-Deori-Hyderabad.pptx') as z:
    assert not z.testzip()
    assert len([n for n in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+.xml',n)]) == 77
    assert len([n for n in z.namelist() if re.fullmatch(r'ppt/notesSlides/notesSlide\d+.xml',n)]) == 77
    charts = sorted(n for n in z.namelist() if re.fullmatch(r'ppt/(?:slides/)?charts/chart\d+.xml',n))
    books = sorted(n for n in z.namelist() if n.startswith('ppt/embeddings/') and n.endswith('.xlsx'))
    assert len(charts) == len(books) == 3
    actual = [[float(v.text) for v in ET.fromstring(z.read(c)).findall('.//c:numCache/c:pt/c:v',ns)] for c in charts]
    expected = [[value for series in s['chart']['series'] for value in series['values']] for s in d['slides'] if s.get('chart')]
    assert actual == expected, (actual,expected)
    reference = os.environ.get('HYDERABAD_REFERENCE')
    if reference:
        with zipfile.ZipFile(reference) as original:
            for n in charts + books: assert z.read(n) == original.read(n), n

receipt = json.loads((R / 'presentation-validation.json').read_text())
assert receipt['packageIntegrity']['status'] == 'pass'
assert receipt['presentationLayout']['finding_count'] == 0
assert receipt['firstPartyImport']['passed'] and receipt['nativeQuantitativeCharts']['report']['passed']
assert receipt['finalSha256'] == hashlib.sha256((P / 'Manash-Protim-Deori-Hyderabad.pptx').read_bytes()).hexdigest()
for name, expected in json.loads((R / 'artifact-checksums.json').read_text()).items():
    data = (P / name).read_bytes()
    assert len(data) == expected['bytes'] and hashlib.sha256(data).hexdigest() == expected['sha256'], name
print(json.dumps({'version':'v21','slides':77,'sources':30,'facts':41,'registered_items':131,'blocked_facts':5,'native_charts':3,'searchable_pdf':True,'checks':'passed'}))
