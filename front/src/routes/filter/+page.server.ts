import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Article } from '$lib/models/article';

export const load = (async ({ locals }) => {
	const email = locals.email;

	if (!email) {
		throw redirect(300, '/auth');
	}

	const db = locals.db;

	const user = await db.collection('users').findOne({ email: email }, { projection: { _id: 0 } });

	const articles = await db.collection('articles').find({}).toArray();

	const articlesWithIdAsString = articles.map((article: Article) => ({
		...article,
		_id: article._id.toString()
	}));

	return { user, articles: articlesWithIdAsString };
}) satisfies PageServerLoad;
