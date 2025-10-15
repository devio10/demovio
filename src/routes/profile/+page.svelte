<script>
	import { enhance } from "$app/forms";
	import { SkinViewer, IdleAnimation } from "skinview3d";
	import { Spring } from "svelte/motion";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import SettingsButton from "$lib/SettingsButton.svelte";
	let { data } = $props();
	const scale = new Spring(0.5, { damping: 0.2, stiffness: 0.1 });
</script>

<SettingsHeader title="Обзор"></SettingsHeader>
<div class="settings-content">
	<div class="canvas-block" style="scale: {scale.current}">
		<canvas
			{@attach (canvas) => {
				scale.set(0.5, { instant: true });
				let skinViewer = new SkinViewer({
					canvas: canvas,
					width: 130,
					height: 270,
					skin: `https://demovio.love/skins/${data.profile.name}.png?t=${Date.now()}`,
				});
				skinViewer.globalLight.intensity = 2.85;
				skinViewer.controls.enableZoom = false;
				skinViewer.animation = new IdleAnimation();
				scale.target = 1;
				return () => {
					skinViewer.dispose();
				};
			}}
		></canvas>
	</div>
	<span class="name">{data.profile.name}</span>
	<div class="settings-buttons">
		<SettingsButton tag="a" href="profile/edit">Изменить данные</SettingsButton>
		<SettingsButton>Пригласить друга</SettingsButton>
	</div>
	<form class="settings-buttons" method="POST" action="/profile?/logout" use:enhance>
		<SettingsButton style="color: rgb(235, 52, 79)">Выйти из аккаунта</SettingsButton>
	</form>
</div>

<style lang="scss">
	.canvas-block {
		--width: 130px;
		width: var(--width);
		aspect-ratio: 1/1;
		overflow: clip;
		right: -90px;
		transform-origin: bottom;
		mask: linear-gradient(
			to bottom,
			black 0%,
			black calc(var(--width) - 28px),
			transparent var(--width)
		);
		mask-size: cover;
		mask-repeat: no-repeat;
	}
	.name {
		font-size: 24px;
		font-weight: bold;
		margin-top: 16px;
	}
</style>
