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
		color: white;
		display: flex;
		// justify-content: center;
		overflow: clip;
		align-items: center;
		transition: 300ms background-color ease-out;
		text-decoration: none;
		.button-name {
			opacity: 0;
			margin-left: 16px;
			transition: 200ms opacity ease-out;
		}

		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
			transition-duration: 150ms;
		}

		&.active {
			background-color: rgba(255, 255, 255, 0.4);
			.button-name {
				font-weight: 500;
			}
			&:hover {
				background-color: rgba(255, 255, 255, 0.5);
				transition-duration: 150ms;
			}
		}

		.icon {
			height: 100%;
			aspect-ratio: 1/1;
			svg {
				width: 100%;
				height: 100%;
				flex-shrink: 0;
				flex: 1;
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
			transition-property: background-color, scale;
			transition-duration: 300ms, 1500ms;
			transition-timing-function: ease-out;
			cursor: default;
			&.active {
				background: none;
				color: rgb(77, 178, 255);
				&:hover {
					transition-duration: 0, 250ms;
					background-color: rgba(0, 0, 0, 0);
				}
				&:active {
					background-color: rgba(255, 255, 255, 0.3);
				}
			}
			&:hover {
				background-color: rgba(0, 0, 0, 0);
				transition-duration: 0, 250ms;
			}
			&:active {
				background-color: rgba(255, 255, 255, 0.3);
				scale: 1.2;
				transition-duration: 150ms, 250ms;
			}
			.icon {
				width: 26px;
				height: 26px;
				flex-shrink: 0;
				flex: 0;
			}
			.button-name {
				margin: 4px 0 0 0;
				opacity: 1;
				font-size: 12px;
			}
		}
	}
</style>
