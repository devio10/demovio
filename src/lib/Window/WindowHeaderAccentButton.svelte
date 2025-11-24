<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	let {
		children,
		name,
		...props
	}: {
		children: Snippet;
		name: string;
	} & HTMLButtonAttributes = $props();
</script>

<button aria-label={name} {...props}>
	{@render children?.()}
</button>

<style lang="scss">
	button {
		width: auto;
		height: 42px;
		display: flex;
		padding: 0 12px;
		font-size: 14px;
		align-items: center;
		justify-content: center;
		gap: 6px;
		background-color: #0a84ff;
		color: #fcf7f1;
		border-radius: 100px;
		border: 0.5px solid rgba(230, 230, 230, 0.3);
		border-left: none;
		border-bottom: none;
		z-index: 5;
		transition-property: scale, background-color;
		transition-duration: 250ms;
		transition-timing-function: ease-out;
		margin: 16px 24px;
		box-shadow: -2px 2px 5px 1px rgba(0, 0, 0, 0.2);
		&:disabled {
			background-color: rgba(255, 255, 255, 0.4);
		}
		&:not(:disabled) {
			cursor: pointer;
		}
		&:hover:not(:disabled) {
			background-color: rgba(255, 255, 255, 0.4);
			scale: 1.05;
			transition-duration: 100ms;
		}
		&:active:not(:disabled) {
			background-color: rgba(230, 230, 230, 0.4);
			scale: 0.97;
		}
		:global {
			svg {
				width: 20px;
				height: 20px;
			}
		}
	}
</style>
