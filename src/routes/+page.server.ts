import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getObservations } from '$lib/server/inaturalist';
import type { Observation } from '$lib/types/inaturalist';

const HUMBOLDT_PLACE_ID = '1247';
const BACKGROUND_IMAGES = [
  '/redwoods1.jpg',
  '/redwoods2.jpg'
];

const BIRDS_PER_SLIDE = 4;

// Define natural positions for birds in the forest scene
// Using percentages to make it responsive
const BIRD_POSITIONS = [
  // Top left branch area
  { top: '25%', left: '20%' },
  // Upper right perch
  { top: '30%', left: '75%' },
  // Middle left trunk
  { top: '45%', left: '35%' },
  // Lower right branch
  { top: '60%', left: '80%' }
];

interface Bird {
  position: {
    top: string;
    left: string;
  };
  observation: Observation;
}

interface ForestSlide {
  imageUrl: string;
  caption: string;
  birds: Bird[];
}

export const load: PageServerLoad = async ({ setHeaders }) => {
  try {
    // Properly construct URLSearchParams for iNaturalist API
    const searchParams = new URLSearchParams();
    searchParams.set('place_id', HUMBOLDT_PLACE_ID);
    searchParams.set('quality_grade', 'research');
    searchParams.set('order', 'desc');
    searchParams.set('order_by', 'created_at');
    searchParams.set('iconic_taxa', 'Aves');
    searchParams.set('per_page', '30');

    const observationsQuery = await getObservations(searchParams);
    
    // Filter for observations with photos and attempt unique species when possible
    const uniqueSpecies = new Map();
    const qualityObservations = observationsQuery.observations.filter(obs => {
      if (!obs.photos?.length) return false;
      
      // Soft unique species filter - only apply if we have enough observations
      if (uniqueSpecies.has(obs.taxon?.preferredCommonName)) {
        return observationsQuery.observations.length < BIRDS_PER_SLIDE * BACKGROUND_IMAGES.length;
      }
      
      if (obs.taxon?.preferredCommonName) {
        uniqueSpecies.set(obs.taxon.preferredCommonName, true);
      }
      return true;
    });

    // Create slides with positioned birds
    const slides: ForestSlide[] = BACKGROUND_IMAGES.map((imageUrl, index) => {
      const startIdx = index * BIRDS_PER_SLIDE;
      const slideObservations = qualityObservations.slice(startIdx, startIdx + BIRDS_PER_SLIDE);
      
      const birds = slideObservations.map((obs, birdIndex) => ({
        position: BIRD_POSITIONS[birdIndex],
        observation: obs
      }));

      return {
        imageUrl,
        caption: `Humboldt County Redwoods - Scene ${index + 1}`,
        birds
      };
    });

    // Set caching headers
    setHeaders({
      'Cache-Control': 'max-age=3600, stale-while-revalidate=86400'
    });

    return {
      slides,
      initialIndex: 0
    };
  } catch (e) {
    console.error('Failed to load slideshow data:', e);
    throw error(500, 'Failed to load slideshow data');
  }
}; 