import { DIGITALCOMMONS_API_KEY } from '$env/static/private';
import type { Article } from '$lib/types/article';
import sanitize from 'sanitize-html';

export const getArticlesByKeyword = async (keyword: string) => {
	const params = new URLSearchParams();
	params.append('select_fields', 'all');
	params.append('q', keyword);

	const res = await fetch(
		`https://content-out.bepress.com/v2/digitalcommons.humboldt.edu/query?${params}`,
		{
			headers: {
				Authorization: DIGITALCOMMONS_API_KEY
			}
		}
	);
	if (!res.ok) {
		throw new Error(`Response status: ${res.status}`);
	}

	const json = await res.json();

	const articles: Article[] = json['results'].map((result) => {
		let cleanAbstract = null;
		if (result['abstract']) cleanAbstract = sanitize(result['abstract']);

		return {
			title: result['title'],
			url: result['fulltext_url'],
			abstract: cleanAbstract
		};
	});

	return articles;
};
