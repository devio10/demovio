<script>
	import WindowHeaderButton from "$lib/Window/WindowHeaderButton.svelte";
	import { isActionFailure } from "@sveltejs/kit";
	import { favoritePlayer } from "./data.remote";
	import { getPlayers } from "../data.remote";
	import Dialog from "$lib/components/Dialog.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import IconStar from "$lib/components/icons/IconStar.svelte";
	import IconStarHollow from "$lib/components/icons/IconStarHollow.svelte";
	let { disabled, name, submitting = $bindable(), featured = $bindable(), loggedIn } = $props();
	let dialogOpened = $state(false);
</script>

<div>
	<WindowHeaderButton
		disabled={disabled || submitting}
		name="Избранное"
		onclick={async () => {
			if (!loggedIn) {
				dialogOpened = true;
				return;
			}
			try {
				const req = await favoritePlayer(name).updates(getPlayers());
				if (isActionFailure(req)) {
					throw new Error(req.data);
				}
				featured = req.featured;
			} catch (e) {
				alert(e);
			}
		}}
	>
		{#if featured}
			<IconStar />
		{:else}
			<IconStarHollow />
		{/if}
	</WindowHeaderButton>
</div>

<Dialog
	title="Не Удалось Добавить в Избранное"
	description="Войдите в аккаунт, чтобы сохранять игроков в избранное."
	color="rgb(252, 189, 28)"
	opened={dialogOpened}
>
	{#snippet icon()}
		<div style="padding: 8px">
			<IconStarHollow />
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
