import React from 'react';
import type { DirectionalImpact, BrandDecisionModel } from '../../lib/canonicalMarketingModel';
import type { CanonicalScenarioOutputs } from '../../lib/canonicalStrategyModel';
import { CMO_OPERATING_LENS, LATEST_DEVELOPMENTS_2026 } from '../../data/canonicalMarketingDecision';
import {
  FUNDAMENTAL_MARKETING_INSIGHTS,
  NUMERIC_EVIDENCE_RULES,
  VERIFIED_EVIDENCE,
} from '../../data/canonicalVerifiedEvidence';

const money = (v: number) => '$' + v.toFixed(1) + 'm';
const signedMoney = (v: number) => (v >= 0 ? '+' : '') + money(v);
const signed = (v: number, digits = 1) => (v >= 0 ? '+' : '') + v.toFixed(digits);

export const DirectionalImpactBox: React.FC<{ impact: DirectionalImpact }> = ({ impact }) => {
  const sensitivityClass =
    impact.sensitivity === 'very high' ? 'text-red-300 border-red-400/25 bg-red-400/[0.05]' :
    impact.sensitivity === 'high' ? 'text-orange-300 border-orange-400/25 bg-orange-400/[0.05]' :
    impact.sensitivity === 'medium' ? 'text-amber-200 border-amber-300/20 bg-amber-300/[0.04]' :
    'text-cyan-200 border-cyan-300/20 bg-cyan-300/[0.04]';
  return (
    <div className="canonical-impact-box rounded-xl border border-white/10 bg-white/[0.025] p-4 mb-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-white/90">Directional consequence</div>
          <div className="mt-1 text-sm font-semibold text-white">{impact.label}</div>
        </div>
        <span className={'rounded border px-2 py-1 text-[8px] font-mono uppercase ' + sensitivityClass}>{impact.sensitivity} sensitivity</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-md border border-white/8 p-2"><span className="block text-[8px] text-white/68">Revenue</span><strong className="text-[10px] font-mono text-white">{signedMoney(impact.revenueDelta)}</strong></div>
        <div className="rounded-md border border-white/8 p-2"><span className="block text-[8px] text-white/68">Op profit</span><strong className="text-[10px] font-mono text-white">{signedMoney(impact.operatingProfitDelta)}</strong></div>
        <div className="rounded-md border border-white/8 p-2"><span className="block text-[8px] text-white/68">Margin</span><strong className="text-[10px] font-mono text-white">{signed(impact.marginDeltaBps, 0)} bps</strong></div>
      </div>
      <div className="mt-3 space-y-3 text-[10px] leading-relaxed">
        <div><span className="text-orange-300 font-mono uppercase text-[8px]">Canonical</span><p className="mt-1 text-white/88">{impact.canonical}</p></div>
        <div><span className="text-violet-300 font-mono uppercase text-[8px]">Competitors</span><p className="mt-1 text-white/88">{impact.competitors}</p></div>
        <div className="rounded-md border border-emerald-400/25 bg-emerald-400/[0.06] p-3"><span className="text-emerald-200 font-mono uppercase text-[9px]">Marketing response</span><p className="mt-1 text-[11px] text-white/90">{impact.marketingResponse}</p></div>
        <div><span className="text-cyan-300 font-mono uppercase text-[8px]">P&L path</span><p className="mt-1 text-white/78">{impact.pnlPath}</p></div>
        <div><span className="text-fuchsia-300 font-mono uppercase text-[8px]">Brand path</span><p className="mt-1 text-white/78">{impact.brandPath}</p></div>
        <div className="border-t border-white/8 pt-2 text-white/90"><strong className="text-white/78">Falsifier:</strong> {impact.falsifier}</div>
      </div>
    </div>
  );
};

