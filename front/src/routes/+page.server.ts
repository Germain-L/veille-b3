import type { Article } from '$lib/models/article';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const db = locals.db;

	// get articles not saved
	const articles = (await db.collection('articles').find({ saved: true }).toArray()) as Article[];
	
	const articlesWithIdAsString = articles.map((article: Article) => ({
		...article,
		_id: article._id.toString()
	}));

	return { articles: articlesWithIdAsString };
}) satisfies PageServerLoad;
