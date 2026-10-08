# Calculation appendix and exact reproduction paths

Version 1.1.0 | Audited 8 October 2026 | Independent public-data research

## C-E01 / Reported margin

Formula: EBIT / revenue × 100.

Substitution: 703.7 / 28,666 × 100 = 2.4548%.

Result: 2.45% derived EBIT margin. Units: percent EBIT/revenue. Input IDs: I-E01. Sources: CO_AR. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 4;39. Limit: Using rounded revenue of USD28.7bn gives 2.4519%; keep the same entity, period and currency.. Sensitivity: Revenue can grow while margin falls..

## C-E02 / Demand to delivered sales

Formula: Population × demand per person × access × capture, capped by delivery.

Substitution: 1m people × 0.1t × 50% access × 20% capture = 10,000t orders; min(10,000, 8,000, 7,000) = 7,000t..

Result: 7,000 delivered tonnes. Units: persons, tonnes/person, fractions, tonnes. Input IDs: I-E02. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 23;40. Limit: Demand, access and capture are chosen inputs. Unmet orders cannot count as revenue.. Sensitivity: If route capacity reaches 9,000t, plant capacity still caps delivery at 8,000t..

## C-E03 / Volume, revenue and EBITDA

Formula: Volume × net price; volume × unit cost; contribution less fixed cash cost.

Substitution: 100,000t × USD400/t = USD40m revenue; costs = USD34m; contribution = USD6m; less USD2m fixed cost = USD4m EBITDA..

Result: USD4m EBITDA. Units: tonnes, USD/tonne, USD. Input IDs: I-E03. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 41. Limit: EBITDA omits cash tax, capital spending and working cash. These are chosen saleable-volume and net-price inputs.. Sensitivity: A USD10/t price change at unchanged volume changes EBITDA by USD1m..

## C-E04 / Yield and by-products

Formula: Input = main output / yield; output, by-product and loss sum to input.

Substitution: 100,000t output / 90% yield = 111,111t input; 6% by-product = 6,667t; 4% loss = 4,444t..

Result: 111,111 tonnes of input. Units: tonnes, yield fractions, USD/tonne. Input IDs: I-E04. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 42. Limit: By-products may earn revenue. Their quality, price and conversion cost need evidence.. Sensitivity: At 95% main yield, input is 105,263t. Reconcile the remaining mass separately..

## C-E05 / Customer cost per usable output

Formula: Purchase and preparation cost / usable output.

Substitution: Offer A: (USD30 + USD5) / 45kg = USD0.7778/kg. Offer B: (USD32 + USD4) / 48kg = USD0.7500/kg..

Result: B costs 3.57% less per usable kg. Units: loaves/bag, money/loaf, money/bag. Input IDs: I-E05. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 8;21;43. Limit: Chosen flour-like inputs. Paid adoption also depends on cash, trust and availability.. Sensitivity: If B produces only 45kg, cost rises to USD0.80/kg and reverses the advantage..

## C-E06 / Pack cash and cost per meal

Formula: Cash ticket differs from cost per use; assume 100g dry input per meal.

Substitution: Small: (₦600 + ₦100 prep) / 5 meals = ₦140/meal. Large: (₦2,000 + ₦400 prep) / 20 meals = ₦120/meal..

Result: Small cash ticket ₦600; large pack 14.29% cheaper per meal. Units: kg/pack, money/pack, money/kg. Input IDs: I-E06. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 8;22;44. Limit: Chosen Nigerian cash units and serving size. The large pack needs more upfront cash.. Sensitivity: Large purchase cash is 3.33 times the small pack, despite lower cost per meal..

## C-E07 / Percent versus percentage points

Formula: Distinguish absolute percentage-point change from relative percentage change.

Substitution: 10% − 8% = 2 percentage points. Relative increase = (10 − 8) / 8 = 25%..

Result: 2 percentage points; 25% relative increase. Units: percent and percentage points. Input IDs: I-E07. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 45. Limit: A margin change is not the same measure as revenue growth.. Sensitivity: On USD100 revenue, profit rises from USD8 to USD10..

## C-E08 / Profit to free cash

Formula: EBIT less tax, plus D&A, less maintenance/growth capex and change in NWC.

Substitution: EBITDA 4 − D&A 1 = EBIT 3; tax = 0.75. FCFF = 3 − 0.75 + 1 − 0.6 − 0.4 − 1 = 1.25 (USDm)..

Result: USD1.25m free cash flow. Units: USDm, years, tax fraction. Input IDs: I-E08. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 46. Limit: Assume no prior tax losses, 25% tax, USD0.6m maintenance and USD0.4m growth capex.. Sensitivity: If NWC does not increase, this period’s cash rises by USD1m..

## C-E09 / Working-capital release

Formula: Revenue basis for receivables; cost basis for inventory; DPO unchanged.

Substitution: AR: USD40m × 5 / 365 = USD0.547945m. Inventory: USD34m × 7 / 365 = USD0.652055m. Total = USD1.20m..

Result: USD1.20m once-only cash release. Units: USDm, annual days. Input IDs: I-E09. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 24;47. Limit: All sales are credit in this example. The transition release is not recurring annual profit.. Sensitivity: One further DSO day releases USD0.109589m at this sales base..

## C-E10 / Inherited Nigeria screen

Formula: Inherited additive uplift and sales-day proxy; ramped three-year DCF.

Substitution: 100 × (2% + 2%) × 8% + 0.7 + 0.6 − 0.4 − 0.45 − 0.30 = 0.47; 100 × 7 / 365 = 1.9178 (NGNbn)..

Result: NPV −NGN2.0645bn; zero-NPV uplift NGN1.9928bn/year. Units: NGN billion; percent; years. Input IDs: I-E10. Sources: BASELINE. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 20;48. Limit: NGN4.2bn initial capital; 28% hurdle; 50/80/100% benefit ramp. Tax, replacement and actual cash bases are absent.. Sensitivity: Repair procurement FX overlap, AR/inventory/AP, capex, tax and currency before a production decision..

## C-E11 / FX and commodity interaction

Formula: Local imported cost = USD commodity price × local currency per USD.

Substitution: USD100 × ₦1,000/USD = ₦100,000. With both factors +10%: USD110 × ₦1,100 = ₦121,000, or +21%..

Result: 21% combined input-cost increase. Units: money units; FX/input-cost fractions. Input IDs: I-E11. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 22;49. Limit: Both shocks hit the same procurement base. Hedge effects need documented contracts.. Sensitivity: Chosen 70% cost pass-through recovers 14.7% initially; weaker customer volume may reduce retained margin..

## C-E12 / Finite NPV and commissioning

Formula: Discount each dated free cash flow; do not compare only undiscounted totals.

Substitution: NPV = −5 + 2/1.10 + 2/1.10² + 2/1.10³ = −0.0263 (USDm)..

Result: NPV −USD0.0263m. Units: USDm, years, annual real rate. Input IDs: I-E12. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 50. Limit: No terminal value. Staging USD3m now and USD2m in year 1, with cash in years 2–4, gives −USD0.2966m.. Sensitivity: Paying USD5m now with a one-year cash delay gives −USD0.4784m..

## C-E13 / Real and nominal consistency

Formula: Consistent inflation of both cash and discount rate preserves NPV.

Substitution: (1.10 × 1.05) − 1 = 15.5% nominal hurdle. Year 1: 2.10 / 1.155 = 2.00 / 1.10..

Result: Real and nominal three-year NPVs both −USD0.0263m. Units: annual nominal/real/inflation fractions. Input IDs: I-E13. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 51. Limit: Nominal cash grows by 5% inflation and is discounted at 15.5%. Project and currency risk require separate care.. Sensitivity: Mixing nominal cash with a real hurdle overstates value..

## C-E14 / Operating versus investment break-even

Formula: Operating break-even pays fixed cash cost; investment break-even also pays capital.

Substitution: USD2m / (USD400 − USD340 per tonne) = 33,333t; / 150,000t capacity = 22.22% utilization..

Result: Operating 33,333t; investment boundary 104,862 initial order tonnes. Units: tonnes/year; USD/tonne; USDm. Input IDs: I-E14. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 52. Limit: Full NPV includes ramp, tax, replacement, working cash and the finite horizon.. Sensitivity: Operating above 22.22% utilization can still give negative investment NPV..

## C-E15 / Scenario weights are not likelihood

Formula: Weighted average = sum of chosen weight × conditional NPV.

Substitution: Chosen NPVs [10, −8, 2] and weights [0.5, 0.3, 0.2]: 5 − 2.4 + 0.4 = USD3m..

Result: USD3m judgement-weighted mean. Units: USDm; chosen scenario weights. Input IDs: I-E15. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 53. Limit: The central USD10m case is not a calibrated most-likely future. The adverse loss can breach funding.. Sensitivity: If adverse weight is 0.5 and central weight 0.3, the mean becomes −USD0.6m..

## C-E16 / Loss-tail VaR and CVaR

Formula: Loss = max(0, −NPV); a quantile differs from the mean of a chosen tail.

Substitution: NPVs [−8, −4, 0, 2, 6] imply losses [0, 0, 0, 4, 8]. Nearest-rank VaR80 = 4; worst-20% CVaR80 = 8 (USDm)..

Result: Loss VaR80 USD4m; tail CVaR80 USD8m. Units: USDm loss; chosen quantile. Input IDs: I-E16. Sources: CVAR. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 54. Limit: Declare discrete tie treatment: mean(loss ≥ VaR) would be USD6m here, a different convention.. Sensitivity: Stress code uses mean(loss ≥ 95% quantile). Its chosen continuous generator has negligible ties..

## C-E17 / Common-exposure diversification

Formula: Equal individual average losses can conceal different joint tail exposures.

Substitution: Each source loses USD10m with chosen probability 0.2. A shared port produces joint loss USD20m with probability 0.2; independent joint probability is 0.04..

Result: Expected total loss USD4m in both; joint tail differs. Units: USDm loss; covariance. Input IDs: I-E17. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 27;55. Limit: Chosen probabilities illustrate dependence. Country flags do not remove a shared crop season or port.. Sensitivity: A different basin without a different port can leave route exposure unchanged..

## C-E18 / Difference in differences

Formula: Subtract the counterfactual change from the treated change.

Substitution: Treated sales: 100 → 130. Control: 100 → 110. DiD = (130 − 100) − (110 − 100) = 20..

Result: 20 illustrative incremental eligible sales units. Units: outcome units; customers; periods. Input IDs: I-E18. Sources: DID. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 31;56. Limit: Parallel trends and no material spillovers are required. Four chosen means cannot support an estimated interval.. Sensitivity: At USD2 contribution/unit, gross incremental contribution is USD40 before service and pilot cost..

## C-E19 / Incremental ROMI

Formula: Net incremental contribution after marketing / marketing spend.

Substitution: Incremental contribution 120 − service 20 − trade 10 − cannibalisation 10 = 80. Marketing spend 40. Net ROMI = (80 − 40)/40 = 100%..

Result: 100% net ROMI; contribution/spend is 2.0 times. Units: USDm contribution and marketing spend. Input IDs: I-E19. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 31;57. Limit: All inputs are chosen currency-thousands. Use a paid-sales counterfactual and full incremental costs.. Sensitivity: If contribution after other costs is only 40, net ROMI is zero. Multi-year proposals need NPV..

## C-E20 / Decision value of information

Formula: Optimal decision value after information less before information, study and delay costs.

Substitution: Good state p=0.5: investment NPV 10; bad state p=0.5: −8; wait 0. Best prior EV=1; perfect-information EV=5; less study 1 and delay 0.5 gives net gain 2.5..

Result: USD2.5m net perfect-information ceiling. Units: USDm project/study/delay; chosen probability. Input IDs: I-E20. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 28;58. Limit: A perfect study is an upper bound. Do not add its benefit again to a policy that already includes learning.. Sensitivity: An imperfect pilot may be worth less than its cost; keep the wait option..

## C-E21 / Reverse stress

Formula: Solve the full NPV root and monitor the mechanism that moves it.

Substitution: The managed owned template reaches zero NPV at 104,862 initial annual order tonnes. The current 100,000t base needs 4.86% more initial orders..

Result: About 4.86% more initial orders needed. Units: USDm; tonnes; annual rate. Input IDs: I-E21. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 59. Limit: The threshold depends on cost, hurdle, tax and capacity; volume cannot repair a negative unit contribution.. Sensitivity: Cost, FX or commissioning shocks shift the boundary. Monitor orders together with cash..

## C-E22 / Size ranking can reverse

Formula: Delivered units × unit contribution less fixed cost, then full cash-flow valuation.

Substitution: Country A: demand 200kt, capture 50kt, unit contribution USD20, fixed USD0.7m → EBITDA USD0.3m. B: demand 100kt, capture 40kt, contribution USD40 → USD0.9m..

Result: B has 3 times EBITDA despite half the category size. Units: USDm payoff; common budget. Input IDs: I-E22. Sources: Chosen inputs only. Assumptions: A_EXAMPLE.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-package.py: examples. Slide: 60. Limit: A and B are fictional teaching cases. Chosen capex USD5m vs USD2m and NWC USD2m vs USD0.5m further favour testing B.. Sensitivity: Before capital differences, A overtakes B above 80kt captured at USD20/t while B stays at 40kt..

## C-LEGACY / C-LEGACY

Formula: Inherited normalized Nigeria arithmetic.

Substitution: See named executable code and full output JSON.

Result: NGN−2.0645129269bn NPV;1.9927903115bn requiredannualuplift. Units: NGN billion; finite three-year screen. Input IDs: I_LEGACY. Sources: BASELINE. Assumptions: A_TEMPLATE;A_SCENARIO;A_TAX;A_RATE;A_NWC;A_OUTER;A_CAPEX;A_PILOT;A_STRESS;A_EXAMPLE;A_PRIOR;A_LEGACY.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: src/lib/olamNigeriaDecisionModel.ts. Slide: 3;20. Limit: Conditional, not company forecast. Sensitivity: See threshold/scenario outputs.

## C-CPM / C-CPM

Formula: (35.8−15.5)/35.8.

Substitution: See named executable code and full output JSON.

Result: 56.7039% lowerCPM. Units: Percentage reduction in self-reported CPM. Input IDs: I_TEMPLATE;I_SCENARIO. Sources: BASELINE. Assumptions: A_TEMPLATE;A_SCENARIO;A_TAX;A_RATE;A_NWC;A_OUTER;A_CAPEX;A_PILOT;A_STRESS;A_EXAMPLE;A_PRIOR;A_LEGACY.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: src/data/resume.ts. Slide: 34. Limit: Conditional, not company forecast. Sensitivity: See threshold/scenario outputs.

## C-COVERAGE / C-COVERAGE

Formula: 203×6×7.

Substitution: {"version": "1.1.0", "cutoff": "2026-10-08T00:04:25+05:30", "data_retrieved_at": "2026-10-07T20:19:48.823839+00:00", "countries": 195, "dossiers": 195, "priority_diligence": 10, "investment_grade_candidates": 0, "threshold_only": 195, "country_scenario_rows": 8526, "countries_with_all_macro_fields": 162, "country_npv_estimates": 0, "population_projection_source": "UN WPP 2024 Medium variant, 2026-2051. These are external projections, not realized population.", "wdi_vintages": {"population": "2026-07-13", "income_ppp": "2026-07-13", "urban": "2026-07-13", "inflation": "2026-07-13", "food_index": "2026-07-13", "food_import_share": "2026-07-13", "food_export_share": "2026-07-13", "imports_usd": "2026-07-13", "exports_usd": "2026-07-13", "cereal_yield": "2026-07-13", "water_stress": "2026-07-13"}, "no_terminal_franchise": true, "country_driver_count": 34, "country_driver_observation_coverage": 6061, "product_decision_units": 203, "priority_product_cases": 18, "audit_date": "2026-10-08", "extended_analysis_run_at": "2026-10-08T02:47:33.622603+00:00"}.

Result: 8526 rows;195 countries;18 distinct priority product plans;34 driver series. Units: Counts. Input IDs: I_COVERAGE. Sources: UN_M49;UN_MEMBERS;UN_OBSERVERS;UN_WPP. Assumptions: A_TEMPLATE;A_SCENARIO;A_TAX;A_RATE;A_NWC;A_OUTER;A_CAPEX;A_PILOT;A_STRESS;A_EXAMPLE;A_PRIOR;A_LEGACY.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: 12. Limit: Conditional, not company forecast. Sensitivity: See threshold/scenario outputs.

## C-TRADE-NGA / C-TRADE-NGA

Formula: Read CIFvalue only; noquantitycalculation.

Substitution: See named executable code and full output JSON.

Result: USD1,047,531,844.083CIF; netweightnull. Units: Current USD CIF; no tonnes calculation. Input IDs: I_TEMPLATE;I_SCENARIO. Sources: COMTRADE. Assumptions: A_TEMPLATE;A_SCENARIO;A_TAX;A_RATE;A_NWC;A_OUTER;A_CAPEX;A_PILOT;A_STRESS;A_EXAMPLE;A_PRIOR;A_LEGACY.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-retrieve.py. Slide: 10. Limit: Conditional, not company forecast. Sensitivity: See threshold/scenario outputs.

## C-OLS / C-OLS

Formula: Laggedgrowth OLS;countryclusterCR1;holdout.

Substitution: See named executable code and full output JSON.

Result: train2856;holdout680;MAE.04829868. Units: Annual log growth; coefficient units specified by lagged predictor. Input IDs: I_OLS. Sources: WB_food_index;WB_income_ppp;WB_urban;WB_cereal_yield. Assumptions: A_TEMPLATE;A_SCENARIO;A_TAX;A_RATE;A_NWC;A_OUTER;A_CAPEX;A_PILOT;A_STRESS;A_EXAMPLE;A_PRIOR;A_LEGACY.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: 30;66;67. Limit: Conditional, not company forecast. Sensitivity: See threshold/scenario outputs.

## C-STRESS / C-STRESS

Formula: 10,000chosenlatentfactordraws;fullcash.

Substitution: See named executable code and full output JSON.

Result: {"p10_npv": -19.270312655889544, "median_npv": -1.6547747253083456, "p90_npv": 21.484353235769948, "loss_VaR95": 24.54454163430493, "loss_CVaR95": 29.251547633706362}. Units: Real2026USD million; chosen loss quantiles. Input IDs: I_STRESS;I_TEMPLATE_plant;I_SCENARIO_managed. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_TAX;A_RATE;A_NWC;A_OUTER;A_CAPEX;A_PILOT;A_STRESS;A_EXAMPLE;A_PRIOR;A_LEGACY.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: 26. Limit: Conditional, not company forecast. Sensitivity: See threshold/scenario outputs.

## C-REGRET / C-REGRET

Formula: min action max world(bestvalue−actionvalue).

Substitution: See named executable code and full output JSON.

Result: Partner chosen;worstregret4 vsowned8. Units: USD million payoff/regret. Input IDs: I_REGRET. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_TAX;A_RATE;A_NWC;A_OUTER;A_CAPEX;A_PILOT;A_STRESS;A_EXAMPLE;A_PRIOR;A_LEGACY.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: 27;28;29. Limit: Conditional, not company forecast. Sensitivity: See threshold/scenario outputs.

## C-SCENARIOS / C-SCENARIOS

Formula: Chosen coherent driver vectors.

