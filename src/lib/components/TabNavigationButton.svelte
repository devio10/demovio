<script lang="ts" generics="T extends keyof SvelteHTMLElements">
	import type { SvelteHTMLElements } from "svelte/elements";
	let { children, tag, ...props }: { tag?: T } & SvelteHTMLElements[T] = $props();
</script>

<svelte:element this={tag ?? "button"} {...props} class="button">
	<div class="highlight">
		{@render children?.()}
	</div>
</svelte:element>

<style lang="scss">
	.button {
		height: 100%;
		cursor: pointer;
		border: none;
		background: none;
		display: flex;
		align-items: center;
		font-size: 14px;
		justify-content: center;
		padding: 0;
		font-weight: 500;
		z-index: 2;
		color: rgba(250, 250, 250, 0.9);
		.highlight {
			height: calc(100% - 24px);
			padding: 0 18px;
			border-radius: 100px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&:hover {
			color: white;
		}
	}
	@media screen and (max-width: 768px) {
		.button {
			.highlight {
				height: calc(100% - 16px);
			}
		}
	}
</style>
