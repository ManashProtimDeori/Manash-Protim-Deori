# Marketing Intelligence Engine — Production Integration Guide

## What this repository now contains

The Tools experience includes a deterministic, explicitly labeled demonstration of the broader Marketing Intelligence Engine: source prioritization, evidence-aware intelligence objects, quantified variables, a relationship graph, what-if simulation, uncertainty ranges, sensitivity analysis, early-warning detection, daily run observability, decision options, stored-intelligence queries and differentiated publication outputs.

The browser experience intentionally **does not pretend to crawl live sources**. Synthetic records remain visibly labeled until real connectors, storage and server-side credentials are configured.

## Production architecture

```text
Discoverable source universe
→ source scheduler
→ change detection
→ retrieval queue
→ document normalization
→ atomic claim extraction
→ evidence verification
→ entity resolution
→ events
→ signals
→ trends
→ quantitative variables
→ business impact graph
→ scenario engine
→ decision intelligence
→ editorial quality gates
→ daily brief / dashboard / LinkedIn draft / article
→ CMS + memory + audit log
```

Use deterministic code for calculations, scoring, normalization, statistics and graph propagation. Use language models for extraction, classification, cross-document synthesis, contradiction search, interpretation and drafting.

## Required server-side services

The repository exposes `/api/intelligence/health` and an authenticated `/api/intelligence/run` contract. A production run requires:

- Supabase (Postgres + Auth; pgvector optional)
- a server-side model key
- a source-discovery provider or licensed search/feed layer
- a durable workflow/queue worker for retrieval and verification stages
- optional CMS write credentials
- optional notification/publishing integrations

Do not place service-role keys, crawler credentials, model keys, CMS tokens or cron secrets in `VITE_*` variables.

## Database

Apply:

```text
supabase/migrations/20260927_marketing_intelligence_engine.sql
```

Internal intelligence tables enable RLS with no anonymous write policies. Published briefs/articles/social records have read-only public policies. Server workers should write with the Supabase service role.

## Environment variables

Copy `.env.example` into the appropriate deployment environment and fill values server-side. Important configuration:

- `SOURCE_DISCOVERY_LIMIT`
- `DAILY_FETCH_BUDGET`
- `MAX_VERIFY_SOURCES`
- `MIN_VERIFY_SOURCES`
- `MIN_PUBLISH_CONFIDENCE`
- `DAILY_PUBLISH_TIME`
- `DEFAULT_TIMEZONE`

The default verification target is 10 independent checks where sufficient genuinely independent sources exist. If fewer exist, record the actual count and reduce confidence rather than fabricating corroboration.

## Scheduling

Schedule exactly one daily orchestrator invocation. The endpoint requires:

```text
Authorization: Bearer $INTELLIGENCE_CRON_SECRET
```

The run ID is date-based and the contract includes an idempotency key. Durable workers should persist stage transitions so a failed LinkedIn stage does not erase successful research or verification work.

A recommended production scheduler is a database/workflow scheduler with retry history rather than repeatedly triggering Vercel preview builds.

## Source registry

Do not crawl one million pages each day. Maintain a discoverable source registry and calculate priority from strategic relevance, information value, reliability, expected change probability, freshness, historical signal yield and retrieval cost. High-value sources receive frequent checks; low-value sources are sampled.

Respect robots directives, rate limits, licensing, paywalls, authentication and copyright. Never bypass access controls.

## Evidence workflow

Major claims should store:

- original claim
- claim type
- source
- supporting evidence
- contradictory evidence
- neutral evidence
- independence score
- verification status
- quantitative observations
- confidence

The evidence graph must permit backward tracing from a published conclusion to signal → event → claim → source.

## Quantification and scenarios

The frontend `variableEngine.ts` demonstrates the contract:

- every number has provenance
- scenario assumptions remain labeled
- relationships have explicit types
- variable locking is supported
- downstream variables recalculate immediately
- uncertainty is shown as P10/P50/P90
- sensitivity identifies assumptions with the largest modeled influence

Replace demo elasticities only when defensible observed estimates or explicit scenario assumptions exist.

## Publishing gates

No live output should be auto-published until all configured gates pass:

1. evidence validation
2. claim consistency
3. quantitative consistency
4. duplicate detection
5. editorial quality
6. citation completeness
7. confidence threshold
8. human review when required

Default to `Human Review Required` for high-impact or low-confidence intelligence.

## Website integration

The existing site currently has Tools, Writing and Research routes. The intelligence engine is integrated in Tools and keeps publication artifacts in review state. Once live storage is connected, publish verified deep dives into `/writing` and research artifacts into `/research` rather than injecting synthetic demo content into public editorial pages.

Future routes such as `/latest`, `/daily`, `/topics`, `/companies` and `/platforms` should read from the same persisted intelligence graph, not duplicate data.

## Trust boundary

The product should become more trusted because it makes uncertainty visible. A live source failure, insufficient corroboration or contradictory evidence must reduce confidence or block publication. Never substitute synthetic data for missing live evidence.
