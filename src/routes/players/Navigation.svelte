<script lang="ts">
	import { onMount } from "svelte";
	import { getPlayers } from "./data.remote";
	import * as Window from "$lib/Window/index.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import PlayersList from "./PlayersList.svelte";

	let searchQuery = $state("");

	let updating = $state(false);

	onMount(() => {
		const reloadInterval = setInterval(() => {
			console.log(123);
			updating = true;
			getPlayers()
				.refresh()
				.finally(() => (updating = false));
		}, 1000);
		return () => clearInterval(reloadInterval);
	});
</script>

<Window.Navigation --width="45%">
	<Window.NavigationHeader title="Игроки">
		{#snippet subtitle()}
			{#if updating}
				<LoadingWheel --wheel-size="33px" --wheel-color="rgba(255,255,255,0.75)" />
			{/if}
		{/snippet}
		<Window.PlaceholderSearch bind:value={searchQuery} placeholder="Поиск по игрокам" />
	</Window.NavigationHeader>
	<PlayersList {searchQuery} />
</Window.Navigation>
