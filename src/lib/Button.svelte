<script>
	let { children, ...props } = $props();
</script>

<button {...props}>
	{@render children?.()}
</button>

<style>
	button {
		height: 46px;
		background-color: rgba(215, 215, 215, 0.4);
		border: none;
		border-radius: 100px;
		width: 100%;
		border-top: 1px solid rgba(230, 230, 230, 0.4);

		cursor: pointer;
		font-size: 18px;
		font-weight: 600;
		color: #eae8e2;
		transition-property: scale, background-color, color;
		transition-duration: 250ms;
		transition-timing-function: ease-out;
		&:not(:disabled) {
			&:hover {
				scale: 1.05;
				transition-duration: 125ms;
				color: white;
				background-color: rgba(215, 215, 215, 0.5);
			}
			&:active {
				scale: 1.02;
				transition-duration: 125ms;
				color: #dddbd6;
				background-color: rgba(215, 215, 215, 0.45);
			}
		}
		&:disabled {
			cursor: not-allowed;
			background-color: rgba(130, 130, 130, 0.3);
		}
	}
</style>
