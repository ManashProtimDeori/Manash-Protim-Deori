import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Boxes,
  CircleDollarSign,
  Gauge,
  Network,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  TrendingUp,
  Wheat,
} from 'lucide-react';
import './AgriCaseStudyPage.css';

const sources=[
  {
    label:'Olam Group Annual Report 2025',
    url:'https://www.olamgroup.com/content/dam/olamgroup/investor-relations/ir-library/annual-reports/annual-reports-pdfs/2025/olam_annual_report_2025.pdf',
    note:'Olam Agri 2025 volume, revenue, EBIT, EBIT/MT, invested-capital and segment performance'
  },
  {
    label:'Olam Group 2025 Management Discussion & Analysis',
    url:'https://www.olamgroup.com/content/dam/olamgroup/investor-relations/ir-library/financial-results/financial-results-pdfs/2025/h2-2025-results/27feb2026_h2_2025_results_management_discussion_and_analysis.pdf',
    note:'Food & Feed Processing & Value-added EBIT, EBIT/MT, invested capital and working capital'
  },
  {
    label:'Olam Agri Nigeria',
    url:'https://www.olamagri.com/locations/nigeria',
    note:'Nigeria operating footprint, wheat milling, pasta, customer channels, local sourcing and Bakewell customer platform'
  },
  {
    label:'Crown Flour Mill 15-year anniversary',
    url:'https://www.olamagri.com/news/press-release/olam-agri-celebrates-fifteenth-anniversary-of-crown-flour-mill-acquisition',
    note:'Nine-plant wheat milling and pasta footprint in Nigeria and the role of freight and global sourcing capabilities'
  },
  {
    label:'Crown Thick Spaghetti launch',
    url:'https://www.olamagri.com/news/press-release/olam-agri-introduces-crown-thick-spaghetti-a-delicious-new-twist-on-a-classic-favorite',
    note:'Consumer trials, distributor and retailer engagement, product innovation and affordability positioning'
  },
  {
    label:'World Bank — Nigeria',
    url:'https://www.worldbank.org/ext/en/country/nigeria',
    note:'2026 inflation, food inflation, poverty and purchasing-power context'
  },
  {
    label:'USDA FAS — Nigeria Grain & Feed Annual 2026',
    url:'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Grain+and+Feed+Annual_Lagos_Nigeria_NI2026-0003',
    note:'Latest public wheat production and import estimates for Nigeria'
  },
  {
    label:'Olam Agri — Crown wheat variety',
    url:'https://www.olamagri.com/news/press-release/olam-agri-and-lake-chad-research-institute-are-proud-to-announce-the-release-of-a-heat-tolerant',
    note:'Local-wheat development, heat-tolerant Crown variety and pasta suitability'
  }
];

