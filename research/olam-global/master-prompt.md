# Olam Agri: a defensible global growth strategy for the next 25 years

## Master prompt for research, modelling, deck refinement, and an executive decision system

Prepared for Manash Protim Deori on 7 October 2026. This prompt is grounded in the Olam strategy source matching the deployed portfolio commit `13f7393a1c69350c3cfa89bea1baa49cf08d042c`. It commissions a research and presentation deliverable; it is not itself an investment recommendation or a completed global forecast.

**How to use:** Paste the complete prompt below into a research and coding environment with web access, spreadsheet and statistical execution, and presentation authoring. Supply the existing deck and supporting files where available. For a context-limited environment, load this file as the controlling specification and execute its numbered stages sequentially. The final research must use sources current at execution time, rather than treating the preparation date as the forecast baseline automatically.

---

# BEGIN MASTER PROMPT

## 1. The mandate and the decision that matters

Refine and substantially extend my existing Olam Agri strategy presentation into an exceptionally rigorous global expansion and marketing strategy for the CEO of Olam Agri. Build a decision system that links customer demand, competitive positioning, agricultural supply, international trade, operating capacity, climate resilience, and capital allocation over a 25-year planning horizon.

The result must help leadership decide **where to expand, what to sell, whom to serve, how to enter, how much capital to commit, what marketing and commercial interventions to run, when to wait, and what evidence would justify changing course**. Every important conclusion must connect to a business decision and a measurable economic consequence.

The strategy must cover every country in the explicitly defined country universe. It must distinguish expansion into a new country from deepening an existing operation, opening a new trade route, acquiring customers remotely, expanding processing capacity, developing a sourcing relationship, entering a joint venture, buying a business, and launching a product. Those are different commitments with different cash, risk, and reversibility profiles.

Use the current deck as an input to improve, not as authority that cannot be challenged. Preserve sound ideas, correct weak reasoning, replace stale facts, expose assumptions, and connect the Nigeria commercial pilot to a global strategy without assuming that Nigerian mechanisms will transfer unchanged.

Treat 25 years as a horizon for conditional strategic planning and adaptive investment. Do not pretend to predict geopolitical events, weather, exchange rates, consumer preferences, or individual company earnings with pinpoint accuracy. Precision in arithmetic must coexist with honesty about uncertainty in inputs, model structure, and future regimes.

The executive proposition should be strong enough to withstand questions from the CEO, CFO, Treasury, Strategy, category leaders, procurement, traders, operations, legal, sustainability, and country management. It must also be readable by a business audience that does not have an advanced degree in econometrics.

## 2. Operating roles and standards

Work as an integrated strategic research team covering agribusiness strategy, international marketing, consumer and B2B research, agricultural economics, econometrics, climate risk, trade analysis, treasury, corporate finance, supply-chain modelling, and executive presentation design. Coordinate these disciplines around one consistent data and model spine.

Do not merely produce the voices or job titles of such a team. Perform their work: retrieve evidence, reconcile definitions, execute calculations, test models, challenge recommendations, and document limitations. Assign an accountable functional owner to each decision and each proposed internal data requirement.

Use these standards throughout:

1. Business relevance before mathematical complexity.
2. Official and primary evidence before repetition in secondary media.
3. Incremental cash and customer economics before headline volume.
4. Uncertainty distributions and stress boundaries before false point precision.
5. Causal evidence before attributing results to marketing.
6. Country-product-route-entry-mode analysis before generic country rankings.
7. Feasible execution before aspirational market size.
8. Falsifiable recommendations before persuasive storytelling.
9. Traceable computations before attractive charts.
10. Adaptive decisions before an irreversible 25-year commitment.

Use clear business language. Avoid grand claims about revolutionising economics, discovering a universal equation, or achieving perfect prediction. An exceptional result earns attention by producing better decisions, not by using dramatic terminology.

## 3. Inspect the actual starting point

Locate and inspect the current Olam deck in my portfolio:

- Portfolio: `https://manash-protim-deori.vercel.app/`
- Strategy page: `https://manash-protim-deori.vercel.app/work/olam-africa-growth-strategy`
- Repository: `https://github.com/ManashProtimDeori/Manash-Protim-Deori`
- Deck data: `src/data/olamAfricaStrategy.ts`
- Nigeria model: `src/lib/olamNigeriaDecisionModel.ts`
- Presentation page: `src/pages/OlamAfricaGrowthStrategyPage.tsx`
- Excel export logic: `src/lib/olamExcelExport.ts`
- Portfolio evidence: `src/data/resume.ts` and relevant project evidence.
- Existing validation: `tests/olam-africa-strategy.ts` and the relevant build configuration.

Verify the current deployed revision before editing. The revision inspected for this brief was `13f7393a1c69350c3cfa89bea1baa49cf08d042c`, whose deck source contained 44 ordered slide entries. A later revision may differ. If page rendering is blocked by deployment protection, use authorised source access and accurately state the difference between reviewing source content and seeing the rendered slides.

Read applicable repository instructions before changing repository files. The requested output is a refined deck and its analytical support; do not modify, deploy, publish, email, or replace the public portfolio unless that action is separately authorised. Maintain a working copy and a clear version record.

Inspect every existing slide, chart, table, footnote, calculation, narrative claim, and source link. Record for each item whether it should be retained, corrected, deepened, moved to the appendix, merged, or removed. Produce a slide audit with the original slide ID, weakness, evidence, proposed treatment, and resulting decision value.

The present source includes Nigeria semolina and edible-oil strategy, affordability and pack architecture, route availability, customer economics, marketing attribution, local supply, SALIC ownership, policy gates G0–G7, normalized economics, capital release thresholds, a scenario cube, sensitivity, a seeded stress simulation, personal contribution slides, and evidence registers. Start there. Do not replace these specifics with a generic agribusiness presentation.

## 4. Starting-model facts to preserve as assumptions, not company disclosures

The inspected Nigeria model uses these defaults. Re-read them in the actual current source and reconcile any changes:

| Input | Inspected default | Required treatment |
|---|---:|---|
| Eligible sales | NGN100bn | Normalized decision unit; not disclosed Olam Nigeria revenue |
| Contribution margin | 8% | Replace with category and customer economics |
| Availability recovery | 2% | Measure against an explicit counterfactual |
| Repeat uplift | 2% | Prevent overlap with availability recovery |
| Net price and mix | 1% | Account for discounts, substitution, and cannibalisation |
| Price/mix flow-through | 70% | Reconcile to Finance-owned contribution |
| Route savings | 0.6% of sales | Validate cost-to-serve changes |
| Service investment | 0.4% of sales | Include variable and fixed operating costs |
| Imported-input share | 45% | Replace sales-share approximation with procurement exposure |
| FX shock | 5% | Stress assumption, not an estimated forecast |
| Commodity exposure and shock | 30% and 5% | Remove overlap with FX exposure |
| Pass-through | 80% | Estimate by category, customer, and lag |
| Working-capital improvement | 7 days | Current model uses a sales-day proxy |
| Pilot and rollout capital | NGN0.6bn and NGN3.6bn | Scenario envelope; not management approval |
| Hurdle | 28% | Screening convention; not Olam WACC |
| Benefit ramp | 50%, 80%, 100% | Illustrative three-year realisation schedule |

The inspected code uses a historical Nigeria policy-rate anchor plus an explicit premium to construct its screening hurdle. A policy rate is not a project-specific borrowing rate or WACC. Replace this convention with a fully documented financing and discounting policy when internal evidence is available.

The inspected simulation uses independent uniform draws over specified ranges, with 5,000 runs and a fixed seed. Its positive-NPV frequency is a stress frequency under those assumptions, not a calibrated probability of investment success. Preserve this distinction wherever old outputs remain.

For an arithmetic audit only, the inspected defaults imply NGN0.47bn annual operating uplift, approximately NGN1.9178bn of sales-day cash release, approximately negative NGN2.0645bn three-year screening NPV, and approximately NGN1.9928bn required annual uplift at zero screening NPV. Recompute these from the code. These are **outputs of the illustrative old model**, not reported financial results, forecasts, or investment-grade valuations.

Challenge additive availability and repeat lifts, constant margins, static price pass-through, sales-based exposure, independent risk sampling, omitted taxes, omitted depreciation, upfront treatment of all capital, omitted maintenance capital, working-capital reversals, and residual-value assumptions. Convert each identified weakness into a specific repair or a clearly bounded limitation.

## 5. Establish the legal entity and strategic perimeter first

Separate Olam Agri from Olam Group, ofi, and any remaining or separately controlled businesses. Identify the legal entity, current ownership, geographic operations, product businesses, subsidiaries, and the perimeter of disclosed financial figures. Do not attribute cocoa, coffee, nuts, spices, dairy, packaged-food assets, brands, or other activities to Olam Agri without current evidence that the relevant business lies within its perimeter.

Verify the latest ownership and transaction chronology using transaction-specific issuer disclosures and relevant filings. An inspected Olam Agri About page contained conflicting SALIC percentages in different sections. The existing deck recognises this conflict. Resolve it using current transaction evidence; do not average inconsistent percentages or silently choose the number that fits the narrative.

Build an entity-perimeter table with business, country, legal entity, owner, operational role, disclosed financial perimeter, potential synergy, necessary agreement, and evidence. Mark cross-entity opportunities as conditional on commercial, legal, governance, and data permissions.

Assess SALIC-related food-security strategy as a source of possible commercial alignment and patient capital, while testing whether a project meets Olam Agri's own economics. Do not assume automatic financing, guaranteed offtake, privileged government access, or permission to pursue every strategically attractive market.

Refresh company leadership information if named. Do not invent the CEO's priorities beyond the supplied 25-year planning ambition. Identify official strategy statements and separate them from my interpretation of what leadership might value.

## 6. Define time, geography, and unit of analysis

Use a research cutoff with date, time, timezone, and data-vintage policy. At execution, set the forecast start from the latest supportable operating baseline. If the starting year is 2026, provide milestones for 2030, 2035, 2040, 2045, 2050, and 2051. Clarify whether values are calendar year, fiscal year, crop year, marketing year, or end-year snapshots.

Use annual financial periods through the full investment horizon, with monthly or quarterly operating models where data support short-term seasonality and cash analysis. Avoid presenting a distant milestone as though its year-to-year path were precisely observed.

Define all countries as the 193 UN member states and two UN observer states, using a verified current list and an explicit ISO/UN M49 crosswalk. Include territories and disputed or separately reported economies in a separate analytical annex where relevant to actual trade or operations. This statistical choice is not a statement on sovereignty. Do not double-count regional aggregates, customs unions, dependencies, re-exports, or supranational institutions.

Retain every country in the coverage register, including countries with weak data, little current opportunity, legal restrictions, severe operating risk, or no recommended near-term entry. Every country must receive a disposition with a reason and a future trigger; coverage does not mean that every country merits investment.

Use the decision unit:

`country × product/value chain × customer segment × trade corridor × entry mode × time × scenario`.

Analyse subnational production basins, ports, consumption clusters, and distribution corridors when national averages obscure a material commercial or climate difference. Geographic diversification must be tested against common climate patterns and trade chokepoints, not assumed from country count alone.

## 7. Evidence classes and intellectual honesty

Every important claim must carry one of these labels:

- **Reported fact:** directly stated by a reliable source within the correct perimeter.
- **Derived figure:** calculated from reported inputs with a reproducible formula.
- **External projection:** a forecast published by a named institution, under its assumptions.
- **Estimated model parameter:** fitted using specified data and an estimation procedure.
- **Modelled outcome:** generated by the specified model and conditional inputs.
- **Planning assumption:** chosen for analysis; not an observed or estimated fact.
- **Expert judgement:** a reasoned assessment with author, rationale, and uncertainty.
- **Hypothesis:** a proposition to test, including its falsifier.
- **Recommendation:** an action supported by evidence and explicit preferences or constraints.
- **Portfolio evidence:** a statement about my background, not an Olam business result.

Do not cite an institutional report as though it proves a chosen margin, capture rate, campaign lift, or investment return. If an assumption is calibrated from evidence, cite that calibration; if it is a judgement, show who chose it and why. Conclusions and recommendations must trace both their factual premises and their decision criteria.

Avoid the idea that every recommendation can be backed by a statistical test. Some depend on accounting identities, legal constraints, physical limits, ethical requirements, and management preferences. Explain the appropriate basis rather than manufacturing a p-value.

Never invent observations, regression coefficients, standard errors, confidence intervals, significance, Monte Carlo results, simulation counts, country rankings, report page numbers, or review passes. If execution tools are unavailable, provide executable specifications and label unexecuted analyses clearly.

## 8. A source register that can survive presentation questions

Create an auditable source book. For every source, include:

1. Stable source ID.
2. Issuing organisation and its role.
3. Exact document or dataset title.
4. Publication date, data period, revision, and access date.
5. Canonical publication URL.
6. Direct document or dataset URL where permitted.
7. Relevant country, product, entity, and population.
8. Units, currency, price base, exchange-rate convention, and definitions.
9. Exact table, figure, chapter, section, or paragraph.
10. Printed page number and PDF file-page index, if different.
11. Dataset series ID, API query, dimension filters, and retrieval timestamp.
12. Which observation or claim is supported and its necessary context.
13. Measurement or methodology limitations.
14. Whether the evidence is direct, proxy, modelled, revised, or missing.
15. Conflicting sources and the reconciliation rule.
16. Slide IDs and calculation IDs that use the source.
17. Availability, licensing, and reproducible access notes.

If a web page has no pagination, write `page: not applicable; section: [exact heading]`. Do not invent a page number. For an API, cite the exact series and query rather than pretending that a data row has a printed page.

A slide footnote should point to a stable source ID and concise pinpoint. The source book must contain the complete link and context. Prefer meaningful links over a long, unreadable string in a slide footer.

Where practical, retain allowed original downloads and cryptographic checksums so that revisions can be identified. Archive extraction and transformation rules. A search-result snippet is not enough to substantiate a decision-critical claim; open and inspect the underlying source.

Use independent corroboration when available for material company, trade, financial, or policy claims. A syndicated repetition is not independent corroboration. For authoritative original statistics, the issuing agency's methodology and revision notes may matter more than a second site repeating the figure.

## 9. Authoritative source map and retrieval priorities

Start from the following sources, then find exact relevant publications and records. These are discovery entry points, not evidence for unspecified claims. Check access, update dates, coverage, definitions, and the latest release at execution time.

| Research need | Preferred starting points |
|---|---|
| Company perimeter and operating facts | Olam Agri: `https://www.olamagri.com/`; Olam Group investor disclosures: `https://www.olamgroup.com/`; SALIC: `https://www.salic.com/`; applicable SGX filings |
| Current products and capabilities | `https://www.olamagri.com/about-us`; official product and country pages; latest Olam Agri annual report and corporate factsheet |
| Agricultural production, yields, balances | FAOSTAT: `https://www.fao.org/faostat/en/`; national ministries and statistics agencies |
| Agricultural medium-term projections | OECD–FAO Agricultural Outlook: `https://www.oecd.org/en/publications/serials/oecd-fao-agricultural-outlook_g1gha587.html`; associated methodology and datasets |
| Current verified Outlook edition at preparation | `https://www.oecd.org/en/publications/oecd-fao-agricultural-outlook-2026-2035_47874669-en.html`; DOI `https://doi.org/10.1787/47874669-en` |
| Projection methodology | `https://www.oecd.org/en/publications/oecd-fao-agricultural-outlook-2026-2035_47874669-en/full-report/methodology_4c323de7.html` |
| Trade quantities and values | UN Comtrade: `https://comtradeplus.un.org/`; national customs; partner-country mirror statistics |
| Tariffs and trade policy | WTO: `https://www.wto.org/`; WTO Tariff and Trade Data: `https://ttd.wto.org/`; official customs schedules, gazettes, and trade agreements |
| Population and demographic projections | UN DESA World Population Prospects: `https://population.un.org/wpp/`; UN urbanisation releases; national censuses |
| Macroeconomics | IMF: `https://www.imf.org/`; World Bank: `https://data.worldbank.org/`; national central banks and statistics agencies |
| Public finance, FX, and debt | IMF country reports; World Bank debt statistics; central banks; finance ministries; BIS: `https://www.bis.org/` |
| Climate science | IPCC: `https://www.ipcc.ch/`; AR6 WGII Food, Fibre and Other Ecosystem Products: `https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-5/` |
| Climate observations and hazards | WMO: `https://wmo.int/`; Copernicus Climate Data Store: `https://cds.climate.copernicus.eu/`; national meteorological services; NASA and NOAA official datasets |
| Water and irrigation | FAO AQUASTAT: `https://www.fao.org/aquastat/en/`; national water authorities; basin-level evidence |
| Natural disasters | UNDRR: `https://www.undrr.org/`; EM-DAT: `https://www.emdat.be/`; national disaster agencies and insurer evidence where disclosed |
| Agriculture and food security | FAO; WFP: `https://www.wfp.org/`; USDA FAS: `https://fas.usda.gov/`; USDA PSD and GAIN databases; IFPRI: `https://www.ifpri.org/` |
| Health, nutrition, and diet | WHO: `https://www.who.int/`; FAO food consumption surveys; national health and household expenditure surveys |
| Freight and ports | UNCTAD: `https://unctad.org/`; official port authorities; transport ministries; IMO: `https://www.imo.org/` |
| Labour, employment, wages | ILOSTAT: `https://ilostat.ilo.org/`; national labour surveys |
| Sustainability and environmental regulation | National regulators; official EU legislation: `https://eur-lex.europa.eu/`; competent certification standards and verified company disclosures |
| Nobel method attribution | Nobel Prize official pages: `https://www.nobelprize.org/prizes/economic-sciences/`; original papers, author repositories, and primary model documentation |
| Conflict and political risk | Official sanctions lists, UN records, national advisories, and transparent conflict research such as UCDP: `https://ucdp.uu.se/` |

Official status does not make every source error-free or appropriate. Evaluate revisions, incentive conflicts, uneven national reporting, missing informal trade, and the difference between a forecast and realised data.

Use accessible primary sources before paywalled estimates. If important internal or commercial data are unavailable, say so and provide a defensible proxy or a break-even boundary, not a fabricated observation.

## 10. Data model, concordance, and global coverage

Construct a country-year and country-product-year panel, supplemented by origin-destination-product trade flows and customer-route observations where available. Use long-form data with explicit keys. Keep source values separate from transformed values.

Required fields include country identifiers; year and frequency; product and HS code; reported and harmonised unit; source ID; observation status; publication vintage; geographic scope; price basis; transformation; imputation flag; and uncertainty class.

Document HS revisions and product concordance. Grain, flour, semolina, pasta, crude oil, refined oil, feed ingredients, finished feed, cotton, rubber, wood, and transport services must not be combined as though they were the same product. Map primary-product and processed-product conversions with credible extraction and yield factors.

Reconcile tonnes, kilograms, litres, oil-equivalent measures, edible-weight measures, product weight, and dry matter. Distinguish household consumption from apparent supply, intermediate use, feed use, industrial use, seed use, losses, and stock changes.

Separate FOB exports from CIF imports. Explain freight, insurance, valuation, timing, and reporting differences in mirror trade. Flag re-exports, trans-shipment hubs, informal cross-border flows, and unusual unit values. A trade unit value is not automatically a local wholesale or retail price.

Use the latest revisions consistently, and keep a vintage snapshot for backtesting. Do not use future revisions of historical data when claiming what a model could have predicted at the time.

Build a coverage matrix with every country, requested variable, years available, source, missingness, modelling eligibility, and limitation. Group unresolved data needs by decision impact. Never hide missing countries by dropping incomplete rows and calling the remaining sample global.

## 11. Country drivers: demographics and purchasing power

For every country, examine population size and trajectory, fertility, mortality, migration, age composition, household size, urbanisation, rural livelihoods, labour availability, and changing dependency ratios. Use official projection variants or probabilistic ranges where available. Do not extrapolate the recent population growth rate indefinitely.

Estimate food and feed demand through population **and per-capita demand**, with income, relative prices, household composition, distribution, culture, substitution, and supply constraints. Population growth does not automatically mean profitable demand growth, and population decline does not automatically make a market unattractive.

Study disposable purchasing power, income distribution, poverty, real wage trends, consumer credit, food expenditure shares, and price sensitivity. Use PPP-based income measures for comparable purchasing power and appropriate market exchange rates for cross-border costs and cash conversion. Do not mix their purposes.

Examine aging markets for changes in pack size, convenience, texture, nutrition, and institutional demand, but do not assume uniform preferences among older consumers. Examine youthful markets for household formation and urbanisation, while considering employment and affordability constraints.

Specify the causal bridge: demographic or income change → consumption occasion/customer economics → product mix and addressable demand → feasible capture → margin, capacity, and cash needs.

## 12. Country drivers: economics, institutions, and finance

Include real GDP and GDP per capita, productivity, sector composition, inflation, food inflation, fiscal conditions, debt-service burden, currency convertibility, capital controls, banking depth, borrowing cost, counterparty credit, remittance or repatriation constraints, and payment behaviour.

Distinguish disinflation from falling prices; devaluation from a real competitiveness gain; a nominal interest rate from a real rate; a monetary policy rate from a corporate funding cost; and GDP growth from growth in an Olam-relevant category.

Analyse formal law and actual enforcement separately where evidence permits. Assess contract enforceability, land rights, regulatory consistency, state procurement, infrastructure reliability, institutional stability, competition policy, and entry barriers. Use institutional measures as uncertain proxies rather than labelling countries with unsupported moral or political judgements.

For long-run institutional and productivity scenarios, show which parameters are assumed to change and how that alters cost, demand, risk, or investment. Do not turn a governance index directly into an arbitrary financial haircut without calibration.

## 13. Country drivers: food preferences, health, and customer needs

Study meal occasions, staple preferences, household cooking constraints, traditional diets, convenience, food-service demand, bakery and industrial food production, animal protein, aquaculture, fortification, product safety, and demand for traceability.

Differentiate B2C shoppers, distributors, wholesalers, artisanal producers, industrial manufacturers, livestock producers, aquaculture operators, governments, and institutional buyers. Model the customer's own economics: yield, throughput, rejects, labour time, energy, spoilage, financing, consistency, and reliability.

Treat health consciousness as country- and segment-specific behaviour supported by expenditure, surveys, purchase data, or controlled research. Do not assume that stated willingness to pay converts into actual purchases. Separate nutrition science from marketing claims and verify all proposed health or fortification claims under local law.

Include dietary transition, concerns about sugar, fats, salt, processing, protein, micronutrients, allergens, and food safety where relevant to an actual Olam Agri product. Consider changing medical or weight-management practices only where credible evidence establishes a material consumption effect. Avoid unsupported medical causation or speculative universal adoption.

Compare nutrient delivery, cost per serving, cost per use, preparation cost, and customer performance. An affordable cash ticket can conceal a high unit price; a large economical pack can be inaccessible to a cash-constrained household. Make this dual-price problem explicit.

## 14. Country drivers: climate, nature, disasters, and adaptation

Build product- and geography-specific exposures to temperature, rainfall, drought, floods, cyclones, wildfire, extreme heat, water stress, salinity, soil degradation, pests, disease, sea-level change, and ecosystem damage. Separate chronic climate shifts from discrete weather events and from operational incidents.

Use IPCC-consistent socioeconomic and emissions pathways and relevant crop or hydrological evidence. Explain any bridge between global warming levels, regional climate, yield response, quality, harvest timing, storage, logistics, and business cash flows. Global average temperature is not a direct local yield coefficient.

Analyse compound events: drought plus energy shortage; flood plus port closure; heat plus crop disease; commodity supply shock plus currency depreciation; and climate migration plus household affordability pressure. Consider correlated failures across sourcing basins and shared ports.

Include adaptation options such as sourcing diversification, water efficiency, agronomy, irrigation, storage, climate-tolerant varieties, insurance, disaster response, alternative ports, and supplier support. Model cost, adoption, effectiveness, time lag, maintenance, and limits. Do not assume that adaptation neutralises all losses.

Assess transition risk: carbon pricing, land-use rules, traceability, deforestation requirements, water restrictions, subsidy shifts, energy transition, and standards demanded by buyers. Verify enacted rules, proposal status, implementation dates, scope, and exceptions at the research cutoff.

Treat environmental and social constraints as genuine feasibility conditions. A business case cannot compensate for an illegal activity or unacceptable rights violation by assigning it a small monetary penalty.

## 15. Country drivers: geopolitics and international trade

Evaluate tariffs, quotas, licensing, sanitary and phytosanitary requirements, export controls, import restrictions, local-content rules, regional agreements, customs procedures, tax treatment, sanctions, currency settlement, and regulatory enforcement. Use product-specific HS lines and current official rules.

Distinguish `not prohibited` from `duty free`, `licensed`, `financeable`, `logistically possible`, and `economically attractive`. Preserve that distinction when extending the current Nigeria crude-versus-refined oil argument.

Model plausible trade-fragmentation and supply-security scenarios. Include disruption to relevant waterways, canals, rail routes, land borders, ports, shipping insurance, and fertiliser or energy supply. Treat named future conflicts and closures as conditional stresses, not predictions that they will occur.

Identify dependence on individual origins, importers, policy regimes, currencies, and counterparties. Explore the strategic value of trusted supplier status, diversified origins, local processing, technical service, and long-term contracts, while quantifying the capital and flexibility they consume.

Study government food-security objectives and public procurement only through documented policy and procurement evidence. Do not equate national strategic need with a bankable customer or guaranteed contract.

## 16. Product, competitor, and operating analysis

Verify Olam Agri's current product scope before modelling. Consider relevant food, feed, fibre, processing, risk-management, and freight businesses separately. For each product, identify the demand mechanism, supply mechanism, conversion process, logistics, customer type, competitive set, and primary economic constraint.

