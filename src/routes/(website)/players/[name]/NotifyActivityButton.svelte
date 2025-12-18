<script>
	import WindowHeaderButton from "$lib/Window/WindowHeaderButton.svelte";
	import Dialog from "$lib/components/Dialog.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import IconBellCrossed from "$lib/components/icons/IconBellCrossed.svelte";
	import { isActionFailure, isHttpError } from "@sveltejs/kit";
	import { subscribeToPlayer } from "./data.remote";
	import IconBell from "$lib/components/icons/IconBell.svelte";
	import { page } from "$app/state";
	let { disabled, submitting = $bindable(), subscribed = $bindable(), name } = $props();
	let dialogOpened = $state(false);
	let error = $state();
</script>

<div>
	<WindowHeaderButton
		disabled={disabled || submitting}
		name="Уведомления об активности"
		onclick={async () => {
			if (!page.data.profile) {
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
				if (isHttpError(e)) {
					error = e.body.message;
				} else {
					error = e;
				}
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
	description={error}
	color="var(--red)"
	opened={error !== undefined}
>
	{#snippet icon()}
		<div style="padding: 8px">
			<IconBellCrossed />
		</div>
	{/snippet}
	<DialogButton
		accent
		onclick={() => {
			error = undefined;
		}}
	>
		Закрыть
	</DialogButton>
</Dialog>

<Dialog
	title="Не Удалось Включить Уведомления"
	description="Войдите в аккаунт, чтобы получать уведомления об их активности."
	color="var(--yellow)"
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
