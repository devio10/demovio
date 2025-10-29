<script lang="ts">
	import { getContentScrollContext } from "$lib/scripts";
	import type { Snippet } from "svelte";
	import WindowBackButton from "./Navigation/WindowBackButton.svelte";

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
	<div class="left-part">
		<div class="back-button">
			<WindowBackButton />
		</div>
		<div class="text">
			<h2>{title}</h2>
			{@render subtitle?.()}
		</div>
	</div>
	<div class="buttons">
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	.left-part {
		display: flex;
	}
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
	@media screen and (max-width: 768px) {
		.content {
			padding: 20px 24px;
			.text {
				gap: 8px;
			}
		}
	}
</style>
