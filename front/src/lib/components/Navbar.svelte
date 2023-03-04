<script lang="ts">
	export let email: string | null = null;
</script>

<div class="bg-white text-xl text-gray-900">
	<nav class="mx-auto flex justify-between">
		<ul class="flex">
			<li><a href="/" class="hover:text-gray-300 ">Home</a></li>
		</ul>
		<ul class="flex items-center space-x-10">
			<li class="align-middle"><a href="/profile" class="hover:text-gray-300">Profile</a></li>
			{#if email}
				<li>
					<form action="/auth?/logout" method="POST">
						<button
							type="submit"
							class="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
						>
							Logout
						</button>
					</form>
				</li>
			{/if}
		</ul>
	</nav>
</div>
