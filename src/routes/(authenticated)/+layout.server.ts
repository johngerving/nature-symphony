import { getObservations } from '$lib/server/inaturalist';
import type { LayoutServerLoad } from './$types';

const placeID = '1247';

export const load: LayoutServerLoad = async () => {
	await getObservations(`?place_id=${placeID}&order=desc&order_by=created_at`);
	return {};
};
