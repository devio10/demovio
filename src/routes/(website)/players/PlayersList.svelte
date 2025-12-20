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

	let demovioStatus = $state(null);
	let players = getPlayers();
	async function fetchDemovioStatus() {
		demovioStatus = (await getCurrentDemovioStatus()) ?? null;
	}
	$effect(() => {
		fetchDemovioStatus();
	});

	onMount(() => {
		const interval = setInterval(() => {
			getPlayers().refresh();
			fetchDemovioStatus();
		}, 5000);
		return () => clearInterval(interval);
	});
</script>

{#if players.error}
	<Window.Placeholder>
		<Window.Error error={players.error} />
	</Window.Placeholder>
{:else if players.current}
	{#if players.current.length}
		<Window.NavigationList>
			{@const list = players.current
				.filter((p) => p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
				.sort((a, b) => {
					const scoreFavoriteA = a.featured ? 10 : 0;
					const scoreFavoriteB = b.featured ? 10 : 0;

					const scoreBannedA = a.isBanned ? -10 : 0;
					const scoreBannedB = b.isBanned ? -10 : 0;

					let scoreOnlineA = 0;
					let scoreOnlineB = 0;
					if (demovioStatus) {
						const onlinePlayers = demovioStatus.players;
						scoreOnlineA = onlinePlayers.includes(a.name) ? 1 : 0;
						scoreOnlineB = onlinePlayers.includes(b.name) ? 1 : 0;
					}

					const finalScoreA = scoreFavoriteA + scoreOnlineA + scoreBannedA;
					const finalScoreB = scoreFavoriteB + scoreOnlineB + scoreBannedB;

					return finalScoreB - finalScoreA;
				})}
			{#each list as { name, skin, pronouns, featured, citizenship, isBanned }, i (name)}
				<Window.NavigationPlayer
					online={demovioStatus && demovioStatus.players.includes(name)}
					{name}
					pronouns={pronouns ?? undefined}
					{i}
					{featured}
					backstageIsBanned={isBanned === true}
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
		<LoadingWheel --wheel-size="128px" />
	</Window.Placeholder>
{/if}
