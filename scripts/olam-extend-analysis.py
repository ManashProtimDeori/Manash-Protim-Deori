"""Executed gap repairs. Teaching models remain separate from country observations."""
from pathlib import Path
import json, csv, math, runpy, datetime
import numpy as np
import pandas as pd
from scipy.optimize import brentq, linprog
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

ROOT=Path(__file__).resolve().parents[1];R=ROOT/'research/olam-global';RAW=R/'raw';P=ROOT/'public/case-studies/olam-global'
base=runpy.run_path(str(ROOT/'scripts/olam-analyse.py'));cash=base['cash_model'];clean=base['clean']
retriever=runpy.run_path(str(ROOT/'scripts/olam-extend-evidence.py'));SERIES=retriever['SERIES'];EXTRA=retriever['EXTRA']

PRODUCTS={
 'semolina':('Semolina','110311','HS 2022 six-digit; wheat groats/meal, verify local semolina subline','Households; wholesale and retail distributors','Cost per cooked serving and paid repeat','Cash ticket and meal yield; pilot separate from oils','Pack weight × net shelf price; compare total cooked-meal cost','Distributors and matched retail routes; avoid stock loading','Supplier-funded trial only with incremental paid repeat and contribution'),
 'edible_oil':('Edible oil','151190','HS 2022 candidate refined palm-oil line; actual composition determines code','Households, food-service and oil distributors','Cost per cooking use, trusted quality and availability','Affordable verified pack and reliable replenishment','Net price per litre and per measured cooking use; safety/specification gate','Qualified distributors, independent retail and food-service cohorts','Replenishment and verified quality; no unproven health claim'),
 'wheat_flour':('Wheat flour','110100','HS 2022 wheat/meslin flour; local tariff subline required','Bakers and wholesale flour customers','Saleable loaves per delivered flour bag','Technical baking service with measured output and returns','Contract per bag linked to measured usable output, freight and credit','Baker clusters and distributor service routes','Bake trials, operator instruction and paid repeat after support'),
 'pasta':('Pasta','190219','HS 2022 candidate uncooked pasta excluding egg; formulation changes code','Households, caterers and food distributors','Affordable meal, cooking reliability and distribution','Taste/cooking-time trial against locally used substitutes','Price per prepared serving plus fuel/time; chosen pack must be tested','Wholesale/retail clusters and food-service customer panels','Local preparation demonstrations with a no-promotion repeat period'),
 'feed':('Animal feed','230990','HS 2022 other animal feed; species/formulation-specific local code required','Livestock and poultry producers','Measured animal output per total feed and health cost','Nutrition/service trial with species-specific performance','Delivered feed cost per kg liveweight or saleable output','Qualified farms, integrators and feed dealers','Technical feed service; monitor mortality and animal welfare'),
 'rice':('Rice','100630','HS 2022 semi/wholly milled rice; verify grade and treatment','Households, food-service, importers and distributors','Consistent cooking yield, cash access and availability','Grade-specific contracted lot and cooked-output comparison','Delivered price per saleable tonne and per prepared meal','Licensed importers, wholesalers and eligible retail routes','Blind grade/quality test, shipment reliability and paid reorder'),
 'maize':('Maize','100590','HS 2022 maize other than seed; destination/feed eligibility required','Feed mills and industrial grain buyers','Quality, usable dry matter and dependable delivery','Specification-based origination and shipment contract','Delivered USD per usable dry-matter tonne; adjust quality losses','Qualified cooperatives, elevators and bankable B2B buyers','Technical specification and independent inspection, not consumer advertising'),
 'soybeans':('Soybeans','120190','HS 2022 soybeans other than seed; verify GMO/traceability eligibility','Crushers, feed processors and import buyers','Protein/oil yield, traceability and shipment continuity','Qualified supplier lot with crush and quality evidence','Delivered price per usable output; reconcile by-product value','Approved suppliers, cooperatives and independent offtakers','Traceability and usable-output proof; no assumed green premium'),
 'wheat':('Wheat','100199','HS 2022 wheat other than durum/seed; durum uses 100119','Commercial millers and eligible food-security offtakers','Specification, continuity and funded landed spread','Commercial offtake with origin and vessel alternatives','Quality-adjusted delivered price, credit, collateral and freight','Approved origins, importers and competitively contracted buyers','Service agreement and performance clauses; ownership is not an order')}
