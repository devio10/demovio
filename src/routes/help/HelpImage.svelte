<script lang="ts">
	let { src, alt, ...props } = $props();
</script>

<img {src} {alt} {...props} />

<style lang="scss">
	img {
		width: 100%;
		filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.35));
	}
</style>
