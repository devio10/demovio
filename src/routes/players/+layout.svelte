<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/state";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import * as Window from "$lib/Window/index.svelte";
	import Navigation from "./Navigation.svelte";

	let { children } = $props();
</script>

{#snippet pending()}
	<Window.Placeholder>
		<LoadingWheel --wheel-size="128px" --wheel-color="rgba(255,255,255,0.75)" />
	</Window.Placeholder>
{/snippet}
<Window.Root sectionOpened={page.route.id === "/players/[name]"}>
	{#snippet navigation()}
		<Navigation />
	{/snippet}
	{@render children?.()}
	<!-- <SkinViewer3D --url="url(https://demovio.love/skins/anastasiz2009.png)" /> -->
</Window.Root>
