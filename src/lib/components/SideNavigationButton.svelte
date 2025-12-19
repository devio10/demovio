<script lang="ts">
	import type { Snippet } from "svelte";
	import { page } from "$app/state";

	let {
		children,
		alt,
		href,
		test,
	}: {
		children: Snippet;
		alt: string;
		href: string;
		test?: RegExp;
	} = $props();
</script>

<a
	class={{ active: test ? test.test(page.url.pathname) : page.url.pathname.startsWith(href) }}
	aria-label={alt}
	{href}
>
	<div class="icon">
		{@render children?.()}
	</div>
	<span class="button-name">{alt}</span>
</a>

<style lang="scss">
	a {
		aspect-ratio: 1/1;
		width: 100%;
		height: 56px;
		border: none;
		border-radius: 100px;
		background-color: rgba(255, 255, 255, 0);
		cursor: pointer;
		padding: 12px;
		color: rgba(240, 240, 240, 0.8);
		display: flex;
		overflow: clip;
		align-items: center;
		transition: 300ms background-color ease-out;
		text-decoration: none;
		.button-name {
			opacity: 0;
			margin-left: 16px;
			font-size: 16px;
			transition-duration: 200ms;
			transition-property: opacity, font-weight;
			transition-timing-function: ease-out;
		}

		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
			transition-duration: 150ms;
		}

		&.active {
			background-color: rgba(255, 255, 255, 0.4);
			color: white;
			.button-name {
				font-weight: 600;
			}
			&:hover {
				background-color: rgba(255, 255, 255, 0.5);
				transition-duration: 150ms;
			}
		}

		.icon {
			height: 100%;
			aspect-ratio: 1/1;
			display: flex;
		}
	}
	:global([data-prefers-contrast]) {
		a {
			color: var(--general-light-text);
			.button-name {
				color: var(--general-text);
			}
			&.active {
				background-color: var(--general-option-button);
				color: var(--general-text);
			}
		}
	}
	@media screen and (max-width: 768px) {
		a {
			width: auto;
			height: auto;
			aspect-ratio: unset;
			flex-direction: column;
			padding: 0 16px;
			overflow: initial;
			justify-content: center;
			flex: 1;
			min-width: 0;
			transition-property: background-color, scale, box-shadow, border;
			transition-duration: 300ms;
			transition-timing-function: ease-in-out;
			cursor: default;
			color: white;
			box-shadow:
				inset 2.8px 2.8px 1.87px 0 rgba(255, 255, 255, 0),
				inset -1.87px 0 1.87px 0 rgba(255, 255, 255, 0);
			&.active {
				background-color: rgba(255, 255, 255, 0.15);
				color: rgb(48, 165, 255);
				.button-name {
					font-weight: bold;
				}
				&:hover {
					background: rgba(255, 255, 255, 0.15);
				}
			}
			&:hover {
				background-color: rgba(0, 0, 0, 0);
				transition-duration: 150ms;
			}
			&:active {
				// scale: 1.1;
				transition-duration: 150ms;

				&:active {
					transition-duration: 0, 150ms;
					transition-delay: 15 0ms;
					background-color: rgba(255, 255, 255, 0.15);
					// border: 1.5px solid rgba(255, 255, 255, 0.25);
					border-left: none;
					border-bottom: none;
					// box-shadow:
					// 	inset 2.8px 2.8px 1.87px 0 rgba(255, 255, 255, 0.1),
					// 	inset -1.87px 0 1.87px 0 rgba(255, 255, 255, 0.2);
				}
			}
			.icon {
				width: 26px;
				height: 26px;
				flex-shrink: 0;
				flex: 0;
			}
			.button-name {
				margin: 1px 0 0 0;
				opacity: 1;
				font-size: 11px;
				user-select: none;
			}
		}
	}
</style>
