<script>
	import WindowHeaderButton from "$lib/Window/WindowHeaderButton.svelte";
	import Dialog from "$lib/components/Dialog.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import IconBellCrossed from "$lib/components/icons/IconBellCrossed.svelte";
	import { isActionFailure } from "@sveltejs/kit";
	import { getPlayers } from "../data.remote";
	import { subscribeToPlayer } from "./data.remote";
	import IconBell from "$lib/components/icons/IconBell.svelte";
	let { disabled, submitting = $bindable(), loggedIn, subscribed, name } = $props();
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
			try {
				const req = await subscribeToPlayer(name).updates();
				if (isActionFailure(req)) {
					throw new Error(req.data);
				}
				subscribed = req.subscribed;
			} catch (e) {
				alert(e);
			}
		}}
	>
		{#if subscribed}
			<IconBell />
		{:else}
			<IconBellCrossed />
		{/if}
	</WindowHeaderButton>
</div>

<Dialog
	title="Не Удалось Включить Уведомления"
	description="Войдите в аккаунт, чтобы получать уведомления об их активности."
	color="rgb(252, 189, 28)"
	opened={dialogOpened}
>
	{#snippet icon()}
		<div style="padding: 8px">
			<IconBellCrossed />
		</div>
	{/snippet}
	<DialogButton
		onclick={() => {
			dialogOpened = false;
		}}
	>
		Войти в аккаунт
	</DialogButton>
	<DialogButton
		accent
		onclick={() => {
			dialogOpened = false;
		}}
	>
		Закрыть
	</DialogButton>
</Dialog>
