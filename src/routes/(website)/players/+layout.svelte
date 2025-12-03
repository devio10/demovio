<script lang="ts">
	import { page } from "$app/state";
	import * as Window from "$lib/Window/index.svelte";
	import Navigation from "./Navigation.svelte";

	let { children } = $props();
</script>

<Window.Root sectionOpened={page.route.id === "/(website)/players/[name]"}>
	{#snippet navigation()}
		<Navigation />
	{/snippet}
	{@render children?.()}
	<!-- <SkinViewer3D --url="url(https://demovio.love/skins/anastasiz2009.png)" /> -->
</Window.Root>