COUNTRY_PRODUCTS={'NGA':['semolina','edible_oil'],'GHA':['wheat_flour','pasta'],'SEN':['wheat_flour','feed'],'CMR':['wheat_flour','rice'],'MOZ':['rice','edible_oil'],'ZAF':['maize','edible_oil'],'IND':['rice'],'VNM':['rice'],'BRA':['soybeans','maize','wheat'],'SAU':['wheat']}
def writecsv(name,rows):
    if not rows:return
    keys=list(dict.fromkeys(k for row in rows for k in row))
    with (P/name).open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=keys);w.writeheader()
        for row in rows:w.writerow({k:json.dumps(v,ensure_ascii=False) if isinstance(v,(dict,list)) else v for k,v in row.items()})

def additional_drivers(a):
    metadata=json.loads((R/'indicator-metadata.json').read_text());coverage=[];panel=[]
    countries={c['id']:c for c in a['countries']}
    for name,sid in SERIES.items():
        file=RAW/f'wdi_{name}.json'; raw=json.loads(file.read_text()) if file.exists() else [None,[]]
        by={code:[] for code in countries}
        for row in raw[1]:
            code=row['countryiso3code']
            if code not in countries:continue
            panel.append({'country_id':code,'variable':name,'series_id':sid,'year':int(row['date']),'value':row['value'],'source_id':'WB_'+name,'imputed':False})
            if row['value'] is not None:by[code].append(row)
        for code,vals in by.items():
            latest=max(vals,key=lambda x:int(x['date'])) if vals else None
            if name in EXTRA:countries[code]['observations'][name]=None if latest is None else {'value':float(latest['value']),'year':int(latest['date']),'source':'WB_'+name}
            coverage.append({'country_id':code,'variable':name,'series_id':sid,'available_years':len(vals),'first_year':min(int(v['date']) for v in vals) if vals else None,'latest_year':int(latest['date']) if latest else None,'latest_value':latest['value'] if latest else None,'definition':metadata[name]['name'],'source_id':'WB_'+name,'retrieval_status':'Missing observation' if not vals else 'Observed; no imputation','investment_parameter_eligible':False,'limitation':'National proxy, not customer/category/asset economics'})
    writecsv('country-driver-coverage.csv',coverage)
    pd.DataFrame(panel).to_csv(R/'extended-country-panel.csv',index=False)
    a['indicator_metadata']=metadata
    for c in countries.values():
        c['source_ids']=list(dict.fromkeys(c['source_ids']+[v['source'] for v in c['observations'].values() if v is not None]))
    a['summary']['country_driver_count']=len(SERIES)
    a['summary']['country_driver_observation_coverage']=sum(r['available_years']>0 for r in coverage)
    variants=R/'wpp-variants.csv'
    if variants.exists():
        vv=pd.read_csv(variants);writecsv('population-variants.csv',vv.to_dict('records'))
        for code,c in countries.items():c['population_variants']={v:{str(int(r.year)):float(r.population_persons) for _,r in group.iterrows()} for v,group in vv[vv.country_id==code].groupby('variant')}
    return coverage

