import json, pathlib, textwrap, zipfile, hashlib
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import fitz, io

BASE = pathlib.Path(__file__).resolve().parents[2]
ROOT = BASE
OUT = ROOT / 'public/case-studies/hyderabad-political-intelligence'
RESEARCH = ROOT / 'research/hyderabad'
PREVIEWS = ROOT / '.hyderabad-build/previews'
deck = json.loads((RESEARCH / 'deck-content.json').read_text())
pdfmetrics.registerFont(TTFont('SearchSans', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdf_path = OUT / 'Manash-Protim-Deori-Hyderabad.pdf'
temporary = ROOT / '.hyderabad-build/visual-slides.pdf'
c = canvas.Canvas(str(temporary), pagesize=(960,540), pageCompression=1)
c.setTitle(deck['title']); c.setAuthor(deck['candidate'])
c.setSubject('Independent application work sample; sources and reasoning in the appendix. Research cut-off: 8 October 2026.')
for slide in deck['slides']:
    stem = f"slide-{slide['number']:02}"
    image = Image.open(PREVIEWS / (stem+'.png'))
    assert image.size == (1280,720)
    buffer=io.BytesIO(); image.save(buffer,'WEBP',quality=94,method=4)
    data=buffer.getvalue(); assert len(data)>1000
    (OUT/'slides'/(stem+'.webp')).write_bytes(data)
    Image.open(OUT/'slides'/(stem+'.webp')).load()
    c.drawImage(ImageReader(image), 0,0,width=960,height=540)
    c.bookmarkPage(stem)
    c.addOutlineEntry(f"{slide['number']:02} · {slide['title']}", stem, level=0)
    # Searchable text layer; visual pages remain identical to reviewed slide renders.
    content = slide['title']+'\n'+slide.get('body','')+'\n'+slide.get('contribution','')+'\n'+slide.get('limits','')
    if slide.get('chart'):
        chart=slide['chart']
        content += '\n'+chart['title']+'\n'+'\n'.join(series['name']+': '+', '.join(f'{name} {value}' for name,value in zip(chart['categories'],series['values'])) for series in chart['series'])
    if slide.get('layout') == 'source-register':
        content += '\n'+'\n'.join(x['id']+' '+x['title']+' '+x['url']+' '+x['locator']+' '+x['limitation'] for x in slide['items'])
    else:
        content += '\n'+'\n'.join(' | '.join(row) for row in slide.get('items',[]))
    t=c.beginText(12,525); t.setFont('SearchSans',8); t.setLeading(9); t.setTextRenderMode(3)
    for line in textwrap.wrap(content,180): t.textLine(line)
    c.drawText(t); c.showPage()
c.save()
doc=fitz.open(temporary)
for i,slide in enumerate(deck['slides']):
    if slide.get('layout') == 'source-register':
        for j,source in enumerate(slide['items']):
            y=(185+j*155+70)*.75
            doc[i].insert_link({'kind':fitz.LINK_URI,'from':fitz.Rect(48,y,908,y+37.5),'uri':source['url']})
    if slide['number']==32:
        for y,uri in [(490,'mailto:manashdeori09@gmail.com'),(534,'https://linkedin.com/in/manash-protim-deori')]:
            doc[i].insert_link({'kind':fitz.LINK_URI,'from':fitz.Rect(51,y*.75,600,(y+34)*.75),'uri':uri})
doc.embfile_add('slide-content-and-notes.md',(RESEARCH/'slide-content-and-notes.md').read_bytes(),filename='slide-content-and-notes.md',desc='Speaker notes, exact sources, assumptions and limitations.')
doc.save(pdf_path,garbage=4,deflate=True);doc.close()
Image.open(OUT/'cover-art.png').save(OUT/'cover-art.webp','WEBP',quality=92,method=6)
check=fitz.open(pdf_path)
assert len(check)==len(deck['slides']) and len(check.get_toc())==len(deck['slides'])
assert sum(len(page.get_links()) for page in check)==len(deck['sources'])+2
assert 'Thank you' in check[31].get_text()
assert 'Evidence' in check[32].get_text()
assert 'manashdeori09@gmail.com' in check[31].get_text()
assert 'manashdeori 09' not in ''.join(page.get_text() for page in check)
assert '81660' in check[10].get_text() and '47267.28' in check[17].get_text()
check.close()
print(json.dumps({'pages':len(deck['slides']),'pdf_bytes':pdf_path.stat().st_size,'slides_webp':len(list((OUT/'slides').glob('*.webp'))),'source_and_contact_links':len(deck['sources'])+2}))
