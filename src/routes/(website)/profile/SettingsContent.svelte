<script lang="ts">
	import { MediaQuery } from "svelte/reactivity";
	import { scale } from "svelte/transition";

	let { children, doFade = true, ...props } = $props();
	let isMobile = new MediaQuery("screen and (max-width: 768px)");
</script>

<div
	class="settings-content"
	transition:scale|global={{
		duration: doFade && !isMobile.current ? 150 : 0,
		start: 0.97,
		opacity: 0,
	}}
	{...props}
>
	{@render children?.()}
</div>

<style lang="scss">
	.settings-content {
		flex: 1;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		padding-top: 72px;
	}
	@media screen and (max-width: 768px) {
		.settings-content {
			padding-bottom: 64px;
			padding-top: calc(env(safe-area-inset-top, 0) + 72px);
		}
	}
</style>
