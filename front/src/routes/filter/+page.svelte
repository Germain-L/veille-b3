<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.articles as article}
	<div class="flex flex-col space-y-4">
		<h2 class="text-2xl font-bold">{article.title}</h2>
		<p class="text-gray-700">{article.summary}</p>
	</div>
{/each}
