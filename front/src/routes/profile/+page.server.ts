import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const userEmail = locals.user;

	if (!userEmail) {
		throw redirect(300, '/');
	}

	const db = locals.db;

    const user = await db.collection('users').findOne({ email: userEmail }, { projection: { _id: 0 } });

	return { user };
}) satisfies PageServerLoad;