def finance_extensions(a):
    metrics=[];sensitivity=[];boundaries=[]
    for f in a['financials']:
        rows=f['rows'];flows=[f['initial_cash']]+[r['free_cash_flow'] for r in rows]
        # Polynomial roots enumerate multiple IRRs instead of assuming uniqueness.
        roots=np.roots(list(reversed(flows)));irrs=sorted(set(round(float(1/z.real-1),12) for z in roots if abs(z.imag)<1e-7 and z.real>0))
        cumulative=f['initial_cash'];disc=f['initial_cash'];payback=None;dpay=None
        ppe=0.;roic=[]
        for r in rows:
            cumulative+=r['free_cash_flow'];disc+=r['pv_cash']
            if cumulative>=0 and payback is None:payback=r['t']
            if disc>=0 and dpay is None:dpay=r['t']
            if r['t']==1:ppe=next(m['capex'] for m in a['modes'] if m['id']==f['mode_id'])
            else:ppe+=r['capex']
            # Year1 full original asset is commissioned; maintenance is an addition.
            if r['t']==1:ppe+=.02*next(m['capex'] for m in a['modes'] if m['id']==f['mode_id'])
            ppe-=r['depreciation'];invested=max(0,ppe)+r['working_capital']
            roic.append({'year':r['year'],'NOPAT_simplified':r['EBIT']-max(0,r['EBIT'])*.25,'net_ppe':ppe,'invested_capital_end':invested,'ROIC_end_capital':None if invested<=0 else (r['EBIT']-max(0,r['EBIT'])*.25)/invested,'capital_turns':None if invested<=0 else r['revenue']/invested})
        without=f['npv']-f['closeout_pv'];long=sum(r['pv_cash'] for r in rows if r['t']>10)
        metric={'mode':f['mode_id'],'scenario':f['scenario_id'],'NPV':f['npv'],'IRR_roots':irrs,'IRR_interpretation':'Unique positive-discount-factor root' if len(irrs)==1 else 'Multiple/no valid roots; use NPV','annual_payback_year':payback,'annual_discounted_payback_year':dpay,'peak_annual_funding':f['funding_peak'],'NPV_per_peak_funding':f['npv']/f['funding_peak'],'closeout_PV':f['closeout_pv'],'NPV_without_closeout':without,'post2036_PV':long,'post2036_PV_share_of_gross_positive_PV':long/sum(max(0,r['pv_cash']) for r in rows) if sum(max(0,r['pv_cash']) for r in rows)>0 else None,'franchise_terminal_PV':0.,'year3_ROIC':roic[2]['ROIC_end_capital'],'year3_capital_turns':roic[2]['capital_turns'],'definition':'Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value.'}
        f['capital_metrics']=metric;f['capital_efficiency_rows']=roic;metrics.append(metric)
    for m in a['modes']:
        for s in a['scenarios']:
            initial=cash(m,s)['npv']
            for variable,values in {'orders_factor':[.7,.85,1,1.15,1.3],'price_factor':[.9,.95,1,1.05,1.1],'cost_factor':[.9,.95,1,1.05,1.1],'capex_factor':[.5,.75,1,1.25,1.5],'DSO_added_days':[-10,0,10,20,40],'DIO_added_days':[-10,0,10,20,40],'real_hurdle':[.06,.08,.1,.12,.16]}.items():
                for v in values:
                    mm=dict(m);ss=dict(s)
                    if variable.endswith('_factor'):mm[{'orders_factor':'orders','price_factor':'price','cost_factor':'cost','capex_factor':'capex'}[variable]]*=v
                    elif variable=='DSO_added_days':mm['dso']+=v
                    elif variable=='DIO_added_days':mm['dio']+=v
                    else:ss['rate']=v
                    f=cash(mm,ss);sensitivity.append({'mode':m['id'],'scenario':s['id'],'variable':variable,'input':v,'NPV':f['npv'],'delta_NPV':f['npv']-initial,'peak_funding':f['funding_peak'],'status':'Chosen structural sensitivity, not country comparable range'})
            if s['id']=='managed':
                for volume in [.7,.85,1,1.15,1.3]:
                    for margin in [30,45,60,75,90]:
                        mm={**m,'orders':m['orders']*volume,'cost':m['price']-margin};f=cash(mm,s)
                        boundaries.append({'mode':m['id'],'orders_factor':volume,'contribution_USD_per_t':margin,'NPV':f['npv'],'peak_funding':f['funding_peak'],'counterfactual':'No incremental project in the same managed world','status':'Chosen boundary grid; no country valuation'})
    a['capital_metrics']=metrics;a['sensitivities']=sensitivity;a['two_variable_boundaries']=boundaries
    writecsv('capital-metrics.csv',metrics);writecsv('sensitivity-one-variable.csv',sensitivity);writecsv('sensitivity-two-variable.csv',boundaries)
    # A transparent monthly timing example, reconciled to a separate annual case.
    demand=np.array([.06,.06,.07,.07,.08,.08,.09,.09,.10,.11,.10,.09])*100000
    production=np.repeat(100000/12,12);inventory=np.cumsum(production-demand)+8000
    assert min(inventory)>=0
    annual_revenue=100000*400/1e6;monthly_revenue=demand*400/1e6
    receipts=.2*monthly_revenue+.8*np.r_[0,monthly_revenue[:-1]]
    procurement=production*340/1e6;payments=.2*procurement+.8*np.r_[0,procurement[:-1]]
    cumulative=-20.-8000*340/1e6;monthly=[];ar=0.;ap=0.
    for i in range(12):
        ar+=monthly_revenue[i]-receipts[i];ap+=procurement[i]-payments[i]
        flow=receipts[i]-payments[i]-2/12;cumulative+=flow
        monthly.append({'month':i+1,'orders_delivered_t':float(demand[i]),'production_t':float(production[i]),'opening_stock_t':8000 if i==0 else float(inventory[i-1]),'closing_stock_t':float(inventory[i]),'revenue_USDm':float(monthly_revenue[i]),'collections_USDm':float(receipts[i]),'procurement_USDm':float(procurement[i]),'payments_USDm':float(payments[i]),'AR_USDm':float(ar),'inventory_USDm':float(inventory[i]*340/1e6),'AP_USDm':float(ap),'operating_cash_USDm':float(flow),'cumulative_cash_USDm':float(cumulative)})
    a['monthly_cash_example']={'status':'Separate chosen steady-output seasonal teaching case; not the ramping DCF or an Olam forecast','opening_capex_USDm':20.,'opening_inventory_USDm':2.72,'orders_total_t':float(demand.sum()),'production_total_t':float(production.sum()),'revenue_total_USDm':annual_revenue,'operating_cash_year_USDm':float(sum(r['operating_cash_USDm'] for r in monthly)),'peak_monthly_funding_USDm':max(22.72,-min(r['cumulative_cash_USDm'] for r in monthly)),'rows':monthly,'limitations':'No taxes, maintenance, refunds or financing in this isolated timing example. 80% revenue and purchases settle next month. December receivable/payable carry into next year. Monthly peak must be measured for real cases.'}
    writecsv('monthly-cash-example.csv',monthly)

