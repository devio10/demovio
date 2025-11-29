<script lang="ts">
	import { page } from "$app/state";
	import Dialog from "$lib/components/Dialog.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import NoInvitation from "$lib/components/icons/IconNoInvitation.svelte";
	import SettingsButton from "$lib/components/OptionButton.svelte";
	import { isActionFailure, isHttpError } from "@sveltejs/kit";
	import { invitePlayer } from "./data.remote";
	import { scale } from "svelte/transition";
	import IconCheckmark from "$lib/components/icons/IconCheckmark.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	let dialogOpened = $state(false);
	let { contact, name }: { contact: string | undefined; name: string | undefined } = $props();
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
	disabled={submitting || success}
	onclick={async () => {
		if (!page.data.profile) {
			dialogOpened = true;
			return;
		}
		if (!name) {
			return;
		}
		submitting = true;
		success = false;
		try {
			const req = await invitePlayer(name);
			submitting = false;
			if (isActionFailure(req)) {
				throw new Error(req.data);
			}
			success = true;
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
	Пригласить на сервер
	<div class="icon-container">
		{#if submitting}
			<div class="block">
				<LoadingWheel --wheel-size="36px" />
			</div>
		{:else if success}
			<div class="icon block" transition:scale={{ duration: 300 }}><IconCheckmark /></div>
		{/if}
	</div>
</SettingsButton>

<Dialog
	title="Не Удалось Отправить Приглашение"
	description="Войдите в аккаунт, чтобы пригласить игрока на сервер."
	color="var(--yellow)"
	opened={dialogOpened}
>
	{#snippet icon()}
		<NoInvitation />
	{/snippet}
	<DialogButton
		tag="a"
		href="/login"
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

<Dialog
	title="Не Удалось Отправить Приглашение"
	description={error}
	color="var(--red)"
	opened={error}
>
	{#snippet icon()}
		<NoInvitation />
	{/snippet}
	{#if contact}
		<DialogButton
			tag="a"
			onclick={() => {
				error = undefined;
			}}
			href="https://t.me/{contact}"
		>
			Написать в Telegram
		</DialogButton>
	{/if}
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
		&.icon {
			width: 16px;
			height: 16px;
			:global {
				svg {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
