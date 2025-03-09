<script lang="ts">
    import '../app.css';
    import { invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import { Navbar } from '$lib/components/ui/navbar';
    import NavigationLinks from './NavigationLinks.svelte';
    import { SearchbarResults } from '$lib/components/searchbarResults';

    let { data, children } = $props();
    let { user, session, supabase } = $derived(data);

    onMount(() => {
        const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
            if (newSession?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth');
            }
        });

        return () => data.subscription.unsubscribe();
    });
</script>

<Navbar {user} />
<NavigationLinks />

<SearchbarResults/>

{@render children()}
