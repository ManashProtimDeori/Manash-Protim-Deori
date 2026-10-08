"""Retain unchanged native charts and their original embedded workbooks.

The audit integration changes slide text but leaves all three chart datasets
unchanged. Preserve source chart parts byte-for-byte rather than substituting
new literal workbook snapshots.
"""
import pathlib, sys, zipfile, xml.etree.ElementTree as ET

source_path, candidate_path = map(pathlib.Path, sys.argv[1:3])
ns={'c':'http://schemas.openxmlformats.org/drawingml/2006/chart'}
def values(data):
    root=ET.fromstring(data)
    return [[x.text for x in series.findall('.//c:val//c:pt/c:v',ns)] for series in root.findall('.//c:ser',ns)]

with zipfile.ZipFile(source_path) as original, zipfile.ZipFile(candidate_path) as candidate:
    source={n:original.read(n) for n in original.namelist() if n.startswith('ppt/slides/charts/') or n.startswith('ppt/embeddings/')}
    charts=[n for n in source if n.startswith('ppt/slides/charts/chart') and n.endswith('.xml')]
    assert len(charts)==3
    for name in charts:assert values(candidate.read(name))==values(source[name]),f'Changed chart data: {name}'
    files={n:candidate.read(n) for n in candidate.namelist()}
    files.update(source)
    ct=ET.fromstring(files['[Content_Types].xml'])
    srcct=ET.fromstring(original.read('[Content_Types].xml'))
    existing={(x.tag,x.get('Extension'),x.get('PartName')) for x in ct}
    for entry in srcct:
        key=(entry.tag,entry.get('Extension'),entry.get('PartName'))
        if (entry.get('Extension')=='xlsx' or (entry.get('PartName','').lstrip('/') in source)) and key not in existing:
            ct.append(entry);existing.add(key)
    ET.register_namespace('', 'http://schemas.openxmlformats.org/package/2006/content-types')
    files['[Content_Types].xml']=ET.tostring(ct,encoding='utf-8',xml_declaration=True)
temporary=candidate_path.with_suffix('.portable.pptx')
with zipfile.ZipFile(temporary,'w',zipfile.ZIP_DEFLATED) as out:
    for name,data in files.items():out.writestr(name,data)
temporary.replace(candidate_path)
print('Preserved three native source charts and embedded workbooks unchanged.')
