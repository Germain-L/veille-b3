<script>
	export let loggedIn = false;
</script>

<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<div class="flex h-16 items-center justify-between">
		<!-- Home link -->
		<a href="/" class="flex flex-shrink-0 items-center">
			<span class="text-xl font-semibold tracking-tight">Home</span>
		</a>
		<!-- Right-side links -->
		<div class="flex items-center">
			<!-- If user is not logged in, show "Login" link -->
			{#if !loggedIn}
				<a
					href="/auth"
					class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
					>Login</a
				>
			{:else}
				<!-- If user is logged in, show "Filter", "Profile", and "Logout" links -->
				<a
					href="/filter"
					class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
					>Filter</a
				>
				<a
					href="/profile"
					class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
					>Profile</a
				>
				<form method="POST" action="/auth?/logout">
					<button
						type="submit"
						class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
						>Logout</button
					>
				</form>
			{/if}
		</div>
	</div>
</nav>
