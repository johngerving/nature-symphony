import { getObservations } from '$lib/server/inaturalist';
import type { LayoutServerLoad } from './$types';

const placeID = '1247';

export const load: LayoutServerLoad = async ({ url }) => {
	const page = url.searchParams.get('page');
	// console.log(page);
	let iNaturalistQueryString = `?place_id=${placeID}&order=desc&order_by=created_at`;
	if (page != null) {
		iNaturalistQueryString += `&page=${page}`;
	}

	const observations = await getObservations(iNaturalistQueryString);
	return {
		observations
	};
};
