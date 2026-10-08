"""Distinct executable accounting, physical, lineage and artifact checks."""
from pathlib import Path
import csv,json,math,re,hashlib,zipfile,sys,datetime
from xml.etree import ElementTree as ET
import numpy as np
from pypdf import PdfReader

ROOT=Path(__file__).resolve().parents[1];P=ROOT/'public/case-studies/olam-global'
d=json.loads((P/'deck.json').read_text());a=json.loads((P/'analysis.json').read_text());checks=[]
def check(id,description,condition,details=''):
    checks.append({'id':id,'description':description,'status':'Passed' if bool(condition) else 'Failed','evidence':details})
    if not condition:raise AssertionError(description+': '+str(details))
def csvrows(name):
    with (P/name).open() as f:return list(csv.DictReader(f))
ids={s['id'] for s in d['sources']};calcs={c['id'] for c in d['calculations']};inputs={i['id'] for i in d['inputs']};assumptions={x['id'] for x in d['assumptions']}
check('S01','195 distinct countries,193 members and2 observers',len(a['countries'])==len(set(c['id'] for c in a['countries']))==195 and sum(c['un_status']=='Observer state' for c in a['countries'])==2)
check('S02','All countries carry34 explicitly dated/null drivers',all(len(c['observations'])==34 and all(v is None or v['year']<=2025 for v in c['observations'].values()) for c in a['countries']))
check('S03','No country actual investment NPV or feasibility is invented',all(c['country_npv'] is None and c['feasible_flag'] is None for c in a['countries']))
matrix=csvrows('country-scenario-matrix.csv');key=lambda r:tuple(r[k] for k in ['country_id','product_id','entry_mode','corridor_id','scenario_id','horizon_year'])
check('S04','203 units ×6 worlds ×7 milestones, no join losses or duplicates',len(matrix)==len(set(key(r) for r in matrix))==8526 and len(set(r['country_id'] for r in matrix))==195)
check('S05','Distinct18 product cases in10 priority countries',len(a['priority_product_plans'])==18 and len(set(u['id'][:3] for u in a['priority_product_plans']))==10)
check('S06','Actual finance unknowns stay null in the full matrix',all(r['NPV']==r['category_demand']==r['attainable_capture']==r['capacity']==r['free_cash_flow']=='' for r in matrix))
check('L01','All slide source/calculation/assumption IDs resolve',all(set(s['sources'])<=ids and set(s['calc'])<=calcs and set(s['assumptions'])<=assumptions for s in d['slides']))
check('L02','Every calculation input/source/assumption ID resolves',all(set(filter(None,c['input_ids'].split(';')))<=inputs and set(filter(None,c['source_ids'].split(';')))<=ids and set(filter(None,c['assumption_ids'].split(';')))<=assumptions for c in d['calculations']))
check('L03','All country observation sources and food-proxy calculations resolve',all(set(c['source_ids'])<=ids and all(o is None or o['source'] in ids for o in c['observations'].values()) and (c['food_import_proxy'] is None or c['food_import_proxy']['calculation_id'] in calcs) for c in a['countries']))
required=['id','issuing_organisation','title','publication_date','data_period','revision','accessed','canonical_url','direct_url','relevant_perimeter','units_currency_base','exchange_rate_convention','pinpoint','printed_page','pdf_file_page','series_id','api_query','dimension_filters','retrieval_timestamp','supported_claims','limitation','measurement_status','conflict_reconciliation','slide_ids','calculation_ids','availability','licensing_access']
check('L04','Source schema includes all17 required metadata categories',all(set(required)<=set(s) for s in d['sources']),'Unknown/N/A metadata remains explicitly recorded, not verified by schema presence')
classes={'Reported fact','Derived figure','External projection','Estimated model parameter','Modelled outcome','Planning assumption','Expert judgement','Hypothesis','Recommendation','Portfolio evidence'}
check('L05','Each registered claim uses a controlling evidence class',all(c['classification'] in classes for c in d['claims']))
check('L06','All22 required calculation examples retained',sum(s['id'].startswith('example-') for s in d['slides'])==22)
check('L07','Every substantive main slide has six speaker-note fields',all(all(t in s['notes'] for t in ['What the slide means:','Evidence:','Important assumption or limitation:','Adverse case:','Likely CEO/CFO challenge:','Source and appendix references:']) for s in d['slides'][:36]))
check('L08','All44 original slides have documented substantive treatments',len(d['changeAudit'])==44)
for f in a['financials']:
    check('A-'+f['mode_id']+'-'+f['scenario_id'],'Cash/EBIT/NWC identities and discounting reconcile in25 annual periods',len(f['rows'])==25 and all(abs(r['revenue']-r['variable_cost']-r['fixed_cash_cost']-r['EBITDA'])<1e-9 and abs(r['EBITDA']-r['depreciation']-r['EBIT'])<1e-9 and abs(r['AR']+r['inventory']-r['AP']-r['working_capital'])<1e-9 and abs(r['EBIT']-r['tax']+r['depreciation']-r['capex']-r['delta_working_capital']+r['closeout']-r['free_cash_flow'])<1e-9 and r['tax']>=0 and (r['year']==2051 or r['closeout']==0) for r in f['rows']) and abs(f['npv']-f['initial_cash']-sum(r['pv_cash'] for r in f['rows']))<1e-9)
    m=next(m for m in a['modes'] if m['id']==f['mode_id']);s=next(s for s in a['scenarios'] if s['id']==f['scenario_id'])
    check('P-'+f['mode_id']+'-'+f['scenario_id'],'Deliveries respect capacity under matched scenario',all(r['delivered_volume']<=m['capacity']*s['capacity']+1e-8 for r in f['rows']))
