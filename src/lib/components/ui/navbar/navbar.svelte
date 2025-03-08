<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Avatar from "$lib/components/ui/avatar/index.js";

    // Getting user signed-in status
    let { user } = $props();
    $effect(() => {
        console.log(user);
    })
</script>

<nav class="flex justify-between items-center p-4 bg-primary-foreground text-primary-background">
    <div>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </div>
    <div class="flex items-center space-x-4">
        {#if user}
            <Button href="/auth/logout">Logout</Button>
            <Avatar.Root>
                <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
                <Avatar.Fallback>CN</Avatar.Fallback>
            </Avatar.Root>
        {:else}
            <Button href="/auth/login">Login</Button>
            <Button href="/auth/signup">Signup</Button>
        {/if}
    </div>
</nav>