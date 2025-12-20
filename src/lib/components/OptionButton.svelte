<script lang="ts" generics="T extends keyof SvelteHTMLElements">
	import type { SvelteHTMLElements } from "svelte/elements";
	let { children, tag, onclick, ...props }: { tag?: T } & SvelteHTMLElements[T] = $props();
</script>

<svelte:element this={tag ?? "button"} {onclick} {...props} class="button">
	{@render children?.()}
</svelte:element>

<style lang="scss">
	.button {
		padding: 0 20px;
		height: 64px;
		--radius: 16px;
		background-color: rgba(30, 30, 30, 0.4);
		border: none;
		border-radius: 0;
		transform-origin: center;
		&:first-child {
			border-top-left-radius: var(--radius);
			border-top-right-radius: var(--radius);
			transform-origin: bottom;
		}
		&:last-child {
			border-bottom-left-radius: var(--radius);
			border-bottom-right-radius: var(--radius);
			border-bottom: none;
			transform-origin: top;
		}
		text-align: left;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		font-weight: 400;
		border-bottom: 0.5px solid rgba(230, 230, 230, 0.4);
		color: #e2e2e2;
		&:is(button, a) {
			cursor: pointer;
			transition-property: scale, background-color, color;
			transition-duration: 250ms;
			transition-timing-function: ease-out;
			text-decoration: none;
			&:not(:disabled) {
				&:hover {
					transition-duration: 125ms;
					color: white;
					background-color: rgba(60, 60, 60, 0.4);
				}
				&:active {
					scale: 0.98;
					transition-duration: 125ms;
					color: #dddbd6;
					background-color: rgba(70, 70, 70, 0.55);
				}
			}
			&:disabled {
				cursor: default;
			}
		}
	}
	:global {
		.option-button-icon-container {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.option-button-icon,
		.option-button-wheel {
			position: absolute;
			right: 0;
			&.option-button-icon {
				width: 16px;
				height: 16px;
			}
		}
	}
	:global([data-prefers-contrast]) {
		.button {
			background-color: var(--general-option-button);
			color: var(--general-text) !important;
			border-color: var(--general-text-input);
			border-width: 1px;
			&:is(button, a) {
				&:not(:disabled) {
					&:hover,
					&:active {
						background-color: var(--general-option-button-hover);
					}
				}
			}
		}
	}
	@media screen and (max-width: 768px) {
		.button {
			font-size: 16px;
			height: 52px;
			--radius: 24px;
			padding: 0 16px;
			&:is(button, a) {
				&:not(:disabled) {
					&:hover {
						color: #e2e2e2;
						background-color: rgba(30, 30, 30, 0.4);
						transition-duration: 250ms;
					}
					&:active {
						transition-duration: 125ms;
						color: white;
						background-color: rgba(60, 60, 60, 0.4);
					}
				}
			}
		}
		:global([data-prefers-contrast]) {
			.button {
				&:is(button, a) {
					&:not(:disabled) {
						&:hover {
							background-color: var(--general-option-button);
						}
						&:active {
							background-color: var(--general-option-button-hover);
						}
					}
				}
			}
		}
	}
</style>
