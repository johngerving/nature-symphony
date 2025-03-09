<script lang="ts">
    import type { Article } from '$lib/types/article';
    import * as Card from '$lib/components/ui/card';

    export let articles: Article[] = [];
    export let isLoading = false;
    export let error: string | null = null;
</script>

<div class="articles-container">
    <h1>Research Articles</h1>
    
    {#if isLoading}
        <p>Loading articles...</p>
    {:else if error}
        <p class="error">{error}</p>
    {:else if articles.length === 0}
        <p>No research articles found.</p>
    {:else}
        <div class="articles-list-container">
            <div class="articles-list">
                {#each articles as article}
                    <article class="article-card">
                        <h3>{article.title}</h3>
                        {#if article.abstract}
                            <p class="abstract">{@html article.abstract}</p>
                        {/if}
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                    </article>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .articles-container {
        width: 100%;
    }

    .articles-list-container {
        max-height: 70vh;
        overflow-y: auto;
        margin-top: 1rem;
        padding-right: 1rem; /* Add space for scrollbar */
        
        /* Add smooth scrolling */
        scroll-behavior: smooth;
        
        /* Style the scrollbar */
        scrollbar-width: thin;
        scrollbar-color: var(--primary-color, #dae4ee) transparent;
    }

    /* Webkit scrollbar styles */
    .articles-list-container::-webkit-scrollbar {
        width: 8px;
    }

    .articles-list-container::-webkit-scrollbar-track {
        background: transparent;
    }

    .articles-list-container::-webkit-scrollbar-thumb {
        background-color: var(--primary-color, #0066cc);
        border-radius: 4px;
    }

    .articles-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .article-card {
        padding: 1rem;
        border: 1px solid var(--border-color, #eee);
        border-radius: var(--radius);
        background: white;
    }

    .article-card h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
    }

    .abstract {
        font-size: 0.9rem;
        color: #666;
        margin: 0.5rem 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .error {
        color: red;
    }

    a {
        color: var(--primary-color, #0066cc);
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style> 