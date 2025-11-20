<script>
	import { enhance } from "$app/forms";
	import { SkinViewer, IdleAnimation } from "skinview3d";
	import { Spring } from "svelte/motion";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import OptionButton from "$lib/components/OptionButton.svelte";
	import { getSkinURL } from "$lib/scripts.js";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
	import LogoutButton from "./LogoutButton.svelte";
	import DeactivateAccountButton from "./DeactivateAccountButton.svelte";
	import ReapplySkinButton from "./ReapplySkinButton.svelte";
	let { data } = $props();
	const scale = new Spring(0.5, { damping: 0.2, stiffness: 0.1 });
</script>

<SettingsHeader title="Обзор"></SettingsHeader>
<div class="settings-content">
	{#if data.profile}
		<div class="canvas-block" style="scale: {scale.current}">
			<canvas
				{@attach (canvas) => {
					if (data.profile) {
						scale.set(0.5, { instant: true });
						let skinViewer = new SkinViewer({
							canvas: canvas,
							width: 130,
							height: 270,
							skin: getSkinURL(data.profile?.skin, data.profile.name),
						});
						skinViewer.globalLight.intensity = 2.85;
						skinViewer.controls.enableZoom = false;
						skinViewer.animation = new IdleAnimation();
						scale.target = 1;
						return () => {
							skinViewer.dispose();
						};
					}
				}}
			></canvas>
		</div>
		<span class="name">{data.profile.name}</span>
		<div class="settings-buttons-space"></div>
		<div class="settings-buttons">
			<OptionButton tag="a" href="/profile/edit">Изменить данные</OptionButton>
			<OptionButton>Пригласить друга</OptionButton>
		</div>
		<OptionDescription>
			Вы можете пригласить друзей и знакомых с помощью своей реферальной ссылки. Вы получите бонус
			20 фасок / изумрудов за каждого приглашённого друга, а они получат дополнительный
			вступительный бонус в размере 10 фасок / изумрудов.
		</OptionDescription>

		<div class="settings-buttons-space"></div>
		<div class="settings-buttons">
			<ReapplySkinButton name={data.profile?.name} />
		</div>
		<OptionDescription>
			Если ваш скин не показывается во время игры на сервере, вы можете попробовать принудительно
			его применить.
		</OptionDescription>
		<div class="settings-buttons-space"></div>
		<LogoutButton />
		<div class="settings-buttons-space"></div>
		<DeactivateAccountButton />
		<OptionDescription>
			Вы можете деактивировать аккаунт, если больше не планируете играть на сервере Demovio. Он
			перестанет показываться в списке игроков и со временем будет полностью удалён.
		</OptionDescription>
		<div class="settings-buttons-space"></div>
	{/if}
</div>

<style lang="scss">
	.canvas-block {
		--width: 130px;
		width: var(--width);
		height: var(--width);
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
