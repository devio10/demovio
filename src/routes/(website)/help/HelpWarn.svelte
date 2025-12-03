<script lang="ts">
	let { children, ...props } = $props();
</script>

<span {...props}>{@render children?.()}</span>

<style lang="scss">
	span {
		border: 1px solid #fcd34d;
		background-color: #fcd34d5b;
		border-radius: 12px;
		padding: 16px;
		margin: 0;
		font-weight: 500;
	}
</style>
