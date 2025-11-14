<script lang="ts">
	import { getPlayers } from "./data.remote";
	import { getSkinURL } from "$lib/scripts";
	import * as Window from "$lib/Window/index.svelte";
	import { getCurrentDemovioStatus } from "../status.remote";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import { onMount } from "svelte";
	import { localPreferences } from "$lib/local-settings.svelte";

	let {
		searchQuery,
	}: {
		searchQuery: string;
	} = $props();

	const demovioStatus = getCurrentDemovioStatus();
	let players = getPlayers();

	onMount(() => {
		const interval = setInterval(() => {
			getPlayers().refresh();
			getCurrentDemovioStatus().refresh();
		}, 5000);
		return () => clearInterval(interval);
	});
</script>

{#if players.error}
	<Window.Placeholder>
		<Window.Error error={players.error} />
	</Window.Placeholder>
{:else if players.current}
	{console.log(players.current)}
	{#if players.current.length}
		<Window.NavigationList>
			{@const list = players.current
				.filter((p) => p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
				.sort((a, b) => {
					const scoreFavoriteA = a.featured ? 10 : 0;
					const scoreFavoriteB = b.featured ? 10 : 0;
					let scoreOnlineA = 0;
					let scoreOnlineB = 0;
					if (demovioStatus.current) {
						const onlinePlayers = demovioStatus.current.players;
						scoreOnlineA = onlinePlayers.includes(a.name) ? 1 : 0;
						scoreOnlineB = onlinePlayers.includes(b.name) ? 1 : 0;
					}

					const finalScoreA = scoreFavoriteA + scoreOnlineA;
					const finalScoreB = scoreFavoriteB + scoreOnlineB;

					return finalScoreB - finalScoreA;
				})}
			{#each list as { name, skin, pronouns, featured, citizenship }, i (name)}
				<Window.NavigationPlayer
					online={demovioStatus.current && demovioStatus.current.players.includes(name)}
					{name}
					pronouns={pronouns ?? undefined}
					{i}
					{featured}
					backstageCitizenship={localPreferences.backstageStatus &&
					localPreferences.backstageCitizenship
						? citizenship
						: undefined}
					skin={getSkinURL(skin, name)}
				/>
			{/each}
		</Window.NavigationList>
	{:else if searchQuery}
		<Window.Placeholder>
			<Window.PlaceholderWarning>Нет игроков по вашему запросу</Window.PlaceholderWarning>
		</Window.Placeholder>
	{:else}
		<Window.Placeholder>
			<Window.PlaceholderWarning>Никого нет 🥸</Window.PlaceholderWarning>
		</Window.Placeholder>
	{/if}
{:else}
	<Window.Placeholder>
		<LoadingWheel --wheel-size="128px" --wheel-color="rgba(255,255,255,0.75)" />
	</Window.Placeholder>
{/if}
