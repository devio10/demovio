<script lang="ts">
	import { setHeaderHeightContext } from "$lib/scripts";
	import { type Snippet } from "svelte";
	import { MediaQuery } from "svelte/reactivity";
	import { fly } from "svelte/transition";
	let headerHeightContext = $state({ headerHeight: 0 });
	setHeaderHeightContext(headerHeightContext);
	let { children, ...props }: { children?: Snippet } = $props();
	let isMobile = new MediaQuery("screen and (max-width: 768px)");
</script>

<nav
	class="window-navigation"
	{...props}
	transition:fly|global={{ duration: isMobile.current ? 500 : 0, x: -300 }}
>
	{@render children?.()}
</nav>

<style lang="scss">
	.window-navigation {
		background-color: rgba(57, 57, 57, 0.6);
		background: linear-gradient(-35deg, rgba(50, 50, 50, 0.6) 0%, rgba(100, 100, 100, 0.6) 100%);
		width: var(--width, 30%);
		height: 100%;
		max-height: 100%;
		min-height: 0;
		border-radius: 52px 0 0 52px;
		display: flex;
		flex-direction: column;
		// overflow-y: auto;
		overflow: clip;
		flex-shrink: 0;
		position: relative;
		box-shadow:
			inset 0px 2.88px 1.92px 0px rgba(255, 255, 255, 0.25),
			inset 0.96px -0.96px 6.72px 0px rgba(255, 255, 255, 0.1),
			0px 0.85px 20.48px rgba(0, 0, 0, 0.18);
		:global {
			h2 {
				margin: 0;
				font-size: 28px;
				font-weight: bold;
			}
			.navigation-space {
				margin: 16px;
			}
		}
	}

	:global([data-prefers-contrast]) {
		.window-navigation {
			background: none;
			background-color: var(--general-navigation);
			box-shadow: none;
		}
	}
	@media screen and (max-width: 768px) {
		.window-navigation {
			width: 100%;
			border-radius: 0;
			background: none;
			box-shadow: none;
		}
		:global([data-prefers-contrast]) {
			.window-navigation {
				background-color: rgba(0, 0, 0, 0);
			}
		}
	}
</style>
