<script lang="ts">
	import LoadingWheel from "$lib/LoadingWheel.svelte";
	import Window from "$lib/Window/Window.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import WindowNavigationPlaceholder from "$lib/Window/Navigation/WindowNavigationPlaceholder.svelte";
	import WindowNavigationPlayer from "$lib/Window/Navigation/WindowNavigationPlayer.svelte";
	import WindowNavigationSearch from "$lib/Window/Navigation/WindowNavigationSearch.svelte";
	import WindowNavigationWarning from "$lib/Window/Navigation/WindowNavigationWarning.svelte";
	import WindowNavigationHeader from "$lib/Window/Navigation/WindowNavigationHeader.svelte";
	import WindowNavigationList from "$lib/Window/Navigation/WindowNavigationList.svelte";
	import { getSkinURL } from "$lib/scripts";

	let { children, data } = $props();

	let searchQuery = $state("");
	let players: Promise<{ name: string; skin: string; pronouns: string }[]> = $derived(data.players);
</script>

<Window>
	{#snippet navigation()}
		<WindowNavigation --width="45%">
			<WindowNavigationHeader title="Игроки">
				<WindowNavigationSearch bind:value={searchQuery} placeholder="Поиск по игрокам" />
			</WindowNavigationHeader>
			{#await players}
				<WindowNavigationPlaceholder>
					<LoadingWheel --wheel-size="128px" --wheel-color="rgba(255,255,255,0.75)" />
				</WindowNavigationPlaceholder>
			{:then players}
				{@const filteredPlayers = players
					.filter((p) => p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
					.sort((a, b) => {
						const scoreFavoriteA = data.profile?.favorites.includes(a.name) ? 10 : 0;
						const scoreFavoriteB = data.profile?.favorites.includes(b.name) ? 10 : 0;
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
						{#each filteredPlayers as { name, skin, pronouns }, i (name)}
							{@const online =
								data.demovioStatus === false ? false : data.demovioStatus!.players.includes(name)}
							<WindowNavigationPlayer
								{online}
								{name}
								{pronouns}
								{i}
								featured={data.profile?.favorites.includes(name)}
								skin={getSkinURL(skin, name)}
							/>
						{/each}
					</WindowNavigationList>
				{:else}
					<WindowNavigationPlaceholder>
						<WindowNavigationWarning>Нет игроков по вашему запросу</WindowNavigationWarning>
					</WindowNavigationPlaceholder>
				{/if}
			{:catch e}
				<WindowNavigationPlaceholder>
					{#if e.name === "TimeoutError"}
						<WindowNavigationWarning>Превышено время ожидания</WindowNavigationWarning>
					{:else if e.name === "AbortError"}
						<WindowNavigationWarning>Неправильный ответ от сервера</WindowNavigationWarning>
					{:else}
						<WindowNavigationWarning>Ошибка соединения с сервером</WindowNavigationWarning>
					{/if}
				</WindowNavigationPlaceholder>
			{/await}
		</WindowNavigation>
	{/snippet}
	{@render children?.()}
	<!-- <SkinViewer3D --url="url(https://demovio.love/skins/anastasiz2009.png)" /> -->
</Window>
