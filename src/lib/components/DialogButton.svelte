<script lang="ts" generics="T extends keyof SvelteHTMLElements">
	import type { SvelteHTMLElements } from "svelte/elements";
	let {
		children,
		accent,
		tag,
		...props
	}: {
		accent?: boolean;
		tag?: T;
	} & SvelteHTMLElements[T] = $props();
</script>

<svelte:element this={tag ?? "button"} {...props} class={[props.class, { accent }, "button"]}>
	{@render children?.()}
</svelte:element>

<style lang="scss">
	.button {
		height: 44px;
		border: none;
		border-radius: 100px;
		width: 100%;
		background: none;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		font-weight: 400;
		color: #eae8e2;
		transition-property: scale, background-color, color;
		transition-duration: 250ms;
		transition-timing-function: ease-out;
		outline: none;
		&:not(:disabled) {
			&:hover {
				transition-duration: 125ms;
				color: white;
				background-color: rgba(215, 215, 215, 0.3);
				&.hollow {
					background-color: rgba(215, 215, 215, 0.3);
				}
			}
			&:active {
				transition-duration: 125ms;
				color: #dddbd6;
				background-color: rgba(215, 215, 215, 0.2);
				&.hollow {
					background-color: rgba(215, 215, 215, 0.25);
				}
			}
		}
		&:disabled {
			cursor: not-allowed;
			background-color: rgba(130, 130, 130, 0.3);
		}
		&.accent {
			font-weight: bold;
		}
	}
</style>
