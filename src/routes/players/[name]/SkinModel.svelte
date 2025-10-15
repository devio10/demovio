<script>
	import { getSkinURL } from "$lib/scripts";
	import { IdleAnimation, SkinViewer } from "skinview3d";
	import { Spring } from "svelte/motion";
	let { skin, name } = $props();
	$effect(() => {
		name;
		scale.set(0.5, { instant: true });
		scale.target = 1;
	});
	let scale = new Spring(0.5, { damping: 0.2, stiffness: 0.1 });
</script>

<div class="canvas-block" style="scale: {scale.current}">
	<canvas
		{@attach (canvas) => {
			let skinViewer = new SkinViewer({
				canvas: canvas,
				width: 120,
				height: 200,
				skin: getSkinURL(skin, name),
			});
			skinViewer.autoRotate = true;
			skinViewer.animation = new IdleAnimation();
			skinViewer.autoRotateSpeed = -0.25;
			skinViewer.globalLight.intensity = 2.85;
			skinViewer.controls.enableZoom = false;
			return () => {
				skinViewer.dispose();
			};
		}}
	></canvas>
</div>

<style>
	.canvas-block {
		margin-left: auto;
		margin-right: 24px;
		display: block;
		width: fit-content;
	}
</style>
