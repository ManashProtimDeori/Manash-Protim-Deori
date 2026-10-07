# Plain-language calculation appendix

Version1.0.0; teaching inputs are illustrative unless reported.


## C-E01 — Reported margin

1. Business question: Reported margin

2. Intuition: EBIT / revenue × 100

3. Formula: EBIT / revenue × 100

4. Units: As explicitly stated in substitution

5. Inputs: I-E01; CO_AR

6. Substitution: 703.7 / 28,666 × 100 = 2.4548%

7. Result: 2.45% derived EBIT margin

8. Interpretation: Using rounded revenue of USD28.7bn gives 2.4519%; keep the same entity, period and currency.

9. Failure conditions: Using rounded revenue of USD28.7bn gives 2.4519%; keep the same entity, period and currency.

10. Sensitivity: Revenue can grow while margin falls.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 4


## C-E02 — Demand to delivered sales

1. Business question: Demand to delivered sales

2. Intuition: Population × demand per person × access × capture, capped by delivery

3. Formula: Population × demand per person × access × capture, capped by delivery

4. Units: As explicitly stated in substitution

5. Inputs: I-E02; Chosen teaching inputs

6. Substitution: 1m people × 0.1t × 50% access × 20% capture = 10,000t orders; min(10,000, 8,000, 7,000) = 7,000t.

7. Result: 7,000 delivered tonnes

8. Interpretation: Demand, access and capture are chosen inputs. Unmet orders cannot count as revenue.

9. Failure conditions: Demand, access and capture are chosen inputs. Unmet orders cannot count as revenue.

10. Sensitivity: If route capacity reaches 9,000t, plant capacity still caps delivery at 8,000t.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 23


## C-E03 — Volume, revenue and EBITDA

1. Business question: Volume, revenue and EBITDA

2. Intuition: Volume × net price; volume × unit cost; contribution less fixed cash cost

3. Formula: Volume × net price; volume × unit cost; contribution less fixed cash cost

4. Units: As explicitly stated in substitution

5. Inputs: I-E03; Chosen teaching inputs

6. Substitution: 100,000t × USD400/t = USD40m revenue; costs = USD34m; contribution = USD6m; less USD2m fixed cost = USD4m EBITDA.

7. Result: USD4m EBITDA

8. Interpretation: EBITDA omits cash tax, capital spending and working cash. These are chosen saleable-volume and net-price inputs.

9. Failure conditions: EBITDA omits cash tax, capital spending and working cash. These are chosen saleable-volume and net-price inputs.

10. Sensitivity: A USD10/t price change at unchanged volume changes EBITDA by USD1m.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 41


## C-E04 — Yield and by-products

1. Business question: Yield and by-products

2. Intuition: Input = main output / yield; output, by-product and loss sum to input

3. Formula: Input = main output / yield; output, by-product and loss sum to input

4. Units: As explicitly stated in substitution

5. Inputs: I-E04; Chosen teaching inputs

6. Substitution: 100,000t output / 90% yield = 111,111t input; 6% by-product = 6,667t; 4% loss = 4,444t.

7. Result: 111,111 tonnes of input

8. Interpretation: By-products may earn revenue. Their quality, price and conversion cost need evidence.

9. Failure conditions: By-products may earn revenue. Their quality, price and conversion cost need evidence.

10. Sensitivity: At 95% main yield, input is 105,263t. Reconcile the remaining mass separately.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 42


## C-E05 — Customer cost per usable output

1. Business question: Customer cost per usable output

2. Intuition: Purchase and preparation cost / usable output

3. Formula: Purchase and preparation cost / usable output

4. Units: As explicitly stated in substitution

5. Inputs: I-E05; Chosen teaching inputs

6. Substitution: Offer A: (USD30 + USD5) / 45kg = USD0.7778/kg. Offer B: (USD32 + USD4) / 48kg = USD0.7500/kg.

7. Result: B costs 3.57% less per usable kg

8. Interpretation: Chosen flour-like inputs. Paid adoption also depends on cash, trust and availability.

9. Failure conditions: Chosen flour-like inputs. Paid adoption also depends on cash, trust and availability.

10. Sensitivity: If B produces only 45kg, cost rises to USD0.80/kg and reverses the advantage.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 8


## C-E06 — Pack cash and cost per meal

1. Business question: Pack cash and cost per meal

2. Intuition: Cash ticket differs from cost per use; assume 100g dry input per meal

3. Formula: Cash ticket differs from cost per use; assume 100g dry input per meal

4. Units: As explicitly stated in substitution

5. Inputs: I-E06; Chosen teaching inputs

6. Substitution: Small: (₦600 + ₦100 prep) / 5 meals = ₦140/meal. Large: (₦2,000 + ₦400 prep) / 20 meals = ₦120/meal.

7. Result: Small cash ticket ₦600; large pack 14.29% cheaper per meal

8. Interpretation: Chosen Nigerian cash units and serving size. The large pack needs more upfront cash.

9. Failure conditions: Chosen Nigerian cash units and serving size. The large pack needs more upfront cash.

10. Sensitivity: Large purchase cash is 3.33 times the small pack, despite lower cost per meal.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 8


## C-E07 — Percent versus percentage points

1. Business question: Percent versus percentage points

2. Intuition: Distinguish absolute percentage-point change from relative percentage change

3. Formula: Distinguish absolute percentage-point change from relative percentage change

4. Units: As explicitly stated in substitution

5. Inputs: I-E07; Chosen teaching inputs

6. Substitution: 10% − 8% = 2 percentage points. Relative increase = (10 − 8) / 8 = 25%.

7. Result: 2 percentage points; 25% relative increase

8. Interpretation: A margin change is not the same measure as revenue growth.

9. Failure conditions: A margin change is not the same measure as revenue growth.

10. Sensitivity: On USD100 revenue, profit rises from USD8 to USD10.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 45


## C-E08 — Profit to free cash

1. Business question: Profit to free cash

2. Intuition: EBIT less tax, plus D&A, less maintenance/growth capex and change in NWC

3. Formula: EBIT less tax, plus D&A, less maintenance/growth capex and change in NWC

4. Units: As explicitly stated in substitution

5. Inputs: I-E08; Chosen teaching inputs

6. Substitution: EBITDA 4 − D&A 1 = EBIT 3; tax = 0.75. FCFF = 3 − 0.75 + 1 − 0.6 − 0.4 − 1 = 1.25 (USDm).

7. Result: USD1.25m free cash flow

8. Interpretation: Assume no prior tax losses, 25% tax, USD0.6m maintenance and USD0.4m growth capex.

9. Failure conditions: Assume no prior tax losses, 25% tax, USD0.6m maintenance and USD0.4m growth capex.

10. Sensitivity: If NWC does not increase, this period’s cash rises by USD1m.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 46


## C-E09 — Working-capital release

1. Business question: Working-capital release

2. Intuition: Revenue basis for receivables; cost basis for inventory; DPO unchanged

3. Formula: Revenue basis for receivables; cost basis for inventory; DPO unchanged

4. Units: As explicitly stated in substitution

5. Inputs: I-E09; Chosen teaching inputs

6. Substitution: AR: USD40m × 5 / 365 = USD0.547945m. Inventory: USD34m × 7 / 365 = USD0.652055m. Total = USD1.20m.

7. Result: USD1.20m once-only cash release

8. Interpretation: All sales are credit in this example. The transition release is not recurring annual profit.

9. Failure conditions: All sales are credit in this example. The transition release is not recurring annual profit.

10. Sensitivity: One further DSO day releases USD0.109589m at this sales base.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 24


## C-E10 — Inherited Nigeria screen

1. Business question: Inherited Nigeria screen

2. Intuition: Inherited additive uplift and sales-day proxy; ramped three-year DCF

3. Formula: Inherited additive uplift and sales-day proxy; ramped three-year DCF

4. Units: As explicitly stated in substitution

5. Inputs: I-E10; BASELINE

6. Substitution: 100 × (2% + 2%) × 8% + 0.7 + 0.6 − 0.4 − 0.45 − 0.30 = 0.47; 100 × 7 / 365 = 1.9178 (NGNbn).

7. Result: NPV −NGN2.0645bn; zero-NPV uplift NGN1.9928bn/year

8. Interpretation: NGN4.2bn initial capital; 28% hurdle; 50/80/100% benefit ramp. Tax, replacement and actual cash bases are absent.

9. Failure conditions: NGN4.2bn initial capital; 28% hurdle; 50/80/100% benefit ramp. Tax, replacement and actual cash bases are absent.

10. Sensitivity: Repair procurement FX overlap, AR/inventory/AP, capex, tax and currency before a production decision.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 20


## C-E11 — FX and commodity interaction

1. Business question: FX and commodity interaction

2. Intuition: Local imported cost = USD commodity price × local currency per USD

3. Formula: Local imported cost = USD commodity price × local currency per USD

4. Units: As explicitly stated in substitution

5. Inputs: I-E11; Chosen teaching inputs

6. Substitution: USD100 × ₦1,000/USD = ₦100,000. With both factors +10%: USD110 × ₦1,100 = ₦121,000, or +21%.

7. Result: 21% combined input-cost increase

8. Interpretation: Both shocks hit the same procurement base. Hedge effects need documented contracts.

9. Failure conditions: Both shocks hit the same procurement base. Hedge effects need documented contracts.

10. Sensitivity: Chosen 70% cost pass-through recovers 14.7% initially; weaker customer volume may reduce retained margin.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 22


## C-E12 — Finite NPV and commissioning

1. Business question: Finite NPV and commissioning

2. Intuition: Discount each dated free cash flow; do not compare only undiscounted totals

3. Formula: Discount each dated free cash flow; do not compare only undiscounted totals

4. Units: As explicitly stated in substitution

5. Inputs: I-E12; Chosen teaching inputs

6. Substitution: NPV = −5 + 2/1.10 + 2/1.10² + 2/1.10³ = −0.0263 (USDm).

7. Result: NPV −USD0.0263m

8. Interpretation: No terminal value. Staging USD3m now and USD2m in year 1, with cash in years 2–4, gives −USD0.2966m.

9. Failure conditions: No terminal value. Staging USD3m now and USD2m in year 1, with cash in years 2–4, gives −USD0.2966m.

10. Sensitivity: Paying USD5m now with a one-year cash delay gives −USD0.4784m.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 50


## C-E13 — Real and nominal consistency

1. Business question: Real and nominal consistency

2. Intuition: Consistent inflation of both cash and discount rate preserves NPV

3. Formula: Consistent inflation of both cash and discount rate preserves NPV

4. Units: As explicitly stated in substitution

5. Inputs: I-E13; Chosen teaching inputs

6. Substitution: (1.10 × 1.05) − 1 = 15.5% nominal hurdle. Year 1: 2.10 / 1.155 = 2.00 / 1.10.

7. Result: Real and nominal three-year NPVs both −USD0.0263m

8. Interpretation: Nominal cash grows by 5% inflation and is discounted at 15.5%. Project and currency risk require separate care.

9. Failure conditions: Nominal cash grows by 5% inflation and is discounted at 15.5%. Project and currency risk require separate care.

10. Sensitivity: Mixing nominal cash with a real hurdle overstates value.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 51


## C-E14 — Operating versus investment break-even

1. Business question: Operating versus investment break-even

2. Intuition: Operating break-even pays fixed cash cost; investment break-even also pays capital

3. Formula: Operating break-even pays fixed cash cost; investment break-even also pays capital

