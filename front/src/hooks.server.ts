import type { Handle } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';
import cookie from 'cookie';

export const handle = (async ({ event, resolve }) => {
	const mongodb = await MongoClient.connect('mongodb://root:example@localhost:27017', {});
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
		const user = await db.collection('users').findOne({ refreshToken });

		if (user) {
			// set user in session
			event.locals.email = user.email;
		}
	}

	const response = await resolve(event);

	return response;
}) satisfies Handle;
