import type { Favorite } from '$lib/types/database';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: favoriteIDs } = (await supabase
		.from('favorites')
		.select('id')
		.order('created_at')) as {
		data: Favorite[];
	};

	const favorites = await Promise.all(
		favoriteIDs.map(async (e) => {
			return await getObservationById(e.id.toString());
		})
	);

	return {
		favorites: favorites ?? []
	};
};

import type { Actions } from './$types';
import { getObservationById } from '$lib/server/inaturalist';

export const actions: Actions = {
	favorite: async (event) => {
		console.log('favorite');
		const data = await event.request.formData();

		const favoriteID = (data.get('favorite') ?? 0) as number;
		const { supabase } = event.locals;

		const { error } = await supabase
			.from('favorites')
			.insert({ id: favoriteID, user_id: event.locals.user.id });
		if (error) {
			console.error(error);
			return fail(500, {});
		}
	},
	unfavorite: async (event) => {
		const data = await event.request.formData();

		const favoriteID = (data.get('favorite') ?? 0) as number;
		const { supabase } = event.locals;

		const { error } = await supabase.from('favorites').delete().eq('id', favoriteID);
		if (error) {
			console.error(error);
			return fail(500, {});
		}
	}
};
