import { getObservations } from '$lib/server/inaturalist';
import type { PageServerLoad } from './$types';

const placeID = '1247';

export const load: PageServerLoad = async ({ url }) => {
	const page = url.searchParams.get('page');
	const q = url.searchParams.get('q');

	const iNaturalistSearchParams = new URLSearchParams();
	iNaturalistSearchParams.set('place_id', placeID);
	iNaturalistSearchParams.set('order', 'desc');
	iNaturalistSearchParams.set('order_by', 'created_at');

	if (q) iNaturalistSearchParams.set('q', q);

	if (page != null) {
		iNaturalistSearchParams.set('page', page);
	}

	// Only get birds
	iNaturalistSearchParams.set('iconic_taxa', 'Aves');

	const observations = getObservations(iNaturalistSearchParams);
	observations.catch(() => {});
	return {
		page,
		q,
		streamed: {
			observations: observations
		}
	};
};