Build an operating baseline: existing assets, capacity, utilisation, yields, throughput, routes, suppliers, customer concentrations, certifications, commercial capabilities, and known bottlenecks. Where public evidence is insufficient, define the internal fields needed rather than estimating confidential figures as facts.

Analyse competitors with current primary disclosures where possible. Distinguish global traders, domestic processors, cooperatives, state enterprises, local brands, informal channels, and specialised suppliers. Do not invent market shares or private competitor margins.

Evaluate greenfield investment, brownfield expansion, acquisition, JV, contract manufacturing, distributor partnership, direct export, local sourcing, offtake agreement, and remote service. Compare time to revenue, control, capital, working capital, risk sharing, integration cost, and reversibility.

Show operating and commercial complementarity, but count synergies only when there is an identifiable mechanism, eligible overlap, execution cost, legal permission, and evidence. Country presence alone is not a synergy.

## 17. Convert global coverage into an actionable prioritisation system

Create a complete country-product opportunity matrix. For every feasible unit, evaluate category demand, realistic capture, margin, cash conversion, capital intensity, execution capability, competition, regulatory access, climate exposure, network contribution, and evidence quality.

Use a staged funnel:

1. Coverage and evidence check.
2. Legal, environmental, and operating feasibility gates.
3. Country-product commercial screening.
4. Entry-mode comparison.
5. Financial scenarios and portfolio fit.
6. Evidence or pilot requirement.
7. Capital decision and monitoring trigger.

Provide dispositions such as deepen now, pilot, enter through trade, partner, develop sourcing, acquire subject to diligence, watch, defer, or no near-term entry. Explain why each country receives its disposition.

If a weighted score is used for screening, show definitions, scaling, missing-data rules, weights, uncertainty, and ranking sensitivity. Avoid counting the same GDP, income, or governance signal multiple times under different labels. Do not let a screening score override financial or hard feasibility tests.

For sparse-data countries, build provisional scenario economics from disclosed proxies and clearly bounded assumptions, or calculate the margin, utilisation, or volume required to justify entry. Do not provide a fake calibrated probability or an apparently precise Olam NPV. Mark the business case `provisional—data required` when appropriate.

## 18. Scenario architecture: macro worlds and business mechanisms

Design a manageable set of coherent global scenarios that span the major decision risks. Use the following as a starting architecture, changing labels or structure if the evidence supports a better set:

| Scenario | Core mechanism | Main business questions |
|---|---|---|
| Managed transition | Gradual productivity gains, selective climate adaptation, functioning trade | Which capabilities compound and where is disciplined expansion attractive? |
| Productive integration | Stronger trade cooperation and productivity, improved infrastructure | Where could demand and operating efficiency accelerate, and what limits capture? |
| Fragmented trade | Trade barriers, strategic stockpiling, higher corridor and compliance costs | Where does local processing or origin diversity outweigh lost efficiency? |
| Compound physical stress | Crop and logistics disruption with correlated regional shocks | Which portfolio survives cash, capacity, and service stress? |
| Affordability and debt squeeze | Weak real purchasing power, financing stress, poor pass-through | Which products, packs, customers, and entry modes remain viable? |
| Nutrition and resource transition | Shifts in diet, standards, water/carbon constraints, and buyer preferences | Which value-added propositions earn a measurable premium or reduce customer cost? |

A global scenario is not automatically the best or worst scenario for every country. An exporter can benefit from prices that hurt an importer, and higher commodity prices can increase revenue while reducing margin or cash liquidity. Explain these sign changes.

Map climate pathways, demographic variants, macro assumptions, and trade regimes consistently. Do not combine physically or economically incompatible assumptions simply to create an extreme number. Where hybrids are useful, describe their compatibility and conditional logic.

Within each global scenario, include parameter uncertainty and country-specific events. Provide compound downside stresses beyond the central scenarios. Treat rare-event stresses as resilience tests when probabilities cannot be supported.

## 19. The central case and probability discipline

Produce a central planning case grounded in current evidence and validated forecasts. Explain why it is the central case. If evidence is insufficient to identify a statistically most likely joint path, call it a `central planning case`, not a proven most-likely future.

Separate:

- Scenario membership and its conditional assumptions.
- Parameter uncertainty within a scenario.
- Observation or measurement error.
- Model uncertainty.
- Residual business outcome uncertainty.
- Management decisions and execution uncertainty.

If scenario weights are estimated or elicited, show their basis and sensitivity. If they are judgemental, label them judgemental. If deep uncertainty prevents credible weights, use robust decision-making, minimax regret, and weight ranges instead of inventing probabilities.

Do not confuse the median, expected value, modal scenario, most likely parameter set, and highest-probability complete 25-year path. State precisely which is being reported. Separate confidence intervals for coefficients from prediction intervals for outcomes.

For each country-product-entry-mode case, report a central estimate or scenario outcome with the relevant range, downside conditions, and confidence in the recommendation. Where numerical probabilities are not credible, report conditional outcomes and switching thresholds.

## 20. Econometric design: questions before equations

Prepare a model-selection memo for each important target: consumption, imports, local price, market capture, repeat purchasing, margin, yield, service level, or cash conversion. State whether the model is predictive, causal, descriptive, accounting-based, or optimisation-based.

Build simple benchmarks first: historical average, seasonal naive, constrained trend, and relevant official projections. More complicated models must demonstrate decision-relevant improvement against a benchmark, or be rejected.

Use panel and time-series methods only when sample size, measurement, stationarity, and economic identification permit them. Historical data do not automatically identify future structural relationships. A long horizon requires regime and boundary assumptions beyond a regression fit.

A candidate demand model can take the form:

`ln(q_cpt) = α_cp + τ_t + β_p ln(real_income_pc_ct) + γ_p ln(real_relative_price_cpt) + δ_p urban_share_ct + ζ_p age_structure_ct + η_p nutrition_and_channel_ct + κ_p supply_access_cpt + ε_cpt`.

Here `q` is product demand per person, `c` country, `p` product, and `t` time. Define every variable, its unit, source, lag, and expected relationship. Use country-product effects and time effects where identified, but recognise that future time effects cannot simply be known or extrapolated mechanically.

Model total demand as population times per-capita demand, with appropriate adjustments for feed, industry, trade, losses, and conversion. Avoid including population both inside the per-capita model and again in a way that double-counts its effect.

If zeros, small samples, compositional shares, or heavy tails make log-OLS inappropriate, consider methods such as PPML, hierarchical models, bounded shares, or transparent structural equations. Justify the choice.

## 21. Demand systems, elasticity, and health-related substitution

Estimate own-price, cross-price, and income elasticities where data support them. Use consumer expenditure systems, product choice, or segment-specific models instead of assuming one global elasticity. Consider saturation and nonlinear responses across income levels.

Where an Almost Ideal Demand System is suitable, use the Deaton–Muellbauer framework with correct attribution to both authors. A simplified expenditure-share equation is:

`w_i = α_i + Σ_j γ_ij ln(p_j) + β_i ln(X/P)`.

Explain expenditure shares, prices, total expenditure, and the price index. Apply adding-up, homogeneity, and symmetry conditions where the specification requires them. Address price and expenditure endogeneity, zero purchases, survey design, and product aggregation.

The resulting elasticities must translate into decisions: pack size, price ladder, substitute risk, product mix, fortification, customer segmentation, and affordability. Do not use an elasticity estimated in one country as universal evidence for another without a documented transferability assessment.

Test whether health, convenience, and sustainability preferences change actual purchase behaviour after controlling for income, price, availability, and demographic composition. Present survey evidence as stated preferences unless validated by observed behaviour.

## 22. Trade modelling and the difference between opportunity and capture

Use a structural-gravity or appropriately specified trade model to analyse origin-destination flows. A candidate form is:

`E[Trade_odpt | X] = exp(α_op + δ_dp + τ_pt + βX_odpt)`.

Specify exporter and importer effects, trade costs, distance, policy, and product-period controls. For structural counterfactuals, use the necessary multilateral-resistance and market-clearing framework. A reduced-form gravity regression alone does not constitute a full equilibrium simulation.

Use PPML where appropriate for zeros and heteroskedasticity. Address missing trade, policy endogeneity, and changes in product classifications. Include formal and informal flows only within defensible measurement boundaries.

Distinguish import demand, accessible import demand, Olam-addressable demand, attainable sales, and incremental profitable sales. Estimate capture from capability, relationships, contracts, channel access, competition, delivery reliability, and marketing interventions. Never apply an arbitrary 1% share to a global market and call it a business case.

Reconcile trade-counterfactual results with capacity, supply, corridor, financing, and regulatory constraints. Include displacement of existing Olam business and competitor reactions when material.

## 23. Time-series models, volatility, and structural breaks

Use Engle and Granger's relevant insights carefully: nonstationarity, cointegration, error correction, and time-varying volatility require explicit testing and economic interpretation. Do not regress unrelated trending levels and interpret the resulting high fit as causal evidence.

For justified cointegrated series, consider an error-correction model:

`Δy_t = φ(y_(t−1) − β'x_(t−1)) + Σ_i ψ_iΔy_(t−i) + Σ_j θ_jΔx_(t−j) + u_t`.

Explain the long-run relation, adjustment speed, lags, and restrictions. Test stationarity, lag choice, residuals, and structural breaks. Granger predictability does not prove that an intervention causes the predicted outcome.

Use ARCH/GARCH-family models only where volatility clustering and sample size support them. Distinguish Engle's ARCH contribution from later GARCH developments and cite the actual method used. Heavy-tailed errors, regime shifts, and correlated shocks may matter more than a normal residual assumption.

Commodity-price or FX forecasts should include conditional ranges, regime stresses, and hedge context. A volatility model is not a guarantee of hedging returns or protection against an unobserved policy break.

## 24. Climate and agriculture models

Where data and primary research support it, connect weather, crop response, acreage, inputs, management, and adaptation. A transparent production identity is:

`Production_cpt = harvested_area_cpt × yield_cpt`.

A fitted yield function might use temperature exposure, precipitation, water balance, soil, input availability, and management variables with nonlinear responses and interaction terms. Use location-specific evidence and avoid assuming beneficial fertilisation effects, irrigation, or technological adoption without constraints.

Calibrate to official crop statistics, physical climate evidence, and peer-reviewed primary models. Where a full crop model cannot be credibly implemented, use documented response ranges and label the resulting stress translation as an approximation.

Reconcile climate impacts on quantity, product quality, procurement prices, transport, labour, water, insurance, and customer affordability. Avoid charging the same climate loss both as reduced supply and as an independently invented cost penalty.

Use Nordhaus-style integrated climate–economy logic for long-run scenario relationships where relevant. Do not take a global aggregate damage function and directly declare a country-specific Olam asset valuation. Asset and crop exposures need their own bridge and data.

## 25. Marketing and commercial causality

Measure incremental commercial results, not the coincidence of marketing spend and sales. Separate sell-in, sell-through, stock loading, substitution, seasonal demand, commodity price movements, route availability, and genuine demand creation.

Prioritise controlled experiments where feasible. Use matched route or market tests, phased rollouts, and appropriate quasi-experimental methods only when their identification assumptions are defensible. Apply Angrist/Imbens/Card-related causal principles and the experimental insights of Banerjee/Duflo/Kremer where they help the actual design; do not imply that a Nobel attribution removes the need for valid identification.

For difference-in-differences, the simple intuition is:

`effect = (treated_after − treated_before) − (control_after − control_before)`.

Explain parallel trends, spillovers, anticipation, changing composition, and concurrent interventions. For staggered treatment or heterogeneous effects, choose a method appropriate to those conditions rather than blindly applying a standard two-way fixed-effects estimator.

Calculate incremental contribution, cost-to-serve, retention, reorder, and cash after the intervention. A reduced CPM or increased reach is supporting operational evidence, not proof of profitable demand.

Build a hierarchy of outcomes: customer economics → actual adoption and repeat → incremental eligible sales → incremental contribution → cash → risk-adjusted capital return. Specify the time lag, counterfactual, and data owner for each step.

## 26. Long-run growth, institutions, and adaptation of established economics

Use economic models as tools with limits, not names displayed to impress. Consider these modules and select those that materially improve a decision:

| Foundation | Potential Olam application | Necessary limitation |
|---|---|---|
| Solow growth accounting | Long-run productivity and factor constraints | Aggregate convergence is not a company sales forecast |
| Romer endogenous growth | Knowledge, process learning, supplier capability, technical service | Knowledge investment does not guarantee appropriable profit |
| Nordhaus climate–economy integration | Conditional long-horizon climate and policy paths | Aggregate damages do not replace local exposure models |
| Deaton–Muellbauer demand systems | Diet, substitution, price, and expenditure allocation | Requires suitable consumption data and restrictions |
| Engle/Granger time-series econometrics | Commodity/FX volatility, cointegration, pass-through | Forecast predictability is not intervention causality |
| Krugman-related trade and scale economics | Processing clusters, scale, transport, market access | Empirical context and competing firms still matter |
| Leontief input-output analysis | Upstream and downstream dependencies | Fixed coefficients and aggregation limit long-run realism |
| Markowitz portfolio logic | Correlated country, origin, product, and corridor risks | Mean-variance can understate tail and regime risk |
| Sharpe-related cost-of-capital logic | Systematic risk and financing benchmarks | Local borrowing rate and sovereign risk need consistent treatment |
| Ostrom institutional governance | Supplier communities, water, and shared resources | Context-specific governance cannot be copied mechanically |
| Modern causal inference | Pilots and incremental marketing effects | Identification assumptions must be checked |
| Institutions and development research | Country execution and long-run productivity scenarios | Historical associations are not a licence for deterministic rankings |

