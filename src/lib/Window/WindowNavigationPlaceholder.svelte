<script>
	let { children } = $props();
</script>

<div>
	{@render children?.()}
</div>

<style>
	div {
		position: absolute;
		height: 100%;
		width: 100%;
	}
</style>
