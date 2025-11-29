<script>
	import SettingsButton from "$lib/components/OptionButton.svelte";
	import { RegisterStage } from "./stages";
	import TextInput from "$lib/components/TextInput.svelte";
	import Button from "$lib/components/Button.svelte";
	import OptionButtonCheckmark from "$lib/components/OptionButtonCheckmark.svelte";
	import { slide } from "svelte/transition";
	import { enhance } from "$app/forms";
	import RegisterFormError from "./RegisterFormError.svelte";
	import RegisterPage from "./RegisterPage.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";

	let {
		page = $bindable(),
		pronouns = $bindable(),
		formError = $bindable(),
		submitting = $bindable(),
	} = $props();

	let customPronouns = $state(false);
	const allPronouns = ["он/его", "она/её", "они/их"];
</script>

<RegisterPage>
	<div class="mobile-scrollable">
		<div style="padding-bottom: 24px;">
			{#each allPronouns as prn}
				<SettingsButton
					onclick={() => {
						customPronouns = false;
						pronouns = prn;
						formError = undefined;
					}}
				>
					{prn}
					<OptionButtonCheckmark value={pronouns === prn} />
				</SettingsButton>
			{/each}
			<SettingsButton
				onclick={() => {
					pronouns = null;
					customPronouns = false;
					formError = undefined;
				}}
			>
				Не указывать
				<OptionButtonCheckmark value={pronouns === null} />
			</SettingsButton>
			<SettingsButton
				onclick={() => {
					pronouns = "";
					customPronouns = true;
					formError = undefined;
				}}
			>
				Другое
				<OptionButtonCheckmark value={customPronouns} />
			</SettingsButton>
		</div>
		{#if customPronouns}
			<div style="padding-bottom: 16px" transition:slide={{ duration: 300 }}>
				<TextInput
					bind:value={pronouns}
					placeholder="Укажите ваши местоимения"
					autocorrect="off"
					autocapitalize="off"
					oninput={() => (formError = undefined)}
				/>
			</div>
		{/if}
	</div>
	{#if formError?.invalidPronouns}
		<div class="warning" transition:slide={{ duration: 200 }}>
			<RegisterFormError>{formError.invalidPronouns}</RegisterFormError>
		</div>
	{/if}
	<form
		method="POST"
		action="/register?/checkPronouns"
		style="display: contents"
		use:enhance={({ cancel }) => {
			formError = undefined;
			submitting = true;
			if (pronouns === "") {
				formError = { invalidPronouns: "Введите свои местоимения." };
				submitting = false;
				return cancel();
			}
			return ({ update, result }) => {
				submitting = false;
				if (result.type === "success") {
					page = RegisterStage.leaveContact;
				}
				update({ reset: false });
			};
		}}
	>
		{#if pronouns !== null}
			<input type="hidden" value={pronouns} name="pronouns" />
		{/if}
		<Button type="submit" style="margin: auto 0 0 0">
			{#if submitting}
				<LoadingWheel duration={0} --wheel-size="36px" />
			{:else}
				Продолжить
			{/if}
		</Button>
	</form>
</RegisterPage>