Verify prize years and precise attribution from official Nobel materials. Cite primary method papers for implementation. Note co-authors and subsequent extensions. The project must not imply Nobel endorsement or use the phrase `Nobel-proven forecast`.

For each selected model, document the business question, original source, equation, variables, data, assumptions, estimated or chosen parameters, validation, result, limitations, and decision supported. Reject modules that add mathematical decoration without improving action.

## 27. Mathematical foundations and why they belong

Use mathematical methods only where they connect to a measurable business problem. A useful set may include:

- Bayes and later Bayesian decision theory for updating uncertainty with evidence.
- Dantzig-style linear and mixed-integer optimisation for capacity, sourcing, and capital constraints.
- Bellman dynamic programming for staged investment, waiting, learning, and adaptive policies.
- Von Neumann–Morgenstern decision and game-theoretic reasoning for competitive or policy responses when a credible game can be specified.
- Network flow and graph optimisation for trade, ports, transport, and correlated bottlenecks.
- Convex optimisation and robust optimisation for uncertain parameters and feasible resource allocation.
- Monte Carlo and numerical integration for propagating uncertainty, with distribution and dependency assumptions disclosed.
- Extreme-value methods for hazard tails only when data and diagnostics support them.
- Survival or hazard models for customer retention, supplier continuity, or asset disruption when the relevant event data exist.

Do not imply that all listed authors invented every modern extension. Cite the actual method and its authors. Shapley allocations or machine-learning feature explanations may allocate or describe model outputs; they do not by themselves establish causal contribution.

In the appendix, explain each method in plain language, then its mathematical form, assumptions, example, and practical limit. Do not promise mathematical certainty about the future. The methods should make uncertainty more visible and decisions more disciplined.

## 28. Estimation diagnostics and model validation

For every fitted model, report sample period, observations, effective independent units, missing-data treatment, estimator, coefficients, uncertainty, and diagnostics relevant to the specification. Choose cluster-robust, serial-correlation, spatial, or hierarchical uncertainty treatment to match the data-generating structure.

Check multicollinearity, omitted variables, measurement error, reverse causality, endogeneity, functional form, residual behaviour, outliers, stationarity, breaks, and stability across regions or income groups. Explain why a model is credible beyond a high in-sample fit.

Use time-respecting backtests and holdouts. Include leave-country or leave-region-out tests where the claim involves transfer to a country with little direct data. Avoid leakage from later observations, future revisions, and variables unavailable at the forecast date.

Compare MAE, RMSE, MASE, appropriate percentage-error measures, calibration, interval coverage, and the business cost of errors. Percentage errors can be unsuitable near zero. Provide residual plots and uncertainty calibration where they affect decisions.

For small or sparse samples, use partial pooling, priors, or structural bounds with explicit sensitivity rather than fitting many unidentifiable coefficients. State when parameters are not identified. Report sign instability and country-level errors, not only an aggregate average.

Judge the model by out-of-sample decision quality: avoided unprofitable entry, improved service, better capital allocation, lower regret, or reduced forecast-related cash strain. Statistical improvement without operational significance may not justify a more complex system.

## 29. Extrapolation from the official horizon to the 25-year horizon

Use official projections as evidence and benchmarks within their published horizon. The verified OECD–FAO edition at preparation covers 2026–2035, not 2051. Check the latest edition at execution. Its Aglink-Cosimo framework is a recursive-dynamic partial-equilibrium agricultural model, not a proprietary forecast of Olam earnings.

For outer years, extend with transparent demographic, productivity, climate, technology, income, and trade assumptions. Mark exactly where published projections end and model extensions begin. Use saturation, physical capacity, land/water limits, budget constraints, and realistic adoption dynamics.

Avoid unbounded CAGR extrapolation, indefinitely expanding margins, permanently linear adaptation benefits, and constant market capture over 25 years. Test convergence, saturation, structural breaks, new entrants, substitute products, and policy regimes.

Show how forecast uncertainty broadens and how confidence in individual distant-year numbers declines. Some structural relationships may remain robust while their exact quantities do not. Design recommendations that remain useful under that distinction.

Use the distant horizon primarily to identify strategic capabilities, exposure migration, and investment options. Use short- and medium-term evidence to release capital and update the trajectory.

## 30. Scenario implementation and dependence

Construct a transparent scenario engine. Each scenario must specify population/income paths, demand response, commodity conditions, FX/inflation, financing, policy, physical supply, climate exposure, adaptation, corridor conditions, competitive response, and execution.

Estimate or explicitly assume dependencies among the drivers. FX, inflation, commodity price, purchasing power, pass-through, inventory, and interest rates are not generally independent. Climate and corridor exposures can create cross-country dependence.

Use historical covariance, common factors, regime models, block bootstrap, copulas, or structural relationships only where appropriate. Check positive semidefiniteness and document any matrix repair. Include dependence uncertainty and tail-dependence sensitivity.

Separate parameter draws from economic shocks and from alternative model structures. Use reproducible seeds and record sampling distributions, truncation, correlations, and scenario weights. Compare results across enough runs to establish the stability of the decision-relevant outputs; a large run count does not make incorrect assumptions true.

Do not present the old independent-uniform stress simulation as a calibrated forecast. If retained for comparison, label it as the old screening baseline and show how the revised model changes conclusions.

Provide conditional outcome distributions, stress outcomes, and confidence in the recommendation. Report the sources of uncertainty instead of one unexplained confidence score.

## 31. Finance: build the economics from operational quantities

For each country-product-entry-mode case, construct an incremental model against the feasible counterfactual, including doing nothing, exporting, partnering, or waiting. Separate company growth from transfer between internal operations.

Build demand, feasible capture, delivered volume, net price, gross-to-net adjustments, procurement cost, processing yield, packaging, energy, labour, freight, duties, service cost, fixed operating cost, tax, capex, and working capital.

Use revenue as `delivered units × realised net price`, with explicit product and customer mix. If commodity prices inflate reported revenue, show the volume and margin decomposition. Revenue growth is not automatically value creation.

For processing, reconcile raw input, conversion yield, by-products, rejects, waste, saleable output, and capacity. For trading, model spread, origin-destination exposures, inventory financing, execution cost, and counterparty risk. Do not apply one manufacturing margin to all businesses.

Build monthly cash and seasonal inventory where harvest timing materially affects liquidity. Include commissioning delays, utilisation ramp, maintenance shutdowns, local service constraints, spare parts, and staffing.

Keep central allocations, intercompany prices, external incremental costs, and transfer pricing separate. Portfolio cash flow must not count the same synergy, transfer, or customer contribution twice.

## 32. Working capital, tax, and cash conversion

Replace the current sales-day proxy with:

`NWC_t = AR_t + Inventory_t − AP_t`,

with other operating balances added only when relevant and consistently defined.

Use receivables based on credit sales, inventory based on the correct cost and stock basis, and payables based on eligible purchases or cost of goods. A simplified annual formulation is:

`AR = credit_sales × DSO/365`;

`Inventory = relevant_cost_base × DIO/365`;

`AP = credit_purchases × DPO/365`.

Use the actual calendar convention and seasonality. The revenue approximation for all three balances can materially distort cash. Cash flow uses the **change** in working capital, not the same release repeated every year.

Include inventory obsolescence, shrinkage, quality losses, customer defaults, advance payments, letters of credit, margin calls, and security collateral when relevant. Distinguish working capital from treasury cash and financing balances.

Model tax by jurisdiction with current official rules, tax losses and utilisation limits, incentives only when eligibility is supportable, withholding tax, repatriation friction, and transfer-pricing boundaries. Do not assume a simple statutory tax percentage gives effective cash taxes in every year.

Show how a growth case can be EBITDA-positive but cash-negative. Include minimum liquidity and funding needs under stress, not only NPV.

## 33. Discounting, currency, and capital returns

For an unlevered project model, use:

`FCFF_t = EBIT_t − cash_tax_on_operations_t + D&A_t − Capex_t − ΔNWC_t`.

If the simplified `EBIT × (1 − tax rate)` is used, state its limits and reconcile losses, incentives, and actual tax timing. Keep financing cash flows outside FCFF. For equity cash flow, explicitly include debt draws, repayments, and financing costs under a consistent equity discount rate.

Calculate:

`NPV = initial_cash_flow + Σ_(t=1)^T FCFF_t / Π_(u=1)^t(1+r_u) + discounted_residual_value`,

using a constant rate only where justified. Include staged capex at its actual timing. Evaluate finite-life cash flow separately from any continuation beyond year 25.

Use a consistent nominal-local, nominal-USD, or real-currency framework. Do not discount nominal naira flows at a real USD rate. Currency conversion, inflation, and discounting must be internally consistent. Where currency parity assumptions are used, identify their limits and validate the scenario treatment.

A conventional WACC reference is:

`WACC = E/(D+E) × k_e + D/(D+E) × k_d × (1−T)`.

Explain capital structure, cost of equity, debt, tax shields, country and currency risk, and whether corporate or project financing applies. Do not add a country risk premium to the discount rate while also charging the identical default or expropriation event in expected cash flows without reconciling double counting.

Calculate ROIC, contribution per tonne, free cash flow, capital turns, payback, discounted payback, IRR where interpretable, and NPV per unit of constrained capital. IRR can be misleading with non-conventional cash flows, multiple roots, or scale differences; NPV and liquidity remain central.

For any terminal value, justify the continuation model, reinvestment, margin, growth, asset life, and discount-rate consistency. Show the fraction of total value attributable to terminal assumptions and a no-terminal-value sensitivity. Salvage value is not the same as an indefinitely growing franchise.

## 34. Unit economics, break-even, and financial evidence

Compute break-even volume, utilisation, realised price, contribution margin, landed input cost, delay tolerance, and working-capital days for important investments. A simple starting identity is:

`cash operating break-even volume = fixed cash operating cost / contribution per unit`,

provided unit contribution is positive and the fixed/variable distinction is valid.

Investment break-even is different: solve the volume, margin, capex, or timing that makes NPV zero with the full cash-flow model. Use numerical root finding where appropriate and report feasibility and monotonicity conditions. A mathematically solved volume above physical capacity is not a viable business case.

Show finance inputs by evidence class. Internal Olam data need an accountable owner and date. Public comparables require adjustment for business mix, accounting, country, scale, integration, and timing. Chosen assumptions require a rationale and a sensitivity range.

For every country and scenario, provide a conditional business case or an explicitly provisional break-even case. Refusing false precision must not become an excuse to omit the country. The output should state what can be concluded now, what cannot, and the smallest evidence investment that can resolve the decision.

## 35. Customer value and Olam value must connect

Write a customer-value equation for each priority segment. For a bakery, industrial user, feed buyer, distributor, or household, identify the relevant benefit: output yield, product consistency, reject rate, labour, energy, inventory, stockout, price volatility, safety, cash ticket, or cost per serving.

Translate customer improvement into adoption, repeat, willingness to pay, switching cost, retention, or contractual access only with evidence. Then translate actual behaviour into Olam incremental contribution and cash.

For example, a higher-priced flour may be economically attractive if its measured usable output and reject reduction lower cost per saleable product. Conversely, premium branding may fail if performance and cash constraints do not justify the difference. State the customer's comparator and test the proposition.

For commodity-like products, identify the role of reliable supply, service, risk management, compliance, and embedded logistics. Marketing can communicate and organise these advantages, but cannot compensate for their absence.

Every important marketing proposition should therefore include: target customer, customer problem, measurable benefit, proof method, delivery capability, claim boundary, commercial capture mechanism, and contribution/cash test.

## 36. Marketing strategy by country and route

For every priority country-product case, define segmentation, target customers, value proposition, product and pack architecture, pricing, channel, distribution, technical service, communication, customer acquisition, repeat, and measurement.

Respect local language, culture, meal habits, trade structures, purchasing power, trust, and regulation. Do not recycle one campaign across all countries or assume that a global brand message is the main expansion constraint.

Differentiate demand creation from category conversion, distribution recovery, substitution, affordability response, and product innovation. Define the contribution of each intervention and the evidence needed to choose it.

Allocate spending across commercial levers such as technical service, customer research, distributor activation, product demonstrations, digital acquisition, availability, trade promotion, and brand communication. Use marginal incremental contribution and operational constraints to allocate the next unit of budget.

Explain cannibalisation across products, pack sizes, channels, territories, and existing Olam customers. Measure net incremental portfolio value. A successful new pack that merely moves customers from a more profitable pack may not create economic value.

