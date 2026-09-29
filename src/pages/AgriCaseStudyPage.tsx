import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BarChart3, CircleDollarSign, ShieldCheck, Wheat } from 'lucide-react';
import './AgriCaseStudyPage.css';

const sources=[
  {
    label:'Olam Group Annual Report 2025',
    url:'https://www.olamgroup.com/content/dam/olamgroup/investor-relations/ir-library/annual-reports/annual-reports-pdfs/2025/olam_annual_report_2025.pdf',
    note:'Olam Agri 2025 volume, revenue, EBIT and invested-capital performance.'
  },
  {
    label:'Olam Group 2025 Management Discussion & Analysis',
    url:'https://www.olamgroup.com/content/dam/olamgroup/investor-relations/ir-library/financial-results/financial-results-pdfs/2025/h2-2025-results/27feb2026_h2_2025_results_management_discussion_and_analysis.pdf',
    note:'Food & Feed Processing & Value-added EBIT, EBIT/MT, invested capital and working capital.'
  },
  {
    label:'Olam Agri Nigeria',
    url:'https://www.olamagri.com/locations/nigeria',
    note:'Nigeria wheat milling, pasta, customer and route-to-market footprint.'
  },
  {
    label:'Crown Thick Spaghetti launch',
    url:'https://www.olamagri.com/news/press-release/olam-agri-introduces-crown-thick-spaghetti-a-delicious-new-twist-on-a-classic-favorite',
    note:'Consumer trials, distributor/retailer involvement and local product innovation.'
  },
  {
    label:'World Bank — Nigeria',
    url:'https://www.worldbank.org/ext/en/country/nigeria',
    note:'2026 household-income and food-inflation context.'
  },
  {
    label:'USDA FAS — Nigeria Grain & Feed Annual 2025',
    url:'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Grain+and+Feed+Annual_Lagos_Nigeria_NI2025-0003',
    note:'Nigeria 2025/26 wheat production and import estimates.'
  }
];

const challengeRows=[
  {
    problem:'Volume growth did not translate into earnings growth',
    evidence:'Olam Agri sales volume reached 53.7m MT in 2025, up 19.1%, while revenue rose 12.7% to S$37.4bn and EBIT fell 9.2% to S$923.5m.',
    diagnosis:'The commercial problem is not simply “sell more”. Value per tonne, mix, commodity margins, working capital and channel economics matter.',
    tool:'Profitable-share index, EBIT/MT, scenario bridge, root-cause ranking and value-gap allocation.',
    executive:'Stop rewarding volume in isolation. Reallocate growth toward contribution-positive products, channels and customers and require EBIT/MT plus EBIT/IC as growth guardrails.'
  },
  {
    problem:'Nigeria affordability and price-pass-through risk',
    evidence:'The World Bank reports Nigeria food inflation at 20.3% in July 2026. Olam also disclosed that Naira depreciation affected sales of wheat flour, pasta and animal feed in Nigeria in 2024.',
    diagnosis:'Input-cost inflation and FX can force price increases into a consumer base with limited purchasing-power headroom.',
    tool:'FX, commodity, freight, affordability, elasticity and price-index controls with dynamic advisory.',
    executive:'Use price-pack architecture, selective pass-through and elasticity tests. Do not assume margin can be protected by list-price increases alone.'
  },
  {
    problem:'High structural dependence on imported wheat in the market',
    evidence:'USDA FAS estimated Nigeria 2025/26 wheat production at 135,000 MT and imports at 6.1m MT.',
    diagnosis:'Imported input economics expose wheat-based businesses to FX, commodity and freight shocks. Marketing cannot solve a structural landed-cost disadvantage.',
    tool:'Imported-cost index, local/import sourcing mix, FX sensitivity, correlated risk simulation and sourcing advisory.',
    executive:'Treat FX exposure first as procurement, treasury and sourcing policy. Expand local sourcing only where delivered cost, quality and continuity work economically.'
  },
  {
    problem:'Demand creation is useless without route-to-market conversion',
    evidence:'Olam Agri states that its Nigeria grains business sells flour and pasta through bakers, wholesalers, distributors and retailers. Its 2025 Crown Thick Spaghetti launch explicitly involved distributors and retailers and cited consumer trials.',
    diagnosis:'Brand interest must convert through availability, fill rate, weighted distribution and channel economics.',
    tool:'Distribution, availability, fill-rate and service controls tied directly to volume, revenue and working-capital effects.',
    executive:'When brand demand is adequate but availability is weak, move marginal budget from reach to distribution and service before buying more media.'
  },
  {
    problem:'Better economics can come from mix and processing quality rather than more volume',
    evidence:'Food & Feed Processing & Value-added 2025 volume fell 8.2% and revenue fell 9.3%, yet EBIT rose to S$610.5m and EBIT/MT increased from S$115 to S$127.',
    diagnosis:'The higher-value question is which tonnes, customers and products earn the best risk-adjusted return.',
    tool:'Portfolio rules, EBIT/MT, EBIT/IC, scenario comparison and sensitivity ranking.',
    executive:'Prioritize value-added mix, selective premiumization and customer economics instead of treating all tonnes as equal.'
  }
];

