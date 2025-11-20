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
	let { form } = $props();
	let citizenship = $state(demovioStates[0]);
	let formError = $derived(form?.error);
	let formSuccess = $derived(form?.success);
	let formAccepted = $derived(form?.accepted);
	let submitting = $state(false);
</script>

<svelte:head>
	<title>Профиль Demovio – Смена гражданства</title>
</svelte:head>
<SettingsHeader title="Смена гражданства"></SettingsHeader>
<div class="settings-buttons">
	<p style="line-height: 1.4; margin: 12px 0 0 0; font-size: 16px">
		У вас есть возможность сменить своё гражданство, если вы больше не планируете жить в своём
		штате. Учтите, что гражданство можно менять не чаще, чем раз в 30 дней.
	</p>
</div>
<div class="settings-buttons-space"></div>
<CitizenshipSelector bind:citizenship />
<div class="settings-buttons-space"></div>
{#if typeof citizenship.autoAcceptSwitch === "string"}
	<OptionDescription>{citizenship.autoAcceptSwitch}</OptionDescription>
{/if}
{#if citizenship.acceptOldPlayers === false}
	<OptionDescription>Этот штат на данный момент не принимает новых игроков.</OptionDescription>
{/if}
<form
	action="/profile/change-citizenship?/applyForCitizenship"
	method="POST"
	class="settings-buttons"
	style="margin-top: auto; margin-bottom: 36px"
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
			submitting}
	>
		{#if citizenship.code === undefined}
			Выберите штат
		{:else if !submitting}
			Подать заявку ({citizenship.name})
		{:else}
			<LoadingWheel duration={0} --wheel-size="36px" />
		{/if}
	</Button>
</form>

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
