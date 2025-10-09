<script>
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import { SkinViewer } from "skinview3d";
	const name = $derived(page.params.name);
</script>

<p>{name}</p>
<canvas
	{@attach (canvas) => {
		let skinViewer = new SkinViewer({
			canvas: canvas,
			width: 120,
			height: 200,
			skin: `https://demovio.love/skins/${name}.png?t=${Date.now()}`,
		});
		skinViewer.autoRotate = true;
		skinViewer.autoRotateSpeed = -0.25;
		skinViewer.controls.enableZoom = false;
		return () => {
			skinViewer.dispose();
		};
	}}
></canvas>

<style lang="less">
	canvas {
		margin-left: auto;
		margin-right: 24px;
		display: block;
	}
</style>
