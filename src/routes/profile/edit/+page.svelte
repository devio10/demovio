<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionButtonCheckmark from "$lib/components/OptionButtonCheckmark.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import { getSkinURL } from "$lib/scripts";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import { IdleAnimation, SkinViewer } from "skinview3d";
	import { Spring } from "svelte/motion";
	import { slide } from "svelte/transition";
	let { data } = $props();
	const scale = new Spring(0.5, { damping: 0.2, stiffness: 0.1 });
	const allPronouns = ["он/его", "она/её", "они/их"];
	let pronouns = $state(allPronouns[0]);
	let customPronouns = $state(false);
</script>

<SettingsHeader title="Изменение данных"></SettingsHeader>

{#if data.profile}
	<div class="settings-content">
		<h3>Основное</h3>
		<div class="settings-buttons" style="display: flex; flex-direction: row;">
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
			<textarea placeholder="Описание..."></textarea>
		</div>
		<div class="settings-buttons-space"></div>
		<h3>Местоимения</h3>
		<div class="settings-buttons">
			{#each allPronouns as prn}
				<OptionButton
					onclick={() => {
						customPronouns = false;
						pronouns = prn;
					}}
				>
					{prn}
					<OptionButtonCheckmark value={pronouns === prn} />
				</OptionButton>
			{/each}
			<OptionButton
				onclick={() => {
					pronouns = undefined;
					customPronouns = false;
				}}
			>
				Не указывать
				<OptionButtonCheckmark value={pronouns === undefined} />
			</OptionButton>
			<OptionButton
				onclick={() => {
					pronouns = "custom";
					customPronouns = true;
				}}
			>
				Другое
				<OptionButtonCheckmark value={customPronouns} />
			</OptionButton>
		</div>
		{#if customPronouns}
			<div class="settings-buttons" style="padding-top: 16px" transition:slide={{ duration: 300 }}>
				<TextInput placeholder="Укажите ваши местоимения" />
			</div>
		{/if}
		<div class="settings-buttons-space"></div>
		<h3>Прочее</h3>
		<div class="settings-buttons">
			<OptionButton>Изменить игровой ник</OptionButton>
			<OptionButton>Изменить контактную информацию (Telegram)</OptionButton>
		</div>
		<div class="settings-buttons-space"></div>
	</div>
{/if}
