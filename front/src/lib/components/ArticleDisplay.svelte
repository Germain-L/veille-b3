<script lang="ts">
	import type { Article } from '$lib/models/article';

	export let article: Article;
</script>

<a href={article.link} target="_blank" rel="noreferrer">
	<div class="overflow-hidden bg-white shadow sm:rounded-lg">
		<!-- Article content -->
		<div class="px-4 py-5 sm:px-6">
			<h2 class="text-lg font-medium text-gray-900">{article.title}</h2>
			<p class="mt-1 text-sm text-gray-500">{article.summary}</p>
		</div>
	</div>
</a>
