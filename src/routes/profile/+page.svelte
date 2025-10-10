<script>
	import Button from "$lib/Button.svelte";
	import { enhance } from "$app/forms";
	import Passport from "$lib/Passport.svelte";
	import WindowHeader from "$lib/Window/WindowHeader.svelte";
	let { data } = $props();
</script>

<WindowHeader title={data.profile.name}></WindowHeader>
<form method="POST" action="/profile?/logout" use:enhance style="width: 50%; margin: 32px auto">
	<Button>Выйти из аккаунта</Button>
</form>
