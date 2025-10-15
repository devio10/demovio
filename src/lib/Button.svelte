<script lang="ts" generics="T extends keyof SvelteHTMLElements">
	import type { SvelteHTMLElements } from "svelte/elements";
	let { children, hollow, tag, ...props } = $props();
</script>

<svelte:element this={tag ?? "button"} {...props} class={[props.class, { hollow }, "button"]}>
	{@render children?.()}
</svelte:element>

<style lang="scss">
	.button {
		height: 46px;
		background-color: rgba(215, 215, 215, 0.4);
		border: none;
		border-radius: 100px;
		width: 100%;
		border-top: 1px solid rgba(230, 230, 230, 0.4);

		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		font-weight: 600;
		color: #eae8e2;
		transition-property: scale, background-color, color;
		transition-duration: 250ms;
		transition-timing-function: ease-out;
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
	}
</style>
