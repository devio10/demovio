<script lang="ts" generics="T extends keyof SvelteHTMLElements">
	import type { Snippet } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";

	let {
		children,
		name,
		tag,
		...props
	}: {
		children: Snippet;
		name: string;
		tag?: T;
	} & SvelteHTMLElements[T] = $props();
</script>

<svelte:element this={tag ?? "button"} aria-label={name} {...props} class="button">
	{@render children?.()}
</svelte:element>

<style lang="scss">
	.button {
		width: 42px;
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.3);
		color: #fcf7f1;
		border-radius: 100%;
		border: none;
		cursor: pointer;
		transition-property: scale, background-color;
		transition-duration: 250ms;
		transition-timing-function: ease-out;
		margin: -2px 0 0 0;
		&:hover {
			background-color: rgba(255, 255, 255, 0.4);
			scale: 1.05;
			transition-duration: 100ms;
		}
		&:active {
			background-color: rgba(230, 230, 230, 0.4);
			scale: 0.97;
		}
		:global {
			svg {
				width: 20px;
				height: 20px;
			}
		}
	}
	:global([data-prefers-contrast]) {
		.button {
			background-color: var(--general-option-button);
			color: var(--general-text);
		}
	}
	@media screen and (max-width: 768px) {
		.button {
			&:hover {
				scale: 1;
				background-color: rgba(255, 255, 255, 0.3);
				transition-duration: 250ms;
			}
			&:active {
				scale: 0.9;
				background-color: rgba(255, 255, 255, 0.5);
				transition-duration: 100ms;
			}
		}
	}
</style>
