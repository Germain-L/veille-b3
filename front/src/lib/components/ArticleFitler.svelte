<script lang="ts">
	import type { Article } from '$lib/models/article';
	import type { ActionData } from '../../routes/filter/$types';

	export let article: Article;
	export let form: ActionData;
</script>

<div class="overflow-hidden bg-white shadow sm:rounded-lg">
	<!-- Article content -->
	<div class="px-4 py-5 sm:px-6">
		<h2 class="text-lg font-medium text-gray-900">{article.title}</h2>
		<p class="mt-1 text-sm text-gray-500">{article.summary}</p>
	</div>

	<!-- Save/open/delete buttons -->
	<form class="flex flex-wrap justify-center px-4 py-4 sm:px-6" method="POST">
		<input type="text" value={article._id} class="hidden" name="articleId" />
		<button
			formaction="/filter?/save"
			type="submit"
			class="focus:shadow-outline mr-2 mb-2 rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none sm:mb-0"
		>
			Save
		</button>
		<a
			href={article.link}
			target="_blank"
			rel="noreferrer"
			class="focus:shadow-outline mr-2 mb-2 rounded-md bg-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none sm:mb-0"
		>
			Open
		</a>
		<button
			type="submit"
			formaction="/filter?/delete"
			class="focus:shadow-outline mr-2 mb-2 rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none sm:mb-0"
		>
			Delete
		</button>
	</form>
	{#if form?.error}
		<div class="px-4 py-4 sm:px-6">
			<p class="text-sm text-red-500">{form.error}</p>
		</div>
	{/if}
</div>
