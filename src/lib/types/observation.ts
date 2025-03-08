export interface Observation {
	id: number | null;
	createdAt: string | null;
	geoJSON: object | null;
	photos: Photo[] | null;
	sounds: Sound[] | null;
	taxon: Taxon | null;
}

export interface Photo {
	url: string;
}

export interface Sound {
	url: string;
}

export interface Taxon {
	id: number;
	iconicTaxonName: string;
	preferredCommonName: string;
}
