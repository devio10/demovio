<script>
	import Dialog from "$lib/components/Dialog.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import IconBellCrossed from "$lib/components/icons/IconBellCrossed.svelte";
	import IconCheckmark from "$lib/components/icons/IconCheckmark.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import OptionButton from "$lib/components/OptionButton.svelte";
	import { scale } from "svelte/transition";
	import { disableAllPushNotifications } from "./data.remote";
	let dialogOpened = $state(false);
	let loading = $state(false);
	let success = $state(false);
</script>

<OptionButton
	disabled={success}
	onclick={() => {
		dialogOpened = true;
	}}
	style="color: rgb(235, 52, 79)"
>
	Disable all notifications
	{#if success}
		<div class="option-button-icon-container">
			<div class="option-button-icon" transition:scale={{ duration: 300 }}><IconCheckmark /></div>
		</div>
	{/if}
</OptionButton>

<Dialog
	title="Отключить Все Уведомления"
	description="Вы собираетесь отключить уведомления от Demovio во всех привязанных браузерах."
	opened={dialogOpened}
	color="var(--red)"
>
	{#snippet icon()}
		<div style="padding: 6px">
			<IconBellCrossed />
		</div>
	{/snippet}
	<DialogButton
		accent
		style="color: rgb(235, 52, 79)"
		onclick={async () => {
			loading = true;
			await disableAllPushNotifications();
			loading = false;
			success = true;
			dialogOpened = false;
		}}
	>
		{#if loading}
			<LoadingWheel duration={0} --wheel-size="32px" />
		{:else}
			Отключить уведомления
		{/if}
	</DialogButton>
	<DialogButton
		onclick={() => {
			dialogOpened = false;
		}}
	>
		Отмена
	</DialogButton>
</Dialog>
