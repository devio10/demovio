<script lang="ts">
	import type { Snippet } from "svelte";
	import { scale, slide } from "svelte/transition";

	let {
		children,
		navigation,
	}: {
		children?: Snippet;
		navigation?: Snippet;
	} = $props();
</script>

<div class="window" transition:scale|global={{ duration: 500, start: 0.5 }}>
	{@render navigation?.()}
	<div class="content">
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	.window {
		position: absolute;
		width: 85%;
		max-width: 900px;
		height: 650px;
		max-height: 80%;
		display: flex;
		backdrop-filter: blur(50px);
		border-radius: 52px;
	}

	.content {
		flex: 1;
		height: 100%;
		max-height: 100%;
		min-height: 0;
		background-color: #393939;
		background: linear-gradient(-50deg, rgba(255, 255, 255, 0.37) 0%, rgba(114, 114, 114, 0.6) 95%);
		border-radius: 0 52px 52px 0;
		box-shadow:
			inset 0px 1.92px 5.76px 0px rgba(255, 255, 255, 0.25),
			0px 0.85px 20.48px rgba(0, 0, 0, 0.18);
		min-width: 0;

		&:first-child {
			background-color: rgba(57, 57, 57, 0.6);
			background: linear-gradient(-21deg, rgba(57, 57, 57, 0.6) 0%, rgba(97, 97, 97, 0.6) 100%);
			border-radius: 52px;
		}
	}
</style>
