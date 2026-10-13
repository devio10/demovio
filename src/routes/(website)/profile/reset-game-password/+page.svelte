<script>
	import Button from "$lib/components/Button.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import { isActionFailure, isHttpError } from "@sveltejs/kit";
	import SettingsContent from "../SettingsContent.svelte";
	import { resetGamePassword } from "./resetpassword.remote";
	import Dialog from "$lib/components/Dialog.svelte";
	import IconExclamationMark from "$lib/components/icons/IconExclamationMark.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import IconKey from "$lib/components/icons/IconKey.svelte";
	import { getCurrentDemovioStatus } from "../../status.remote";
	let { data } = $props();
	let submitting = $state(false);
	let password = $state();
	let repeatPassword = $state();
	let error = $state();
	let success = $state(false);

	let demovioStatus = $state(null);
	async function fetchDemovioStatus() {
		demovioStatus = (await getCurrentDemovioStatus()) ?? null;
	}
	$effect(() => {
		fetchDemovioStatus();
	});
</script>

<svelte:head>
	<title>Профиль Demovio – Сброс игрового пароля</title>
</svelte:head>
<SettingsHeader title="Reset Game Passowrd"></SettingsHeader>
<SettingsContent style="min-height: 100%;">
	<div class="settings-buttons">
		<p style="line-height: 1.4; margin: 12px 0 0 0; font-size: 16px">
			If you have forgotten your password for logging into the Demovio server, you can reset it.
			Please note that the website uses a separate password for signing in.
		</p>
		<div class="settings-buttons-space"></div>
		<TextInput
			style="margin-bottom: 16px"
			placeholder="New password"
			name="password"
			type="password"
			disabled={submitting}
			bind:value={password}
		>
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 12.832 24.2449"
			>
				<path
					d="M6.24023 0.144902C2.76367 0.144902 0 2.90857 0 6.36561C0 8.97303 1.5625 11.2777 4.00391 12.2054L4.00391 21.8441C4.00391 22.0883 4.08203 22.2738 4.25781 22.4594L5.88867 24.1C6.05469 24.266 6.38672 24.3148 6.5918 24.1097L9.6875 21.014C9.89258 20.7992 9.88281 20.516 9.6875 20.3109L7.76367 18.4164L10.4004 15.7894C10.5859 15.5941 10.5859 15.3109 10.3809 15.0961L7.77344 12.4691C10.791 11.2679 12.4707 9.04139 12.4707 6.36561C12.4707 2.92811 9.6875 0.144902 6.24023 0.144902ZM6.24023 5.86756C5.33203 5.86756 4.60938 5.13514 4.60938 4.2367C4.60938 3.3285 5.32227 2.60584 6.24023 2.60584C7.13867 2.60584 7.87109 3.3285 7.87109 4.2367C7.87109 5.13514 7.13867 5.86756 6.24023 5.86756Z"
					fill="currentColor"
				/>
			</svg>
		</TextInput>
		<TextInput
			style="margin-bottom: 16px"
			placeholder="Repeat the password"
			name="password"
			type="password"
			disabled={submitting}
			bind:value={repeatPassword}
		>
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 12.832 24.2449"
			>
				<path
					d="M6.24023 0.144902C2.76367 0.144902 0 2.90857 0 6.36561C0 8.97303 1.5625 11.2777 4.00391 12.2054L4.00391 21.8441C4.00391 22.0883 4.08203 22.2738 4.25781 22.4594L5.88867 24.1C6.05469 24.266 6.38672 24.3148 6.5918 24.1097L9.6875 21.014C9.89258 20.7992 9.88281 20.516 9.6875 20.3109L7.76367 18.4164L10.4004 15.7894C10.5859 15.5941 10.5859 15.3109 10.3809 15.0961L7.77344 12.4691C10.791 11.2679 12.4707 9.04139 12.4707 6.36561C12.4707 2.92811 9.6875 0.144902 6.24023 0.144902ZM6.24023 5.86756C5.33203 5.86756 4.60938 5.13514 4.60938 4.2367C4.60938 3.3285 5.32227 2.60584 6.24023 2.60584C7.13867 2.60584 7.87109 3.3285 7.87109 4.2367C7.87109 5.13514 7.13867 5.86756 6.24023 5.86756Z"
					fill="currentColor"
				/>
			</svg>
		</TextInput>
	</div>
	<div class="settings-buttons button">
		<Button
			disabled={submitting}
			onclick={async () => {
				if (data.profile?.haveLicense) {
					error = "Вам не нужен пароль для входа в игру, так как вы обладаете лицензией.";
					return;
				}
				if (!demovioStatus) {
					error = "Сервер Demovio сейчас выключен. Попробуйте позже.";
					return;
				}
				if (!password) {
					error = "Введите новый пароль.";
					return;
				}
				if (password !== repeatPassword) {
					error = "Пароли не совпадают.";
					return;
				}
				submitting = true;
				try {
					const req = await resetGamePassword({ password: password });
					if (isActionFailure(req)) {
						throw new Error(req.data);
					}
					submitting = false;
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
			{#if !submitting}
				Reset
			{:else}
				<LoadingWheel duration={0} --wheel-size="36px" />
			{/if}
		</Button>
	</div>
</SettingsContent>

<Dialog
	title="Ошибка При Сбросе Пароля"
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
<Dialog
	title="Сброс Пароля"
	description="Ваш пароль для входа в игру успешно сброшен."
	color="var(--green)"
	opened={success}
>
	{#snippet icon()}
		<div style="padding: 4px">
			<IconKey />
		</div>
	{/snippet}
	<DialogButton
		accent
		onclick={() => {
			success = false;
		}}
	>
		Закрыть
	</DialogButton>
</Dialog>

<style>
	.button {
		margin-top: auto;
		margin-bottom: 36px;
	}
</style>