def diagnostics(a):
    p=pd.read_csv(R/'country-panel.csv').pivot(index=['country_id','year'],columns='variable',values='value').reset_index().sort_values(['country_id','year'])
    features=['income_ppp','cereal_yield']
    p['y']=p.groupby('country_id').food_index.transform(lambda s:np.log(s.where(s>0)).diff())
    p['x1']=p.groupby('country_id').income_ppp.transform(lambda s:np.log(s.where(s>0)).diff()).groupby(p.country_id).shift(1)
    p['x2']=(p.groupby('country_id').urban.diff()/100).groupby(p.country_id).shift(1)
    p['x3']=p.groupby('country_id').cereal_yield.transform(lambda s:np.log(s.where(s>0)).diff()).groupby(p.country_id).shift(1)
    tr=p[(p.year>=2002)&(p.year<=2018)].dropna(subset=['y','x1','x2','x3']);X=np.c_[np.ones(len(tr)),tr[['x1','x2','x3']]];y=tr.y.to_numpy();b=np.linalg.lstsq(X,y,rcond=None)[0];res=y-X@b
    assert len(tr)==a['regression']['observations_train']
    vif=[]
    for j in range(1,4):
        target=X[:,j];other=np.delete(X,j,axis=1);err=target-other@np.linalg.lstsq(other,target,rcond=None)[0];r2=1-np.sum(err**2)/np.sum((target-target.mean())**2);vif.append(float(1/(1-r2)))
    scaled=np.c_[np.ones(len(X)),(X[:,1:]-X[:,1:].mean(axis=0))/X[:,1:].std(axis=0)]
    annual=[]
    hold=pd.read_csv(R/'regression-holdout.csv')
    for year,g in hold.groupby('year'):annual.append({'year':int(year),'rows':len(g),'model_MAE':float(abs(g.g_food_index-g.predicted).mean()),'benchmark_MAE':float(abs(g.g_food_index-g.benchmark).mean())})
    stability=[]
    for lo,hi in [(2002,2010),(2011,2018)]:
        mask=(tr.year>=lo)&(tr.year<=hi);bb=np.linalg.lstsq(X[mask],y[mask],rcond=None)[0];stability.append({'period':f'{lo}-{hi}','rows':int(mask.sum()),'coefficients':bb.tolist()})
    diag={'VIF':dict(zip(['lag_income_growth','lag_urban_change','lag_yield_growth'],vif)),'scaled_condition_number':float(np.linalg.cond(scaled)),'residual_quantiles':dict(zip(['p01','p05','p50','p95','p99'],np.quantile(res,[.01,.05,.5,.95,.99]).tolist())),'annual_holdout_errors':annual,'split_sample_stability':stability,'interpretation':'Small holdout gain, unstable aggregate associations and target mismatch prevent investment use. Residual/OLS standard-error diagnostics do not identify demand or intervention effects. No calibrated predictive interval published.'}
    a['regression']['diagnostics']=diag;writecsv('regression-year-errors.csv',annual)
    plt.rcParams.update({'font.family':'DejaVu Sans','font.size':10})
    fig,ax=plt.subplots(1,3,figsize=(13,3.6));ax[0].scatter(X@b,res,s=5,alpha=.2,color='#215b42');ax[0].axhline(0,c='gray',lw=.8);ax[0].set(xlabel='Fitted annual log growth',ylabel='Residual',title='Training residuals')
    ax[1].hist(res,bins=80,color='#78a583');ax[1].set(xlabel='Residual log growth',title='Residual distribution')
    ax[2].plot([r['year'] for r in annual],[r['model_MAE'] for r in annual],label='OLS',c='#215b42');ax[2].plot([r['year'] for r in annual],[r['benchmark_MAE'] for r in annual],label='Country mean',c='#c4913f');ax[2].set(xlabel='Holdout year',ylabel='MAE log growth',title='Retrospective holdout');ax[2].legend();fig.tight_layout();fig.savefig(P/'regression-diagnostics.png',dpi=160);fig.savefig(P/'regression-diagnostics.pdf');plt.close(fig)

