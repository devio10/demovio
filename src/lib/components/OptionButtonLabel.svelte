<script>
	let { children, ...props } = $props();
</script>

<span {...props}>{@render children?.()}</span>

<style>
	span {
		text-align: right;
	}
</style>
