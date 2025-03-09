import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

interface Bird {
  imageUrl: string;
  commonName: string;
  latinName: string;
  position: {
    top: string;
    left: string;
  };
}

interface ForestSlide {
  imageUrl: string;
  caption: string;
  birds: Bird[];
}

function assignInitialPositions(birds: Omit<Bird, 'position'>[]): Bird[] {
  // Simple grid layout with 2 columns
  return birds.map((bird, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    
    return {
      ...bird,
      position: {
        left: `${25 + column * 50}%`,
        top: `${25 + row * 30}%`
      }
    };
  });
}

export const load: PageServerLoad = async ({ setHeaders }) => {
  const baseSlides = [
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
    const slides = baseSlides.map(slide => ({
      ...slide,
      birds: assignInitialPositions(slide.birds)
    }));

    // Set caching headers for performance
    setHeaders({
      'Cache-Control': 'max-age=3600, stale-while-revalidate=86400'
    });

    return {
      slides,
      initialIndex: 0
    };
  } catch (e) {
    throw error(500, 'Failed to load slideshow data');
  }
}; 