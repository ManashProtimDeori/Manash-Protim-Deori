"""Readable decision memo and complete country companion; exact deck PDF from reviewed renders."""
from pathlib import Path
import json, re, html, sys
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader
R=Path(__file__).resolve().parents[1]; P=R/'public/case-studies/olam-global'; TMP=R/'.olam-build'
for name,f in [('Sans','DejaVuSans.ttf'),('Bold','DejaVuSans-Bold.ttf'),('Serif','DejaVuSerif.ttf')]:pdfmetrics.registerFont(TTFont(name,'/usr/share/fonts/truetype/dejavu/'+f))
INK=colors.HexColor('#183b2a'); MUT=colors.HexColor('#657468'); LINE=colors.HexColor('#d9e1d8'); PAPER=colors.HexColor('#fffef9')
styles=getSampleStyleSheet(); styles.add(ParagraphStyle(name='TitleO',fontName='Serif',fontSize=25,leading=31,textColor=INK,spaceAfter=20));styles.add(ParagraphStyle(name='HeadO',fontName='Serif',fontSize=17,leading=21,textColor=INK,spaceBefore=15,spaceAfter=10));styles.add(ParagraphStyle(name='BodyO',fontName='Sans',fontSize=10,leading=15,textColor=INK,spaceAfter=10));styles.add(ParagraphStyle(name='SmallO',fontName='Sans',fontSize=7.2,leading=10,textColor=MUT,spaceAfter=6))
VERSION=json.loads((P/'deck.json').read_text())['version']
def para(s,style='BodyO'):
 text=html.escape(str(s)).replace('\n','<br/>')
 text=re.sub(r'https?://[^\s<>]+',lambda m:'<link href="'+m[0]+'" color="#215b42">'+m[0]+'</link>',text)
 return Paragraph(text,styles[style])
def footer(c,doc):
 c.setStrokeColor(LINE);c.line(42,38,A4[0]-42,38);c.setFont('Sans',7);c.setFillColor(MUT);c.drawString(42,25,'MANASH PROTIM DEORI / OLAM AGRI GLOBAL STRATEGY / v'+VERSION);c.drawRightString(A4[0]-42,25,str(doc.page))
def mdpdf(name):
 text=(P/(name+'.md')).read_text(); story=[]
 for part in text.split('\n\n'):
  if '<!-- pagebreak -->' in part:story.append(PageBreak());continue
  if not part.strip():continue
  if part.startswith('# '): story.append(para(part[2:],'TitleO'))
  elif part.startswith('## '): story.append(para(part[3:],'HeadO'))
  else: story.append(para(part))
 SimpleDocTemplate(str(P/(name+'.pdf')),pagesize=A4,rightMargin=44,leftMargin=44,topMargin=44,bottomMargin=52).build(story,onFirstPage=footer,onLaterPages=footer)
for n in ['executive-decision-memo','pilot-charter','validation-and-red-team','prior-art-and-originality','limitations-and-missing-data','calculation-appendix','source-book','requirements-audit','priority-commercial-plans','model-selection-and-foundations','entry-modes-and-perimeter','ceo-questions','strategic-hypotheses','monitoring-specification','scenario-mechanisms']:mdpdf(n)
assert 2<=len(PdfReader(P/'executive-decision-memo.pdf').pages)<=4
A=json.loads((P/'analysis.json').read_text()); C=canvas.Canvas(str(P/'country-atlas-v1.pdf'),pagesize=landscape(A4)); W,H=landscape(A4)
# Small fixed-position paragraphs return actual consumed height for overflow detection.
small=ParagraphStyle('country',fontName='Sans',fontSize=8,leading=11,textColor=INK)
cap=ParagraphStyle('caption',fontName='Sans',fontSize=7,leading=9,textColor=MUT)
def box(txt,x,y,width,style=small):
 p=Paragraph(html.escape(str(txt)),style);ww,hh=p.wrap(width,1000);p.drawOn(C,x,y-hh);return y-hh-8
