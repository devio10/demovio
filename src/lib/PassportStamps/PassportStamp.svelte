<script>
	let { children } = $props();
</script>

<div class="passport-stamp">{@render children?.()}</div>

<style lang="scss">
	.passport-stamp {
		z-index: 2;
		user-select: none;
	}
	:global {
		.stamp {
			--color: #4c1d95;
			position: absolute;
			bottom: 32px;
			right: 22px;
			border: 3px solid var(--color);
			border-radius: 4px;
			display: flex;
			height: 56px;
			opacity: 0.5;
			rotate: -15deg;
			scale: 0.9;
			pointer-events: none;
			user-select: none;

			&.effect {
				--grunge: url("$lib/assets/grunge.png");
				mask-image: var(--grunge);
				mask-size: 600px 600px;
				-webkit-mask-image: var(--grunge);
				-webkit-mask-size: 400px 400px;
				mix-blend-mode: multiply;
			}
		}
	}
</style>
