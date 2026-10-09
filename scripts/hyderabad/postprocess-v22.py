"""Render and validate the 20-core Inclusive Minds release.
Structural checks are not independent verification of primary sources.
"""
import json, pathlib, zipfile, io, datetime, hashlib
import fitz
from PIL import Image

ROOT=pathlib.Path(__file__).resolve().parents[2]
R=ROOT/'research/hyderabad'
O=ROOT/'public/case-studies/hyderabad-political-intelligence'
data=json.loads((R/'deck-content.json').read_text())
main=data['main_count']; slides=data['slides']
assert main==20 and slides[19]['layout']=='thanks'
assert [s['number'] for s in slides[:20] if s.get('contribution')]==[18,19]
assert slides[20]['layout']=='divider'
blocked={'F08','F09','F10','F11','F16'}
assert not any(blocked.intersection(s['facts']) for s in slides[:20])
ppt=O/'Manash-Protim-Deori-Hyderabad.pptx'
pdf=O/'Manash-Protim-Deori-Hyderabad.pdf'
assert ppt.is_file() and pdf.is_file()
with zipfile.ZipFile(ppt) as archive:
    assert archive.testzip() is None
    slide_parts=[x for x in archive.namelist() if x.startswith('ppt/slides/slide') and x.endswith('.xml') and x.count('/')==2]
    assert len(slide_parts)==len(slides),(len(slide_parts),len(slides))
document=fitz.open(pdf)
assert len(document)==len(slides),(len(document),len(slides))
for filename, page_range in [
    ('Inclusive_Minds_Hyderabad_20_Slide_Executive_Deck.pdf',range(0,20)),
    ('Inclusive_Minds_Hyderabad_Complete_Evidence_Appendix.pdf',range(20,len(slides)))
]:
    subset=fitz.open()
    for i in page_range: subset.insert_pdf(document,from_page=i,to_page=i,links=True,annots=True)
    subset.set_metadata({'title':filename.replace('_',' '),'author':'Manash Protim Deori','subject':'Independent Inclusive Minds application research'})
    subset.save(str(O/filename),garbage=4,deflate=True)
    subset.close()
(O/'slides').mkdir(exist_ok=True)
for i,page in enumerate(document):
    pix=page.get_pixmap(matrix=fitz.Matrix(4/3,4/3),alpha=False)
    image=Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
    image=image.resize((1280,720),Image.Resampling.LANCZOS)
    dest=O/'slides'/('slide-%02d.webp'%(i+1))
    image.save(dest,'WEBP',quality=85,method=5)
    assert Image.open(dest).size==(1280,720)
document.close()
assert len(list((O/'slides').glob('slide-*.webp')))==len(slides)
entries=['deck-content.json','facts.json','claims.json','sources.json','iterations.json',
         'baseline-v20-deck.json','audit-10-rounds.json','README.md',
         'slide-content-and-notes.md','reproduce.py','verification-report.md']
archive_path=O/'Hyderabad-Evidence-Package.zip'
with zipfile.ZipFile(archive_path,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=8) as z:
    for filename in entries:
        p=R/filename
        if p.exists():z.write(p,arcname='research/'+filename)
    z.write(O/'deck-content.json',arcname='release/deck-content.json')
    z.write(O/'manifest.json',arcname='release/manifest.json')
summary={
    'release':'v22-core20',
    'generated_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),
    'main_count':20,'appendix_count':len(slides)-20,'total_slides':len(slides),
    'candidate_slides':[18,19],'thank_you_slide':20,'appendix_start':21,
    'blocked_facts_excluded_from_core':sorted(blocked),
    'fresh_review_iterations_completed':0,
    'historical_prior_20_iterations_retained':True,
    'verification_scope':'Local structural and package verification only. No comprehensive contemporary source re-audit, independent human peer review, or 20 new cumulative editorial iterations.',
    'files':{n:hashlib.sha256((O/n).read_bytes()).hexdigest() for n in
    ['Manash-Protim-Deori-Hyderabad.pptx','Manash-Protim-Deori-Hyderabad.pdf',
     'Inclusive_Minds_Hyderabad_20_Slide_Executive_Deck.pdf',
     'Inclusive_Minds_Hyderabad_Complete_Evidence_Appendix.pdf',
     'Hyderabad-Evidence-Package.zip']},
    'known_open_checks':data['research_status']['unresolved']
}
(R/'v22-release-status.json').write_text(json.dumps(summary,indent=2))
print(json.dumps({'status':'pass','total_slides':len(slides),'core':20,'appendix':len(slides)-20,
                  'slide_images':len(list((O/'slides').glob('slide-*.webp')))}))
