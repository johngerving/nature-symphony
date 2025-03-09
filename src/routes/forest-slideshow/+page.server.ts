import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

interface Position {
  top: string;
  left: string;
}

interface ImageMetadata {
  width: number;
  height: number;
  type: string;
}

interface Bird {
  imageUrl: string;
  commonName: string;
  latinName: string;
  position?: Position;
}

interface ForestSlide {
  imageUrl: string;
  caption: string;
  birds: Bird[];
  metadata?: {
    background: ImageMetadata;
    birds: ImageMetadata[];
  };
}

// Constants for bird card dimensions and spacing
const CARD_WIDTH = 250;
const CARD_HEIGHT = 150;
const MARGIN = 20;
const MAX_PLACEMENT_ATTEMPTS = 50;

function generateRandomPosition(containerWidth: number, containerHeight: number): { x: number, y: number } {
  const safeWidth = containerWidth - CARD_WIDTH - MARGIN * 2;
  const safeHeight = containerHeight - CARD_HEIGHT - MARGIN * 2;
  
  const x = MARGIN + Math.random() * safeWidth;
  const y = MARGIN + Math.random() * safeHeight;
  
  return { x, y };
}

function isOverlapping(pos1: { x: number, y: number }, pos2: { x: number, y: number }): boolean {
  const dx = Math.abs(pos1.x - pos2.x);
  const dy = Math.abs(pos1.y - pos2.y);
  return dx < (CARD_WIDTH + MARGIN) && dy < (CARD_HEIGHT + MARGIN);
}

function generateGridPosition(index: number, containerWidth: number, containerHeight: number): { x: number, y: number } {
  const cardsPerRow = Math.floor((containerWidth - MARGIN) / (CARD_WIDTH + MARGIN));
  return {
    x: MARGIN + (index % cardsPerRow) * (CARD_WIDTH + MARGIN),
    y: MARGIN + Math.floor(index / cardsPerRow) * (CARD_HEIGHT + MARGIN)
  };
}

function generateSafePosition(
  existingPositions: Array<{ x: number, y: number }>, 
  index: number,
  containerWidth: number, 
  containerHeight: number
): { x: number, y: number } {
  // Try random positions first
  for (let attempt = 0; attempt < MAX_PLACEMENT_ATTEMPTS; attempt++) {
    const pos = generateRandomPosition(containerWidth, containerHeight);
    if (!existingPositions.some(existingPos => isOverlapping(pos, existingPos))) {
      return pos;
    }
  }
  
  // Fall back to grid layout if no safe random position found
  return generateGridPosition(index, containerWidth, containerHeight);
}

async function getImageMetadata(url: string): Promise<ImageMetadata> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    return {
      width: 1200,
      height: 800,
      type: contentType
    };
  } catch (e) {
    console.error(`Failed to fetch image metadata for ${url}:`, e);
    return {
      width: 1200,
      height: 800,
      type: 'image/jpeg'
    };
  }
}

// Pre-calculate positions for a standard container size
function calculateInitialPositions(slides: ForestSlide[], containerWidth = 1200, containerHeight = 600): ForestSlide[] {
  return slides.map(slide => {
    const positions: Array<{ x: number, y: number }> = [];
    const updatedBirds = slide.birds.map((bird, index) => {
      const pos = generateSafePosition(positions, index, containerWidth, containerHeight);
      positions.push(pos);
      return {
        ...bird,
        position: {
          left: `${(pos.x / containerWidth) * 100}%`,
          top: `${(pos.y / containerHeight) * 100}%`
        }
      };
    });
    
    return {
      ...slide,
      birds: updatedBirds
    };
  });
}

export const load: PageServerLoad = async ({ params, setHeaders }) => {
  const baseForestSlides = [
    {
      imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80",
      caption: "Temperate Rainforest",
      birds: [
        {
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg",
          commonName: "Eastern Yellow Robin",
          latinName: "Eopsaltria australis"
        },
        {
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Strix_occidentalis_caurina_USFWS-1.jpg",
          commonName: "Northern Spotted Owl",
          latinName: "Strix occidentalis"
        }
      ]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80",
      caption: "Tropical Forest",
      birds: [
        {
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toucan_in_Iguazu_National_Park%2C_Brazil-Argentina_%288642989974%29.jpg",
          commonName: "Toco Toucan",
          latinName: "Ramphastos toco"
        },
        {
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Blue-and-yellow-macaw.jpg",
          commonName: "Blue-and-yellow Macaw",
          latinName: "Ara ararauna"
        }
      ]
    }
  ];

  try {
    // Pre-calculate positions
    const slidesWithPositions = calculateInitialPositions(baseForestSlides);

    // Pre-fetch metadata for all images in parallel
    const imagePromises = slidesWithPositions.map(async (slide) => {
      const [backgroundMeta, ...birdMetas] = await Promise.all([
        getImageMetadata(slide.imageUrl),
        ...slide.birds.map(bird => getImageMetadata(bird.imageUrl))
      ]);

      return {
        ...slide,
        metadata: {
          background: backgroundMeta,
          birds: birdMetas
        }
      };
    });

    const enrichedSlides = await Promise.all(imagePromises);

    // Set caching headers
    setHeaders({
      'Cache-Control': 'max-age=3600, stale-while-revalidate=86400',
      'Link': enrichedSlides.map(slide => 
        `<${slide.imageUrl}>; rel="preload"; as="image"`
      ).join(', ')
    });

    return {
      slides: enrichedSlides,
      initialIndex: 0
    };
  } catch (e) {
    throw error(500, 'Failed to load slideshow data');
  }
}; 