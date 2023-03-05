<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<!-- change page title -->
<svelte:head>
	<title>Veille B3 - Auth</title>
</svelte:head>

<div class="">
	<form action="?/login" method="POST" class="flex flex-col space-y-4" id="login-form">
		<label for="email" class="font-medium text-gray-700">Email</label>
		<input name="email" type="email" id="email" class="form-input w-full rounded" required />

		<label for="password" class="font-medium text-gray-700">Password</label>
		<input
			name="password"
			type="password"
			id="password"
			class="form-input w-full rounded"
			required
		/>

		<div class="flex justify-evenly">
			<button
				type="submit"
				class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
			>
				Log In
			</button>
			<!-- <button
				type="submit"
				class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
				formaction="?/register"
			>
				Register
			</button> -->
		</div>

		{#if form?.error}<p id="error-message" class="text-center text-red-500 ">
				{form.error}
			</p>{/if}
	</form>
</div>
