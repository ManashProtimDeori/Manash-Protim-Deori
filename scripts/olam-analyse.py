"""Reproducible 195-country evidence spine and conditional threshold economics.
Public statistics describe countries. Normalized project inputs are assumptions.
No country Olam revenue, market share, investment NPV or approval is inferred.
"""
from pathlib import Path
import json, csv, datetime, math, hashlib
import numpy as np
import pandas as pd
from scipy.optimize import brentq
import runpy
SERIES = runpy.run_path(str(Path(__file__).with_name('olam-retrieve.py')))['SERIES']

ROOT=Path(__file__).resolve().parents[1]; R=ROOT/'research/olam-global'; RAW=R/'raw'; PUB=ROOT/'public/case-studies/olam-global'
PUB.mkdir(parents=True,exist_ok=True)
GROUPS={
 'Africa':'DZA AGO BEN BWA BFA BDI CPV CMR CAF TCD COM COG COD CIV DJI EGY GNQ ERI SWZ ETH GAB GMB GHA GIN GNB KEN LSO LBR LBY MDG MWI MLI MRT MUS MAR MOZ NAM NER NGA RWA STP SEN SYC SLE SOM ZAF SSD SDN TZA TGO TUN UGA ZMB ZWE',
 'Asia':'AFG ARM AZE BHR BGD BTN BRN KHM CHN CYP GEO IND IDN IRN IRQ ISR JPN JOR KAZ KWT KGZ LAO LBN MYS MDV MNG MMR NPL PRK OMN PAK PSE PHL QAT SAU SGP KOR LKA SYR TJK THA TLS TUR TKM ARE UZB VNM YEM',
 'Europe':'ALB AND AUT BLR BEL BIH BGR HRV CZE DNK EST FIN FRA DEU GRC VAT HUN ISL IRL ITA LVA LIE LTU LUX MLT MDA MCO MNE NLD MKD NOR POL PRT ROU RUS SMR SRB SVK SVN ESP SWE CHE UKR GBR',
 'Americas':'ATG ARG BHS BRB BLZ BOL BRA CAN CHL COL CRI CUB DMA DOM ECU SLV GRD GTM GUY HTI HND JAM MEX NIC PAN PRY PER KNA LCA VCT SUR TTO USA URY VEN',
 'Oceania':'AUS FJI KIR MHL FSM NRU NZL PLW PNG WSM SLB TON TUV VUT'}
