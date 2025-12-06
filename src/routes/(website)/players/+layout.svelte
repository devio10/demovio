<script lang="ts">
	import { page } from "$app/state";
	import * as Window from "$lib/Window/index.svelte";
	import Navigation from "./Navigation.svelte";

	let { children } = $props();
</script>

<Window.Root sectionOpened={page.route.id?.startsWith("/(website)/players/[name]")}>
	{#snippet navigation()}
		<Navigation />
	{/snippet}
	{@render children?.()}
</Window.Root>
