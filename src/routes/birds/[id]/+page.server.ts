import { getArticlesByKeyword } from '$lib/server/digitalcommons';
import { getObservationById } from '$lib/server/inaturalist';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Observation } from '$lib/types/inaturalist';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;

	let observation: Observation;

	try {
		observation = await getObservationById(id);
	} catch (e) {
		console.log(e);
		error(404, {
			message: 'Not found'
		});
	}

	console.log(observation);

	const articles = await getArticlesByKeyword('Parus major');

	return {
		observation,
		articles
	};
};
