<script lang="ts">
	import IconExclamationMark from "$lib/components/icons/IconExclamationMark.svelte";
	import { fade } from "svelte/transition";

	let { children, ...props } = $props();
</script>

<span in:fade={{ duration: 100 }} out:fade={{ duration: 400 }} {...props}>
	<div class="icon"><IconExclamationMark /></div>
	{@render children?.()}
</span>

<style lang="scss">
	span {
		background-color: rgba(139, 10, 10, 0.2);
		border: 0.5px solid rgba(252, 17, 17, 0.4);
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 8px 16px;
		border-radius: 12px;
		color: rgb(255, 247, 247);
		margin: 0 0 16px 0;
	}
	.icon {
		width: 22px;
		height: 22px;
	}
</style>