C.setFillColor(INK);C.rect(0,0,W,H,fill=1,stroke=0);C.setFillColor(colors.HexColor('#fffce9'));C.setFont('Serif',36);C.drawString(45,H-100,'Every country has a disposition.');C.setFont('Sans',16);C.drawString(45,H-149,'Olam Agri / 195-country atlas / 2026–2051');C.setFont('Sans',11)
for i,t in enumerate(['193 UN members + 2 observer states; territories indexed separately.',f"203 separate product/unselected units × six worlds × seven milestones = {A['summary']['country_scenario_rows']:,} rows.",'All country financial cases are threshold-only, with unknown economics left blank.','Two pages per country;18 priority product plans in the linked commercial companion.','34 national driver series; exact source/year and missingness preserved.']):C.drawString(45,H-218-i*31,t)
C.drawString(45,55,'Manash Protim Deori | Version '+VERSION+' | Evidence audit: 8 October 2026');C.showPage()
units={'population':'persons','income_ppp':'constant PPP dollars/person','urban':'%','inflation':'% annual','food_index':'index 2014–16=100','food_import_share':'% merchandise imports','food_export_share':'% merchandise exports','imports_usd':'current USD','exports_usd':'current USD','cereal_yield':'kg/hectare','water_stress':'% available freshwater'}
mins=[]
for idx,c in enumerate(A['countries'],1):
 C.setFillColor(PAPER);C.rect(0,0,W,H,fill=1,stroke=0);C.setFillColor(MUT);C.setFont('Sans',8);C.drawString(32,H-27,f"{c['region'].upper()} / {c['subregion']} / {c['id']} · M49 {c['m49']} / {c['un_status']}")
 C.setFillColor(INK);C.setFont('Serif',25);C.drawString(32,H-64,c['name']);C.setFont('Bold',9);C.drawString(32,H-85,c['disposition'])
 x=32;y=H-110;wid=365
 for label,value in [('Decision reason',c['reason']),('Product / customer',c['product']+' / '+c['segment']),('Current presence',c['current_presence']),('Mode / corridor',c['action']+' / '+c['corridor']),('Commercial mechanism',c['marketing']),('Next gate',c['gate']),('Feasibility / uncertainty','Product access, sanctions, rights, tax, competitor, crop/basin and asset economics require local evidence. No legal clearance or investment approval. Country NPV: unknown.')]:
  C.setFont('Bold',8);C.setFillColor(MUT);C.drawString(x,y,label.upper());y-=13;y=box(value,x,y,wid)
 mins.append(y)
 rx=425;ry=H-110;rw=W-rx-32
 C.setFont('Bold',9);C.drawString(rx,ry,'UN medium population projection / million');ry-=15
 years=[2026,2030,2035,2040,2045,2050,2051]
 vals=[[str(z) for z in years],[f"{c['population'][str(z)]/1e6:,.2f}" for z in years]]
 t=Table(vals,colWidths=[rw/7]*7);t.setStyle(TableStyle([('FONT',(0,0),(-1,-1),'Sans',7),('TEXTCOLOR',(0,0),(-1,-1),INK),('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e7eee4')),('BOTTOMPADDING',(0,0),(-1,-1),7)]));tw,hh=t.wrap(rw,100);t.drawOn(C,rx,ry-hh);ry-=hh+17
 C.setFont('Bold',9);C.drawString(rx,ry,'Dated WDI country observations');ry-=15
 obs=[]
 for k,v in list(c['observations'].items())[:11]:obs.append([k.replace('_',' '),('Missing' if v is None else f"{v['value']:,.2f}"),('—' if v is None else str(v['year'])),units[k]])
 t=Table(obs,colWidths=[112,110,34,rw-256]);t.setStyle(TableStyle([('FONT',(0,0),(-1,-1),'Sans',6.7),('TEXTCOLOR',(0,0),(-1,-1),INK),('LINEBELOW',(0,0),(-1,-1),.3,LINE),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3)]));_,hh=t.wrap(rw,400);t.drawOn(C,rx,ry-hh);ry-=hh+19
 C.setFont('Bold',9);C.drawString(rx,ry,'Conditional investment boundary / '+c['entry_mode']+' template');ry-=14
 rows=[['World','Zero-NPV initial orders, t','Country NPV']]
 for s in A['scenarios']:
  v=next(v for v in A['thresholds'] if v['mode']==c['entry_mode'] and v['scenario']==s['id']);q=v['investment_break_even_orders'];rows.append([s['name'],'No threshold at capped delivery' if q is None else f'{q:,.0f}','Unknown'])
 t=Table(rows,colWidths=[140,170,rw-310]);t.setStyle(TableStyle([('FONT',(0,0),(-1,-1),'Sans',7),('TEXTCOLOR',(0,0),(-1,-1),INK),('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e7eee4')),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4),('LINEBELOW',(0,0),(-1,-1),.3,LINE)]));_,hh=t.wrap(rw,200);t.drawOn(C,rx,ry-hh);ry-=hh+9;mins.append(ry)
 box('Sources: UN_WPP; dated WDI observations; full IDs/pinpoints in source-book and country register. | C-POP-'+c['id']+'; C-DCF-'+c['entry_mode']+'-[world]. Population is externally projected; missing values are not imputed.',32,44,W-64,cap)
 C.setFont('Sans',7);C.drawRightString(W-32,15,f'{idx} / 195 · dossier1/2');C.showPage()
 C.setFillColor(PAPER);C.rect(0,0,W,H,fill=1,stroke=0);C.setFillColor(MUT);C.setFont('Sans',8);C.drawString(32,H-27,f"{c['id']} / EVIDENCE, ECONOMIC GATES AND PUBLIC DRIVERS / {c['research_date']}")
 C.setFillColor(INK);C.setFont('Serif',25);C.drawString(32,H-64,c['name']+' / evidence gates')
 y=H-98
 product_units=', '.join(u['id']+' ('+u['product']+')' for u in c['product_decision_units'])
 fields=[('Quality / roles',c['data_quality']+'. '+c['role']),('Product decision units',product_units),('Demand / supply / access','Population is externally projected. Income and supply/trade are national proxies at dated observations, not category demand/capture. Actual customers, rivals and access remain open.'),('Economics / scenarios','Six normalized mode-world order roots on dossier1/2; country volumes, margins, capex, taxes, currency, monthly cash and NPV unknown. Generic ranges in C-SENSITIVITY are chosen structural bounds, not country comparables.'),('Common dependencies',c['portfolio_dependencies']),('Invalidation / stop',c['decision_falsifier']),('Owner / timing',c['owner']+'. '+c['timing']),('Internal evidence / cost',c['next_evidence']+'. '+c['evidence_cost_status'])]
 for label,value in fields:
  C.setFont('Bold',8);C.setFillColor(MUT);C.drawString(32,y,label.upper());y-=13;y=box(value,32,y,365)
 mins.append(y)
 rx=425;ry=H-100;rw=W-rx-32;C.setFont('Bold',9);C.drawString(rx,ry,'Additional dated public drivers / no imputation');ry-=17
 extra_units={'fertility':'births/woman','life_expectancy':'years','age_under15':'% population','age_over65':'% population','dependency_ratio':'% working-age pop.','net_migration':'persons','real_gdp':'constant2015USD','gdp_growth':'% annual','real_income':'constant2015USD/person','agriculture_gdp':'% GDP','poverty':'% below WDI poverty line','gini':'index','unemployment':'% labour force','private_credit':'% GDP','lending_rate':'% annual','real_interest':'% annual','government_debt':'% GDP','electricity_access':'% population','irrigated_land':'% agricultural land','cereal_area':'hectares','undernourishment':'% population','agriculture_employment':'% employment','water_withdrawal':'% internal resources'}
 vals=[['Driver','Latest value','Year','Unit']]
 for k,v in list(c['observations'].items())[11:]:vals.append([k.replace('_',' '),'Missing' if v is None else f"{v['value']:,.2f}",'—' if v is None else str(v['year']),extra_units[k]])
 t=Table(vals,colWidths=[123,95,34,rw-252]);t.setStyle(TableStyle([('FONT',(0,0),(-1,-1),'Sans',6.5),('TEXTCOLOR',(0,0),(-1,-1),INK),('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e7eee4')),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),('LINEBELOW',(0,0),(-1,-1),.3,LINE)]));_,hh=t.wrap(rw,500);t.drawOn(C,rx,ry-hh);ry-=hh+16;mins.append(ry)
 ry=box('Exact indicators, dates and APIs: country-driver-coverage.csv / source-book. Macro observations do not establish company orders, cash, WACC or access.',rx,ry,rw)
 C.setFont('Bold',8);C.drawString(rx,ry,'PRIORITY COMMERCIAL COMPANION ↗');C.linkURL('https://manash-protim-deori.vercel.app/case-studies/olam-global/priority-commercial-plans.pdf',(rx,ry-3,rx+rw,ry+12),relative=0);ry-=17
 ry=box('Priority plans: customer, offer, channel, cash metric and stop gate. Unselected products need a category screen.',rx,ry,rw)
 mins.append(ry)
 box('Stable lineage: C-POP-'+c['id']+'; C-DCF-'+c['entry_mode']+'-[world]; C-SENSITIVITY. Evidence costs are unquoted, not zero. Complete source IDs and dated metadata in the machine-readable country/source registers.',32,43,W-64,cap)
 C.setFont('Sans',7);C.drawRightString(W-32,15,f'{idx} /195 · dossier2/2');C.showPage()
assert min(mins)>50,f'Country layout overflow: {min(mins)}'
C.save();assert len(PdfReader(P/'country-atlas-v1.pdf').pages)==391
# Exact rendered slide PDF.
images=sorted((TMP/'renders').glob('*.png'))
expected=len(json.loads((P/'deck.json').read_text())['slides'])
if len(images)!=expected:raise ValueError('Require every current slide render before exporting slide PDF')
C=canvas.Canvas(str(P/'olam-global-strategy-v1.pdf'),pagesize=(960,540))
for img in images:C.drawImage(str(img),0,0,width=960,height=540);C.showPage()
C.save();assert len(PdfReader(P/'olam-global-strategy-v1.pdf').pages)==expected
print('PDF exports complete; country layout minimum bottom margin:',min(mins))
