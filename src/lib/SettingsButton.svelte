<script>
	let { children, ...props } = $props();
</script>

<button {...props}>
	{@render children?.()}
</button>

<style>
	button {
		padding: 20px;
		--radius: 16px;
		background-color: rgba(30, 30, 30, 0.4);
		border: none;
		border-radius: 0;
		&:first-child {
			border-top-left-radius: var(--radius);
			border-top-right-radius: var(--radius);
		}
		&:last-child {
			border-bottom-left-radius: var(--radius);
			border-bottom-right-radius: var(--radius);
			border-bottom: none;
		}
		width: 100%;

		cursor: pointer;
		display: flex;
		align-items: center;
		font-size: 16px;
		font-weight: 400;
		border-bottom: 0.5px solid rgba(230, 230, 230, 0.4);
		color: #e2e2e2;
		transition-property: scale, background-color, color;
		transition-duration: 250ms;
		transition-timing-function: ease-out;
		&:not(:disabled) {
			&:hover {
				transition-duration: 125ms;
				color: white;
				background-color: rgba(60, 60, 60, 0.4);
			}
			&:active {
				scale: 0.98;
				transition-duration: 125ms;
				color: #dddbd6;
				background-color: rgba(100, 100, 100, 0.45);
			}
		}
		&:disabled {
			cursor: default;
		}
	}
</style>
