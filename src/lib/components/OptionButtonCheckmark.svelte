<script>
	import IconCheckmark from "./icons/IconCheckmark.svelte";

	let { value } = $props();
</script>

<div class={{ active: value }}>
	{#if value}
		<IconCheckmark />
	{/if}
</div>

<style lang="scss">
	div {
		width: 28px;
		height: 28px;
		border-radius: 100%;
		background-color: rgba(60, 60, 60, 0.4);
		border: 2px solid rgba(255, 255, 255, 0.32);
		padding: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		// background-color: #0a84ff;

		&.active {
			background-color: #0a84ff;
			border: none;
		}
		:global {
			svg {
				width: 100%;
				height: 100%;
			}
		}
	}
	:global([data-prefers-contrast]) {
		div {
			background-color: var(--general-option-button);
			border: none;
			&.active {
				background-color: #0a84ff;
				color: white;
			}
		}
	}
</style>
