<script lang="ts">
	import ArticleDisplay from '$lib/components/ArticleDisplay.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="flex flex-col space-y-4">
	{#each data.articles as article}
		<ArticleDisplay {article} />
	{/each}
</div>
