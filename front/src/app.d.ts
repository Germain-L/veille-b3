// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		db: Db;
		user: User | null;
	}
	// interface PageData {}
	// interface Platform {}
}
