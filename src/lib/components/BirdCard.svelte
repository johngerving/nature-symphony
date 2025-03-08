<script lang="ts">
  export let imageUrl: string; 
  export let commonName: string;
  export let latinName: string;
</script>

<article class="card">
  <header>
    <h2>{commonName}</h2>
    <p>{latinName}</p>
  </header>

  <img 
    src={imageUrl} 
    alt={commonName}
  />
</article>

<style>
  .card {
    width: 300px;
    border-radius: 8px;
    overflow: hidden;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    /* Grid layout for fixed image size */
    display: grid;
    grid-template-rows: auto 350px;
  }

  header {
    padding: 1.5rem;
    background: white;
    z-index: 1;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    margin: 0.5rem 0 0 0;
    font-size: 1rem;
    font-style: italic;
    color: #666;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
</style> 