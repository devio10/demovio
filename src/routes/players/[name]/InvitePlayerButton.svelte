<script>
	import Dialog from "$lib/components/Dialog.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import NoInvitation from "$lib/components/icons/IconNoInvitation.svelte";
	import SettingsButton from "$lib/components/OptionButton.svelte";
	let dialogOpened = $state(false);
	let { contact } = $props();
</script>

<SettingsButton
	onclick={() => {
		dialogOpened = true;
	}}
>
	Пригласить на сервер
</SettingsButton>

<Dialog
	title="Не Удалось Отправить Приглашение"
	description="Игрок запретил приглашать себя в игру."
	color="rgb(253, 58, 58)"
	opened={dialogOpened}
>
	{#snippet icon()}
		<NoInvitation />
	{/snippet}
	{#if contact}
		<DialogButton
			tag="a"
			onclick={() => {
				dialogOpened = false;
			}}
			href="https://t.me/{contact}"
		>
			Написать в Telegram
		</DialogButton>
	{/if}
	<DialogButton
		accent
		onclick={() => {
			dialogOpened = false;
		}}
	>
		Закрыть
	</DialogButton>
</Dialog>
