<script lang="ts">
	import { onMount } from "svelte";
	import * as Window from "$lib/Window/index.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import { getApplications } from "./data.remote";
	import ApplicationsList from "./ApplicationsList.svelte";

	let searchQuery = $state("");
	let updating = $state(false);

	onMount(() => {
		const reloadInterval = setInterval(() => {
			updating = true;
			getApplications()
				.refresh()
				.finally(() => (updating = false));
		}, 10000);
		return () => clearInterval(reloadInterval);
	});
</script>

<Window.Navigation --width="45%">
	<Window.NavigationHeader title="Заявки">
		{#snippet subtitle()}
			{#if updating}
				<LoadingWheel --wheel-size="33px" --wheel-color="rgba(255,255,255,0.75)" />
			{/if}
		{/snippet}
		<Window.PlaceholderSearch bind:value={searchQuery} placeholder="Поиск по заявкам" />
	</Window.NavigationHeader>
	<ApplicationsList {searchQuery} />
</Window.Navigation>
