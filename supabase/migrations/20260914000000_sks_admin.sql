-- SKS Studio admin: staff (superadmin / staff), clients (from the wizard + contact form)
-- and advertised projects. Apply to the sksstudiodb Supabase project.
--
-- Access model
--   * Visitors (anon) can INSERT an enquiry but never read, edit or delete one.
--   * Visitors can read PUBLISHED projects only.
--   * Staff (active row in public.staff + confirmed login) manage clients and projects.
--   * Superadmins can also add, edit and remove staff. At least one active superadmin
--     must always exist (enforced by trigger).
--   * No passwords live here — each person's login is created in Supabase Auth.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ─── Staff ─────────────────────────────────────────────────────
create table public.staff (
  email       text primary key check (email = lower(email) and char_length(email) between 3 and 320),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 200),
  title       text check (char_length(title) <= 120),
  phone       text check (char_length(phone) <= 50),
  role        text not null default 'staff' check (role in ('superadmin', 'staff')),
  active      boolean not null default true
);

create trigger staff_set_updated_at
  before update on public.staff
  for each row execute function public.set_updated_at();

insert into public.staff (email, name, title, role)
values ('sir.karabom@gmail.com', 'Karabo N', 'Founder', 'superadmin');

-- The signed-in user's role ('superadmin' | 'staff'), or null for everyone else.
create or replace function public.staff_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select s.role
  from public.staff s
  join auth.users u on lower(u.email) = s.email
  where u.id = auth.uid()
    and u.email_confirmed_at is not null
    and s.active
  limit 1;
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.staff_role() is not null;
$$;

create or replace function public.is_superadmin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.staff_role() = 'superadmin', false);
$$;

revoke all on function public.staff_role() from public;
revoke all on function public.is_staff() from public;
revoke all on function public.is_superadmin() from public;
grant execute on function public.staff_role() to anon, authenticated;
grant execute on function public.is_staff() to anon, authenticated;
grant execute on function public.is_superadmin() to anon, authenticated;

-- Never let the last active superadmin be removed, demoted or deactivated.
create or replace function public.keep_a_superadmin()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if old.role = 'superadmin' and old.active
     and (tg_op = 'DELETE' or new.role <> 'superadmin' or not new.active)
     and not exists (
       select 1 from public.staff
       where role = 'superadmin' and active and email <> old.email
     )
  then
    raise exception 'At least one active superadmin is required.';
  end if;
  return coalesce(new, old);
end;
$$;

create trigger staff_keep_a_superadmin
  before update or delete on public.staff
  for each row execute function public.keep_a_superadmin();

alter table public.staff enable row level security;

create policy "Staff can see the team"
  on public.staff for select
  to authenticated
  using ((select public.is_staff()));

create policy "Superadmins can add staff"
  on public.staff for insert
  to authenticated
  with check ((select public.is_superadmin()));

create policy "Superadmins can update staff"
  on public.staff for update
  to authenticated
  using ((select public.is_superadmin()))
  with check ((select public.is_superadmin()));

create policy "Superadmins can remove staff"
  on public.staff for delete
  to authenticated
  using ((select public.is_superadmin()));

-- ─── Clients ───────────────────────────────────────────────────
create table public.clients (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  name            text not null check (char_length(name) between 1 and 200),
  email           text not null check (char_length(email) between 3 and 320),
  phone           text check (char_length(phone) <= 50),
  company         text check (char_length(company) <= 200),
  subject         text check (char_length(subject) <= 120),
  contact_method  text check (char_length(contact_method) <= 40),
  product         text check (char_length(product) <= 200),
  stage           text check (char_length(stage) <= 100),
  industry        text check (char_length(industry) <= 100),
  team_size       text check (char_length(team_size) <= 40),
  budget          text check (char_length(budget) <= 60),
  timeline        text check (char_length(timeline) <= 60),
  services        text[] not null default '{}' check (cardinality(services) <= 20),
  features        text[] not null default '{}' check (cardinality(features) <= 30),
  goals           text[] not null default '{}' check (cardinality(goals) <= 20),
  message         text check (char_length(message) <= 5000),
  source          text not null default 'admin' check (source in ('wizard', 'contact', 'admin')),
  status          text not null default 'new'
                  check (status in ('new', 'contacted', 'proposal', 'active', 'completed', 'lost')),
  value           numeric(12, 2) check (value >= 0),
  notes           text
);

create index clients_created_at_idx on public.clients (created_at desc);
create index clients_status_idx on public.clients (status);

create trigger clients_set_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

alter table public.clients enable row level security;

-- Public forms may only create a fresh lead; they can't set internal fields.
create policy "Visitors can submit enquiries"
  on public.clients for insert
  to anon, authenticated
  with check (
    source in ('wizard', 'contact')
    and status = 'new'
    and notes is null
    and value is null
  );

create policy "Staff can read clients"
  on public.clients for select
  to authenticated
  using ((select public.is_staff()));

create policy "Staff can add clients"
  on public.clients for insert
  to authenticated
  with check ((select public.is_staff()));

create policy "Staff can update clients"
  on public.clients for update
  to authenticated
  using ((select public.is_staff()))
  with check ((select public.is_staff()));

create policy "Staff can delete clients"
  on public.clients for delete
  to authenticated
  using ((select public.is_staff()));

-- ─── Projects (posts / adverts) ────────────────────────────────
create table public.projects (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  title       text not null check (char_length(title) between 1 and 200),
  slug        text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  category    text check (char_length(category) <= 100),
  summary     text check (char_length(summary) <= 280),
  body        text check (char_length(body) <= 20000),
  image_url   text check (char_length(image_url) <= 2000),
  cta_label   text check (char_length(cta_label) <= 60),
  published   boolean not null default false,
  featured    boolean not null default false,
  sort_order  integer not null default 0
);

create index projects_listing_idx on public.projects (published, featured desc, sort_order, created_at desc);

create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

alter table public.projects enable row level security;

create policy "Anyone can read published projects"
  on public.projects for select
  to anon, authenticated
  using (published or (select public.is_staff()));

create policy "Staff can add projects"
  on public.projects for insert
  to authenticated
  with check ((select public.is_staff()));

create policy "Staff can update projects"
  on public.projects for update
  to authenticated
  using ((select public.is_staff()))
  with check ((select public.is_staff()));

create policy "Staff can delete projects"
  on public.projects for delete
  to authenticated
  using ((select public.is_staff()));

-- ─── Project images ────────────────────────────────────────────
-- Public bucket: images are served by URL, so no SELECT policy (that would allow listing).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('project-images', 'project-images', true, 5242880,
        array['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

create policy "Staff can upload project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images' and (select public.is_staff()));

create policy "Staff can replace project images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-images' and (select public.is_staff()))
  with check (bucket_id = 'project-images' and (select public.is_staff()));

create policy "Staff can delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images' and (select public.is_staff()));
