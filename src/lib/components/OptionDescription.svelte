<script lang="ts">
	let { children } = $props();
</script>

<p>
	{@render children?.()}
</p>

<style lang="scss">
	p {
		width: 100%;
		text-align: left;
		padding: 8px 64px 0 64px;
		font-size: 14px;
		margin: 0;
		color: rgba(230, 230, 230, 0.75);
	}
	@media screen and (max-width: 768px) {
		p {
			padding: 6px 42px 0 42px;
		}
	}
</style>
