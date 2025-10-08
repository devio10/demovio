<script>
	let { children, icon, href } = $props();
</script>

<div>
	<a {href}>
		<img src="/AppIcons/{icon}.png" alt={icon} />
		<span>{@render children?.()}</span>
	</a>
</div>

<style lang="scss">
	div {
		display: inline-block;
		margin: 16px 24px;
	}
	a {
		display: flex;
		flex-direction: column;
		gap: 10px;
		text-decoration: none;
		img {
			$image-size: 128px;
			width: $image-size;
			height: $image-size;
			border-radius: calc(1px * infinity);
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
		}
		span {
			font-size: 16px;
			font-weight: 600;
			color: white;
			text-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
			text-align: center;
		}
	}
</style>