ISO=[x for s in GROUPS.values() for x in s.split()]; assert len(ISO)==len(set(ISO))==195
membership=pd.read_csv(R/'membership-verification.csv'); assert set(membership.ISO3)==set(ISO); assert (membership.status=='Member state').sum()==193
MILESTONES=[2026,2030,2035,2040,2045,2050,2051]
FOOTPRINT=set('NGA GHA CMR CIV SEN MOZ COG TGO TCD ZAF SAU ARE GBR FRA NLD CHE ESP UKR RUS USA MEX BRA IND VNM THA IDN MYS BGD LKA AUS CHN SGP'.split())
# Factsheet June 2026 lists these locations. It does not imply country assets or trade exhaustiveness.
CASES={
 'NGA':('Semolina and edible oils','Households and distributors','Controlled brownfield commercial pilot','Imported wheat/crude oil to Nigerian routes','Measure cash ticket, meal economics, repeat and route availability. Keep the categories separate.','Finance-approved eligible sell-through and route P&L. Legal rechecks crude/refined HS access.','Nigeria already offers milling, oil refining and national logistics. Learning cost can precede further assets.'),
 'GHA':('Flour and pasta','Bakers and food distributors','Technical-service and demand pilot','Wheat imports to Ghana milling and customers','Test usable output per flour bag and repeat after introductory support ends.','Verify utilization, gross-to-net margin and pasta adoption against substitute meals.','Existing milling and pasta capability offers a specific customer-performance test.'),
 'SEN':('Flour and feed','Bakers and livestock producers','Existing-operation service pilot','Wheat/feed inputs to Senegal processing','Compare baker yield and feed conversion with the delivered service cost.','Validate capacity bottleneck, payment terms and customer-level contribution.','Existing wheat/feed operations make service economics testable before new commitments.'),
 'CMR':('Flour and rice','Bakers and distribution customers','Distribution and credit pilot','Import corridor to Cameroon distribution','Improve stock availability only where the delivered contribution clears route cost.','Measure late payments, delivery reliability and product-specific duties.','Current flour/rice operations support diagnosis of route and credit constraints.'),
 'MOZ':('Rice and edible oils','Households and trade customers','Distribution resilience pilot','Rice/oil origins to Mozambique routes','Compare cash access and unit value by actual local customer cohorts.','Test disruption exposure at named port/route and cash tied in seasonal stocks.','Existing rice/oils network enables local tests. Weather resilience requires asset-level evidence.'),
 'ZAF':('Grains and edible oils','Industrial food and feed buyers','Contract and service trial','Grains/oils to South African industrial customers','Sell delivered specification and reliable service through repeat contracts.','Require quality-adjusted spread, counterparty limits and inventory stress.','Company country evidence identifies grain/oil trading. A new plant has no public justification here.'),
 'IND':('Rice sourcing','Export suppliers and destination buyers','Supplier and offtake pilot','India rice to African destinations','Test traceability, supplier continuity and delivered quality through a contracted lot.','Check product-specific export rules, supplier rights, landed spread and destination credit.','Annual report identifies India-to-Africa rice financing. This supports corridor diligence, not assumed profit.'),
 'VNM':('Rice sourcing','Rice suppliers and import buyers','Supplier and alternative-route pilot','Vietnam rice to African destinations','Validate quality, water practices and shipment service without assuming a buyer premium.','Obtain basin, supplier, freight and verified destination purchase evidence.','Annual report identifies Vietnam-to-Africa rice flows. Supplier/basin diversification remains to be measured.'),
 'BRA':('Grains and oilseeds','Farmers, cooperatives and B2B importers','Origination and corridor trial','Brazil grain/oilseed origins to Asia/Africa','Offer documented specification and delivery economics to contracted buyers.','Map common weather, port and financing exposure before claiming diversification.','Country page identifies soybean, corn and wheat origination/export. The constraint is route cash, not consumer branding.'),
 'SAU':('Grain supply and food-security contracts','Commercial and eligible institutional buyers','Offtake diligence, with capped trade pilot','Multiple eligible origins to Saudi import contracts','Build a service offer around specification, continuity and verifiable delivered cost.','Secure independently bankable offtake. Ownership creates no guaranteed government order or funding.','Factsheet lists Saudi Arabia. SALIC alignment warrants discussion while transaction economics govern commitment.')}

SCENARIOS=[
 {'id':'managed','name':'Managed transition','volume':1.,'growth':.015,'cost':1.,'price':1.,'fixed':1.,'days':0,'rate':.10,'capacity':1.,'mechanism':'Modest customer-order growth and functioning routes. Central planning convention.'},
 {'id':'integration','name':'Productive integration','volume':1.12,'growth':.025,'cost':.985,'price':1.,'fixed':.98,'days':-5,'rate':.09,'capacity':1.,'mechanism':'Improved delivery and productivity permit more volume and lower unit cost.'},
 {'id':'fragmented','name':'Fragmented trade','volume':.90,'growth':.005,'cost':1.07,'price':1.04,'fixed':1.10,'days':15,'rate':.12,'capacity':.95,'mechanism':'Freight/compliance and stocks increase. Partial price recovery only.'},
 {'id':'physical','name':'Compound physical stress','volume':.82,'growth':.005,'cost':1.15,'price':1.06,'fixed':1.15,'days':25,'rate':.12,'capacity':.80,'mechanism':'Correlated origin and route disruption caps service while prices and stocks rise.'},
 {'id':'squeeze','name':'Affordability and debt squeeze','volume':.82,'growth':0.,'cost':1.04,'price':.99,'fixed':1.05,'days':20,'rate':.14,'capacity':1.,'mechanism':'Lower real customer orders, weak pass-through and slower collections.'},
 {'id':'nutrition','name':'Nutrition and resource transition','volume':1.03,'growth':.010,'cost':1.02,'price':1.02,'fixed':1.06,'days':5,'rate':.10,'capacity':1.,'mechanism':'Standards and product adaptation consume cost. Equal price/cost lift assumes no free premium.'}]