Substitution: See named executable code and full output JSON.

Result: 6worlds,unweighted. Units: Explicit in output. Input IDs: I_TEMPLATE;I_SCENARIO. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_TAX;A_RATE;A_NWC;A_OUTER;A_CAPEX;A_PILOT;A_STRESS;A_EXAMPLE;A_PRIOR;A_LEGACY.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: 15. Limit: Conditional, not company forecast. Sensitivity: See threshold/scenario outputs.

## C-THRESHOLD / C-THRESHOLD

Formula: Brent rootNPV(order)=0.

Substitution: See named executable code and full output JSON.

Result: Conditionalroots;nullifcapacitycappedvalue<0. Units: Explicit in output. Input IDs: I_TEMPLATE;I_SCENARIO. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_TAX;A_RATE;A_NWC;A_OUTER;A_CAPEX;A_PILOT;A_STRESS;A_EXAMPLE;A_PRIOR;A_LEGACY.

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: 17;26. Limit: Conditional, not company forecast. Sensitivity: See threshold/scenario outputs.

## C-DCF / C-DCF

Formula: 25annual FCFF atrealUSD hurdle.

Substitution: See named executable code and full output JSON.

Result: 18mode/worldcases;notcountryvalues. Units: Explicit in output. Input IDs: I_TEMPLATE;I_SCENARIO. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_TAX;A_RATE;A_NWC;A_OUTER;A_CAPEX;A_PILOT;A_STRESS;A_EXAMPLE;A_PRIOR;A_LEGACY.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py. Slide: 16. Limit: Conditional, not company forecast. Sensitivity: See threshold/scenario outputs.

## C-DCF-trade-managed / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "trade", "scenario": "managed", "npv": 0.35768624230170054, "peak_funding": 2.9413770000000037, "operating_break_even_tonnes": 31250.0, "investment_break_even_orders": 89195.8345259654, "within_capacity": true, "calculation_id": "C-DCF-trade-managed"}.

Result: 0.36. Units: Real2026USD million. Input IDs: I_TEMPLATE_trade;I_SCENARIO_managed. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-trade-integration / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "trade", "scenario": "integration", "npv": 7.869359046008329, "peak_funding": 1.5686896712328786, "operating_break_even_tonnes": 17651.296829971187, "investment_break_even_orders": 27991.67630528343, "within_capacity": true, "calculation_id": "C-DCF-trade-integration"}.

Result: 7.87. Units: Real2026USD million. Input IDs: I_TEMPLATE_trade;I_SCENARIO_integration. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-trade-fragmented / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "trade", "scenario": "fragmented", "npv": -10.136255746401934, "peak_funding": 22.84820444735882, "operating_break_even_tonnes": null, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-trade-fragmented"}.

Result: -10.14. Units: Real2026USD million. Input IDs: I_TEMPLATE_trade;I_SCENARIO_fragmented. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-trade-physical / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "trade", "scenario": "physical", "npv": -25.560849591724317, "peak_funding": 70.94921425008118, "operating_break_even_tonnes": null, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-trade-physical"}.

Result: -25.56. Units: Real2026USD million. Input IDs: I_TEMPLATE_trade;I_SCENARIO_physical. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-trade-squeeze / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "trade", "scenario": "squeeze", "npv": -13.357503120599379, "peak_funding": 36.99873139726028, "operating_break_even_tonnes": null, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-trade-squeeze"}.

Result: -13.36. Units: Real2026USD million. Input IDs: I_TEMPLATE_trade;I_SCENARIO_squeeze. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-trade-nutrition / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "trade", "scenario": "nutrition", "npv": -0.5433706314193101, "peak_funding": 4.071070447090416, "operating_break_even_tonnes": 32475.490196078557, "investment_break_even_orders": 121633.64390198824, "within_capacity": true, "calculation_id": "C-DCF-trade-nutrition"}.

Result: -0.54. Units: Real2026USD million. Input IDs: I_TEMPLATE_trade;I_SCENARIO_nutrition. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-partner-managed / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "partner", "scenario": "managed", "npv": 10.817370364399231, "peak_funding": 9.795726027397262, "operating_break_even_tonnes": 25000.0, "investment_break_even_orders": 62437.7886229557, "within_capacity": true, "calculation_id": "C-DCF-partner-managed"}.

Result: 10.82. Units: Real2026USD million. Input IDs: I_TEMPLATE_partner;I_SCENARIO_managed. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-partner-integration / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "partner", "scenario": "integration", "npv": 20.592951494337385, "peak_funding": 9.137024657534244, "operating_break_even_tonnes": 22072.07207207206, "investment_break_even_orders": 42554.41685771852, "within_capacity": true, "calculation_id": "C-DCF-partner-integration"}.

Result: 20.59. Units: Real2026USD million. Input IDs: I_TEMPLATE_partner;I_SCENARIO_integration. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-partner-fragmented / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "partner", "scenario": "fragmented", "npv": -3.5847305871200685, "peak_funding": 12.709059419178088, "operating_break_even_tonnes": 33536.585365853694, "investment_break_even_orders": 151350.81667983875, "within_capacity": true, "calculation_id": "C-DCF-partner-fragmented"}.

Result: -3.58. Units: Real2026USD million. Input IDs: I_TEMPLATE_partner;I_SCENARIO_fragmented. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-partner-physical / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "partner", "scenario": "physical", "npv": -17.395001416781703, "peak_funding": 27.95674091083143, "operating_break_even_tonnes": 71874.99999999983, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-partner-physical"}.

Result: -17.40. Units: Real2026USD million. Input IDs: I_TEMPLATE_partner;I_SCENARIO_physical. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-partner-squeeze / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "partner", "scenario": "squeeze", "npv": -9.82494869860839, "peak_funding": 14.232439232876722, "operating_break_even_tonnes": 42112.2994652407, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-partner-squeeze"}.

Result: -9.82. Units: Real2026USD million. Input IDs: I_TEMPLATE_partner;I_SCENARIO_squeeze. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-partner-nutrition / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "partner", "scenario": "nutrition", "npv": 10.071104437961292, "peak_funding": 10.38084, "operating_break_even_tonnes": 25980.392156862756, "investment_break_even_orders": 64972.55435624967, "within_capacity": true, "calculation_id": "C-DCF-partner-nutrition"}.

Result: 10.07. Units: Real2026USD million. Input IDs: I_TEMPLATE_partner;I_SCENARIO_nutrition. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-plant-managed / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "plant", "scenario": "managed", "npv": -1.7999419404754313, "peak_funding": 22.564383561643837, "operating_break_even_tonnes": 33333.333333333336, "investment_break_even_orders": 104862.13464493981, "within_capacity": true, "calculation_id": "C-DCF-plant-managed"}.

Result: -1.80. Units: Real2026USD million. Input IDs: I_TEMPLATE_plant;I_SCENARIO_managed. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: 14;25. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-plant-integration / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "plant", "scenario": "integration", "npv": 13.879461780773948, "peak_funding": 21.728734246575343, "operating_break_even_tonnes": 30107.52688172042, "investment_break_even_orders": 73631.61307311719, "within_capacity": true, "calculation_id": "C-DCF-plant-integration"}.

Result: 13.88. Units: Real2026USD million. Input IDs: I_TEMPLATE_plant;I_SCENARIO_integration. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-plant-fragmented / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "plant", "scenario": "fragmented", "npv": -17.20394764958582, "peak_funding": 25.97873621917809, "operating_break_even_tonnes": 42145.59386973181, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-plant-fragmented"}.

Result: -17.20. Units: Real2026USD million. Input IDs: I_TEMPLATE_plant;I_SCENARIO_fragmented. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-plant-physical / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "plant", "scenario": "physical", "npv": -33.292163663292115, "peak_funding": 57.89763621465281, "operating_break_even_tonnes": 69696.96969696958, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-plant-physical"}.

Result: -33.29. Units: Real2026USD million. Input IDs: I_TEMPLATE_plant;I_SCENARIO_physical. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-plant-squeeze / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "plant", "scenario": "squeeze", "npv": -24.952075111496065, "peak_funding": 38.204532602739775, "operating_break_even_tonnes": 49528.30188679248, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-plant-squeeze"}.

Result: -24.95. Units: Real2026USD million. Input IDs: I_TEMPLATE_plant;I_SCENARIO_squeeze. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-DCF-plant-nutrition / Full normalizedproject cash

Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash.

Substitution: {"mode": "plant", "scenario": "nutrition", "npv": -2.8782641183332043, "peak_funding": 23.1676301369863, "operating_break_even_tonnes": 34640.522875817, "investment_break_even_orders": 107844.84544675304, "within_capacity": true, "calculation_id": "C-DCF-plant-nutrition"}.

Result: -2.88. Units: Real2026USD million. Input IDs: I_TEMPLATE_plant;I_SCENARIO_nutrition. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_RATE;A_TAX;A_NWC;A_CAPEX;A_OUTER.

Workbook: Country_Financials!A4:AA28;B31:B34; Assumptions!B4:B30; Unit_Economics!A4:K6; Scenario_Inputs!A4:J9. Code/data: scripts/olam-analyse.py:cash_model. Slide: Indexed country/calculation companion. Limit: No country calibration. Sensitivity: Investment order root included.

## C-POP-AFG / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 45047069.0, "2030": 50039402.0, "2035": 56647232.0, "2040": 63347870.0, "2045": 70021200.0, "2050": 76885135.0, "2051": 78155052.0}.

Result: 0.7349641993355882. Units: Persons /fractionchange. Input IDs: UN_WPP_AFG. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ALB / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 2751025.0, "2030": 2671885.0, "2035": 2570580.0, "2040": 2461866.0, "2045": 2351280.0, "2050": 2240166.0, "2051": 2218012.0}.

Result: -0.19375069292354663. Units: Persons /fractionchange. Input IDs: UN_WPP_ALB. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-DZA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 48028334.0, "2030": 50154166.0, "2035": 52516789.0, "2040": 54873476.0, "2045": 57290156.0, "2050": 59565554.0, "2051": 59975606.0}.

Result: 0.2487546621958614. Units: Persons /fractionchange. Input IDs: UN_WPP_DZA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-AND / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 83753.0, "2030": 85681.0, "2035": 86174.0, "2040": 85668.0, "2045": 84294.0, "2050": 82195.0, "2051": 81668.0}.

Result: -0.02489463064009645. Units: Persons /fractionchange. Input IDs: UN_WPP_AND. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-AGO / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 40215179.0, "2030": 45160458.0, "2035": 51821718.0, "2040": 58965321.0, "2045": 66464329.0, "2050": 74295394.0, "2051": 75892826.0}.

Result: 0.887168673301193. Units: Persons /fractionchange. Input IDs: UN_WPP_AGO. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ATG / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 94626.0, "2030": 96000.0, "2035": 97007.0, "2040": 97133.0, "2045": 96419.0, "2050": 95055.0, "2051": 94710.0}.

Result: 0.0008877052818463405. Units: Persons /fractionchange. Input IDs: UN_WPP_ATG. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ARG / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 46003734.0, "2030": 46585022.0, "2035": 47251994.0, "2040": 47817645.0, "2045": 48191841.0, "2050": 48308944.0, "2051": 48297098.0}.

Result: 0.049851692473484865. Units: Persons /fractionchange. Input IDs: UN_WPP_ARG. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ARM / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 2930915.0, "2030": 2851291.0, "2035": 2756725.0, "2040": 2665523.0, "2045": 2579220.0, "2050": 2495207.0, "2051": 2478352.0}.

Result: -0.15441014154282873. Units: Persons /fractionchange. Input IDs: UN_WPP_ARM. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-AUS / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 27227096.0, "2030": 28188539.0, "2035": 29296168.0, "2040": 30357450.0, "2045": 31431123.0, "2050": 32506969.0, "2051": 32716087.0}.

Result: 0.2016003102203776. Units: Persons /fractionchange. Input IDs: UN_WPP_AUS. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-AUT / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 9107266.0, "2030": 9080346.0, "2035": 9014208.0, "2040": 8934061.0, "2045": 8844730.0, "2050": 8724332.0, "2051": 8696685.0}.

Result: -0.04508279433147111. Units: Persons /fractionchange. Input IDs: UN_WPP_AUT. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-AZE / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 10454855.0, "2030": 10665380.0, "2035": 10898665.0, "2040": 11081335.0, "2045": 11188800.0, "2050": 11224923.0, "2051": 11224460.0}.

Result: 0.07361221174277399. Units: Persons /fractionchange. Input IDs: UN_WPP_AZE. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BHS / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 404628.0, "2030": 410267.0, "2035": 415978.0, "2040": 420346.0, "2045": 423262.0, "2050": 424265.0, "2051": 424211.0}.

Result: 0.04839754045691347. Units: Persons /fractionchange. Input IDs: UN_WPP_BHS. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BHR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 1675572.0, "2030": 1765209.0, "2035": 1856537.0, "2040": 1951233.0, "2045": 2046472.0, "2050": 2139465.0, "2051": 2157875.0}.

Result: 0.28784379304500196. Units: Persons /fractionchange. Input IDs: UN_WPP_BHR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BGD / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 177818044.0, "2030": 186072407.0, "2035": 195130372.0, "2040": 202589429.0, "2045": 209029594.0, "2050": 214709097.0, "2051": 215750555.0}.

Result: 0.21332205746228983. Units: Persons /fractionchange. Input IDs: UN_WPP_BGD. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BRB / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 282724.0, "2030": 282490.0, "2035": 280342.0, "2040": 276346.0, "2045": 270774.0, "2050": 264216.0, "2051": 262867.0}.

Result: -0.07023457506260522. Units: Persons /fractionchange. Input IDs: UN_WPP_BRB. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BLR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 8937018.0, "2030": 8687632.0, "2035": 8372271.000000001, "2040": 8064466.0, "2045": 7763466.0, "2050": 7453546.0, "2051": 7388575.0}.

Result: -0.1732617076523736. Units: Persons /fractionchange. Input IDs: UN_WPP_BLR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BEL / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 11774642.0, "2030": 11824141.0, "2035": 11863585.0, "2040": 11892204.0, "2045": 11900984.0, "2050": 11870906.0, "2051": 11859003.0}.

Result: 0.007164633965092149. Units: Persons /fractionchange. Input IDs: UN_WPP_BEL. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BLZ / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 428644.0, "2030": 449839.0, "2035": 473132.0, "2040": 491595.0, "2045": 505700.0, "2050": 516626.99999999994, "2051": 518385.99999999994}.

Result: 0.2093625479418817. Units: Persons /fractionchange. Input IDs: UN_WPP_BLZ. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BEN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 15170419.0, "2030": 16618822.0, "2035": 18492631.0, "2040": 20445760.0, "2045": 22443646.0, "2050": 24433809.0, "2051": 24827844.0}.

Result: 0.6365957987053621. Units: Persons /fractionchange. Input IDs: UN_WPP_BEN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BTN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 802214.0, "2030": 820694.0, "2035": 843202.0, "2040": 862129.0, "2045": 876173.0, "2050": 882340.0, "2051": 883389.0}.

Result: 0.10118871024439868. Units: Persons /fractionchange. Input IDs: UN_WPP_BTN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BOL / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 12749291.0, "2030": 13405564.0, "2035": 14183823.0, "2040": 14899397.0, "2045": 15542791.0, "2050": 16110162.0, "2051": 16214293.0}.

Result: 0.27177997584336255. Units: Persons /fractionchange. Input IDs: UN_WPP_BOL. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BIH / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 3114242.0, "2030": 3013974.0, "2035": 2881542.0, "2040": 2745010.0, "2045": 2599927.0, "2050": 2455167.0, "2051": 2426282.0}.

Result: -0.22090768797029903. Units: Persons /fractionchange. Input IDs: UN_WPP_BIH. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BWA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 2603388.0, "2030": 2765918.0, "2035": 2954414.0, "2040": 3126640.0, "2045": 3285301.0, "2050": 3437430.0, "2051": 3465409.0}.

Result: 0.33111507005486707. Units: Persons /fractionchange. Input IDs: UN_WPP_BWA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BRA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 213562666.0, "2030": 216074411.0, "2035": 218199707.0, "2040": 219237084.0, "2045": 219026196.0, "2050": 217489299.0, "2051": 217040324.0}.

Result: 0.016284016608034024. Units: Persons /fractionchange. Input IDs: UN_WPP_BRA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BRN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 469775.0, "2030": 482447.0, "2035": 495290.0, "2040": 505976.0, "2045": 514052.0, "2050": 519551.00000000006, "2051": 520265.99999999994}.

Result: 0.10747911234101415. Units: Persons /fractionchange. Input IDs: UN_WPP_BRN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BGR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 6667659.0, "2030": 6458243.0, "2035": 6183114.0, "2040": 5907728.0, "2045": 5648256.0, "2050": 5402217.0, "2051": 5354139.0}.

Result: -0.19699867674696625. Units: Persons /fractionchange. Input IDs: UN_WPP_BGR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BFA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 24601700.0, "2030": 26730324.0, "2035": 29469746.0, "2040": 32193645.0, "2045": 34829690.0, "2050": 37304383.0, "2051": 37777225.0}.

Result: 0.5355534373640847. Units: Persons /fractionchange. Input IDs: UN_WPP_BFA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-BDI / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 14729157.0, "2030": 16182016.0, "2035": 18085841.0, "2040": 20131318.0, "2045": 22197887.0, "2050": 24131720.0, "2051": 24498523.0}.

Result: 0.6632671509985262. Units: Persons /fractionchange. Input IDs: UN_WPP_BDI. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-CPV / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 529630.0, "2030": 538614.0, "2035": 548591.0, "2040": 557374.0, "2045": 563476.0, "2050": 566134.0, "2051": 566201.0}.

Result: 0.0690500915733625. Units: Persons /fractionchange. Input IDs: UN_WPP_CPV. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-KHM / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 18051219.0, "2030": 18827388.0, "2035": 19720141.0, "2040": 20540682.0, "2045": 21286237.0, "2050": 21931455.0, "2051": 22045831.0}.

Result: 0.22129319909087575. Units: Persons /fractionchange. Input IDs: UN_WPP_KHM. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-CMR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 30640817.0, "2030": 33777190.0, "2035": 37893818.0, "2040": 42208003.0, "2045": 46629039.0, "2050": 51096317.0, "2051": 51989016.0}.

Result: 0.6967242094099515. Units: Persons /fractionchange. Input IDs: UN_WPP_CMR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-CAN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 40467728.0, "2030": 41655589.0, "2035": 42905267.0, "2040": 43951417.0, "2045": 44850096.0, "2050": 45621882.0, "2051": 45771463.0}.

Result: 0.13106085421944114. Units: Persons /fractionchange. Input IDs: UN_WPP_CAN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-CAF / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5698984.0, "2030": 6478245.0, "2035": 7502587.0, "2040": 8526455.0, "2045": 9550893.0, "2050": 10616753.0, "2051": 10834361.0}.

Result: 0.9011039511604173. Units: Persons /fractionchange. Input IDs: UN_WPP_CAF. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-TCD / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 21560380.0, "2030": 24207479.0, "2035": 27697279.0, "2040": 31307342.0, "2045": 35026393.0, "2050": 38857686.0, "2051": 39636033.0}.

