<script lang="ts">
    import '../app.css';
    import { invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import { Navbar } from '$lib/components/ui/navbar';
    import NavigationLinks from './NavigationLinks.svelte';

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

<header>
    <div class="search-bar">
      <input id="search" type="search" placeholder="&#x1F50D; Start typing to search..." />
    </div>
</header>

<main class="container">
    <div class="search-display"></div>
    <div class="posts-container"></div>
</main>

<style>
    .search-bar {
        display: flex;
        justify-content: center;
        padding: 60px;
    }

    .search-bar input {
        width: 50%;
        min-width: 300px;
        padding: 12px 24px;
        border-radius: 24px;
        font-size: 16px;
        border: 0px;
        outline: none;
    }

    .search-bar [list]::-webkit-list-button,
    .search-bar [list]::-webkit-calendar-picker-indicator {
        display: none !important;
    }
</style>

{@render children()}
