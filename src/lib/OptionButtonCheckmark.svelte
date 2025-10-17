<script>
	let { value } = $props();
</script>

<div class={{ active: value }}>
	{#if value}
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 17.1875 17.2363"
		>
			<path
				d="M6.36719 17.2363C6.78711 17.2363 7.11914 17.0508 7.35352 16.6895L16.582 2.1582C16.7578 1.875 16.8262 1.66016 16.8262 1.43555C16.8262 0.898438 16.4746 0.546875 15.9375 0.546875C15.5469 0.546875 15.332 0.673828 15.0977 1.04492L6.32812 15.0195L1.77734 9.0625C1.5332 8.7207 1.28906 8.58398 0.9375 8.58398C0.380859 8.58398 0 8.96484 0 9.50195C0 9.72656 0.0976562 9.98047 0.283203 10.2148L5.35156 16.6699C5.64453 17.0508 5.94727 17.2363 6.36719 17.2363Z"
				fill="currentColor"
			/>
		</svg>
	{/if}
</div>

<style lang="scss">
	div {
		width: 28px;
		height: 28px;
		border-radius: 100%;
		background-color: rgba(60, 60, 60, 0.4);
		border: 2px solid rgba(255, 255, 255, 0.32);
		padding: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		// background-color: #0a84ff;

		&.active {
			background-color: #0a84ff;
			border: none;
		}
		svg {
			width: 100%;
			height: 100%;
		}
	}
</style>
