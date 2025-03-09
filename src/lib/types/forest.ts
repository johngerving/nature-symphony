export interface Bird {
  id: string;
  imageUrl: string;
  position: { top: string; left: string };
  name: string;
  description: string;
}

export interface Slide {
  imageUrl: string;
  caption: string;
  birds: Bird[];
}

export interface ForestSlideshowProps {
  slides: Slide[];
  title?: string;
} 