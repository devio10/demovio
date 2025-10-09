<script>
	let { children, placeholder, type = "text", value = $bindable(), ...props } = $props();
</script>

<div {...props}>
	{@render children?.()}
	<input {type} {placeholder} bind:value />
</div>

<style lang="scss">
	div {
		height: 46px;
		background-color: rgba(0, 0, 0, 0.25);
		border-bottom: 0.5px solid rgba(230, 230, 230, 0.4);
		border-radius: 14px;
		display: flex;
		align-items: center;
		padding: 0 0 0 12px;
		gap: 12px;
		overflow: clip;
		box-shadow: inset 3.84px 3.84px 17.28px rgba(0, 0, 0, 0.25);
		width: 100%;

		input {
			background: none;
			border: none;
			height: 100%;
			font-size: 16px;
			outline: none;
			flex: 1;
			color: #c8c4c1;
			padding-right: 12px;
		}
		:global {
			svg {
				width: 26px;
				height: 26px;
				color: #c8c4c1;
				flex-shrink: 0;
			}
		}
	}
</style>
