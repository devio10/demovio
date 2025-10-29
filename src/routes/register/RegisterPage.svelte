<script lang="ts" generics="T extends keyof SvelteHTMLElements">
	import type { Action } from "svelte/action";
	import type { SvelteHTMLElements } from "svelte/elements";
	import { scale } from "svelte/transition";

	let {
		children,
		tag,
		useEnhance,
		...props
	}: { tag?: T; useEnhance?: Action } & SvelteHTMLElements[T] = $props();
</script>

<svelte:element
	this={tag ?? "div"}
	class="register-page"
	transition:scale={{ duration: 250, start: 0.95 }}
	use:useEnhance
	{...props}
>
	{@render children?.()}
</svelte:element>

<style lang="scss">
	.register-page {
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-bottom: 32px;
	}
	@media screen and (max-width: 768px) {
		.register-page {
			padding-bottom: 92px;
		}
	}
</style>
