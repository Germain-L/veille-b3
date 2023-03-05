import type { Handle } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';
import cookie from 'cookie';
import type { User } from '$lib/models/user';
import { MONGO_URL } from '$env/static/private';

export const handle = (async ({ event, resolve }) => {
	const mongodb = await MongoClient.connect(MONGO_URL, {});
	await mongodb.connect();

	const db = mongodb.db('veille');

	event.locals.db = db;

	// get refresh token
	const cookiesString = event.request.headers;
	const cookies = cookiesString.get('cookie');
	const parsedCookies = cookie.parse(cookies || '');
	const refreshToken = parsedCookies.refreshToken;

	if (refreshToken) {
		// get user
		const userFromMongo = await db.collection('users').findOne({ refreshToken });

		if (userFromMongo) {
			const user = {
				_id: userFromMongo._id.toString(),
				username: userFromMongo.username,
				email: userFromMongo.email,
				admin: userFromMongo.admin,
				password: userFromMongo.password,
				refreshToken: userFromMongo.refreshToken
			} as User;

			event.locals.user = user;
		}
	}

	const response = await resolve(event);

	return response;
}) satisfies Handle;
