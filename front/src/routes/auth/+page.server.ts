import type { PageServerLoad, Actions } from './$types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT } from '$env/static/private';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from '@sveltejs/kit';
import type { User } from '$lib/models/user';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email || !password) {
			return { status: 401, error: 'Missing email or password' };
		}

		// get user
		const db = locals.db;

		const user = await db.collection('users').findOne({ email }) as User;

		if (!user) {
			return { status: 401, error: 'User not found' };
		}

		// compare password
		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			return { status: 401, error: 'Invalid password' };
		}

		// set user in session
		locals.user = user;

		const token = jwt.sign({ email: user.email }, JWT, { expiresIn: '1h' });
		const refreshToken = uuidv4();
		
		await db.collection('users').updateOne({ email: user.email }, { $set: { refreshToken } });

		cookies.set('token', token, { httpOnly: true });
		cookies.set('refreshToken', refreshToken, { httpOnly: true });

		throw redirect(301, '/');
	},

	register: async ({ request, locals }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		// hash password with bcrypt
		const hash = await bcrypt.hash(password, 10);

		// insert user in database
		const user = {
			email,
			password: hash
		} as User;

		const db = locals.db;

		const result = await db.collection('users').insertOne(user);

		if (!result.insertedId) {
			return { status: 500, error: 'Could not create user' };
		}

		return { status: 201 };
	},
	logout: async ({ locals, cookies }) => {
		console.log('logout');
		
		locals.user = null;

		cookies.delete('token');
		cookies.delete('refreshToken');

		throw redirect(301, '/');
	}
};
