<script lang="ts">
	import { page } from "$app/state";
	import Dialog from "$lib/components/Dialog.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import SettingsButton from "$lib/components/OptionButton.svelte";
	import { isActionFailure, isHttpError } from "@sveltejs/kit";
	import { backstageBanPlayer } from "./data.remote";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import IconBackstage from "$lib/components/icons/IconBackstage.svelte";
	import IconExclamationMark from "$lib/components/icons/IconExclamationMark.svelte";
	import { getPlayers } from "../data.remote";
	let dialogOpened = $state(false);
	let { name, banned = $bindable() }: { name: string | undefined; banned: boolean } = $props();
	let submitting = $state(false);
	let success = $state(false);
	let error = $state();
	$effect(() => {
		if (name) {
			success = false;
		}
	});
</script>

<SettingsButton
	disabled={submitting}
	style="color: rgb(235, 52, 79)"
	onclick={async () => {
		if (!page.data.profile) {
			error = true;
			return;
		}
		if (!name) {
			return;
		}
		submitting = true;
		success = false;
		try {
			const req = await backstageBanPlayer({ name: name, value: !banned }).updates(getPlayers());
			submitting = false;
			if (isActionFailure(req)) {
				throw new Error(req.data);
			}
			success = true;
			banned = !banned;
			dialogOpened = true;
		} catch (e) {
			if (isHttpError(e)) {
				error = e.body.message;
			} else {
				error = e;
			}
			submitting = false;
		}
	}}
>
	{banned ? "Разблокировать" : "Заблокировать"} аккаунт
	<div class="icon-container">
		{#if submitting}
			<div class="block">
				<LoadingWheel --wheel-size="36px" />
			</div>
		{/if}
	</div>
</SettingsButton>

<Dialog
	title={!banned ? "Игрок Заблокирован" : "Игрок Разблокирован"}
	description={!banned
		? "Он больше не сможет заходить на сервер и пользоваться некоторыми функциями сайта Demovio."
		: "Возобновлён доступ к серверу и всем функциям сайта Demovio."}
	color="var(--purple)"
	opened={dialogOpened}
>
	{#snippet icon()}
		<div style="padding: 4px">
			<IconBackstage />
		</div>
	{/snippet}
</Dialog>

<Dialog
	title="Произошла Ошибка"
	description={error}
	color="var(--red)"
	opened={error !== undefined}
>
	{#snippet icon()}
		<div style="padding: 4px">
			<IconExclamationMark />
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

<style lang="scss">
	.icon-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.block {
		position: absolute;
		right: 0;
	}
</style>
