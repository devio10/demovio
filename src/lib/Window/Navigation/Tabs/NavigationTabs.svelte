<script lang="ts">
	let { children } = $props();
</script>

<nav>
	{@render children?.()}
</nav>

<style lang="scss">
	nav {
		display: flex;
		gap: 6px;
		margin-top: 8px;
		overflow-x: auto;
	}
</style>
