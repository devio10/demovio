<script>
	import { enhance } from "$app/forms";
	import Button from "$lib/components/Button.svelte";
	import CitizenshipSelector from "$lib/components/CitizenshipSelector.svelte";
	import { demovioStates } from "$lib/components/demovio-states";
	import Dialog from "$lib/components/Dialog.svelte";
	import IconCitizenshipAccepted from "$lib/components/icons/IconCitizenshipAccepted.svelte";
	import IconClock from "$lib/components/icons/IconClock.svelte";
	import IconExclamationMark from "$lib/components/icons/IconExclamationMark.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import SettingsContent from "../SettingsContent.svelte";
	let { form, data } = $props();
	let citizenship = $state(demovioStates[0]);
	let formError = $derived(form?.error);
	let formSuccess = $derived(form?.success);
	let formAccepted = $derived(form?.accepted);
	let submitting = $state(false);
</script>

<svelte:head>
	<title>Профиль Demovio – Change Citizenship</title>
</svelte:head>
<SettingsHeader title="Change Citizenship"></SettingsHeader>
<SettingsContent style="min-height: 100%;">
	<div class="settings-buttons">
		<p style="line-height: 1.4; margin: 12px 0 0 0; font-size: 16px">
			You can change your citizenship if you no longer plan to live in your current state. Please
			note that citizenship can be changed no more than once every 30 days.
		</p>
	</div>
	<div class="settings-buttons-space"></div>
	<CitizenshipSelector bind:citizenship />
	<div class="settings-buttons-space"></div>
	{#if typeof citizenship.autoAcceptSwitch === "string"}
		<OptionDescription>{citizenship.autoAcceptSwitch}</OptionDescription>
	{/if}
	{#if citizenship.acceptOldPlayers === false}
		<OptionDescription>This state doesn't accept new players at this moment.</OptionDescription>
	{/if}
	<form
		action="/profile/change-citizenship?/applyForCitizenship"
		method="POST"
		class="settings-buttons form"
		use:enhance={() => {
			formError = undefined;
			submitting = true;
			return ({ update }) => {
				submitting = false;
				update({ reset: false });
			};
		}}
	>
		<input type="hidden" value={citizenship.shortCode} name="stateCode" />
		<Button
			disabled={citizenship.acceptOldPlayers === false ||
				citizenship.code === undefined ||
				data.profile?.citizenship.code === citizenship.shortCode ||
				submitting}
		>
			{#if citizenship.code === undefined}
				Choose a new state
			{:else if data.profile?.citizenship.code === citizenship.shortCode}
				Your current state
			{:else if !submitting}
				Submit ({citizenship.name})
			{:else}
				<LoadingWheel duration={0} --wheel-size="36px" />
			{/if}
		</Button>
	</form>
</SettingsContent>

<Dialog
	opened={formError?.wrongData}
	title="Ошибка При Смене Гражданства"
	description={formError?.wrongData}
	color="var(--red)"
>
	{#snippet icon()}
		<div style="padding: 6px">
			<IconExclamationMark />
		</div>
	{/snippet}
</Dialog>
<Dialog
	opened={formError?.tooEarly}
	title="Ошибка При Смене Гражданства"
	description={formError?.tooEarly}
	color="var(--red)"
>
	{#snippet icon()}
		<div style="padding: 6px">
			<IconExclamationMark />
		</div>
	{/snippet}
</Dialog>
<Dialog
	opened={formError?.alreadyCitizen}
	title="Ошибка При Смене Гражданства"
	description={formError?.alreadyCitizen}
	color="var(--red)"
>
	{#snippet icon()}
		<div style="padding: 6px">
			<IconExclamationMark />
		</div>
	{/snippet}
</Dialog>
<Dialog
	opened={formSuccess}
	title="Ваша Заявка в Рассмотрении"
	description="Мы пришлём вам уведомление, когда штат рассмотрит вашу заявку."
	color="var(--yellow)"
>
	{#snippet icon()}
		<div style="padding: 6px">
			<IconClock />
		</div>
	{/snippet}
</Dialog>
<Dialog
	opened={formAccepted}
	title="Ваше Гражданство Изменено"
	description="Вы сможете поменять его ещё раз через 30 дней."
	color="var(--green)"
>
	{#snippet icon()}
		<div style="padding: 8px;">
			<IconCitizenshipAccepted />
		</div>
	{/snippet}
</Dialog>

<style>
	.form {
		margin-top: auto;
		margin-bottom: 36px;
	}
</style>
