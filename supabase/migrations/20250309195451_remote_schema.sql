drop policy "Only allow users to add their own favorites" on "public"."favorites";

drop policy "Only allow users to delete their own favorites" on "public"."favorites";

drop policy "Only allow users to view their own favorites" on "public"."favorites";

create policy "Only allow users to add their own favorites"
on "public"."favorites"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Only allow users to delete their own favorites"
on "public"."favorites"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Only allow users to view their own favorites"
on "public"."favorites"
as permissive
for select
to public
using ((( SELECT auth.uid() AS uid) = user_id));



