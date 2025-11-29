<script lang="ts">
	import { getSkinURL } from "$lib/scripts";
	import { IdleAnimation, SkinViewer } from "skinview3d";
	import { Spring } from "svelte/motion";

	let {
		unsavedChanges = $bindable(),
		skin,
		name,
		skinError = $bindable(),
		profile,
	}: {
		unsavedChanges?: boolean;
		skin?: Blob;
		name?: string;
		skinError: string | undefined;
		profile?: any;
	} = $props();

	const skinScale = new Spring(0.5, { damping: 0.2, stiffness: 0.1 });
</script>

<div class="canvas-block" style="scale: {skinScale.current}">
	<canvas
		{@attach (canvas) => {
			let skinPreview: HTMLImageElement = document.createElement("img");
			if (skin) {
				skinPreview.src = URL.createObjectURL(skin);
				unsavedChanges = true;
			} else if (profile) {
				skinPreview.src = getSkinURL(profile?.skin, profile.name);
				unsavedChanges = false;
			} else {
				skinPreview.src = getSkinURL(skin, name);
			}
			skinPreview.crossOrigin = "Anonymous";
			console.log(skinPreview.src);

			let skinViewer: SkinViewer | undefined;
			async function load() {
				await new Promise<void>((resolve) => {
					skinPreview.onload = () => resolve();
				});
				skinScale.set(0.5, { instant: true });
				try {
					skinViewer = new SkinViewer({
						canvas: canvas,
						width: 120,
						height: 190,
						skin: skinPreview,
					});
					skinViewer.globalLight.intensity = 2.85;
					skinViewer.controls.enableZoom = false;
					skinViewer.animation = new IdleAnimation();
					skinScale.target = 1;
				} catch (e) {
					console.error(`Ошибка при загрузке скина: ${e}`);
					skinError = "Неправильный формат изображения.";
					skin = undefined;
				}
			}
			load();
			return () => {
				skinViewer?.dispose();
				if (unsavedChanges) {
					URL.revokeObjectURL(skinPreview.src);
				}
			};
		}}
	></canvas>
</div>

<style>
	.canvas-block {
		width: 120px;
		height: 180px;
		display: block;
		overflow: clip;
	}
</style>
