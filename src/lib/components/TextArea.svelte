<script lang="ts">
	import type { HTMLTextareaAttributes } from "svelte/elements";

	let { style, class: className, value = $bindable(), ...props }: HTMLTextareaAttributes = $props();
</script>

<div class={className} {style}>
	<textarea {...props} bind:value></textarea>
</div>

<style lang="scss">
	div {
		background-color: rgba(0, 0, 0, 0.25);
		border-bottom: 0.5px solid rgba(230, 230, 230, 0.4);
		border-radius: 14px;
		display: flex;
		align-items: center;
		overflow: clip;
		box-shadow: inset 3.84px 3.84px 17.28px rgba(0, 0, 0, 0.25);
		width: 100%;
		padding-right: 4px;

		textarea {
			background: none;
			border: none;
			height: 100%;
			width: 100%;
			font-size: 16px;
			outline: none;
			flex: 1;
			color: #c8c4c1;
			resize: none;
			padding: 12px;
			margin: 0;
			line-height: 1.5;
		}
		:global {
			svg {
				width: 26px;
				height: 26px;
				color: #c8c4c1;
				flex-shrink: 0;
			}
		}
	}
</style>
