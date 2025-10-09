<script>
	import Window from "$lib/Window/Window.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import WindowNavigationSearch from "$lib/Window/Navigation/WindowNavigationSearch.svelte";
	import WindowNavigationItem from "$lib/Window/Navigation/WindowNavigationItem.svelte";
	let searchQuery = $state("");
	let { children } = $props();
</script>

<Window>
	{#snippet navigation()}
		<WindowNavigation --width="35%">
			<div class="windownavigation-header">
				<h2 style="margin-bottom: 16px;">Помощь</h2>
				<WindowNavigationSearch bind:value={searchQuery} placeholder="Поиск" />
			</div>
			<ul>
				<WindowNavigationItem href="/help">Главная</WindowNavigationItem>
				<WindowNavigationItem href="/help/install-game">Установка игры</WindowNavigationItem>
				<WindowNavigationItem href="/help/install-mods">Установка модов</WindowNavigationItem>
			</ul>
		</WindowNavigation>
	{/snippet}

	{@render children?.()}
</Window>