export const AgriCaseStudyPage:React.FC=()=>(
  <div className="agri-case-page">
    <div className="agri-case-shell">
      <Link to="/tools/agri-commercial-intelligence-engine" className="agri-case-back">
        <ArrowLeft/> Back to the engine
      </Link>

      <header className="agri-case-hero">
        <div>
          <span>Public-data case study · Nigeria · wheat milling & pasta</span>
          <h1>How an agribusiness can turn volume growth into higher-quality commercial value</h1>
          <p>
            A source-backed case study using Olam Agri and Crown Flour Mill as the real-world reference.
            It demonstrates how the engine can diagnose where marketing is the right intervention — and where pricing,
            sourcing, distribution, working capital or operations should take priority instead.
          </p>
        </div>
        <div className="agri-case-badge">
          <Wheat/>
          <strong>Olam Agri / Crown Flour Mill</strong>
          <span>Nigeria commercial decision case</span>
          <small>Public information only. No internal company data is assumed.</small>
        </div>
      </header>

      <section className="agri-case-stat-grid">
        <article><span>2025 sales volume</span><strong>53.7m MT</strong><em>+19.1% YoY</em></article>
        <article><span>2025 revenue</span><strong>S$37.4bn</strong><em>+12.7% YoY</em></article>
        <article><span>2025 EBIT</span><strong>S$923.5m</strong><em>−9.2% YoY</em></article>
        <article><span>Invested capital</span><strong>S$7.5bn</strong><em>+11.0% YoY</em></article>
      </section>

      <section className="agri-case-panel">
        <div className="agri-case-heading">
          <span>Case thesis</span>
          <h2>The real problem is commercial value quality, not lack of demand alone</h2>
        </div>
        <p>
          Olam Agri's 2025 public results show why an agribusiness commercial system cannot optimize volume,
          market share or revenue independently. Volume expanded strongly, yet EBIT declined. At the same time,
          the Processing & Value-added segment demonstrated the opposite pattern: lower volume and revenue,
          but higher EBIT and EBIT per tonne. The executive question is therefore where each additional tonne,
          price point, channel investment and working-capital unit creates the highest economic return.
        </p>
      </section>

      <section className="agri-case-panel">
        <div className="agri-case-heading">
          <span>Problem → engine → decision</span>
          <h2>Five practical problems the tool is designed to solve</h2>
        </div>
        <div className="agri-case-problems">
          {challengeRows.map((row,index)=><article key={row.problem}>
            <div className="agri-case-number">0{index+1}</div>
            <div>
              <h3>{row.problem}</h3>
              <p><b>Public evidence</b>{row.evidence}</p>
              <p><b>Commercial diagnosis</b>{row.diagnosis}</p>
              <p><b>How the tool helps</b>{row.tool}</p>
              <p><b>Executive action</b>{row.executive}</p>
            </div>
          </article>)}
        </div>
      </section>

      <section className="agri-case-panel">
        <div className="agri-case-heading">
          <span>Financial implications</span>
          <h2>Arithmetic sensitivities that convert strategy into balance-sheet relevance</h2>
        </div>
        <div className="agri-case-table-wrap">
          <table>
            <thead><tr><th>Management lever</th><th>Public reference base</th><th>Arithmetic implication</th><th>How to use it</th></tr></thead>
            <tbody>
              <tr>
                <td>+10 bps EBIT margin</td>
                <td>S$37.4bn 2025 Olam Agri revenue</td>
                <td><strong>≈ S$37.4m EBIT</strong></td>
                <td>Use as a scale reference for pricing, mix, trade-spend or cost interventions. It is not a forecast.</td>
              </tr>
              <tr>
                <td>+25 bps EBIT margin</td>
                <td>S$37.4bn revenue</td>
                <td><strong>≈ S$93.5m EBIT</strong></td>
                <td>Compare the potential benefit against implementation cost and downside risk.</td>
              </tr>
              <tr>
                <td>+50 bps EBIT margin</td>
                <td>S$37.4bn revenue</td>
                <td><strong>≈ S$187.0m EBIT</strong></td>
                <td>Shows why small margin improvements matter at enterprise scale.</td>
              </tr>
              <tr>
                <td>5% processing working-capital reduction</td>
                <td>S$1.087bn 2025 processing working capital</td>
                <td><strong>≈ S$54.4m cash release</strong></td>
                <td>Use to assess inventory, receivables, replenishment and distributor-credit programs.</td>
              </tr>
              <tr>
                <td>10% processing working-capital reduction</td>
                <td>S$1.087bn working capital</td>
                <td><strong>≈ S$108.7m cash release</strong></td>
                <td>Highlights why channel growth must be evaluated with cash conversion, not shipment revenue alone.</td>
              </tr>
              <tr>
                <td>Processing value quality</td>
                <td>2025 EBIT/MT S$127 vs S$115 in 2024</td>
                <td><strong>+S$12/MT</strong></td>
                <td>Use EBIT/MT as a guardrail when deciding where to push volume, mix and capacity.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="agri-case-boundary">All calculations above are direct arithmetic sensitivities from public figures. They are not estimates of what Olam Agri will actually earn from a specific intervention.</p>
      </section>

      <section className="agri-case-panel">
        <div className="agri-case-heading">
          <span>Executive operating playbook</span>
          <h2>How the engine would be used in a real management cycle</h2>
        </div>
        <div className="agri-case-playbook">
          <article><b>1</b><div><strong>Load verified business data</strong><p>Revenue, volume, net price, trade spend, route-to-market coverage, inventory, receivables, capacity and sourcing mix by country, channel and SKU.</p></div></article>
          <article><b>2</b><div><strong>Reconcile the financial baseline</strong><p>The model should first reproduce reported revenue, EBIT, working capital and invested capital before any scenario is trusted.</p></div></article>
          <article><b>3</b><div><strong>Run Nigeria-specific stress states</strong><p>Test FX depreciation, wheat-cost shocks, food inflation, affordability pressure, route-to-market gaps and working-capital stress together rather than independently.</p></div></article>
          <article><b>4</b><div><strong>Separate controllable from structural causes</strong><p>Determine whether the highest-value intervention is marketing, pricing, distribution, sourcing, operations or finance.</p></div></article>
          <article><b>5</b><div><strong>Use sensitivity and decision thresholds</strong><p>Require robust recommendations across ±5%, ±10% and ±20% perturbations before allocating material capital or commercial budget.</p></div></article>
          <article><b>6</b><div><strong>Act with falsifiers</strong><p>Every recommendation should specify what new evidence would invalidate it so management can change course quickly.</p></div></article>
        </div>
      </section>

      <section className="agri-case-panel">
        <div className="agri-case-heading">
          <span>Sources</span>
          <h2>Primary evidence used in this public case</h2>
        </div>
        <div className="agri-case-sources">
          {sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer">
            <div><strong>{source.label}</strong><p>{source.note}</p></div><ArrowUpRight/>
          </a>)}
        </div>
      </section>

      <section className="agri-case-caution">
        <ShieldCheck/>
        <div>
          <strong>Evidence boundary</strong>
          <p>
            This case study combines verified public facts with transparent arithmetic and modeled decision logic.
            It does not claim access to Olam Agri's internal prices, elasticities, customer profitability, hedge book,
            route economics or SKU-level financials. Those inputs are required before using the engine for live company decisions.
          </p>
        </div>
      </section>

      <Link to="/tools/agri-commercial-intelligence-engine" className="agri-case-cta">
        Open the decision engine <ArrowUpRight/>
      </Link>
    </div>
  </div>
);
