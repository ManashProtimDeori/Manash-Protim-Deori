# Olam Agri 2026–2051 — decision-grade completion gates

**Continuation checkpoint:** 2026-10-08 | **Base commit:** `d8c3ef50e2c69a9680b7f7e27a37e3299b7ca492` | **Status:** public-evidence research package published; investment decision **not yet validated**.

This register translates the existing 775-block audit and E1–E6 missing-evidence register into *testable release gates*. It does not claim the missing underlying evidence exists. Read alongside `requirements-audit.csv`, `limitations-and-missing-data.md`, `validation-and-red-team.md`, `input-register.csv`, `claim-register.csv` and `olam-global-model-v1.xlsx`.

## Rule for every material country–product–entry-mode recommendation

A proposal is **Decision ready** only when all six checks are PASS, with an identifiable accountable reviewer and supporting evidence URL, dated data room document, or signed approval. Otherwise assign **Explore**, **Pilot**, **Defer**, or **Reject**, never unconditional Invest. A 195-country table is a discovery/threshold atlas, not 195 investment-grade business cases.

| Gate | Testable proof to attach | Responsible reviewer | What fails closed |
|---|---|---|---|
| E1 — paid demand and unit margin | Signed/traceable orders or experimentally measured paid repeat; net realized prices; product-specific returns, losses, costs and credible competitor offers; reconciliation from units to contribution | Country/category lead plus Finance | No country-specific NPV ranking or committed sales forecast |
| E2 — cash, currency and taxes | 12–24 months monthly AR/AP/inventory, peak collateral and credit terms; cash tax by legal entity; hedge, FX basis, local and USD bridges; treasury liquidity signoff | Treasury, Tax, CFO | No fundability, discounting or ROIC signoff |
| E3 — legal and physical deliverability | Exact contracting entities; license/tariff/HS and sanctions review; contracts/rights; capacity, uptime, yield, route and capex evidence; HSE assessment | Legal, Engineering, Operations | No deployment commitment even with positive modeled NPV |
| E4 — causal marketing economics | Pre-registered controlled test; units randomized; contamination/ICC and power; verified incremental contribution, not engagement; repeat, spillovers and full implementation cost | Independent measurement lead | No causal lift or scalable marketing ROI claim |
| E5 — climate, sustainability and correlated exposure | Geocoded farms/assets/basins; hazard horizons, adaptation cost, enforceable sourcing rights; shared supplier, port, and correlated-tail assessment | Sustainability, Supply Chain, Risk | No quantified resilience premium or climate-adjusted approval |
| E6 — defensible product market access | Matched product/HS trade, delivered competitor economics, observed price/quantity or household/category demand, current tariff/NTM review | Strategy/data steward and Legal | No calibrated demand/gravity elasticity or market-share capture |

## Acceptance tests at the number and exhibit level

1. **Citation fidelity:** Every public quantitative headline resolves to a source URL, publication date, named dataset/table (and PDF page if applicable), retrieval date, geography, unit, transformation and formula/input IDs. Mark unsupported or not fully traceable figures as conditional; do not fill missing URLs or pages with guesses.
2. **Scope integrity:** Legal entity, crop/product, HS code, location, customer and entry mode align across title, speaker notes, data tables, workbook and dashboard; do not use generic imports as attainable Olam sales.
3. **Model consistency:** Revenue = *deliverable paid units × collected price*; contribution captures physical losses, logistics and channel cost; operating cash reconciles tax, capex, NWC and seasonality; financing need uses peak **monthly** deficit, not annual NPV.
4. **Scenario integrity:** Base and five other worlds are stresses, not probabilities. Publish assumptions and correlations. Any claimed expected NPV requires separately defended scenario likelihoods and a sensitivity to likelihood choice.
5. **Real versus nominal currency:** Declare valuation currency, base-year purchasing power, discount-rate basis and FX conversions. Never discount real cash with nominal WACC or double-count FX costs.
6. **Long horizon:** Separate observed historical data, official projections and author extrapolations to 2051; run alternative terminal/decline paths and horizon truncation; identify the share of NPV due to years after 2036 and any closeout recovery.
7. **Governance:** For each material country decision, store one accountable sponsor, six gate decisions, open conditions, last review date and rollback trigger; prior to financing obtain Legal/Treasury/Finance approvals.
8. **Deck QA:** Verify 98/98 slides and accompanying PDF are legible at standard presentation size; check no source label or warning gets clipped. The automatic 0-warning geometry check is not a substitute for human view/accessibility review.
9. **Artifact parity:** Deck, PowerPoint, PDF, country atlas, `.xlsx`, web case study and download manifest should refer to the same revision and consistent definitions; re-run numerical and native layout validators after substantive edits.
10. **Release language:** Clearly separate *reported fact*, *author assumption*, *illustrative arithmetic*, *scenario*, *hypothesis*, *causal estimate*, and *decision*. Suppress any claim that unobserved Olam margins, market capture, causal effects or 25-year forecasts have been validated.

