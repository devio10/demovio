<script lang="ts">
	import { getHeaderHeightContext } from "$lib/scripts";
	import { type Snippet } from "svelte";
	let height: number = $state(0);
	let {
		children,
		title,
		subtitle,
		...props
	}: { children?: Snippet; title: string; subtitle?: Snippet } = $props();
	let headerHeightContext = getHeaderHeightContext();
	$effect(() => {
		headerHeightContext.headerHeight = height;
	});
</script>

<div bind:offsetHeight={height} class="header" {...props}>
	<div class="text">
		<h2>{title}</h2>
		{@render subtitle?.()}
	</div>
	<div class="content">
		{@render children?.()}
	</div>
</div>

<style>
	.header {
		padding: 24px;
		margin-bottom: 16px;
		position: absolute;
		display: flex;
		flex-direction: column;
		/* justify-content: space-between; */
		z-index: 10;

		width: 100%;
		top: 0;
	}
	.text {
		display: flex;
		justify-content: space-between;
		margin-bottom: 16px;
		align-items: center;
		h2 {
			margin: 0;
			font-size: 28px;
			font-weight: bold;
		}
	}
	@media screen and (max-width: 768px) {
		.header {
			padding: 20px 24px;
			padding-top: calc(env(safe-area-inset-top, 20px) + 20px);
		}
	}
</style>
