<script>
	import Window from "$lib/Window/Window.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import WindowNavigationSearch from "$lib/Window/Navigation/WindowNavigationSearch.svelte";
	import WindowNavigationItem from "$lib/Window/Navigation/WindowNavigationItem.svelte";
	import WindowHeader from "$lib/Window/WindowHeader.svelte";
	import { page } from "$app/state";
	let searchQuery = $state("");
	let { children } = $props();
	const sections = [
		{
			title: "Главная",
			href: "",
		},
		{
			title: "Установка игры",
			href: "/install-game",
		},
		{
			title: "Установка модов",
			href: "/install-mods",
		},
		{
			title: "Версия игры и сервера",
			href: "/kiss",
		},
		{
			title: "Изменение персональных данных",
			href: "/kiss",
		},
		{
			title: "Прочие материалы",
			href: "/kiss",
		},
	];
</script>

<Window>
	{#snippet navigation()}
		<WindowNavigation --width="35%">
			<div class="windownavigation-header">
				<h2 style="margin-bottom: 16px;">Помощь</h2>
				<WindowNavigationSearch bind:value={searchQuery} placeholder="Поиск" />
			</div>
			<ul>
				{#each sections as section}
					<WindowNavigationItem href="/help{section.href}">{section.title}</WindowNavigationItem>
				{/each}
			</ul>
		</WindowNavigation>
	{/snippet}
	<WindowHeader title={sections.find((v) => `/help${v.href}` === page.url.pathname).title}
	></WindowHeader>
	<article>
		{@render children?.()}
	</article>
</Window>

<style>
	article {
		padding: 0 36px 36px 36px;
	}
</style>
