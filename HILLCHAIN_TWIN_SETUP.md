# HillChain Twin — Production Integration Notes

HillChain Twin is implemented in this repository as an interactive, deterministic portfolio-grade digital-twin demo. The current UI uses clearly labeled synthetic Meghalaya-style data so the site never presents invented operational numbers as verified government findings.

## Current implementation

The tool includes:

- configurable supply nodes and transport edges
- terrain complexity and effective logistics distance
- route-level cost-to-serve
- terrain-adjusted fuel and travel time
- warehouse utilization, days of supply and dynamic safety stock
- stockout and service-risk calculations
- resilience and lead-time reliability measures
- flat / variable / hybrid terrain-equity reimbursement
- private operator break-even logic
- disaster and monsoon scenarios
- route-removal digital-twin simulation
- deterministic Monte Carlo cost / stockout / service ranges
- public infrastructure NPV + public-value prioritization
- One Rupee Optimizer
- data-quality and traceability views
- structured AI analyst answers grounded only in current model state

## Analytical boundary

The current map is a schematic network visualization, not authoritative GIS geometry. Real deployment should use PostGIS plus a map/GIS provider and route-network data.

Synthetic data must remain visibly labeled until verified sources are connected.

## Production services

Keep analytical formulas outside UI components and migrate the deterministic engine into independently testable services:

- CostEngine
- FinancialEngine
- InventoryEngine
- RoutingEngine
- WarehouseEngine
- RiskEngine
- TerrainEngine
- WeatherEngine
- ServiceLevelEngine
- ForecastEngine
- ResilienceEngine
- SimulationEngine
- OptimizationEngine

The existing `engine.ts` is the browser-side contract for those services.

## Recommended live data architecture

```text
Government / operator MIS
GPS / telematics
Weather + rainfall
Road closure feeds
FCI / allocation data
Fuel prices
Contracts + invoices
e-POS / beneficiary aggregation
GIS + satellite risk layers
Manual / CSV / Excel inputs
        ↓
Validation + normalization
        ↓
PostgreSQL / PostGIS
        ↓
Computation services
        ↓
Simulation / optimization workers
        ↓
HillChain Twin UI
```

## Security and privacy

Do not expose beneficiary-level personal data or confidential transporter financial information in public views. Production access should be role-based, with separate government, operator, research and public-safe views.

## Calibration

The Meghalaya terrain weights in the demo are engineering priors. Replace or recalibrate them using historical disruptions, GPS travel time, weather observations, road closures, transport cost, delivery failure and stockout records.

## Public-value safeguard

Do not optimize cost alone. Every production recommendation should preserve separate outputs for:

- financial cost
- service availability
- equity
- resilience
- private viability
- confidence
- assumptions
- evidence
- alternatives

High-cost remote routes must not automatically be classified as inefficient.
