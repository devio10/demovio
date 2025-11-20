<script>
	import IconCheckmark from "$lib/components/icons/IconCheckmark.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import OptionButton from "$lib/components/OptionButton.svelte";
	import { scale } from "svelte/transition";
	import { forceReapplySkin } from "./overview/overview.remote";
	let loading = $state(false);
	let success = $state(false);
</script>

<OptionButton
	onclick={async () => {
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
			<div>
				<LoadingWheel --wheel-size="36px" />
			</div>
		{:else if success}
			<div class="icon" transition:scale={{ duration: 300 }}><IconCheckmark /></div>
		{/if}
	</div>
</OptionButton>

<style lang="scss">
	.icon-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	div {
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
