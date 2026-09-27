-- Marketing Intelligence Engine schema
-- Internal intelligence tables are RLS-protected by default. Server-side service-role
-- workers may write; no anonymous write policy is created.

create extension if not exists pgcrypto;
create extension if not exists vector;

create table if not exists intelligence_sources (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  domain text not null,
  name text not null,
  source_type text not null,
  topics text[] not null default '{}',
  industries text[] not null default '{}',
  geographies text[] not null default '{}',
  entities text[] not null default '{}',
  authority_score numeric not null default 0,
  reliability_score numeric not null default 0,
  primary_source_score numeric not null default 0,
  historical_accuracy_score numeric,
  update_frequency numeric,
  expected_change_frequency numeric,
  crawl_priority numeric not null default 0,
  crawl_frequency text,
  last_checked_at timestamptz,
  last_changed_at timestamptz,
  access_method text not null default 'html',
  language text not null default 'en',
  legal_access boolean not null default true,
  robots_allowed boolean,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists intelligence_documents (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references intelligence_sources(id) on delete set null,
  url text,
  canonical_url text,
  title text not null,
  author text,
  published_at timestamptz,
  retrieved_at timestamptz not null default now(),
  content text not null,
  language text not null default 'en',
  document_type text,
  fingerprint text,
  semantic_fingerprint text,
  citations jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  embedding vector,
  created_at timestamptz not null default now(),
  unique(fingerprint)
);

create table if not exists intelligence_claims (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references intelligence_documents(id) on delete cascade,
  text text not null,
  subject text,
  predicate text,
  object text,
  claim_type text not null,
  verification_status text not null default 'unresolved',
  confidence_score numeric not null default 0,
  entities text[] not null default '{}',
  quantitative_values jsonb not null default '[]'::jsonb,
  embedding vector,
  created_at timestamptz not null default now()
);

create table if not exists claim_evidence (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid not null references intelligence_claims(id) on delete cascade,
  document_id uuid references intelligence_documents(id) on delete cascade,
  source_id uuid references intelligence_sources(id) on delete set null,
  stance text not null check (stance in ('supporting','contradictory','neutral','insufficient')),
  independence_score numeric not null default 0,
  evidence_quality_score numeric not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists intelligence_entities (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  canonical_name text not null,
  aliases text[] not null default '{}',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(entity_type, canonical_name)
);

create table if not exists intelligence_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  title text not null,
  description text,
  occurred_at timestamptz,
  discovered_at timestamptz not null default now(),
  entity_ids uuid[] not null default '{}',
  industries text[] not null default '{}',
  geographies text[] not null default '{}',
  claim_ids uuid[] not null default '{}',
  confidence numeric not null default 0,
  novelty numeric not null default 0,
  impact numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists intelligence_signals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  strength numeric not null default 0,
  velocity numeric not null default 0,
  novelty numeric not null default 0,
  strategic_impact numeric not null default 0,
  status text not null default 'weak',
  first_seen timestamptz,
  last_seen timestamptz,
  entities text[] not null default '{}',
  topics text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists signal_events (
  signal_id uuid not null references intelligence_signals(id) on delete cascade,
  event_id uuid not null references intelligence_events(id) on delete cascade,
  contribution_score numeric not null default 0,
  primary key(signal_id,event_id)
);

create table if not exists intelligence_trends (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  thesis text not null,
  maturity numeric not null default 0,
  momentum numeric not null default 0,
  acceleration numeric not null default 0,
  evidence_strength numeric not null default 0,
  attention numeric not null default 0,
  velocity numeric not null default 0,
  stage text not null default 'Weak Signal',
  supporting_evidence jsonb not null default '[]'::jsonb,
  counter_evidence jsonb not null default '[]'::jsonb,
  affected_industries text[] not null default '{}',
  affected_functions text[] not null default '{}',
  opportunities jsonb not null default '[]'::jsonb,
  risks jsonb not null default '[]'::jsonb,
  invalidation_criteria jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists trend_signals (
  trend_id uuid not null references intelligence_trends(id) on delete cascade,
  signal_id uuid not null references intelligence_signals(id) on delete cascade,
  contribution_score numeric not null default 0,
  primary key(trend_id,signal_id)
);

create table if not exists intelligence_variables (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  name text not null,
  symbol text,
  definition text not null,
  unit text not null,
  category text not null,
  min_value numeric,
  max_value numeric,
  baseline numeric,
  confidence numeric not null default 0,
  update_frequency text,
  source_ids uuid[] not null default '{}',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists variable_observations (
  id uuid primary key default gen_random_uuid(),
  variable_id uuid not null references intelligence_variables(id) on delete cascade,
  observed_at timestamptz not null,
  value numeric not null,
  provenance text not null,
  source_ids uuid[] not null default '{}',
  confidence numeric not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(variable_id, observed_at, provenance)
);

create table if not exists variable_relationships (
  id uuid primary key default gen_random_uuid(),
  source_variable_id uuid not null references intelligence_variables(id) on delete cascade,
  target_variable_id uuid not null references intelligence_variables(id) on delete cascade,
  relationship_type text not null,
  direction text not null,
  strength numeric,
  lag numeric,
  elasticity numeric,
  confidence numeric not null default 0,
  evidence_ids uuid[] not null default '{}',
  explanation text,
  created_at timestamptz not null default now()
);

create table if not exists scenarios (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  scenario_type text not null,
  assumptions jsonb not null default '{}'::jsonb,
  results jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists decision_insights (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  observation text not null,
  evidence_ids uuid[] not null default '{}',
  affected_functions text[] not null default '{}',
  affected_variables text[] not null default '{}',
  possible_actions jsonb not null default '[]'::jsonb,
  uncertainty jsonb not null default '[]'::jsonb,
  confidence numeric not null default 0,
  monitoring_triggers jsonb not null default '[]'::jsonb,
  change_my_mind jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists daily_runs (
  id text primary key,
  state text not null,
  prompt_version text,
  code_version text,
  model_name text,
  model_version text,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  stats jsonb not null default '{}'::jsonb,
  quality_report jsonb not null default '{}'::jsonb,
  failure_report jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists briefs (
  id uuid primary key default gen_random_uuid(),
  daily_run_id text references daily_runs(id) on delete set null,
  title text not null,
  slug text unique,
  content jsonb not null default '{}'::jsonb,
  status text not null default 'draft',
  confidence numeric,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  daily_run_id text references daily_runs(id) on delete set null,
  title text not null,
  slug text unique,
  deck text,
  content jsonb not null default '{}'::jsonb,
  methodology jsonb not null default '{}'::jsonb,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists social_posts (
  id uuid primary key default gen_random_uuid(),
  daily_run_id text references daily_runs(id) on delete set null,
  platform text not null,
  hook text,
  content text not null,
  evidence_ids uuid[] not null default '{}',
  quality_score numeric,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists citations (
  id uuid primary key default gen_random_uuid(),
  content_type text not null,
  content_id uuid not null,
  claim_id uuid references intelligence_claims(id) on delete set null,
  source_id uuid references intelligence_sources(id) on delete set null,
  article_section text,
  created_at timestamptz not null default now()
);

create table if not exists intelligence_audit_logs (
  id uuid primary key default gen_random_uuid(),
  daily_run_id text references daily_runs(id) on delete set null,
  event_type text not null,
  actor text not null default 'system',
  model_name text,
  model_version text,
  prompt_version text,
  code_version text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_documents_source_published on intelligence_documents(source_id,published_at desc);
create index if not exists idx_claims_document on intelligence_claims(document_id);
create index if not exists idx_events_discovered on intelligence_events(discovered_at desc);
create index if not exists idx_signals_last_seen on intelligence_signals(last_seen desc);
create index if not exists idx_trends_updated on intelligence_trends(updated_at desc);
create index if not exists idx_variable_observations on variable_observations(variable_id,observed_at desc);
create index if not exists idx_daily_runs_started on daily_runs(started_at desc);

alter table intelligence_sources enable row level security;
alter table intelligence_documents enable row level security;
alter table intelligence_claims enable row level security;
alter table claim_evidence enable row level security;
alter table intelligence_entities enable row level security;
alter table intelligence_events enable row level security;
alter table intelligence_signals enable row level security;
alter table signal_events enable row level security;
alter table intelligence_trends enable row level security;
alter table trend_signals enable row level security;
alter table intelligence_variables enable row level security;
alter table variable_observations enable row level security;
alter table variable_relationships enable row level security;
alter table scenarios enable row level security;
alter table decision_insights enable row level security;
alter table daily_runs enable row level security;
alter table briefs enable row level security;
alter table articles enable row level security;
alter table social_posts enable row level security;
alter table citations enable row level security;
alter table intelligence_audit_logs enable row level security;

drop policy if exists "Published briefs are readable" on briefs;
create policy "Published briefs are readable" on briefs for select using (status='published');

drop policy if exists "Published articles are readable" on articles;
create policy "Published articles are readable" on articles for select using (status='published');

drop policy if exists "Published social posts are readable" on social_posts;
create policy "Published social posts are readable" on social_posts for select using (status='published');

-- All internal write access remains server-side through the Supabase service role.
-- Do not expose SUPABASE_SERVICE_ROLE_KEY in VITE_* variables.