Result: 0.8383735815416982. Units: Persons /fractionchange. Input IDs: UN_WPP_TCD. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-CHL / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 19945850.0, "2030": 20233183.0, "2035": 20455940.0, "2040": 20542103.0, "2045": 20499138.0, "2050": 20320306.0, "2051": 20269202.0}.

Result: 0.016211492616258427. Units: Persons /fractionchange. Input IDs: UN_WPP_CHL. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-CHN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 1412914089.0, "2030": 1398153832.0, "2035": 1373427531.0, "2040": 1342816657.0, "2045": 1306113788.0, "2050": 1260289093.0, "2051": 1249692538.0}.

Result: -0.11552121411396021. Units: Persons /fractionchange. Input IDs: UN_WPP_CHN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: 7. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-COL / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 53936226.0, "2030": 55736475.0, "2035": 57445753.0, "2040": 58576446.0, "2045": 59190823.0, "2050": 59385357.0, "2051": 59382960.0}.

Result: 0.10098470738386478. Units: Persons /fractionchange. Input IDs: UN_WPP_COL. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-COM / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 899010.0, "2030": 964264.0, "2035": 1047762.9999999999, "2040": 1133778.0, "2045": 1221072.0, "2050": 1307558.0, "2051": 1324686.0}.

Result: 0.47349417692795415. Units: Persons /fractionchange. Input IDs: UN_WPP_COM. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-COG / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 6637785.0, "2030": 7282266.0, "2035": 8160733.0, "2040": 9083971.0, "2045": 10041901.0, "2050": 11006471.0, "2051": 11200449.0}.

Result: 0.6873774911359738. Units: Persons /fractionchange. Input IDs: UN_WPP_COG. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-CRI / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5174789.0, "2030": 5251497.0, "2035": 5324699.0, "2040": 5369806.0, "2045": 5381019.0, "2050": 5354150.0, "2051": 5344062.0}.

Result: 0.03271109218172952. Units: Persons /fractionchange. Input IDs: UN_WPP_CRI. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-HRV / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 3822345.0, "2030": 3725770.0, "2035": 3607215.0, "2040": 3488309.0, "2045": 3362953.0, "2050": 3234160.0, "2051": 3208229.0}.

Result: -0.16066472283375777. Units: Persons /fractionchange. Input IDs: UN_WPP_HRV. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-CUB / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 10892659.0, "2030": 10700822.0, "2035": 10431762.0, "2040": 10125837.0, "2045": 9775199.0, "2050": 9381999.0, "2051": 9298547.0}.

Result: -0.14634737027937805. Units: Persons /fractionchange. Input IDs: UN_WPP_CUB. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-CYP / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 1382334.0, "2030": 1422318.0, "2035": 1459190.0, "2040": 1484849.0, "2045": 1500070.0, "2050": 1508482.0, "2051": 1509486.0}.

Result: 0.09198355824279814. Units: Persons /fractionchange. Input IDs: UN_WPP_CYP. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-CZE / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 10527781.0, "2030": 10425089.0, "2035": 10265956.0, "2040": 10107226.0, "2045": 9965090.0, "2050": 9825543.0, "2051": 9795302.0}.

Result: -0.06957582039368027. Units: Persons /fractionchange. Input IDs: UN_WPP_CZE. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-CIV / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 33494345.999999996, "2030": 36699009.0, "2035": 41033849.0, "2040": 45743925.0, "2045": 50716067.0, "2050": 55746985.0, "2051": 56759561.0}.

Result: 0.6946012619562718. Units: Persons /fractionchange. Input IDs: UN_WPP_CIV. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-PRK / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 26633691.0, "2030": 26784904.0, "2035": 26757724.0, "2040": 26542432.0, "2045": 26210203.0, "2050": 25787127.0, "2051": 25691411.0}.

Result: -0.035379249537737745. Units: Persons /fractionchange. Input IDs: UN_WPP_PRK. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-COD / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 116452162.0, "2030": 131532201.0, "2035": 151560103.0, "2040": 172595582.0, "2045": 194865379.0, "2050": 218246072.0, "2051": 223027957.0}.

Result: 0.915189492145281. Units: Persons /fractionchange. Input IDs: UN_WPP_COD. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-DNK / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 6023520.0, "2030": 6081995.0, "2035": 6119806.0, "2040": 6134659.0, "2045": 6134655.0, "2050": 6124838.0, "2051": 6121371.0}.

Result: 0.01624482030440677. Units: Persons /fractionchange. Input IDs: UN_WPP_DNK. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-DJI / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 1199459.0, "2030": 1262678.0, "2035": 1335498.0, "2040": 1406635.0, "2045": 1474041.0, "2050": 1530540.0, "2051": 1540678.0}.

Result: 0.28447741856953845. Units: Persons /fractionchange. Input IDs: UN_WPP_DJI. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-DMA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 65510.99999999999, "2030": 64169.0, "2035": 63761.0, "2040": 63799.0, "2045": 63629.0, "2050": 63192.0, "2051": 63062.0}.

Result: -0.0373830349101677. Units: Persons /fractionchange. Input IDs: UN_WPP_DMA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-DOM / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 11609500.0, "2030": 11938852.0, "2035": 12289431.0, "2040": 12579320.0, "2045": 12816005.0, "2050": 12996293.0, "2051": 13025140.0}.

Result: 0.12193806796158313. Units: Persons /fractionchange. Input IDs: UN_WPP_DOM. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ECU / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 18444506.0, "2030": 19069719.0, "2035": 19800128.0, "2040": 20434220.0, "2045": 20950628.0, "2050": 21337237.0, "2051": 21398376.0}.

Result: 0.160149043839938. Units: Persons /fractionchange. Input IDs: UN_WPP_ECU. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-EGY / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 120101175.0, "2030": 127139322.0, "2035": 136097217.0, "2040": 145213654.0, "2045": 153919189.0, "2050": 161630192.0, "2051": 163063539.0}.

Result: 0.35771809892784145. Units: Persons /fractionchange. Input IDs: UN_WPP_EGY. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SLV / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 6391253.0, "2030": 6486207.0, "2035": 6578181.0, "2040": 6640752.0, "2045": 6668025.0, "2050": 6663346.0, "2051": 6658584.0}.

Result: 0.04182763536351941. Units: Persons /fractionchange. Input IDs: UN_WPP_SLV. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-GNQ / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 1984468.0, "2030": 2170445.0, "2035": 2414269.0, "2040": 2665586.0, "2045": 2911235.0, "2050": 3143728.0, "2051": 3190137.0}.

Result: 0.6075527546929453. Units: Persons /fractionchange. Input IDs: UN_WPP_GNQ. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ERI / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 3682669.0, "2030": 4002672.0, "2035": 4420922.0, "2040": 4868676.0, "2045": 5292768.0, "2050": 5696062.0, "2051": 5775739.0}.

Result: 0.5683568086081046. Units: Persons /fractionchange. Input IDs: UN_WPP_ERI. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-EST / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 1331062.0, "2030": 1302772.0, "2035": 1268271.0, "2040": 1236787.0, "2045": 1206184.0, "2050": 1174267.0, "2051": 1167469.0}.

Result: -0.12290411716358818. Units: Persons /fractionchange. Input IDs: UN_WPP_EST. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SWZ / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 1269859.0, "2030": 1320918.0, "2035": 1379418.0, "2040": 1429781.0, "2045": 1472137.0, "2050": 1505331.0, "2051": 1510782.0}.

Result: 0.18972421347566937. Units: Persons /fractionchange. Input IDs: UN_WPP_SWZ. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ETH / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 138902185.0, "2030": 152855357.0, "2035": 170532954.0, "2040": 188450902.0, "2045": 206673639.0, "2050": 225021875.0, "2051": 228687201.0}.

Result: 0.6463902349700259. Units: Persons /fractionchange. Input IDs: UN_WPP_ETH. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-FJI / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 937282.0, "2030": 953106.0, "2035": 969629.0, "2040": 983858.0, "2045": 994457.0, "2050": 1000261.0, "2051": 1000845.0}.

Result: 0.0678163028842973. Units: Persons /fractionchange. Input IDs: UN_WPP_FJI. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-FIN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5621739.0, "2030": 5592051.0, "2035": 5540655.0, "2040": 5480523.0, "2045": 5418350.0, "2050": 5351645.0, "2051": 5337090.0}.

Result: -0.050633620664353174. Units: Persons /fractionchange. Input IDs: UN_WPP_FIN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-FRA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 66746401.0, "2030": 67107691.00000001, "2035": 67547946.0, "2040": 67938904.0, "2045": 68190955.0, "2050": 68219675.0, "2051": 68200254.0}.

Result: 0.021781743707799395. Units: Persons /fractionchange. Input IDs: UN_WPP_FRA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-GAB / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 2647399.0, "2030": 2866667.0, "2035": 3151468.0, "2040": 3452988.0, "2045": 3767429.0, "2050": 4084533.0, "2051": 4147627.0000000005}.

Result: 0.5666799753267264. Units: Persons /fractionchange. Input IDs: UN_WPP_GAB. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-GMB / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 2884079.0, "2030": 3130133.0, "2035": 3433425.0, "2040": 3732798.0, "2045": 4024237.0, "2050": 4301895.0, "2051": 4355372.0}.

Result: 0.510143099408858. Units: Persons /fractionchange. Input IDs: UN_WPP_GMB. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-GEO / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 3804642.0, "2030": 3790542.0, "2035": 3764200.0, "2040": 3732856.0, "2045": 3703994.0, "2050": 3664014.0, "2051": 3654921.0}.

Result: -0.03935219134940948. Units: Persons /fractionchange. Input IDs: UN_WPP_GEO. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-DEU / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 83644258.0, "2030": 82780953.0, "2035": 81669909.0, "2040": 80551736.0, "2045": 79491795.0, "2050": 78294613.0, "2051": 78048438.0}.

Result: -0.06690022882383628. Units: Persons /fractionchange. Input IDs: UN_WPP_DEU. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-GHA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 35697557.0, "2030": 38222089.0, "2035": 41412554.0, "2040": 44568350.0, "2045": 47634274.0, "2050": 50553047.0, "2051": 51112490.0}.

Result: 0.4318203903981441. Units: Persons /fractionchange. Input IDs: UN_WPP_GHA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-GRC / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 9897115.0, "2030": 9721984.0, "2035": 9496499.0, "2040": 9275613.0, "2045": 9058325.0, "2050": 8812069.0, "2051": 8758041.0}.

Result: -0.11509151909420068. Units: Persons /fractionchange. Input IDs: UN_WPP_GRC. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-GRD / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 117362.0, "2030": 117466.0, "2035": 117244.0, "2040": 116493.0, "2045": 115123.0, "2050": 113243.0, "2051": 112801.0}.

Result: -0.03886266423544249. Units: Persons /fractionchange. Input IDs: UN_WPP_GRD. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-GTM / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 18967978.0, "2030": 20067253.0, "2035": 21394237.0, "2040": 22626870.0, "2045": 23719089.0, "2050": 24670857.0, "2051": 24845333.0}.

Result: 0.3098566963753333. Units: Persons /fractionchange. Input IDs: UN_WPP_GTM. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-GIN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 15441993.0, "2030": 16807147.0, "2035": 18486013.0, "2040": 20160750.0, "2045": 21817245.0, "2050": 23404584.0, "2051": 23715929.0}.

Result: 0.5358075217363458. Units: Persons /fractionchange. Input IDs: UN_WPP_GIN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-GNB / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 2297808.0, "2030": 2488934.0, "2035": 2730133.0, "2040": 2969702.0, "2045": 3204249.0, "2050": 3438608.0, "2051": 3483363.0}.

Result: 0.5159504188339497. Units: Persons /fractionchange. Input IDs: UN_WPP_GNB. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-GUY / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 840890.0, "2030": 861038.0, "2035": 885936.0, "2040": 907506.0, "2045": 926353.0, "2050": 940607.0, "2051": 942745.0}.

Result: 0.12112761478909251. Units: Persons /fractionchange. Input IDs: UN_WPP_GUY. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-HTI / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 12037506.0, "2030": 12552359.0, "2035": 13165000.0, "2040": 13733853.0, "2045": 14252967.0, "2050": 14710862.0, "2051": 14794290.0}.

Result: 0.229016209836157. Units: Persons /fractionchange. Input IDs: UN_WPP_HTI. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-VAT / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 506.0, "2030": 528.0, "2035": 537.0, "2040": 587.0, "2045": 649.0, "2050": 714.0, "2051": 726.0}.

Result: 0.4347826086956521. Units: Persons /fractionchange. Input IDs: UN_WPP_VAT. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-HND / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 11184760.0, "2030": 11885319.0, "2035": 12714114.0, "2040": 13484653.0, "2045": 14197946.0, "2050": 14846779.0, "2051": 14968238.0}.

Result: 0.33827082565920064. Units: Persons /fractionchange. Input IDs: UN_WPP_HND. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-HUN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 9585818.0, "2030": 9449115.0, "2035": 9259903.0, "2040": 9067617.0, "2045": 8889214.0, "2050": 8725347.0, "2051": 8693973.0}.

Result: -0.09303796504377615. Units: Persons /fractionchange. Input IDs: UN_WPP_HUN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ISL / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 402329.0, "2030": 414348.0, "2035": 423579.0, "2040": 429452.0, "2045": 432484.0, "2050": 432993.0, "2051": 432981.0}.

Result: 0.07618640465887361. Units: Persons /fractionchange. Input IDs: UN_WPP_ISL. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-IND / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 1476625576.0, "2030": 1525138844.0, "2035": 1578694796.0, "2040": 1622580039.0, "2045": 1656067583.0, "2050": 1679589259.0, "2051": 1683220886.0}.

Result: 0.1399104237105535. Units: Persons /fractionchange. Input IDs: UN_WPP_IND. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: 7. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-IDN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 287886782.0, "2030": 295876648.0, "2035": 304566622.0, "2040": 311797395.0, "2045": 317249613.0, "2050": 320712949.0, "2051": 321175111.0}.

Result: 0.1156299319084404. Units: Persons /fractionchange. Input IDs: UN_WPP_IDN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-IRN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 93168497.0, "2030": 95486667.0, "2035": 97679252.0, "2040": 99524277.0, "2045": 100990613.0, "2050": 101861993.0, "2051": 101942322.0}.

Result: 0.09417158462908337. Units: Persons /fractionchange. Input IDs: UN_WPP_IRN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-IRQ / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 48007437.0, "2030": 51937208.0, "2035": 57035914.0, "2040": 62223211.0, "2045": 67204177.0, "2050": 71928750.0, "2051": 72837415.0}.

Result: 0.5172110729427193. Units: Persons /fractionchange. Input IDs: UN_WPP_IRQ. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-IRL / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5356950.0, "2030": 5525093.0, "2035": 5686868.0, "2040": 5817570.0, "2045": 5916936.0, "2050": 5970042.0, "2051": 5973837.0}.

Result: 0.11515638562988273. Units: Persons /fractionchange. Input IDs: UN_WPP_IRL. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ISR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 9647689.0, "2030": 10175954.0, "2035": 10858122.0, "2040": 11581474.0, "2045": 12342061.0, "2050": 13092722.0, "2051": 13244415.0}.

Result: 0.3728070007231783. Units: Persons /fractionchange. Input IDs: UN_WPP_ISR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ITA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 58926166.0, "2030": 57946072.0, "2035": 56620005.0, "2040": 55221168.0, "2045": 53680471.0, "2050": 51891099.0, "2051": 51499509.0}.

Result: -0.12603326338930654. Units: Persons /fractionchange. Input IDs: UN_WPP_ITA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-JAM / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 2833403.0, "2030": 2808954.0, "2035": 2755934.0, "2040": 2676100.0, "2045": 2574081.0, "2050": 2454940.0, "2051": 2429919.0}.

Result: -0.14240261621802475. Units: Persons /fractionchange. Input IDs: UN_WPP_JAM. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-JPN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 122427731.0, "2030": 119584121.0, "2035": 115876149.0, "2040": 112158303.0, "2045": 108551995.0, "2050": 105123167.0, "2051": 104452458.0}.

Result: -0.1468235411468991. Units: Persons /fractionchange. Input IDs: UN_WPP_JPN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: 7. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-JOR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 11589532.0, "2030": 12448776.0, "2035": 13440834.0, "2040": 14471297.0, "2045": 15471984.0, "2050": 16367354.0, "2051": 16525167.000000002}.

Result: 0.42587008690256023. Units: Persons /fractionchange. Input IDs: UN_WPP_JOR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-KAZ / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 21083626.0, "2030": 22003193.0, "2035": 23125951.0, "2040": 24246823.0, "2045": 25409756.0, "2050": 26544265.0, "2051": 26757521.0}.

Result: 0.2691138137244513. Units: Persons /fractionchange. Input IDs: UN_WPP_KAZ. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-KEN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 58636412.0, "2030": 63102245.0, "2035": 68715909.0, "2040": 74108863.0, "2045": 79088836.0, "2050": 83593239.0, "2051": 84451673.0}.

Result: 0.44025990198718157. Units: Persons /fractionchange. Input IDs: UN_WPP_KEN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-KIR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 138445.0, "2030": 146126.0, "2035": 155440.0, "2040": 164700.0, "2045": 173813.0, "2050": 182621.0, "2051": 184260.0}.

Result: 0.3309256383401351. Units: Persons /fractionchange. Input IDs: UN_WPP_KIR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-KWT / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5102773.0, "2030": 5324198.0, "2035": 5569671.0, "2040": 5831211.0, "2045": 6099774.0, "2050": 6367756.0, "2051": 6421239.0}.

Result: 0.2583822560791946. Units: Persons /fractionchange. Input IDs: UN_WPP_KWT. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-KGZ / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 7400465.0, "2030": 7803618.0, "2035": 8282415.000000001, "2040": 8757697.0, "2045": 9222104.0, "2050": 9642952.0, "2051": 9722163.0}.

Result: 0.3137232592816803. Units: Persons /fractionchange. Input IDs: UN_WPP_KGZ. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-LAO / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 7974017.0, "2030": 8357022.999999999, "2035": 8788756.0, "2040": 9169002.0, "2045": 9492503.0, "2050": 9757285.0, "2051": 9802787.0}.

Result: 0.2293411212943237. Units: Persons /fractionchange. Input IDs: UN_WPP_LAO. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-LVA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 1835935.0, "2030": 1777620.0, "2035": 1706428.0, "2040": 1640644.0, "2045": 1577406.0, "2050": 1513810.0, "2051": 1501015.0}.

Result: -0.18242475904648037. Units: Persons /fractionchange. Input IDs: UN_WPP_LVA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-LBN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5897467.0, "2030": 6103808.0, "2035": 6357724.0, "2040": 6620329.0, "2045": 6834988.0, "2050": 6999260.0, "2051": 7025484.0}.

Result: 0.1912714390771495. Units: Persons /fractionchange. Input IDs: UN_WPP_LBN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-LSO / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 2389336.0, "2030": 2493818.0, "2035": 2626567.0, "2040": 2757876.0, "2045": 2881339.0, "2050": 2993077.0, "2051": 3013558.0}.

Result: 0.2612533356547593. Units: Persons /fractionchange. Input IDs: UN_WPP_LSO. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-LBR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5853949.0, "2030": 6366291.0, "2035": 7003557.0, "2040": 7681688.0, "2045": 8310645.0, "2050": 8910530.0, "2051": 9020146.0}.

