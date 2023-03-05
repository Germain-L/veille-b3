import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import type { Article } from '$lib/models/article';
import { ObjectId } from 'mongodb';

export const load = (async ({ locals, parent }) => {
	const { user } = await parent();

	if (!user) {
		throw redirect(300, '/auth');
	}
	const db = locals.db;

	// get articles not saved
	const articles = (await db.collection('articles').find({ saved: false }).toArray()) as Article[];

	const articlesWithIdAsString = articles.map((article: Article) => ({
		...article,
		_id: article._id.toString()
	}));

	return { articles: articlesWithIdAsString };
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ request, locals }) => {
		console.log('save');

		const data = await request.formData();
		const articleId = data.get('articleId') as string;

		console.log('articleId', articleId);

		const user = locals.user;

		const db = locals.db;

		// update article saved to true and add user to savedBy
		await db
			.collection('articles')
			.updateOne(
				{ _id: new ObjectId(articleId) },
				{ $set: { saved: true }, $push: { savedBy: user._id } }
			);

		throw redirect(301, '/filter');
	},
	delete: async ({ request, locals }) => {
		console.log('delete');

		const data = await request.formData();
		const articleId = data.get('articleId') as string;

		const db = locals.db;

		// delete article and check if successful
		const { deletedCount } = await db
			.collection('articles')
			.deleteOne({ _id: new ObjectId(articleId) });

		if (deletedCount === 0) {
			return {
				status: 500,
				error: 'Could not delete article'
			};
		}

		throw redirect(301, '/filter');
	}
} satisfies Actions;
