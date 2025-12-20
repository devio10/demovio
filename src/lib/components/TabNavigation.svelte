<script lang="ts">
	import { Spring } from "svelte/motion";

	let { children, selection, selectionWidth, ...props } = $props();
	let width = new Spring(82, { damping: 0.4, stiffness: 0.1 });
	let offset = new Spring(16, { damping: 0.4, stiffness: 0.1 });
	$effect(() => {
		width.target = selectionWidth;
		offset.target = selection;
	});
</script>

<nav {...props}>
	<div class="selection" style="--position: {offset.current}px; --width: {width.current}px"></div>
	{@render children?.()}
</nav>

<style lang="scss">
	nav {
		height: 64px;
		border-radius: 100px;
		box-shadow: 0 4px 30px 5px rgba(0, 0, 0, 0.3);
		background: linear-gradient(
			-10deg,
			rgba(114, 114, 114, 0.32) 0%,
			rgba(255, 255, 255, 0.27) 95%
		);
		backdrop-filter: blur(24px);
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-left: none;
		border-bottom: none;
		display: flex;
		width: fit-content;
		margin: 0 auto;
		align-items: center;
		padding: 0 16px;
		position: relative;
	}
	.selection {
		background-color: rgba(230, 230, 230, 0.3);
		height: calc(100% - 24px);
		width: var(--width);
		position: absolute;
		border-radius: 100px;
		left: var(--position);
		z-index: 1;
		/* transition-property: left, width;
		transition-duration: 300ms;
		transition-timing-function: eas; */
	}
	:global([data-prefers-contrast]) {
		nav {
			backdrop-filter: none;
			background: none;
			border: none;
			background-color: var(--general-background);
		}
		.selection {
			background-color: var(--general-text-input);
		}
	}
	@media screen and (max-width: 768px) {
		nav {
			height: 48px;
			padding: 0 8px;
			backdrop-filter: blur(8px);
		}
		.selection {
			height: calc(100% - 16px);
		}
	}
</style>
