<script>
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import { SkinViewer } from "skinview3d";
	const name = $derived(page.params.name);
	let canvasObject = $state();
	$effect(() => {
		let skinViewer = new SkinViewer({
			canvas: canvasObject,
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
	});
</script>

<p>{name}</p>
<canvas bind:this={canvasObject}></canvas>

<style lang="less">
	canvas {
		margin-left: auto;
		margin-right: 24px;
		display: block;
	}
</style>