4. Units: As explicitly stated in substitution

5. Inputs: I-E14; Chosen teaching inputs

6. Substitution: USD2m / (USD400 − USD340 per tonne) = 33,333t; / 150,000t capacity = 22.22% utilization.

7. Result: Operating 33,333t; investment boundary 104,862 initial order tonnes

8. Interpretation: Full NPV includes ramp, tax, replacement, working cash and the finite horizon.

9. Failure conditions: Full NPV includes ramp, tax, replacement, working cash and the finite horizon.

10. Sensitivity: Operating above 22.22% utilization can still give negative investment NPV.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 52


## C-E15 — Scenario weights are not likelihood

1. Business question: Scenario weights are not likelihood

2. Intuition: Weighted average = sum of chosen weight × conditional NPV

3. Formula: Weighted average = sum of chosen weight × conditional NPV

4. Units: As explicitly stated in substitution

5. Inputs: I-E15; Chosen teaching inputs

6. Substitution: Chosen NPVs [10, −8, 2] and weights [0.5, 0.3, 0.2]: 5 − 2.4 + 0.4 = USD3m.

7. Result: USD3m judgement-weighted mean

8. Interpretation: The central USD10m case is not a calibrated most-likely future. The adverse loss can breach funding.

9. Failure conditions: The central USD10m case is not a calibrated most-likely future. The adverse loss can breach funding.

10. Sensitivity: If adverse weight is 0.5 and central weight 0.3, the mean becomes −USD0.6m.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 53


## C-E16 — Loss-tail VaR and CVaR

1. Business question: Loss-tail VaR and CVaR

2. Intuition: Loss = max(0, −NPV); a quantile differs from the mean of a chosen tail

3. Formula: Loss = max(0, −NPV); a quantile differs from the mean of a chosen tail

4. Units: As explicitly stated in substitution

5. Inputs: I-E16; CVAR

6. Substitution: NPVs [−8, −4, 0, 2, 6] imply losses [0, 0, 0, 4, 8]. Nearest-rank VaR80 = 4; worst-20% CVaR80 = 8 (USDm).

7. Result: Loss VaR80 USD4m; tail CVaR80 USD8m

8. Interpretation: Declare discrete tie treatment: mean(loss ≥ VaR) would be USD6m here, a different convention.

9. Failure conditions: Declare discrete tie treatment: mean(loss ≥ VaR) would be USD6m here, a different convention.

10. Sensitivity: Stress code uses mean(loss ≥ 95% quantile). Its chosen continuous generator has negligible ties.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 54


## C-E17 — Common-exposure diversification

1. Business question: Common-exposure diversification

2. Intuition: Equal individual average losses can conceal different joint tail exposures

3. Formula: Equal individual average losses can conceal different joint tail exposures

4. Units: As explicitly stated in substitution

5. Inputs: I-E17; Chosen teaching inputs

6. Substitution: Each source loses USD10m with chosen probability 0.2. A shared port produces joint loss USD20m with probability 0.2; independent joint probability is 0.04.

7. Result: Expected total loss USD4m in both; joint tail differs

8. Interpretation: Chosen probabilities illustrate dependence. Country flags do not remove a shared crop season or port.

9. Failure conditions: Chosen probabilities illustrate dependence. Country flags do not remove a shared crop season or port.

10. Sensitivity: A different basin without a different port can leave route exposure unchanged.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 27


## C-E18 — Difference in differences

1. Business question: Difference in differences

2. Intuition: Subtract the counterfactual change from the treated change

3. Formula: Subtract the counterfactual change from the treated change

4. Units: As explicitly stated in substitution

5. Inputs: I-E18; DID

6. Substitution: Treated sales: 100 → 130. Control: 100 → 110. DiD = (130 − 100) − (110 − 100) = 20.

7. Result: 20 illustrative incremental eligible sales units

8. Interpretation: Parallel trends and no material spillovers are required. Four chosen means cannot support an estimated interval.

9. Failure conditions: Parallel trends and no material spillovers are required. Four chosen means cannot support an estimated interval.

10. Sensitivity: At USD2 contribution/unit, gross incremental contribution is USD40 before service and pilot cost.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 31


## C-E19 — Incremental ROMI

1. Business question: Incremental ROMI

2. Intuition: Net incremental contribution after marketing / marketing spend

3. Formula: Net incremental contribution after marketing / marketing spend

4. Units: As explicitly stated in substitution

5. Inputs: I-E19; Chosen teaching inputs

6. Substitution: Incremental contribution 120 − service 20 − trade 10 − cannibalisation 10 = 80. Marketing spend 40. Net ROMI = (80 − 40)/40 = 100%.

7. Result: 100% net ROMI; contribution/spend is 2.0 times

8. Interpretation: All inputs are chosen currency-thousands. Use a paid-sales counterfactual and full incremental costs.

9. Failure conditions: All inputs are chosen currency-thousands. Use a paid-sales counterfactual and full incremental costs.

10. Sensitivity: If contribution after other costs is only 40, net ROMI is zero. Multi-year proposals need NPV.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 31


## C-E20 — Decision value of information

1. Business question: Decision value of information

2. Intuition: Optimal decision value after information less before information, study and delay costs

3. Formula: Optimal decision value after information less before information, study and delay costs

4. Units: As explicitly stated in substitution

5. Inputs: I-E20; Chosen teaching inputs

6. Substitution: Good state p=0.5: investment NPV 10; bad state p=0.5: −8; wait 0. Best prior EV=1; perfect-information EV=5; less study 1 and delay 0.5 gives net gain 2.5.

7. Result: USD2.5m net perfect-information ceiling

8. Interpretation: A perfect study is an upper bound. Do not add its benefit again to a policy that already includes learning.

9. Failure conditions: A perfect study is an upper bound. Do not add its benefit again to a policy that already includes learning.

10. Sensitivity: An imperfect pilot may be worth less than its cost; keep the wait option.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 28


## C-E21 — Reverse stress

1. Business question: Reverse stress

2. Intuition: Solve the full NPV root and monitor the mechanism that moves it

3. Formula: Solve the full NPV root and monitor the mechanism that moves it

4. Units: As explicitly stated in substitution

5. Inputs: I-E21; Chosen teaching inputs

6. Substitution: The managed owned template reaches zero NPV at 104,862 initial annual order tonnes. The current 100,000t base needs 4.86% more initial orders.

7. Result: About 4.86% more initial orders needed

8. Interpretation: The threshold depends on cost, hurdle, tax and capacity; volume cannot repair a negative unit contribution.

9. Failure conditions: The threshold depends on cost, hurdle, tax and capacity; volume cannot repair a negative unit contribution.

10. Sensitivity: Cost, FX or commissioning shocks shift the boundary. Monitor orders together with cash.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 59


## C-E22 — Size ranking can reverse

1. Business question: Size ranking can reverse

2. Intuition: Delivered units × unit contribution less fixed cost, then full cash-flow valuation

3. Formula: Delivered units × unit contribution less fixed cost, then full cash-flow valuation

4. Units: As explicitly stated in substitution

5. Inputs: I-E22; Chosen teaching inputs

6. Substitution: Country A: demand 200kt, capture 50kt, unit contribution USD20, fixed USD0.7m → EBITDA USD0.3m. B: demand 100kt, capture 40kt, contribution USD40 → USD0.9m.

7. Result: B has 3 times EBITDA despite half the category size

8. Interpretation: A and B are fictional teaching cases. Chosen capex USD5m vs USD2m and NWC USD2m vs USD0.5m further favour testing B.

9. Failure conditions: A and B are fictional teaching cases. Chosen capex USD5m vs USD2m and NWC USD2m vs USD0.5m further favour testing B.

10. Sensitivity: Before capital differences, A overtakes B above 80kt captured at USD20/t while B stays at 40kt.

11. Lineage: Calculation_Audit; scripts/olam-package.py: examples; slides 60


## C-LEGACY — C-LEGACY

1. Business question: C-LEGACY

2. Intuition: Inherited normalized Nigeria arithmetic

3. Formula: Inherited normalized Nigeria arithmetic

4. Units: Explicit in output

5. Inputs: I_TEMPLATE /I_SCENARIO; BASELINE

6. Substitution: See named executable code and full output JSON

7. Result: NGN−2.0645129269bn NPV;1.9927903115bn requiredannualuplift

8. Interpretation: Conditional, not company forecast

9. Failure conditions: Conditional, not company forecast

10. Sensitivity: See threshold/scenario outputs

11. Lineage: Calculation_Audit /Country_Financials /Simulation; src/lib/olamNigeriaDecisionModel.ts; slides 3;20


## C-CPM — C-CPM

1. Business question: C-CPM

2. Intuition: (35.8−15.5)/35.8

3. Formula: (35.8−15.5)/35.8

4. Units: Explicit in output

5. Inputs: I_TEMPLATE /I_SCENARIO; Chosen assumptions /specified primary datasets

6. Substitution: See named executable code and full output JSON

7. Result: 56.7039% lowerCPM

8. Interpretation: Conditional, not company forecast

9. Failure conditions: Conditional, not company forecast

10. Sensitivity: See threshold/scenario outputs

11. Lineage: Calculation_Audit /Country_Financials /Simulation; src/data/resume.ts; slides 34


## C-COVERAGE — C-COVERAGE

1. Business question: C-COVERAGE

2. Intuition: 195×6×7

3. Formula: 195×6×7

4. Units: Explicit in output

5. Inputs: I_TEMPLATE /I_SCENARIO; Chosen assumptions /specified primary datasets

6. Substitution: See named executable code and full output JSON

7. Result: 8,190 rows;162countriesall11macros

8. Interpretation: Conditional, not company forecast

9. Failure conditions: Conditional, not company forecast

10. Sensitivity: See threshold/scenario outputs

11. Lineage: Calculation_Audit /Country_Financials /Simulation; scripts/olam-analyse.py; slides 12


## C-TRADE-NGA — C-TRADE-NGA

1. Business question: C-TRADE-NGA

2. Intuition: Read CIFvalue only; noquantitycalculation

3. Formula: Read CIFvalue only; noquantitycalculation

4. Units: Explicit in output

5. Inputs: I_TEMPLATE /I_SCENARIO; Chosen assumptions /specified primary datasets

6. Substitution: See named executable code and full output JSON

7. Result: USD1,047,531,844.083CIF; netweightnull

8. Interpretation: Conditional, not company forecast

9. Failure conditions: Conditional, not company forecast

10. Sensitivity: See threshold/scenario outputs

11. Lineage: Calculation_Audit /Country_Financials /Simulation; scripts/olam-retrieve.py; slides 10


## C-OLS — C-OLS

1. Business question: C-OLS

2. Intuition: Laggedgrowth OLS;countryclusterCR1;holdout

3. Formula: Laggedgrowth OLS;countryclusterCR1;holdout

4. Units: Explicit in output

5. Inputs: I_TEMPLATE /I_SCENARIO; Chosen assumptions /specified primary datasets

6. Substitution: See named executable code and full output JSON

7. Result: train2856;holdout680;MAE.04829868

8. Interpretation: Conditional, not company forecast

9. Failure conditions: Conditional, not company forecast

10. Sensitivity: See threshold/scenario outputs

11. Lineage: Calculation_Audit /Country_Financials /Simulation; scripts/olam-analyse.py; slides 30;66;67


## C-STRESS — C-STRESS

1. Business question: C-STRESS

2. Intuition: 10,000chosenlatentfactordraws;fullcash

