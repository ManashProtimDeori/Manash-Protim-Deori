"""Retrieve public primary evidence. No credentials. Run with bundled Python."""
from pathlib import Path
from urllib.request import urlopen, Request
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
import json, hashlib, datetime, shutil
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'research/olam-global/raw'
OUT.mkdir(parents=True, exist_ok=True)
NOW = datetime.datetime.now(datetime.timezone.utc).isoformat()
WPP = 'https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/EXCEL_FILES/1_General/WPP2024_GEN_F01_DEMOGRAPHIC_INDICATORS_COMPACT.xlsx'
SERIES = {'population':'SP.POP.TOTL','income_ppp':'NY.GDP.PCAP.PP.KD','urban':'SP.URB.TOTL.IN.ZS','inflation':'FP.CPI.TOTL.ZG','food_index':'AG.PRD.FOOD.XD','food_import_share':'TM.VAL.FOOD.ZS.UN','food_export_share':'TX.VAL.FOOD.ZS.UN','imports_usd':'TM.VAL.MRCH.CD.WT','exports_usd':'TX.VAL.MRCH.CD.WT','cereal_yield':'AG.YLD.CREL.KG','water_stress':'ER.H2O.FWST.ZS'}
PAGES = {
 'un_members':'https://research.un.org/en/unmembers/currentmembers',
 'un_observers':'https://research.un.org/en/unmembers/observers',
 'ownership': 'https://www.olamgroup.com/investors/our-re-organisation.html',
 'about':'https://www.olamagri.com/about-us',
 'annual2025':'https://www.olamagri.com/content/dam/olam-agri/assets/webp/au/ar/annual-report-pdf/2025/annual-report-2025.pdf',
 'factsheet2026':'https://www.olamagri.com/content/dam/olam-agri/assets/webp/au/au-pdfs/factsheet/olamagri-corporate-factsheet-2026.pdf',
 'm49':'https://unstats.un.org/unsd/methodology/m49/overview/',
 'members':'https://www.un.org/en/about-us/member-states',
 'observers':'https://www.un.org/en/about-us/non-member-states',
 'outlook':'https://www.oecd.org/en/publications/oecd-fao-agricultural-outlook-2026-2035_47874669-en.html',
 'outlook_method':'https://www.oecd.org/en/publications/oecd-fao-agricultural-outlook-2026-2035_47874669-en/full-report/methodology_4c323de7.html',
 'ipcc_food':'https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-5/',
 'wmo2025':'https://wmo.int/publication-series/state-of-global-climate/state-of-global-climate-2025',
 'nigeria_policy':'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Nigeria+Announces+2026+Fiscal+and+Trade+Policy+Changes_Lagos_Nigeria_NI2026-0010.pdf',
 'nigeria_grain':'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Grain+and+Feed+Annual_Lagos_Nigeria_NI2026-0003.pdf',
 'wpp_home':'https://population.un.org/wpp/',
 'ppml':'https://personal.lse.ac.uk/tenreyro/LGW.pdf',
 'cvar':'https://sites.math.washington.edu/~rtr/papers/rtr179-CVaR1.pdf',
 'did':'https://arxiv.org/abs/1803.09015',
 'nobel2021':'https://www.nobelprize.org/prizes/economic-sciences/2021/summary/',
 'nobel2018':'https://www.nobelprize.org/prizes/economic-sciences/2018/summary/',
 'nobel2003':'https://www.nobelprize.org/prizes/economic-sciences/2003/summary/',
 'eudr':'https://eur-lex.europa.eu/eli/reg/2023/1115/oj/eng',
 'comtrade':'https://comtradeapi.un.org/public/v1/preview/C/A/HS?period=2024&reporterCode=566&cmdCode=1001&flowCode=M&partnerCode=0&partner2Code=0&customsCode=C00&motCode=0&maxRecords=500',
 'fao_fbs':'https://bulks-faostat.fao.org/production/Food_Balances_(2010-)_E_All_Data_(Normalized).zip',
}
for c in ['nigeria','ghana','senegal','cameroon','mozambique','south-africa','india','vietnam','brazil','saudi-arabia','australia','singapore','netherlands','thailand','ukraine','indonesia','bangladesh','malaysia','china']:
 PAGES['presence_'+c]='https://www.olamagri.com/locations/'+c

class Text(HTMLParser):
 def __init__(self): super().__init__(); self.parts=[]; self.skip=0
 def handle_starttag(self,t,a):
  if t in ['script','style']: self.skip+=1
 def handle_endtag(self,t):
  if t in ['script','style']: self.skip=max(0,self.skip-1)
 def handle_data(self,d):
  if not self.skip and d.strip(): self.parts.append(d.strip())

def get(key,url):
 ext = '.xlsx' if key=='wpp2024' else '.json' if key.startswith('wdi_') or key=='comtrade' else '.pdf' if '.pdf' in url else '.zip' if '.zip' in url else '.html'
 f=OUT/(key+ext)
 try:
  if not f.exists():
   req=Request(url,headers={'User-Agent':'OlamStrategyResearch/1.0 (public data research)'})
   with urlopen(req,timeout=50) as r: body=r.read()
   if not body: raise ValueError('Empty response')
   f.write_bytes(body)
  else: body=f.read_bytes()
  if ext=='.pdf' and not body.startswith(b'%PDF'): raise ValueError('Response is not a PDF')
  if ext=='.json': json.loads(body)
  if ext=='.zip' and not body.startswith(b'PK'): raise ValueError('Response is not a ZIP')
  if ext=='.html':
   p=Text(); p.feed(body.decode('utf-8',errors='replace')); (OUT/(key+'.txt')).write_text('\n'.join(p.parts))
  return {'key':key,'url':url,'status':'retrieved','file':str(f.relative_to(ROOT)),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest(),'retrieved_at':NOW}
 except Exception as e: return {'key':key,'url':url,'status':'unavailable','error':str(e),'retrieved_at':NOW}

if __name__=='__main__':
 tasks = [('wpp2024', WPP)] + [(f'wdi_{k}',f'https://api.worldbank.org/v2/country/all/indicator/{v}?format=json&date=2000:2025&per_page=20000') for k,v in SERIES.items()] + list(PAGES.items())
 manifest=[]
 with ThreadPoolExecutor(max_workers=6) as pool:
  for f in as_completed([pool.submit(get,k,u) for k,u in tasks]):
   v=f.result(); manifest.append(v); print(v['key'],v['status'],v.get('bytes',v.get('error')),flush=True)
 (OUT.parent/'retrieval-manifest.json').write_text(json.dumps(manifest,indent=2))
 # Official medium-variant population paths. Header row and units verified in source workbook.
 d=pd.read_excel(OUT/'wpp2024.xlsx',sheet_name='Medium variant',header=16)
 cols=['Region, subregion, country or area *','Location code','ISO3 Alpha-code','ISO2 Alpha-code','Type','Parent code','Year','Total Population, as of 1 July (thousands)']
 d=d[cols]; d=d[d['Year'].isin([2026,2030,2035,2040,2045,2050,2051])]
 d.to_csv(OUT/'wpp-milestones.csv',index=False)
 # Full official identifiers retained separately, including territories.
 md=pd.read_html(OUT/'m49.html')
 for table in md:
  if any('ISO-alpha3' in str(c) for c in table.columns):
   table.to_csv(OUT/'m49.csv',index=False); break
 print('WPP extracted',len(d),'rows',flush=True)
