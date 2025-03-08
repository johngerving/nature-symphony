<script lang="ts">
  import BirdCardScratch from "$lib/components/BirdCardScratch.svelte";

  const birds = [
    {
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Male_northern_cardinal_in_Central_Park_%2852612%29.jpg/800px-Male_northern_cardinal_in_Central_Park_%2852612%29.jpg",
      commonName: "Northern Cardinal",
      latinName: "Cardinalis cardinalis"
    },
    {
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Peacock_Plumage.jpg",
      commonName: "Indian Peafowl",
      latinName: "Pavo cristatus"
    }
  ];
</script>

<div class="container">
  <h1>Beautiful Birds</h1>
  
  <div class="card-grid">
    {#each birds as bird}
      <BirdCardScratch {...bird} />
    {/each}
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  h1 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 300px);
    gap: 1.5rem;
    justify-content: center;
  }
</style> 