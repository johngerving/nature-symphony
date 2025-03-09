import { getArticlesByKeyword } from '$lib/server/digitalcommons';
import { getObservationById } from '$lib/server/inaturalist';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Observation } from '$lib/types/inaturalist';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;
	let observation: Observation | null = null;

	try {
		observation = await getObservationById(id);
		if (!observation) {
			throw error(404, 'Observation not found');
		}
	} catch (e) {
		console.error('Error fetching observation:', e);
		throw error(500, 'Failed to fetch observation');
	}

	console.log("Server: Fetching observation for ID:", params.id);
	console.log("Server: Observation Data:", observation);

	let articles = [];

	try {
		articles = await getArticlesByKeyword('Parus major');
	} catch (e) {
		console.error('Error fetching articles:', e);
		// This won't throw a 500 because we don't want the whole page to fail if articles fail.
	}

	return {
		observation,
		articles
	};
};