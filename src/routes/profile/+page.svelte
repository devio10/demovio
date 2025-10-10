<script>
	import Button from "$lib/Button.svelte";
	import { enhance } from "$app/forms";
	import Passport from "$lib/Passport.svelte";
	let { data } = $props();
</script>

<p>{data.profile.pronouns}</p>
<form method="POST" action="/profile?/logout" use:enhance style="width: 50%; margin: 32px auto">
	<Button>Выйти из аккаунта</Button>
</form>
