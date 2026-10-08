"""Repair the SDK's internal jump relationship type before final validation.

All text/charts/tables are authored by @oai/artifact-tool. Its rich-text API
exports an internal slide URI as a generic hyperlink relationship; PowerPoint
slide jumps require a relationship to the slide part. Preserve the native
contents and action, changing only that relationship type, with target checks.
"""
from pathlib import Path
from xml.etree import ElementTree as ET
import copy,re,sys,zipfile
file=Path(sys.argv[1]);temp=file.with_suffix('.links.tmp')
R='http://schemas.openxmlformats.org/package/2006/relationships'
A='http://schemas.openxmlformats.org/drawingml/2006/main'
RID='http://schemas.openxmlformats.org/officeDocument/2006/relationships'
ET.register_namespace('',R)
count=0
with zipfile.ZipFile(file) as source,zipfile.ZipFile(temp,'w') as dest:
    names=set(source.namelist())
    for item in source.infolist():
        data=source.read(item.filename)
        if re.fullmatch(r'ppt/slides/_rels/slide\d+\.xml\.rels',item.filename):
            owner=item.filename.replace('/_rels/','/').removesuffix('.rels')
            jumps={h.get('{'+RID+'}id') for h in ET.fromstring(source.read(owner)).findall('.//{'+A+'}hlinkClick') if h.get('action')=='ppaction://hlinksldjump'}
            xml=ET.fromstring(data);changed=False
            for rel in xml:
                if rel.get('Id') not in jumps:continue
                target=rel.get('Target','')
                assert re.fullmatch(r'slide\d+\.xml',target) and 'ppt/slides/'+target in names
                assert rel.get('TargetMode')!='External'
                rel.set('Type',RID+'/slide');changed=True;count+=1
            if changed:data=ET.tostring(xml,encoding='utf-8',xml_declaration=True)
        # ZipFile.writestr mutates ZipInfo.header_offset. Keep the source's
        # directory untouched because later relationships read earlier slides.
        dest.writestr(copy.copy(item),data)
temp.replace(file)
print('Verified internal slide-jump relationships:',count)
