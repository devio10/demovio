<script lang="ts">
	import { getContentScrollContext } from "$lib/scripts";
	import type { Snippet } from "svelte";

	let {
		children,
		title,
		subtitle,
		...props
	}: {
		children?: Snippet;
		title: string;
		subtitle?: Snippet;
	} = $props();
</script>

<div class="content" {...props}>
	<div class="text">
		<h2>{title}</h2>
		{@render subtitle?.()}
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
		justify-content: space-between;
		h2 {
			margin: 0;
			font-size: 28px;
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