Result: 0.5408651493205698. Units: Persons /fractionchange. Input IDs: UN_WPP_LBR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-LBY / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 7539851.0, "2030": 7885806.0, "2035": 8283952.999999999, "2040": 8651417.0, "2045": 8983949.0, "2050": 9260605.0, "2051": 9310578.0}.

Result: 0.23484907062487048. Units: Persons /fractionchange. Input IDs: UN_WPP_LBY. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-LIE / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 40368.0, "2030": 41202.0, "2035": 42005.0, "2040": 42534.0, "2045": 42861.0, "2050": 43013.0, "2051": 43031.0}.

Result: 0.06596809353943711. Units: Persons /fractionchange. Input IDs: UN_WPP_LIE. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-LTU / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 2797338.0, "2030": 2706358.0, "2035": 2597392.0, "2040": 2484835.0, "2045": 2372137.0, "2050": 2258774.0, "2051": 2235291.0}.

Result: -0.20092209093073488. Units: Persons /fractionchange. Input IDs: UN_WPP_LTU. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-LUX / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 687448.0, "2030": 713667.0, "2035": 740629.0, "2040": 762673.0, "2045": 779539.0, "2050": 791464.0, "2051": 793283.0}.

Result: 0.15395346266190324. Units: Persons /fractionchange. Input IDs: UN_WPP_LUX. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MDG / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 33522052.000000004, "2030": 36693183.0, "2035": 40733844.0, "2040": 44846895.0, "2045": 49011274.0, "2050": 53185475.0, "2051": 54016765.0}.

Result: 0.6113800253039401. Units: Persons /fractionchange. Input IDs: UN_WPP_MDG. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MWI / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 22785535.0, "2030": 25160287.0, "2035": 28213795.0, "2040": 31302098.0, "2045": 34350954.0, "2050": 37361683.0, "2051": 37964325.0}.

Result: 0.6661590346682664. Units: Persons /fractionchange. Input IDs: UN_WPP_MWI. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MYS / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 36385115.0, "2030": 37961719.0, "2035": 39814825.0, "2040": 41509644.0, "2045": 43038204.0, "2050": 44289772.0, "2051": 44502613.0}.

Result: 0.22309941853969684. Units: Persons /fractionchange. Input IDs: UN_WPP_MYS. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MDV / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 531517.0, "2030": 539667.0, "2035": 551594.0, "2040": 564798.0, "2045": 578453.0, "2050": 589962.0, "2051": 591628.0}.

Result: 0.11309327829589644. Units: Persons /fractionchange. Input IDs: UN_WPP_MDV. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MLI / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 25932275.0, "2030": 29002865.0, "2035": 33118345.0, "2040": 37413643.0, "2045": 41778982.0, "2050": 46154079.0, "2051": 47029244.0}.

Result: 0.8135410024766434. Units: Persons /fractionchange. Input IDs: UN_WPP_MLI. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MLT / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 549011.0, "2030": 555231.0, "2035": 556508.0, "2040": 551735.0, "2045": 544634.0, "2050": 535721.0, "2051": 533639.0}.

Result: -0.027999438991204162. Units: Persons /fractionchange. Input IDs: UN_WPP_MLT. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MHL / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 35075.0, "2030": 31186.0, "2035": 28142.0, "2040": 26597.0, "2045": 25773.0, "2050": 25195.0, "2051": 25088.0}.

Result: -0.2847327156094084. Units: Persons /fractionchange. Input IDs: UN_WPP_MHL. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MRT / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5461319.0, "2030": 6062528.0, "2035": 6856319.0, "2040": 7681908.0, "2045": 8538531.0, "2050": 9415598.0, "2051": 9592001.0}.

Result: 0.7563524489230533. Units: Persons /fractionchange. Input IDs: UN_WPP_MRT. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MUS / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 1265059.0, "2030": 1250432.0, "2035": 1226955.0, "2040": 1195223.0, "2045": 1154659.0, "2050": 1107197.0, "2051": 1097238.0}.

Result: -0.13265863489370855. Units: Persons /fractionchange. Input IDs: UN_WPP_MUS. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MEX / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 132997658.0, "2030": 136904738.0, "2035": 141150819.0, "2040": 144624323.0, "2045": 147240092.0, "2050": 148946274.0, "2051": 149181847.0}.

Result: 0.1216877743817113. Units: Persons /fractionchange. Input IDs: UN_WPP_MEX. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-FSM / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 114183.0, "2030": 116350.0, "2035": 119143.0, "2040": 121681.0, "2045": 124064.0, "2050": 126408.0, "2051": 126853.0}.

Result: 0.1109622273017874. Units: Persons /fractionchange. Input IDs: UN_WPP_FSM. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MCO / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 38087.0, "2030": 37366.0, "2035": 36894.0, "2040": 36627.0, "2045": 36523.0, "2050": 36757.0, "2051": 36840.0}.

Result: -0.03274083020453178. Units: Persons /fractionchange. Input IDs: UN_WPP_MCO. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MNG / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 3556798.0, "2030": 3705231.0, "2035": 3889776.0, "2040": 4095554.0, "2045": 4308779.0, "2050": 4501493.0, "2051": 4535765.0}.

Result: 0.2752382901699788. Units: Persons /fractionchange. Input IDs: UN_WPP_MNG. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MNE / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 626233.0, "2030": 612562.0, "2035": 594137.0, "2040": 574434.0, "2045": 554231.0, "2050": 533295.0, "2051": 529032.0}.

Result: -0.1552153910764843. Units: Persons /fractionchange. Input IDs: UN_WPP_MNE. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MAR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 38762441.0, "2030": 39953460.0, "2035": 41182094.0, "2040": 42168205.0, "2045": 42925306.0, "2050": 43440431.0, "2051": 43517149.0}.

Result: 0.1226627600671486. Units: Persons /fractionchange. Input IDs: UN_WPP_MAR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MOZ / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 36639851.0, "2030": 40846755.0, "2035": 46411774.0, "2040": 52124215.0, "2045": 57851793.0, "2050": 63530952.0, "2051": 64647084.0}.

Result: 0.7643926554177307. Units: Persons /fractionchange. Input IDs: UN_WPP_MOZ. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MMR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 55184819.0, "2030": 56351031.0, "2035": 57444464.0, "2040": 58169858.0, "2045": 58558172.0, "2050": 58623232.0, "2051": 58602738.0}.

Result: 0.061935855946179785. Units: Persons /fractionchange. Input IDs: UN_WPP_MMR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-NAM / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 3153246.0, "2030": 3389958.0, "2035": 3678880.0, "2040": 3962405.0, "2045": 4243350.0, "2050": 4512301.0, "2051": 4564906.0}.

Result: 0.4476847033184217. Units: Persons /fractionchange. Input IDs: UN_WPP_NAM. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-NRU / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 12101.0, "2030": 12521.0, "2035": 13233.0, "2040": 14039.0, "2045": 14928.0, "2050": 15758.0, "2051": 15913.0}.

Result: 0.31501528799272793. Units: Persons /fractionchange. Input IDs: UN_WPP_NRU. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-NPL / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 29629410.0, "2030": 30509996.0, "2035": 31798004.0, "2040": 32909536.999999996, "2045": 33861060.0, "2050": 34642027.0, "2051": 34777003.0}.

Result: 0.1737325515425383. Units: Persons /fractionchange. Input IDs: UN_WPP_NPL. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-NLD / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 18448775.0, "2030": 18757217.0, "2035": 18977352.0, "2040": 19062983.0, "2045": 19041975.0, "2050": 18958475.0, "2051": 18934376.0}.

Result: 0.026321585037488937. Units: Persons /fractionchange. Input IDs: UN_WPP_NLD. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-NZL / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5287479.0, "2030": 5407349.0, "2035": 5520602.0, "2040": 5617291.0, "2045": 5700556.0, "2050": 5755288.0, "2051": 5766716.0}.

Result: 0.0906361992170559. Units: Persons /fractionchange. Input IDs: UN_WPP_NZL. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-NIC / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 7097329.0, "2030": 7441603.0, "2035": 7836703.0, "2040": 8189914.0, "2045": 8497615.0, "2050": 8756430.0, "2051": 8801962.0}.

Result: 0.24017950978459646. Units: Persons /fractionchange. Input IDs: UN_WPP_NIC. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-NER / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 28814878.0, "2030": 32518075.0, "2035": 37353463.0, "2040": 42316740.0, "2045": 47374117.0, "2050": 52513876.0, "2051": 53546930.0}.

Result: 0.8583084058173003. Units: Persons /fractionchange. Input IDs: UN_WPP_NER. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-NGA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 242431832.0, "2030": 262380969.99999997, "2035": 287685763.0, "2040": 312710416.0, "2045": 336662502.0, "2050": 359185556.0, "2051": 363523611.0}.

Result: 0.49948795090572107. Units: Persons /fractionchange. Input IDs: UN_WPP_NGA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: 7. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MKD / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 1804063.0, "2030": 1762486.0, "2035": 1704194.0, "2040": 1641908.0, "2045": 1577355.0, "2050": 1512688.0, "2051": 1499303.0}.

Result: -0.16892979901477945. Units: Persons /fractionchange. Input IDs: UN_WPP_MKD. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-NOR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5652989.0, "2030": 5729095.0, "2035": 5801417.0, "2040": 5853869.0, "2045": 5886017.0, "2050": 5899829.0, "2051": 5899792.0}.

Result: 0.043658850211808264. Units: Persons /fractionchange. Input IDs: UN_WPP_NOR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-OMN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5671458.0, "2030": 6112706.0, "2035": 6517803.0, "2040": 6931974.0, "2045": 7370225.0, "2050": 7827002.0, "2051": 7920185.0}.

Result: 0.3964989249677948. Units: Persons /fractionchange. Input IDs: UN_WPP_OMN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-PAK / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 259299791.0, "2030": 276883255.0, "2035": 300643508.0, "2040": 324937697.0, "2045": 348837726.0, "2050": 371863793.0, "2051": 376335025.0}.

Result: 0.451351054116353. Units: Persons /fractionchange. Input IDs: UN_WPP_PAK. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-PLW / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 17614.0, "2030": 17376.0, "2035": 17015.0, "2040": 16602.0, "2045": 16088.999999999998, "2050": 15518.0, "2051": 15403.0}.

Result: -0.12552515044850687. Units: Persons /fractionchange. Input IDs: UN_WPP_PLW. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-PAN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 4625718.0, "2030": 4833859.0, "2035": 5072263.0, "2040": 5286592.0, "2045": 5473276.0, "2050": 5630680.0, "2051": 5658479.0}.

Result: 0.22326501529059928. Units: Persons /fractionchange. Input IDs: UN_WPP_PAN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-PNG / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 10947848.0, "2030": 11671424.0, "2035": 12540603.0, "2040": 13376160.0, "2045": 14165588.0, "2050": 14906590.0, "2051": 15046436.0}.

Result: 0.37437384954559105. Units: Persons /fractionchange. Input IDs: UN_WPP_PNG. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-PRY / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 7095279.0, "2030": 7407618.0, "2035": 7763520.0, "2040": 8087572.0, "2045": 8380530.000000001, "2050": 8640464.0, "2051": 8687836.0}.

Result: 0.22445304828745982. Units: Persons /fractionchange. Input IDs: UN_WPP_PRY. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-PER / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 34922148.0, "2030": 36193880.0, "2035": 37591425.0, "2040": 38794649.0, "2045": 39796724.0, "2050": 40583876.0, "2051": 40716361.0}.

Result: 0.1659180013783803. Units: Persons /fractionchange. Input IDs: UN_WPP_PER. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-PHL / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 117724471.0, "2030": 121408895.0, "2035": 125740971.0, "2040": 129546659.0, "2045": 132492032.0, "2050": 134373439.0, "2051": 134612611.0}.

Result: 0.143454796241981. Units: Persons /fractionchange. Input IDs: UN_WPP_PHL. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-POL / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 37843188.0, "2030": 37198543.0, "2035": 36243787.0, "2040": 35179554.0, "2045": 34031059.0, "2050": 32814095.999999996, "2051": 32561485.0}.

Result: -0.1395681304651183. Units: Persons /fractionchange. Input IDs: UN_WPP_POL. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-PRT / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 10395362.0, "2030": 10317927.0, "2035": 10208240.0, "2040": 10082255.0, "2045": 9938389.0, "2050": 9770271.0, "2051": 9734815.0}.

Result: -0.06354247211400621. Units: Persons /fractionchange. Input IDs: UN_WPP_PRT. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-QAT / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 3173559.0, "2030": 3333610.0, "2035": 3511258.0, "2040": 3711503.0, "2045": 3930896.0, "2050": 4164461.0000000005, "2051": 4212656.0}.

Result: 0.32742324941808243. Units: Persons /fractionchange. Input IDs: UN_WPP_QAT. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-KOR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 51600388.0, "2030": 51188584.0, "2035": 50300733.0, "2040": 48948687.0, "2045": 47232956.0, "2050": 45143134.0, "2051": 44671149.0}.

Result: -0.13428656776766867. Units: Persons /fractionchange. Input IDs: UN_WPP_KOR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-MDA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 2961253.0, "2030": 2845242.0, "2035": 2702010.0, "2040": 2568810.0, "2045": 2454941.0, "2050": 2351809.0, "2051": 2331186.0}.

Result: -0.21277040496033262. Units: Persons /fractionchange. Input IDs: UN_WPP_MDA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ROU / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 18800605.0, "2030": 18359507.0, "2035": 17794417.0, "2040": 17209718.0, "2045": 16620320.0, "2050": 16027266.0, "2051": 15907818.0}.

Result: -0.15386669737489833. Units: Persons /fractionchange. Input IDs: UN_WPP_ROU. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-RUS / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 143394458.0, "2030": 141889410.0, "2035": 139909641.0, "2040": 138281831.0, "2045": 137152207.0, "2050": 136132775.0, "2051": 135876189.0}.

Result: -0.05243068041025689. Units: Persons /fractionchange. Input IDs: UN_WPP_RUS. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-RWA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 14889693.0, "2030": 16154705.0, "2035": 17746319.0, "2040": 19440770.0, "2045": 21152658.0, "2050": 22707910.0, "2051": 23007765.0}.

Result: 0.5452141961556898. Units: Persons /fractionchange. Input IDs: UN_WPP_RWA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-KNA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 46992.0, "2030": 47134.0, "2035": 46928.0, "2040": 46313.0, "2045": 45367.0, "2050": 44249.0, "2051": 43998.0}.

Result: -0.06371297242083762. Units: Persons /fractionchange. Input IDs: UN_WPP_KNA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-LCA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 180488.0, "2030": 181359.0, "2035": 181178.0, "2040": 179293.0, "2045": 176236.0, "2050": 172081.0, "2051": 171147.0}.

Result: -0.05175413323877487. Units: Persons /fractionchange. Input IDs: UN_WPP_LCA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-VCT / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 99245.0, "2030": 96856.0, "2035": 94484.0, "2040": 92650.0, "2045": 90955.0, "2050": 88942.0, "2051": 88495.0}.

Result: -0.10831779938535946. Units: Persons /fractionchange. Input IDs: UN_WPP_VCT. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-WSM / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 220528.0, "2030": 225971.0, "2035": 235179.0, "2040": 247196.0, "2045": 260262.0, "2050": 272726.0, "2051": 275124.0}.

Result: 0.24756946963650872. Units: Persons /fractionchange. Input IDs: UN_WPP_WSM. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SMR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 33605.0, "2030": 33742.0, "2035": 33828.0, "2040": 33969.0, "2045": 33920.0, "2050": 33696.0, "2051": 33643.0}.

Result: 0.001130784109507621. Units: Persons /fractionchange. Input IDs: UN_WPP_SMR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-STP / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 244994.0, "2030": 264565.0, "2035": 290088.0, "2040": 315842.0, "2045": 340926.0, "2050": 365115.0, "2051": 369875.0}.

Result: 0.5097308505514422. Units: Persons /fractionchange. Input IDs: UN_WPP_STP. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SAU / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 35165787.0, "2030": 37443751.0, "2035": 40012640.0, "2040": 42592205.0, "2045": 45156465.0, "2050": 47693910.0, "2051": 48198043.0}.

Result: 0.37059474881082566. Units: Persons /fractionchange. Input IDs: UN_WPP_SAU. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SEN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 19366548.0, "2030": 21163192.0, "2035": 23476596.0, "2040": 25797510.0, "2045": 28089699.0, "2050": 30364954.0, "2051": 30817068.0}.

Result: 0.5912525040600938. Units: Persons /fractionchange. Input IDs: UN_WPP_SEN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SRB / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 6641964.0, "2030": 6461212.0, "2035": 6226578.0, "2040": 5987456.0, "2045": 5753266.0, "2050": 5532870.0, "2051": 5489989.0}.

Result: -0.17343891053911165. Units: Persons /fractionchange. Input IDs: UN_WPP_SRB. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SYC / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 134959.0, "2030": 140399.0, "2035": 141891.0, "2040": 142544.0, "2045": 142524.0, "2050": 141746.0, "2051": 141518.0}.

Result: 0.04859994516853261. Units: Persons /fractionchange. Input IDs: UN_WPP_SYC. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SLE / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 8996745.0, "2030": 9694858.0, "2035": 10563167.0, "2040": 11398400.0, "2045": 12208880.0, "2050": 12948325.0, "2051": 13093462.0}.

Result: 0.45535546467083376. Units: Persons /fractionchange. Input IDs: UN_WPP_SLE. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SGP / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5905748.0, "2030": 6031377.0, "2035": 6153233.0, "2040": 6194782.0, "2045": 6156188.0, "2050": 6081691.0, "2051": 6064528.0}.

Result: 0.026885671383201526. Units: Persons /fractionchange. Input IDs: UN_WPP_SGP. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SVK / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5451342.0, "2030": 5401392.0, "2035": 5307343.0, "2040": 5192010.0, "2045": 5066919.0, "2050": 4936488.0, "2051": 4909328.0}.

Result: -0.0994276271787754. Units: Persons /fractionchange. Input IDs: UN_WPP_SVK. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SVN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 2114573.0, "2030": 2098956.0, "2035": 2073835.9999999998, "2040": 2046764.0, "2045": 2016283.0, "2050": 1981553.0, "2051": 1973639.0}.

Result: -0.06664891682623397. Units: Persons /fractionchange. Input IDs: UN_WPP_SVN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SLB / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 858288.0, "2030": 938348.0, "2035": 1039656.9999999999, "2040": 1135455.0, "2045": 1224199.0, "2050": 1309110.0, "2051": 1325603.0}.

Result: 0.5444734168484238. Units: Persons /fractionchange. Input IDs: UN_WPP_SLB. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SOM / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 20305907.0, "2030": 22915044.0, "2035": 26294950.0, "2040": 29896287.0, "2045": 33510165.999999996, "2050": 37206512.0, "2051": 37953802.0}.

Result: 0.869101537793904. Units: Persons /fractionchange. Input IDs: UN_WPP_SOM. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ZAF / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 65453084.0, "2030": 68161359.0, "2035": 71234752.0, "2040": 74035624.0, "2045": 76681450.0, "2050": 79177328.0, "2051": 79652213.0}.