## Prioritized execution backlog

| Priority | Work package | Minimum acceptance artifact | Dependency | Current disposition |
|---|---|---|---|---|
| P0 | Certify exact live slide/file paths and presentation/download experience | Production URL review, route and download checks, link integrity screenshot/receipt | Access to production deployment | **Pending live authenticated verification** |
| P0 | Validate six decision gates with actual country evidence | Signed six-gate scorecard for each proposed Invest recommendation | Olam internal data and experts | **Blocked by unavailable source evidence** |
| P0 | Reconcile company scope, capabilities and accounting perimeter | Entity-to-product/asset rights map approved by Legal and Finance | Internal legal/company documents | **Blocked** |
| P0 | Independently challenge 25-year finance | Monthly liquidity stress and signed tax/WACC/FX/capex input sheet | Treasury/CFO and market data | **Blocked** |
| P1 | Extend empirical demand and trade estimates only where identifiable | Source-vintage, train/holdout, coefficients, diagnostics, failure criteria | Category panel and HS data | **Data acquisition required** |
| P1 | Local-market commercial experiments | Pilot charter with budget, pre-analysis plan, MDE/power and clean control | Country access and baseline variance | **Design only** |
| P1 | Asset-level climate and correlated shock model | Geocoded hazard evidence, adaptation cost and risk owner approval | Site, crop and supplier records | **Blocked** |
| P1 | Source/figure traceability adversarial spot check | Audited claim sample with exact source/page/calculation/slide mapping | Existing source and calculation registers | **Can proceed independently** |
| P2 | Commission independent subject expert review | Signed review and disposition of each red-team objection | Reviewers and budget | **Pending** |
| P2 | Obtain commercial approval before CEO circulation as investment plan | Approved confidence labels and decision boundary on cover, memo and web | P0/P1 outcomes | **Conditional** |

## Suggested immediate validation sequence

1. Confirm Vercel production serves the Olam strategy route and each static download; record the exact public URL instead of assuming a slug.
2. Sample at least 25 material numeric claims covering demography, climate, trade, valuation, customer economics and scenario mechanics. For each: trace slide → claim ID → input → source/date/page → formula. Log failures explicitly, and correct all systemic failures.
3. Test 18 mode/world cases for accounting identities and sign/sensitivity sanity. Specifically disclose the managed owned-plant negative NPV before any persuasive investment summary.
4. Review country dispositions for prohibited implied precision (country-specific NPV, market capture, causal marketing return or probability not supported by data).
5. Review the thank-you-before-appendix sequence and visibility of methodological/evidence warnings.
6. Republish only after `npm run build`, `python scripts/olam-verify.py --native` and native artifact validation pass *in the actual build environment*. Do not claim these have been re-run from this checkpoint.

## Change-control rules

- **Do not overwrite** the original prompt, source registers, baseline Nigeria case, financial workbook, original downloads, or deployed deck without versioning and regenerated receipts.
- **Do not** manufacture missing data or relabel illustrative economics as Olam results. Record `UNKNOWN` plus consequence, requested evidence, owner and deadline where input is absent.
- **Do not** infer likelihoods from six scenarios or forecast years 2036–2051 from a single trend line with false precision.
- Audit/checkpoint changes should be committed separately from recalculation or redeployment. This file is a checkpoint and acceptance specification, not a new statistical estimate.

**Release decision as of this checkpoint:** presentation package exists; numerical/layout checks were reported in the repository; company-grounded investment-grade approval is **NOT ESTABLISHED**.
