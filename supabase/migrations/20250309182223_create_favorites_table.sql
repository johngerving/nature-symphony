-- 1. Create table
create table favorites (
    id bigint not null,
    user_id uuid references auth.users,
    created_at timestamp with time zone not null default now(),
    primary key (id, user_id)
);

alter table favorites enable row level security;

revoke all on table favorites from authenticated;
revoke all on table favorites from anon;

grant all (id) on table favorites to authenticated;
grant select (id,created_at) on table favorites to authenticated;
grant delete on table favorites to authenticated;

create policy "Users can access and modify their own favorites"
on favorites 
for all
to authenticated
using ((select auth.uid()) = user_id);