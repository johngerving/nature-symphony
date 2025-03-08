import type { Observation, Photo, Sound, Taxon } from '$lib/types/observation';

export const getObservations = async (queryString: string) => {
	const res = await fetch(`https://api.inaturalist.org/v1/observations${queryString}`);
	if (!res.ok) {
		throw new Error(`Response status: ${res.status}`);
	}

	const json = await res.json();

	const observations: Observation[] = json['results'].map((result) => {
		const photos: Photo[] = result['photos'].map((photo) => {
			return {
				url: photo['url']
			};
		});
		const sounds: Sound[] = result['sounds'].map((sound: Sound) => {
			return {
				url: sound['url']
			};
		});

		let taxon: Taxon = null;

		if (result['taxon']) {
			taxon = {
				id: result['taxon']['id'],
				iconicTaxonName: result['taxon']['iconic_taxon_name'],
				preferredCommonName: result['taxon']['preferred_common_name']
			};
		}

		return {
			id: result['id'],
			createdAt: result['created_at'],
			geoJSON: result['geojson'],
			photos: photos,
			sounds: sounds,
			taxon: taxon
		};
	});

	return observations;
};