Model advertising response only where data support it, including lag, diminishing returns, carryover, saturation, and interaction with availability. A marketing-mix model can support allocation, but controlled evidence and commercial measurement should challenge its attribution.

## 37. Sustainability as both constraint and economic mechanism

Test sustainability interventions through clear mechanisms: avoided supply disruption, better quality, lower resource cost, regulatory access, buyer retention, credible traceability, reduced loss, farmer continuity, insurance, or verified willingness to pay.

Include direct cost, measurement and verification, implementation, supplier adoption, time to benefit, and maintenance. Do not assume that a sustainability label creates a premium or that all environmentally positive measures have positive private NPV.

Separate legal compliance, corporate commitments, impact objectives, strategic resilience, and commercial returns. If a project is chosen for strategic or impact reasons despite weak private NPV, state the objective and the governance rationale instead of hiding it in optimistic financial assumptions.

Track emissions, water, land use, biodiversity, labour, safety, and community outcomes using relevant standards and boundaries. Avoid mixing organisational and product footprints, gross and net claims, avoided emissions and reductions, or estimates and verified results.

Show trade-offs transparently. Include farmer income, adoption, rights, and resilience where a supplier programme is essential to continued commercial supply. Do not treat people or environmental harm as merely optional costs to optimise away.

## 38. Portfolio and network optimisation

Optimise the expansion portfolio rather than ranking projects independently. Incorporate constrained capital, liquidity, management attention, execution capability, capacity, sourcing, legal eligibility, and common exposures.

Separate portfolio diversification from network complementarity. Different countries can share the same export origin, port, currency, weather pattern, or policy exposure. Conversely, a smaller market may improve a route, sourcing balance, or backup capacity.

Use the covariance and dependence of cash flows, not just country scores. Where mean-variance is inadequate, include downside cash, tail loss, minimum service, and severe but plausible stresses.

Do not count a network benefit unless it is realised through reduced cost, higher feasible output, avoided losses, improved service, or incremental cash. Trace intercompany flows and eliminate double-counting at consolidation.

Show capital allocation under alternative budgets and risk appetites. Report which projects are consistently selected, which depend on scenario weights, which are substitutes, and which become valuable only as part of a network.

## 39. Adaptive investment, real options, and decision triggers

Treat waiting, piloting, partnering, expanding, mothballing, divesting, and switching supply as possible decisions. Model irreversibility, time to build, learning, competitive response, and the cost of delay.

Use a dynamic policy when data and computational capacity permit. If using real-option logic, explain the exercise conditions, uncertainty process, cash flows, discounting, and market-completeness limits. A textbook option formula may be inappropriate for a non-traded project with geopolitical risk.

Create trigger-based roadmaps instead of asserting that a specific acquisition must happen in a distant calendar year. Triggers can involve validated demand, customer repeat, contribution, utilisation, tariff changes, liquidity, supplier performance, climate exposure, or a sourcing-corridor threshold.

Specify observe, prepare, pilot, invest, scale, pause, and exit actions with owner, evidence, review date, and escalation path. Show what information would change the recommendation and what information would not.

An attractive large market may justify a small option investment before a large irreversible commitment. Quantify the cost and benefit of obtaining evidence; do not assign an arbitrary option premium to every uncertain project.

## 40. The proposed integrated decision model

Develop a coherent proposed model called the **Olam Adaptive Expansion and Customer Economics Model**, or choose a clearer name. Present it as a proposed integration of established methods for this business problem. Do not claim that the underlying mathematics is newly discovered or universally optimal.

The essential proposition is to connect **what customers can afford and value, what Olam can reliably deliver, what cash it can retain, and what it should learn before committing the next unit of capital**.

Let a decision policy `π` choose sourcing, capacity, entry, price, pack, commercial service, marketing, and evidence-gathering actions over time. Let `ω` represent uncertain economic, climate, policy, operational, and behavioural paths. Define portfolio discounted incremental cash `W(π,ω)` against a feasible counterfactual.

A defensible planning formulation is:

`π* = argmax_(π∈Π_feasible) { min_(Q∈𝒬) E_Q[W(π,ω)] − λ max_(Q∈𝒬) CVaR_(α,Q)[L(π,ω)] }`,

where `L = max(0, W_floor − W)` is a defined shortfall loss, `𝒬` is a documented ambiguity set of plausible outcome distributions, `λ` is an approved risk-aversion parameter, and `α` is the tail-confidence convention. Use the standard loss-CVaR convention and explain it explicitly.

If probabilities and an ambiguity set cannot be credibly specified, use minimax regret over a documented set of plausible scenarios. Do not fabricate a distribution solely because the objective includes an expectation.

All objective terms must have compatible units. Do not add a dimensionless brand score, a water score, and dollar NPV without a defensible conversion or separate constraint. Legal, rights, and hard sustainability requirements belong in the feasible set, not in a tradable penalty that money can override.

Define actual incremental cash, including commercial benefits, network benefits, evidence costs, adaptation costs, capex, working capital, taxes, and implementation costs exactly once. Do not add an extra resilience premium or learning premium when the same benefit already appears in scenario cash flows or an adaptive policy.

The model's business novelty should come from the specific integration, data, constraints, feedback, and decision usefulness. Its value must be demonstrated against simpler allocation rules and the current Nigeria screening model.

## 41. Demand, supply, and financial layers of the proposed model

Make the model modular and explainable:

**Demand layer:** conditional category demand, customer segments, price and income response, substitutes, preferences, customer economics, and commercial interventions.

**Capture layer:** probability or attainable share conditional on competition, relationship, quality, service, channel, route, product, and entry mode. Bound capture by realistic evidence and avoid unexplained sigmoid coefficients.

**Supply layer:** origin capacity, procurement, yield, conversion, processing capacity, inventory, logistics, delivery, regulation, and climate constraints.

**Finance layer:** delivered sales, net price, costs, taxes, capital, working capital, liquidity, currency, and cash.

**Learning layer:** new observations change parameter beliefs, uncertainty, and subsequent actions.

**Portfolio layer:** common exposures, network capacity, capital constraints, risk appetite, and adaptive allocation.

A first approximation to delivered volume may be `min(attainable_demand, feasible_delivered_supply)`, but the production model should solve network and allocation constraints rather than ignoring product/customer priorities.

Marketing affects customer behaviour and information; logistics affects realised availability; procurement affects price, supply, and risk; finance affects capacity to commit cash. Model interactions explicitly when justified. Do not let marketing claim all growth produced by other functions.

Show which inputs are measured, estimated, assumed, or optimised. A parameter that looks precise because software requires a numeric value remains an assumption unless evidence supports it.

## 42. Two potentially distinctive insights to investigate

Develop and test these hypotheses. They are **research propositions**, not pre-established discoveries:

**Hypothesis A — information-adjusted expansion:** A market with moderate standalone demand may be more valuable than a larger market if a low-cost pilot produces evidence transferable to many other feasible markets, or reveals a common demand or route mechanism that changes portfolio allocation.

Measure transferability from data and domain similarity; do not assume it. Compute net value of sample information as the improvement in optimal decisions after evidence, less research and delay costs. Do not add this value to a full adaptive model if the same learning benefit is already included.

**Hypothesis B — resilience-adjusted marginal marketing value:** The next unit of marketing budget can have low or negative value in a high-demand market when availability, financing, or pass-through constrains delivery. Conversely, improving customer economics or supply reliability may increase the later marginal return to demand generation.

Test interactions between commercial interventions and service capacity using data or a controlled pilot. Derive switching conditions from the operational cash model. An interaction term in an observational regression alone does not prove that changing the interacting variables will cause the predicted improvement.

Investigate whether the combination supports a useful decision rule: **invest first in the constraint or evidence whose removal changes the next best allocation the most**. Demonstrate when it works, when it fails, and whether the idea is already represented in operations research, value-of-information, development economics, marketing allocation, or real-options literature.

The desired fundamental outcome is an insight that changes decisions and survives challenge. If the literature already contains the principle, credit it and make the contribution an Olam-specific operationalisation. Do not force a claim of worldwide discovery.

## 43. Value of information and the cost of learning

Calculate, when feasible:

`EVSI = E_y[max_a E(V(a,θ) | y)] − max_a E(V(a,θ))`,

where `θ` represents unknown business parameters and `y` a possible study result. Net EVSI subtracts research cost and the economic cost of delay or implementation.

Explain why a study is useful only if its plausible results could change an action. A more precise estimate of an irrelevant parameter does not necessarily improve the business decision.

Compare research options: customer interviews, price/pack experiments, route availability tests, contract pilot, technical-service trial, supplier trial, or climate exposure study. Identify which uncertainty each resolves and whether it transfers to other markets.

Evaluate sample size, speed, cost, and minimum economically meaningful effect. Stop collecting evidence when expected decision improvement is lower than the next unit of research cost, subject to required due diligence and governance.

Use Bayesian updating if the prior, likelihood, and observations can be responsibly specified. Show sensitivity to prior strength and transferable evidence. Do not present a subjective prior as a measured frequency.

## 44. Proving that the proposed model is useful

Benchmark the proposed decision system against: equal allocation; market-size ranking; simple NPV ranking; the existing Nigeria screening case; a standard country-score approach; and a feasible current-management policy where supplied.

Use historical decision replays and prospective pilots. Evaluate held-out cash, forecast accuracy, liquidity stress, regret, execution feasibility, evidence cost, and resilience. Make comparisons under identical information, budgets, and constraints.

Conduct ablation tests: remove dependency modelling, customer economics, working capital, adaptive learning, portfolio constraints, and climate mechanisms one at a time. Determine whether each component changes decisions and improves outcomes.

Do not confuse a simulated improvement under the model's own assumptions with independent empirical proof. Label simulation evidence, backtest evidence, and prospective causal evidence separately.

Show a deliberately simple worked example with a small number of markets, products, scenarios, and decisions. Trace inputs to recommendation and demonstrate a counterexample where the proposed framework chooses differently from raw market size. Then show what data would be needed to scale it responsibly.

## 45. Originality review and the limits of a novelty claim

Conduct a documented literature and prior-art review across agricultural economics, robust portfolio optimisation, stochastic programming, Bayesian experimental design, real options, marketing resource allocation, supply-chain digital twins, and climate-finance modelling.

Record search terms, databases, dates, relevant papers, exact methods, overlaps, differences, and unresolved comparisons. Prioritise original papers and primary documentation. Include working papers and practitioner systems where discoverable; peer-reviewed literature alone does not prove an idea has never been used.

Classify the proposed contribution as an application, integration, extension, decision rule, empirical finding, or mathematical theorem. Do not call it a theorem unless assumptions and a valid proof are supplied. Do not call it a discovery unless the evidence supports that claim.

Use language such as `a proposed business-specific synthesis` or `a potentially distinctive integration within the reviewed literature`. A search can identify related work but cannot establish that no mathematician, economist, statistician, scientist, agronomist, or marketer anywhere has considered an idea.

If genuinely new mathematical results emerge, isolate them, specify assumptions, provide proof or numerical evidence as appropriate, disclose the literature scope, and seek independent expert review. Do not let the aspiration for novelty weaken the defensibility of the CEO presentation.

## 46. My contribution: credible, specific, and measurable

Position Manash Protim Deori as a candidate who can build and operate the commercial intelligence, analytical, experimentation, and marketing layer supporting better expansion decisions. Do not portray me as already possessing decades of agribusiness leadership, specialised treasury authority, or proven global category-management experience.

Read the current portfolio and resume evidence. The inspected resume lists an MBA from IIM Shillong, a chemical-engineering background, marketing and strategy work, campaign analytics, budget allocation, and a Meghalaya public-distribution supply-chain project. Treat these as portfolio-listed credentials and experience; do not imply independent employer verification unless supporting evidence is actually supplied.

The inspected portfolio lists responsibility for a ₹20M marketing budget and a CPM change from ₹35.8 to ₹15.5. The arithmetic reduction is `(35.8−15.5)/35.8 ×100 ≈56.7%`, commonly rounded to 57%. Distinguish this past campaign metric from profitability, sales lift, an Olam result, or a forecast of future business performance.

The listed Meghalaya project includes supply-chain simulation, warehouse/distribution analysis, sensitivity and break-even work, and government-record analysis. Use the project to support a relevant analytical capability, with accurate source wording and without inventing implemented savings or outcomes.

Translate my background into an operating offer:

- Build a country-category evidence register and signal-monitoring process.
- Connect demand signals to price, pack, route, customer, and economic explanations.
- Design practical tests of customer value, availability, repeat, and promotion.
- Maintain a transparent model with Finance and Treasury validation.
- Explain uncertainty and switching thresholds in executive language.
- Create a feedback loop from field evidence to marketing and expansion decisions.
- Document what should stop, change, or scale.

Specify what I would own, influence, or support. Treasury should own hedging and discount-rate policy; Finance should validate P&L and cash; category teams should own product expertise; procurement and supply chain should own execution; legal should determine legal feasibility. My contribution should connect and clarify their decisions, not substitute for their authority.

