import { getObservations } from '$lib/server/inaturalist';
import type { LayoutServerLoad } from './$types';

const placeID = '1247';

export const load: LayoutServerLoad = async ({ url }) => {
	const page = url.searchParams.get('page');

	let iNaturalistQueryString = `?place_id=${placeID}&order=desc&order_by=created_at`;
	if (page != null) {
		iNaturalistQueryString += `&page=${page}`;
	}

	// Only get birds
	iNaturalistQueryString += `&iconic_taxa=Aves`;

	const observationsPromise = getObservations(iNaturalistQueryString);
	return {
		observationsPromise
	};
};