Result: 0.2169359811983802. Units: Persons /fractionchange. Input IDs: UN_WPP_ZAF. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SSD / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 12436037.0, "2030": 13457453.0, "2035": 14798600.0, "2040": 16101480.0, "2045": 17286410.0, "2050": 18341974.0, "2051": 18542997.0}.

Result: 0.49106962290318057. Units: Persons /fractionchange. Input IDs: UN_WPP_SSD. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ESP / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 47850793.0, "2030": 47610520.0, "2035": 47154196.0, "2040": 46591674.0, "2045": 45879964.0, "2050": 44928558.0, "2051": 44712279.0}.

Result: -0.06558959221428162. Units: Persons /fractionchange. Input IDs: UN_WPP_ESP. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-LKA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 23348315.0, "2030": 23767952.0, "2035": 24196475.0, "2040": 24526699.0, "2045": 24736435.0, "2050": 24813690.0, "2051": 24814757.0}.

Result: 0.0628071875850571. Units: Persons /fractionchange. Input IDs: UN_WPP_LKA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-PSE / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 5692790.0, "2030": 6122314.0, "2035": 6692735.0, "2040": 7291826.0, "2045": 7895095.0, "2050": 8451891.0, "2051": 8559237.0}.

Result: 0.5035223502008681. Units: Persons /fractionchange. Input IDs: UN_WPP_PSE. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SDN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 53282719.0, "2030": 58571616.0, "2035": 65148317.0, "2040": 71730599.0, "2045": 78415203.0, "2050": 85206383.0, "2051": 86579067.0}.

Result: 0.6248995664053856. Units: Persons /fractionchange. Input IDs: UN_WPP_SDN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SUR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 645256.0, "2030": 665652.0, "2035": 688191.0, "2040": 707160.0, "2045": 722756.0, "2050": 733904.0, "2051": 735702.0}.

Result: 0.1401707229378728. Units: Persons /fractionchange. Input IDs: UN_WPP_SUR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SWE / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 10701047.0, "2030": 10841810.0, "2035": 10964978.0, "2040": 11078602.0, "2045": 11202872.0, "2050": 11309630.0, "2051": 11327101.0}.

Result: 0.058503994982920915. Units: Persons /fractionchange. Input IDs: UN_WPP_SWE. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-CHE / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 9007798.0, "2030": 9130292.0, "2035": 9224225.0, "2040": 9276178.0, "2045": 9315498.0, "2050": 9342586.0, "2051": 9343512.0}.

Result: 0.03726926380897977. Units: Persons /fractionchange. Input IDs: UN_WPP_CHE. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-SYR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 26472497.0, "2030": 29395540.0, "2035": 32294793.0, "2040": 34533185.0, "2045": 36265286.0, "2050": 37793372.0, "2051": 38104385.0}.

Result: 0.439395195700655. Units: Persons /fractionchange. Input IDs: UN_WPP_SYR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-TJK / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 10978599.0, "2030": 11733068.0, "2035": 12695585.0, "2040": 13713947.0, "2045": 14694862.0, "2050": 15574642.0, "2051": 15737680.0}.

Result: 0.43348709612219194. Units: Persons /fractionchange. Input IDs: UN_WPP_TJK. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-THA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 71559614.0, "2030": 71215022.0, "2035": 70540885.0, "2040": 69535002.0, "2045": 68150152.0, "2050": 66382735.0, "2051": 65985159.0}.

Result: -0.07789945596967585. Units: Persons /fractionchange. Input IDs: UN_WPP_THA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-TLS / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 1436923.0, "2030": 1519804.0, "2035": 1618798.0, "2040": 1718249.0, "2045": 1809633.0, "2050": 1889249.0, "2051": 1902810.0}.

Result: 0.32422544562234723. Units: Persons /fractionchange. Input IDs: UN_WPP_TLS. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-TGO / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 9930918.0, "2030": 10792997.0, "2035": 11937684.0, "2040": 13121352.0, "2045": 14347512.0, "2050": 15584778.0, "2051": 15831367.0}.

Result: 0.5941494029051493. Units: Persons /fractionchange. Input IDs: UN_WPP_TGO. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-TON / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 103291.0, "2030": 102072.0, "2035": 101829.0, "2040": 102565.0, "2045": 103930.0, "2050": 105195.0, "2051": 105416.0}.

Result: 0.020572944399802395. Units: Persons /fractionchange. Input IDs: UN_WPP_TON. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-TTO / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 1513268.0, "2030": 1512322.0, "2035": 1497855.0, "2040": 1472944.0, "2045": 1439585.0, "2050": 1399800.0, "2051": 1391195.0}.

Result: -0.08066846057671218. Units: Persons /fractionchange. Input IDs: UN_WPP_TTO. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-TUN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 12415138.0, "2030": 12628142.0, "2035": 12812269.0, "2040": 12953864.0, "2045": 13076089.0, "2050": 13145141.0, "2051": 13148162.0}.

Result: 0.05904275892865618. Units: Persons /fractionchange. Input IDs: UN_WPP_TUN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-TKM / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 7736632.0, "2030": 8135729.0, "2035": 8538668.0, "2040": 8932231.0, "2045": 9312822.0, "2050": 9639708.0, "2051": 9694833.0}.

Result: 0.2531076830331338. Units: Persons /fractionchange. Input IDs: UN_WPP_TKM. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-TUV / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 9362.0, "2030": 9047.0, "2035": 8980.0, "2040": 9140.0, "2045": 9438.0, "2050": 9781.0, "2051": 9849.0}.

Result: 0.05201879940183729. Units: Persons /fractionchange. Input IDs: UN_WPP_TUV. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-TUR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 87926082.0, "2030": 89027542.0, "2035": 90188557.0, "2040": 91009681.0, "2045": 91392535.0, "2050": 91258061.0, "2051": 91140413.0}.

Result: 0.036557195850032365. Units: Persons /fractionchange. Input IDs: UN_WPP_TUR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-UGA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 52761469.0, "2030": 58312940.0, "2035": 65205574.0, "2040": 72020418.0, "2045": 78797992.0, "2050": 85431202.0, "2051": 86718842.0}.

Result: 0.6436017351980856. Units: Persons /fractionchange. Input IDs: UN_WPP_UGA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-UKR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 39535849.0, "2030": 38353853.0, "2035": 36828147.0, "2040": 35270911.0, "2045": 33680445.0, "2050": 31990132.0, "2051": 31637037.0}.

Result: -0.19978860198499848. Units: Persons /fractionchange. Input IDs: UN_WPP_UKR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ARE / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 11574682.0, "2030": 12190605.0, "2035": 12910702.0, "2040": 13693776.0, "2045": 14507366.0, "2050": 15367392.0, "2051": 15543672.0}.

Result: 0.3429027251029446. Units: Persons /fractionchange. Input IDs: UN_WPP_ARE. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-GBR / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 69931528.0, "2030": 71286992.0, "2035": 72656815.0, "2040": 73774626.0, "2045": 74753658.0, "2050": 75504681.0, "2051": 75616457.0}.

Result: 0.08129278971281728. Units: Persons /fractionchange. Input IDs: UN_WPP_GBR. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-TZA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 72563780.0, "2030": 80913124.0, "2035": 92091429.0, "2040": 103999359.0, "2045": 116525473.0, "2050": 129621102.0, "2051": 132280446.99999999}.

Result: 0.82295419284938. Units: Persons /fractionchange. Input IDs: UN_WPP_TZA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-USA / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 349035494.0, "2030": 355649881.0, "2035": 363284716.0, "2040": 370209316.0, "2045": 376106472.0, "2050": 380846910.0, "2051": 381708396.0}.

Result: 0.09360911013823703. Units: Persons /fractionchange. Input IDs: UN_WPP_USA. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-URY / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 3382537.0, "2030": 3372887.0, "2035": 3358282.0, "2040": 3336459.0, "2045": 3302675.0, "2050": 3254354.0, "2051": 3242784.0}.

Result: -0.04131602995030059. Units: Persons /fractionchange. Input IDs: UN_WPP_URY. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-UZB / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 37724223.0, "2030": 40248241.0, "2035": 43175102.0, "2040": 46044152.0, "2045": 49096063.0, "2050": 52210755.0, "2051": 52819885.0}.

Result: 0.40015832797934636. Units: Persons /fractionchange. Input IDs: UN_WPP_UZB. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-VUT / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 342564.0, "2030": 372428.0, "2035": 411063.0, "2040": 451512.0, "2045": 492990.0, "2050": 534388.0, "2051": 542587.0}.

Result: 0.5838996508681589. Units: Persons /fractionchange. Input IDs: UN_WPP_VUT. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-VEN / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 28633711.0, "2030": 29151810.0, "2035": 29883329.0, "2040": 30495443.0, "2045": 30871487.0, "2050": 31094883.0, "2051": 31122396.0}.

Result: 0.08691451136040307. Units: Persons /fractionchange. Input IDs: UN_WPP_VEN. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-VNM / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 102177431.0, "2030": 104254902.0, "2035": 106530676.0, "2040": 108437635.0, "2045": 109685398.0, "2050": 110008908.0, "2051": 109963189.0}.

Result: 0.07619841215228829. Units: Persons /fractionchange. Input IDs: UN_WPP_VNM. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-YEM / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 42961653.0, "2030": 47667662.0, "2035": 53429325.0, "2040": 59181526.0, "2045": 65066356.0, "2050": 70976403.0, "2051": 72147203.0}.

Result: 0.679339549621147. Units: Persons /fractionchange. Input IDs: UN_WPP_YEM. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ZMB / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 22521915.0, "2030": 25024901.0, "2035": 28266892.0, "2040": 31550402.0, "2045": 34821106.0, "2050": 38083385.0, "2051": 38728892.0}.

Result: 0.7196091895382786. Units: Persons /fractionchange. Input IDs: UN_WPP_ZMB. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-POP-ZWE / Population projectionpath

Formula: WPP thousands×1000;2051/2026−1.

Substitution: {"2026": 17273580.0, "2030": 18610349.0, "2035": 20409146.0, "2040": 22250109.0, "2045": 24102380.0, "2050": 25866385.0, "2051": 26217392.0}.

Result: 0.517774080416451. Units: Persons /fractionchange. Input IDs: UN_WPP_ZWE. Sources: UN_WPP. Assumptions: .

Workbook: Calculation_Audit!A4:M248 (locate stable ID in column A); Sources!A:A; Inputs!A:A. Code/data: scripts/olam-analyse.py. Slide: Indexed country/calculation companion. Limit: No category demand inference. Sensitivity: UNmediumvariantonly.

## C-WBFOOD-AFG / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: AFG, 2019, exact matched observations in country-panel.csv.

Result: 1824086402.99416. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-AFG. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ALB / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ALB, 2024, exact matched observations in country-panel.csv.

Result: 1595872541.6014109. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ALB. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-DZA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: DZA, 2017, exact matched observations in country-panel.csv.

Result: 9317754794.906103. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-DZA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-AND / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: AND, 2023, exact matched observations in country-panel.csv.

Result: 426901906.45508695. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-AND. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-AGO / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: AGO, 2024, exact matched observations in country-panel.csv.

Result: 2196150985.0051885. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-AGO. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ATG / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ATG, 2024, exact matched observations in country-panel.csv.

Result: 227727305.44245392. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ATG. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ARG / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ARG, 2024, exact matched observations in country-panel.csv.

Result: 5520608117.085689. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ARG. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ARM / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ARM, 2024, exact matched observations in country-panel.csv.

Result: 1427097102.4313998. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ARM. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-AUS / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: AUS, 2025, exact matched observations in country-panel.csv.

Result: 20236525638.395187. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-AUS. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-AUT / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: AUT, 2024, exact matched observations in country-panel.csv.

Result: 20189324032.95211. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-AUT. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-AZE / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: AZE, 2025, exact matched observations in country-panel.csv.

Result: 3032552512.072945. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-AZE. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BHS / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BHS, 2024, exact matched observations in country-panel.csv.

Result: 986916656.9229306. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BHS. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BHR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BHR, 2024, exact matched observations in country-panel.csv.

Result: 2343143224.4452443. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BHR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BGD / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BGD, 2018, exact matched observations in country-panel.csv.

Result: 7865727048.813534. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BGD. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BRB / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BRB, 2024, exact matched observations in country-panel.csv.

Result: 488888234.5771056. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BRB. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BLR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BLR, 2021, exact matched observations in country-panel.csv.

Result: 4279348708.4748607. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BLR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BEL / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BEL, 2024, exact matched observations in country-panel.csv.

Result: 62134254449.57687. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BEL. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BLZ / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BLZ, 2025, exact matched observations in country-panel.csv.

Result: 276886598.6106161. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BLZ. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BEN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BEN, 2024, exact matched observations in country-panel.csv.

Result: 1608602507.6312127. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BEN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BTN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BTN, 2025, exact matched observations in country-panel.csv.

Result: 249712404.46984825. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BTN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BOL / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BOL, 2024, exact matched observations in country-panel.csv.

Result: 744125651.5016854. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BOL. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BIH / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BIH, 2025, exact matched observations in country-panel.csv.

Result: 3151899554.624047. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BIH. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BWA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BWA, 2023, exact matched observations in country-panel.csv.

Result: 1054350036.7949239. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BWA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BRA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BRA, 2025, exact matched observations in country-panel.csv.

Result: 16226920091.855171. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BRA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BRN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BRN, 2024, exact matched observations in country-panel.csv.

Result: 595913146.2251436. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BRN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BGR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BGR, 2024, exact matched observations in country-panel.csv.

Result: 7261748940.630695. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BGR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BFA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BFA, 2024, exact matched observations in country-panel.csv.

Result: 719463814.3152906. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BFA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-BDI / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: BDI, 2023, exact matched observations in country-panel.csv.

Result: 163585867.63748187. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-BDI. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-CPV / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: CPV, 2024, exact matched observations in country-panel.csv.

Result: 608562990.217463. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-CPV. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-KHM / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: KHM, 2024, exact matched observations in country-panel.csv.

Result: 2140805676.9942493. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-KHM. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-CMR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: CMR, 2023, exact matched observations in country-panel.csv.

Result: 1790205446.3931196. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-CMR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-CAN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: CAN, 2024, exact matched observations in country-panel.csv.

Result: 52738198428.644005. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-CAN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-CAF / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: CAF, 2024, exact matched observations in country-panel.csv.

Result: 111490341.11110164. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-CAF. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-CHL / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: CHL, 2025, exact matched observations in country-panel.csv.

Result: 10727237465.438208. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-CHL. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-CHN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: CHN, 2024, exact matched observations in country-panel.csv.

Result: 209434671437.8839. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-CHN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-COL / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: COL, 2024, exact matched observations in country-panel.csv.

Result: 8812424967.658024. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-COL. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-COM / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: COM, 2023, exact matched observations in country-panel.csv.

Result: 150603397.3188956. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-COM. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-COG / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: COG, 2023, exact matched observations in country-panel.csv.

Result: 997882679.388699. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-COG. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-CRI / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: CRI, 2024, exact matched observations in country-panel.csv.

Result: 3507461528.8276005. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-CRI. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-HRV / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: HRV, 2024, exact matched observations in country-panel.csv.

Result: 6724780531.433829. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-HRV. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-CUB / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: CUB, 2022, exact matched observations in country-panel.csv.

Result: 2479026006.344521. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-CUB. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-CYP / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: CYP, 2024, exact matched observations in country-panel.csv.

Result: 2064142361.8809397. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-CYP. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-CZE / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: CZE, 2024, exact matched observations in country-panel.csv.

Result: 15731066139.102625. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-CZE. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-CIV / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: CIV, 2024, exact matched observations in country-panel.csv.

Result: 3522187892.849888. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-CIV. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-COD / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: COD, 2023, exact matched observations in country-panel.csv.

Result: 1217064532.1801777. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-COD. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-DNK / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: DNK, 2025, exact matched observations in country-panel.csv.

Result: 18474340292.202385. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-DNK. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-DJI / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: DJI, 2023, exact matched observations in country-panel.csv.

Result: 2041817341.2828631. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-DJI. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-DMA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: DMA, 2023, exact matched observations in country-panel.csv.

Result: 75983048.36405323. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-DMA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-DOM / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: DOM, 2024, exact matched observations in country-panel.csv.

Result: 5140518489.511417. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-DOM. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ECU / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ECU, 2024, exact matched observations in country-panel.csv.

Result: 3605714419.8050356. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ECU. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-EGY / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: EGY, 2024, exact matched observations in country-panel.csv.

Result: 17598365051.113136. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-EGY. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SLV / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SLV, 2024, exact matched observations in country-panel.csv.

Result: 3168995940.2476444. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SLV. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ERI / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ERI, 2003, exact matched observations in country-panel.csv.

Result: 197324072.0143033. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ERI. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-EST / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: EST, 2024, exact matched observations in country-panel.csv.

Result: 3198208332.142931. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-EST. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SWZ / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SWZ, 2023, exact matched observations in country-panel.csv.

Result: 399290010.0365942. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SWZ. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ETH / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ETH, 2023, exact matched observations in country-panel.csv.

Result: 2387563737.8398194. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ETH. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-FJI / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: FJI, 2024, exact matched observations in country-panel.csv.

Result: 586991460.0482217. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-FJI. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-FIN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: FIN, 2024, exact matched observations in country-panel.csv.

Result: 7148700096.286494. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-FIN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-FRA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: FRA, 2024, exact matched observations in country-panel.csv.

Result: 79665104219.84392. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-FRA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-GAB / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: GAB, 2023, exact matched observations in country-panel.csv.

Result: 662734341.1497755. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-GAB. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-GMB / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: GMB, 2024, exact matched observations in country-panel.csv.

Result: 217433923.13417095. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-GMB. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-GEO / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: GEO, 2024, exact matched observations in country-panel.csv.

Result: 2104083250.179856. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-GEO. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-DEU / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: DEU, 2024, exact matched observations in country-panel.csv.

Result: 129540345133.0316. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-DEU. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-GHA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: GHA, 2023, exact matched observations in country-panel.csv.

Result: 1918465572.7958875. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-GHA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-GRC / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: GRC, 2024, exact matched observations in country-panel.csv.

Result: 12094682376.261883. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-GRC. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-GRD / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: GRD, 2024, exact matched observations in country-panel.csv.

Result: 153547490.14876923. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-GRD. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-GTM / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: GTM, 2024, exact matched observations in country-panel.csv.

Result: 5656719292.372824. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-GTM. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-GIN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: GIN, 2016, exact matched observations in country-panel.csv.

Result: 1177024563.9214342. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-GIN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-GNB / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: GNB, 2018, exact matched observations in country-panel.csv.

Result: 143900713.44062883. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-GNB. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-GUY / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: GUY, 2025, exact matched observations in country-panel.csv.

Result: 661648381.9422116. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-GUY. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-HTI / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: HTI, 2016, exact matched observations in country-panel.csv.

Result: 1410716550.9494019. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-HTI. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-HND / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: HND, 2024, exact matched observations in country-panel.csv.

Result: 3456003814.5955815. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-HND. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-HUN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: HUN, 2025, exact matched observations in country-panel.csv.

Result: 11223376500.537548. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-HUN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ISL / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ISL, 2025, exact matched observations in country-panel.csv.

Result: 1211318201.596844. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ISL. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-IND / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: IND, 2024, exact matched observations in country-panel.csv.