Show a realistic first assignment and how success would be measured. Avoid promising quantified savings or expansion returns before the baseline and causal evidence exist.

## 47. A concrete 90-day proof plan

Design a 90-day initial pilot grounded in the existing Nigeria semolina and edible-oil thesis, unless current evidence suggests a better learning market. Explain why this starting point offers available data, meaningful decisions, manageable execution, and potential transferability.

Use the following sequence, adapting timing to actual field conditions:

| Phase | Work | Reviewable evidence | Decision |
|---|---|---|---|
| Days 1–15 | Establish perimeter, data access, metric definitions, source ledger, baseline | Reconciled data dictionary and economic baseline | Is a credible pilot measurable? |
| Days 16–30 | Identify binding constraints and competing explanations | Customer/route diagnosis, test design, sample and power justification | Which intervention and control are feasible? |
| Days 31–60 | Execute controlled price/pack, service, or availability tests | Treatment delivery, sell-through, customer economics, repeat, contribution | Does the mechanism improve incremental business value? |
| Days 61–75 | Reconcile cash, risks, and transferability | Finance-approved incremental model and sensitivity | Should the intervention stop, change, or scale? |
| Days 76–90 | Recommend next capital/evidence commitment and codify learning | Decision memo, dashboard, audited appendix, next-market test | What is the smallest justified next step? |

Specify actual sample size from baseline variation, clustering, minimum useful effect, and acceptable error; do not write an arbitrary number of stores or customers to look scientific. Include spillovers, seasonality, intervention compliance, and rollout feasibility.

Separate pilot success from national-scale proof. A positive 90-day result may justify another test or controlled rollout; it does not automatically validate a 25-year country strategy.

Set stop rules for data integrity failure, negative incremental contribution, unacceptable cash strain, customer harm, missing availability, illegal claims, or uncontrolled treatment spillover. Define success thresholds before observing results and disclose any changes.

## 48. Global country dossiers and mandatory dispositions

Create a structured dossier for every country in the coverage universe. Each dossier must be generated from the same evidence and model spine, so that the executive ranking, workbook, and country narrative cannot contradict one another.

Include:

1. Country identifiers, region, research date, and data quality.
2. Current verified Olam Agri presence, assets, products, or trade links.
3. Relevant food/feed/fibre demand and population-income trajectory.
4. Priority customer segments and specific unmet needs.
5. Relevant domestic supply, imports, exports, and competitor context.
6. Accessible products and feasible entry modes.
7. Key policy and product-specific trade constraints.
8. Climate and disaster exposure by actual basin, asset, or corridor.
9. Central, favourable, adverse, and compound-stress economics.
10. Margins, volumes, capex, working capital, liquidity, and discounting basis.
11. NPV or a provisional break-even/threshold case, with explicit evidence status.
12. Portfolio contribution and common dependencies.
13. Proposed marketing and commercial mechanism.
14. Recommendation, owner, timing, and evidence gate.
15. What changes the decision and what would invalidate it.
16. Pinpoint sources and calculation IDs.
17. Internal data needed and the cost of resolving the key uncertainty.

Include countries with no immediate priority. Their conclusion may be maintain trade-only relationships, monitor, do not enter, or develop a small option. Explain the financial and feasibility logic. If no meaningful Olam product opportunity is identified, say so instead of forcing an invented one.

For countries with multiple viable roles, distinguish consumption market, sourcing origin, processing hub, trade hub, logistics connector, and food-security partner. A sourcing-only country can be commercially important without a large domestic consumer market.

## 49. The all-country, all-scenario calculation matrix

Build a machine-readable matrix with one row per analytical decision unit and scenario. At minimum include:

`country_id, product_id, customer_segment, entry_mode, corridor_id, scenario_id, horizon_year, current_presence, feasible_flag, evidence_grade, category_demand, attainable_capture, capacity, delivered_volume, net_price, revenue, variable_cost, fixed_cash_cost, EBITDA, depreciation, EBIT, tax, capex, working_capital, delta_working_capital, free_cash_flow, discount_rate, NPV, liquidity_shortfall, carbon_water_metrics_if_applicable, recommendation, decision_gate, source_ids, assumption_ids, calculation_ids`.

Where data are unavailable, use explicit null/status fields or documented assumption distributions, not silently inserted zeros. Zero demand, zero presence, and missing demand are different states.

Publish a coverage count: country universe, dossiers completed, feasible cases, provisional cases, cases blocked by evidence, and countries with no near-term opportunity. Do not call the work complete if countries were dropped by a join, model fit, or spreadsheet filter.

A country-scenario business case should state the proposed action and its counterfactual, not simply list GDP, population, and an investment score. Provide scenario outcomes at the strategic milestones and annual financial calculations for modelled investment cases.

If product-country combinations are structurally irrelevant, mark them as not applicable with a reason. Do not confuse complete country coverage with analysing physically meaningless combinations.

## 50. Executive narrative and slide architecture

Build a concise executive presentation supported by a very extensive appendix and country atlas. Aim for roughly 35–40 main slides when the evidence warrants them; preserve narrative clarity rather than treating slide count as a quality metric. All-country detail belongs in navigable supporting material, with selected examples in the main presentation.

Use the following initial storyline. Change the exact count and grouping only to strengthen the decision sequence:

| Main slide | Purpose | Required evidence or output |
|---:|---|---|
| 1 | Title, horizon, author, cutoff | Correct entity and scope |
| 2 | Executive decision and recommended next commitment | Concrete asks with evidence conditions |
| 3 | What changed from the existing deck | Material analytical improvements, not edit history |
| 4 | Current company economics and strategic perimeter | Reconciled company disclosures |
| 5 | The global system in which Olam competes | Demand, supply, trade, customer, and capital connections |
| 6 | Why a 25-year view changes today's priorities | Durable exposures and capability investments |
| 7 | Demographic and income demand pathways | Official data, projections, and bounded extensions |
| 8 | Diet, health, affordability, and customer economics | Segment and product evidence |
| 9 | Climate, water, and supply migration | Location-specific conditional impacts |
| 10 | Trade fragmentation and corridor exposure | Verified rules and stress mechanisms |
| 11 | Product/value-chain opportunity map | Olam-specific scope and constraints |
| 12 | Country universe and evidence coverage | All countries accounted for |
| 13 | Priority country-product-entry-mode choices | Financial and feasibility logic |
| 14 | Central planning case | Conditional assumptions and uncertainty |
| 15 | Scenario comparison | Consistent global mechanisms and local sign changes |
| 16 | Most resilient opportunities | Decisions stable across tested futures |
| 17 | Opportunities that require evidence or timing | Switching thresholds and options |
| 18 | Selected regional/corridor case | Source-to-finance chain |
| 19 | A second contrasting country case | Why a different market needs a different playbook |
| 20 | Nigeria semolina and edible-oil laboratory | Corrected inherited model and relevant tests |
| 21 | Customer value proposition and adoption proof | Measured customer economics |
| 22 | Pricing, pack, channel, and commercial interventions | Incremental contribution mechanism |
| 23 | Capacity and reliable delivery | Physical and route feasibility |
| 24 | Cash conversion and funding | Full working-capital and liquidity model |
| 25 | Full financial case and capital efficiency | NPV, cash, ROIC, utilisation, assumptions |
| 26 | Compound downside and reverse stress | Failure boundaries and available responses |
| 27 | Portfolio allocation | Correlated exposure and budget constraints |
| 28 | Proposed adaptive decision model | Plain-language diagram and economic objective |
| 29 | One worked example that changes the decision | Transparent comparison to simpler methods |
| 30 | Potentially distinctive findings and validation | Tested evidence, novelty status, limits |
| 31 | Marketing measurement and causal proof | Counterfactual, contribution, and cash |
| 32 | Roadmap across 25 years | Trigger-based stages and dependencies |
| 33 | Governance and evidence gates | Owners, thresholds, monitoring, stop rules |
| 34 | How I can contribute | Accurate background tied to deliverables |
| 35 | 90-day pilot and practical business offer | Measurable work, data, responsibilities |
| 36 | Final decision ask | What leadership should approve, request, or challenge |
| Final main slide | **Thank you** | Place directly before the appendix begins |

The thank-you slide must be after the final substantive main slide and immediately before the first appendix slide. Do not place the appendix before thank you or bury thank you after the technical material. A restrained subtitle can invite questions about the assumptions and the next evidence commitment.

Use headline conclusions that are supported by the slide, with uncertainty where needed. Replace broad claims such as `Africa is the next growth frontier` with specific conditional statements about product, customer, cash, and action.

## 51. Appendix structure and calculation education

The appendix must explain all calculation types used in the deck, all material displayed derived figures, and every model assumption. It must also provide an indexed route to the complete all-country calculation tables. No material number should depend on a hidden spreadsheet cell or unexplained software output.

Organise the appendix into modules:

**A. Reading guide and notation:** evidence classes, currency, units, percentage vs percentage-point changes, time periods, scenario vs probability, confidence vs prediction intervals.

**B. Source and claim register:** direct sources, pinpoints, revisions, conflicts, and slide mapping.

**C. Data dictionary and coverage:** countries, product concordances, panel construction, missing data, and imputation.

**D. Current-deck arithmetic:** reproduce and explain the inherited Nigeria model, its assumptions, and why it is a screening model.

**E. Demand and trade:** equations, estimates, elasticities, tests, and country forecasts.

**F. Climate and physical supply:** crop and asset exposures, scenario translation, adaptation, and dependencies.

**G. Operating and financial calculations:** volume, pricing, yield, cost, capex, tax, working capital, currency, discounting, and valuation.

**H. Risk and scenario calculations:** distributions, dependencies, simulation convergence, stress, CVaR, regret, and scenario sensitivity.

**I. Proposed decision model:** objective, feasible set, solution procedure, worked example, validation, and novelty review.

**J. Marketing evidence:** pilot design, attribution, customer economics, ROMI, cannibalisation, and statistical power.

**K. Country atlas:** every country, scenarios, disposition, evidence, and financial boundaries.

**L. My contribution and work plan:** personal evidence, scope, deliverables, and measurement.

**M. Limitations and update policy:** missing data, unresolved assumptions, research cutoff, model refresh, and decision triggers.

For every calculation explanation, use this order:

1. Business question.
2. Plain-language intuition.
3. Formula.
4. Variable definitions and units.
5. Actual source inputs or clearly labelled illustrative inputs.
6. Step-by-step substitution.
7. Result and sensible rounding.
8. Interpretation.
9. Assumptions and failure conditions.
10. Sensitivity or alternative case.
11. Source IDs, assumption IDs, and workbook/code location.

Keep long equations and diagnostics in the appendix. The main deck should show the decision they support. A calculation appendix can be extensive without making each individual page dense or unreadable.

## 52. Plain-language calculation examples required in the appendix

Create at least the following teaching examples. Use actual data when supportable; otherwise visibly mark them `Illustrative example—not Olam data`. Use one consistent set of input units within each example and recompute all arithmetic.

### Example 1: reported revenue versus derived margin

Explain that EBIT margin equals EBIT divided by revenue, expressed as a percentage. Identify the company, period, reporting currency, and perimeter. Show how rounded revenue can produce a slightly different displayed ratio. Explain why a high revenue-growth percentage can coexist with weaker earnings quality.

### Example 2: demand, attainable capture, and delivered sales

Walk from population and per-person demand to category volume, then accessible customers, attainable capture, capacity, and delivered units. Explain why each step needs different evidence. Include a bottleneck example where demand is larger than supply and the excess cannot be counted as sales.

### Example 3: simple volume and revenue arithmetic

With clearly illustrative inputs of 100,000 saleable tonnes at USD400 net realised price per tonne, show USD40m revenue. If variable cost is USD340 per tonne, show USD6m contribution before fixed costs. With USD2m fixed cash operating cost, show USD4m EBITDA. Explain each unit and why EBITDA is not free cash flow.

### Example 4: conversion yield and by-product value

Show raw input required for saleable output at a specified yield, then reconcile by-products and losses. A 90% output yield means 100 units of the relevant input yield 90 units of the specified output before additional transformations. Do not treat all lost mass as economic waste when saleable by-products exist.

### Example 5: customer economics

Compare two product offers using customer usable yield, rejects, labour or energy, and purchase price. Calculate cost per saleable output or per meal. Then state what evidence is required to infer adoption and Olam value. Do not assume the customer always chooses the cheapest unit cost when cash, trust, and availability constrain choice.

### Example 6: a pack's cash ticket and cost per use

Compare small and large packs with unit price, servings, preparation cost, and cash affordability. Show the difference between a lower cash ticket and lower unit cost. Use local relevant consumption measures and document any serving-size assumption.

### Example 7: percentage change versus percentage points

Show that a margin increasing from 8% to 10% rises by 2 percentage points and by 25% relative to its initial margin. Prevent this confusion in every figure and sensitivity axis.

### Example 8: depreciation, taxes, and free cash

