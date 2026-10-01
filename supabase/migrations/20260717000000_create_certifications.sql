begin;

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null,
  issue_date date,
  credential_id text,
  file_url text not null,
  file_type text not null check (file_type in ('pdf', 'image')),
  created_at timestamptz not null default now()
);

create index if not exists certifications_created_at_idx
  on public.certifications (created_at desc);

alter table public.certifications enable row level security;

-- Portfolio visitors can read metadata; only the server service role can write.
revoke all on table public.certifications from anon, authenticated;
grant usage on schema public to anon, authenticated, service_role;
grant select on table public.certifications to anon, authenticated;
grant all on table public.certifications to service_role;

drop policy if exists certifications_public_read on public.certifications;
create policy certifications_public_read
  on public.certifications
  for select
  to anon, authenticated
  using (true);

-- Make the new table available immediately through the REST API.
notify pgrst, 'reload schema';

commit;