3. Formula: 10,000chosenlatentfactordraws;fullcash

4. Units: Explicit in output

5. Inputs: I_TEMPLATE /I_SCENARIO; Chosen assumptions /specified primary datasets

6. Substitution: See named executable code and full output JSON

7. Result: {"p10_npv": -19.270312655889544, "median_npv": -1.6547747253083456, "p90_npv": 21.484353235769948, "loss_VaR95": 24.54454163430493, "loss_CVaR95": 29.251547633706362}

8. Interpretation: Conditional, not company forecast

9. Failure conditions: Conditional, not company forecast

10. Sensitivity: See threshold/scenario outputs

11. Lineage: Calculation_Audit /Country_Financials /Simulation; scripts/olam-analyse.py; slides 26


## C-REGRET — C-REGRET

1. Business question: C-REGRET

2. Intuition: min action max world(bestvalue−actionvalue)

3. Formula: min action max world(bestvalue−actionvalue)

4. Units: Explicit in output

5. Inputs: I_TEMPLATE /I_SCENARIO; Chosen assumptions /specified primary datasets

6. Substitution: See named executable code and full output JSON

7. Result: Partner chosen;worstregret4 vsowned8

8. Interpretation: Conditional, not company forecast

9. Failure conditions: Conditional, not company forecast

10. Sensitivity: See threshold/scenario outputs

11. Lineage: Calculation_Audit /Country_Financials /Simulation; scripts/olam-analyse.py; slides 27;28;29


## C-SCENARIOS — C-SCENARIOS

1. Business question: C-SCENARIOS

2. Intuition: Chosen coherent driver vectors

3. Formula: Chosen coherent driver vectors

4. Units: Explicit in output

5. Inputs: I_TEMPLATE /I_SCENARIO; Chosen assumptions /specified primary datasets

6. Substitution: See named executable code and full output JSON

7. Result: 6worlds,unweighted

8. Interpretation: Conditional, not company forecast

9. Failure conditions: Conditional, not company forecast

10. Sensitivity: See threshold/scenario outputs

11. Lineage: Calculation_Audit /Country_Financials /Simulation; scripts/olam-analyse.py; slides 15


## C-THRESHOLD — C-THRESHOLD

1. Business question: C-THRESHOLD

2. Intuition: Brent rootNPV(order)=0

3. Formula: Brent rootNPV(order)=0

4. Units: Explicit in output

5. Inputs: I_TEMPLATE /I_SCENARIO; Chosen assumptions /specified primary datasets

6. Substitution: See named executable code and full output JSON

7. Result: Conditionalroots;nullifcapacitycappedvalue<0

8. Interpretation: Conditional, not company forecast

9. Failure conditions: Conditional, not company forecast

10. Sensitivity: See threshold/scenario outputs

11. Lineage: Calculation_Audit /Country_Financials /Simulation; scripts/olam-analyse.py; slides 17;26


## C-DCF — C-DCF

1. Business question: C-DCF

2. Intuition: 25annual FCFF atrealUSD hurdle

3. Formula: 25annual FCFF atrealUSD hurdle

4. Units: Explicit in output

5. Inputs: I_TEMPLATE /I_SCENARIO; Chosen assumptions /specified primary datasets

6. Substitution: See named executable code and full output JSON

7. Result: 18mode/worldcases;notcountryvalues

8. Interpretation: Conditional, not company forecast

9. Failure conditions: Conditional, not company forecast

10. Sensitivity: See threshold/scenario outputs

11. Lineage: Calculation_Audit /Country_Financials /Simulation; scripts/olam-analyse.py; slides 16


## C-DCF-trade-managed — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_trade;I_SCENARIO_managed; Chosen illustrative inputs

6. Substitution: {"mode": "trade", "scenario": "managed", "npv": 0.35768624230170054, "peak_funding": 2.9413770000000037, "operating_break_even_tonnes": 31250.0, "investment_break_even_orders": 89195.8345259654, "within_capacity": true, "calculation_id": "C-DCF-trade-managed"}

7. Result: 0.36

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-trade-integration — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_trade;I_SCENARIO_integration; Chosen illustrative inputs

6. Substitution: {"mode": "trade", "scenario": "integration", "npv": 7.869359046008329, "peak_funding": 1.5686896712328786, "operating_break_even_tonnes": 17651.296829971187, "investment_break_even_orders": 27991.67630528343, "within_capacity": true, "calculation_id": "C-DCF-trade-integration"}

7. Result: 7.87

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-trade-fragmented — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_trade;I_SCENARIO_fragmented; Chosen illustrative inputs

