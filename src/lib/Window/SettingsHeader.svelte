<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		children,
		title,
		titleChildren,
		...props
	}: {
		children?: Snippet;
		title: string;
		titleChildren?: Snippet;
	} = $props();
</script>

<div class="content" {...props}>
	<div class="text">
		<h2>{title}</h2>
		{@render titleChildren?.()}
	</div>
	<div class="buttons">
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	.content {
		width: 100%;
		padding: 24px 36px;
		display: flex;
		justify-content: center;
		height: 98px;
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
</style>
