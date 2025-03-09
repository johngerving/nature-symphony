<script lang="ts">
  import BirdOverlay from "./BirdOverlay.svelte";
  import type { ForestSlideshowProps } from '$lib/types/forest';

  let { 
    slides,
    birdCardWidth = '200px',
    birdCardImageHeight = '220px'
  } = $props();
  let currentIndex = $state(0);

  // Derive current slide data
  let currentSlide = $derived(slides[currentIndex]);

  function changeSlide(direction: 'next' | 'prev') {
    currentIndex = direction === 'next' 
      ? (currentIndex + 1) % slides.length
      : (currentIndex - 1 + slides.length) % slides.length;
    
    // Preload next image after changing slides
    const nextIndex = (currentIndex + 1) % slides.length;
    const img = new Image();
    img.src = slides[nextIndex].imageUrl;
  }
</script>

<div class="slideshow-container">
  <div class="relative h-full">
    <img 
      src={currentSlide.imageUrl} 
      alt={currentSlide.caption}
      loading="eager"
      class="w-full h-full object-cover"
    />
    
    <BirdOverlay 
      birds={currentSlide.birds}
      cardWidth={birdCardWidth}
      cardImageHeight={birdCardImageHeight}
    />
    
    <div class="image-caption">
      {currentSlide.caption}
    </div>
  </div>
  
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 items-center">
    <button 
      class="nav-button"
      onclick={() => changeSlide('prev')}
    >←</button>
    
    <span class="slide-counter">
      {currentIndex + 1} / {slides.length}
    </span>
    
    <button 
      class="nav-button"
      onclick={() => changeSlide('next')}
    >→</button>
  </div>
</div> 