const challengeRows=[
  {
    icon:<TrendingUp/>,
    problem:'Scale can grow faster than economic value',
    evidence:'Olam Agri reported 53.7m MT of sales volume in 2025, up 19.1%, and revenue of S$37.4bn, up 12.7%, while EBIT declined 9.2% to S$923.5m and invested capital increased 11.0% to S$7.5bn',
    diagnosis:'The commercial question is not whether the business can move more tonnes. It is whether the incremental tonnes improve EBIT per tonne, cash conversion and return on invested capital after price, mix, commodity and channel effects',
    tool:'Control Tower · Profitable Share Index · EBIT/MT · EBIT/Invested Capital · Root-Cause Ranking',
    executive:'Use value quality as the growth gate. Do not reward volume or market share unless contribution, cash and capital returns remain inside agreed thresholds'
  },
  {
    icon:<CircleDollarSign/>,
    problem:'Affordability constrains how much cost can be passed through',
    evidence:'The World Bank reports Nigeria food inflation at 20.3% in July 2026 and continued pressure on household purchasing power. Olam Agri also describes affordability as part of the proposition for its fortified food products in Nigeria',
    diagnosis:'A price increase that protects unit margin can still destroy total contribution when consumers down-trade, reduce frequency, switch brands or move to smaller packs',
    tool:'Demand & Pricing · Food Inflation · Affordability · Net Price Index · Price Elasticity · Brand Equity',
    executive:'Test price-pack architecture before broad list-price increases. Use regional and SKU-level elasticity to decide where to pass through cost, where to resize packs and where to absorb part of the shock'
  },
  {
    icon:<Wheat/>,
    problem:'Imported wheat exposure creates a structural cost problem',
    evidence:'The latest USDA FAS Nigeria Grain & Feed Annual estimates MY2025/26 wheat production at about 130,000 MT and imports at about 6.7m MT, illustrating the market’s heavy reliance on imported wheat. Olam Agri is simultaneously investing in local-wheat development through its Crown variety and Seeds for the Future work',
    diagnosis:'FX, global wheat prices and freight can move the delivered cost base faster than marketing can change willingness to pay. This is primarily a sourcing, treasury and portfolio problem before it becomes a communications problem',
    tool:'Supply & FX · Import Dependency · Local Sourcing · FX Index · Commodity Index · Freight Index · Correlated Risk Simulation',
    executive:'Quantify landed-cost exposure first. Then combine hedge policy, procurement timing, local sourcing, product mix and selective price pass-through rather than attempting to advertise away a structural cost disadvantage'
  },
  {
    icon:<Network/>,
    problem:'Demand creation only matters when route-to-market converts it',
    evidence:'Crown Flour Mill supplies bakers, wholesalers, distributors and retailers across Nigeria. Olam Agri says the business has expanded to nine plants, while the 2025 Crown Thick Spaghetti launch included distributors, retailers and consumer trials',
    diagnosis:'Brand demand can be economically wasted if weighted distribution, fill rate, on-shelf availability, service level or distributor economics are the binding constraint',
    tool:'Demand & Pricing · Weighted Distribution · On-Shelf Availability · Fill Rate · Service Level · Working Capital',
    executive:'When consumer pull is healthy but availability is weak, shift the marginal naira from reach generation to outlet coverage, service reliability and sell-through execution'
  },
  {
    icon:<Target/>,
    problem:'Mix quality can matter more than headline volume',
    evidence:'Food & Feed Processing & Value-added sales volume fell 8.2% and revenue fell 9.3% in 2025, yet EBIT increased 1.6% to S$610.5m and EBIT/MT improved from S$115 to S$127. Invested capital fell 4.0% to S$2.409bn',
    diagnosis:'This is the opposite of the volume-growth story and shows why tonnes are not economically interchangeable. Product mix, input cover, processing economics and capital discipline can improve value even when topline contracts',
    tool:'Portfolio · EBIT/MT · EBIT/IC · Scenario Lab · Sensitivity · Value-Gap Allocation',
    executive:'Prioritise products, channels and customer cohorts that clear contribution and capital-return hurdles. Harvest or reprice low-quality volume instead of protecting it mechanically'
  }
];

