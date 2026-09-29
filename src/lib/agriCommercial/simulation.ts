import { AgriInputs } from './types';
import { calculateCommercialFinancials } from './engine';

export type CorrelationMatrix={
  keys:(keyof AgriInputs)[];
  values:number[][];
};

const clamp=(v:number,min:number,max:number)=>Math.min(max,Math.max(min,v));

const riskKeys:(keyof AgriInputs)[]=[
  'fxIndex','commodityIndex','freightIndex','foodInflationPct','affordabilityIndex',
  'priceIndex','weightedDistribution','onShelfAvailability','competitorPressure'
];

export const defaultCorrelationMatrix:CorrelationMatrix={
  keys:riskKeys,
  values:[
    [1,.45,.28,.38,-.32,.32,0,-.08,.18],
    [.45,1,.35,.34,-.26,.27,0,-.05,.16],
    [.28,.35,1,.22,-.18,.14,-.06,-.16,.10],
    [.38,.34,.22,1,-.62,.28,-.08,-.10,.24],
    [-.32,-.26,-.18,-.62,1,-.34,.10,.18,-.20],
    [.32,.27,.14,.28,-.34,1,.05,.04,.12],
    [0,0,-.06,-.08,.10,.05,1,.62,-.18],
    [-.08,-.05,-.16,-.10,.18,.04,.62,1,-.22],
    [.18,.16,.10,.24,-.20,.12,-.18,-.22,1],
  ]
};

export function validateCorrelationMatrix(matrix:CorrelationMatrix){
  const n=matrix.keys.length;
  if(matrix.values.length!==n||matrix.values.some(row=>row.length!==n)) return false;
  for(let i=0;i<n;i++){
    if(Math.abs(matrix.values[i][i]-1)>1e-9) return false;
    for(let j=0;j<n;j++){
      if(matrix.values[i][j]<-1||matrix.values[i][j]>1) return false;
      if(Math.abs(matrix.values[i][j]-matrix.values[j][i])>1e-9) return false;
    }
  }
  try{ cholesky(matrix.values); return true; }catch{ return false; }
}

function cholesky(a:number[][]){
  const n=a.length;
  const l=Array.from({length:n},()=>Array(n).fill(0));
  for(let i=0;i<n;i++){
    for(let j=0;j<=i;j++){
      let sum=0;
      for(let k=0;k<j;k++) sum+=l[i][k]*l[j][k];
      if(i===j){
        const value=a[i][i]-sum;
        if(value<=1e-10) throw new Error('Correlation matrix is not positive definite');
        l[i][j]=Math.sqrt(value);
      }else{
        l[i][j]=(a[i][j]-sum)/l[j][j];
      }
    }
  }
  return l;
}

function rngFactory(seed:number){
  let state=seed>>>0;
  return ()=>{
    state=(1664525*state+1013904223)>>>0;
    return state/4294967296;
  };
}
function normal(rng:()=>number){
  const u1=Math.max(1e-12,rng());
  const u2=Math.max(1e-12,rng());
  return Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2);
}
function percentile(values:number[],p:number){
  const sorted=[...values].sort((a,b)=>a-b);
  const pos=(sorted.length-1)*p;
  const lo=Math.floor(pos),hi=Math.ceil(pos),w=pos-lo;
  return lo===hi?sorted[lo]:sorted[lo]*(1-w)+sorted[hi]*w;
}

const sigmaPct:Partial<Record<keyof AgriInputs,number>>={
  fxIndex:.10,commodityIndex:.12,freightIndex:.11,foodInflationPct:.18,affordabilityIndex:.09,
  priceIndex:.055,weightedDistribution:.035,onShelfAvailability:.03,competitorPressure:.07
};

export function runCorrelatedSimulation(
  input:AgriInputs,
  runs=4000,
  seed=20260929,
  matrix=defaultCorrelationMatrix
){
  if(!Number.isInteger(runs)||runs<500||runs>20000) throw new Error('Simulation runs must be 500–20000');
  if(!validateCorrelationMatrix(matrix)) throw new Error('Invalid correlation matrix');
  const l=cholesky(matrix.values);
  const rng=rngFactory(seed);
  const outputs:{revenue:number;ebit:number;margin:number;cash:number;returnOnCapital:number}[]=[];

  for(let r=0;r<runs;r++){
    const z=matrix.keys.map(()=>normal(rng));
    const correlated=z.map((_,i)=>l[i].reduce((sum,v,j)=>sum+v*z[j],0));
    const scenario={...input};
    matrix.keys.forEach((key,i)=>{
      const base=input[key] as number;
      const sigma=sigmaPct[key]??.05;
      let next=base*(1+correlated[i]*sigma);
      if(['weightedDistribution','onShelfAvailability','competitorPressure'].includes(String(key))){
        next=clamp(next,0,100);
      }
      if(key==='foodInflationPct') next=clamp(next,-20,200);
      (scenario[key] as number)=next;
    });
    const out=calculateCommercialFinancials(scenario);
    outputs.push({
      revenue:out.netRevenue,
      ebit:out.ebit,
      margin:out.ebitMarginPct,
      cash:-out.workingCapital,
      returnOnCapital:out.ebitOnInvestedCapitalPct
    });
  }

  const metric=(key:keyof typeof outputs[number])=>{
    const values=outputs.map(o=>o[key]);
    return {
      p5:percentile(values,.05),p10:percentile(values,.10),p25:percentile(values,.25),
      p50:percentile(values,.50),p75:percentile(values,.75),p90:percentile(values,.90),p95:percentile(values,.95),
      mean:values.reduce((a,b)=>a+b,0)/values.length
    };
  };

  return {
    runs,seed,
    revenue:metric('revenue'),
    ebit:metric('ebit'),
    margin:metric('margin'),
    cash:metric('cash'),
    returnOnCapital:metric('returnOnCapital'),
    methodology:'Seeded correlated Gaussian stress simulation using Cholesky decomposition. Distributional assumptions are decision-stress priors, not empirically estimated probabilities.'
  };
}
