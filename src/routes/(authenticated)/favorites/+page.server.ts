import type { Favorite } from '$lib/types/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: favorites } = (await supabase
		.from('favorites')
		.select('id')
		.order('created_at')) as {
		data: Favorite[];
	};

	console.log(favorites);
	return {
		favorites: favorites ?? []
	};
};
