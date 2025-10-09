<script>
	// import SkinViewer3D from "$lib/MinecraftSkinViewer/SkinViewer3D.svelte";
	import Window from "$lib/Window/Window.svelte";
	import WindowNavigation from "$lib/Window/WindowNavigation.svelte";
	import WindowNavigationPlayer from "$lib/Window/WindowNavigationPlayer.svelte";
	import WindowNavigationSearch from "$lib/Window/WindowNavigationSearch.svelte";
	import { api_url } from "$lib/const";
	import { onMount } from "svelte";

	let activePlayer = $state();
	let searchQuery = $state("");
	let players = $state([]);
	async function playersList() {
		const req = await fetch(`${api_url}players.php`);
		if (!(req.status >= 200 && req.status < 300)) {
			return;
		}
		const data = await req.json();
		if (data.error) {
			throw new Error(data.error);
		}
		players = data;
		activePlayer = players[0].name;
	}
	onMount(() => {
		playersList();
	});
	const filteredPlayers = $derived(players.filter((p) => p.name.includes(searchQuery.trim())));
</script>

<Window>
	{#snippet navigation()}
		<WindowNavigation --width="45%">
			<div class="windownavigation-header">
				<h2 style="margin-bottom: 16px;">Игроки</h2>
				<WindowNavigationSearch bind:value={searchQuery} placeholder="Поиск по игрокам" />
			</div>
			<ul>
				{#each filteredPlayers as { name, skin, pronouns } (name)}
					<WindowNavigationPlayer
						{name}
						{pronouns}
						skin="https://mc-heads.net/avatar/{skin}/48.png"
						bind:active={activePlayer}
					/>
				{/each}
			</ul>
		</WindowNavigation>
	{/snippet}
	<!-- <SkinViewer3D --url="url(https://demovio.love/skins/anastasiz2009.png)" /> -->
</Window>
