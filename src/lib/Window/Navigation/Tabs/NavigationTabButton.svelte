<script lang="ts" generics="T extends keyof SvelteHTMLElements">
	import type { SvelteHTMLElements } from "svelte/elements";
	let { children, tag, onclick, ...props }: { tag?: T } & SvelteHTMLElements[T] = $props();
</script>

<svelte:element this={tag ?? "button"} {onclick} {...props} class="button">
	<div>
		{@render children?.()}
	</div>
</svelte:element>

<style lang="scss">
	.button {
		border: 1px solid rgba(230, 230, 230, 0.4);
		border-left: none;
		background-color: rgba(230, 230, 230, 0.15);
		border-bottom: none;

		cursor: pointer;

		flex-shrink: 0;
		white-space: nowrap;
		scrollbar-width: none;
		border-radius: 100px;
		font-weight: 600;
		font-size: 13px;
		padding: 8px 16px;
	}
</style>