def decision_experiments(a):
    # Full common-factor covariance before clipping; PSD checked numerically.
    loading=np.array([[-.10,.06,0],[.035,0,.018],[8,0,0],[.008,0,0]])
    cov=loading@loading.T;eig=np.linalg.eigvalsh(cov);assert eig.min()>-1e-10
    a['stress']['latent_covariance']=cov.tolist();a['stress']['latent_covariance_eigenvalues']=eig.tolist();a['stress']['fixed_input_parity_NPV']=cash(a['modes'][2],a['scenarios'][0])['npv']
    comparisons=[]
    for kind in ['dependent_normal','independent_normal','dependent_student_t5']:
        rng=np.random.default_rng(20261008);values=[]
        for _ in range(2500):
            z,e1,e2=rng.normal(size=3)
            if kind=='dependent_student_t5':z=float(rng.standard_t(5)*math.sqrt(3/5))
            if kind=='independent_normal':zv,zc,zd,zr=rng.normal(size=4)
            else:zv=zc=zd=zr=z
            s={**a['scenarios'][0],'volume':float(np.clip(1-.1*zv+.06*e1,.55,1.35)),'cost':float(np.clip(1+.035*zc+.018*e2,.9,1.22)),'days':float(np.clip(8*zd,-8,35)),'rate':float(np.clip(.1+.008*zr,.06,.16))}
            values.append(cash(a['modes'][2],s)['npv'])
        loss=np.maximum(0,-np.array(values));var=np.quantile(loss,.95)
        comparisons.append({'generator':kind,'draws':2500,'seed':20261008,'p10_NPV':float(np.quantile(values,.1)),'p50_NPV':float(np.median(values)),'p90_NPV':float(np.quantile(values,.9)),'loss_CVaR95':float(loss[loss>=var].mean()),'status':'Chosen dependence/tail sensitivity, no likelihood calibration'})
    a['stress']['dependence_tail_comparison']=comparisons;writecsv('dependence-tail-comparison.csv',comparisons)
    prior=.5;accuracy=.8;good=10.;bad=-8.;cost=1.;delay=.5
    priorbest=max(0,prior*good+(1-prior)*bad)
    ppos=prior*accuracy+(1-prior)*(1-accuracy);postpos=prior*accuracy/ppos;postneg=prior*(1-accuracy)/(1-ppos)
    posterior=ppos*max(0,postpos*good+(1-postpos)*bad)+(1-ppos)*max(0,postneg*good+(1-postneg)*bad)
    evsi=posterior-priorbest
    a['learning_experiment']={'prior':prior,'accuracy':accuracy,'good_NPV':good,'bad_NPV':bad,'study_cost':cost,'delay_cost':delay,'prior_best_EV':priorbest,'posterior_best_EV':posterior,'gross_EVSI':evsi,'net_EVSI':evsi-cost-delay,'net_EVPI':prior*max(0,good)+(1-prior)*max(0,bad)-priorbest-cost-delay,'accuracy_break_even':6.5/9,'status':'Executed chosen Bayesian two-state example, USDm. Symmetric test accuracy and prior are assumptions, not estimated Olam probabilities.'}
    tests=[]
    for p in [.2,.35,.5,.65,.8]:
        for q in [.5,.6,.7,.8,.9,1.]:
            pp=p*q+(1-p)*(1-q);pos=p*q/pp;neg=p*(1-q)/(1-pp) if pp<1 else 0;after=pp*max(0,pos*10+(1-pos)*-8)+(1-pp)*max(0,neg*10+(1-neg)*-8);before=max(0,p*10+(1-p)*-8)
            tests.append({'prior_good':p,'symmetric_test_accuracy':q,'gross_EVSI':after-before,'net_EVSI_after_study_and_delay':after-before-1.5})
    writecsv('information-value-sensitivity.csv',tests)
    a['capacity_marketing_experiment']={'baseline_orders_t':90,'capacity_t':100,'marketing_added_orders_t':30,'incremental_margin_USD_per_t':60,'marketing_USD':500,'service_USD':200,'capacity_repair_USD':300,'marketing_at_original_capacity_USD':10*60-700,'marketing_with_capacity120_USD':30*60-700,'combined_repair_and_marketing_USD':30*60-700-300,'status':'Executed one-period chosen example. Marketing alone destroys USD100 when supply binds; full headroom yields USD1,100; combined repair yields USD800. No causal effect or Olam result.'}
    # Same-payoff benchmarks: fractional allocations under one USD20m envelope.
    pay=np.array(a['portfolio']['payoffs']);allocation=np.array([0,1/3,1/3,1/3]);equal=allocation@pay
    opt=linprog([0,0,0,0,1],A_ub=np.c_[-pay.T,-np.ones(6)],b_ub=-pay.max(axis=0),A_eq=[[1,1,1,1,0]],b_eq=[1],bounds=[(0,1)]*4+[(0,None)],method='highs');assert opt.success
    a['portfolio']['relaxed_minimax']={'weights':opt.x[:4].tolist(),'worst_regret':float(opt.x[4]),'payoffs':(opt.x[:4]@pay).tolist(),'limitation':'Linear fractional-scalability relaxation only. Four original actions are indivisible alternatives; real assets require lumpy budgets/contracts and cannot be assumed fractionally scalable.'}
    strategy={'Equal linear split (relaxed)':equal,'Market-size / central owned':pay[1],'Central standalone NPV owned':pay[1],'Four discrete actions: partner':pay[2],'Optimal linear split (relaxed)':opt.x[:4]@pay,'Wait':pay[0]}
    benchmark=[]
    for name,v in strategy.items():benchmark.append({'policy':name,'payoffs':v.tolist(),'worst_payoff':float(min(v)),'worst_regret':float(max(pay.max(axis=0)-v)),'budget_USDm':20.,'evidence_status':'Chosen common payoff/budget example. Fractional split requires linear scalability; partner minimizes regret among4 indivisible actions only. Management/country-score heuristics unexecuted without criteria'})
    a['portfolio']['benchmarks']=benchmark;writecsv('policy-benchmarks.csv',benchmark)
    # LP network: source → destination quantities, all USD/t margins chosen.
    margins=np.array([30,25,10,20,35,15.]);cost=-margins
    constraints=np.array([[1,1,1,0,0,0],[0,0,0,1,1,1],[1,0,0,1,0,0],[0,1,0,0,1,0],[0,0,1,0,0,1]])
    bounds=[(0,60),(0,50),(0,0),(0,40),(0,70),(0,30)] # origin A → buyer3 blocked by chosen access gate
    limits=np.array([100,90,70,80,40]);sol=linprog(cost,A_ub=constraints,b_ub=limits,bounds=bounds,method='highs');assert sol.success
    a['network_example']={'origins':['A','B'],'destinations':['Buyer1','Buyer2','Buyer3'],'quantity_t':sol.x.tolist(),'margins_USD_per_t':margins.tolist(),'total_contribution_USD':float(-sol.fun),'source_and_demand_limits_t':limits.tolist(),'constraint_slack_t':sol.ineqlin.residual.tolist(),'shadow_value_USD_per_t':(-sol.ineqlin.marginals).tolist(),'status':'Chosen one-period flow LP. Net margin includes hypothetical delivery cost. Route A→Buyer3 is structurally blocked; no penalty can authorize it. No actual network synergy or NPV is claimed.'}
    assert np.max(constraints@sol.x-limits)<1e-8 and sol.x[2]==0
    writecsv('network-flow-example.csv',[{'origin':o,'buyer':b,'delivered_t':float(sol.x[i]),'net_margin_USD_per_t':float(margins[i]),'route_cap_t':bounds[i][1],'eligibility':'Blocked' if i==2 else 'Chosen feasible route'} for i,(o,b) in enumerate([(o,b) for o in ['A','B'] for b in ['Buyer1','Buyer2','Buyer3']])])
    # Actual model ablations, all using the same managed owned inputs.
    f=next(f for f in a['financials'] if f['mode_id']=='plant' and f['scenario_id']=='managed');baseval=f['npv']
    no_nwc=baseval+sum((r['delta_working_capital']-r['closeout'])/r['discount_factor'] for r in f['rows'])
    uncapped=cash({**a['modes'][2],'capacity':1e9},a['scenarios'][0])['npv']
    a['ablations']=[{'module_removed':'Working capital and its closeout','baseline_NPV':baseval,'ablated_NPV':no_nwc,'consequence':'Omitting cash investment overstates project value'},{'module_removed':'Physical capacity cap','baseline_NPV':baseval,'ablated_NPV':uncapped,'consequence':'Headroom is immaterial in this managed case; adverse constraints remain relevant'},{'module_removed':'Learning decision update','baseline_NPV':a['learning_experiment']['net_EVSI'],'ablated_NPV':-1.5,'consequence':'Paying for a study without changing a decision has only cost'}]
    writecsv('model-ablations.csv',a['ablations'])

