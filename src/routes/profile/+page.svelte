<script>
	import Window from "$lib/Window/Window.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import Button from "$lib/Button.svelte";
	import { enhance } from "$app/forms";
	let { data } = $props();
</script>

<Window>
	{#snippet navigation()}
		<WindowNavigation --width="30%"></WindowNavigation>
	{/snippet}
	<p>{data.profile.pronouns}</p>
	<form method="POST" action="/profile?/logout" use:enhance style="width: 50%; margin: 32px auto">
		<Button>Выйти из аккаунта</Button>
	</form>
</Window>