Extend Example 3 with explicitly illustrative depreciation, actual cash-tax treatment, maintenance and growth capex, and working-capital change. Reconcile EBIT, tax, D&A, capex, and free cash flow line by line. Show how cash differs from accounting profit.

### Example 9: working capital release

Use illustrative USD40m annual credit sales and USD34m relevant annual cost/purchases, with a 365-day convention. If DSO improves by 5 days and DIO by 7 days with DPO unchanged, show approximately USD0.548m receivables release and USD0.652m inventory release, for approximately USD1.20m total. Explain why this differs from applying every day improvement to sales.

Show that this is a transition cash release once, followed by maintained balance levels and later incremental changes; it is not a recurring annual profit. Discuss the inventory and purchases basis if the simplified cost base is inappropriate.

### Example 10: the old normalized Nigeria case

Reproduce the current code's additive uplift, FX/commodity leakage, sales-day cash proxy, capital envelope, benefit ramp, NPV, and zero-NPV annual uplift. Label every inherited input and explain each production-model repair. Include the old and new formulation side by side where instructive.

### Example 11: FX and commodity cost without double-counting

Model an imported input with USD price `P` and local currency per USD exchange rate `e`, so local cost is `P×e`. If each rises by 10%, the combined local-currency input-cost change is `1.10×1.10−1 =21%`, before freight and other costs. Explain why simply adding unrelated sales-share penalties can miss cross-effects or count the same procurement base twice.

Then model customer pass-through with timing and elasticity, and distinguish price recovery from retained contribution. State hedge effects only from an actual documented hedging model.

### Example 12: discounting and finite-horizon NPV

Use an illustrative USD5m upfront investment and USD2m annual free cash flow for three years at a 10% discount rate, without terminal value. Show:

`NPV = −5 + 2/1.10 + 2/1.10² + 2/1.10³ ≈ −USD0.0263m`.

Explain that USD6m undiscounted receipts do not automatically make the investment attractive at this hurdle. Extend the example to staged capital and a delayed commissioning case.

### Example 13: inflation and discount-rate consistency

Explain the Fisher relation `(1+nominal_rate)=(1+real_rate)×(1+inflation)` under the relevant simplifying assumptions. Use a numerical example and state that project risk, currency, and financing require additional care. Show equivalent valuations under consistent real and nominal formulations, rather than mixing them.

### Example 14: break-even utilisation

Calculate cash operating break-even volume from fixed cash cost and unit contribution, then compare it with physical capacity. Solve investment break-even separately using the full NPV model. Explain why a plant above operating break-even can still destroy value after capital and cash needs.

### Example 15: scenario weighting and uncertainty

Compare a central planning case, a weighted expected NPV, and a downside quantile. Label judgemental weights. Demonstrate why the weighted average is not the most likely complete future, and why a positive mean does not guarantee solvency under stress.

### Example 16: lower-tail risk and CVaR

Define loss first. Explain that loss VaR is a quantile and loss CVaR summarises losses in the relevant worst tail under the stated distribution and convention. Show a small sorted sample with transparent arithmetic; do not reverse the direction when switching from NPV to loss.

### Example 17: portfolio dependence

Compare two sourcing projects with similar average cash outcomes but different common-exposure risks. Show a correlated harvest or port-shutdown example. Demonstrate why separate countries do not necessarily provide diversification.

### Example 18: causal marketing measurement

Use a transparent treated/control before/after table and calculate the difference-in-differences estimate. Explain what parallel trends and no material spillovers mean in the business context. Then translate eligible incremental sales into contribution and cash, with a clear uncertainty interval if estimated.

### Example 19: incremental ROMI

Define whether ROMI is incremental contribution divided by spend or net incremental contribution after spend divided by spend; report the convention. Do not switch conventions between slides. Include service and trade cost, cannibalisation, and the relevant counterfactual. Compare ROMI with NPV for multi-year interventions.

### Example 20: decision value of a pilot

Use a small two-action, two-state example to show how information can change the investment decision. Calculate expected value before and after a possible study, then subtract study and delay costs. Explain why this value should not be counted again if the adaptive policy already includes the study's effect.

### Example 21: switching threshold and reverse stress

Solve for the FX depreciation, margin decline, utilisation shortfall, or delay at which a project breaches its cash or NPV limit. Show how leadership can monitor that threshold. Reverse stress must identify a plausible failure mechanism, not merely an extreme arbitrary number.

### Example 22: a country comparison that changes the recommendation

Use a small, source-backed or clearly illustrative case in which raw market size favours country A but cash, capacity, resilience, or transferable learning favours country B. Trace the changed recommendation to explicit inputs. State when the choice would reverse.

## 53. Calculation IDs, source lineage, and workbook architecture

Give every displayed derived or modelled figure a stable calculation ID. Link it to input IDs, source IDs, assumption IDs, code or workbook cells, units, scenario, and slide. Do not leave chart labels untracked because they were produced automatically.

Create a spreadsheet with a transparent structure, for example:

| Sheet/module | Content |
|---|---|
| Read_Me | Scope, version, cutoff, conventions, and navigation |
| Sources | Exact URLs, dates, pinpoints, access, and limitations |
| Claims | Claim classifications and slide mapping |
| Countries | Country universe and identifier concordance |
| Products_HS | Product definitions, HS versions, and conversions |
| Raw_Data_Index | Source observations and retrieval files |
| Transformations | Cleaning, units, conversions, and imputation |
| Coverage | Missingness and country/model eligibility |
| Company_Baseline | Correct entity and disclosed operating facts |
| Demand_Model | Parameters, data, diagnostics, and forecasts |
| Trade_Model | Flow data, barriers, and counterfactuals |
| Climate_Exposure | Physical and transition assumptions |
| Scenario_Inputs | Coherent drivers and dependency rules |
| Assumptions | Chosen inputs, owners, justification, ranges |
| Unit_Economics | Customer/product/route economics |
| Working_Capital | Inventory, receivables, payables, seasonality |
| Financing_FX | Currency, rate, hedge, and funding conventions |
| Country_Financials | Annual incremental cash for each case |
| Sensitivity | One- and two-variable boundaries |
| Simulation | Sampling specification and run summaries |
| Portfolio | Constraints, allocations, risk, and alternatives |
| Marketing_Pilots | Counterfactual, outcomes, power, and costs |
| Information_Value | Research options and decision improvement |
| Decision_Triggers | Invest, wait, change, stop, and exit rules |
| Chart_Data | Exact tables feeding every deck chart |
| Calculation_Audit | Reproducible figure-level explanations |
| Limitations | Unresolved evidence and update needs |

Use formula cells where feasible, named input ranges, visible assumptions, appropriate number formatting, and checks. Separate input, calculation, and output areas. Avoid macros or opaque plugins unless necessary and documented.

If complex estimations or simulations run in code, the workbook must display the relevant input files, parameter outputs, execution version, results, and interpretation, while the code provides full reproduction. Export cached results with clear timestamps and do not label them as live formula recalculations.

All-country scale may require efficient tables and code rather than thousands of duplicated hand-built sheets. Use a country selector and structured data tables while keeping each row's lineage available.

## 54. Charts that reveal decisions

Use exact chart data and appropriate chart types. Suggested visual outputs include:

- Country-product-entry-mode opportunity matrix.
- Evidence coverage map with separate missing-data encoding.
- Demographic and income-demand fan charts.
- Product demand versus feasible delivered capacity.
- Origin-destination flow or corridor dependency visual.
- Climate hazard and business exposure maps at meaningful resolution.
- Customer economics comparison by offer or segment.
- Price/pack cash-ticket versus cost-per-use comparison.
- Contribution and cash waterfall from an intervention.
- Annual free-cash-flow and working-capital profile.
- NPV sensitivity tornado and two-variable switching surface.
- Scenario comparison with uncertainty bands.
- Portfolio common-exposure or concentration map.
- Expansion frontier under capital and risk constraints.
- Pilot learning and decision threshold chart.
- Trigger-based 25-year roadmap.

Do not use decorative maps to imply quantified country insight. A map must have a defined measure, period, legend, units, geographic treatment, and source. Missing values must not be displayed as low values.

Avoid axes, colours, or rounding that conceal downside. Show zero where its omission would mislead. Use colourblind-accessible distinctions and readable labels. A forecast line should be visually distinguished from observed history and official projections from model extensions.

Do not use generated imagery for exact diagrams, charts, data maps, or scientific information. Use reproducible charts and native diagrams. Decorative agriculture imagery should be restrained and must not substitute for evidence.

## 55. Slide design and speaker notes

Use a disciplined executive visual system with consistent typography, spacing, colours, footnotes, and evidence labels. Each slide should make one clear decision-relevant claim, support it with evidence, and state its implication. Dense technical tables belong in the appendix.

Use native editable charts, tables, and text where practical. Do not make the deck a sequence of flattened screenshots. Check every exported slide at realistic viewing size for clipping, tiny text, crowded labels, missing fonts, contrast, broken links, and inaccessible source footnotes.

For each substantive main slide, provide speaker notes containing:

1. What the slide means.
2. What evidence supports it.
3. The important assumption or limitation.
4. How the conclusion changes under an adverse case.
5. The likely CEO/CFO challenge and a concise answer.
6. The relevant source and appendix references.

Keep main-slide caveats short but material. Do not hide an assumption that reverses the recommendation in speaker notes or a footnote that no one can read.

Prepare an executive reading version and an oral presentation version only if the difference improves usability. Both must share the same data and conclusions, with version names that prevent confusion.

## 56. Quality controls for accounting and physical consistency

Build automated checks where they are meaningful. At minimum verify:

- Correct country-universe coverage and no duplicate identifiers.
- Product and HS concordance with explicit version treatment.
- Consistent dates and no future information in historical backtests.
- Unit and currency consistency.
- Revenue, costs, EBIT, tax, and cash reconciliation.
- Inventory, procurement, production, and deliveries balance physically.
- Capture within eligible demand and delivered sales within feasible supply.
- Capacity and utilisation within feasible operating limits.
- No duplicate working-capital release or network synergy.
- Consistent scenario drivers across dependent modules.
- Scenario weights sum correctly if used.
- Valid covariance/dependency specification.
- Simulation outputs agree with the deterministic model at fixed inputs.
- No probability claims from uncalibrated stress ranges.
- Source and calculation IDs resolve for every material displayed number.
- Thank you directly precedes the appendix.
- Workbook, code, charts, deck, and country atlas agree.

Run accounting, physical, and numerical checks separately from substantive challenge. Passing a software test does not prove a business assumption true. Report what was checked and any failed or unresolved checks.

Do not invent a count such as `100 rigorous reviews` without actual distinct, documented work. Prefer a concise validation log describing material findings and their resolution.

## 57. Red-team review: challenge the case before the CEO does

Conduct a substantive review from these perspectives:

**CEO:** What changes strategy? Which capability compounds? Why these markets? What remains useful if the central forecast is wrong?

**CFO:** Are cash, tax, currency, capital, and working capital consistent? Is terminal value doing too much work? What funding is required under stress?

**Treasury:** Where are FX, commodity, counterparty, collateral, and liquidity exposures? Are risk charges or hedges counted twice?

**Country leader:** Are local rules, relationships, channels, execution, and customer behaviour represented? What does headquarters misunderstand?

**Category leader:** Are demand, substitutes, quality, formulation, technical service, and competitive dynamics credible?

**Procurement and operations:** Can supply and service deliver the proposed demand? What happens to capacity and inventory in the peak season?

**Climate and sustainability expert:** Are physical pathways, geographic exposures, adaptation limits, claims, and rights constraints defensible?

**Econometrician:** Are the coefficients identified? Is the model overfit? Does validation support the transfer and horizon claims?

**Marketing measurement expert:** Is the lift incremental? Are availability, seasonality, price, stock loading, and cannibalisation controlled?

**Sceptical investor:** What must go right? What invalidates the case? Why does doing nothing, partnering, or waiting not dominate?

Record the objection, supporting evidence, whether it changes the recommendation, correction, and unresolved uncertainty. A credible unresolved issue should remain visible rather than being explained away rhetorically.

## 58. Specific questions the finished deck must answer

Answer these clearly, with supporting appendix references:

1. Which five to ten country-product-entry-mode opportunities deserve the next serious diligence effort, and why?
2. Which current operations should deepen before new-country entry?
3. Which countries matter primarily as origins or corridors rather than consumer markets?
4. Where is market growth unattractive after financing and delivery constraints?
5. Which opportunities remain viable across the plausible scenario set?
6. What changes if population grows but real household affordability deteriorates?
7. What changes in aging or declining populations with high purchasing power?
8. Where does climate create a new sourcing option, and where does adaptation fail?
9. Which apparent diversification gains disappear because of common origins, weather, or ports?
10. Where does trade fragmentation favour local processing, and where does it destroy the economics?
11. Which health or nutrition changes have purchase evidence rather than fashionable narratives?
12. Which customer problem can Olam solve profitably with a measurable advantage?
13. What price, pack, service, or channel mechanism improves both customer economics and Olam cash?
14. Where is marketing the binding constraint, and where is supply, service, or credit the binding constraint?
15. Which capital commitments should be staged, partnered, deferred, or rejected?
16. What evidence would overturn each major recommendation?
17. What is the liquidity need in the worst credible combined stress?
18. What proportion of value depends on long-run, terminal, or uncertain assumptions?
19. Which parameters deserve immediate research because they change a decision?
20. What measurable work can I perform in the first 90 days?
21. How will the decision model be maintained and challenged after the deck is delivered?
22. What is actually distinctive about the proposed analytical integration, and what is established prior work?

