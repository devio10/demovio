<script lang="ts">
	import { getHeaderHeightContext } from "$lib/scripts";
	import { type Snippet } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";
	let headerHeightContext = getHeaderHeightContext();
	let { children, ...props }: { children?: Snippet } & SvelteHTMLElements["ul"] = $props();
</script>

<ul {...props} style="--padding: {headerHeightContext.headerHeight}px; {props.style}">
	{@render children?.()}
</ul>

<style>
	ul {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding-inline-start: 0;
		padding: 0 24px;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-base-color: rgba(0, 0, 0, 0);
		margin: 0;
		padding-top: var(--padding);
		padding-bottom: 24px;
		mask:
			linear-gradient(
				to bottom,
				transparent 0%,
				transparent calc(var(--padding) - 16px),
				black var(--padding)
			),
			linear-gradient(to right, transparent 0%, transparent 97%, black 95.1%);
		mask-size: cover;
		mask-repeat: no-repeat;
		list-style: none;
	}
</style>
