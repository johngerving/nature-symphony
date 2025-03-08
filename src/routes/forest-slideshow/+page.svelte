<script lang="ts">
  import BirdCard from "$lib/components/BirdCard.svelte";
  import { fade } from 'svelte/transition';
  import type { PageData } from './$types';

  // Get the server-side loaded data
  let { data } = $props<{ data: PageData }>();
  
  // Minimal client-side state
  let currentSlideIndex = $state(data.initialIndex);
  let isImageLoaded = $state(false);
  let backgroundImageError = $state(false);
  let birdImageErrors = $state<Set<number>>(new Set());

  // Derived state
  let currentSlide = $derived(data.slides[currentSlideIndex]);

  function handleImageLoad() {
    backgroundImageError = false;
    setTimeout(() => {
      isImageLoaded = true;
    }, 50);
  }

  function handleImageError() {
    backgroundImageError = true;
    isImageLoaded = true; // Allow interaction even if background fails
  }

  function handleBirdImageError(index: number) {
    birdImageErrors = new Set([...birdImageErrors, index]);
  }

  function resetErrorStates() {
    backgroundImageError = false;
    birdImageErrors = new Set();
  }

  function handleSlideChange(direction: 'next' | 'prev') {
    isImageLoaded = false;
    resetErrorStates();
    currentSlideIndex = (
      direction === 'next'
        ? (currentSlideIndex + 1) % data.slides.length
        : (currentSlideIndex - 1 + data.slides.length) % data.slides.length
    );
  }
</script>

<svelte:head>
  {#each data.slides as slide}
    <link 
      rel="preload" 
      href={slide.imageUrl} 
      as="image" 
      fetchpriority={slide === currentSlide ? "high" : "low"} 
    />
    {#each slide.birds as bird}
      <link 
        rel="preload" 
        href={bird.imageUrl} 
        as="image" 
        fetchpriority="low" 
      />
    {/each}
  {/each}
</svelte:head>

<div class="container">
  <h1>Forest Slideshow</h1>
  
  <div class="slideshow-container">
    <div class="slideshow">
      <div class="slide" class:loading={!isImageLoaded} class:error={backgroundImageError}>
        {#if backgroundImageError}
          <div class="error-placeholder">
            <p>Failed to load forest scene</p>
            <p class="caption-error">{currentSlide.caption}</p>
          </div>
        {:else}
          <img 
            src={currentSlide.imageUrl} 
            alt={currentSlide.caption}
            loading="eager"
            fetchpriority="high"
            width={currentSlide.metadata?.background.width}
            height={currentSlide.metadata?.background.height}
            on:load={handleImageLoad}
            on:error={handleImageError}
          />
        {/if}
        
        {#if isImageLoaded}
          <div class="birds-container" transition:fade={{ duration: 300 }}>
            {#each currentSlide.birds as bird, i}
              <div 
                class="bird-position" 
                style="top: {bird.position?.top}; left: {bird.position?.left}"
              >
                <div class="bird-card-wrapper" class:error={birdImageErrors.has(i)}>
                  <BirdCard 
                    {...bird} 
                    imageWidth={currentSlide.metadata?.birds[i].width}
                    imageHeight={currentSlide.metadata?.birds[i].height}
                    onError={() => handleBirdImageError(i)}
                  />
                </div>
              </div>
            {/each}
          </div>
        {/if}
        
        <div class="caption" class:loading={!isImageLoaded}>
          {currentSlide.caption}
          {#if backgroundImageError}
            <span class="error-message">Image failed to load</span>
          {/if}
        </div>
      </div>
      
      <div class="navigation-controls">
        <button 
          class="nav-button prev" 
          on:click={() => handleSlideChange('prev')}
          aria-label="Previous forest scene"
          disabled={!isImageLoaded}
        >←</button>
        <span class="slide-counter" aria-live="polite">
          {currentSlideIndex + 1} of {data.slides.length}
          {#if backgroundImageError}
            <span class="error-badge">!</span>
          {/if}
        </span>
        <button 
          class="nav-button next" 
          on:click={() => handleSlideChange('next')}
          aria-label="Next forest scene"
          disabled={!isImageLoaded}
        >→</button>
      </div>
    </div>
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

  .slideshow-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .slideshow {
    position: relative;
    width: 100%;
    height: 600px;
    border-radius: 12px;
    overflow: hidden;
  }

  .slide {
    position: relative;
    width: 100%;
    height: 100%;
    transition: filter 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .slide.loading {
    filter: blur(5px);
  }

  .slideshow img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .slide.loading img {
    transform: scale(1.02);
  }

  .birds-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .bird-position {
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: auto;
  }

  .bird-card-wrapper {
    transform: scale(0.8);
    transition: transform 0.3s ease-in-out;
    width: var(--card-width, 250px);
    height: var(--card-height, 150px);
  }

  .bird-card-wrapper:hover {
    transform: scale(1);
    z-index: 10;
  }

  .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 1rem;
    text-align: center;
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .caption.loading {
    opacity: 0.7;
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    cursor: pointer;
    transition: opacity 0.3s;
    opacity: 0.7;
  }

  .nav-button:hover {
    opacity: 1;
  }

  .prev {
    left: 1rem;
  }

  .next {
    right: 1rem;
  }

  .nav-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .slide-counter {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 0.9rem;
  }

  .error-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.1);
    color: #666;
    text-align: center;
    padding: 2rem;
  }

  .caption-error {
    font-style: italic;
    margin-top: 1rem;
    opacity: 0.8;
  }

  .error-message {
    color: #ff6b6b;
    font-size: 0.9em;
    margin-left: 1rem;
  }

  .error-badge {
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background: #ff6b6b;
    color: white;
    border-radius: 50%;
    margin-left: 0.5rem;
    font-size: 0.8em;
  }

  .bird-card-wrapper.error {
    opacity: 0.7;
    filter: grayscale(1);
  }

  .slide.error {
    background: #f8f9fa;
  }
</style> 