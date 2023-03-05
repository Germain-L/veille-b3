<script lang="ts">
	import ArticleFitler from '$lib/components/ArticleFitler.svelte';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	export let form: ActionData;
</script>

<svelte:head>
	<title>Veille B3 - Filter</title>
</svelte:head>

<div class="flex flex-col space-y-4">
	{#each data.articles as article}
		<ArticleFitler {article} {form} />
	{/each}
</div>
