import React, { useMemo, useState } from 'react';
import { AlertTriangle, Calculator, Check, Copy, Info, RefreshCw, ShieldCheck } from 'lucide-react';
import {
  buildCpcConversionSensitivity,
  buildRiskScenarios,
  calculateCampaignEconomics,
  type CampaignEconomicsInputs,
} from '../../lib/campaignEconomics';

type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP';

const currencies: Record<CurrencyCode, { symbol: string; locale: string }> = {
  USD: { symbol: '$', locale: 'en-US' },
  INR: { symbol: '₹', locale: 'en-IN' },
  EUR: { symbol: '€', locale: 'de-DE' },
  GBP: { symbol: '£', locale: 'en-GB' },
};

const initialInputs: CampaignEconomicsInputs = {
  monthlyMediaSpend: 25000,
  monthlyFixedAcquisitionCosts: 3500,
  cpc: 2.4,
  conversionRatePct: 2.5,
  incrementalityPct: 80,
  averageOrderValue: 140,
  ordersPerActiveCustomerPerMonth: 0.85,
  grossMarginPct: 65,
  refundRatePct: 5,
  variableCostPct: 8,
  monthlyChurnPct: 6,
  annualDiscountRatePct: 10,
  ltvHorizonMonths: 36,
};

type FieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  note?: string;
};

const Field: React.FC<FieldProps> = ({ label, value, onChange, min, max, step, prefix, suffix, note }) => (
  <label className="block rounded-lg border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-950/35 dark:bg-neutral-950/35 light:bg-white p-3.5">
    <span className="block text-[11px] font-mono uppercase tracking-[0.08em] text-neutral-500">{label}</span>
    <div className="mt-2 flex items-center gap-2">
      {prefix && <span className="text-sm text-neutral-500">{prefix}</span>}
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => {
          const n = Number(e.target.value);
          onChange(Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : min);
        }}
        className="min-w-0 w-full rounded-md border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-50 px-2.5 py-2 text-sm font-mono font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
      />
      {suffix && <span className="text-sm text-neutral-500">{suffix}</span>}
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="mt-3 w-full accent-amber-400 cursor-pointer"
    />
    {note && <span className="mt-1.5 block text-[11px] leading-relaxed text-neutral-500">{note}</span>}
  </label>
);

const Metric: React.FC<{ label: string; value: string; note: string; tone?: string }> = ({ label, value, note, tone }) => (
  <div className="rounded-lg border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-950/40 dark:bg-neutral-950/40 light:bg-white p-4">
    <span className="block text-[11px] font-mono uppercase tracking-[0.08em] text-neutral-500">{label}</span>
    <strong className={'mt-2 block text-xl md:text-2xl font-mono font-bold tracking-tight ' + (tone || 'text-neutral-100 dark:text-neutral-100 light:text-neutral-950')}>
      {value}
    </strong>
    <span className="mt-1.5 block text-[11px] leading-relaxed text-neutral-500">{note}</span>
  </div>
);