MODES=[
 {'id':'trade','name':'Contracted trade','capex':1.,'fixed':.25,'capacity':150000.,'cost':392.,'price':400.,'orders':100000.,'dso':20.,'dio':25.,'dpo':20.},
 {'id':'partner','name':'Partner processing','capex':8.,'fixed':1.2,'capacity':120000.,'cost':352.,'price':400.,'orders':100000.,'dso':35.,'dio':45.,'dpo':25.},
 {'id':'plant','name':'Owned processing','capex':20.,'fixed':2.,'capacity':150000.,'cost':340.,'price':400.,'orders':100000.,'dso':35.,'dio':55.,'dpo':25.}]

def cash_model(m,s,orders=None):
 """Millions of constant 2026 USD, incremental to no project, 25 operating years.
 60/40 capex timing, 10-year depreciation, 70% replacement capex years 11/21,
 2% annual maintenance, 25% simplified tax with loss carryforward,
 80% credit sales, 80% eligible purchases. 90% NWC closeout in year 25.
 No corporate synergies, leverage, automatic FX conversion or franchise value.
 """
 rows=[]; cumulative=-.6*m['capex']; funding=-cumulative; prev_nwc=0.; losses=0.; cohorts=[(1,m['capex'])]
 for t in range(1,26):
  # Bounded demand expansion, beyond 2035 converges at half the assumed initial growth.
  g=s['growth']; order_growth=(1+g)**min(t-1,9)*(1+g/2)**max(0,t-10)
  q=min((orders if orders is not None else m['orders'])*s['volume']*order_growth*[.5,.8,1][min(t-1,2)],m['capacity']*s['capacity'])
  p=m['price']*s['price']; c=m['cost']*s['cost']; rev=q*p/1e6; vc=q*c/1e6; fixed=m['fixed']*s['fixed']; eb=rev-vc-fixed
  capex=.4*m['capex'] if t==1 else 0.
  if t in (11,21):
   capex+=.7*m['capex']; cohorts.append((t,.7*m['capex']))
  # Maintenance treated as annual cost of replacement additions, capitalized and depreciated.
  maintenance=.02*m['capex']; capex+=maintenance; cohorts.append((t,maintenance))
  dep=sum(v/10 for start,v in cohorts if start<=t<start+10); ebit=eb-dep
  if ebit<0: losses+=-ebit; tax=0.
  else:
   used=min(losses,ebit); losses-=used; tax=(ebit-used)*.25
  ar=rev*.8*(m['dso']+s['days'])/365; inv=vc*(m['dio']+s['days'])/365; ap=vc*.8*m['dpo']/365
  nwc=ar+inv-ap; delta=nwc-prev_nwc; prev_nwc=nwc
  closeout=.9*nwc if t==25 else 0.
  fcff=ebit-tax+dep-capex-delta+closeout; discount=(1+s['rate'])**t; cumulative+=fcff; funding=max(funding,-cumulative)
  rows.append({'year':2026+t,'t':t,'delivered_volume':q,'net_price':p,'variable_cost_unit':c,'revenue':rev,'variable_cost':vc,'fixed_cash_cost':fixed,'EBITDA':eb,'depreciation':dep,'EBIT':ebit,'tax':tax,'capex':capex,'AR':ar,'inventory':inv,'AP':ap,'working_capital':nwc,'delta_working_capital':delta,'closeout':closeout,'free_cash_flow':fcff,'discount_rate':s['rate'],'discount_factor':discount,'pv_cash':fcff/discount,'cumulative_cash':cumulative})
 npv=-.6*m['capex']+sum(x['pv_cash'] for x in rows)
 contrib=(m['price']*s['price']-m['cost']*s['cost'])
 return {'npv':npv,'funding_peak':funding,'operating_break_even_tonnes':None if contrib<=0 else m['fixed']*s['fixed']*1e6/contrib,'rows':rows,'closeout_pv':rows[-1]['closeout']/rows[-1]['discount_factor'],'initial_cash':-.6*m['capex']}

def threshold(m,s):
 f=lambda q:cash_model(m,s,q)['npv']
 high=m['capacity']/s['volume']*2
 if f(high)<0: return None
 root=brentq(f,0.,high,xtol=1e-5)
 return float(root)

def clean(x):
 if isinstance(x,(np.floating,np.integer)): return x.item()
 if isinstance(x,float) and not math.isfinite(x): return None
 if isinstance(x,dict): return {k:clean(v) for k,v in x.items()}
 if isinstance(x,list): return [clean(v) for v in x]
 return x