Result: 36353451674.99419. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-IND. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-IDN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: IDN, 2025, exact matched observations in country-panel.csv.

Result: 24688441582.426815. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-IDN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-IRN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: IRN, 2022, exact matched observations in country-panel.csv.

Result: 17317866344.925434. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-IRN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-IRQ / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: IRQ, 2014, exact matched observations in country-panel.csv.

Result: 4216939693.495306. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-IRQ. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-IRL / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: IRL, 2024, exact matched observations in country-panel.csv.

Result: 13551142022.544493. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-IRL. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ISR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ISR, 2024, exact matched observations in country-panel.csv.

Result: 9696094194.014727. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ISR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ITA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ITA, 2024, exact matched observations in country-panel.csv.

Result: 69698335602.25407. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ITA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-JAM / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: JAM, 2023, exact matched observations in country-panel.csv.

Result: 1557473548.5443795. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-JAM. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-JPN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: JPN, 2025, exact matched observations in country-panel.csv.

Result: 73854014731.20944. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-JPN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-JOR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: JOR, 2024, exact matched observations in country-panel.csv.

Result: 5559229378.151394. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-JOR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-KAZ / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: KAZ, 2024, exact matched observations in country-panel.csv.

Result: 6485505633.842246. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-KAZ. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-KEN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: KEN, 2024, exact matched observations in country-panel.csv.

Result: 3265992016.644896. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-KEN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-KIR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: KIR, 2021, exact matched observations in country-panel.csv.

Result: 72942155.05429988. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-KIR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-KWT / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: KWT, 2024, exact matched observations in country-panel.csv.

Result: 6656623700.110077. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-KWT. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-KGZ / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: KGZ, 2025, exact matched observations in country-panel.csv.

Result: 1628565076.7057798. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-KGZ. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-LAO / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: LAO, 2023, exact matched observations in country-panel.csv.

Result: 970554086.3018605. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-LAO. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-LVA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: LVA, 2025, exact matched observations in country-panel.csv.

Result: 4691964771.072992. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-LVA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-LBN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: LBN, 2024, exact matched observations in country-panel.csv.

Result: 3210566571.0703545. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-LBN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-LSO / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: LSO, 2024, exact matched observations in country-panel.csv.

Result: 425303911.4971407. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-LSO. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-LBR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: LBR, 2023, exact matched observations in country-panel.csv.

Result: 479356445.70442045. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-LBR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-LBY / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: LBY, 2019, exact matched observations in country-panel.csv.

Result: 3262985503.1166077. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-LBY. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-LTU / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: LTU, 2025, exact matched observations in country-panel.csv.

Result: 6405877944.929144. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-LTU. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-LUX / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: LUX, 2024, exact matched observations in country-panel.csv.

Result: 3847562809.2581306. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-LUX. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MDG / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MDG, 2024, exact matched observations in country-panel.csv.

Result: 887169610.788788. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MDG. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MWI / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MWI, 2024, exact matched observations in country-panel.csv.

Result: 391020857.05394167. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MWI. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MYS / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MYS, 2025, exact matched observations in country-panel.csv.

Result: 28183520114.770557. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MYS. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MDV / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MDV, 2024, exact matched observations in country-panel.csv.

Result: 772641604.7532047. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MDV. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MLI / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MLI, 2023, exact matched observations in country-panel.csv.

Result: 943659639.2413805. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MLI. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MLT / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MLT, 2024, exact matched observations in country-panel.csv.

Result: 1129675631.2671711. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MLT. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MRT / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MRT, 2024, exact matched observations in country-panel.csv.

Result: 1149873266.7344294. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MRT. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MUS / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MUS, 2024, exact matched observations in country-panel.csv.

Result: 1451933478.9772015. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MUS. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MEX / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MEX, 2025, exact matched observations in country-panel.csv.

Result: 43194344355.36752. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MEX. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-FSM / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: FSM, 2013, exact matched observations in country-panel.csv.

Result: 52196116.24639562. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-FSM. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MNG / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MNG, 2023, exact matched observations in country-panel.csv.

Result: 1018448902.5490338. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MNG. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MNE / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MNE, 2024, exact matched observations in country-panel.csv.

Result: 1038413787.3255388. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MNE. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MAR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MAR, 2024, exact matched observations in country-panel.csv.

Result: 8463887509.776004. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MAR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MOZ / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MOZ, 2024, exact matched observations in country-panel.csv.

Result: 1804725966.4594724. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MOZ. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MMR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MMR, 2024, exact matched observations in country-panel.csv.

Result: 1212591664.825881. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MMR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-NAM / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: NAM, 2024, exact matched observations in country-panel.csv.

Result: 1173936025.4273493. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-NAM. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-NPL / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: NPL, 2022, exact matched observations in country-panel.csv.

Result: 2467074499.2321577. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-NPL. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-NLD / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: NLD, 2024, exact matched observations in country-panel.csv.

Result: 108375015749.1762. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-NLD. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-NZL / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: NZL, 2025, exact matched observations in country-panel.csv.

Result: 6091539100.05747. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-NZL. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-NIC / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: NIC, 2024, exact matched observations in country-panel.csv.

Result: 1898647237.676474. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-NIC. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-NER / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: NER, 2024, exact matched observations in country-panel.csv.

Result: 957211632.1311792. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-NER. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-NGA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: NGA, 2024, exact matched observations in country-panel.csv.

Result: 4545672778.745587. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-NGA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MKD / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MKD, 2024, exact matched observations in country-panel.csv.

Result: 1403172578.691468. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MKD. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-NOR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: NOR, 2025, exact matched observations in country-panel.csv.

Result: 11913988875.386265. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-NOR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-OMN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: OMN, 2024, exact matched observations in country-panel.csv.

Result: 6036934615.077476. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-OMN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-PAK / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: PAK, 2024, exact matched observations in country-panel.csv.

Result: 8379735144.687548. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-PAK. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-PLW / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: PLW, 2018, exact matched observations in country-panel.csv.

Result: 40403335.559681244. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-PLW. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-PAN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: PAN, 2024, exact matched observations in country-panel.csv.

Result: 4998224452.48518. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-PAN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-PNG / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: PNG, 2023, exact matched observations in country-panel.csv.

Result: 891879444.1693001. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-PNG. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-PRY / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: PRY, 2025, exact matched observations in country-panel.csv.

Result: 1492771074.0706718. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-PRY. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-PER / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: PER, 2024, exact matched observations in country-panel.csv.

Result: 6583080591.7393675. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-PER. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-PHL / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: PHL, 2024, exact matched observations in country-panel.csv.

Result: 20245108970.196888. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-PHL. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-POL / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: POL, 2024, exact matched observations in country-panel.csv.

Result: 37163711310.023224. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-POL. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-PRT / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: PRT, 2025, exact matched observations in country-panel.csv.

Result: 20007764958.142635. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-PRT. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-QAT / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: QAT, 2024, exact matched observations in country-panel.csv.

Result: 4003485454.598779. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-QAT. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-KOR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: KOR, 2024, exact matched observations in country-panel.csv.

Result: 39732796329.56. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-KOR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-MDA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: MDA, 2024, exact matched observations in country-panel.csv.

Result: 1395864141.143493. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-MDA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ROU / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ROU, 2024, exact matched observations in country-panel.csv.

Result: 14592229550.142183. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ROU. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-RUS / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: RUS, 2021, exact matched observations in country-panel.csv.

Result: 32689193358.729317. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-RUS. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-RWA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: RWA, 2022, exact matched observations in country-panel.csv.

Result: 1002356989.837338. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-RWA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-KNA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: KNA, 2017, exact matched observations in country-panel.csv.

Result: 78439335.32722318. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-KNA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-LCA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: LCA, 2020, exact matched observations in country-panel.csv.

Result: 139320946.3522852. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-LCA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-VCT / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: VCT, 2023, exact matched observations in country-panel.csv.

Result: 118542155.84744492. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-VCT. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-WSM / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: WSM, 2024, exact matched observations in country-panel.csv.

Result: 145197308.3270937. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-WSM. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-STP / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: STP, 2023, exact matched observations in country-panel.csv.

Result: 58539324.17557372. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-STP. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SAU / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SAU, 2024, exact matched observations in country-panel.csv.

Result: 30152408748.531284. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SAU. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SEN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SEN, 2024, exact matched observations in country-panel.csv.

Result: 2162657226.0690823. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SEN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SRB / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SRB, 2007, exact matched observations in country-panel.csv.

Result: 1107134216.1694326. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SRB. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SYC / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SYC, 2024, exact matched observations in country-panel.csv.

Result: 377518200.46535337. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SYC. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SLE / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SLE, 2018, exact matched observations in country-panel.csv.

Result: 437163317.8278171. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SLE. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SGP / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SGP, 2024, exact matched observations in country-panel.csv.

Result: 16756311869.639526. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SGP. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SVK / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SVK, 2024, exact matched observations in country-panel.csv.

Result: 8257356693.28558. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SVK. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SVN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SVN, 2024, exact matched observations in country-panel.csv.

Result: 4517146779.663229. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SVN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SLB / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SLB, 2018, exact matched observations in country-panel.csv.

Result: 133389434.6145737. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SLB. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ZAF / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ZAF, 2025, exact matched observations in country-panel.csv.

Result: 9173948103.854956. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ZAF. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ESP / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ESP, 2024, exact matched observations in country-panel.csv.

Result: 59725409305.01281. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ESP. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-LKA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: LKA, 2024, exact matched observations in country-panel.csv.

Result: 2881422041.147365. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-LKA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SDN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SDN, 2018, exact matched observations in country-panel.csv.

Result: 2347941820.0765934. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SDN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SUR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SUR, 2024, exact matched observations in country-panel.csv.

Result: 271460918.466405. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SUR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SWE / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SWE, 2024, exact matched observations in country-panel.csv.

Result: 21149534801.525703. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SWE. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-CHE / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: CHE, 2024, exact matched observations in country-panel.csv.

Result: 17260038030.645496. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-CHE. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-SYR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: SYR, 2010, exact matched observations in country-panel.csv.

Result: 3694720975.4071794. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-SYR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-TJK / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: TJK, 2023, exact matched observations in country-panel.csv.

Result: 1555862691.534611. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-TJK. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-THA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: THA, 2024, exact matched observations in country-panel.csv.

Result: 20128796041.193356. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-THA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-TLS / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: TLS, 2023, exact matched observations in country-panel.csv.

Result: 253625110.1800985. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-TLS. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-TGO / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: TGO, 2024, exact matched observations in country-panel.csv.

Result: 569161693.1168905. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-TGO. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-TON / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: TON, 2023, exact matched observations in country-panel.csv.

Result: 74771511.93691875. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-TON. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-TTO / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: TTO, 2024, exact matched observations in country-panel.csv.

Result: 1260802781.056288. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-TTO. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-TUN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: TUN, 2024, exact matched observations in country-panel.csv.

Result: 2998833454.35892. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-TUN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-TKM / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: TKM, 2000, exact matched observations in country-panel.csv.

Result: 209732293.29485548. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-TKM. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-TUV / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: TUV, 2008, exact matched observations in country-panel.csv.

Result: 5600447.915124739. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-TUV. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-TUR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: TUR, 2024, exact matched observations in country-panel.csv.

Result: 21380173402.183914. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-TUR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-UGA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: UGA, 2024, exact matched observations in country-panel.csv.

Result: 1485028663.9236047. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-UGA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-UKR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: UKR, 2024, exact matched observations in country-panel.csv.

Result: 7422219074.538817. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-UKR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ARE / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ARE, 2023, exact matched observations in country-panel.csv.

Result: 23474888200.932762. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ARE. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-GBR / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: GBR, 2025, exact matched observations in country-panel.csv.

Result: 93031876694.23149. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-GBR. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-TZA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: TZA, 2024, exact matched observations in country-panel.csv.

Result: 1305228826.4831173. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-TZA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-USA / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: USA, 2024, exact matched observations in country-panel.csv.

Result: 232809983536.10242. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-USA. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-URY / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: URY, 2024, exact matched observations in country-panel.csv.

Result: 1759547969.8426583. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-URY. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-UZB / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: UZB, 2024, exact matched observations in country-panel.csv.

Result: 4385907427.999414. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-UZB. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-VUT / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: VUT, 2011, exact matched observations in country-panel.csv.

Result: 75890955.4548575. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-VUT. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-VEN / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: VEN, 2013, exact matched observations in country-panel.csv.

Result: 8979250101.346407. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-VEN. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-VNM / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: VNM, 2023, exact matched observations in country-panel.csv.

Result: 28665117554.445892. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-VNM. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-YEM / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: YEM, 2019, exact matched observations in country-panel.csv.

Result: 1808757505.945069. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-YEM. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ZMB / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ZMB, 2024, exact matched observations in country-panel.csv.

Result: 882370198.5837479. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ZMB. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-WBFOOD-ZWE / Broad food import proxy, not eligible category demand

Formula: Same-year food merchandise-import share /100 × total merchandise imports.

Substitution: ZWE, 2024, exact matched observations in country-panel.csv.

Result: 1800536737.8009546. Units: Current USD; broad SITC food. Input IDs: I-WBFOOD-ZWE. Sources: WB_food_import_share;WB_imports_usd. Assumptions: .

Workbook: Calculation_Audit stable ID; Countries country row. Code/data: scripts/olam-analyse.py: food_import. Slide: Country atlas. Limit: Includes multiple foods; no volume/capture or Olam revenue estimate. Sensitivity: FX/current-price effects and reporting changes.

## C-CAPITAL / Capital returns and value exposure

Formula: Enumerate positive real discount-factor polynomial roots; ROIC=normalized NOPAT/(end PPE+NWC); payback=cumulative cash crossing.

