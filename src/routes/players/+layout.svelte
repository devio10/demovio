<script lang="ts">
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import { getSkinURL } from "$lib/scripts";
	import { getPlayers } from "./data.remote";
	import * as Window from "$lib/Window/index.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import { getCurrentDemovioStatus } from "../status.remote";

	let { children } = $props();

	let searchQuery = $state("");
	let playersError: unknown = $state();

	const playersList = getPlayers();
	const demovioStatus = getCurrentDemovioStatus();

	onMount(() => {
		const reloadInterval = setInterval(() => playersList.refresh(), 10000);
		return () => clearInterval(reloadInterval);
	});
</script>

<Window.Root sectionOpened={page.route.id === "/players/[name]"}>
	{#snippet navigation()}
		<Window.Navigation --width="45%">
			<Window.NavigationHeader title="Игроки">
				{#snippet titleChildren()}
					{#if playersList.loading}
						<LoadingWheel --wheel-size="34px" --wheel-color="rgba(255,255,255,0.75)" />
					{/if}
				{/snippet}
				<Window.PlaceholderSearch bind:value={searchQuery} placeholder="Поиск по игрокам" />
			</Window.NavigationHeader>
			{#if !playersList.current}
				<Window.Placeholder>
					<LoadingWheel --wheel-size="128px" --wheel-color="rgba(255,255,255,0.75)" />
				</Window.Placeholder>
			{:else}
				{@const list = playersList.current
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
			{/if}
			{#if playersList.error}
				<Window.Placeholder>
					{#if playersError instanceof Error}
						{#if playersError.name === "TimeoutError"}
							<Window.PlaceholderWarning>Превышено время ожидания</Window.PlaceholderWarning>
						{:else if playersError.name === "AbortError"}
							<Window.PlaceholderWarning>Неправильный ответ от сервера</Window.PlaceholderWarning>
						{:else}
							<Window.PlaceholderWarning>Ошибка соединения с сервером</Window.PlaceholderWarning>
						{/if}
					{/if}
				</Window.Placeholder>
			{/if}
		</Window.Navigation>
	{/snippet}
	{@render children?.()}
	<!-- <SkinViewer3D --url="url(https://demovio.love/skins/anastasiz2009.png)" /> -->
</Window.Root>