## 59. Strategic hypotheses to test without forcing the answer

Investigate the following possibilities. Do not assume that the evidence will support them:

- Customer cash constraints may matter more than national category size for a particular pack or route.
- A reliably delivered staple may outperform a heavily advertised but intermittently available alternative.
- Technical service that improves customer output economics may create durable commercial value beyond awareness.
- Working-capital improvement may change the expansion ranking more than revenue growth.
- Local processing can hedge some policy or freight exposure while creating new raw-input, financing, or water exposure.
- A small, transferable pilot may change many later allocation decisions more than a large market launch.
- A sourcing portfolio diversified by country may still be concentrated by climate regime or shipping corridor.
- Health-related product opportunities may require price and distribution innovation more than premium positioning.
- Trade disruption may create temporary spreads that do not justify permanent assets.
- A low-NPV project in isolation may be useful as backup network capacity, but only if the avoided-loss mechanism is measurable and consolidated.
- Better information can be valuable while a resulting decision is to stop spending.
- A 25-year strategy may be most effective when it defines adaptive rules rather than a fixed country entry timetable.

For every tested hypothesis, report the evidence, competing explanation, model or test, result, uncertainty, business implication, and falsifier. Negative results are legitimate outputs.

## 60. Modelled financial cases for every scenario and country

For each country, present a scenario table with the relevant product and entry opportunity, central and downside economics, assumptions, and recommendation. Provide full annual financial models for meaningful proposed investments and threshold models for preliminary cases.

Use three maturity labels:

**Investment-grade candidate:** sufficient company/market evidence and Finance-reviewed mechanics to enter formal diligence; still not management approval.

**Provisional model:** coherent scenario calculations using documented proxies and assumptions; data needed before capital commitment.

**Threshold-only case:** insufficient support for a credible valuation, but a clear break-even boundary and evidence plan.

All three categories can contain rigorous calculations. The distinction is evidence strength, not whether a spreadsheet produces a number.

For unsupported country inputs, calculate ranges for volume, margin, utilisation, and capex from transparent comparables or structural bounds. Show how recommendations change across those ranges. Do not conceal a weak case behind a single assumed market share and discount rate.

For legally or physically infeasible opportunities, state that the financial case is not actionable and identify the barrier. Do not assume that a sufficiently high modelled NPV authorises entry.

Compare the project's financial case with the counterfactual under the same world. Do not compare an optimistic investment future with an unrelated pessimistic no-investment future to create artificial incremental value.

## 61. Monitoring and the continuing intelligence system

Design a maintainable system after the presentation. Define source refresh cadence, data owner, model owner, editorial reviewer, and decision-review cadence. Volatile indicators may require daily or weekly monitoring; demographic or long-run climate inputs may update much less often.

Monitor a small set of decision-relevant triggers for each priority case: demand/price, customer repeat, net contribution, stockout/service, corridor performance, working capital, financing, policy, climate, supplier continuity, and competition.

Each alert should state the observation, source, expected economic consequence, uncertainty, recommended investigation, and threshold action. Avoid a dashboard that creates noise without changing decisions.

Version assumptions and forecasts. Track forecast error and decision outcomes. Define re-estimation, model replacement, and retirement criteria. A model must be able to lose authority when its assumptions or performance fail.

Preserve the distinction between external signal and internal operational proof. A national price estimate, programme reach, or continent-wide market projection should trigger investigation; it cannot independently prove a particular Olam customer or route outcome.

## 62. Required deliverables

Deliver a complete, coherent package:

1. Refined editable PowerPoint deck with the main presentation, thank-you slide immediately before the appendix, and a navigable technical appendix.
2. A PDF rendering checked slide by slide.
3. Executive decision memo of approximately two to four pages.
4. Complete all-country atlas with country-product-scenario dispositions and evidence status.
5. Financial and analytical workbook with formulas, assumptions, source lineage, and chart data.
6. Reproducible statistical and scenario code, environment specification, deterministic seeds where relevant, and instructions.
7. Source book with exact URL and page/table/section attribution.
8. Claim and assumption registers.
9. Calculation appendix with plain-language explanations and exact reproduction paths.
10. Model-validation and red-team review report.
11. Prior-art and originality assessment for the proposed integrated model.
12. A 90-day pilot charter and a concise description of my contribution.
13. A limitations and missing-data memo ranked by decision consequence.
14. A change log explaining substantive improvements from the starting deck.

Use a coherent naming convention and version. The executive deck should remain usable even when the technical package is extensive. If the country atlas or full calculation appendix is too large for a practical PPTX, provide it as an explicitly indexed companion appendix, with main-deck and technical-appendix links and calculation IDs. Do not omit required country or calculation coverage to fit an arbitrary slide count.

If the environment cannot produce a requested file format, say exactly which deliverable is unavailable and provide the completed source content and reproducible build instructions. Do not claim to have generated or tested files that do not exist.

## 63. Execution sequence and checkpoints

Execute in stages and preserve reviewable intermediate results. Do not stop at an outline or substitute a list of recommended sources for actual research.

**Stage 1 — baseline inspection:** read the current deck, underlying model, portfolio evidence, and any supplied files. Identify the current version, entity perimeter, strong ideas, weak claims, and incomplete calculations.

**Stage 2 — source and scope:** establish cutoff, country universe, products, legal perimeter, official source map, and claim/source schema. Reverify decision-critical company facts.

**Stage 3 — data spine:** retrieve and harmonise country, product, trade, demographic, macro, climate, and relevant customer evidence. Publish coverage and missingness before fitting models.

**Stage 4 — screening:** define feasible country-product-entry-mode cases, hard gates, customer needs, capabilities, and provisional economic boundaries.

**Stage 5 — estimation:** build benchmarks, fit justified models, validate them, reject unsuitable specifications, and document what remains assumed.

**Stage 6 — scenarios:** construct coherent macro, demographic, climate, trade, and execution paths; model dependencies and long-run extensions.

**Stage 7 — financials:** build incremental cash, tax, currency, capex, working capital, liquidity, valuations, and switching thresholds. Validate physical and accounting identities.

**Stage 8 — portfolio and adaptive policy:** compare entry modes and timing, constraints, robust allocations, learning, and options. Prove where the proposed integration changes decisions.

**Stage 9 — marketing and contribution:** design country-specific commercial propositions, causal measurement, my operating role, and the first 90-day test.

**Stage 10 — deck and appendix:** write the executive narrative, create charts from the model spine, build all calculations and source references, and place thank you immediately before the appendix.

**Stage 11 — independent challenge:** perform substantive red-team review, resolve contradictions, assess novelty, and document remaining limitations.

**Stage 12 — production verification:** regenerate deck/workbook from final inputs, render every slide, reconcile every material displayed number, test links, and package the deliverables.

At each checkpoint, state completed work, material findings, evidence gaps, and what the next stage resolves. Seek additional user information only when essential missing context changes an irreversible action or cannot be handled with clearly labelled provisional work. Continue all independent research that is already authorised.

## 64. Handling practical limits without weakening the result

This is a large research programme. Allocate effort by decision impact, not by equal narrative length per country. Use global official datasets for broad coverage, regional and product models for comparability, and deeper local diligence for priority decisions and anomalous results.

All-country coverage is mandatory; equally deep internal data for every country may not be available. State that difference explicitly. Automate repetitive calculation and reporting while keeping interpretation and quality review substantive.

Do not improvise facts to fill a page. Where a source is inaccessible, seek another legitimate primary source or show the missing evidence and its consequence. Do not bypass authentication, access restrictions, or licensing.

Do not spend all effort on formatting before the analytical spine is credible. Conversely, do not deliver an unreadable technical dump and call it CEO-ready. Both analytical validity and communication must pass.

If context limits require multiple sessions, save a research manifest, current assumptions, source IDs, model version, completed country list, unresolved issues, and next action. Continue from the actual checkpoint rather than restarting or losing earlier evidence.

## 65. Final acceptance criteria

The package is complete only when:

- The starting deck was actually inspected and its material weaknesses were addressed.
- Company ownership, product scope, financial perimeter, and relevant current disclosures are reconciled.
- Every country in the defined universe is present and has a reasoned disposition.
- Every meaningful country-product case has conditional scenario economics or a clearly labelled provisional/threshold case.
- The official forecast horizon and the modelled 25-year extension are visibly distinct.
- Regression and statistical results were actually executed, validated, and reproduced where claimed.
- Causal marketing claims are supported by appropriate identification or labelled as hypotheses.
- Cash, working capital, tax, capital, currency, discounting, and physical supply are coherent.
- Dependence, compound stress, and liquidity are represented where they change decisions.
- No uncalibrated simulation frequency is sold as a probability of success.
- Every material factual claim has a reliable source and an exact attribution.
- Every material assumption is visible, justified, owned, and tested.
- Every displayed derived or modelled number has a calculation ID and an intelligible appendix explanation.
- Each selected Nobel or mathematical method has correct attribution, a clear purpose, and stated limits.
- The proposed integrated model is benchmarked and its originality is characterised honestly.
- My contribution uses accurate portfolio evidence and a measurable, realistic work plan.
- The thank-you slide sits directly before the appendix.
- Deck, workbook, code, country atlas, source register, and decision memo agree.
- The final ask is concrete and identifies what leadership should decide now.
- Important unresolved questions remain visible instead of being replaced with false certainty.

## 66. The final instruction

Produce a strategy that a serious CEO can use to make better expansion and marketing decisions under uncertainty. Make the logic ambitious, the evidence precise, the calculations transparent, and the recommendations conditional on what is actually known.

The strongest possible result is not a prediction that cannot be questioned. It is a coherent explanation of **which actions create value, which assumptions matter, which futures threaten the business, which capabilities improve many futures, and what the company should learn before committing its next unit of capital**.

Begin with the actual deck audit and source verification. Continue through the complete research, modelling, financial, presentation, and validation programme. Deliver the finished artifacts and a concise account of the findings, limitations, and decisions they support.

# END MASTER PROMPT

---

## Preparation references and provenance

These references ground the brief's starting point and methodological requirements. The executing researcher must retrieve the exact sources needed for each final claim and refresh time-sensitive material. This list does not claim that a full global research or financial modelling exercise has already been completed.

- Deployed portfolio project: `manash-protim-deori`, deployment `dpl_EtWUXjaVRgrQy3PwdUwkJ2UbMcFg`, production source commit `13f7393a1c69350c3cfa89bea1baa49cf08d042c`, verified through the connected Vercel project/deployment record. Direct protected-page rendering was denied; the matching source files were inspected through GitHub.
- Existing deck source: `https://github.com/ManashProtimDeori/Manash-Protim-Deori/blob/13f7393a1c69350c3cfa89bea1baa49cf08d042c/src/data/olamAfricaStrategy.ts`.
- Existing normalized screening model: `https://github.com/ManashProtimDeori/Manash-Protim-Deori/blob/13f7393a1c69350c3cfa89bea1baa49cf08d042c/src/lib/olamNigeriaDecisionModel.ts`.
- Portfolio-listed background: `https://github.com/ManashProtimDeori/Manash-Protim-Deori/blob/13f7393a1c69350c3cfa89bea1baa49cf08d042c/src/data/resume.ts`.
- Olam Agri About page, including product scope and the visible ownership-text conflict: `https://www.olamagri.com/about-us`.
- OECD/FAO (2026), *OECD–FAO Agricultural Outlook 2026–2035*: `https://doi.org/10.1787/47874669-en`; publication and methodology links appear in Section 9. This is an official medium-term baseline and methodology reference, not a 2051 Olam valuation.
- IPCC AR6 WGII, Chapter 5, *Food, Fibre and Other Ecosystem Products*: `https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-5/`.
- Official Nobel background for time-series methods: `https://www.nobelprize.org/prizes/economic-sciences/2003/popular-information/` and Granger's prize lecture: `https://www.nobelprize.org/prizes/economic-sciences/2003/granger/lecture/`.
- Official Nobel scientific background on long-run growth and climate–economy integration: `https://www.nobelprize.org/uploads/2018/10/advanced-economicsciencesprize2018.pdf`.
- Official Nobel source for Imbens's causal-inference background: `https://www.nobelprize.org/prizes/economic-sciences/2021/imbens/biographical/`. Implementation requires the relevant primary method papers, not biographical attribution alone.

The illustrative arithmetic in the prompt is provided to specify educational appendix requirements. It is not an estimate of Olam's undisclosed country economics. The proposed adaptive model is an authored planning synthesis whose usefulness and novelty require the validation commissioned above.

