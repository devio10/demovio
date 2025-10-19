<script>
	import { enhance } from "$app/forms";
	import Dialog from "$lib/components/Dialog.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import OptionButton from "$lib/OptionButton.svelte";

	let showDialog = $state(false);
</script>

<form class="settings-buttons" method="POST" action="/profile?/logout" use:enhance>
	<OptionButton style="color: rgb(235, 52, 79)">Выйти из аккаунта</OptionButton>
</form>
