<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Veille B3 - Profile</title>
</svelte:head>

{data.user}
