import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const email = locals.email;

	if (!email) {
		throw redirect(300, '/auth');
	}

	const db = locals.db;

	const user = await db.collection('users').findOne({ email: email }, { projection: { _id: 0 } });

	return { user };
}) satisfies PageServerLoad;
