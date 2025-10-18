<script>
	import WindowHeaderButton from "$lib/Window/WindowHeaderButton.svelte";
	import Dialog from "$lib/components/Dialog.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import IconStarHollow from "$lib/components/icons/IconStarHollow.svelte";
	import IconBellCrossed from "$lib/components/icons/IconBellCrossed.svelte";
	let { disabled, submitting = $bindable(), loggedIn } = $props();
	let dialogOpened = $state(false);
</script>

<div>
	<WindowHeaderButton
		disabled={disabled || submitting}
		name="Уведомления об активности"
		onclick={async () => {
			if (!loggedIn) {
				dialogOpened = true;
				return;
			}
		}}
	>
		<IconBellCrossed />
	</WindowHeaderButton>
</div>

<Dialog
	title="Не Удалось Включить Уведомления"
	description="Войдите в аккаунт, чтобы сохранять игроков в избранное и получать уведомления об их активности."
	color="rgb(252, 189, 28)"
	opened={dialogOpened}
>
	{#snippet icon()}
		<div style="padding: 8px">
			<IconBellCrossed />
		</div>
	{/snippet}
	<DialogButton
		accent
		onclick={() => {
			dialogOpened = false;
		}}
	>
		Закрыть
	</DialogButton>
	<DialogButton
		onclick={() => {
			dialogOpened = false;
		}}
	>
		Войти в аккаунт
	</DialogButton>
</Dialog>