def product_dossiers(a):
    plans=[];matrix=[];lookup={(r['mode'],r['scenario']):r for r in a['thresholds']}
    for c in a['countries']:
        ids=COUNTRY_PRODUCTS.get(c['id'],['unselected'])
        c['product_decision_units']=[]
        for pid in ids:
            spec=PRODUCTS.get(pid)
            unit={'id':c['id']+'-'+pid,'product_id':pid,'product':spec[0] if spec else 'Unselected product; category evidence required','hs_candidate':spec[1] if spec else None,'hs_treatment':spec[2] if spec else 'Not applicable until a product and composition are selected','customer_segment':spec[3] if spec else c['segment'],'unmet_need':spec[4] if spec else 'Unmeasured; local evidence required','value_proposition':spec[5] if spec else c['marketing'],'price_pack':spec[6] if spec else 'No price or pack recommendation before customer economics','channel':spec[7] if spec else 'No launch channel selected','promotion_service':spec[8] if spec else 'Evidence interviews only','entry_mode':c['entry_mode'],'corridor':c['corridor'],'counterfactual':'Continue existing service/eligible trade without the incremental intervention, in the same scenario','competitor_response':'Measure delivered rival price, specification, credit and service; allow matched-price/credit response. No shares or rival costs available.','incremental_cash':'Net paid orders × delivered unit contribution − service/promotion − cannibalisation − cash funding; cap deliveries at verified supply','primary_metric':'Incremental paid contribution net of service/cannibalisation; measured usable output and repeat after promotion','sustainability':'Verify actual supplier/basin/asset, rights and product standards before any claim or route commitment','owner':'Country '+c['id']+' category lead; Finance owns contribution; Treasury cash; Legal eligibility','timing':'Days 1–30 diagnose/design; 31–60 controlled test; 61–90 cash/transfer review','stop_rule':'Stop for negative approved contribution bound, unfunded monthly liquidity, failed rights/access/quality or no paid repeat; numeric limits require Finance approval','evidence_cost':None,'cost_status':'Obtain vendor/fieldwork quote and opportunity-cost estimate before commissioning; not zero','data_needed':'Customer-linked prices, paid orders, usable yield, returns, full route costs, credit, monthly inventory, assets/permits and competitor observations','source_ids':c['source_ids'],'assumption_ids':['A_PILOT','A_TEMPLATE'],'status':'Threshold-only commercial hypothesis; neither feasible entry nor investment return validated'}
            c['product_decision_units'].append(unit)
            if spec:plans.append(unit)
            for s in a['scenarios']:
                th=lookup[c['entry_mode'],s['id']]
                for year in [2026,2030,2035,2040,2045,2050,2051]:
                    row={key:None for key in ['feasible_flag','category_demand','attainable_capture','capacity','delivered_volume','net_price','revenue','variable_cost','fixed_cash_cost','EBITDA','depreciation','EBIT','tax','capex','working_capital','delta_working_capital','free_cash_flow','discount_rate','NPV','liquidity_shortfall','carbon_water_metrics_if_applicable']}
                    row.update({'country_id':c['id'],'product_id':pid,'customer_segment':unit['customer_segment'],'entry_mode':c['entry_mode'],'corridor_id':c['corridor'],'scenario_id':s['id'],'horizon_year':year,'current_presence':c['current_presence'],'evidence_grade':'threshold-only','counterfactual':unit['counterfactual'],'population_external_projection':c['population'][str(year)],'template_break_even_orders_tonnes':th['investment_break_even_orders'],'template_status':'Chosen generic entry-mode boundary; product and country calibration absent','recommendation':c['disposition'],'decision_gate':c['gate'],'source_ids':';'.join(c['source_ids']),'assumption_ids':';'.join(c['assumption_ids']),'calculation_ids':th['calculation_id']+';C-POP-'+c['id'],'not_applicable_reason':'Product selection pending; no physically arbitrary product assignment' if pid=='unselected' else None})
                    matrix.append(row)
        c['research_date']='2026-10-08';c['data_quality']=f"{sum(o is not None for o in c['observations'].values())}/{len(SERIES)} dated national drivers; no customer/asset validation"
        c['decision_falsifier']='A verified product is inaccessible, delivered contribution fails the approved floor, paid repeat disappears, seasonal cash is unfunded or the supplier/asset fails rights and resilience requirements.'
        c['portfolio_dependencies']='Origins, shipping choke points, ports, basins, supplier groups, currencies and counterparties must be reconciled across projects. No quantified diversification credit.'
        c['evidence_cost_status']='Unquoted; Country/Finance procure a priced data/pilot plan before spend. No zero-cost inference.'
    a['priority_product_plans']=plans;writecsv('priority-product-plans.csv',plans);writecsv('country-scenario-matrix.csv',matrix)
    a['summary']['country_scenario_rows']=len(matrix);a['summary']['product_decision_units']=sum(len(c['product_decision_units']) for c in a['countries']);a['summary']['priority_product_cases']=len(plans)
    writecsv('country-register.csv',[{k:v for k,v in c.items() if not isinstance(v,(dict,list))} for c in a['countries']])

