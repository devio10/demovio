<script lang="ts">
	let { children, color = "#0873F9" } = $props();
</script>

<div class="navigation-item-icon" style="--color: {color}">
	{@render children?.()}
</div>

<style lang="scss">
	.navigation-item-icon {
		// --color: rgb(142, 84, 248);
		width: 32px;
		height: 32px;
		border-radius: 100%;
		background:
			linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 0%, transparent 100%),
			linear-gradient(var(--color) 0%, var(--color) 100%);
		padding: 6px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 12px;
		flex-shrink: 0;
		:global {
			svg,
			div {
				width: 100%;
				height: 100%;
				color: white;
			}
		}
	}
</style>
