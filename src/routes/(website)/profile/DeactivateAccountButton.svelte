<script>
	import { enhance } from "$app/forms";
	import Dialog from "$lib/components/Dialog.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import IconDoor from "$lib/components/icons/IconDoor.svelte";
	import OptionButton from "$lib/components/OptionButton.svelte";
	let openedDialog = $state(false);
</script>

<div class="settings-buttons">
	<OptionButton onclick={() => (openedDialog = true)} style="color: rgb(235, 52, 79)">
		Деактивировать аккаунт
	</OptionButton>
</div>

<Dialog
	title="Деактивация Аккаунта"
	opened={openedDialog}
	color="var(--red)"
	description="Пожалуйста, тщательно обдумайте решение уйти от нас. В крайнем случае, вы можете вернуться в течение следующих 30 дней."
>
	{#snippet icon()}
		<div style="padding: 6px"><IconDoor /></div>
	{/snippet}
	<form method="POST" style="width: 100%;" action="/profile?/deactivateAccount" use:enhance>
		<DialogButton accent style="color: rgb(235, 52, 79)">Деактивировать аккаунт</DialogButton>
	</form>
	<DialogButton onclick={() => (openedDialog = false)}>Отмена</DialogButton>
</Dialog>
