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
	{@render children?.()}
</a>

<style lang="scss">
	a {
		aspect-ratio: 1/1;
		width: 56px;
		height: 56px;
		border: none;
		border-radius: 100%;
		background-color: rgba(255, 255, 255, 0);
		cursor: pointer;
		padding: 12px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: 300ms background-color ease-out;

		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
			transition-duration: 150ms;
		}

		&.active {
			background-color: rgba(255, 255, 255, 0.4);
			&:hover {
				background-color: rgba(255, 255, 255, 0.5);
				transition-duration: 150ms;
			}
		}

		svg {
			width: 100%;
			height: 100%;
		}
	}
</style>