def main():
 m49=pd.read_csv(RAW/'m49.csv',keep_default_na=False); ids=m49.set_index('ISO-alpha3 Code').to_dict('index'); assert set(ISO)<=set(ids)
 wpp=pd.read_csv(RAW/'wpp-milestones.csv'); pop={}
 for _,x in wpp.iterrows():
  if x['ISO3 Alpha-code'] in ISO: pop.setdefault(x['ISO3 Alpha-code'],{})[int(x['Year'])]=float(x.iloc[-1])*1000
 assert set(pop)==set(ISO)
 panel=[]; vintages={}
 for name,series in SERIES.items():
  raw=json.loads((RAW/f'wdi_{name}.json').read_text()); vintages[name]=raw[0]['lastupdated']
  for x in raw[1]:
   if x['countryiso3code'] in ISO:
    panel.append({'country_id':x['countryiso3code'],'year':int(x['date']),'variable':name,'series_id':series,'value':x['value'],'source_id':'WB_'+name,'source_vintage':vintages[name],'imputed':False})
 p=pd.DataFrame(panel); p.to_csv(R/'country-panel.csv',index=False)
 wide=p.pivot(index=['country_id','year'],columns='variable',values='value').reset_index().sort_values(['country_id','year'])
 countries=[]
 def latest(code,var):
  a=wide[(wide.country_id==code)&wide[var].notna()].sort_values('year')
  return None if len(a)==0 else {'value':float(a.iloc[-1][var]),'year':int(a.iloc[-1].year),'source':'WB_'+var}
 for code in ISO:
  row=ids[code]; obs={v:latest(code,v) for v in SERIES}; paths=pop[code]; growth=paths[2051]/paths[2026]-1
  evidence=sum(v is not None for v in obs.values()); mode='trade'; product='Staple trade, product selection pending'; role='Potential customer market'; priority=code in CASES
  if priority:
   product,segment,action,corridor,marketing,gate,reason=CASES[code]; role='Sourcing origin' if code in ['IND','VNM','BRA'] else 'Customer and processing market' if code in ['NGA','GHA','SEN','CMR','MOZ'] else 'B2B customer market'
   disposition='Diligence priority'; mode='partner' if code in ['NGA','GHA','SEN','CMR','MOZ'] else 'trade'
  else:
   segment='Buyer/supplier segment requires local validation'; corridor='Unselected, route evidence required'; marketing='Customer interviews and delivered-cost comparison before a commercial launch.'
   gate='Confirm product demand, accessible HS line, counterparties, delivered spread, cash conversion and legal clearance.'
   if code=='VAT':
    disposition='No standalone asset proposal'; role='Very small consumption market'; reason='No material standalone product opportunity identified. Assess eligible institutional customers only within a regional trade route.'
   elif code in FOOTPRINT:
    disposition='Review existing operation'; reason='Disclosed operating location. Diagnose customer economics and cash before considering additional capital.'
   elif paths[2026]<1000000:
    disposition='Watch regional trade'; reason='Small domestic population suggests a route-based customer screen before standalone capacity. Population alone cannot exclude B2B demand.'
   elif evidence<7:
    disposition='Defer pending evidence'; reason='Sparse macro/supply data and missing company/customer economics prevent a reliable entry valuation.'
   elif growth<-.05:
    disposition='Watch customer specialization'; reason='UN medium projection shows population decline. Specific convenience, nutrition or industrial segments need measured purchases and unit economics.'
   else:
    disposition='Watch product/corridor opportunity'; reason='Macro scale warrants a product screen, but no validated category demand, capture or Olam incremental cash supports asset entry yet.'
  food_import=None
  a=wide[(wide.country_id==code)&wide.food_import_share.notna()&wide.imports_usd.notna()].sort_values('year')
  if len(a): food_import={'value':float(a.iloc[-1].food_import_share*a.iloc[-1].imports_usd/100),'year':int(a.iloc[-1].year),'calculation_id':'C-WBFOOD-'+code,'status':'Derived broad SITC food-trade proxy, not Olam category demand'}
  c={'id':code,'iso2':row['ISO-alpha2 Code'],'m49':str(row['M49 Code']).zfill(3),'name':row['Country or Area'],'region':row['Region Name'],'subregion':row['Sub-region Name'],'un_status':'Observer state' if code in ['VAT','PSE'] else 'Member state','population':paths,'population_change':growth,'observations':obs,'macro_variables_available':evidence,'food_import_proxy':food_import,'current_presence':'Disclosed location in June-2026 factsheet' if code in FOOTPRINT else 'Not verified, absence not inferred','presence_source':'CO_FACT' if code in FOOTPRINT else None,'priority':priority,'product':product,'role':role,'segment':segment,'entry_mode':mode,'action':action if priority else disposition,'corridor':corridor,'marketing':marketing,'disposition':disposition,'reason':reason,'gate':gate,'maturity':'Threshold-only case','feasible_flag':None,'legal_status':'Product, sanctions, licensing and counterparty review required. No legal clearance asserted.','climate_status':'Country water-stress observation where available. Crop/basin/asset hazards unquantified. No fitted crop damage claim.','competitor_status':'Country/category competitor shares and costs unavailable. Local diligence required.','country_npv':None,'confidence':'Conditional research priority only, capital economics unvalidated','owner':'Country/category lead with Finance, Treasury, Supply Chain and Legal','timing':'Evidence before capital commitment','next_evidence':'Reconciled customer orders and delivered unit economics, seasonal NWC, plant/route constraints, basin hazards and applicable taxes','evidence_cost':None,'source_ids':['UN_M49','UN_WPP','UN_OBSERVERS' if code in ['VAT','PSE'] else 'UN_MEMBERS']+['WB_'+v for v,x in obs.items() if x is not None]+(['CO_FACT'] if code in FOOTPRINT else [])+(['CO_'+code] if code in CASES and code!='SAU' else []),'assumption_ids':['A_TEMPLATE','A_SCENARIO','A_TAX','A_RATE','A_NWC','A_OUTER'],'calculation_ids':['C-POP-'+code,'C-THRESHOLD']}
  countries.append(c)
 countries.sort(key=lambda c:c['name'])
 # Regression is a descriptive supply benchmark. No missing rows are imputed.
 for v in ['food_index','income_ppp','cereal_yield']:
  wide['g_'+v]=wide.groupby('country_id')[v].transform(lambda s:np.log(s.where(s>0)).diff())
 wide['du']=wide.groupby('country_id').urban.diff()/100
 features=['g_income_ppp','du','g_cereal_yield']
 for v in features: wide['lag_'+v]=wide.groupby('country_id')[v].shift(1)
 use=wide.dropna(subset=['g_food_index']+['lag_'+v for v in features]); use=use[(use.year>=2002)&(use.year<=2024)].copy()
 tr=use[use.year<=2018]; te=use[use.year>=2019]
 def fit(d):
  X=np.column_stack([np.ones(len(d))]+[d['lag_'+v].to_numpy() for v in features]); y=d.g_food_index.to_numpy(); b=np.linalg.lstsq(X,y,rcond=None)[0]; e=y-X@b; inv=np.linalg.pinv(X.T@X); meat=np.zeros((4,4))
  for code in d.country_id.unique():
   ix=d.country_id.to_numpy()==code; score=X[ix].T@e[ix]; meat+=np.outer(score,score)
  G=d.country_id.nunique(); cov=inv@meat@inv*G/(G-1)*(len(d)-1)/(len(d)-4)
  return b,np.sqrt(np.diag(cov)),X,y,e
 b,se,X,y,e=fit(tr); Xt=np.column_stack([np.ones(len(te))]+[te['lag_'+v].to_numpy() for v in features]); yt=te.g_food_index.to_numpy(); pred=Xt@b
 hist=tr.groupby('country_id').g_food_index.mean(); bench=te.country_id.map(hist).fillna(tr.g_food_index.mean()).to_numpy()
 def scores(yp): return {'MAE_log_growth':float(np.mean(abs(yt-yp))),'RMSE_log_growth':float(np.sqrt(np.mean((yt-yp)**2)))}
 region_errors=[]
 region_map={c['id']:c['region'] for c in countries}
 use['region']=use.country_id.map(region_map)
 for reg in use.region.unique():
  a=use[(use.year<=2018)&(use.region!=reg)]; hold=use[(use.year>=2019)&(use.region==reg)]
  bb,*_=fit(a); xx=np.column_stack([np.ones(len(hold))]+[hold['lag_'+v] for v in features]); yy=hold.g_food_index.to_numpy()
  region_errors.append({'region':reg,'holdout_rows':len(hold),'MAE_log_growth':float(np.mean(abs(yy-xx@bb))),'benchmark_MAE_log_growth':float(np.mean(abs(yy-a.g_food_index.mean())))})
 chosen='Reject for country investment forecasting. Keep simple benchmarks until product and operating data exist.'
 regression={'target':'Annual log growth of FAO-derived World Bank food production index. Supply proxy, not food consumption or Olam demand.','estimator':'Pooled OLS with intercept and one-year-lagged income PPP growth, urban-share change, cereal-yield growth. Country-clustered CR1 uncertainty.','train_period':'2002-2018','holdout_period':f'2019-{int(te.year.max())}','observations_train':len(tr),'observations_holdout':len(te),'countries_train':tr.country_id.nunique(),'coefficients':[{'term':n,'value':float(v),'cluster_se':float(ss),'ci95_low':float(v-1.96*ss),'ci95_high':float(v+1.96*ss)} for n,v,ss in zip(['Intercept']+features,b,se)],'in_sample_r2':float(1-np.sum(e**2)/np.sum((y-y.mean())**2)),'condition_number':float(np.linalg.cond(X)),'model':scores(pred),'country_mean_benchmark':scores(bench),'zero_growth_benchmark':scores(np.zeros(len(te))),'leave_region_out':region_errors,'selection':chosen,'limitations':['Latest-vintage retrospective validation, not a real-time vintage backtest.','No causal identification, product elasticity or long-run structural parameter.','No 2051 financial extrapolation uses these coefficients.','No claim of stationarity in levels. Log differences reduce shared-trend risk.','Common shocks, measurement error, residual heteroskedasticity and structural breaks remain. Country clustering addresses within-country dependence only.','No independent Olam customer or asset observations.']}
 diagnostics=te[['country_id','year','g_food_index']].copy(); diagnostics['predicted']=pred; diagnostics['benchmark']=bench; diagnostics.to_csv(R/'regression-holdout.csv',index=False)
 financials=[]; thresholds=[]
 for m in MODES:
  for s in SCENARIOS:
   out=cash_model(m,s); root=threshold(m,s); out.update({'mode_id':m['id'],'scenario_id':s['id'],'investment_break_even_orders':root,'status':'Illustrative normalized project, not Olam or country valuation','calculation_id':f'C-DCF-{m["id"]}-{s["id"]}'})
   financials.append(out); thresholds.append({'mode':m['id'],'scenario':s['id'],'npv':out['npv'],'peak_funding':out['funding_peak'],'operating_break_even_tonnes':out['operating_break_even_tonnes'],'investment_break_even_orders':root,'within_capacity':root is not None,'calculation_id':out['calculation_id']})
 # Explicit null country valuations. Template thresholds apply as decision tests, not observations.
 matrix=[]; lookup={(x['mode'],x['scenario']):x for x in thresholds}
 for c in countries:
  for s in SCENARIOS:
   th=lookup[c['entry_mode'],s['id']]
   for year in MILESTONES:
    matrix.append({'country_id':c['id'],'product_id':c['product'],'customer_segment':c['segment'],'entry_mode':c['entry_mode'],'corridor_id':c['corridor'],'scenario_id':s['id'],'horizon_year':year,'current_presence':c['current_presence'],'feasible_flag':None,'evidence_grade':'threshold-only','category_demand':None,'attainable_capture':None,'capacity':None,'delivered_volume':None,'net_price':None,'revenue':None,'variable_cost':None,'fixed_cash_cost':None,'EBITDA':None,'depreciation':None,'EBIT':None,'tax':None,'capex':None,'working_capital':None,'delta_working_capital':None,'free_cash_flow':None,'discount_rate':None,'NPV':None,'liquidity_shortfall':None,'carbon_water_metrics_if_applicable':None,'population_external_projection':c['population'][year],'template_break_even_orders_tonnes':th['investment_break_even_orders'],'template_status':'No feasible threshold within template capacity' if th['investment_break_even_orders'] is None else 'Normalized annual order requirement, not a country estimate','recommendation':c['disposition'],'decision_gate':c['gate'],'source_ids':';'.join(c['source_ids']),'assumption_ids':';'.join(c['assumption_ids']),'calculation_ids':th['calculation_id']+';C-POP-'+c['id']})
 pd.DataFrame(matrix).to_csv(PUB/'country-scenario-matrix.csv',index=False)
 # Stress dependence is chosen, not fitted. Common latent cost/volume shock dominates draw.
 rng=np.random.default_rng(20261008); stress={}
 for runs in [2500,5000,10000]:
  rng=np.random.default_rng(20261008); vals=[]
  for _ in range(runs):
   z,e1,e2=rng.normal(size=3); s=dict(SCENARIOS[0]); s['volume']=float(np.clip(1-.10*z+.06*e1,.55,1.35)); s['cost']=float(np.clip(1+.035*z+.018*e2,.90,1.22)); s['days']=float(np.clip(8*z,-8,35)); s['rate']=float(np.clip(.10+.008*z,.06,.16)); vals.append(cash_model(MODES[2],s)['npv'])
  ar=np.asarray(vals); loss=np.maximum(0,-ar); q=np.quantile(loss,.95); stress[str(runs)]={'p10_npv':float(np.quantile(ar,.1)),'median_npv':float(np.median(ar)),'p90_npv':float(np.quantile(ar,.9)),'loss_VaR95':float(q),'loss_CVaR95':float(loss[loss>=q].mean())}
 # Small robust policy comparison. Illustrative NPVs USD million; six equally unweighted worlds.
 pay=np.array([[0,0,0,0,0,0],[9,14,-2,-8,-4,3],[6,10,2,-1,1,5],[4,7,1,0,2,4]],float)
 regret=pay.max(axis=0)[None,:]-pay; choice=int(regret.max(axis=1).argmin())
 portfolio={'actions':['Wait','Large owned plant','Partner processing','Capped contracted trade'],'scenario_ids':[s['id'] for s in SCENARIOS],'payoffs':pay.tolist(),'worst_regret':regret.max(axis=1).tolist(),'minimax_regret_action':choice,'status':'Illustrative comparison under identical USD20m maximum capital. Payoffs are chosen examples, not fitted country results.','calculation_id':'C-REGRET','literature_status':'Application of established robust decision and value-of-information methods. No mathematical novelty asserted.'}
 # Source source IDs and numeric inputs are separately indexed in deck authoring.
 summary={'version':'1.0.0','cutoff':'2026-10-08T00:04:25+05:30','data_retrieved_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'countries':195,'dossiers':195,'priority_diligence':10,'investment_grade_candidates':0,'threshold_only':195,'country_scenario_rows':len(matrix),'countries_with_all_macro_fields':sum(c['macro_variables_available']==len(SERIES) for c in countries),'country_npv_estimates':0,'population_projection_source':'UN WPP 2024 Medium variant, 2026-2051. These are external projections, not realized population.','wdi_vintages':vintages,'no_terminal_franchise':True}
 data={'summary':summary,'countries':countries,'scenarios':SCENARIOS,'modes':MODES,'regression':regression,'thresholds':thresholds,'financials':financials,'stress':{'seed':20261008,'distributions':'Independent standard normal factors z,e1,e2. z jointly reduces volume, raises costs, days and rate. Coefficients and truncations are assumptions.','dependence':'Constructed latent-factor covariance is positive semidefinite by construction, not a fitted country covariance.','results':stress,'probability_claim':'None. Quantiles describe the chosen stress generator.','calculation_id':'C-STRESS'},'portfolio':portfolio}
 (R/'analysis.json').write_text(json.dumps(clean(data),indent=2)); (PUB/'analysis.json').write_text(json.dumps(clean(data),separators=(',',':')))
 # Keep every territory outside the country universe, including separately reported economies.
 annex=m49[~m49['ISO-alpha3 Code'].isin(ISO)]; annex.to_csv(PUB/'territories-annex.csv',index=False)
 pd.DataFrame([{k:v for k,v in c.items() if not isinstance(v,(dict,list))} for c in countries]).to_csv(PUB/'country-register.csv',index=False)
 print(json.dumps(summary,indent=2)); print(json.dumps(regression,indent=2)); print(json.dumps(thresholds,indent=2))

if __name__=='__main__': main()