const solutionSteps=[
  {
    step:'01',
    title:'Reconcile the economic baseline',
    module:'Control Tower',
    action:'Load verified revenue, volume, EBIT, working capital and invested capital for the Nigeria wheat and pasta business by SKU, channel and geography. The model must first reproduce the actual reported economics before management trusts any scenario',
    decision:'No scenario analysis until the baseline reconciles within an agreed tolerance'
  },
  {
    step:'02',
    title:'Separate value growth from volume growth',
    module:'Control Tower + Portfolio',
    action:'Track EBIT/MT, EBIT margin, working-capital intensity and EBIT/IC alongside tonnes and revenue. Identify products or channels where volume rises while value quality falls',
    decision:'Scale only the volume that improves contribution and capital efficiency'
  },
  {
    step:'03',
    title:'Build the Nigeria external-risk state',
    module:'Supply & FX',
    action:'Update FX, wheat/commodity cost, freight, import dependency, local delivered cost and local sourcing assumptions. Keep market variables distinct from management-controllable variables',
    decision:'Decide what must be hedged, sourced differently, repriced or simply monitored'
  },
  {
    step:'04',
    title:'Stress affordability before pricing',
    module:'Demand & Pricing',
    action:'Combine food inflation, affordability, price index, brand equity and SKU elasticity. Test whether a proposed price increase improves total EBIT after the expected volume response',
    decision:'Choose selective pass-through, pack resizing, targeted promotion or price hold by SKU and region'
  },
  {
    step:'05',
    title:'Diagnose route-to-market leakage',
    module:'Demand & Pricing + Working Capital',
    action:'Compare numeric distribution, weighted distribution, on-shelf availability, fill rate, service level, distributor inventory and receivable days. Distinguish lack of demand from failure to convert demand',
    decision:'Move budget from media to distribution or service when the physical route is the binding constraint'
  },
  {
    step:'06',
    title:'Test promotion and marketing incrementality',
    module:'Demand & Pricing',
    action:'Evaluate trade-spend intensity, promotion incrementality, cannibalisation and marketing spend together. Use controlled tests or holdouts wherever possible to calibrate actual incrementality',
    decision:'Stop broad promotions that mainly subsidise existing buyers or forward purchases'
  },
  {
    step:'07',
    title:'Protect cash while expanding channels',
    module:'Working Capital',
    action:'Stress DSO, DIO, DPO and bad-debt rates for proposed distributor expansion. Quantify the cash consumed by growth before approving the commercial plan',
    decision:'Require channel growth to clear both EBIT and cash-conversion thresholds'
  },
  {
    step:'08',
    title:'Run compound scenarios, not single-variable stories',
    module:'Scenario Lab + Risk Simulation',
    action:'Test combinations such as FX depreciation + wheat inflation + affordability decline, or distribution expansion + higher inventory + weaker collections. Compare P10, P50 and P90 outcomes',
    decision:'Reject strategies that look attractive only in the base case'
  },
  {
    step:'09',
    title:'Use three-scale sensitivity to find robust levers',
    module:'Sensitivity + Relationships',
    action:'Run ±5%, ±10% and ±20% perturbations. Focus management attention on variables that remain important across all three scales rather than variables that matter only under one narrow assumption',
    decision:'Prioritise levers with stable economic impact and high controllability'
  },
  {
    step:'10',
    title:'Translate the model into a governed 90-day action cycle',
    module:'Advisory + Board Room',
    action:'Assign each intervention an owner, financial target, leading indicator, risk limit and falsifier. Review weekly operating signals and monthly economics, then change course when the evidence invalidates the original hypothesis',
    decision:'Treat every recommendation as a testable management hypothesis, not a permanent truth'
  }
];

