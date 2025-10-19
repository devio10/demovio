<script lang="ts">
	let { url, ...props } = $props();
	let background = "url({url})";
</script>

<div {...props} style="background-image: url({url}), url({url}); {props.style}"></div>

<style>
	div {
		width: var(--width);
		aspect-ratio: 1/1;
		image-rendering: pixelated;
		image-rendering: crisp-edges;

		background-position:
			calc(var(--width) * -5) calc(var(--width) * -1),
			calc(var(--width) * -1) calc(var(--width) * -1);

		background-repeat: no-repeat;
		background-size:
			calc(var(--width) * 8) calc(var(--width) * 8),
			calc(var(--width) * 8) calc(var(--width) * 8);
	}
</style>