def scenario_bridge(a):
    qualitative={
      'managed':['WPP Medium; moderate real-order growth','Gradual productivity/adaptation; functioning trade','No free nutrition premium; ordinary competitive response'],
      'integration':['WPP Medium; stronger affordable paid demand','Lower delivered unit cost; infrastructure/productivity gain','Rivals may compete away gain; verify capture'],
      'fragmented':['WPP Medium; weaker accessible demand','Higher trade/compliance/stocks; reduced route capacity','Partial pass-through; local processing has raw-input risk'],
      'physical':['WPP Medium; disrupted paid demand','Common crop/port disruption, capacity reduction, higher input cost','Adaptation not a free recovery; shortages do not guarantee capture'],
      'squeeze':['WPP Medium; weak real affordability','Credit/collections and funding deteriorate','Net price cannot fully recover cost; packs/service require proof'],
      'nutrition':['WPP Medium; changing category mix','Standards/resource adaptation adds cost','Equal price/cost multiplier means no assumed net premium']}
    rows=[]
    for s in a['scenarios']:
        dem,supply,competition=qualitative[s['id']]
        s['macro_bridge']={'population_income':dem,'trade_climate_adaptation':supply,'competition_preferences':competition,'FX_inflation':'Real2026USD template: no nominal inflation or local FX path applied. Actual local procurement/hedge/translation requires a separate matched model.','outer_horizon':'Full chosen order growth through2035, half thereafter; volume remains capacity-capped. External WPP population is not multiplied again into orders.','no_double_counting':'Volume/growth are aggregate paid-order assumptions, including affordability/mix. Cost multiplier aggregates delivered input/freight/compliance stress; no extra FX/commodity penalty. Capacity is a distinct physical cap; days affect cash once; hurdle is chosen, not a sovereign rate addition.','unresolved':'No calibrated country/category macro-to-order or climate-damage coefficients; alternative qualitative worlds do not have probabilities.'}
        rows.append({'scenario':s['id'],**s['macro_bridge'],'numeric_financial_driver_vector':{k:s[k] for k in ['volume','growth','cost','price','fixed','days','rate','capacity']}})
    a['scenario_bridges']=rows;writecsv('scenario-driver-bridge.csv',rows)

if __name__=='__main__':
    a=json.loads((P/'analysis.json').read_text());additional_drivers(a);finance_extensions(a);diagnostics(a);decision_experiments(a);product_dossiers(a);scenario_bridge(a)
    a['summary']['version']='1.1.0';a['summary']['audit_date']='2026-10-08';a['summary']['extended_analysis_run_at']=datetime.datetime.now(datetime.timezone.utc).isoformat()
    (P/'analysis.json').write_text(json.dumps(clean(a),separators=(',',':')));(R/'analysis.json').write_text(json.dumps(clean(a),indent=2))
    print(json.dumps({'drivers':len(SERIES),'product_cases':len(a['priority_product_plans']),'matrix_rows':a['summary']['country_scenario_rows'],'sensitivities':len(a['sensitivities']),'net_EVSI':a['learning_experiment']['net_EVSI'],'network_margin':a['network_example']['total_contribution_USD']},indent=2))
