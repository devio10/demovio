<script lang="ts">
	import { setContext, type Snippet } from "svelte";
	let headerHeightContext = $state({ headerHeight: 0 });
	setContext("headerHeightContext", headerHeightContext);
	let { children }: { children?: Snippet } = $props();
</script>

<nav>{@render children?.()}</nav>

<style lang="scss">
	nav {
		background-color: rgba(57, 57, 57, 0.6);
		background: linear-gradient(-21deg, rgba(57, 57, 57, 0.6) 0%, rgba(97, 97, 97, 0.6) 100%);
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
		}
	}
</style>
