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
	let articlesError = null;

	try {
		// Get both specific and general search terms
		const specificName = observation.taxon?.preferredCommonName;
		const generalType = observation.taxon?.iconicTaxonName?.toLowerCase() || 'bird';
		
		console.log("Attempting searches with terms:", {
			specificName,
			generalType
		});

		// Try specific search first
		if (specificName) {
			console.log("Trying specific name search:", specificName);
			articles = await getArticlesByKeyword(specificName);
			console.log(`Results for '${specificName}':`, articles.length);
		}
		
		// If no specific results, try with general term
		if (articles.length === 0) {
			console.log("Trying general type search:", generalType);
			articles = await getArticlesByKeyword(generalType);
			console.log(`Results for '${generalType}':`, articles.length);
		}
		
		// If still no results, try with "bird" as fallback
		if (articles.length === 0 && generalType !== 'bird') {
			console.log("Trying fallback 'bird' search");
			articles = await getArticlesByKeyword('bird');
			console.log("Results for 'bird':", articles.length);
		}

		console.log("Final articles array:", articles);
	} catch (e) {
		console.error('Error fetching articles:', e);
		articlesError = 'Failed to fetch research articles';
	}

	return {
		observation,
		articles,
		articlesError
	};
};