export const AgriCaseStudyPage:React.FC=()=>(
  <div className="agri-case-page">
    <div className="agri-case-shell">
      <Link to="/tools/agri-commercial-intelligence-engine" className="agri-case-back">
        <ArrowLeft/> Back to the engine
      </Link>

      <section className="agri-case-hero">
        <div className="agri-case-hero-copy">
          <span>Public-data case study · Nigeria · wheat milling & pasta</span>
          <h1>From volume growth to higher-quality commercial value</h1>
          <p>
            A source-backed executive case using Olam Agri and Crown Flour Mill as the real-world reference.
            The case is not built around the claim that the company has a single “marketing problem”.
            It is built around a harder management question: when volume, price, input cost, affordability,
            distribution, working capital and capacity move at the same time, which commercial action actually creates value?
          </p>
        </div>
        <aside className="agri-case-badge">
          <Wheat/>
          <strong>Olam Agri / Crown Flour Mill</strong>
          <span>Nigeria wheat milling & pasta decision case</span>
          <small>Public information only · no internal company data assumed</small>
        </aside>
      </section>

      <section className="agri-case-stat-grid">
        <article><span>Olam Agri 2025 volume</span><strong>53.7m MT</strong><em>+19.1% YoY</em></article>
        <article><span>Olam Agri 2025 revenue</span><strong>S$37.4bn</strong><em>+12.7% YoY</em></article>
        <article><span>Olam Agri 2025 EBIT</span><strong>S$923.5m</strong><em>−9.2% YoY</em></article>
        <article><span>Olam Agri invested capital</span><strong>S$7.5bn</strong><em>+11.0% YoY</em></article>
      </section>

      <section className="agri-case-panel agri-case-story">
        <div className="agri-case-heading">
          <span>Case storyline</span>
          <h2>The strategic tension begins with a paradox</h2>
        </div>
        <div className="agri-case-story-grid">
          <div className="agri-case-story-copy">
            <p>
              Crown Flour Mill sits inside one of the most strategically important food categories in Nigeria.
              Olam Agri describes the business as a leading wheat milling and pasta platform supplying bakers,
              wholesalers, distributors and retailers. By 2025 the business had expanded from two manufacturing plants
              at the time of acquisition in 2010 to nine plants across Nigeria, supported by freight and global sourcing capabilities.
            </p>
            <p>
              That scale creates an attractive growth platform, but it also makes the commercial system exposed to several
              interacting variables. Wheat is a globally traded input, the Nigerian consumer is highly sensitive to food affordability,
              distribution execution determines whether brand demand converts into purchase, and channel expansion can consume cash
              through inventory and receivables. A marketing decision therefore cannot be separated from procurement, pricing,
              operations and finance.
            </p>
            <p>
              The 2025 Olam Agri results make the management challenge visible. Sales volume rose 19.1% to 53.7m MT and revenue
              rose 12.7% to S$37.4bn, but EBIT declined 9.2% to S$923.5m and invested capital increased 11.0% to S$7.5bn.
              Public reporting attributes the EBIT decline mainly to weaker commodity margins and lower contributions from
              origination and merchandising activities, while wheat milling and pasta were among the businesses that improved.
              The lesson is not that volume growth failed everywhere; it is that volume is an incomplete measure of commercial quality.
            </p>
            <p>
              The Processing & Value-added segment provides the counter-example. In 2025 its volume fell 8.2% and revenue fell 9.3%,
              yet EBIT increased to S$610.5m and EBIT per tonne rose from S$115 to S$127. Invested capital declined to S$2.409bn.
              Olam’s management discussion specifically notes a stable naira, supportive consumption, effective input-cost cover and
              declining input prices as tailwinds for Nigeria wheat milling and pasta. This is exactly why an executive tool must model
              price, cost, mix, capital and demand together rather than score success by topline alone.
            </p>
          </div>
          <div className="agri-case-context-rail">
            <div><span>Commercial scale</span><strong>9 plants</strong><p>Publicly reported Nigeria wheat milling and pasta footprint by 2025</p></div>
            <div><span>Processing value quality</span><strong>S$127/MT</strong><p>2025 Food & Feed Processing & Value-added EBIT/MT, up from S$115</p></div>
            <div><span>Processing working capital</span><strong>S$1.087bn</strong><p>Down from S$1.166bn in 2024</p></div>
            <div><span>Current consumer context</span><strong>20.3%</strong><p>Nigeria food inflation in July 2026 according to the World Bank</p></div>
          </div>
        </div>
      </section>

      <section className="agri-case-panel">
        <div className="agri-case-heading">
          <span>Industry structure</span>
          <h2>Why the Nigeria wheat system makes the decision unusually difficult</h2>
        </div>
        <div className="agri-case-industry-grid">
          <article>
            <Wheat/>
            <strong>Import dependence is structural</strong>
            <p>
              USDA FAS currently estimates roughly 130,000 MT of Nigerian wheat production against about 6.7m MT of imports
              for MY2025/26. That gap means a domestic miller’s cost base is exposed to international wheat prices, freight,
              currency and import economics even when local demand is strong.
            </p>
          </article>
          <article>
            <CircleDollarSign/>
            <strong>Affordability can reverse a pricing decision</strong>
            <p>
              The World Bank reports that food inflation reached 20.3% in July 2026. In a pressured household budget,
              nominal price increases cannot be evaluated without pack architecture, elasticity, switching and down-trading.
            </p>
          </article>
          <article>
            <Network/>
            <strong>Distribution is part of the product proposition</strong>
            <p>
              Crown Flour Mill sells through bakers, wholesalers, distributors and retailers. The 2025 Crown Thick Spaghetti launch
              explicitly involved distributors and retailers and followed consumer trials, showing that product-market fit and
              route-to-market fit must be solved together.
            </p>
          </article>
          <article>
            <Boxes/>
            <strong>Local sourcing is a strategic hedge, not a slogan</strong>
            <p>
              Olam Agri has invested in local wheat development, including the heat-tolerant Crown durum variety designed for Nigerian
              growing conditions and tested for pasta suitability. The economic question remains whether local supply can deliver
              the required quality, volume, timing and delivered cost at scale.
            </p>
          </article>
        </div>
      </section>

      <section className="agri-case-panel">
        <div className="agri-case-heading">
          <span>Problem → engine → decision</span>
          <h2>Five commercial problems that require different executive responses</h2>
        </div>
        <div className="agri-case-problems">
          {challengeRows.map((row,index)=><article key={row.problem}>
            <div className="agri-case-number">0{index+1}</div>
            <div className="agri-case-problem-icon">{row.icon}</div>
            <div>
              <h3>{row.problem}</h3>
              <p><b>Public evidence</b>{row.evidence}</p>
              <p><b>Commercial diagnosis</b>{row.diagnosis}</p>
              <p><b>Tool modules</b>{row.tool}</p>
              <p><b>Executive response</b>{row.executive}</p>
            </div>
          </article>)}
        </div>
      </section>

      <section className="agri-tool-solution">
        <div className="agri-tool-solution-glow"/>
        <div className="agri-tool-solution-head">
          <div>
            <span>How this tool addresses the case</span>
            <h2>The engine turns one ambiguous growth problem into six decision systems</h2>
          </div>
          <Gauge/>
        </div>

        <div className="agri-tool-map">
          <article>
            <div className="agri-tool-map-icon"><BarChart3/></div>
            <div><span>01 · Value quality</span><strong>Control Tower</strong><p>Separates revenue and volume from EBIT, EBIT/MT, working capital and EBIT/IC so management can see whether growth creates or destroys economic value</p></div>
          </article>
          <article>
            <div className="agri-tool-map-icon"><SlidersHorizontal/></div>
            <div><span>02 · Price & affordability</span><strong>Demand & Pricing</strong><p>Connects price, food inflation, affordability, elasticity, brand strength, distribution and promotion quality to modeled demand and contribution</p></div>
          </article>
          <article>
            <div className="agri-tool-map-icon"><Wheat/></div>
            <div><span>03 · Landed-cost exposure</span><strong>Supply & FX</strong><p>Links FX, wheat/commodity cost, freight and local-versus-imported sourcing to the cost waterfall before management decides how much cost can be passed through</p></div>
          </article>
          <article>
            <div className="agri-tool-map-icon"><Network/></div>
            <div><span>04 · Route-to-market</span><strong>Distribution + Working Capital</strong><p>Tests whether the bottleneck is consumer demand or the ability to serve outlets without excessive inventory, receivables or service leakage</p></div>
          </article>
          <article>
            <div className="agri-tool-map-icon"><Target/></div>
            <div><span>05 · Portfolio choices</span><strong>Portfolio + Sensitivity</strong><p>Ranks the products, channels and variables that have the most robust effect on EBIT and capital returns across ±5%, ±10% and ±20% perturbations</p></div>
          </article>
          <article>
            <div className="agri-tool-map-icon"><ShieldCheck/></div>
            <div><span>06 · Decision governance</span><strong>Scenario Lab + Board Room</strong><p>Forces recommendations to carry confidence, downside scenarios, falsifiers and decision thresholds instead of presenting a single deterministic forecast as truth</p></div>
          </article>
        </div>

        <div className="agri-tool-solution-rule">
          <strong>Core decision rule</strong>
          <p>
            The tool should not answer “How do we sell more?” first. It should answer “What is the binding economic constraint,
            how controllable is it, what happens to EBIT and cash if we move it, and what evidence would prove the recommendation wrong?”
          </p>
        </div>
      </section>

      <section className="agri-case-panel">
        <div className="agri-case-heading">
          <span>Financial translation</span>
          <h2>Strategy becomes more useful when the unit economics are visible</h2>
        </div>
        <div className="agri-case-table-wrap">
          <table>
            <thead><tr><th>Management lever</th><th>Public reference base</th><th>Arithmetic implication</th><th>Executive use</th></tr></thead>
            <tbody>
              <tr>
                <td>+10 bps EBIT margin</td>
                <td>S$37.4bn Olam Agri 2025 revenue</td>
                <td><strong>≈ S$37.4m EBIT</strong></td>
                <td>Scale reference for a pricing, mix, trade-spend or cost intervention — not a forecast</td>
              </tr>
              <tr>
                <td>+25 bps EBIT margin</td>
                <td>S$37.4bn revenue</td>
                <td><strong>≈ S$93.5m EBIT</strong></td>
                <td>Compare potential value against implementation cost, execution risk and volume downside</td>
              </tr>
              <tr>
                <td>+50 bps EBIT margin</td>
                <td>S$37.4bn revenue</td>
                <td><strong>≈ S$187.0m EBIT</strong></td>
                <td>Shows why apparently small margin moves matter at enterprise scale</td>
              </tr>
              <tr>
                <td>5% processing working-capital reduction</td>
                <td>S$1.087bn 2025 processing working capital</td>
                <td><strong>≈ S$54.4m cash release</strong></td>
                <td>Reference for inventory, collections, distributor credit and replenishment initiatives</td>
              </tr>
              <tr>
                <td>10% processing working-capital reduction</td>
                <td>S$1.087bn working capital</td>
                <td><strong>≈ S$108.7m cash release</strong></td>
                <td>Demonstrates why shipment growth should never be approved without cash-conversion analysis</td>
              </tr>
              <tr>
                <td>Processing value quality</td>
                <td>EBIT/MT improved from S$115 to S$127</td>
                <td><strong>+S$12/MT</strong></td>
                <td>Use EBIT/MT as a portfolio guardrail when deciding where to push volume, mix and capacity</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="agri-case-boundary">
          These are transparent arithmetic sensitivities from public figures. They are not estimates of the profit Olam Agri
          would actually realise from a specific intervention because internal SKU economics, customer profitability, elasticities,
          hedge positions and route costs are not public.
        </p>
      </section>

      <section className="agri-case-panel agri-case-executive">
        <div className="agri-case-heading">
          <span>Executive solution</span>
          <h2>A step-by-step operating plan using the engine</h2>
        </div>
        <p className="agri-case-intro">
          The sequence matters. The tool should be used as a management operating system, not as a dashboard that produces a recommendation
          from unverified inputs. The following workflow converts the public case into a practical executive decision process.
        </p>
        <div className="agri-case-solution-steps">
          {solutionSteps.map(step=><article key={step.step}>
            <div className="agri-case-step-number">{step.step}</div>
            <div className="agri-case-step-main">
              <span>{step.module}</span>
              <h3>{step.title}</h3>
              <p>{step.action}</p>
            </div>
            <div className="agri-case-step-decision">
              <span>Decision rule</span>
              <strong>{step.decision}</strong>
            </div>
          </article>)}
        </div>
      </section>

      <section className="agri-case-panel">
        <div className="agri-case-heading">
          <span>What the public case cannot prove</span>
          <h2>Evidence discipline is part of the solution</h2>
        </div>
        <div className="agri-case-limit-grid">
          <div><strong>SKU elasticity</strong><p>Requires transaction-level price and volume history or controlled tests</p></div>
          <div><strong>Customer profitability</strong><p>Requires net price, rebates, service cost, credit cost and route economics by account</p></div>
          <div><strong>Marketing incrementality</strong><p>Requires experiments, holdouts or defensible causal measurement</p></div>
          <div><strong>Hedge effectiveness</strong><p>Requires treasury positions, contract timing and basis exposure</p></div>
          <div><strong>Local sourcing economics</strong><p>Requires quality, yield, procurement, logistics and continuity data</p></div>
          <div><strong>Capacity bottlenecks</strong><p>Requires line-level throughput, downtime, scheduling and service-loss data</p></div>
        </div>
      </section>

      <section className="agri-case-panel">
        <div className="agri-case-heading">
          <span>Primary evidence</span>
          <h2>Sources behind the public case</h2>
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
            This case study combines verified public facts, transparent arithmetic and clearly identified modeled decision logic.
            It does not claim access to Olam Agri or Crown Flour Mill internal prices, elasticities, customer profitability,
            hedge books, route economics or SKU-level financials. Those data are required before using the engine for live company decisions.
          </p>
        </div>
      </section>

      <Link to="/tools/agri-commercial-intelligence-engine" className="agri-case-cta">
        Open the decision engine <ArrowUpRight/>
      </Link>
    </div>
  </div>
);
