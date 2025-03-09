import { getObservations } from '$lib/server/inaturalist';
import type { LayoutServerLoad } from './$types';

const placeID = '1247';

export const load: LayoutServerLoad = async ({ url }) => {
	const page = url.searchParams.get('page');

	const iNaturalistSearchParams = new URLSearchParams();
	iNaturalistSearchParams.set('place_id', placeID);
	iNaturalistSearchParams.set('order', 'desc');
	iNaturalistSearchParams.set('order_by', 'created_at');

	if (page != null) {
		iNaturalistSearchParams.set('page', page);
	}

	// Only get birds
	iNaturalistSearchParams.set('iconic_taxa', 'Aves');

	const observationsPromise = getObservations(iNaturalistSearchParams);
	return {
		page,
		observationsPromise
	};
};
