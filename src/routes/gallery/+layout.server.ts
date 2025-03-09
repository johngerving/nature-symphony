import { getObservations } from '$lib/server/inaturalist';
import type { Favorite } from '$lib/types/database';
import type { LayoutServerLoad } from './$types';

const placeID = '1247';

export const load: LayoutServerLoad = async ({ url, locals: { supabase } }) => {
	const page = url.searchParams.get('page');

	const { data: favorites } = (await supabase
		.from('favorites')
		.select('id')
		.order('created_at')) as {
		data: Favorite[];
	};

	const iNaturalistSearchParams = new URLSearchParams();
	iNaturalistSearchParams.set('place_id', placeID);
	iNaturalistSearchParams.set('order', 'desc');
	iNaturalistSearchParams.set('order_by', 'created_at');

	if (page != null) {
		iNaturalistSearchParams.set('page', page);
	}

	// Only get birds
	iNaturalistSearchParams.set('iconic_taxa', 'Aves');

	const observations = getObservations(iNaturalistSearchParams);
	observations.catch(() => {});
	return {
		page,
		favorites: favorites ?? [],
		streamed: {
			observations: observations
		}
	};
};
