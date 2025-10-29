<script lang="ts">
	import { getPlayers } from "./data.remote";
	import { getSkinURL } from "$lib/scripts";
	import * as Window from "$lib/Window/index.svelte";
	import { getCurrentDemovioStatus } from "../status.remote";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";

	let {
		searchQuery,
	}: {
		searchQuery: string;
	} = $props();

	const demovioStatus = getCurrentDemovioStatus();

	const list = $derived(
		(await getPlayers())
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
			}),
	);
</script>

<svelte:boundary>
	{#snippet pending()}
		<Window.Placeholder>
			<LoadingWheel --wheel-size="128px" --wheel-color="rgba(255,255,255,0.75)" />
		</Window.Placeholder>
	{/snippet}
	{#snippet failed(error)}
		<Window.Placeholder>
			{#if error instanceof Error}
				{#if error.name === "TimeoutError"}
					<Window.PlaceholderWarning>Превышено время ожидания</Window.PlaceholderWarning>
				{:else if error.name === "AbortError"}
					<Window.PlaceholderWarning>Неправильный ответ от сервера</Window.PlaceholderWarning>
				{:else}
					<Window.PlaceholderWarning>Ошибка соединения с сервером</Window.PlaceholderWarning>
				{/if}
			{/if}
		</Window.Placeholder>
	{/snippet}

	{#if list.length}
		<Window.NavigationList>
			{#each list as { name, skin, pronouns, featured }, i (name)}
				<Window.NavigationPlayer
					online={demovioStatus.current && demovioStatus.current.players.includes(name)}
					{name}
					pronouns={pronouns ?? undefined}
					{i}
					{featured}
					skin={getSkinURL(skin, name)}
				/>
			{/each}
		</Window.NavigationList>
	{:else}
		<Window.Placeholder>
			<Window.PlaceholderWarning>Нет игроков по вашему запросу</Window.PlaceholderWarning>
		</Window.Placeholder>
	{/if}
</svelte:boundary>
