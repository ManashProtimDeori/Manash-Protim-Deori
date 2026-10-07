/** Constant-2026 USD template; deliberately not company or country economics. */
export interface GlobalScenario { id: string; name: string; volume: number; growth: number; cost: number; price: number; fixed: number; days: number; rate: number; capacity: number; mechanism: string }
export interface GlobalMode { id: string; name: string; capex: number; fixed: number; capacity: number; cost: number; price: number; orders: number; dso: number; dio: number; dpo: number }
export interface GlobalCashRow { year: number; volume: number; revenue: number; variableCost: number; EBITDA: number; depreciation: number; EBIT: number; tax: number; capex: number; AR: number; inventory: number; AP: number; workingCapital: number; deltaWorkingCapital: number; closeout: number; freeCash: number; pvCash: number; cumulativeCash: number }
export function calculateGlobalCash(mode: GlobalMode, scenario: GlobalScenario) {
  let cumulative = -0.6 * mode.capex, peakFunding = -cumulative, previousWC = 0, losses = 0;
  const cohorts = [{ start: 1, value: mode.capex }];
  const rows: GlobalCashRow[] = [];
  for (let t = 1; t <= 25; t++) {
    const growth = (1 + scenario.growth) ** Math.min(t - 1, 9) * (1 + scenario.growth / 2) ** Math.max(0, t - 10);
    const volume = Math.min(mode.orders * scenario.volume * growth * [0.5, 0.8, 1][Math.min(t - 1, 2)], mode.capacity * scenario.capacity);
    const revenue = volume * mode.price * scenario.price / 1e6;
    const variableCost = volume * mode.cost * scenario.cost / 1e6;
    const EBITDA = revenue - variableCost - mode.fixed * scenario.fixed;
    let capex = t === 1 ? 0.4 * mode.capex : 0;
    if (t === 11 || t === 21) { capex += 0.7 * mode.capex; cohorts.push({ start: t, value: 0.7 * mode.capex }); }
    capex += 0.02 * mode.capex; cohorts.push({ start: t, value: 0.02 * mode.capex });
    const depreciation = cohorts.filter(c => c.start <= t && t < c.start + 10).reduce((v, c) => v + c.value / 10, 0);
    const EBIT = EBITDA - depreciation;
    let tax = 0;
    if (EBIT < 0) losses -= EBIT;
    else { const used = Math.min(losses, EBIT); losses -= used; tax = (EBIT - used) * 0.25; }
    const AR = revenue * 0.8 * (mode.dso + scenario.days) / 365;
    const inventory = variableCost * (mode.dio + scenario.days) / 365;
    const AP = variableCost * 0.8 * mode.dpo / 365;
    const workingCapital = AR + inventory - AP;
    const deltaWorkingCapital = workingCapital - previousWC; previousWC = workingCapital;
    const closeout = t === 25 ? 0.9 * workingCapital : 0;
    const freeCash = EBIT - tax + depreciation - capex - deltaWorkingCapital + closeout;
    const pvCash = freeCash / (1 + scenario.rate) ** t;
    cumulative += freeCash; peakFunding = Math.max(peakFunding, -cumulative);
    rows.push({ year: 2026 + t, volume, revenue, variableCost, EBITDA, depreciation, EBIT, tax, capex, AR, inventory, AP, workingCapital, deltaWorkingCapital, closeout, freeCash, pvCash, cumulativeCash: cumulative });
  }
  return { rows, npv: -0.6 * mode.capex + rows.reduce((v, r) => v + r.pvCash, 0), peakFunding };
}