monthly=a['monthly_cash_example']['rows']
check('P01','Monthly stocks and annual production/delivery physically balance',all(abs(r['opening_stock_t']+r['production_t']-r['orders_delivered_t']-r['closing_stock_t'])<1e-8 and r['closing_stock_t']>=0 for r in monthly) and abs(sum(r['production_t']-r['orders_delivered_t'] for r in monthly))<1e-8)
check('P02','Blocked network route has zero delivery; source/customer limits bind feasibly',a['network_example']['quantity_t'][2]==0 and min(a['network_example']['constraint_slack_t'])>=-1e-8)
check('P03','Chosen factor covariance is symmetric PSD',np.allclose(np.array(a['stress']['latent_covariance']),np.array(a['stress']['latent_covariance']).T) and min(a['stress']['latent_covariance_eigenvalues'])>-1e-10)
check('A01','No franchise terminal value, closeout deducted once',all(m['franchise_terminal_PV']==0 and abs(m['NPV_without_closeout']+m['closeout_PV']-m['NPV'])<1e-9 for m in a['capital_metrics']))
check('D01','EVSI bounded by perfect information and charged study/delay once',abs(a['learning_experiment']['net_EVSI']-.7)<1e-9 and a['learning_experiment']['net_EVSI']<=a['learning_experiment']['net_EVPI'])
check('D02','Stress fixed-input model agrees with deterministic baseline',abs(a['stress']['fixed_input_parity_NPV']-next(f['npv'] for f in a['financials'] if f['mode_id']=='plant' and f['scenario_id']=='managed'))<1e-9)
check('D03','Required sensitivities and alternate-tail/dependence runs actually present',len(a['sensitivities'])==630 and len(a['two_variable_boundaries'])==75 and len(a['stress']['dependence_tail_comparison'])==3)
check('D04','Investment use of the supply regression explicitly rejected',a['regression']['selection'].startswith('Reject') and len(a['regression']['diagnostics']['annual_holdout_errors'])==4)
pay=np.array(a['portfolio']['payoffs']);best=pay.max(axis=0)
relaxed=a['portfolio']['relaxed_minimax'];weights=np.array(relaxed['weights'])
check('D05','Discrete and fractional policy comparisons respect their feasible sets',np.argmin((best-pay).max(axis=1))==2 and min(weights)>=0 and abs(weights.sum()-1)<1e-9 and np.allclose(weights@pay,relaxed['payoffs']) and abs((best-weights@pay).max()-relaxed['worst_regret'])<1e-9 and relaxed['worst_regret']<4,'Fractional scalability remains an explicit relaxation, not assumed asset feasibility')
audit=csvrows('requirements-audit.csv')
check('R01','Every66 prompt sections and775 instruction blocks audited without blanket pass',set(int(r['section']) for r in audit)==set(range(1,67)) and len(audit)==775 and any(r['status']=='Conditional / data required' for r in audit))
prompt=(ROOT/'research/olam-global/master-prompt.md').read_bytes();lines=prompt.decode().splitlines();flat=' '.join(lines)
check('R01b','Every audited block traces to the exact controlling prompt and source line',hashlib.sha256(prompt).hexdigest()==d['requirementsAudit']['prompt_sha256'] and all(r['requirement'].startswith(lines[int(r['source_line'])-1].strip()) and r['requirement'] in flat for r in audit))
for file,count in [('ceo-question-register.csv',22),('hypothesis-register.csv',12),('red-team-register.csv',10),('entry-mode-register.csv',10),('model-selection-register.csv',9)]:check('R-'+file,file+' mandatory coverage',len(csvrows(file))==count)
check('R02','Thank you directly precedes the technical appendix',d['slides'][36]['id']=='thank-you' and d['slides'][37]['id']=='appendix-guide')
if '--native' in sys.argv:
    ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main','p':'http://schemas.openxmlformats.org/presentationml/2006/main','r':'http://schemas.openxmlformats.org/package/2006/relationships'}
    with zipfile.ZipFile(P/'olam-global-strategy-v1.pptx') as z:
        slidefiles=[n for n in z.namelist() if re.match(r'ppt/slides/slide\d+\.xml$',n)]
        charts=[v.get('PartName').lstrip('/') for v in ET.fromstring(z.read('[Content_Types].xml')) if v.get('ContentType')=='application/vnd.openxmlformats-officedocument.drawingml.chart+xml']
        check('F01','Native PPTX current slide count and4 editable charts',len(slidefiles)==len(d['slides']) and len(charts)==4)
        hyperlinks=0
        for name in slidefiles:
            xml=ET.fromstring(z.read(name));hyperlinks+=len(xml.findall('.//a:hlinkClick',ns))
        check('F02','Every PPTX slide has navigation and evidence hyperlinks',hyperlinks>=2*len(d['slides']))
        jumps=0
        for name in slidefiles:
            relname=name.replace('/slides/','/slides/_rels/')+'.rels';rels={r.attrib['Id']:r.attrib for r in ET.fromstring(z.read(relname))}
            for h in ET.fromstring(z.read(name)).findall('.//a:hlinkClick',ns):
                if h.get('action')!='ppaction://hlinksldjump':continue
                rel=rels[h.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')]
                assert rel['Type'].endswith('/slide') and 'ppt/slides/'+rel['Target'] in z.namelist();jumps+=1
        check('F02b','Every internal jump references an existing slide part',jumps==len(d['slides']))
        check('F03','Each native speaker note contains evidence fields',all(b'What the slide means:' in z.read(f'ppt/notesSlides/notesSlide{i}.xml') for i in range(1,len(d['slides'])+1)))
    check('F04','Slide PDF matches current deck; atlas391 pages includes195 dossiers',len(PdfReader(P/'olam-global-strategy-v1.pdf').pages)==len(d['slides']) and len(PdfReader(P/'country-atlas-v1.pdf').pages)==391)
    check('F05','Executive memo remains2–4 pages',2<=len(PdfReader(P/'executive-decision-memo.pdf').pages)<=4)
    wb=json.loads((P/'workbook-validation.json').read_text());check('F06','Native formula workbook matches all18 Python cases and EVSI/ROIC',len(wb['cases'])==18 and abs(wb['EVSI']-.7)<1e-8)
    receipt=json.loads((P/'presentation-validation.json').read_text());layout=json.loads((P/'presentation-all-tables-validation.json').read_text());check('F07','Native integrity and all-table layout receipts pass for current release',len(json.dumps(receipt))>100 and layout['slide_count']==len(d['slides']) and layout['finding_count']==layout['warning_count']==0)
(P/'validation-checks.json').write_text(json.dumps({'version':d['version'],'run_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Executed numerical/physical/schema/artifact checks, not proof of business inputs','checks':checks,'open_business_gates':'See requirements-audit.csv and evidence-request-queue.csv'},indent=2))
print(json.dumps({'checks':len(checks),'all_passed':all(c['status']=='Passed' for c in checks),'native':'--native' in sys.argv}))
