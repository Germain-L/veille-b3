<script lang="ts">
	import type { LayoutData } from './$types';

	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	export let data: LayoutData;
</script>

<div class="mx-2 md:mx-32">
	<Navbar loggedIn={data.user ? true : false} />
	<slot />
</div>
