<script lang="ts">
	import { page } from "$app/state";
	import TabNavigation from "$lib/components/TabNavigation.svelte";
	import * as Window from "$lib/Window/index.svelte";
	import { fly } from "svelte/transition";
	import Navigation from "./Navigation.svelte";
	import TabNavigationButton from "$lib/components/TabNavigationButton.svelte";
	import { MediaQuery } from "svelte/reactivity";

	let { children } = $props();
	let applicationsType = $state(0);
	let isMobile = new MediaQuery("screen and (max-width: 768px)");
	let tabNavigationSelection = $state(isMobile.current ? 8 : 16);
	let tabNavigationSelectionWidth = $state(117);
</script>

<Window.Root sectionOpened={page.route.id?.startsWith("/(website)/applications/[name]")}>
	{#snippet navigation()}<Navigation {applicationsType} />{/snippet}
	{@render children?.()}
</Window.Root>

<div
	class="navigation"
	transition:fly|global={{ duration: 500, y: isMobile.current ? -150 : 150, opacity: 1 }}
>
	<TabNavigation selection={tabNavigationSelection} selectionWidth={tabNavigationSelectionWidth}>
		<TabNavigationButton
			onclick={({ target }) => {
				const targetPage = 0;
				applicationsType = targetPage;
				tabNavigationSelection = target.offsetLeft;
				tabNavigationSelectionWidth = target.clientWidth;
			}}
		>
			Вступления
		</TabNavigationButton>
		<TabNavigationButton
			onclick={({ target }) => {
				const targetPage = 1;
				applicationsType = targetPage;
				tabNavigationSelection = target.offsetLeft;
				tabNavigationSelectionWidth = target.clientWidth;
			}}
		>
			Гражданство
		</TabNavigationButton>
		<TabNavigationButton
			onclick={({ target }) => {
				const targetPage = 2;
				applicationsType = targetPage;
				tabNavigationSelection = target.offsetLeft;
				tabNavigationSelectionWidth = target.clientWidth;
			}}
		>
			Жалобы
		</TabNavigationButton>
		<TabNavigationButton
			onclick={({ target }) => {
				const targetPage = 3;
				applicationsType = targetPage;
				tabNavigationSelection = target.offsetLeft;
				tabNavigationSelectionWidth = target.clientWidth;
			}}
		>
			Баны
		</TabNavigationButton>
	</TabNavigation>
</div>

<style lang="scss">
	.navigation {
		position: fixed;
		bottom: 32px;
		z-index: 3;
	}
</style>
