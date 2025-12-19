<script>
	import IconCheckmark from "$lib/components/icons/IconCheckmark.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import OptionButton from "$lib/components/OptionButton.svelte";
	import { scale } from "svelte/transition";
	import { forceReapplySkin } from "./overview/overview.remote";
	import Dialog from "$lib/components/Dialog.svelte";
	import { getCurrentDemovioStatus } from "../status.remote";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import IconExclamationMark from "$lib/components/icons/IconExclamationMark.svelte";
	let loading = $state(false);
	let success = $state(false);
	let error = $state();
	let { name } = $props();
	let demovioStatus = $state(null);
	async function fetchDemovioStatus() {
		demovioStatus = (await getCurrentDemovioStatus()) ?? null;
	}
	$effect(() => {
		fetchDemovioStatus();
	});
</script>

<OptionButton
	onclick={async () => {
		if (!demovioStatus) {
			error = "Сервер Demovio сейчас выключен. Попробуйте позже.";
			return;
		}
		if (!demovioStatus.players.includes(name)) {
			error = "Зайдите на сервер Demovio, чтобы вручную применить скин.";
			return;
		}
		loading = true;
		await forceReapplySkin();
		loading = false;
		success = true;
	}}
	disabled={loading === true}
>
	Принудительно применить скин
	<div class="icon-container">
		{#if loading}
			<div class="block">
				<LoadingWheel --wheel-size="36px" />
			</div>
		{:else if success}
			<div class="icon block" transition:scale={{ duration: 300 }}><IconCheckmark /></div>
		{/if}
	</div>
</OptionButton>
<Dialog title="Не Удалось Применить Скин" description={error} opened={error} color="var(--yellow)">
	{#snippet icon()}
		<div style="padding: 6px;"><IconExclamationMark /></div>
	{/snippet}
	<DialogButton onclick={() => (error = undefined)}>Закрыть</DialogButton>
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
