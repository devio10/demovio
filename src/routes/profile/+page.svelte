<script>
	import Window from "$lib/Window/Window.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import Button from "$lib/Button.svelte";
	import { enhance } from "$app/forms";
</script>

<Window>
	{#snippet navigation()}
		<WindowNavigation --width="30%"></WindowNavigation>
	{/snippet}
	<form method="POST" action="/profile" use:enhance style="width: 50%; margin: 32px auto">
		<Button>Выйти из аккаунта</Button>
	</form>
</Window>