export const PnLBrandCube: React.FC<{ metrics: CanonicalScenarioOutputs; brand: BrandDecisionModel }> = ({ metrics, brand }) => (
  <div className="canonical-pnl-perspective [perspective:1200px]">
    <div className="canonical-pnl-cube relative rounded-2xl border border-white/10 bg-[#0E1118] p-5 md:p-7 shadow-[20px_28px_70px_rgba(0,0,0,.35)] [transform:rotateX(4deg)_rotateY(-4deg)] [transform-style:preserve-3d]">
      <div className="absolute -right-3 top-5 bottom-[-12px] w-3 bg-gradient-to-b from-violet-400/20 to-orange-400/10 [transform:skewY(-35deg)]" />
      <div className="absolute left-4 right-[-12px] -bottom-3 h-3 bg-gradient-to-r from-orange-400/18 to-cyan-400/10 [transform:skewX(-50deg)]" />
      <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-5">
        <div className="space-y-3">
          <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/90">3D P&L decision bridge</div>
          {[
            ['Revenue engine', money(metrics.projectedRevenue), money(metrics.incrementalRevenue) + ' incremental', 'border-orange-400/30'],
            ['Recurring quality', money(metrics.projectedSubscriptionRevenue), metrics.subscriptionMixPct.toFixed(1) + '% subscription mix', 'border-cyan-400/30'],
            ['Growth investment', money(metrics.growthInvestment), money(brand.marketingInvestment) + ' allocated to marketing', 'border-violet-400/30'],
            ['Operating outcome', money(metrics.projectedOperatingProfit), metrics.operatingMarginPct.toFixed(1) + '% operating margin', 'border-emerald-400/30'],
          ].map(([label, value, detail, border]) => (
            <div key={label} className={'grid grid-cols-[1fr_auto] gap-4 rounded-lg border bg-white/[0.025] p-3 ' + border}>
              <div><div className="text-[9px] uppercase tracking-wide text-white/90">{label}</div><div className="mt-1 text-[10px] text-white/74">{detail}</div></div>
              <strong className="text-lg text-white">{value}</strong>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/90">Marketing + brand layer</div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ['Reach', brand.reachIndex],
              ['Awareness', brand.awarenessIndex],
              ['Strength', brand.strengthIndex],
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-md border border-white/8 p-3 text-center">
                <div className="text-[8px] uppercase text-white/68">{label}</div>
                <div className="mt-2 text-xl font-semibold text-white">{Number(value).toFixed(0)}</div>
                <div className="text-[8px] text-white/58">100 = default</div>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-[10px]">
            <div className="flex justify-between gap-3 border-t border-white/8 pt-2"><span className="text-white/72">Marketing-influenced ARR</span><strong className="text-white">{money(brand.marketingInfluencedARR)}</strong></div>
            <div className="flex justify-between gap-3 border-t border-white/8 pt-2"><span className="text-white/72">Influence / marketing investment</span><strong className="text-white">{brand.marketingInfluenceMultiple === null ? 'N/A' : brand.marketingInfluenceMultiple.toFixed(2) + '×'}</strong></div>
          </div>
          <p className="mt-4 text-[9px] leading-relaxed text-white/62">{brand.note}</p>
        </div>
      </div>
    </div>
  </div>
);

export const LatestDevelopmentRadar: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-2.5">
    {LATEST_DEVELOPMENTS_2026.map((item) => (
      <div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.025] p-3.5">
        <div className="flex justify-between gap-3 text-[8px] font-mono uppercase tracking-wide"><span className="text-orange-300">{item.theme}</span><span className="text-white/62">{item.date}</span></div>
        <div className="mt-2 text-[13px] font-semibold text-white">{item.title}</div>
        <p className="mt-1.5 text-[10px] leading-[1.5] text-white/80">{item.implication}</p>
      </div>
    ))}
  </div>
);

export const ExecutiveOperatingLens: React.FC = () => (
  <div className="grid md:grid-cols-5 gap-3">
    {CMO_OPERATING_LENS.map((item, idx) => (
      <div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
        <div className="text-[9px] font-mono text-orange-300">0{idx + 1}</div>
        <div className="mt-3 text-sm font-semibold text-white">{item.title}</div>
        <p className="mt-2 text-[10px] leading-relaxed text-white/78">{item.reason}</p>
      </div>
    ))}
  </div>
);


export const FundamentalInsightGrid: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-2.5">
    {FUNDAMENTAL_MARKETING_INSIGHTS.map((item, idx) => (
      <article key={item.title} className="rounded-xl border border-white/15 bg-white/[0.035] p-4">
        <div className="text-[9px] font-mono text-orange-300">LAW {String(idx + 1).padStart(2, '0')}</div>
        <h3 className="mt-2 text-[14px] font-semibold text-white">{item.title}</h3>
        <p className="mt-2 text-[10.5px] leading-[1.5] text-white/84">{item.insight}</p>
      </article>
    ))}
  </div>
);

export const VerifiedEvidenceAppendix: React.FC<{
  start?: number;
  end?: number;
  showRules?: boolean;
}> = ({ start = 0, end = VERIFIED_EVIDENCE.length, showRules = true }) => {
  const rows = VERIFIED_EVIDENCE.slice(start, end);
  return (
    <div className="space-y-3.5">
      {showRules && (
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] p-3.5">
          <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-cyan-200">Evidence rule</div>
          <div className="mt-2.5 grid md:grid-cols-2 gap-2.5">
            {NUMERIC_EVIDENCE_RULES.map((rule, idx) => (
              <div key={rule} className="flex gap-2.5 text-[10px] leading-[1.45] text-white/82">
                <span className="font-mono text-cyan-300">{String(idx + 1).padStart(2, '0')}</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2.5">
        {rows.map((row, localIdx) => {
          const idx = start + localIdx;
          return (
            <article key={row.id} className="rounded-xl border border-white/15 bg-white/[0.035] p-3.5">
              <div className="grid lg:grid-cols-[92px_1.22fr_.92fr_.92fr] gap-3 items-start">
                <div>
                  <div className="text-[9px] font-mono text-orange-300">EVIDENCE {String(idx + 1).padStart(2, '0')}</div>
                  <div className="mt-1.5 inline-flex rounded border border-emerald-400/25 bg-emerald-400/[0.05] px-1.5 py-0.5 text-[8px] font-mono uppercase text-emerald-200">consistent</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-white">{row.subject}</div>
                  <p className="mt-1.5 text-[9.5px] leading-[1.42] text-white/86">{row.retainedClaim}</p>
                  <p className="mt-1.5 text-[8.5px] leading-[1.4] text-white/66">{row.note}</p>
                </div>
                <div>
                  <div className="text-[8px] font-mono uppercase tracking-wide text-white/60">Primary</div>
                  <a href={row.primaryUrl} target="_blank" rel="noreferrer" className="mt-1.5 block text-[9px] leading-[1.4] text-orange-200 hover:text-orange-100 underline decoration-orange-300/40 underline-offset-2">{row.primaryLabel}</a>
                  <div className="mt-1.5 text-[8.5px] leading-[1.35] text-white/62">{row.primaryPage}</div>
                </div>
                <div>
                  <div className="text-[8px] font-mono uppercase tracking-wide text-white/60">Cross-check</div>
                  <a href={row.crossCheckUrl} target="_blank" rel="noreferrer" className="mt-1.5 block text-[9px] leading-[1.4] text-violet-200 hover:text-violet-100 underline decoration-violet-300/40 underline-offset-2">{row.crossCheckLabel}</a>
                  <div className="mt-1.5 text-[8.5px] leading-[1.35] text-white/62">Independent or separately filed reference used to test consistency.</div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