6. Substitution: {"mode": "trade", "scenario": "fragmented", "npv": -10.136255746401934, "peak_funding": 22.84820444735882, "operating_break_even_tonnes": null, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-trade-fragmented"}

7. Result: -10.14

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-trade-physical — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_trade;I_SCENARIO_physical; Chosen illustrative inputs

6. Substitution: {"mode": "trade", "scenario": "physical", "npv": -25.560849591724317, "peak_funding": 70.94921425008118, "operating_break_even_tonnes": null, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-trade-physical"}

7. Result: -25.56

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-trade-squeeze — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_trade;I_SCENARIO_squeeze; Chosen illustrative inputs

6. Substitution: {"mode": "trade", "scenario": "squeeze", "npv": -13.357503120599379, "peak_funding": 36.99873139726028, "operating_break_even_tonnes": null, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-trade-squeeze"}

7. Result: -13.36

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-trade-nutrition — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_trade;I_SCENARIO_nutrition; Chosen illustrative inputs

6. Substitution: {"mode": "trade", "scenario": "nutrition", "npv": -0.5433706314193101, "peak_funding": 4.071070447090416, "operating_break_even_tonnes": 32475.490196078557, "investment_break_even_orders": 121633.64390198824, "within_capacity": true, "calculation_id": "C-DCF-trade-nutrition"}

7. Result: -0.54

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-partner-managed — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_partner;I_SCENARIO_managed; Chosen illustrative inputs

6. Substitution: {"mode": "partner", "scenario": "managed", "npv": 10.817370364399231, "peak_funding": 9.795726027397262, "operating_break_even_tonnes": 25000.0, "investment_break_even_orders": 62437.7886229557, "within_capacity": true, "calculation_id": "C-DCF-partner-managed"}

7. Result: 10.82

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-partner-integration — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_partner;I_SCENARIO_integration; Chosen illustrative inputs

6. Substitution: {"mode": "partner", "scenario": "integration", "npv": 20.592951494337385, "peak_funding": 9.137024657534244, "operating_break_even_tonnes": 22072.07207207206, "investment_break_even_orders": 42554.41685771852, "within_capacity": true, "calculation_id": "C-DCF-partner-integration"}

7. Result: 20.59

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-partner-fragmented — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_partner;I_SCENARIO_fragmented; Chosen illustrative inputs

6. Substitution: {"mode": "partner", "scenario": "fragmented", "npv": -3.5847305871200685, "peak_funding": 12.709059419178088, "operating_break_even_tonnes": 33536.585365853694, "investment_break_even_orders": 151350.81667983875, "within_capacity": true, "calculation_id": "C-DCF-partner-fragmented"}

7. Result: -3.58

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-partner-physical — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_partner;I_SCENARIO_physical; Chosen illustrative inputs

6. Substitution: {"mode": "partner", "scenario": "physical", "npv": -17.395001416781703, "peak_funding": 27.95674091083143, "operating_break_even_tonnes": 71874.99999999983, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-partner-physical"}

7. Result: -17.40

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-partner-squeeze — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_partner;I_SCENARIO_squeeze; Chosen illustrative inputs

6. Substitution: {"mode": "partner", "scenario": "squeeze", "npv": -9.82494869860839, "peak_funding": 14.232439232876722, "operating_break_even_tonnes": 42112.2994652407, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-partner-squeeze"}

7. Result: -9.82

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-partner-nutrition — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_partner;I_SCENARIO_nutrition; Chosen illustrative inputs

6. Substitution: {"mode": "partner", "scenario": "nutrition", "npv": 10.071104437961292, "peak_funding": 10.38084, "operating_break_even_tonnes": 25980.392156862756, "investment_break_even_orders": 64972.55435624967, "within_capacity": true, "calculation_id": "C-DCF-partner-nutrition"}

7. Result: 10.07

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-plant-managed — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_plant;I_SCENARIO_managed; Chosen illustrative inputs

6. Substitution: {"mode": "plant", "scenario": "managed", "npv": -1.7999419404754313, "peak_funding": 22.564383561643837, "operating_break_even_tonnes": 33333.333333333336, "investment_break_even_orders": 104862.13464493981, "within_capacity": true, "calculation_id": "C-DCF-plant-managed"}

7. Result: -1.80

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-plant-integration — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_plant;I_SCENARIO_integration; Chosen illustrative inputs

6. Substitution: {"mode": "plant", "scenario": "integration", "npv": 13.879461780773948, "peak_funding": 21.728734246575343, "operating_break_even_tonnes": 30107.52688172042, "investment_break_even_orders": 73631.61307311719, "within_capacity": true, "calculation_id": "C-DCF-plant-integration"}

7. Result: 13.88

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-plant-fragmented — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_plant;I_SCENARIO_fragmented; Chosen illustrative inputs

6. Substitution: {"mode": "plant", "scenario": "fragmented", "npv": -17.20394764958582, "peak_funding": 25.97873621917809, "operating_break_even_tonnes": 42145.59386973181, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-plant-fragmented"}

7. Result: -17.20

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-plant-physical — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_plant;I_SCENARIO_physical; Chosen illustrative inputs

6. Substitution: {"mode": "plant", "scenario": "physical", "npv": -33.292163663292115, "peak_funding": 57.89763621465281, "operating_break_even_tonnes": 69696.96969696958, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-plant-physical"}

7. Result: -33.29

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-plant-squeeze — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_plant;I_SCENARIO_squeeze; Chosen illustrative inputs

6. Substitution: {"mode": "plant", "scenario": "squeeze", "npv": -24.952075111496065, "peak_funding": 38.204532602739775, "operating_break_even_tonnes": 49528.30188679248, "investment_break_even_orders": null, "within_capacity": false, "calculation_id": "C-DCF-plant-squeeze"}

7. Result: -24.95

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-DCF-plant-nutrition — Full normalizedproject cash

1. Business question: Full normalizedproject cash

2. Intuition: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

3. Formula: FCFF=EBIT−tax+D&A−capex−ΔNWC+closeout;NPV=Σdiscountedcash

4. Units: Real2026USD million

5. Inputs: I_TEMPLATE_plant;I_SCENARIO_nutrition; Chosen illustrative inputs

6. Substitution: {"mode": "plant", "scenario": "nutrition", "npv": -2.8782641183332043, "peak_funding": 23.1676301369863, "operating_break_even_tonnes": 34640.522875817, "investment_break_even_orders": 107844.84544675304, "within_capacity": true, "calculation_id": "C-DCF-plant-nutrition"}

7. Result: -2.88

8. Interpretation: No country calibration

9. Failure conditions: No country calibration

10. Sensitivity: Investment order root included

11. Lineage: Country_Financials (activecase);Sensitivity (cached); scripts/olam-analyse.py:cash_model; slides Modeloutput /countryatlas


## C-POP-AFG — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_AFG; UN_WPP

6. Substitution: {"2026": 45047069.0, "2030": 50039402.0, "2035": 56647232.0, "2040": 63347870.0, "2045": 70021200.0, "2050": 76885135.0, "2051": 78155052.0}

7. Result: 0.7349641993355882

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ALB — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ALB; UN_WPP

6. Substitution: {"2026": 2751025.0, "2030": 2671885.0, "2035": 2570580.0, "2040": 2461866.0, "2045": 2351280.0, "2050": 2240166.0, "2051": 2218012.0}

7. Result: -0.19375069292354663

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-DZA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_DZA; UN_WPP

6. Substitution: {"2026": 48028334.0, "2030": 50154166.0, "2035": 52516789.0, "2040": 54873476.0, "2045": 57290156.0, "2050": 59565554.0, "2051": 59975606.0}

7. Result: 0.2487546621958614

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-AND — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_AND; UN_WPP

6. Substitution: {"2026": 83753.0, "2030": 85681.0, "2035": 86174.0, "2040": 85668.0, "2045": 84294.0, "2050": 82195.0, "2051": 81668.0}

7. Result: -0.02489463064009645

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-AGO — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_AGO; UN_WPP

6. Substitution: {"2026": 40215179.0, "2030": 45160458.0, "2035": 51821718.0, "2040": 58965321.0, "2045": 66464329.0, "2050": 74295394.0, "2051": 75892826.0}

7. Result: 0.887168673301193

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ATG — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ATG; UN_WPP

6. Substitution: {"2026": 94626.0, "2030": 96000.0, "2035": 97007.0, "2040": 97133.0, "2045": 96419.0, "2050": 95055.0, "2051": 94710.0}

7. Result: 0.0008877052818463405

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ARG — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ARG; UN_WPP

6. Substitution: {"2026": 46003734.0, "2030": 46585022.0, "2035": 47251994.0, "2040": 47817645.0, "2045": 48191841.0, "2050": 48308944.0, "2051": 48297098.0}

7. Result: 0.049851692473484865

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ARM — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ARM; UN_WPP

6. Substitution: {"2026": 2930915.0, "2030": 2851291.0, "2035": 2756725.0, "2040": 2665523.0, "2045": 2579220.0, "2050": 2495207.0, "2051": 2478352.0}

7. Result: -0.15441014154282873

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-AUS — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_AUS; UN_WPP

6. Substitution: {"2026": 27227096.0, "2030": 28188539.0, "2035": 29296168.0, "2040": 30357450.0, "2045": 31431123.0, "2050": 32506969.0, "2051": 32716087.0}

7. Result: 0.2016003102203776

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-AUT — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_AUT; UN_WPP

6. Substitution: {"2026": 9107266.0, "2030": 9080346.0, "2035": 9014208.0, "2040": 8934061.0, "2045": 8844730.0, "2050": 8724332.0, "2051": 8696685.0}

7. Result: -0.04508279433147111

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-AZE — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_AZE; UN_WPP

6. Substitution: {"2026": 10454855.0, "2030": 10665380.0, "2035": 10898665.0, "2040": 11081335.0, "2045": 11188800.0, "2050": 11224923.0, "2051": 11224460.0}

7. Result: 0.07361221174277399

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BHS — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BHS; UN_WPP

6. Substitution: {"2026": 404628.0, "2030": 410267.0, "2035": 415978.0, "2040": 420346.0, "2045": 423262.0, "2050": 424265.0, "2051": 424211.0}

7. Result: 0.04839754045691347

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BHR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BHR; UN_WPP

6. Substitution: {"2026": 1675572.0, "2030": 1765209.0, "2035": 1856537.0, "2040": 1951233.0, "2045": 2046472.0, "2050": 2139465.0, "2051": 2157875.0}

7. Result: 0.28784379304500196

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BGD — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BGD; UN_WPP

6. Substitution: {"2026": 177818044.0, "2030": 186072407.0, "2035": 195130372.0, "2040": 202589429.0, "2045": 209029594.0, "2050": 214709097.0, "2051": 215750555.0}

7. Result: 0.21332205746228983

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BRB — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BRB; UN_WPP

6. Substitution: {"2026": 282724.0, "2030": 282490.0, "2035": 280342.0, "2040": 276346.0, "2045": 270774.0, "2050": 264216.0, "2051": 262867.0}

7. Result: -0.07023457506260522

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BLR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BLR; UN_WPP

6. Substitution: {"2026": 8937018.0, "2030": 8687632.0, "2035": 8372271.000000001, "2040": 8064466.0, "2045": 7763466.0, "2050": 7453546.0, "2051": 7388575.0}

7. Result: -0.1732617076523736

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BEL — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BEL; UN_WPP

6. Substitution: {"2026": 11774642.0, "2030": 11824141.0, "2035": 11863585.0, "2040": 11892204.0, "2045": 11900984.0, "2050": 11870906.0, "2051": 11859003.0}

7. Result: 0.007164633965092149

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BLZ — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BLZ; UN_WPP

6. Substitution: {"2026": 428644.0, "2030": 449839.0, "2035": 473132.0, "2040": 491595.0, "2045": 505700.0, "2050": 516626.99999999994, "2051": 518385.99999999994}

7. Result: 0.2093625479418817

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BEN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BEN; UN_WPP

6. Substitution: {"2026": 15170419.0, "2030": 16618822.0, "2035": 18492631.0, "2040": 20445760.0, "2045": 22443646.0, "2050": 24433809.0, "2051": 24827844.0}

7. Result: 0.6365957987053621

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BTN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BTN; UN_WPP

6. Substitution: {"2026": 802214.0, "2030": 820694.0, "2035": 843202.0, "2040": 862129.0, "2045": 876173.0, "2050": 882340.0, "2051": 883389.0}

7. Result: 0.10118871024439868

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BOL — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BOL; UN_WPP

6. Substitution: {"2026": 12749291.0, "2030": 13405564.0, "2035": 14183823.0, "2040": 14899397.0, "2045": 15542791.0, "2050": 16110162.0, "2051": 16214293.0}

7. Result: 0.27177997584336255

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BIH — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BIH; UN_WPP

6. Substitution: {"2026": 3114242.0, "2030": 3013974.0, "2035": 2881542.0, "2040": 2745010.0, "2045": 2599927.0, "2050": 2455167.0, "2051": 2426282.0}

7. Result: -0.22090768797029903

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BWA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BWA; UN_WPP

6. Substitution: {"2026": 2603388.0, "2030": 2765918.0, "2035": 2954414.0, "2040": 3126640.0, "2045": 3285301.0, "2050": 3437430.0, "2051": 3465409.0}

7. Result: 0.33111507005486707

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BRA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BRA; UN_WPP

6. Substitution: {"2026": 213562666.0, "2030": 216074411.0, "2035": 218199707.0, "2040": 219237084.0, "2045": 219026196.0, "2050": 217489299.0, "2051": 217040324.0}

7. Result: 0.016284016608034024

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BRN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BRN; UN_WPP

6. Substitution: {"2026": 469775.0, "2030": 482447.0, "2035": 495290.0, "2040": 505976.0, "2045": 514052.0, "2050": 519551.00000000006, "2051": 520265.99999999994}

7. Result: 0.10747911234101415

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BGR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BGR; UN_WPP

6. Substitution: {"2026": 6667659.0, "2030": 6458243.0, "2035": 6183114.0, "2040": 5907728.0, "2045": 5648256.0, "2050": 5402217.0, "2051": 5354139.0}

7. Result: -0.19699867674696625

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BFA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BFA; UN_WPP

6. Substitution: {"2026": 24601700.0, "2030": 26730324.0, "2035": 29469746.0, "2040": 32193645.0, "2045": 34829690.0, "2050": 37304383.0, "2051": 37777225.0}

7. Result: 0.5355534373640847

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-BDI — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_BDI; UN_WPP

6. Substitution: {"2026": 14729157.0, "2030": 16182016.0, "2035": 18085841.0, "2040": 20131318.0, "2045": 22197887.0, "2050": 24131720.0, "2051": 24498523.0}

7. Result: 0.6632671509985262

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-CPV — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_CPV; UN_WPP

6. Substitution: {"2026": 529630.0, "2030": 538614.0, "2035": 548591.0, "2040": 557374.0, "2045": 563476.0, "2050": 566134.0, "2051": 566201.0}

7. Result: 0.0690500915733625

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-KHM — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_KHM; UN_WPP

6. Substitution: {"2026": 18051219.0, "2030": 18827388.0, "2035": 19720141.0, "2040": 20540682.0, "2045": 21286237.0, "2050": 21931455.0, "2051": 22045831.0}

7. Result: 0.22129319909087575

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-CMR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_CMR; UN_WPP

6. Substitution: {"2026": 30640817.0, "2030": 33777190.0, "2035": 37893818.0, "2040": 42208003.0, "2045": 46629039.0, "2050": 51096317.0, "2051": 51989016.0}

7. Result: 0.6967242094099515

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-CAN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_CAN; UN_WPP

6. Substitution: {"2026": 40467728.0, "2030": 41655589.0, "2035": 42905267.0, "2040": 43951417.0, "2045": 44850096.0, "2050": 45621882.0, "2051": 45771463.0}

7. Result: 0.13106085421944114

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-CAF — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_CAF; UN_WPP

6. Substitution: {"2026": 5698984.0, "2030": 6478245.0, "2035": 7502587.0, "2040": 8526455.0, "2045": 9550893.0, "2050": 10616753.0, "2051": 10834361.0}

7. Result: 0.9011039511604173

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-TCD — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_TCD; UN_WPP

6. Substitution: {"2026": 21560380.0, "2030": 24207479.0, "2035": 27697279.0, "2040": 31307342.0, "2045": 35026393.0, "2050": 38857686.0, "2051": 39636033.0}

7. Result: 0.8383735815416982

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-CHL — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_CHL; UN_WPP

6. Substitution: {"2026": 19945850.0, "2030": 20233183.0, "2035": 20455940.0, "2040": 20542103.0, "2045": 20499138.0, "2050": 20320306.0, "2051": 20269202.0}

7. Result: 0.016211492616258427

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-CHN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_CHN; UN_WPP

6. Substitution: {"2026": 1412914089.0, "2030": 1398153832.0, "2035": 1373427531.0, "2040": 1342816657.0, "2045": 1306113788.0, "2050": 1260289093.0, "2051": 1249692538.0}

7. Result: -0.11552121411396021

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-COL — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_COL; UN_WPP

6. Substitution: {"2026": 53936226.0, "2030": 55736475.0, "2035": 57445753.0, "2040": 58576446.0, "2045": 59190823.0, "2050": 59385357.0, "2051": 59382960.0}

7. Result: 0.10098470738386478

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-COM — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_COM; UN_WPP

6. Substitution: {"2026": 899010.0, "2030": 964264.0, "2035": 1047762.9999999999, "2040": 1133778.0, "2045": 1221072.0, "2050": 1307558.0, "2051": 1324686.0}

7. Result: 0.47349417692795415

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-COG — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_COG; UN_WPP

6. Substitution: {"2026": 6637785.0, "2030": 7282266.0, "2035": 8160733.0, "2040": 9083971.0, "2045": 10041901.0, "2050": 11006471.0, "2051": 11200449.0}

7. Result: 0.6873774911359738

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-CRI — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_CRI; UN_WPP

6. Substitution: {"2026": 5174789.0, "2030": 5251497.0, "2035": 5324699.0, "2040": 5369806.0, "2045": 5381019.0, "2050": 5354150.0, "2051": 5344062.0}

7. Result: 0.03271109218172952

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-HRV — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_HRV; UN_WPP

6. Substitution: {"2026": 3822345.0, "2030": 3725770.0, "2035": 3607215.0, "2040": 3488309.0, "2045": 3362953.0, "2050": 3234160.0, "2051": 3208229.0}

7. Result: -0.16066472283375777

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-CUB — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_CUB; UN_WPP

6. Substitution: {"2026": 10892659.0, "2030": 10700822.0, "2035": 10431762.0, "2040": 10125837.0, "2045": 9775199.0, "2050": 9381999.0, "2051": 9298547.0}

7. Result: -0.14634737027937805

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-CYP — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_CYP; UN_WPP

6. Substitution: {"2026": 1382334.0, "2030": 1422318.0, "2035": 1459190.0, "2040": 1484849.0, "2045": 1500070.0, "2050": 1508482.0, "2051": 1509486.0}

7. Result: 0.09198355824279814

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-CZE — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_CZE; UN_WPP

6. Substitution: {"2026": 10527781.0, "2030": 10425089.0, "2035": 10265956.0, "2040": 10107226.0, "2045": 9965090.0, "2050": 9825543.0, "2051": 9795302.0}

7. Result: -0.06957582039368027

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-CIV — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_CIV; UN_WPP

6. Substitution: {"2026": 33494345.999999996, "2030": 36699009.0, "2035": 41033849.0, "2040": 45743925.0, "2045": 50716067.0, "2050": 55746985.0, "2051": 56759561.0}

7. Result: 0.6946012619562718

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-PRK — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_PRK; UN_WPP

6. Substitution: {"2026": 26633691.0, "2030": 26784904.0, "2035": 26757724.0, "2040": 26542432.0, "2045": 26210203.0, "2050": 25787127.0, "2051": 25691411.0}

7. Result: -0.035379249537737745

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-COD — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_COD; UN_WPP

6. Substitution: {"2026": 116452162.0, "2030": 131532201.0, "2035": 151560103.0, "2040": 172595582.0, "2045": 194865379.0, "2050": 218246072.0, "2051": 223027957.0}

7. Result: 0.915189492145281

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-DNK — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_DNK; UN_WPP

6. Substitution: {"2026": 6023520.0, "2030": 6081995.0, "2035": 6119806.0, "2040": 6134659.0, "2045": 6134655.0, "2050": 6124838.0, "2051": 6121371.0}

7. Result: 0.01624482030440677

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-DJI — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_DJI; UN_WPP

6. Substitution: {"2026": 1199459.0, "2030": 1262678.0, "2035": 1335498.0, "2040": 1406635.0, "2045": 1474041.0, "2050": 1530540.0, "2051": 1540678.0}

7. Result: 0.28447741856953845

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-DMA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_DMA; UN_WPP

6. Substitution: {"2026": 65510.99999999999, "2030": 64169.0, "2035": 63761.0, "2040": 63799.0, "2045": 63629.0, "2050": 63192.0, "2051": 63062.0}

7. Result: -0.0373830349101677

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-DOM — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_DOM; UN_WPP

6. Substitution: {"2026": 11609500.0, "2030": 11938852.0, "2035": 12289431.0, "2040": 12579320.0, "2045": 12816005.0, "2050": 12996293.0, "2051": 13025140.0}

7. Result: 0.12193806796158313

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ECU — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ECU; UN_WPP

6. Substitution: {"2026": 18444506.0, "2030": 19069719.0, "2035": 19800128.0, "2040": 20434220.0, "2045": 20950628.0, "2050": 21337237.0, "2051": 21398376.0}

7. Result: 0.160149043839938

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-EGY — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_EGY; UN_WPP

6. Substitution: {"2026": 120101175.0, "2030": 127139322.0, "2035": 136097217.0, "2040": 145213654.0, "2045": 153919189.0, "2050": 161630192.0, "2051": 163063539.0}

7. Result: 0.35771809892784145

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SLV — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SLV; UN_WPP

6. Substitution: {"2026": 6391253.0, "2030": 6486207.0, "2035": 6578181.0, "2040": 6640752.0, "2045": 6668025.0, "2050": 6663346.0, "2051": 6658584.0}

7. Result: 0.04182763536351941

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-GNQ — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_GNQ; UN_WPP

6. Substitution: {"2026": 1984468.0, "2030": 2170445.0, "2035": 2414269.0, "2040": 2665586.0, "2045": 2911235.0, "2050": 3143728.0, "2051": 3190137.0}

7. Result: 0.6075527546929453

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ERI — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ERI; UN_WPP

6. Substitution: {"2026": 3682669.0, "2030": 4002672.0, "2035": 4420922.0, "2040": 4868676.0, "2045": 5292768.0, "2050": 5696062.0, "2051": 5775739.0}

7. Result: 0.5683568086081046

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-EST — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_EST; UN_WPP

6. Substitution: {"2026": 1331062.0, "2030": 1302772.0, "2035": 1268271.0, "2040": 1236787.0, "2045": 1206184.0, "2050": 1174267.0, "2051": 1167469.0}

7. Result: -0.12290411716358818

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SWZ — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SWZ; UN_WPP

6. Substitution: {"2026": 1269859.0, "2030": 1320918.0, "2035": 1379418.0, "2040": 1429781.0, "2045": 1472137.0, "2050": 1505331.0, "2051": 1510782.0}

7. Result: 0.18972421347566937

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ETH — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ETH; UN_WPP

6. Substitution: {"2026": 138902185.0, "2030": 152855357.0, "2035": 170532954.0, "2040": 188450902.0, "2045": 206673639.0, "2050": 225021875.0, "2051": 228687201.0}

7. Result: 0.6463902349700259

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-FJI — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_FJI; UN_WPP

6. Substitution: {"2026": 937282.0, "2030": 953106.0, "2035": 969629.0, "2040": 983858.0, "2045": 994457.0, "2050": 1000261.0, "2051": 1000845.0}

7. Result: 0.0678163028842973

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-FIN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_FIN; UN_WPP

6. Substitution: {"2026": 5621739.0, "2030": 5592051.0, "2035": 5540655.0, "2040": 5480523.0, "2045": 5418350.0, "2050": 5351645.0, "2051": 5337090.0}

7. Result: -0.050633620664353174

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-FRA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_FRA; UN_WPP

6. Substitution: {"2026": 66746401.0, "2030": 67107691.00000001, "2035": 67547946.0, "2040": 67938904.0, "2045": 68190955.0, "2050": 68219675.0, "2051": 68200254.0}

7. Result: 0.021781743707799395

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-GAB — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_GAB; UN_WPP

6. Substitution: {"2026": 2647399.0, "2030": 2866667.0, "2035": 3151468.0, "2040": 3452988.0, "2045": 3767429.0, "2050": 4084533.0, "2051": 4147627.0000000005}

7. Result: 0.5666799753267264

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-GMB — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_GMB; UN_WPP

6. Substitution: {"2026": 2884079.0, "2030": 3130133.0, "2035": 3433425.0, "2040": 3732798.0, "2045": 4024237.0, "2050": 4301895.0, "2051": 4355372.0}

7. Result: 0.510143099408858

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-GEO — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_GEO; UN_WPP

6. Substitution: {"2026": 3804642.0, "2030": 3790542.0, "2035": 3764200.0, "2040": 3732856.0, "2045": 3703994.0, "2050": 3664014.0, "2051": 3654921.0}

7. Result: -0.03935219134940948

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-DEU — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_DEU; UN_WPP

6. Substitution: {"2026": 83644258.0, "2030": 82780953.0, "2035": 81669909.0, "2040": 80551736.0, "2045": 79491795.0, "2050": 78294613.0, "2051": 78048438.0}

7. Result: -0.06690022882383628

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-GHA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_GHA; UN_WPP

6. Substitution: {"2026": 35697557.0, "2030": 38222089.0, "2035": 41412554.0, "2040": 44568350.0, "2045": 47634274.0, "2050": 50553047.0, "2051": 51112490.0}

7. Result: 0.4318203903981441

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-GRC — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_GRC; UN_WPP

6. Substitution: {"2026": 9897115.0, "2030": 9721984.0, "2035": 9496499.0, "2040": 9275613.0, "2045": 9058325.0, "2050": 8812069.0, "2051": 8758041.0}

7. Result: -0.11509151909420068

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-GRD — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_GRD; UN_WPP

6. Substitution: {"2026": 117362.0, "2030": 117466.0, "2035": 117244.0, "2040": 116493.0, "2045": 115123.0, "2050": 113243.0, "2051": 112801.0}

7. Result: -0.03886266423544249

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-GTM — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_GTM; UN_WPP

6. Substitution: {"2026": 18967978.0, "2030": 20067253.0, "2035": 21394237.0, "2040": 22626870.0, "2045": 23719089.0, "2050": 24670857.0, "2051": 24845333.0}

7. Result: 0.3098566963753333

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-GIN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_GIN; UN_WPP

6. Substitution: {"2026": 15441993.0, "2030": 16807147.0, "2035": 18486013.0, "2040": 20160750.0, "2045": 21817245.0, "2050": 23404584.0, "2051": 23715929.0}

7. Result: 0.5358075217363458

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-GNB — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_GNB; UN_WPP

6. Substitution: {"2026": 2297808.0, "2030": 2488934.0, "2035": 2730133.0, "2040": 2969702.0, "2045": 3204249.0, "2050": 3438608.0, "2051": 3483363.0}

7. Result: 0.5159504188339497

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-GUY — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_GUY; UN_WPP

6. Substitution: {"2026": 840890.0, "2030": 861038.0, "2035": 885936.0, "2040": 907506.0, "2045": 926353.0, "2050": 940607.0, "2051": 942745.0}

7. Result: 0.12112761478909251

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-HTI — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_HTI; UN_WPP

6. Substitution: {"2026": 12037506.0, "2030": 12552359.0, "2035": 13165000.0, "2040": 13733853.0, "2045": 14252967.0, "2050": 14710862.0, "2051": 14794290.0}

7. Result: 0.229016209836157

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-VAT — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_VAT; UN_WPP

6. Substitution: {"2026": 506.0, "2030": 528.0, "2035": 537.0, "2040": 587.0, "2045": 649.0, "2050": 714.0, "2051": 726.0}

7. Result: 0.4347826086956521

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-HND — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_HND; UN_WPP

6. Substitution: {"2026": 11184760.0, "2030": 11885319.0, "2035": 12714114.0, "2040": 13484653.0, "2045": 14197946.0, "2050": 14846779.0, "2051": 14968238.0}

7. Result: 0.33827082565920064

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-HUN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_HUN; UN_WPP

6. Substitution: {"2026": 9585818.0, "2030": 9449115.0, "2035": 9259903.0, "2040": 9067617.0, "2045": 8889214.0, "2050": 8725347.0, "2051": 8693973.0}

7. Result: -0.09303796504377615

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ISL — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ISL; UN_WPP

6. Substitution: {"2026": 402329.0, "2030": 414348.0, "2035": 423579.0, "2040": 429452.0, "2045": 432484.0, "2050": 432993.0, "2051": 432981.0}

7. Result: 0.07618640465887361

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-IND — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_IND; UN_WPP

6. Substitution: {"2026": 1476625576.0, "2030": 1525138844.0, "2035": 1578694796.0, "2040": 1622580039.0, "2045": 1656067583.0, "2050": 1679589259.0, "2051": 1683220886.0}

7. Result: 0.1399104237105535

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-IDN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_IDN; UN_WPP

6. Substitution: {"2026": 287886782.0, "2030": 295876648.0, "2035": 304566622.0, "2040": 311797395.0, "2045": 317249613.0, "2050": 320712949.0, "2051": 321175111.0}

7. Result: 0.1156299319084404

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-IRN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_IRN; UN_WPP

6. Substitution: {"2026": 93168497.0, "2030": 95486667.0, "2035": 97679252.0, "2040": 99524277.0, "2045": 100990613.0, "2050": 101861993.0, "2051": 101942322.0}

7. Result: 0.09417158462908337

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-IRQ — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_IRQ; UN_WPP

6. Substitution: {"2026": 48007437.0, "2030": 51937208.0, "2035": 57035914.0, "2040": 62223211.0, "2045": 67204177.0, "2050": 71928750.0, "2051": 72837415.0}

7. Result: 0.5172110729427193

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-IRL — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_IRL; UN_WPP

6. Substitution: {"2026": 5356950.0, "2030": 5525093.0, "2035": 5686868.0, "2040": 5817570.0, "2045": 5916936.0, "2050": 5970042.0, "2051": 5973837.0}

7. Result: 0.11515638562988273

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ISR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ISR; UN_WPP

6. Substitution: {"2026": 9647689.0, "2030": 10175954.0, "2035": 10858122.0, "2040": 11581474.0, "2045": 12342061.0, "2050": 13092722.0, "2051": 13244415.0}

7. Result: 0.3728070007231783

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ITA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ITA; UN_WPP

6. Substitution: {"2026": 58926166.0, "2030": 57946072.0, "2035": 56620005.0, "2040": 55221168.0, "2045": 53680471.0, "2050": 51891099.0, "2051": 51499509.0}

7. Result: -0.12603326338930654

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-JAM — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_JAM; UN_WPP

6. Substitution: {"2026": 2833403.0, "2030": 2808954.0, "2035": 2755934.0, "2040": 2676100.0, "2045": 2574081.0, "2050": 2454940.0, "2051": 2429919.0}

7. Result: -0.14240261621802475

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-JPN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_JPN; UN_WPP

6. Substitution: {"2026": 122427731.0, "2030": 119584121.0, "2035": 115876149.0, "2040": 112158303.0, "2045": 108551995.0, "2050": 105123167.0, "2051": 104452458.0}

7. Result: -0.1468235411468991

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-JOR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_JOR; UN_WPP

6. Substitution: {"2026": 11589532.0, "2030": 12448776.0, "2035": 13440834.0, "2040": 14471297.0, "2045": 15471984.0, "2050": 16367354.0, "2051": 16525167.000000002}

7. Result: 0.42587008690256023

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-KAZ — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_KAZ; UN_WPP

6. Substitution: {"2026": 21083626.0, "2030": 22003193.0, "2035": 23125951.0, "2040": 24246823.0, "2045": 25409756.0, "2050": 26544265.0, "2051": 26757521.0}

7. Result: 0.2691138137244513

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-KEN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_KEN; UN_WPP

6. Substitution: {"2026": 58636412.0, "2030": 63102245.0, "2035": 68715909.0, "2040": 74108863.0, "2045": 79088836.0, "2050": 83593239.0, "2051": 84451673.0}

7. Result: 0.44025990198718157

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-KIR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_KIR; UN_WPP

6. Substitution: {"2026": 138445.0, "2030": 146126.0, "2035": 155440.0, "2040": 164700.0, "2045": 173813.0, "2050": 182621.0, "2051": 184260.0}

7. Result: 0.3309256383401351

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-KWT — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_KWT; UN_WPP

6. Substitution: {"2026": 5102773.0, "2030": 5324198.0, "2035": 5569671.0, "2040": 5831211.0, "2045": 6099774.0, "2050": 6367756.0, "2051": 6421239.0}

7. Result: 0.2583822560791946

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-KGZ — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_KGZ; UN_WPP

6. Substitution: {"2026": 7400465.0, "2030": 7803618.0, "2035": 8282415.000000001, "2040": 8757697.0, "2045": 9222104.0, "2050": 9642952.0, "2051": 9722163.0}

7. Result: 0.3137232592816803

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-LAO — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_LAO; UN_WPP

6. Substitution: {"2026": 7974017.0, "2030": 8357022.999999999, "2035": 8788756.0, "2040": 9169002.0, "2045": 9492503.0, "2050": 9757285.0, "2051": 9802787.0}

7. Result: 0.2293411212943237

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-LVA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_LVA; UN_WPP

6. Substitution: {"2026": 1835935.0, "2030": 1777620.0, "2035": 1706428.0, "2040": 1640644.0, "2045": 1577406.0, "2050": 1513810.0, "2051": 1501015.0}

7. Result: -0.18242475904648037

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-LBN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_LBN; UN_WPP

6. Substitution: {"2026": 5897467.0, "2030": 6103808.0, "2035": 6357724.0, "2040": 6620329.0, "2045": 6834988.0, "2050": 6999260.0, "2051": 7025484.0}

7. Result: 0.1912714390771495

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-LSO — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_LSO; UN_WPP

6. Substitution: {"2026": 2389336.0, "2030": 2493818.0, "2035": 2626567.0, "2040": 2757876.0, "2045": 2881339.0, "2050": 2993077.0, "2051": 3013558.0}

7. Result: 0.2612533356547593

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-LBR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_LBR; UN_WPP

6. Substitution: {"2026": 5853949.0, "2030": 6366291.0, "2035": 7003557.0, "2040": 7681688.0, "2045": 8310645.0, "2050": 8910530.0, "2051": 9020146.0}

7. Result: 0.5408651493205698

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-LBY — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_LBY; UN_WPP

6. Substitution: {"2026": 7539851.0, "2030": 7885806.0, "2035": 8283952.999999999, "2040": 8651417.0, "2045": 8983949.0, "2050": 9260605.0, "2051": 9310578.0}

7. Result: 0.23484907062487048

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-LIE — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_LIE; UN_WPP

6. Substitution: {"2026": 40368.0, "2030": 41202.0, "2035": 42005.0, "2040": 42534.0, "2045": 42861.0, "2050": 43013.0, "2051": 43031.0}

7. Result: 0.06596809353943711

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-LTU — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_LTU; UN_WPP

6. Substitution: {"2026": 2797338.0, "2030": 2706358.0, "2035": 2597392.0, "2040": 2484835.0, "2045": 2372137.0, "2050": 2258774.0, "2051": 2235291.0}

7. Result: -0.20092209093073488

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-LUX — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_LUX; UN_WPP

6. Substitution: {"2026": 687448.0, "2030": 713667.0, "2035": 740629.0, "2040": 762673.0, "2045": 779539.0, "2050": 791464.0, "2051": 793283.0}

7. Result: 0.15395346266190324

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MDG — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MDG; UN_WPP

6. Substitution: {"2026": 33522052.000000004, "2030": 36693183.0, "2035": 40733844.0, "2040": 44846895.0, "2045": 49011274.0, "2050": 53185475.0, "2051": 54016765.0}

7. Result: 0.6113800253039401

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MWI — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MWI; UN_WPP

6. Substitution: {"2026": 22785535.0, "2030": 25160287.0, "2035": 28213795.0, "2040": 31302098.0, "2045": 34350954.0, "2050": 37361683.0, "2051": 37964325.0}

7. Result: 0.6661590346682664

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MYS — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MYS; UN_WPP

6. Substitution: {"2026": 36385115.0, "2030": 37961719.0, "2035": 39814825.0, "2040": 41509644.0, "2045": 43038204.0, "2050": 44289772.0, "2051": 44502613.0}

7. Result: 0.22309941853969684

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MDV — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MDV; UN_WPP

6. Substitution: {"2026": 531517.0, "2030": 539667.0, "2035": 551594.0, "2040": 564798.0, "2045": 578453.0, "2050": 589962.0, "2051": 591628.0}

7. Result: 0.11309327829589644

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MLI — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MLI; UN_WPP

6. Substitution: {"2026": 25932275.0, "2030": 29002865.0, "2035": 33118345.0, "2040": 37413643.0, "2045": 41778982.0, "2050": 46154079.0, "2051": 47029244.0}

7. Result: 0.8135410024766434

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MLT — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MLT; UN_WPP

6. Substitution: {"2026": 549011.0, "2030": 555231.0, "2035": 556508.0, "2040": 551735.0, "2045": 544634.0, "2050": 535721.0, "2051": 533639.0}

7. Result: -0.027999438991204162

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MHL — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MHL; UN_WPP

6. Substitution: {"2026": 35075.0, "2030": 31186.0, "2035": 28142.0, "2040": 26597.0, "2045": 25773.0, "2050": 25195.0, "2051": 25088.0}

7. Result: -0.2847327156094084

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MRT — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MRT; UN_WPP

6. Substitution: {"2026": 5461319.0, "2030": 6062528.0, "2035": 6856319.0, "2040": 7681908.0, "2045": 8538531.0, "2050": 9415598.0, "2051": 9592001.0}

7. Result: 0.7563524489230533

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MUS — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MUS; UN_WPP

6. Substitution: {"2026": 1265059.0, "2030": 1250432.0, "2035": 1226955.0, "2040": 1195223.0, "2045": 1154659.0, "2050": 1107197.0, "2051": 1097238.0}

7. Result: -0.13265863489370855

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MEX — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MEX; UN_WPP

6. Substitution: {"2026": 132997658.0, "2030": 136904738.0, "2035": 141150819.0, "2040": 144624323.0, "2045": 147240092.0, "2050": 148946274.0, "2051": 149181847.0}

7. Result: 0.1216877743817113

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-FSM — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_FSM; UN_WPP

6. Substitution: {"2026": 114183.0, "2030": 116350.0, "2035": 119143.0, "2040": 121681.0, "2045": 124064.0, "2050": 126408.0, "2051": 126853.0}

7. Result: 0.1109622273017874

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MCO — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MCO; UN_WPP

6. Substitution: {"2026": 38087.0, "2030": 37366.0, "2035": 36894.0, "2040": 36627.0, "2045": 36523.0, "2050": 36757.0, "2051": 36840.0}

7. Result: -0.03274083020453178

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MNG — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MNG; UN_WPP

6. Substitution: {"2026": 3556798.0, "2030": 3705231.0, "2035": 3889776.0, "2040": 4095554.0, "2045": 4308779.0, "2050": 4501493.0, "2051": 4535765.0}

7. Result: 0.2752382901699788

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MNE — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MNE; UN_WPP

6. Substitution: {"2026": 626233.0, "2030": 612562.0, "2035": 594137.0, "2040": 574434.0, "2045": 554231.0, "2050": 533295.0, "2051": 529032.0}

7. Result: -0.1552153910764843

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MAR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MAR; UN_WPP

6. Substitution: {"2026": 38762441.0, "2030": 39953460.0, "2035": 41182094.0, "2040": 42168205.0, "2045": 42925306.0, "2050": 43440431.0, "2051": 43517149.0}

7. Result: 0.1226627600671486

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MOZ — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MOZ; UN_WPP

6. Substitution: {"2026": 36639851.0, "2030": 40846755.0, "2035": 46411774.0, "2040": 52124215.0, "2045": 57851793.0, "2050": 63530952.0, "2051": 64647084.0}

7. Result: 0.7643926554177307

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MMR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MMR; UN_WPP

6. Substitution: {"2026": 55184819.0, "2030": 56351031.0, "2035": 57444464.0, "2040": 58169858.0, "2045": 58558172.0, "2050": 58623232.0, "2051": 58602738.0}

7. Result: 0.061935855946179785

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-NAM — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_NAM; UN_WPP

6. Substitution: {"2026": 3153246.0, "2030": 3389958.0, "2035": 3678880.0, "2040": 3962405.0, "2045": 4243350.0, "2050": 4512301.0, "2051": 4564906.0}

7. Result: 0.4476847033184217

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-NRU — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_NRU; UN_WPP

6. Substitution: {"2026": 12101.0, "2030": 12521.0, "2035": 13233.0, "2040": 14039.0, "2045": 14928.0, "2050": 15758.0, "2051": 15913.0}

7. Result: 0.31501528799272793

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-NPL — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_NPL; UN_WPP

6. Substitution: {"2026": 29629410.0, "2030": 30509996.0, "2035": 31798004.0, "2040": 32909536.999999996, "2045": 33861060.0, "2050": 34642027.0, "2051": 34777003.0}

7. Result: 0.1737325515425383

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-NLD — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_NLD; UN_WPP

6. Substitution: {"2026": 18448775.0, "2030": 18757217.0, "2035": 18977352.0, "2040": 19062983.0, "2045": 19041975.0, "2050": 18958475.0, "2051": 18934376.0}

7. Result: 0.026321585037488937

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-NZL — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_NZL; UN_WPP

6. Substitution: {"2026": 5287479.0, "2030": 5407349.0, "2035": 5520602.0, "2040": 5617291.0, "2045": 5700556.0, "2050": 5755288.0, "2051": 5766716.0}

7. Result: 0.0906361992170559

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-NIC — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_NIC; UN_WPP

6. Substitution: {"2026": 7097329.0, "2030": 7441603.0, "2035": 7836703.0, "2040": 8189914.0, "2045": 8497615.0, "2050": 8756430.0, "2051": 8801962.0}

7. Result: 0.24017950978459646

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-NER — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_NER; UN_WPP

6. Substitution: {"2026": 28814878.0, "2030": 32518075.0, "2035": 37353463.0, "2040": 42316740.0, "2045": 47374117.0, "2050": 52513876.0, "2051": 53546930.0}

7. Result: 0.8583084058173003

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-NGA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_NGA; UN_WPP

6. Substitution: {"2026": 242431832.0, "2030": 262380969.99999997, "2035": 287685763.0, "2040": 312710416.0, "2045": 336662502.0, "2050": 359185556.0, "2051": 363523611.0}

7. Result: 0.49948795090572107

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MKD — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MKD; UN_WPP

6. Substitution: {"2026": 1804063.0, "2030": 1762486.0, "2035": 1704194.0, "2040": 1641908.0, "2045": 1577355.0, "2050": 1512688.0, "2051": 1499303.0}

7. Result: -0.16892979901477945

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-NOR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_NOR; UN_WPP

6. Substitution: {"2026": 5652989.0, "2030": 5729095.0, "2035": 5801417.0, "2040": 5853869.0, "2045": 5886017.0, "2050": 5899829.0, "2051": 5899792.0}

7. Result: 0.043658850211808264

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-OMN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_OMN; UN_WPP

6. Substitution: {"2026": 5671458.0, "2030": 6112706.0, "2035": 6517803.0, "2040": 6931974.0, "2045": 7370225.0, "2050": 7827002.0, "2051": 7920185.0}

7. Result: 0.3964989249677948

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-PAK — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_PAK; UN_WPP

6. Substitution: {"2026": 259299791.0, "2030": 276883255.0, "2035": 300643508.0, "2040": 324937697.0, "2045": 348837726.0, "2050": 371863793.0, "2051": 376335025.0}

7. Result: 0.451351054116353

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-PLW — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_PLW; UN_WPP

6. Substitution: {"2026": 17614.0, "2030": 17376.0, "2035": 17015.0, "2040": 16602.0, "2045": 16088.999999999998, "2050": 15518.0, "2051": 15403.0}

7. Result: -0.12552515044850687

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-PAN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_PAN; UN_WPP

6. Substitution: {"2026": 4625718.0, "2030": 4833859.0, "2035": 5072263.0, "2040": 5286592.0, "2045": 5473276.0, "2050": 5630680.0, "2051": 5658479.0}

7. Result: 0.22326501529059928

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-PNG — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_PNG; UN_WPP

6. Substitution: {"2026": 10947848.0, "2030": 11671424.0, "2035": 12540603.0, "2040": 13376160.0, "2045": 14165588.0, "2050": 14906590.0, "2051": 15046436.0}

7. Result: 0.37437384954559105

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-PRY — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_PRY; UN_WPP

6. Substitution: {"2026": 7095279.0, "2030": 7407618.0, "2035": 7763520.0, "2040": 8087572.0, "2045": 8380530.000000001, "2050": 8640464.0, "2051": 8687836.0}

7. Result: 0.22445304828745982

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-PER — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_PER; UN_WPP

6. Substitution: {"2026": 34922148.0, "2030": 36193880.0, "2035": 37591425.0, "2040": 38794649.0, "2045": 39796724.0, "2050": 40583876.0, "2051": 40716361.0}

7. Result: 0.1659180013783803

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-PHL — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_PHL; UN_WPP

6. Substitution: {"2026": 117724471.0, "2030": 121408895.0, "2035": 125740971.0, "2040": 129546659.0, "2045": 132492032.0, "2050": 134373439.0, "2051": 134612611.0}

7. Result: 0.143454796241981

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-POL — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_POL; UN_WPP

6. Substitution: {"2026": 37843188.0, "2030": 37198543.0, "2035": 36243787.0, "2040": 35179554.0, "2045": 34031059.0, "2050": 32814095.999999996, "2051": 32561485.0}

7. Result: -0.1395681304651183

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-PRT — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_PRT; UN_WPP

6. Substitution: {"2026": 10395362.0, "2030": 10317927.0, "2035": 10208240.0, "2040": 10082255.0, "2045": 9938389.0, "2050": 9770271.0, "2051": 9734815.0}

7. Result: -0.06354247211400621

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-QAT — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_QAT; UN_WPP

6. Substitution: {"2026": 3173559.0, "2030": 3333610.0, "2035": 3511258.0, "2040": 3711503.0, "2045": 3930896.0, "2050": 4164461.0000000005, "2051": 4212656.0}

7. Result: 0.32742324941808243

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-KOR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_KOR; UN_WPP

6. Substitution: {"2026": 51600388.0, "2030": 51188584.0, "2035": 50300733.0, "2040": 48948687.0, "2045": 47232956.0, "2050": 45143134.0, "2051": 44671149.0}

7. Result: -0.13428656776766867

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-MDA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_MDA; UN_WPP

6. Substitution: {"2026": 2961253.0, "2030": 2845242.0, "2035": 2702010.0, "2040": 2568810.0, "2045": 2454941.0, "2050": 2351809.0, "2051": 2331186.0}

7. Result: -0.21277040496033262

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ROU — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ROU; UN_WPP

6. Substitution: {"2026": 18800605.0, "2030": 18359507.0, "2035": 17794417.0, "2040": 17209718.0, "2045": 16620320.0, "2050": 16027266.0, "2051": 15907818.0}

7. Result: -0.15386669737489833

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-RUS — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_RUS; UN_WPP

6. Substitution: {"2026": 143394458.0, "2030": 141889410.0, "2035": 139909641.0, "2040": 138281831.0, "2045": 137152207.0, "2050": 136132775.0, "2051": 135876189.0}

7. Result: -0.05243068041025689

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-RWA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_RWA; UN_WPP

6. Substitution: {"2026": 14889693.0, "2030": 16154705.0, "2035": 17746319.0, "2040": 19440770.0, "2045": 21152658.0, "2050": 22707910.0, "2051": 23007765.0}

7. Result: 0.5452141961556898

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-KNA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_KNA; UN_WPP

6. Substitution: {"2026": 46992.0, "2030": 47134.0, "2035": 46928.0, "2040": 46313.0, "2045": 45367.0, "2050": 44249.0, "2051": 43998.0}

7. Result: -0.06371297242083762

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-LCA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_LCA; UN_WPP

6. Substitution: {"2026": 180488.0, "2030": 181359.0, "2035": 181178.0, "2040": 179293.0, "2045": 176236.0, "2050": 172081.0, "2051": 171147.0}

7. Result: -0.05175413323877487

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-VCT — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_VCT; UN_WPP

6. Substitution: {"2026": 99245.0, "2030": 96856.0, "2035": 94484.0, "2040": 92650.0, "2045": 90955.0, "2050": 88942.0, "2051": 88495.0}

7. Result: -0.10831779938535946

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-WSM — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_WSM; UN_WPP

6. Substitution: {"2026": 220528.0, "2030": 225971.0, "2035": 235179.0, "2040": 247196.0, "2045": 260262.0, "2050": 272726.0, "2051": 275124.0}

7. Result: 0.24756946963650872

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SMR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SMR; UN_WPP

6. Substitution: {"2026": 33605.0, "2030": 33742.0, "2035": 33828.0, "2040": 33969.0, "2045": 33920.0, "2050": 33696.0, "2051": 33643.0}

7. Result: 0.001130784109507621

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-STP — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_STP; UN_WPP

6. Substitution: {"2026": 244994.0, "2030": 264565.0, "2035": 290088.0, "2040": 315842.0, "2045": 340926.0, "2050": 365115.0, "2051": 369875.0}

7. Result: 0.5097308505514422

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SAU — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SAU; UN_WPP

6. Substitution: {"2026": 35165787.0, "2030": 37443751.0, "2035": 40012640.0, "2040": 42592205.0, "2045": 45156465.0, "2050": 47693910.0, "2051": 48198043.0}

7. Result: 0.37059474881082566

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SEN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SEN; UN_WPP

6. Substitution: {"2026": 19366548.0, "2030": 21163192.0, "2035": 23476596.0, "2040": 25797510.0, "2045": 28089699.0, "2050": 30364954.0, "2051": 30817068.0}

7. Result: 0.5912525040600938

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SRB — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SRB; UN_WPP

6. Substitution: {"2026": 6641964.0, "2030": 6461212.0, "2035": 6226578.0, "2040": 5987456.0, "2045": 5753266.0, "2050": 5532870.0, "2051": 5489989.0}

7. Result: -0.17343891053911165

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SYC — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SYC; UN_WPP

6. Substitution: {"2026": 134959.0, "2030": 140399.0, "2035": 141891.0, "2040": 142544.0, "2045": 142524.0, "2050": 141746.0, "2051": 141518.0}

7. Result: 0.04859994516853261

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SLE — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SLE; UN_WPP

6. Substitution: {"2026": 8996745.0, "2030": 9694858.0, "2035": 10563167.0, "2040": 11398400.0, "2045": 12208880.0, "2050": 12948325.0, "2051": 13093462.0}

7. Result: 0.45535546467083376

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SGP — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SGP; UN_WPP

6. Substitution: {"2026": 5905748.0, "2030": 6031377.0, "2035": 6153233.0, "2040": 6194782.0, "2045": 6156188.0, "2050": 6081691.0, "2051": 6064528.0}

7. Result: 0.026885671383201526

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SVK — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SVK; UN_WPP

6. Substitution: {"2026": 5451342.0, "2030": 5401392.0, "2035": 5307343.0, "2040": 5192010.0, "2045": 5066919.0, "2050": 4936488.0, "2051": 4909328.0}

7. Result: -0.0994276271787754

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SVN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SVN; UN_WPP

6. Substitution: {"2026": 2114573.0, "2030": 2098956.0, "2035": 2073835.9999999998, "2040": 2046764.0, "2045": 2016283.0, "2050": 1981553.0, "2051": 1973639.0}

7. Result: -0.06664891682623397

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SLB — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SLB; UN_WPP

6. Substitution: {"2026": 858288.0, "2030": 938348.0, "2035": 1039656.9999999999, "2040": 1135455.0, "2045": 1224199.0, "2050": 1309110.0, "2051": 1325603.0}

7. Result: 0.5444734168484238

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SOM — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SOM; UN_WPP

6. Substitution: {"2026": 20305907.0, "2030": 22915044.0, "2035": 26294950.0, "2040": 29896287.0, "2045": 33510165.999999996, "2050": 37206512.0, "2051": 37953802.0}

7. Result: 0.869101537793904

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ZAF — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ZAF; UN_WPP

6. Substitution: {"2026": 65453084.0, "2030": 68161359.0, "2035": 71234752.0, "2040": 74035624.0, "2045": 76681450.0, "2050": 79177328.0, "2051": 79652213.0}

7. Result: 0.2169359811983802

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SSD — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SSD; UN_WPP

6. Substitution: {"2026": 12436037.0, "2030": 13457453.0, "2035": 14798600.0, "2040": 16101480.0, "2045": 17286410.0, "2050": 18341974.0, "2051": 18542997.0}

7. Result: 0.49106962290318057

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ESP — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ESP; UN_WPP

6. Substitution: {"2026": 47850793.0, "2030": 47610520.0, "2035": 47154196.0, "2040": 46591674.0, "2045": 45879964.0, "2050": 44928558.0, "2051": 44712279.0}

7. Result: -0.06558959221428162

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-LKA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_LKA; UN_WPP

6. Substitution: {"2026": 23348315.0, "2030": 23767952.0, "2035": 24196475.0, "2040": 24526699.0, "2045": 24736435.0, "2050": 24813690.0, "2051": 24814757.0}

7. Result: 0.0628071875850571

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-PSE — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_PSE; UN_WPP

6. Substitution: {"2026": 5692790.0, "2030": 6122314.0, "2035": 6692735.0, "2040": 7291826.0, "2045": 7895095.0, "2050": 8451891.0, "2051": 8559237.0}

7. Result: 0.5035223502008681

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SDN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SDN; UN_WPP

6. Substitution: {"2026": 53282719.0, "2030": 58571616.0, "2035": 65148317.0, "2040": 71730599.0, "2045": 78415203.0, "2050": 85206383.0, "2051": 86579067.0}

7. Result: 0.6248995664053856

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SUR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SUR; UN_WPP

6. Substitution: {"2026": 645256.0, "2030": 665652.0, "2035": 688191.0, "2040": 707160.0, "2045": 722756.0, "2050": 733904.0, "2051": 735702.0}

7. Result: 0.1401707229378728

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SWE — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SWE; UN_WPP

6. Substitution: {"2026": 10701047.0, "2030": 10841810.0, "2035": 10964978.0, "2040": 11078602.0, "2045": 11202872.0, "2050": 11309630.0, "2051": 11327101.0}

7. Result: 0.058503994982920915

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-CHE — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_CHE; UN_WPP

6. Substitution: {"2026": 9007798.0, "2030": 9130292.0, "2035": 9224225.0, "2040": 9276178.0, "2045": 9315498.0, "2050": 9342586.0, "2051": 9343512.0}

7. Result: 0.03726926380897977

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-SYR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_SYR; UN_WPP

6. Substitution: {"2026": 26472497.0, "2030": 29395540.0, "2035": 32294793.0, "2040": 34533185.0, "2045": 36265286.0, "2050": 37793372.0, "2051": 38104385.0}

7. Result: 0.439395195700655

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-TJK — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_TJK; UN_WPP

6. Substitution: {"2026": 10978599.0, "2030": 11733068.0, "2035": 12695585.0, "2040": 13713947.0, "2045": 14694862.0, "2050": 15574642.0, "2051": 15737680.0}

7. Result: 0.43348709612219194

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-THA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_THA; UN_WPP

6. Substitution: {"2026": 71559614.0, "2030": 71215022.0, "2035": 70540885.0, "2040": 69535002.0, "2045": 68150152.0, "2050": 66382735.0, "2051": 65985159.0}

7. Result: -0.07789945596967585

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-TLS — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_TLS; UN_WPP

6. Substitution: {"2026": 1436923.0, "2030": 1519804.0, "2035": 1618798.0, "2040": 1718249.0, "2045": 1809633.0, "2050": 1889249.0, "2051": 1902810.0}

7. Result: 0.32422544562234723

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-TGO — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_TGO; UN_WPP

6. Substitution: {"2026": 9930918.0, "2030": 10792997.0, "2035": 11937684.0, "2040": 13121352.0, "2045": 14347512.0, "2050": 15584778.0, "2051": 15831367.0}

7. Result: 0.5941494029051493

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-TON — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_TON; UN_WPP

6. Substitution: {"2026": 103291.0, "2030": 102072.0, "2035": 101829.0, "2040": 102565.0, "2045": 103930.0, "2050": 105195.0, "2051": 105416.0}

7. Result: 0.020572944399802395

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-TTO — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_TTO; UN_WPP

6. Substitution: {"2026": 1513268.0, "2030": 1512322.0, "2035": 1497855.0, "2040": 1472944.0, "2045": 1439585.0, "2050": 1399800.0, "2051": 1391195.0}

7. Result: -0.08066846057671218

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-TUN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_TUN; UN_WPP

6. Substitution: {"2026": 12415138.0, "2030": 12628142.0, "2035": 12812269.0, "2040": 12953864.0, "2045": 13076089.0, "2050": 13145141.0, "2051": 13148162.0}

7. Result: 0.05904275892865618

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-TKM — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_TKM; UN_WPP

6. Substitution: {"2026": 7736632.0, "2030": 8135729.0, "2035": 8538668.0, "2040": 8932231.0, "2045": 9312822.0, "2050": 9639708.0, "2051": 9694833.0}

7. Result: 0.2531076830331338

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-TUV — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_TUV; UN_WPP

6. Substitution: {"2026": 9362.0, "2030": 9047.0, "2035": 8980.0, "2040": 9140.0, "2045": 9438.0, "2050": 9781.0, "2051": 9849.0}

7. Result: 0.05201879940183729

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-TUR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_TUR; UN_WPP

6. Substitution: {"2026": 87926082.0, "2030": 89027542.0, "2035": 90188557.0, "2040": 91009681.0, "2045": 91392535.0, "2050": 91258061.0, "2051": 91140413.0}

7. Result: 0.036557195850032365

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-UGA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_UGA; UN_WPP

6. Substitution: {"2026": 52761469.0, "2030": 58312940.0, "2035": 65205574.0, "2040": 72020418.0, "2045": 78797992.0, "2050": 85431202.0, "2051": 86718842.0}

7. Result: 0.6436017351980856

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-UKR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_UKR; UN_WPP

6. Substitution: {"2026": 39535849.0, "2030": 38353853.0, "2035": 36828147.0, "2040": 35270911.0, "2045": 33680445.0, "2050": 31990132.0, "2051": 31637037.0}

7. Result: -0.19978860198499848

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ARE — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ARE; UN_WPP

6. Substitution: {"2026": 11574682.0, "2030": 12190605.0, "2035": 12910702.0, "2040": 13693776.0, "2045": 14507366.0, "2050": 15367392.0, "2051": 15543672.0}

7. Result: 0.3429027251029446

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-GBR — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_GBR; UN_WPP

6. Substitution: {"2026": 69931528.0, "2030": 71286992.0, "2035": 72656815.0, "2040": 73774626.0, "2045": 74753658.0, "2050": 75504681.0, "2051": 75616457.0}

7. Result: 0.08129278971281728

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-TZA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_TZA; UN_WPP

6. Substitution: {"2026": 72563780.0, "2030": 80913124.0, "2035": 92091429.0, "2040": 103999359.0, "2045": 116525473.0, "2050": 129621102.0, "2051": 132280446.99999999}

7. Result: 0.82295419284938

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-USA — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_USA; UN_WPP

6. Substitution: {"2026": 349035494.0, "2030": 355649881.0, "2035": 363284716.0, "2040": 370209316.0, "2045": 376106472.0, "2050": 380846910.0, "2051": 381708396.0}

7. Result: 0.09360911013823703

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-URY — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_URY; UN_WPP

6. Substitution: {"2026": 3382537.0, "2030": 3372887.0, "2035": 3358282.0, "2040": 3336459.0, "2045": 3302675.0, "2050": 3254354.0, "2051": 3242784.0}

7. Result: -0.04131602995030059

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-UZB — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_UZB; UN_WPP

6. Substitution: {"2026": 37724223.0, "2030": 40248241.0, "2035": 43175102.0, "2040": 46044152.0, "2045": 49096063.0, "2050": 52210755.0, "2051": 52819885.0}

7. Result: 0.40015832797934636

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-VUT — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_VUT; UN_WPP

6. Substitution: {"2026": 342564.0, "2030": 372428.0, "2035": 411063.0, "2040": 451512.0, "2045": 492990.0, "2050": 534388.0, "2051": 542587.0}

7. Result: 0.5838996508681589

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-VEN — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_VEN; UN_WPP

6. Substitution: {"2026": 28633711.0, "2030": 29151810.0, "2035": 29883329.0, "2040": 30495443.0, "2045": 30871487.0, "2050": 31094883.0, "2051": 31122396.0}

7. Result: 0.08691451136040307

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-VNM — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_VNM; UN_WPP

6. Substitution: {"2026": 102177431.0, "2030": 104254902.0, "2035": 106530676.0, "2040": 108437635.0, "2045": 109685398.0, "2050": 110008908.0, "2051": 109963189.0}

7. Result: 0.07619841215228829

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-YEM — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_YEM; UN_WPP

6. Substitution: {"2026": 42961653.0, "2030": 47667662.0, "2035": 53429325.0, "2040": 59181526.0, "2045": 65066356.0, "2050": 70976403.0, "2051": 72147203.0}

7. Result: 0.679339549621147

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ZMB — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ZMB; UN_WPP

6. Substitution: {"2026": 22521915.0, "2030": 25024901.0, "2035": 28266892.0, "2040": 31550402.0, "2045": 34821106.0, "2050": 38083385.0, "2051": 38728892.0}

7. Result: 0.7196091895382786

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas


## C-POP-ZWE — Population projectionpath

1. Business question: Population projectionpath

2. Intuition: WPP thousands×1000;2051/2026−1

3. Formula: WPP thousands×1000;2051/2026−1

4. Units: Persons /fractionchange

5. Inputs: UN_WPP_ZWE; UN_WPP

6. Substitution: {"2026": 17273580.0, "2030": 18610349.0, "2035": 20409146.0, "2040": 22250109.0, "2045": 24102380.0, "2050": 25866385.0, "2051": 26217392.0}

7. Result: 0.517774080416451

8. Interpretation: No category demand inference

9. Failure conditions: No category demand inference

10. Sensitivity: UNmediumvariantonly

11. Lineage: Countries; scripts/olam-analyse.py; slides 7 /atlas