<script lang="ts">
	import IconPencilCircle from "$lib/components/icons/IconPencilCircle.svelte";
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionButtonCheckmark from "$lib/components/OptionButtonCheckmark.svelte";
	import TextArea from "$lib/components/TextArea.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import { getSkinURL } from "$lib/scripts";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import WindowHeaderAccentButton from "$lib/Window/WindowHeaderAccentButton.svelte";
	import { IdleAnimation, SkinViewer } from "skinview3d";
	import { Spring } from "svelte/motion";
	import { slide } from "svelte/transition";
	let { data } = $props();
	const scale = new Spring(0.5, { damping: 0.2, stiffness: 0.1 });

	const allPronouns = ["он/его", "она/её", "они/их"];
	let pronouns: string | undefined = $derived(
		data.profile ? data.profile.pronouns : allPronouns[0],
	);
	let customPronouns = $state(false);

	let description = $derived(data.profile?.description);
</script>

<div class="header">
	<SettingsHeader title="Изменение данных"></SettingsHeader>
	<div class="button">
		<WindowHeaderAccentButton name="Сохранить">Сохранить</WindowHeaderAccentButton>
	</div>
</div>

{#if data.profile}
	<div class="settings-content">
		<h3>Основное</h3>
		<div class="settings-buttons" style="display: flex; flex-direction: row;">
			<div class="skin-container">
				<div class="canvas-block" style="scale: {scale.current}">
					<canvas
						{@attach (canvas) => {
							if (data.profile) {
								scale.set(0.5, { instant: true });
								let skinViewer = new SkinViewer({
									canvas: canvas,
									width: 120,
									height: 200,
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
				<button class="skin-edit-button">
					<div class="icon">
						<IconPencilCircle />
					</div>
					<span>Изменить</span>
				</button>
			</div>
			<TextArea value={description} placeholder="Описание..." />
		</div>
		<div class="settings-buttons-space"></div>
		<h3>Местоимения</h3>
		<div class="settings-buttons pronouns-grid">
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
			<OptionButton tag="a" href="/profile/notifications">
				Изменить предпочтения уведомлений
			</OptionButton>
		</div>
		<div class="settings-buttons-space"></div>
	</div>
{/if}

<style lang="scss">
	.header {
		width: 100%;
		position: relative;

		.button {
			top: 0;
			right: 0;
			position: fixed;
		}
	}
	.skin-container {
		background-color: rgba(0, 0, 0, 0.25);
		border-radius: 14px;
		margin-right: 16px;
		box-shadow: inset 3.84px 3.84px 17.28px rgba(0, 0, 0, 0.25);
		border-bottom: 0.5px solid rgba(230, 230, 230, 0.4);
		height: 100%;
		padding: 8px 0;
		position: relative;
		width: fit-content;

		.canvas-block {
			display: flex;
			align-items: center;
			width: fit-content;
		}
		.skin-edit-button {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 48px;
			border: none;
			margin: 0;
			padding: 0;
			border-radius: 0 0 14px 14px;
			background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.55) 100%);
			cursor: pointer;
			font-size: 14px;
			font-weight: 500;
			display: flex;
			align-items: flex-end;
			justify-content: center;
			padding-bottom: 12px;
			transition-property: height;
			transition-duration: 200ms;
			transition-timing-function: ease-in-out;
			.icon {
				width: 28px;
				height: 28px;
				transition-property: scale, opacity;
				transition-duration: 300ms;
				transition-timing-function: ease-out;
				position: absolute;
			}
			span {
				width: 0;
				opacity: 0;
				overflow: clip;
				transition-property: width, opacity;
				transition-duration: 300ms;
				transition-timing-function: ease-out;
			}
		}
		canvas {
			margin: 0;
			padding: 0;
		}
		&:hover {
			.skin-edit-button {
				height: 72px;
				.icon {
					scale: 0;
					opacity: 0;
				}
				span {
					width: 73px;
					opacity: 1;
				}
			}
		}
	}
</style>
