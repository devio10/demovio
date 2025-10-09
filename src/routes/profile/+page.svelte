<script>
	import Window from "$lib/Window/Window.svelte";
	import WindowNavigation from "$lib/Window/WindowNavigation.svelte";
</script>

<Window>
	{#snippet navigation()}
		<WindowNavigation --width="30%"></WindowNavigation>
	{/snippet}
</Window>
