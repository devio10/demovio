<script lang="ts">
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import Window from "$lib/Window/Window.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import WindowPlaceholder from "$lib/Window/WindowPlaceholder.svelte";
	import WindowNavigationPlayer from "$lib/Window/Navigation/WindowNavigationPlayer.svelte";
	import WindowPlaceholderSearch from "$lib/Window/WindowPlaceholderSearch.svelte";
	import WindowPlaceholderWarning from "$lib/Window/WindowPlaceholderWarning.svelte";
	import WindowNavigationHeader from "$lib/Window/Navigation/WindowNavigationHeader.svelte";
	import WindowNavigationList from "$lib/Window/Navigation/WindowNavigationList.svelte";
	import { getSkinURL } from "$lib/scripts";
	import { onMount } from "svelte";
	import { getPlayers } from "./data.remote";

	let { children, data } = $props();

	let searchQuery = $state("");
	let playersError: unknown = $state();
	let updatingList = $state(false);
	const query = getPlayers();
	onMount(() => {
		const reloadInterval = setInterval(() => {
			updatingList = true;
			query.refresh();
		}, 10000);
		return () => {
			clearInterval(reloadInterval);
		};
	});
</script>

<Window urlName="/players/[name]">
	{#snippet navigation()}
		<WindowNavigation --width="45%">
			<WindowNavigationHeader title="Игроки">
				{#snippet titleChildren()}
					{#if query.loading}
						<LoadingWheel --wheel-size="34px" --wheel-color="rgba(255,255,255,0.75)" />
					{/if}
				{/snippet}
				<WindowPlaceholderSearch bind:value={searchQuery} placeholder="Поиск по игрокам" />
			</WindowNavigationHeader>
			{#if !query.current}
				<WindowPlaceholder>
					<LoadingWheel --wheel-size="128px" --wheel-color="rgba(255,255,255,0.75)" />
				</WindowPlaceholder>
			{/if}
			{#if query.current}
				{@const filteredPlayers = query.current
					.filter((p) => p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
					.sort((a, b) => {
						const scoreFavoriteA = a.featured ? 10 : 0;
						const scoreFavoriteB = b.featured ? 10 : 0;
						let scoreOnlineA = 0;
						let scoreOnlineB = 0;
						if (data.demovioStatus) {
							scoreOnlineA = data.demovioStatus.players.includes(a.name) ? 1 : 0;
							scoreOnlineB = data.demovioStatus.players.includes(b.name) ? 1 : 0;
						}

						const finalScoreA = scoreFavoriteA + scoreOnlineA;
						const finalScoreB = scoreFavoriteB + scoreOnlineB;

						return finalScoreB - finalScoreA;
					})}
				{#if filteredPlayers.length}
					<WindowNavigationList>
						{#each filteredPlayers as { name, skin, pronouns, featured }, i (name)}
							{@const online =
								data.demovioStatus === false ? false : data.demovioStatus!.players.includes(name)}
							<WindowNavigationPlayer
								{online}
								{name}
								{pronouns}
								{i}
								{featured}
								skin={getSkinURL(skin, name)}
							/>
						{/each}
					</WindowNavigationList>
				{:else}
					<WindowPlaceholder>
						<WindowPlaceholderWarning>Нет игроков по вашему запросу</WindowPlaceholderWarning>
					</WindowPlaceholder>
				{/if}
			{/if}
			{#if query.error}
				<WindowPlaceholder>
					{#if playersError instanceof Error}
						{#if playersError.name === "TimeoutError"}
							<WindowPlaceholderWarning>Превышено время ожидания</WindowPlaceholderWarning>
						{:else if playersError.name === "AbortError"}
							<WindowPlaceholderWarning>Неправильный ответ от сервера</WindowPlaceholderWarning>
						{:else}
							<WindowPlaceholderWarning>Ошибка соединения с сервером</WindowPlaceholderWarning>
						{/if}
					{/if}
				</WindowPlaceholder>
			{/if}
		</WindowNavigation>
	{/snippet}
	{@render children?.()}
	<!-- <SkinViewer3D --url="url(https://demovio.love/skins/anastasiz2009.png)" /> -->
</Window>
