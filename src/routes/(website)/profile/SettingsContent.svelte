<script lang="ts">
	import { scale } from "svelte/transition";

	let { children, doFade = true, ...props } = $props();
</script>

<div
	class="settings-content"
	transition:scale|global={{ duration: doFade ? 250 : 0, start: 0.95, opacity: 0 }}
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
		}
	}
</style>
