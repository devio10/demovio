<script>
	import Window from "$lib/Window/Window.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import WindowPlaceholderSearch from "$lib/Window/WindowPlaceholderSearch.svelte";
	import WindowNavigationItem from "$lib/Window/Navigation/WindowNavigationItem.svelte";
	import WindowHeader from "$lib/Window/WindowHeader.svelte";
	import { page } from "$app/state";
	import WindowNavigationList from "$lib/Window/Navigation/WindowNavigationList.svelte";
	import WindowNavigationHeader from "$lib/Window/Navigation/WindowNavigationHeader.svelte";
	let searchQuery = $state("");
	let { children } = $props();
	const sections = [
		{
			title: "Главная",
			href: "",
		},
		{
			title: "Шаг 1: Установка игры",
			href: "/install-game",
		},
		{
			title: "Шаг 2: Выбор архива с модами",
			href: "/choose-modpack",
		},
		{
			title: "Шаг 3: Установка модов",
			href: "/install-mods",
		},
		{
			title: "Штаты",
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

	const section = $derived(sections.find((v) => `/help${v.href}` === page.url.pathname));
</script>

<Window>
	{#snippet navigation()}
		<WindowNavigation --width="35%">
			<WindowNavigationHeader title="Помощь">
				<WindowPlaceholderSearch bind:value={searchQuery} placeholder="Поиск" />
			</WindowNavigationHeader>
			<WindowNavigationList>
				{#each sections as section, i}
					<WindowNavigationItem href="/help{section.href}" {i}>
						{section.title}
					</WindowNavigationItem>
				{/each}
			</WindowNavigationList>
		</WindowNavigation>
	{/snippet}
	{#if section}
		<WindowHeader title={section.title}></WindowHeader>
	{/if}
	<article>
		{@render children?.()}
	</article>
</Window>

<style lang="scss">
	article {
		padding: 0 36px 36px 36px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	:global {
		p,
		span {
			font-size: 14px;
			text-align: justify;
		}
		p {
			margin: 0;
		}
		a {
			color: white;
		}
	}
</style>
