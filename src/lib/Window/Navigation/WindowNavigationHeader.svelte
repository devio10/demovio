<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	let height = $state();
	let { children, title }: { children?: Snippet; title: string } = $props();
	let headerHeightContext = getContext("headerHeightContext");
	$effect(() => {
		headerHeightContext.headerHeight = height;
	});
</script>

<div bind:offsetHeight={height}>
	<h2 style="margin-bottom: 16px;">{title}</h2>
	{@render children?.()}
</div>

<style>
	div {
		padding: 24px;
		margin-bottom: 16px;
		position: absolute;
		z-index: 10;

		width: 100%;
		top: 0;
		h2 {
			margin: 0;
			font-size: 28px;
			font-weight: bold;
		}
	}
</style>
