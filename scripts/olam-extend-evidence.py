"""Additional primary country drivers and retrieval receipts; no fabricated observations."""
from pathlib import Path
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor, as_completed
import json, hashlib, datetime, runpy
import pandas as pd

ROOT=Path(__file__).resolve().parents[1]
R=ROOT/'research/olam-global'; RAW=R/'raw'; P=ROOT/'public/case-studies/olam-global'
BASE=runpy.run_path(str(ROOT/'scripts/olam-retrieve.py'))['SERIES']
EXTRA={'fertility':'SP.DYN.TFRT.IN','life_expectancy':'SP.DYN.LE00.IN','age_under15':'SP.POP.0014.TO.ZS','age_over65':'SP.POP.65UP.TO.ZS','dependency_ratio':'SP.POP.DPND','net_migration':'SM.POP.NETM','real_gdp':'NY.GDP.MKTP.KD','gdp_growth':'NY.GDP.MKTP.KD.ZG','real_income':'NY.GDP.PCAP.KD','agriculture_gdp':'NV.AGR.TOTL.ZS','poverty':'SI.POV.DDAY','gini':'SI.POV.GINI','unemployment':'SL.UEM.TOTL.ZS','private_credit':'FS.AST.PRVT.GD.ZS','lending_rate':'FR.INR.LEND','real_interest':'FR.INR.RINR','government_debt':'GC.DOD.TOTL.GD.ZS','electricity_access':'EG.ELC.ACCS.ZS','irrigated_land':'AG.LND.IRIG.AG.ZS','cereal_area':'AG.LND.CREL.HA','undernourishment':'SN.ITK.DEFC.ZS','agriculture_employment':'SL.AGR.EMPL.ZS','water_withdrawal':'ER.H2O.FWTL.ZS'}
SERIES={**BASE,**EXTRA}
def download(name,sid,kind):
    url=f'https://api.worldbank.org/v2/indicator/{sid}?format=json' if kind=='metadata' else f'https://api.worldbank.org/v2/country/all/indicator/{sid}?date=2000:2025&format=json&per_page=20000'
    dest=RAW/f'wdi_{name}{"_metadata" if kind=="metadata" else ""}.json'
    now=datetime.datetime.now(datetime.timezone.utc).isoformat()
    try:
        if dest.exists(): data=dest.read_bytes(); access='Cached permitted primary download'
        else:
            with urlopen(Request(url,headers={'User-Agent':'Independent research/1.1'}),timeout=45) as response: data=response.read()
            parsed=json.loads(data)
            if not isinstance(parsed,list) or len(parsed)!=2 or not isinstance(parsed[1],list): raise ValueError('No valid observation payload')
            dest.write_bytes(data); access='Retrieved successfully'
        return {'variable':name,'series_id':sid,'kind':kind,'url':url,'file':str(dest.relative_to(ROOT)),'retrieved_at':now,'sha256':hashlib.sha256(data).hexdigest(),'status':access}
    except Exception as exc:return {'variable':name,'series_id':sid,'kind':kind,'url':url,'file':None,'retrieved_at':now,'sha256':None,'status':'Unavailable: '+str(exc)}
if __name__=='__main__':
    jobs=[(n,s,'metadata') for n,s in SERIES.items()]+[(n,s,'data') for n,s in EXTRA.items()]
    receipts=[]
    with ThreadPoolExecutor(max_workers=6) as pool:
        for job in as_completed([pool.submit(download,*j) for j in jobs]):
            receipt=job.result();receipts.append(receipt);print(receipt['variable'],receipt['kind'],receipt['status'],flush=True)
    (R/'extended-retrieval-manifest.json').write_text(json.dumps(sorted(receipts,key=lambda x:(x['variable'],x['kind'])),indent=2))
    metadata={}
    for n,s in SERIES.items():
        path=RAW/f'wdi_{n}_metadata.json'
        metadata[n]=json.loads(path.read_text())[1][0] if path.exists() else {'id':s,'name':n,'sourceNote':'Metadata unavailable; do not infer definition.'}
    (R/'indicator-metadata.json').write_text(json.dumps(metadata,indent=2))
    # WPP scenarios are fertility variants, never statistical confidence intervals.
    path=RAW/'wpp2024.xlsx'
    if path.exists():
        book=pd.ExcelFile(path);print('WPP sheets:',book.sheet_names,flush=True)
        rows=[];members=set(pd.read_csv(R/'membership-verification.csv').ISO3)
        for variant in ['Medium','High','Low']:
            sheet=next((s for s in book.sheet_names if s.lower().startswith(variant.lower())),None)
            if sheet is None:continue
            frame=pd.read_excel(path,sheet_name=sheet,header=16)
            pop=[c for c in frame.columns if 'Total Population, as of 1 July' in str(c)]
            if not pop:continue
            select=frame[frame['ISO3 Alpha-code'].isin(members)&frame['Year'].isin([2026,2030,2035,2040,2045,2050,2051])]
            for _,r in select.iterrows():rows.append({'country_id':r['ISO3 Alpha-code'],'year':int(r['Year']),'variant':variant,'population_persons':float(r[pop[0]])*1000,'source_id':'UN_WPP'})
        if rows:pd.DataFrame(rows).to_csv(R/'wpp-variants.csv',index=False)
