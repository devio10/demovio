<script>
	let { children, name } = $props();
</script>

<button aria-label={name}>
	{@render children?.()}
</button>

<style lang="scss">
	button {
		width: 42px;
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.3);
		color: #fcf7f1;
		border-radius: 100%;
		border: none;
		cursor: pointer;
		transition-property: scale, background-color;
		transition-duration: 250ms;
		transition-timing-function: ease-out;
		margin: -2px 0 0 0;
		&:hover {
			background-color: rgba(255, 255, 255, 0.4);
			scale: 1.05;
			transition-duration: 100ms;
		}
		&:active {
			background-color: rgba(230, 230, 230, 0.4);
			scale: 0.97;
		}
		:global {
			svg {
				width: 20px;
				height: 20px;
			}
		}
	}
</style>
