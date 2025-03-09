drop policy "Users can access and modify their own favorites" on "public"."favorites";

create policy "Only allow users to add their own favorites"
on "public"."favorites"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Only allow users to delete their own favorites"
on "public"."favorites"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Only allow users to view their own favorites"
on "public"."favorites"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



