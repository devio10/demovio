<script lang="ts" generics="T extends keyof SvelteHTMLElements">
	import IconBack from "$lib/components/icons/IconBack.svelte";
	import type { SvelteHTMLElements } from "svelte/elements";
	let {
		hollow,
		...props
	}: {
		hollow?: boolean;
	} & SvelteHTMLElements[T] = $props();
</script>

<a {...props} class={[props.class, { hollow }, "button"]} href="./">
	<div class="icon">
		<IconBack />
	</div>
</a>

<style lang="scss">
	.button {
		background-color: rgba(215, 215, 215, 0.4);
		border: none;
		border-radius: 100px;
		width: 42px;
		height: 42px;
		aspect-ratio: 1/1;
		flex-shrink: 0;
		margin-right: 12px;

		cursor: pointer;
		// display: flex;
		display: none;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		font-weight: 600;
		color: #eae8e2;
		transition-property: scale, background-color, color;
		transition-duration: 250ms;
		transition-timing-function: ease-out;
		text-decoration: none;
		&:not(:disabled) {
			&:hover {
				scale: 1.03;
				transition-duration: 125ms;
				color: white;
				background-color: rgba(215, 215, 215, 0.5);
				&.hollow {
					background-color: rgba(215, 215, 215, 0.3);
				}
			}
			&:active {
				scale: 1.02;
				transition-duration: 125ms;
				color: #dddbd6;
				background-color: rgba(215, 215, 215, 0.45);
				&.hollow {
					background-color: rgba(215, 215, 215, 0.25);
				}
			}
		}
		&:disabled {
			cursor: not-allowed;
			background-color: rgba(130, 130, 130, 0.3);
		}
		&.hollow {
			background: none;
			border: none;
			font-size: 16px;
		}

		.icon {
			width: 100%;
			height: 100%;
			padding: 10px;
			:global {
				svg {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	@media screen and (max-width: 768px) {
		.button {
			display: flex;
		}
	}
</style>
