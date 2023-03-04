<script lang="ts">
	import AuthForm from '$lib/components/AuthForm.svelte';
	import type { ActionData, PageServerData } from './$types';

	export let form: ActionData;
	export let data: PageServerData;
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>

{#if data.user}
	<!-- content here -->
	<p>{data.user}</p>
{:else}
	<div class="w-4/12">
		<AuthForm {form} />
	</div>
{/if}
