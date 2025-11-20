<script lang="ts">
	import { reactivateAccount } from "../routes/reactivate.remote";
	import Dialog from "./components/Dialog.svelte";
	import DialogButton from "./components/DialogButton.svelte";
	import IconHandWaving from "./components/icons/IconHandWaving.svelte";
	import LoadingWheel from "./components/LoadingWheel.svelte";
	let { profile } = $props();
	let loading = $state(false);
	let opened = $state(true);
</script>

{#if profile && profile.isDeactivated}
	<Dialog
		title="С Возвращением!"
		description="Мы рады, что вы вернулись! Чтобы продолжить, активируйте свой аккаунт."
		{opened}
	>
		{#snippet icon()}
			<div style="padding: 6px"><IconHandWaving /></div>
		{/snippet}
		<DialogButton
			onclick={async () => {
				loading = true;
				await reactivateAccount();
				loading = false;
				opened = false;
			}}
		>
			{#if loading}
				<LoadingWheel duration={0} --wheel-size="32px" />
			{:else}
				Активировать аккаунт
			{/if}
		</DialogButton>
	</Dialog>
{/if}