export const RoiCalculator: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [inputs, setInputs] = useState<CampaignEconomicsInputs>(initialInputs);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [copied, setCopied] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);

  const metrics = useMemo(() => calculateCampaignEconomics(inputs), [inputs]);
  const sensitivity = useMemo(() => buildCpcConversionSensitivity(inputs), [inputs]);
  const scenarios = useMemo(() => buildRiskScenarios(inputs), [inputs]);

  const set = <K extends keyof CampaignEconomicsInputs>(key: K, value: CampaignEconomicsInputs[K]) => {
    setInputs(current => ({ ...current, [key]: value }));
  };

  const money = (value: number, digits = 0) => {
    if (!Number.isFinite(value)) return '∞';
    return new Intl.NumberFormat(currencies[currency].locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: digits,
    }).format(value);
  };

  const number = (value: number, digits = 1) =>
    Number.isFinite(value) ? value.toLocaleString(undefined, { maximumFractionDigits: digits }) : '∞';

  const percent = (value: number, digits = 0) =>
    Number.isFinite(value) ? (value * 100).toFixed(digits) + '%' : '∞';

  const payback = Number.isFinite(metrics.paybackMonths)
    ? metrics.paybackMonths.toFixed(1) + ' mo'
    : '>' + inputs.ltvHorizonMonths + ' mo';

  const ratioTone = metrics.ltvCacRatio >= 3 ? 'text-emerald-400' : metrics.ltvCacRatio >= 1 ? 'text-amber-400' : 'text-rose-400';
  const roiTone = metrics.marketingROI >= 0.25 ? 'text-emerald-400' : metrics.marketingROI >= 0 ? 'text-amber-400' : 'text-rose-400';

  const copySummary = async () => {
    const summary = [
      'Campaign ROI & Payback Engine v2.0',
      'Media spend: ' + money(inputs.monthlyMediaSpend, 0),
      'Fixed acquisition cost: ' + money(inputs.monthlyFixedAcquisitionCosts, 0),
      'Incrementality: ' + inputs.incrementalityPct + '%',
      'Incremental customers: ' + number(metrics.incrementalCustomers, 1),
      'Fully-loaded incremental CAC: ' + money(metrics.fullyLoadedIncrementalCAC, 2),
      'Contribution LTV PV: ' + money(metrics.ltvContributionPV, 2),
      'LTV:CAC: ' + number(metrics.ltvCacRatio, 2) + 'x',
      'Discounted payback: ' + payback,
      'Marketing ROI: ' + percent(metrics.marketingROI, 1),
      'Campaign profit PV: ' + money(metrics.campaignProfitPV, 0),
      '',
      'Deterministic model: arithmetic is exact for entered assumptions; real-world accuracy depends on input and causal measurement quality.',
    ].join('\n');

    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const acquisitionFields = (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
      <Field label="Media spend / month" value={inputs.monthlyMediaSpend} onChange={v => set('monthlyMediaSpend', v)} min={0} max={1000000} step={1000} prefix={currencies[currency].symbol} note="Paid media only" />
      <Field label="Fixed acquisition costs" value={inputs.monthlyFixedAcquisitionCosts} onChange={v => set('monthlyFixedAcquisitionCosts', v)} min={0} max={250000} step={500} prefix={currencies[currency].symbol} note="Agency, creative, MarTech, sales support" />
      <Field label="Cost per click" value={inputs.cpc} onChange={v => set('cpc', v)} min={0.05} max={100} step={0.05} prefix={currencies[currency].symbol} />
      <Field label="Click → customer CVR" value={inputs.conversionRatePct} onChange={v => set('conversionRatePct', v)} min={0} max={50} step={0.1} suffix="%" note="Use customer conversion, not lead conversion" />
      <Field label="Incrementality" value={inputs.incrementalityPct} onChange={v => set('incrementalityPct', v)} min={0} max={100} step={1} suffix="%" note="Share of attributed customers caused by marketing" />
    </div>
  );

  if (compact) {
    return (
      <div className="rounded-xl border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 bg-neutral-950/45 dark:bg-neutral-950/45 light:bg-white p-5 md:p-6">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              <h3 className="font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">Campaign ROI & Payback Engine</h3>
            </div>
            <p className="mt-1 text-xs text-neutral-500">Incrementality-aware acquisition economics preview</p>
          </div>
          <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-mono text-emerald-400">v2.0</span>
        </div>
        <div className="py-5">{acquisitionFields}</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Metric label="Incremental CAC" value={money(metrics.fullyLoadedIncrementalCAC, 0)} note="Fully loaded" />
          <Metric label="LTV:CAC" value={number(metrics.ltvCacRatio, 2) + 'x'} note="Contribution basis" tone={ratioTone} />
          <Metric label="Payback" value={payback} note="Discounted" />
          <Metric label="Marketing ROI" value={percent(metrics.marketingROI, 0)} note="Lifetime contribution basis" tone={roiTone} />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 bg-neutral-950/45 dark:bg-neutral-950/45 light:bg-white text-neutral-100 dark:text-neutral-100 light:text-neutral-900 overflow-hidden">
      <div className="p-5 md:p-7 border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              <h2 className="text-lg md:text-xl font-semibold tracking-tight">Campaign ROI & Payback Engine v2.0</h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
              Deterministic cohort economics with explicit incrementality, fully-loaded CAC, discounted contribution LTV, exact within-month payback, break-even thresholds and scenario stress tests.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 rounded-md border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 bg-neutral-900/60 dark:bg-neutral-900/60 light:bg-neutral-50 px-2.5 py-1.5">
              <span className="text-[10px] font-mono uppercase text-neutral-500">Currency</span>
              <select value={currency} onChange={e => setCurrency(e.target.value as CurrencyCode)} className="bg-transparent text-xs font-mono text-neutral-200 dark:text-neutral-200 light:text-neutral-800 focus:outline-none">
                {Object.keys(currencies).map(code => <option key={code} value={code}>{code}</option>)}
              </select>
            </label>
            <button onClick={() => { setInputs(initialInputs); setCurrency('USD'); }} className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 px-3 py-2 text-xs font-mono text-neutral-400">
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
            <button onClick={copySummary} className="inline-flex items-center gap-1.5 rounded-md bg-amber-400 px-3 py-2 text-xs font-mono font-semibold text-neutral-950">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy audit summary'}
            </button>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
          <p className="text-xs leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-700">
            <strong className="text-neutral-200 dark:text-neutral-200 light:text-neutral-900">Accuracy boundary:</strong> arithmetic is deterministic and internally reconciled. Real-world accuracy depends on causal incrementality, retention data, and Finance-aligned cost definitions.
          </p>
        </div>
      </div>

      <div className="p-5 md:p-7 space-y-8">
        <section>
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-amber-400">01 · Acquisition mechanics</span>
          <h3 className="mt-1 mb-4 text-base font-semibold">From spend to causal customers</h3>
          {acquisitionFields}
        </section>

        <section>
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-amber-400">02 · Customer economics</span>
          <h3 className="mt-1 mb-4 text-base font-semibold">Revenue, contribution and retention</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Field label="Average order value" value={inputs.averageOrderValue} onChange={v => set('averageOrderValue', v)} min={0} max={10000} step={5} prefix={currencies[currency].symbol} />
            <Field label="Orders / active customer / month" value={inputs.ordersPerActiveCustomerPerMonth} onChange={v => set('ordersPerActiveCustomerPerMonth', v)} min={0} max={10} step={0.05} suffix="x" />
            <Field label="Gross margin" value={inputs.grossMarginPct} onChange={v => set('grossMarginPct', v)} min={0} max={100} step={1} suffix="%" note="After COGS" />
            <Field label="Refund / return rate" value={inputs.refundRatePct} onChange={v => set('refundRatePct', v)} min={0} max={80} step={0.5} suffix="%" />
            <Field label="Non-COGS variable costs" value={inputs.variableCostPct} onChange={v => set('variableCostPct', v)} min={0} max={80} step={0.5} suffix="%" note="Payment, fulfillment, incentives, service" />
            <Field label="Monthly churn" value={inputs.monthlyChurnPct} onChange={v => set('monthlyChurnPct', v)} min={0} max={50} step={0.5} suffix="%" />
            <Field label="Annual discount rate" value={inputs.annualDiscountRatePct} onChange={v => set('annualDiscountRatePct', v)} min={0} max={60} step={0.5} suffix="%" />
            <Field label="LTV horizon" value={inputs.ltvHorizonMonths} onChange={v => set('ltvHorizonMonths', Math.round(v))} min={1} max={120} step={1} suffix="mo" note="Finite horizon prevents infinite-LTV claims" />
          </div>
        </section>

        <section>
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-amber-400">03 · Executive economics</span>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3">
            <Metric label="Incremental customers" value={number(metrics.incrementalCustomers, 1)} note={number(metrics.attributedCustomers, 1) + ' attributed'} />
            <Metric label="Fully-loaded CAC" value={money(metrics.fullyLoadedIncrementalCAC, 2)} note={'Media-only ' + money(metrics.incrementalMediaCAC, 2)} />
            <Metric label="Contribution LTV PV" value={money(metrics.ltvContributionPV, 2)} note="Net of refunds + variable costs" />
            <Metric label="LTV:CAC" value={number(metrics.ltvCacRatio, 2) + 'x'} note="Contribution basis" tone={ratioTone} />
            <Metric label="Payback" value={payback} note="Discounted within-month interpolation" />
            <Metric label="Marketing ROI" value={percent(metrics.marketingROI, 1)} note="Campaign profit PV / acquisition cost" tone={roiTone} />
            <Metric label="1st-month iROAS" value={number(metrics.firstMonthIncrementalROAS, 2) + 'x'} note="Incremental net revenue / media spend" />
            <Metric label="Campaign profit PV" value={money(metrics.campaignProfitPV, 0)} note="Contribution PV less acquisition cost" tone={metrics.campaignProfitPV >= 0 ? 'text-emerald-400' : 'text-rose-400'} />
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 p-5 bg-neutral-950/30 dark:bg-neutral-950/30 light:bg-neutral-50">
            <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-amber-400">Financial bridge</span>
            <div className="mt-4 divide-y divide-neutral-800 dark:divide-neutral-800 light:divide-neutral-200">
              {[
                ['Attributed customers', number(metrics.attributedCustomers, 1)],
                ['Incremental customers', number(metrics.incrementalCustomers, 1)],
                ['Acquisition cost', money(metrics.acquisitionCost, 0)],
                ['First-month incremental revenue', money(metrics.firstMonthIncrementalRevenue, 0)],
                ['Horizon incremental revenue', money(metrics.horizonIncrementalRevenue, 0)],
                ['Horizon contribution PV', money(metrics.horizonContributionPV, 0)],
                ['Campaign profit PV', money(metrics.campaignProfitPV, 0)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                  <span className="text-neutral-400 dark:text-neutral-400 light:text-neutral-600">{label}</span>
                  <strong className="font-mono text-neutral-200 dark:text-neutral-200 light:text-neutral-900">{value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 p-5 bg-neutral-950/30 dark:bg-neutral-950/30 light:bg-neutral-50">
            <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-amber-400">Break-even control limits</span>
            <div className="mt-4 divide-y divide-neutral-800 dark:divide-neutral-800 light:divide-neutral-200">
              {[
                ['Max CPC at break-even', money(metrics.breakEvenCPC, 2)],
                ['Max CPC for 3.0x LTV:CAC', money(metrics.target3xCPC, 2)],
                ['Minimum CVR at break-even', number(metrics.breakEvenConversionRatePct, 2) + '%'],
                ['Minimum incrementality', number(metrics.breakEvenIncrementalityPct, 1) + '%'],
                ['Break-even media spend', Number.isFinite(metrics.breakEvenMediaSpend) ? money(metrics.breakEvenMediaSpend, 0) : 'Not reachable'],
                ['Profit / incremental customer', money(metrics.profitPerIncrementalCustomer, 2)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                  <span className="text-neutral-400 dark:text-neutral-400 light:text-neutral-600">{label}</span>
                  <strong className="font-mono text-neutral-200 dark:text-neutral-200 light:text-neutral-900">{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-amber-400">04 · Scenario risk</span>
          <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
            <table className="w-full min-w-[780px] text-sm">
              <thead className="bg-neutral-950/50 dark:bg-neutral-950/50 light:bg-neutral-50 text-[11px] font-mono uppercase text-neutral-500">
                <tr>
                  <th className="px-4 py-3 text-left">Scenario</th>
                  <th className="px-4 py-3 text-right">CPC</th>
                  <th className="px-4 py-3 text-right">CVR</th>
                  <th className="px-4 py-3 text-right">Incrementality</th>
                  <th className="px-4 py-3 text-right">Churn</th>
                  <th className="px-4 py-3 text-right">LTV:CAC</th>
                  <th className="px-4 py-3 text-right">Payback</th>
                  <th className="px-4 py-3 text-right">ROI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 dark:divide-neutral-800 light:divide-neutral-200">
                {scenarios.map(s => (
                  <tr key={s.name}>
                    <td className="px-4 py-3 font-semibold">{s.name}</td>
                    <td className="px-4 py-3 text-right font-mono">{money(s.inputs.cpc, 2)}</td>
                    <td className="px-4 py-3 text-right font-mono">{s.inputs.conversionRatePct.toFixed(2)}%</td>
                    <td className="px-4 py-3 text-right font-mono">{s.inputs.incrementalityPct.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-right font-mono">{s.inputs.monthlyChurnPct.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-right font-mono">{number(s.metrics.ltvCacRatio, 2)}x</td>
                    <td className="px-4 py-3 text-right font-mono">{Number.isFinite(s.metrics.paybackMonths) ? s.metrics.paybackMonths.toFixed(1) + ' mo' : '>' + inputs.ltvHorizonMonths + ' mo'}</td>
                    <td className={'px-4 py-3 text-right font-mono font-semibold ' + (s.metrics.marketingROI >= 0 ? 'text-emerald-400' : 'text-rose-400')}>{percent(s.metrics.marketingROI, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-amber-400">05 · CPC × conversion sensitivity</span>
          <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
            <table className="w-full min-w-[720px] text-xs font-mono">
              <thead className="bg-neutral-950/50 dark:bg-neutral-950/50 light:bg-neutral-50 text-neutral-500">
                <tr>
                  <th className="px-3 py-3 text-left">CVR \ CPC</th>
                  {[0.8, 0.9, 1, 1.1, 1.2].map(m => <th key={m} className="px-3 py-3 text-center">{m === 1 ? 'Baseline' : Math.round((m - 1) * 100) + '% CPC'}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 dark:divide-neutral-800 light:divide-neutral-200">
                {sensitivity.map((row, i) => {
                  const cm = [0.8, 0.9, 1, 1.1, 1.2][i];
                  return (
                    <tr key={cm}>
                      <td className="px-3 py-3 font-semibold text-neutral-500">{cm === 1 ? 'Baseline CVR' : Math.round((cm - 1) * 100) + '% CVR'}</td>
                      {row.map(cell => {
                        const tone = cell.marketingROI >= 0.5 ? 'bg-emerald-500/10 text-emerald-400' : cell.marketingROI >= 0 ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400';
                        return <td key={cell.cpcMultiplier} className="px-3 py-3 text-center"><span className={'inline-flex min-w-[72px] justify-center rounded px-2 py-1.5 font-semibold ' + tone}>{percent(cell.marketingROI, 0)}</span></td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
          <div className="rounded-xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 p-5 bg-neutral-950/30 dark:bg-neutral-950/30 light:bg-neutral-50">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-amber-400">06 · Formula audit trail</span>
                <h3 className="mt-1 text-base font-semibold">Every output has a visible definition</h3>
              </div>
              <button onClick={() => setShowFormulas(v => !v)} className="text-xs font-mono text-amber-400">{showFormulas ? 'Hide formulas' : 'Show formulas'}</button>
            </div>
            {showFormulas && (
              <div className="mt-5 grid md:grid-cols-2 gap-3 text-xs">
                {[
                  ['Clicks', 'Media spend ÷ CPC'],
                  ['Attributed customers', 'Clicks × customer CVR'],
                  ['Incremental customers', 'Attributed customers × incrementality'],
                  ['Fully-loaded CAC', '(Media + fixed acquisition costs) ÷ incremental customers'],
                  ['Net revenue / order', 'AOV × (1 − refund rate)'],
                  ['Contribution / order', 'Net revenue × (gross margin − extra variable cost rate)'],
                  ['Contribution LTV PV', 'Σ monthly contribution × survival ÷ discount factor'],
                  ['Marketing ROI', '(cohort contribution PV − acquisition cost) ÷ acquisition cost'],
                  ['Payback', 'Cumulative discounted contribution crossing fully-loaded CAC, interpolated within month'],
                  ['iROAS', 'Incremental net revenue ÷ media spend'],
                ].map(([name, formula]) => (
                  <div key={name} className="rounded-lg border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-900/40 dark:bg-neutral-900/40 light:bg-white p-3">
                    <strong className="block text-neutral-200 dark:text-neutral-200 light:text-neutral-900">{name}</strong>
                    <span className="mt-1 block font-mono text-neutral-500">{formula}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 p-5 bg-neutral-950/30 dark:bg-neutral-950/30 light:bg-neutral-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-amber-400">Model diagnostics</span>
            </div>
            <div className="mt-4 space-y-3">
              {metrics.warnings.map((warning, index) => (
                <div key={index} className="flex items-start gap-2 text-xs leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-700">
                  <Info className="w-3.5 h-3.5 mt-0.5 text-neutral-500 shrink-0" />
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 flex items-start gap-3">
          <Info className="w-4 h-4 mt-0.5 text-sky-400 shrink-0" />
          <p className="text-xs leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-700">
            <strong className="text-neutral-200 dark:text-neutral-200 light:text-neutral-900">Interpretation:</strong> this is a decision model, not an attribution system. For investment-grade use, supply incrementality from experiments or credible causal inference, observed cohort retention, and Finance-reconciled contribution margins.
          </p>
        </section>
      </div>
    </div>
  );
};
