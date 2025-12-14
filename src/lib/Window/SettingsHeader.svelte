<script lang="ts">
	import { getContentScrollContext } from "$lib/scripts";
	import type { Snippet } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";
	import WindowBackButton from "./Navigation/WindowBackButton.svelte";
	import { fade } from "svelte/transition";

	let {
		children,
		title,
		subtitle,
		doFade = true,
		...props
	}: {
		children?: Snippet;
		doFade?: boolean;
		title: string;
		subtitle?: Snippet;
	} & SvelteHTMLElements["div"] = $props();
	let contentScrollContext = getContentScrollContext();
	let titleHideProgress = $state(0);
	$effect(() => {
		titleHideProgress = Math.min(Math.max(contentScrollContext.contentScroll * 0.01, -0.3), 1);
	});
</script>

<div class="content" {...props} transition:fade|global={{ duration: doFade ? 100 : 0 }}>
	<div><WindowBackButton /></div>
	<div class="text">
		<h2 style="scale: {1 - titleHideProgress}; opacity: {1 - titleHideProgress}">{title}</h2>
		{@render subtitle?.()}
	</div>
	<div class="buttons">
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	.content {
		width: 100%;
		padding: 24px 36px 24px 36px;
		// display: flex;
		// justify-content: center;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		// height: 98px;
		position: absolute;
		z-index: 3;
		h2 {
			margin: 0;
			height: 34px;
			font-size: 20px;
			font-weight: bold;
		}
		.text,
		.buttons {
			display: flex;
			gap: 12px;
			&.text {
				flex-direction: column;
			}
		}
	}
	@media screen and (max-width: 768px) {
		.content {
			padding: 16px 26px;
			padding-top: calc(env(safe-area-inset-top, 0) + 16px);
			h2 {
				font-size: 18px;
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
	}
</style>
