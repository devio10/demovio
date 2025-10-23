<script>
	import SettingsButton from "$lib/components/OptionButton.svelte";
	import { custom } from "zod";
	import { RegisterStage } from "./stages";
	import TextInput from "$lib/components/TextInput.svelte";
	import Button from "$lib/components/Button.svelte";
	import OptionButtonCheckmark from "$lib/components/OptionButtonCheckmark.svelte";
	import { scale, slide } from "svelte/transition";

	let { page = $bindable(), pronouns = $bindable() } = $props();
	let customPronouns = $state(false);
	$inspect(pronouns);
	const allPronouns = ["он/его", "она/её", "они/их"];
</script>

<div class="register-page" transition:scale={{ duration: 250, start: 0.95 }}>
	<div style="padding-bottom: 16px;">
		{#each allPronouns as prn}
			<SettingsButton
				onclick={() => {
					customPronouns = false;
					pronouns = prn;
				}}
			>
				{prn}
				<OptionButtonCheckmark value={pronouns === prn} />
			</SettingsButton>
		{/each}
		<SettingsButton
			onclick={() => {
				pronouns = undefined;
				customPronouns = false;
			}}
		>
			Не указывать
			<OptionButtonCheckmark value={pronouns === undefined} />
		</SettingsButton>
		<SettingsButton
			onclick={() => {
				pronouns = "custom";
				customPronouns = true;
			}}
		>
			Другое
			<OptionButtonCheckmark value={customPronouns} />
		</SettingsButton>
	</div>
	{#if customPronouns}
		<div style="padding-bottom: 16px" transition:slide={{ duration: 300 }}>
			<TextInput placeholder="Укажите ваши местоимения" autocorrect="off" autocapitalize="off" />
		</div>
	{/if}
	<Button
		onclick={() => {
			page = RegisterStage.leaveContact;
		}}
		style="margin-top: auto"
	>
		Продолжить
	</Button>
</div>
