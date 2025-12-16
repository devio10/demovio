<script>
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import WindowNavigationItem from "$lib/Window/Navigation/WindowNavigationItem.svelte";
	import WindowHeader from "$lib/Window/WindowHeader.svelte";
	import { page } from "$app/state";
	import * as Window from "$lib/Window/index.svelte";
	import WindowNavigationList from "$lib/Window/Navigation/WindowNavigationList.svelte";
	import WindowNavigationHeader from "$lib/Window/Navigation/WindowNavigationHeader.svelte";
	let { children } = $props();
	const sections = [
		{
			title: "Главная",
			href: "/home",
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
			href: "/states",
		},
		{
			title: "Версия игры и сервера",
			href: "/game-version",
		},
		{
			title: "Изменение персональных данных",
			href: "/change-personal-data",
		},
		{
			title: "Прочие материалы",
			href: "/other",
		},
	];

	const section = $derived(
		sections.find((v) => `/help${v.href}` === page.url.pathname) ?? { title: "Главная" },
	);
</script>

<Window.Root sectionOpened={page.route.id?.startsWith("/(website)/help/")}>
	{#snippet navigation()}
		<WindowNavigation --width="35%">
			<WindowNavigationHeader title="Помощь"></WindowNavigationHeader>
			<WindowNavigationList>
				{#each sections as section, i}
					<WindowNavigationItem href="/help{section.href}">
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
</Window.Root>

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
	:global([data-prefers-contrast]) {
		:global {
			a {
				color: var(--general-text);
			}
		}
	}
	@media screen and (max-width: 768px) {
		article {
			padding: 0 16px 56px 16px;
		}
	}
</style>