Substitution: [{"mode":"trade","scenario":"managed","NPV":0.35768624230170054,"IRR_roots":[0.112467775104],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":10,"annual_discounted_payback_year":24,"peak_annual_funding":2.9413770000000037,"NPV_per_peak_funding":0.12160503135154048,"closeout_PV":0.2889778043333594,"NPV_without_closeout":0.06870843796834114,"post2036_PV":1.4447570413376705,"post2036_PV_share_of_gross_positive_PV":0.46379043841650924,"franchise_terminal_PV":0.0,"year3_ROIC":0.09890536114462992,"year3_capital_turns":11.607475835245895,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"trade","scenario":"integration","NPV":7.869359046008329,"IRR_roots":[0.398648655658],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":4,"annual_discounted_payback_year":5,"peak_annual_funding":1.5686896712328786,"NPV_per_peak_funding":5.016517409605669,"closeout_PV":0.2721287884880997,"NPV_without_closeout":7.597230257520229,"post2036_PV":4.44243377214161,"post2036_PV_share_of_gross_positive_PV":0.474717122946473,"franchise_terminal_PV":0.0,"year3_ROIC":0.3442793112035172,"year3_capital_turns":16.849982244601243,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"trade","scenario":"fragmented","NPV":-10.136255746401934,"IRR_roots":[-0.137122735378],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":null,"annual_discounted_payback_year":null,"peak_annual_funding":22.84820444735882,"NPV_per_peak_funding":-0.4436346746526795,"closeout_PV":0.30778885964547525,"NPV_without_closeout":-10.44404460604741,"post2036_PV":-1.357049557711676,"post2036_PV_share_of_gross_positive_PV":-5.029678443636748,"franchise_terminal_PV":0.0,"year3_ROIC":-0.11268830174517792,"year3_capital_turns":6.142890326298819,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"trade","scenario":"physical","NPV":-25.560849591724317,"IRR_roots":[-0.407815456078],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":null,"annual_discounted_payback_year":null,"peak_annual_funding":70.94921425008118,"NPV_per_peak_funding":-0.360269664180179,"closeout_PV":0.3950660581764834,"NPV_without_closeout":-25.9559156499008,"post2036_PV":-5.701673320677543,"post2036_PV_share_of_gross_positive_PV":-24.20903803355725,"franchise_terminal_PV":0.0,"year3_ROIC":-0.3398336763725446,"year3_capital_turns":4.566853437567628,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"trade","scenario":"squeeze","NPV":-13.357503120599379,"IRR_roots":[-0.26206427547],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":null,"annual_discounted_payback_year":null,"peak_annual_funding":36.99873139726028,"NPV_per_peak_funding":-0.361025976193024,"closeout_PV":0.1871607140109395,"NPV_without_closeout":-13.544663834610319,"post2036_PV":-2.0780270925079423,"post2036_PV_share_of_gross_positive_PV":-14.812252634633637,"franchise_terminal_PV":0.0,"year3_ROIC":-0.21217025321111577,"year3_capital_turns":5.194752508762496,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"trade","scenario":"nutrition","NPV":-0.5433706314193101,"IRR_roots":[0.085068996968],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":14,"annual_discounted_payback_year":null,"peak_annual_funding":4.071070447090416,"NPV_per_peak_funding":-0.13347119350579054,"closeout_PV":0.38010252986579984,"NPV_without_closeout":-0.9234731612851099,"post2036_PV":1.4871821355393458,"post2036_PV_share_of_gross_positive_PV":0.46691407586975897,"franchise_terminal_PV":0.0,"year3_ROIC":0.07747498383717258,"year3_capital_turns":9.10479830947019,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"partner","scenario":"managed","NPV":10.817370364399231,"IRR_roots":[0.202782898515],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":6,"annual_discounted_payback_year":8,"peak_annual_funding":9.795726027397262,"NPV_per_peak_funding":1.1042949072018322,"closeout_PV":0.5461900166094749,"NPV_without_closeout":10.271180347789755,"post2036_PV":7.656500458595857,"post2036_PV_share_of_gross_positive_PV":0.3597139997569077,"franchise_terminal_PV":0.0,"year3_ROIC":0.18684299617632655,"year3_capital_turns":3.5436200263392856,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"partner","scenario":"integration","NPV":20.592951494337385,"IRR_roots":[0.28381986333],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":5,"annual_discounted_payback_year":6,"peak_annual_funding":9.137024657534244,"NPV_per_peak_funding":2.2537918267908763,"closeout_PV":0.5673576072904493,"NPV_without_closeout":20.025593887046934,"post2036_PV":10.872703318727908,"post2036_PV_share_of_gross_positive_PV":0.3589456804409997,"franchise_terminal_PV":0.0,"year3_ROIC":0.28141906951457,"year3_capital_turns":4.1600015866092654,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"partner","scenario":"fragmented","NPV":-3.5847305871200685,"IRR_roots":[0.081941712212],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":14,"annual_discounted_payback_year":null,"peak_annual_funding":12.709059419178088,"NPV_per_peak_funding":-0.282061045501973,"closeout_PV":0.4494049369812504,"NPV_without_closeout":-4.034135524101319,"post2036_PV":2.33429376460478,"post2036_PV_share_of_gross_positive_PV":0.24285239955555596,"franchise_terminal_PV":0.0,"year3_ROIC":0.07618297771996084,"year3_capital_turns":2.724409992215729,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"partner","scenario":"physical","NPV":-17.395001416781703,"IRR_roots":[-0.064638823077],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":null,"annual_discounted_payback_year":null,"peak_annual_funding":27.95674091083143,"NPV_per_peak_funding":-0.6222113468899468,"closeout_PV":0.5242200839947374,"NPV_without_closeout":-17.91922150077644,"post2036_PV":-1.3684721673797406,"post2036_PV_share_of_gross_positive_PV":-1.6548760885448808,"franchise_terminal_PV":0.0,"year3_ROIC":-0.04197620336778026,"year3_capital_turns":2.3111021543650403,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"partner","scenario":"squeeze","NPV":-9.82494869860839,"IRR_roots":[0.008176610503],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":25,"annual_discounted_payback_year":null,"peak_annual_funding":14.232439232876722,"NPV_per_peak_funding":-0.690320790262916,"closeout_PV":0.2590067989859538,"NPV_without_closeout":-10.083955497594344,"post2036_PV":0.0926388162039345,"post2036_PV_share_of_gross_positive_PV":0.021198723367474335,"franchise_terminal_PV":0.0,"year3_ROIC":0.019050908794359715,"year3_capital_turns":2.3877609632949452,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"partner","scenario":"nutrition","NPV":10.071104437961292,"IRR_roots":[0.190933666382],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":6,"annual_discounted_payback_year":9,"peak_annual_funding":10.38084,"NPV_per_peak_funding":0.970162765051893,"closeout_PV":0.650708938187864,"NPV_without_closeout":9.420395499773429,"post2036_PV":7.600764481928649,"post2036_PV_share_of_gross_positive_PV":0.3604270113439216,"franchise_terminal_PV":0.0,"year3_ROIC":0.1766085280851699,"year3_capital_turns":3.3379053572206137,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"plant","scenario":"managed","NPV":-1.7999419404754313,"IRR_roots":[0.090371889793],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":9,"annual_discounted_payback_year":null,"peak_annual_funding":22.564383561643837,"NPV_per_peak_funding":-0.07976916079086115,"closeout_PV":0.672379863023832,"NPV_without_closeout":-2.4723218034992636,"post2036_PV":5.276493468443403,"post2036_PV_share_of_gross_positive_PV":0.21308732420512114,"franchise_terminal_PV":0.0,"year3_ROIC":0.07197432986492461,"year3_capital_turns":1.9184774763487973,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"plant","scenario":"integration","NPV":13.879461780773948,"IRR_roots":[0.152055716186],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":7,"annual_discounted_payback_year":10,"peak_annual_funding":21.728734246575343,"NPV_per_peak_funding":0.638760713038841,"closeout_PV":0.8427033117648247,"NPV_without_closeout":13.036758469009124,"post2036_PV":12.643872320313855,"post2036_PV_share_of_gross_positive_PV":0.3203996042616289,"franchise_terminal_PV":0.0,"year3_ROIC":0.12610379281593204,"year3_capital_turns":2.2104014142733877,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"plant","scenario":"fragmented","NPV":-17.20394764958582,"IRR_roots":[0.005075146236],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":25,"annual_discounted_payback_year":null,"peak_annual_funding":25.97873621917809,"NPV_per_peak_funding":-0.6622318924384581,"closeout_PV":0.4936911446260897,"NPV_without_closeout":-17.69763879421191,"post2036_PV":-0.18186413992318232,"post2036_PV_share_of_gross_positive_PV":-0.015591403392874466,"franchise_terminal_PV":0.0,"year3_ROIC":0.013489837678553468,"year3_capital_turns":1.60001820570778,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"plant","scenario":"physical","NPV":-33.292163663292115,"IRR_roots":[-0.132978687709],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":null,"annual_discounted_payback_year":null,"peak_annual_funding":57.89763621465281,"NPV_per_peak_funding":-0.5750176663493299,"closeout_PV":0.5658043535666495,"NPV_without_closeout":-33.85796801685876,"post2036_PV":-4.432559852928076,"post2036_PV_share_of_gross_positive_PV":-4.695620982377556,"franchise_terminal_PV":0.0,"year3_ROIC":-0.06774215327848386,"year3_capital_turns":1.410225651346896,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"plant","scenario":"squeeze","NPV":-24.952075111496065,"IRR_roots":[-0.082797875888],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":null,"annual_discounted_payback_year":null,"peak_annual_funding":38.204532602739775,"NPV_per_peak_funding":-0.6531181881206072,"closeout_PV":0.28173377148264445,"NPV_without_closeout":-25.23380888297871,"post2036_PV":-2.306100762344556,"post2036_PV_share_of_gross_positive_PV":-0.5200988865507326,"franchise_terminal_PV":0.0,"year3_ROIC":-0.031974430639479315,"year3_capital_turns":1.397031366691561,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"plant","scenario":"nutrition","NPV":-2.8782641183332043,"IRR_roots":[0.084776665854],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":10,"annual_discounted_payback_year":null,"peak_annual_funding":23.1676301369863,"NPV_per_peak_funding":-0.12423644979285808,"closeout_PV":0.7439729232248751,"NPV_without_closeout":-3.6222370415580794,"post2036_PV":4.952434257898219,"post2036_PV_share_of_gross_positive_PV":0.20395701689625284,"franchise_terminal_PV":0.0,"year3_ROIC":0.07232986493926076,"year3_capital_turns":1.8875238808679464,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."}].

Result: [{"mode":"trade","scenario":"managed","NPV":0.35768624230170054,"IRR_roots":[0.112467775104],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":10,"annual_discounted_payback_year":24,"peak_annual_funding":2.9413770000000037,"NPV_per_peak_funding":0.12160503135154048,"closeout_PV":0.2889778043333594,"NPV_without_closeout":0.06870843796834114,"post2036_PV":1.4447570413376705,"post2036_PV_share_of_gross_positive_PV":0.46379043841650924,"franchise_terminal_PV":0.0,"year3_ROIC":0.09890536114462992,"year3_capital_turns":11.607475835245895,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"trade","scenario":"integration","NPV":7.869359046008329,"IRR_roots":[0.398648655658],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":4,"annual_discounted_payback_year":5,"peak_annual_funding":1.5686896712328786,"NPV_per_peak_funding":5.016517409605669,"closeout_PV":0.2721287884880997,"NPV_without_closeout":7.597230257520229,"post2036_PV":4.44243377214161,"post2036_PV_share_of_gross_positive_PV":0.474717122946473,"franchise_terminal_PV":0.0,"year3_ROIC":0.3442793112035172,"year3_capital_turns":16.849982244601243,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"trade","scenario":"fragmented","NPV":-10.136255746401934,"IRR_roots":[-0.137122735378],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":null,"annual_discounted_payback_year":null,"peak_annual_funding":22.84820444735882,"NPV_per_peak_funding":-0.4436346746526795,"closeout_PV":0.30778885964547525,"NPV_without_closeout":-10.44404460604741,"post2036_PV":-1.357049557711676,"post2036_PV_share_of_gross_positive_PV":-5.029678443636748,"franchise_terminal_PV":0.0,"year3_ROIC":-0.11268830174517792,"year3_capital_turns":6.142890326298819,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"trade","scenario":"physical","NPV":-25.560849591724317,"IRR_roots":[-0.407815456078],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":null,"annual_discounted_payback_year":null,"peak_annual_funding":70.94921425008118,"NPV_per_peak_funding":-0.360269664180179,"closeout_PV":0.3950660581764834,"NPV_without_closeout":-25.9559156499008,"post2036_PV":-5.701673320677543,"post2036_PV_share_of_gross_positive_PV":-24.20903803355725,"franchise_terminal_PV":0.0,"year3_ROIC":-0.3398336763725446,"year3_capital_turns":4.566853437567628,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"trade","scenario":"squeeze","NPV":-13.357503120599379,"IRR_roots":[-0.26206427547],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":null,"annual_discounted_payback_year":null,"peak_annual_funding":36.99873139726028,"NPV_per_peak_funding":-0.361025976193024,"closeout_PV":0.1871607140109395,"NPV_without_closeout":-13.544663834610319,"post2036_PV":-2.0780270925079423,"post2036_PV_share_of_gross_positive_PV":-14.812252634633637,"franchise_terminal_PV":0.0,"year3_ROIC":-0.21217025321111577,"year3_capital_turns":5.194752508762496,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"trade","scenario":"nutrition","NPV":-0.5433706314193101,"IRR_roots":[0.085068996968],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":14,"annual_discounted_payback_year":null,"peak_annual_funding":4.071070447090416,"NPV_per_peak_funding":-0.13347119350579054,"closeout_PV":0.38010252986579984,"NPV_without_closeout":-0.9234731612851099,"post2036_PV":1.4871821355393458,"post2036_PV_share_of_gross_positive_PV":0.46691407586975897,"franchise_terminal_PV":0.0,"year3_ROIC":0.07747498383717258,"year3_capital_turns":9.10479830947019,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"partner","scenario":"managed","NPV":10.817370364399231,"IRR_roots":[0.202782898515],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":6,"annual_discounted_payback_year":8,"peak_annual_funding":9.795726027397262,"NPV_per_peak_funding":1.1042949072018322,"closeout_PV":0.5461900166094749,"NPV_without_closeout":10.271180347789755,"post2036_PV":7.656500458595857,"post2036_PV_share_of_gross_positive_PV":0.3597139997569077,"franchise_terminal_PV":0.0,"year3_ROIC":0.18684299617632655,"year3_capital_turns":3.5436200263392856,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"partner","scenario":"integration","NPV":20.592951494337385,"IRR_roots":[0.28381986333],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":5,"annual_discounted_payback_year":6,"peak_annual_funding":9.137024657534244,"NPV_per_peak_funding":2.2537918267908763,"closeout_PV":0.5673576072904493,"NPV_without_closeout":20.025593887046934,"post2036_PV":10.872703318727908,"post2036_PV_share_of_gross_positive_PV":0.3589456804409997,"franchise_terminal_PV":0.0,"year3_ROIC":0.28141906951457,"year3_capital_turns":4.1600015866092654,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"partner","scenario":"fragmented","NPV":-3.5847305871200685,"IRR_roots":[0.081941712212],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":14,"annual_discounted_payback_year":null,"peak_annual_funding":12.709059419178088,"NPV_per_peak_funding":-0.282061045501973,"closeout_PV":0.4494049369812504,"NPV_without_closeout":-4.034135524101319,"post2036_PV":2.33429376460478,"post2036_PV_share_of_gross_positive_PV":0.24285239955555596,"franchise_terminal_PV":0.0,"year3_ROIC":0.07618297771996084,"year3_capital_turns":2.724409992215729,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"partner","scenario":"physical","NPV":-17.395001416781703,"IRR_roots":[-0.064638823077],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":null,"annual_discounted_payback_year":null,"peak_annual_funding":27.95674091083143,"NPV_per_peak_funding":-0.6222113468899468,"closeout_PV":0.5242200839947374,"NPV_without_closeout":-17.91922150077644,"post2036_PV":-1.3684721673797406,"post2036_PV_share_of_gross_positive_PV":-1.6548760885448808,"franchise_terminal_PV":0.0,"year3_ROIC":-0.04197620336778026,"year3_capital_turns":2.3111021543650403,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"partner","scenario":"squeeze","NPV":-9.82494869860839,"IRR_roots":[0.008176610503],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":25,"annual_discounted_payback_year":null,"peak_annual_funding":14.232439232876722,"NPV_per_peak_funding":-0.690320790262916,"closeout_PV":0.2590067989859538,"NPV_without_closeout":-10.083955497594344,"post2036_PV":0.0926388162039345,"post2036_PV_share_of_gross_positive_PV":0.021198723367474335,"franchise_terminal_PV":0.0,"year3_ROIC":0.019050908794359715,"year3_capital_turns":2.3877609632949452,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"partner","scenario":"nutrition","NPV":10.071104437961292,"IRR_roots":[0.190933666382],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":6,"annual_discounted_payback_year":9,"peak_annual_funding":10.38084,"NPV_per_peak_funding":0.970162765051893,"closeout_PV":0.650708938187864,"NPV_without_closeout":9.420395499773429,"post2036_PV":7.600764481928649,"post2036_PV_share_of_gross_positive_PV":0.3604270113439216,"franchise_terminal_PV":0.0,"year3_ROIC":0.1766085280851699,"year3_capital_turns":3.3379053572206137,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"plant","scenario":"managed","NPV":-1.7999419404754313,"IRR_roots":[0.090371889793],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":9,"annual_discounted_payback_year":null,"peak_annual_funding":22.564383561643837,"NPV_per_peak_funding":-0.07976916079086115,"closeout_PV":0.672379863023832,"NPV_without_closeout":-2.4723218034992636,"post2036_PV":5.276493468443403,"post2036_PV_share_of_gross_positive_PV":0.21308732420512114,"franchise_terminal_PV":0.0,"year3_ROIC":0.07197432986492461,"year3_capital_turns":1.9184774763487973,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"plant","scenario":"integration","NPV":13.879461780773948,"IRR_roots":[0.152055716186],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":7,"annual_discounted_payback_year":10,"peak_annual_funding":21.728734246575343,"NPV_per_peak_funding":0.638760713038841,"closeout_PV":0.8427033117648247,"NPV_without_closeout":13.036758469009124,"post2036_PV":12.643872320313855,"post2036_PV_share_of_gross_positive_PV":0.3203996042616289,"franchise_terminal_PV":0.0,"year3_ROIC":0.12610379281593204,"year3_capital_turns":2.2104014142733877,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"plant","scenario":"fragmented","NPV":-17.20394764958582,"IRR_roots":[0.005075146236],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":25,"annual_discounted_payback_year":null,"peak_annual_funding":25.97873621917809,"NPV_per_peak_funding":-0.6622318924384581,"closeout_PV":0.4936911446260897,"NPV_without_closeout":-17.69763879421191,"post2036_PV":-0.18186413992318232,"post2036_PV_share_of_gross_positive_PV":-0.015591403392874466,"franchise_terminal_PV":0.0,"year3_ROIC":0.013489837678553468,"year3_capital_turns":1.60001820570778,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"plant","scenario":"physical","NPV":-33.292163663292115,"IRR_roots":[-0.132978687709],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":null,"annual_discounted_payback_year":null,"peak_annual_funding":57.89763621465281,"NPV_per_peak_funding":-0.5750176663493299,"closeout_PV":0.5658043535666495,"NPV_without_closeout":-33.85796801685876,"post2036_PV":-4.432559852928076,"post2036_PV_share_of_gross_positive_PV":-4.695620982377556,"franchise_terminal_PV":0.0,"year3_ROIC":-0.06774215327848386,"year3_capital_turns":1.410225651346896,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"plant","scenario":"squeeze","NPV":-24.952075111496065,"IRR_roots":[-0.082797875888],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":null,"annual_discounted_payback_year":null,"peak_annual_funding":38.204532602739775,"NPV_per_peak_funding":-0.6531181881206072,"closeout_PV":0.28173377148264445,"NPV_without_closeout":-25.23380888297871,"post2036_PV":-2.306100762344556,"post2036_PV_share_of_gross_positive_PV":-0.5200988865507326,"franchise_terminal_PV":0.0,"year3_ROIC":-0.031974430639479315,"year3_capital_turns":1.397031366691561,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."},{"mode":"plant","scenario":"nutrition","NPV":-2.8782641183332043,"IRR_roots":[0.084776665854],"IRR_interpretation":"Unique positive-discount-factor root","annual_payback_year":10,"annual_discounted_payback_year":null,"peak_annual_funding":23.1676301369863,"NPV_per_peak_funding":-0.12423644979285808,"closeout_PV":0.7439729232248751,"NPV_without_closeout":-3.6222370415580794,"post2036_PV":4.952434257898219,"post2036_PV_share_of_gross_positive_PV":0.20395701689625284,"franchise_terminal_PV":0.0,"year3_ROIC":0.07232986493926076,"year3_capital_turns":1.8875238808679464,"definition":"Unlevered real USD. ROIC uses end-period net PPE+NWC and normalized 25% tax, not cash-tax-loss benefit; annual payback does not interpolate intra-year cash. No franchise terminal value."}]. Units: USDm, fractions, years. Input IDs: I-C-CAPITAL. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_EXAMPLE.

Workbook: Country_Financials; Capital_Metrics. Code/data: scripts/olam-extend-analysis.py. Slide: Verification appendix. Limit: Not a country/company investment estimate, calibrated distribution or observed causal effect. Sensitivity: analysis.json:capital_metrics; capital-metrics.csv.

## C-SENSITIVITY / One/two-variable investment boundaries

Formula: Rerun the identical 25-year cash_model, altering only declared input(s).

Substitution: {"one_variable_rows":630,"two_variable_rows":75}.

Result: {"one_variable_rows":630,"two_variable_rows":75}. Units: USDm; tonnes; USD/t; days. Input IDs: I-C-SENSITIVITY. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_EXAMPLE.

Workbook: Sensitivity; Boundary_Grid. Code/data: scripts/olam-extend-analysis.py. Slide: Verification appendix. Limit: Not a country/company investment estimate, calibrated distribution or observed causal effect. Sensitivity: sensitivity-one-variable.csv; sensitivity-two-variable.csv.

## C-MONTHLY / Seasonal inventory and settlement cash

Formula: Stock_close=stock_open+production−deliveries; AR/AP balance accruals−collections/payments.

Substitution: {"status":"Separate chosen steady-output seasonal teaching case; not the ramping DCF or an Olam forecast","opening_capex_USDm":20.0,"opening_inventory_USDm":2.72,"orders_total_t":100000.0,"production_total_t":99999.99999999999,"revenue_total_USDm":40.0,"operating_cash_year_USDm":3.386666666666664,"peak_monthly_funding_USDm":24.413333333333334,"rows":[{"month":1,"orders_delivered_t":6000.0,"production_t":8333.333333333334,"opening_stock_t":8000,"closing_stock_t":10333.333333333334,"revenue_USDm":2.4,"collections_USDm":0.48,"procurement_USDm":2.8333333333333335,"payments_USDm":0.5666666666666668,"AR_USDm":1.92,"inventory_USDm":3.5133333333333336,"AP_USDm":2.2666666666666666,"operating_cash_USDm":-0.2533333333333334,"cumulative_cash_USDm":-22.973333333333333},{"month":2,"orders_delivered_t":6000.0,"production_t":8333.333333333334,"opening_stock_t":10333.333333333334,"closing_stock_t":12666.666666666668,"revenue_USDm":2.4,"collections_USDm":2.4,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":1.92,"inventory_USDm":4.306666666666667,"AP_USDm":2.266666666666666,"operating_cash_USDm":-0.6000000000000006,"cumulative_cash_USDm":-23.573333333333334},{"month":3,"orders_delivered_t":7000.000000000001,"production_t":8333.333333333334,"opening_stock_t":12666.666666666668,"closing_stock_t":14000.0,"revenue_USDm":2.8000000000000003,"collections_USDm":2.48,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.24,"inventory_USDm":4.76,"AP_USDm":2.2666666666666657,"operating_cash_USDm":-0.5200000000000006,"cumulative_cash_USDm":-24.093333333333334},{"month":4,"orders_delivered_t":7000.000000000001,"production_t":8333.333333333334,"opening_stock_t":14000.0,"closing_stock_t":15333.333333333334,"revenue_USDm":2.8000000000000003,"collections_USDm":2.8000000000000003,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.24,"inventory_USDm":5.213333333333334,"AP_USDm":2.2666666666666653,"operating_cash_USDm":-0.20000000000000032,"cumulative_cash_USDm":-24.293333333333333},{"month":5,"orders_delivered_t":8000.0,"production_t":8333.333333333334,"opening_stock_t":15333.333333333334,"closing_stock_t":15666.666666666668,"revenue_USDm":3.2,"collections_USDm":2.8800000000000003,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.56,"inventory_USDm":5.326666666666667,"AP_USDm":2.266666666666665,"operating_cash_USDm":-0.12000000000000025,"cumulative_cash_USDm":-24.413333333333334},{"month":6,"orders_delivered_t":8000.0,"production_t":8333.333333333334,"opening_stock_t":15666.666666666668,"closing_stock_t":16000.000000000002,"revenue_USDm":3.2,"collections_USDm":3.2000000000000006,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.5599999999999996,"inventory_USDm":5.440000000000001,"AP_USDm":2.2666666666666644,"operating_cash_USDm":0.20000000000000004,"cumulative_cash_USDm":-24.213333333333335},{"month":7,"orders_delivered_t":9000.0,"production_t":8333.333333333334,"opening_stock_t":16000.000000000002,"closing_stock_t":15333.333333333336,"revenue_USDm":3.6,"collections_USDm":3.2800000000000007,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.879999999999999,"inventory_USDm":5.213333333333334,"AP_USDm":2.266666666666664,"operating_cash_USDm":0.28000000000000014,"cumulative_cash_USDm":-23.933333333333334},{"month":8,"orders_delivered_t":9000.0,"production_t":8333.333333333334,"opening_stock_t":15333.333333333336,"closing_stock_t":14666.66666666667,"revenue_USDm":3.6,"collections_USDm":3.6000000000000005,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.8799999999999986,"inventory_USDm":4.986666666666668,"AP_USDm":2.2666666666666635,"operating_cash_USDm":0.6,"cumulative_cash_USDm":-23.333333333333332},{"month":9,"orders_delivered_t":10000.0,"production_t":8333.333333333334,"opening_stock_t":14666.66666666667,"closing_stock_t":13000.000000000004,"revenue_USDm":4.0,"collections_USDm":3.6800000000000006,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":3.199999999999998,"inventory_USDm":4.420000000000001,"AP_USDm":2.266666666666663,"operating_cash_USDm":0.68,"cumulative_cash_USDm":-22.653333333333332},{"month":10,"orders_delivered_t":11000.0,"production_t":8333.333333333334,"opening_stock_t":13000.000000000004,"closing_stock_t":10333.333333333338,"revenue_USDm":4.4,"collections_USDm":4.08,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":3.5199999999999982,"inventory_USDm":3.513333333333335,"AP_USDm":2.2666666666666626,"operating_cash_USDm":1.0799999999999994,"cumulative_cash_USDm":-21.573333333333334},{"month":11,"orders_delivered_t":10000.0,"production_t":8333.333333333334,"opening_stock_t":10333.333333333338,"closing_stock_t":8666.666666666672,"revenue_USDm":4.0,"collections_USDm":4.32,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":3.199999999999998,"inventory_USDm":2.9466666666666685,"AP_USDm":2.266666666666662,"operating_cash_USDm":1.3199999999999996,"cumulative_cash_USDm":-20.253333333333334},{"month":12,"orders_delivered_t":9000.0,"production_t":8333.333333333334,"opening_stock_t":8666.666666666672,"closing_stock_t":8000.0000000000055,"revenue_USDm":3.6,"collections_USDm":3.9200000000000004,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.8799999999999977,"inventory_USDm":2.720000000000002,"AP_USDm":2.2666666666666617,"operating_cash_USDm":0.9199999999999998,"cumulative_cash_USDm":-19.333333333333336}],"limitations":"No taxes, maintenance, refunds or financing in this isolated timing example. 80% revenue and purchases settle next month. December receivable/payable carry into next year. Monthly peak must be measured for real cases."}.

Result: {"status":"Separate chosen steady-output seasonal teaching case; not the ramping DCF or an Olam forecast","opening_capex_USDm":20.0,"opening_inventory_USDm":2.72,"orders_total_t":100000.0,"production_total_t":99999.99999999999,"revenue_total_USDm":40.0,"operating_cash_year_USDm":3.386666666666664,"peak_monthly_funding_USDm":24.413333333333334,"rows":[{"month":1,"orders_delivered_t":6000.0,"production_t":8333.333333333334,"opening_stock_t":8000,"closing_stock_t":10333.333333333334,"revenue_USDm":2.4,"collections_USDm":0.48,"procurement_USDm":2.8333333333333335,"payments_USDm":0.5666666666666668,"AR_USDm":1.92,"inventory_USDm":3.5133333333333336,"AP_USDm":2.2666666666666666,"operating_cash_USDm":-0.2533333333333334,"cumulative_cash_USDm":-22.973333333333333},{"month":2,"orders_delivered_t":6000.0,"production_t":8333.333333333334,"opening_stock_t":10333.333333333334,"closing_stock_t":12666.666666666668,"revenue_USDm":2.4,"collections_USDm":2.4,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":1.92,"inventory_USDm":4.306666666666667,"AP_USDm":2.266666666666666,"operating_cash_USDm":-0.6000000000000006,"cumulative_cash_USDm":-23.573333333333334},{"month":3,"orders_delivered_t":7000.000000000001,"production_t":8333.333333333334,"opening_stock_t":12666.666666666668,"closing_stock_t":14000.0,"revenue_USDm":2.8000000000000003,"collections_USDm":2.48,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.24,"inventory_USDm":4.76,"AP_USDm":2.2666666666666657,"operating_cash_USDm":-0.5200000000000006,"cumulative_cash_USDm":-24.093333333333334},{"month":4,"orders_delivered_t":7000.000000000001,"production_t":8333.333333333334,"opening_stock_t":14000.0,"closing_stock_t":15333.333333333334,"revenue_USDm":2.8000000000000003,"collections_USDm":2.8000000000000003,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.24,"inventory_USDm":5.213333333333334,"AP_USDm":2.2666666666666653,"operating_cash_USDm":-0.20000000000000032,"cumulative_cash_USDm":-24.293333333333333},{"month":5,"orders_delivered_t":8000.0,"production_t":8333.333333333334,"opening_stock_t":15333.333333333334,"closing_stock_t":15666.666666666668,"revenue_USDm":3.2,"collections_USDm":2.8800000000000003,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.56,"inventory_USDm":5.326666666666667,"AP_USDm":2.266666666666665,"operating_cash_USDm":-0.12000000000000025,"cumulative_cash_USDm":-24.413333333333334},{"month":6,"orders_delivered_t":8000.0,"production_t":8333.333333333334,"opening_stock_t":15666.666666666668,"closing_stock_t":16000.000000000002,"revenue_USDm":3.2,"collections_USDm":3.2000000000000006,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.5599999999999996,"inventory_USDm":5.440000000000001,"AP_USDm":2.2666666666666644,"operating_cash_USDm":0.20000000000000004,"cumulative_cash_USDm":-24.213333333333335},{"month":7,"orders_delivered_t":9000.0,"production_t":8333.333333333334,"opening_stock_t":16000.000000000002,"closing_stock_t":15333.333333333336,"revenue_USDm":3.6,"collections_USDm":3.2800000000000007,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.879999999999999,"inventory_USDm":5.213333333333334,"AP_USDm":2.266666666666664,"operating_cash_USDm":0.28000000000000014,"cumulative_cash_USDm":-23.933333333333334},{"month":8,"orders_delivered_t":9000.0,"production_t":8333.333333333334,"opening_stock_t":15333.333333333336,"closing_stock_t":14666.66666666667,"revenue_USDm":3.6,"collections_USDm":3.6000000000000005,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.8799999999999986,"inventory_USDm":4.986666666666668,"AP_USDm":2.2666666666666635,"operating_cash_USDm":0.6,"cumulative_cash_USDm":-23.333333333333332},{"month":9,"orders_delivered_t":10000.0,"production_t":8333.333333333334,"opening_stock_t":14666.66666666667,"closing_stock_t":13000.000000000004,"revenue_USDm":4.0,"collections_USDm":3.6800000000000006,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":3.199999999999998,"inventory_USDm":4.420000000000001,"AP_USDm":2.266666666666663,"operating_cash_USDm":0.68,"cumulative_cash_USDm":-22.653333333333332},{"month":10,"orders_delivered_t":11000.0,"production_t":8333.333333333334,"opening_stock_t":13000.000000000004,"closing_stock_t":10333.333333333338,"revenue_USDm":4.4,"collections_USDm":4.08,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":3.5199999999999982,"inventory_USDm":3.513333333333335,"AP_USDm":2.2666666666666626,"operating_cash_USDm":1.0799999999999994,"cumulative_cash_USDm":-21.573333333333334},{"month":11,"orders_delivered_t":10000.0,"production_t":8333.333333333334,"opening_stock_t":10333.333333333338,"closing_stock_t":8666.666666666672,"revenue_USDm":4.0,"collections_USDm":4.32,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":3.199999999999998,"inventory_USDm":2.9466666666666685,"AP_USDm":2.266666666666662,"operating_cash_USDm":1.3199999999999996,"cumulative_cash_USDm":-20.253333333333334},{"month":12,"orders_delivered_t":9000.0,"production_t":8333.333333333334,"opening_stock_t":8666.666666666672,"closing_stock_t":8000.0000000000055,"revenue_USDm":3.6,"collections_USDm":3.9200000000000004,"procurement_USDm":2.8333333333333335,"payments_USDm":2.833333333333334,"AR_USDm":2.8799999999999977,"inventory_USDm":2.720000000000002,"AP_USDm":2.2666666666666617,"operating_cash_USDm":0.9199999999999998,"cumulative_cash_USDm":-19.333333333333336}],"limitations":"No taxes, maintenance, refunds or financing in this isolated timing example. 80% revenue and purchases settle next month. December receivable/payable carry into next year. Monthly peak must be measured for real cases."}. Units: tonnes; USDm; month. Input IDs: I-C-MONTHLY. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_EXAMPLE.

Workbook: Monthly_Cash. Code/data: scripts/olam-extend-analysis.py. Slide: Verification appendix. Limit: Not a country/company investment estimate, calibrated distribution or observed causal effect. Sensitivity: monthly-cash-example.csv.

## C-DEPENDENCE / Dependence and tails change liquidity exposure

Formula: Covariance=L Lᵀ; numerical eigenvalue check; same cash model under alternate chosen shocks.

Substitution: [{"generator":"dependent_normal","draws":2500,"seed":20261008,"p10_NPV":-18.906832371713023,"p50_NPV":-1.6547747253083456,"p90_NPV":21.524399860093865,"loss_CVaR95":29.141724356900287,"status":"Chosen dependence/tail sensitivity, no likelihood calibration"},{"generator":"independent_normal","draws":2500,"seed":20261008,"p10_NPV":-14.962667710787072,"p50_NPV":-2.422129640925471,"p90_NPV":12.366839514982134,"loss_CVaR95":22.712247350696167,"status":"Chosen dependence/tail sensitivity, no likelihood calibration"},{"generator":"dependent_student_t5","draws":2500,"seed":20261008,"p10_NPV":-17.503669063144304,"p50_NPV":-1.4993613578091232,"p90_NPV":18.286869917364907,"loss_CVaR95":29.227633449915963,"status":"Chosen dependence/tail sensitivity, no likelihood calibration"}].

Result: [{"generator":"dependent_normal","draws":2500,"seed":20261008,"p10_NPV":-18.906832371713023,"p50_NPV":-1.6547747253083456,"p90_NPV":21.524399860093865,"loss_CVaR95":29.141724356900287,"status":"Chosen dependence/tail sensitivity, no likelihood calibration"},{"generator":"independent_normal","draws":2500,"seed":20261008,"p10_NPV":-14.962667710787072,"p50_NPV":-2.422129640925471,"p90_NPV":12.366839514982134,"loss_CVaR95":22.712247350696167,"status":"Chosen dependence/tail sensitivity, no likelihood calibration"},{"generator":"dependent_student_t5","draws":2500,"seed":20261008,"p10_NPV":-17.503669063144304,"p50_NPV":-1.4993613578091232,"p90_NPV":18.286869917364907,"loss_CVaR95":29.227633449915963,"status":"Chosen dependence/tail sensitivity, no likelihood calibration"}]. Units: USDm; covariance in native driver units. Input IDs: I-C-DEPENDENCE. Sources: CVAR. Assumptions: A_TEMPLATE;A_SCENARIO;A_EXAMPLE.

Workbook: Simulation. Code/data: scripts/olam-extend-analysis.py. Slide: Verification appendix. Limit: Not a country/company investment estimate, calibrated distribution or observed causal effect. Sensitivity: dependence-tail-comparison.csv.

## C-EVSI / Imperfect information and optimal subsequent choice

Formula: Σsignal P(signal)max_action E(NPV|signal)−max_action E(NPV)−study−delay.

Substitution: {"prior":0.5,"accuracy":0.8,"good_NPV":10.0,"bad_NPV":-8.0,"study_cost":1.0,"delay_cost":0.5,"prior_best_EV":1.0,"posterior_best_EV":3.2,"gross_EVSI":2.2,"net_EVSI":0.7000000000000002,"net_EVPI":2.5,"accuracy_break_even":0.7222222222222222,"status":"Executed chosen Bayesian two-state example, USDm. Symmetric test accuracy and prior are assumptions, not estimated Olam probabilities."}.

Result: {"prior":0.5,"accuracy":0.8,"good_NPV":10.0,"bad_NPV":-8.0,"study_cost":1.0,"delay_cost":0.5,"prior_best_EV":1.0,"posterior_best_EV":3.2,"gross_EVSI":2.2,"net_EVSI":0.7000000000000002,"net_EVPI":2.5,"accuracy_break_even":0.7222222222222222,"status":"Executed chosen Bayesian two-state example, USDm. Symmetric test accuracy and prior are assumptions, not estimated Olam probabilities."}. Units: USDm; chosen prior/accuracy fractions. Input IDs: I-C-EVSI. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_EXAMPLE.

Workbook: Information_Value!A4:C18. Code/data: scripts/olam-extend-analysis.py. Slide: Verification appendix. Limit: Not a country/company investment estimate, calibrated distribution or observed causal effect. Sensitivity: analysis.json:learning_experiment; information-value-sensitivity.csv.

## C-CAPACITY-MARKETING / Marketing/capacity complementarity

Formula: Incremental delivered tonnes ×60−500 marketing−200 service−repair if used.

Substitution: {"baseline_orders_t":90,"capacity_t":100,"marketing_added_orders_t":30,"incremental_margin_USD_per_t":60,"marketing_USD":500,"service_USD":200,"capacity_repair_USD":300,"marketing_at_original_capacity_USD":-100,"marketing_with_capacity120_USD":1100,"combined_repair_and_marketing_USD":800,"status":"Executed one-period chosen example. Marketing alone destroys USD100 when supply binds; full headroom yields USD1,100; combined repair yields USD800. No causal effect or Olam result."}.

Result: {"baseline_orders_t":90,"capacity_t":100,"marketing_added_orders_t":30,"incremental_margin_USD_per_t":60,"marketing_USD":500,"service_USD":200,"capacity_repair_USD":300,"marketing_at_original_capacity_USD":-100,"marketing_with_capacity120_USD":1100,"combined_repair_and_marketing_USD":800,"status":"Executed one-period chosen example. Marketing alone destroys USD100 when supply binds; full headroom yields USD1,100; combined repair yields USD800. No causal effect or Olam result."}. Units: USD, tonnes; one period. Input IDs: I-C-CAPACITY-MARKETING. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_EXAMPLE.

Workbook: Marketing_Pilots. Code/data: scripts/olam-extend-analysis.py. Slide: Verification appendix. Limit: Not a country/company investment estimate, calibrated distribution or observed causal effect. Sensitivity: analysis.json:capacity_marketing_experiment.

## C-NETWORK / Physical, legal and route constrained allocation

Formula: max Σroute q×margin; origin/demand/route capacities; blocked q=0.

Substitution: {"origins":["A","B"],"destinations":["Buyer1","Buyer2","Buyer3"],"quantity_t":[60.0,30.0,0.0,10.0,50.0,30.0],"margins_USD_per_t":[30.0,25.0,10.0,20.0,35.0,15.0],"total_contribution_USD":4950.0,"source_and_demand_limits_t":[100,90,70,80,40],"constraint_slack_t":[10.0,0.0,0.0,0.0,10.0],"shadow_value_USD_per_t":[0.0,10.0,10.0,25.0,0.0],"status":"Chosen one-period flow LP. Net margin includes hypothetical delivery cost. Route A\u2192Buyer3 is structurally blocked; no penalty can authorize it. No actual network synergy or NPV is claimed."}.

Result: {"origins":["A","B"],"destinations":["Buyer1","Buyer2","Buyer3"],"quantity_t":[60.0,30.0,0.0,10.0,50.0,30.0],"margins_USD_per_t":[30.0,25.0,10.0,20.0,35.0,15.0],"total_contribution_USD":4950.0,"source_and_demand_limits_t":[100,90,70,80,40],"constraint_slack_t":[10.0,0.0,0.0,0.0,10.0],"shadow_value_USD_per_t":[0.0,10.0,10.0,25.0,0.0],"status":"Chosen one-period flow LP. Net margin includes hypothetical delivery cost. Route A\u2192Buyer3 is structurally blocked; no penalty can authorize it. No actual network synergy or NPV is claimed."}. Units: USD; tonnes; one period. Input IDs: I-C-NETWORK. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_EXAMPLE.

Workbook: Network. Code/data: scripts/olam-extend-analysis.py. Slide: Verification appendix. Limit: Not a country/company investment estimate, calibrated distribution or observed causal effect. Sensitivity: network-flow-example.csv; scripts/olam-extend-analysis.py:decision_experiments.

## C-ABLATION / Same-input module ablation

Formula: Rerun or reconcile baseline removing only the named component.

Substitution: [{"module_removed":"Working capital and its closeout","baseline_NPV":-1.7999419404754313,"ablated_NPV":3.6116686606497206,"consequence":"Omitting cash investment overstates project value"},{"module_removed":"Physical capacity cap","baseline_NPV":-1.7999419404754313,"ablated_NPV":-1.7999419404754313,"consequence":"Headroom is immaterial in this managed case; adverse constraints remain relevant"},{"module_removed":"Learning decision update","baseline_NPV":0.7000000000000002,"ablated_NPV":-1.5,"consequence":"Paying for a study without changing a decision has only cost"}].

Result: [{"module_removed":"Working capital and its closeout","baseline_NPV":-1.7999419404754313,"ablated_NPV":3.6116686606497206,"consequence":"Omitting cash investment overstates project value"},{"module_removed":"Physical capacity cap","baseline_NPV":-1.7999419404754313,"ablated_NPV":-1.7999419404754313,"consequence":"Headroom is immaterial in this managed case; adverse constraints remain relevant"},{"module_removed":"Learning decision update","baseline_NPV":0.7000000000000002,"ablated_NPV":-1.5,"consequence":"Paying for a study without changing a decision has only cost"}]. Units: USDm. Input IDs: I-C-ABLATION. Sources: Chosen inputs only. Assumptions: A_TEMPLATE;A_SCENARIO;A_EXAMPLE.

Workbook: Ablations. Code/data: scripts/olam-extend-analysis.py. Slide: Verification appendix. Limit: Not a country/company investment estimate, calibrated distribution or observed causal effect. Sensitivity: model-ablations.csv.
