-- Owner-only portfolio inquiry inbox
-- Public visitors may INSERT a new inquiry, but cannot SELECT, UPDATE, or DELETE.
-- Only the authenticated portfolio owner may read/manage submissions.

create extension if not exists pgcrypto;

create table if not exists portfolio_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  email text not null check (char_length(trim(email)) between 5 and 254),
  organization text check (organization is null or char_length(organization) <= 180),
  inquiry_type text not null check (char_length(inquiry_type) between 2 and 120),
  message text not null check (char_length(trim(message)) between 10 and 6000),
  status text not null default 'new' check (status in ('new','read','archived')),
  source_path text not null default '/contact' check (char_length(source_path) <= 240),
  read_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_portfolio_inquiries_status_created
  on portfolio_inquiries(status, created_at desc);

alter table portfolio_inquiries enable row level security;

revoke all on table portfolio_inquiries from anon;
revoke all on table portfolio_inquiries from authenticated;

grant insert on table portfolio_inquiries to anon;
grant insert, select, update, delete on table portfolio_inquiries to authenticated;

drop policy if exists "Public can submit portfolio inquiries" on portfolio_inquiries;
create policy "Public can submit portfolio inquiries"
on portfolio_inquiries
for insert
to anon, authenticated
with check (
  status = 'new'
  and read_at is null
  and archived_at is null
);

drop policy if exists "Owner can read portfolio inquiries" on portfolio_inquiries;
create policy "Owner can read portfolio inquiries"
on portfolio_inquiries
for select
to authenticated
using (
  lower(coalesce(auth.jwt() ->> 'email', '')) = 'manashdeori09@gmail.com'
);

drop policy if exists "Owner can update portfolio inquiries" on portfolio_inquiries;
create policy "Owner can update portfolio inquiries"
on portfolio_inquiries
for update
to authenticated
using (
  lower(coalesce(auth.jwt() ->> 'email', '')) = 'manashdeori09@gmail.com'
)
with check (
  lower(coalesce(auth.jwt() ->> 'email', '')) = 'manashdeori09@gmail.com'
);

drop policy if exists "Owner can delete portfolio inquiries" on portfolio_inquiries;
create policy "Owner can delete portfolio inquiries"
on portfolio_inquiries
for delete
to authenticated
using (
  lower(coalesce(auth.jwt() ->> 'email', '')) = 'manashdeori09@gmail.com'
);

-- Realtime powers the owner-only unread badge and live alert.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (
       select 1
       from pg_publication_tables
       where pubname = 'supabase_realtime'
         and schemaname = 'public'
         and tablename = 'portfolio_inquiries'
     ) then
    alter publication supabase_realtime add table portfolio_inquiries;
  end if;
end $$;
