import React, { useState, useMemo } from 'react';
import { Calculator, Copy, Check, RefreshCw } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  // Inputs
  const [monthlySpend, setMonthlySpend] = useState<number>(25000);
  const [cpc, setCpc] = useState<number>(2.40);
  const [convRate, setConvRate] = useState<number>(2.5); // %
  const [aov, setAov] = useState<number>(140);
  const [grossMargin, setGrossMargin] = useState<number>(65); // %
  const [monthlyChurn, setMonthlyChurn] = useState<number>(6); // %
  const [copied, setCopied] = useState(false);

  // Calculations
  const metrics = useMemo(() => {
    const clicks = cpc > 0 ? monthlySpend / cpc : 0;
    const customers = clicks * (convRate / 100);
    const cac = customers > 0 ? monthlySpend / customers : 0;
    
    // Average lifespan in months = 1 / (churn rate)
    const lifespanMonths = monthlyChurn > 0 ? 1 / (monthlyChurn / 100) : 1;
    const ltv = aov * (grossMargin / 100) * lifespanMonths;
    const ltvCacRatio = cac > 0 ? ltv / cac : 0;

    // Monthly gross profit contribution per customer = aov * (grossMargin / 100)
    const monthlyContribution = aov * (grossMargin / 100);
    // Payback period (months) = cac / monthlyContribution
    const paybackMonths = monthlyContribution > 0 ? cac / monthlyContribution : 0;

    const netImmediateMargin = (customers * aov * (grossMargin / 100)) - monthlySpend;

    return {
      clicks: Math.round(clicks),
      customers: Math.round(customers),
      cac: cac.toFixed(2),
      ltv: ltv.toFixed(2),
      ltvCacRatio: ltvCacRatio.toFixed(2),
      paybackMonths: paybackMonths.toFixed(1),
      netImmediateMargin: Math.round(netImmediateMargin),
    };
  }, [monthlySpend, cpc, convRate, aov, grossMargin, monthlyChurn]);

  // Sensitivity Matrix (CAC variation vs Churn variation)
  const sensitivityData = useMemo(() => {
    const cacMultipliers = [0.8, 0.9, 1.0, 1.1, 1.2];
    const churnDeltas = [-2, -1, 0, 1, 2];

    const currentCac = parseFloat(metrics.cac) || 96;

    return churnDeltas.map(churnDelta => {
      const effChurn = Math.max(1, monthlyChurn + churnDelta);
      const lifespan = 1 / (effChurn / 100);
      const rowLtv = aov * (grossMargin / 100) * lifespan;

      return {
        churn: effChurn,
        cols: cacMultipliers.map(mult => {
          const testCac = currentCac * mult;
          const ratio = testCac > 0 ? rowLtv / testCac : 0;
          return {
            cac: Math.round(testCac),
            ratio: ratio.toFixed(1),
            isHealthy: ratio >= 3.0,
            isMarginal: ratio >= 2.0 && ratio < 3.0,
          };
        })
      };
    });
  }, [monthlySpend, cpc, convRate, aov, grossMargin, monthlyChurn, metrics.cac]);

  const handleCopySummary = () => {
    const summary = `--- Campaign Unit Economics Summary ---
Monthly Spend: $${monthlySpend.toLocaleString()}
Acquisition Cost (Paid CAC): $${metrics.cac}
Customer LTV: $${metrics.ltv}
LTV:CAC Ratio: ${metrics.ltvCacRatio}x
Cash Payback Period: ${metrics.paybackMonths} Months
Estimated Monthly Customers: ${metrics.customers}
Calculated via Manash Protim Deori Digital HQ`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setMonthlySpend(25000);
    setCpc(2.40);
    setConvRate(2.5);
    setAov(140);
    setGrossMargin(65);
    setMonthlyChurn(6);
  };

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 md:p-8 dark:border-neutral-800 dark:bg-neutral-900/60 light:border-neutral-300 light:bg-white text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold tracking-tight">Campaign ROI & Unit Economics Engine</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Dynamic unit economics simulation stress-testing CAC against cohort payback and churn horizons.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Summary Copied' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* Input Sliders & Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200">
        
        {/* Monthly Ad Spend */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <label className="text-neutral-400">Monthly Ad Budget</label>
            <span className="font-semibold text-neutral-200">${monthlySpend.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={1000}
            max={200000}
            step={1000}
            value={monthlySpend}
            onChange={e => setMonthlySpend(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>

        {/* CPC */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <label className="text-neutral-400">Cost Per Click (CPC)</label>
            <span className="font-semibold text-neutral-200">${cpc.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={0.20}
            max={15.00}
            step={0.10}
            value={cpc}
            onChange={e => setCpc(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>

        {/* Conversion Rate */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <label className="text-neutral-400">Conversion Rate</label>
            <span className="font-semibold text-neutral-200">{convRate.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={10.0}
            step={0.1}
            value={convRate}
            onChange={e => setConvRate(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>

        {/* Average Order Value */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <label className="text-neutral-400">Average Order Value (AOV)</label>
            <span className="font-semibold text-neutral-200">${aov}</span>
          </div>
          <input
            type="range"
            min={20}
            max={1000}
            step={10}
            value={aov}
            onChange={e => setAov(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>

        {/* Gross Margin % */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <label className="text-neutral-400">Gross Margin %</label>
            <span className="font-semibold text-neutral-200">{grossMargin}%</span>
          </div>
          <input
            type="range"
            min={20}
            max={95}
            step={5}
            value={grossMargin}
            onChange={e => setGrossMargin(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>

        {/* Monthly Churn % */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <label className="text-neutral-400">Monthly Churn %</label>
            <span className="font-semibold text-neutral-200">{monthlyChurn}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={25}
            step={1}
            value={monthlyChurn}
            onChange={e => setMonthlyChurn(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>
      </div>

      {/* KPI Display Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
        
        <div className="p-4 rounded-lg bg-neutral-950/60 dark:bg-neutral-950/60 light:bg-neutral-100 border border-neutral-800/80">
          <span className="text-xs font-mono text-neutral-400 block mb-1">Paid CAC</span>
          <span className="text-2xl font-mono font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            ${metrics.cac}
          </span>
          <span className="text-[11px] text-neutral-500 block mt-1">Cost to acquire customer</span>
        </div>

        <div className="p-4 rounded-lg bg-neutral-950/60 dark:bg-neutral-950/60 light:bg-neutral-100 border border-neutral-800/80">
          <span className="text-xs font-mono text-neutral-400 block mb-1">Customer LTV</span>
          <span className="text-2xl font-mono font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            ${metrics.ltv}
          </span>
          <span className="text-[11px] text-neutral-500 block mt-1">Margin-adjusted lifetime</span>
        </div>

        <div className="p-4 rounded-lg bg-neutral-950/60 dark:bg-neutral-950/60 light:bg-neutral-100 border border-neutral-800/80">
          <span className="text-xs font-mono text-neutral-400 block mb-1">LTV : CAC Ratio</span>
          <span className={`text-2xl font-mono font-bold ${
            Number(metrics.ltvCacRatio) >= 3.0 ? 'text-emerald-400' : Number(metrics.ltvCacRatio) >= 2.0 ? 'text-amber-400' : 'text-rose-400'
          }`}>
            {metrics.ltvCacRatio}x
          </span>
          <span className="text-[11px] text-neutral-500 block mt-1">Target benchmark: ≥ 3.0x</span>
        </div>

        <div className="p-4 rounded-lg bg-neutral-950/60 dark:bg-neutral-950/60 light:bg-neutral-100 border border-neutral-800/80">
          <span className="text-xs font-mono text-neutral-400 block mb-1">Cash Payback</span>
          <span className="text-2xl font-mono font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            {metrics.paybackMonths} Mo
          </span>
          <span className="text-[11px] text-neutral-500 block mt-1">Time to recover spend</span>
        </div>
      </div>

      {/* 5x5 Stress-Test Sensitivity Matrix */}
      <div className="mt-4 pt-6 border-t border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            LTV:CAC Sensitivity Matrix (CAC vs Monthly Churn)
          </h4>
          <span className="text-[11px] font-mono text-neutral-500">Green ≥ 3.0x · Amber ≥ 2.0x · Red &lt; 2.0x</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400">
                <th className="py-2 text-left font-normal">Churn Rate</th>
                <th className="py-2 text-center font-normal">-20% CAC</th>
                <th className="py-2 text-center font-normal">-10% CAC</th>
                <th className="py-2 text-center font-normal font-semibold text-neutral-200">Baseline CAC</th>
                <th className="py-2 text-center font-normal">+10% CAC</th>
                <th className="py-2 text-center font-normal">+20% CAC</th>
              </tr>
            </thead>
            <tbody>
              {sensitivityData.map((row, idx) => (
                <tr key={idx} className="border-b border-neutral-800/50">
                  <td className="py-2.5 font-semibold text-neutral-300">
                    {row.churn}% {row.churn === monthlyChurn && '(Current)'}
                  </td>
                  {row.cols.map((col, cIdx) => (
                    <td key={cIdx} className="py-2.5 text-center">
                      <span className={`px-2 py-1 rounded ${
                        col.isHealthy 
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' 
                          : col.isMarginal 
                            ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40' 
                            : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                      }`}>
                        {col.ratio}x
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
