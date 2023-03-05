import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { user } = await parent();

	if (!user) {
		throw redirect(300, '/auth');
	}

	return { user };
}) satisfies PageServerLoad;
