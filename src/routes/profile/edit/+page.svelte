<script lang="ts">
	import { slide, scale } from "svelte/transition";
	import { invalidate } from "$app/navigation";
	import Dialog from "$lib/components/Dialog.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import IconExclamationMark from "$lib/components/icons/IconExclamationMark.svelte";
	import IconPencilCircle from "$lib/components/icons/IconPencilCircle.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionButtonCheckmark from "$lib/components/OptionButtonCheckmark.svelte";
	import SkinEditor from "$lib/components/SkinEditor.svelte";
	import TextArea from "$lib/components/TextArea.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import WindowHeaderAccentButton from "$lib/Window/WindowHeaderAccentButton.svelte";
	import { saveData } from "./savedata.remote.js";
	import IconXCircle from "$lib/components/icons/IconXCircle.svelte";
	import SkinEditorPreview from "$lib/components/SkinEditorPreview.svelte";
	import SettingsContent from "../SettingsContent.svelte";

	const allPronouns = ["он/его", "она/её", "они/их"];

	let { data } = $props();

	let unsavedChanges = $state(false);
	let editingSkin = $state(false);
	let useLicenseSkin = $state(false);
	let skin: File | undefined = $state();
	let skinError: string | undefined = $state();
	let updateDataError: unknown | undefined = $state();

	let pronouns: string | null = $derived(data.profile ? data.profile.pronouns : allPronouns[0]);
	let customPronouns = $derived(pronouns !== null && !allPronouns.includes(pronouns));
	let description = $derived(data.profile?.description);

	$effect(() => {
		if (skin) {
			saveData.fields.skin.set(skin);
		}
	});
</script>

<svelte:head>
	<title>Профиль Demovio – Изменение данных</title>
</svelte:head>

<div class="header">
	<SettingsHeader title="Изменение данных"></SettingsHeader>
	{#if unsavedChanges}
		<div class="button" transition:scale={{ duration: 300, start: 0.75 }}>
			<form
				{...saveData.enhance(async ({ submit }) => {
					updateDataError = undefined;
					try {
						await submit();
						await invalidate("app:user:profile");
						unsavedChanges = false;
						editingSkin = false;
					} catch (e) {
						console.error(e);
						updateDataError = e;
					}
				})}
				enctype="multipart/form-data"
			>
				<div style="display: none;">
					<input {...saveData.fields.description.as("text")} value={description} />
					<input {...saveData.fields.pronouns.as("text")} value={pronouns} />
					{#if skin}
						<input {...saveData.fields.skin.as("file")} />
					{/if}
					{#if useLicenseSkin}
						<input {...saveData.fields.skinName.as("text")} value={data.profile?.name} />
					{/if}
				</div>
				<WindowHeaderAccentButton name="Сохранить" type="submit" disabled={saveData.pending > 0}>
					{#if saveData.pending}
						<LoadingWheel --wheel-size="32px" duration={0} />
					{:else}
						Готово
					{/if}
				</WindowHeaderAccentButton>
			</form>
		</div>
	{/if}
</div>

{#if data.profile}
	<SettingsContent>
		<h3>Основное</h3>
		<div class="settings-buttons skin-and-description">
			<div class="skin-container">
				{#if data.profile}
					<SkinEditorPreview profile={data.profile} {skin} bind:skinError bind:unsavedChanges />
				{/if}
				<button
					class="skin-edit-button"
					onclick={() => {
						editingSkin = !editingSkin;
						unsavedChanges = false;
						skin = undefined;
					}}
				>
					<div class="icon">
						{#if editingSkin}
							<IconXCircle />
						{:else}
							<IconPencilCircle />
						{/if}
					</div>
					<span>
						{#if editingSkin}
							Отменить
						{:else}
							Изменить
						{/if}
					</span>
				</button>
			</div>
			<div class="editor">
				{#if !editingSkin || useLicenseSkin}
					<TextArea
						bind:value={description}
						placeholder="Описание..."
						oninput={() => (unsavedChanges = true)}
					/>
				{:else}
					<SkinEditor bind:skin bind:skinError />
				{/if}
			</div>
		</div>
		{#if editingSkin}
			<div class="settings-buttons" style="margin-top: 16px" transition:slide={{ duration: 300 }}>
				<OptionButton
					onclick={() => {
						useLicenseSkin = false;
						unsavedChanges = true;
					}}
				>
					Загрузить файл скина
					<OptionButtonCheckmark value={!useLicenseSkin} />
				</OptionButton>
				<OptionButton
					onclick={() => {
						useLicenseSkin = true;
						unsavedChanges = true;
					}}
				>
					Использовать свой лицензионный скин
					<OptionButtonCheckmark value={useLicenseSkin} />
				</OptionButton>
			</div>{/if}
		<div class="settings-buttons-space"></div>
		<h3>Местоимения</h3>
		<div class="settings-buttons pronouns-grid">
			{#each allPronouns as prn}
				<OptionButton
					onclick={() => {
						customPronouns = false;
						pronouns = prn;
						unsavedChanges = true;
					}}
				>
					{prn}
					<OptionButtonCheckmark value={pronouns === prn} />
				</OptionButton>
			{/each}
			<OptionButton
				onclick={() => {
					pronouns = null;
					customPronouns = false;
					unsavedChanges = true;
				}}
			>
				Не указывать
				<OptionButtonCheckmark value={pronouns === null} />
			</OptionButton>
			<OptionButton
				onclick={() => {
					pronouns = "";
					customPronouns = true;
					unsavedChanges = true;
				}}
			>
				Другое
				<OptionButtonCheckmark value={customPronouns} />
			</OptionButton>
		</div>
		{#if customPronouns}
			<div class="settings-buttons" style="padding-top: 16px" transition:slide={{ duration: 300 }}>
				<TextInput
					placeholder="Укажите ваши местоимения"
					bind:value={pronouns}
					oninput={() => (unsavedChanges = true)}
				/>
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
	</SettingsContent>
{/if}

{#if updateDataError instanceof Error}
	<Dialog
		title="Не Удалось Обновить Данные"
		description={updateDataError.message}
		color="var(--red)"
		opened={true}
	>
		{#snippet icon()}
			<div style="padding: 6px">
				<IconExclamationMark />
			</div>
		{/snippet}
		<DialogButton
			onclick={() => {
				updateDataError = undefined;
			}}
		>
			Закрыть
		</DialogButton>
	</Dialog>
{/if}
{#if skinError}
	<Dialog
		title="Не Удалось Загрузить Скин"
		description={skinError}
		color="var(--red)"
		opened={true}
	>
		{#snippet icon()}
			<div style="padding: 6px">
				<IconExclamationMark />
			</div>
		{/snippet}
		<DialogButton
			onclick={() => {
				skinError = undefined;
			}}
		>
			Закрыть
		</DialogButton>
	</Dialog>
{/if}
<svelte:window
	ondrop={(event) => {
		event.preventDefault();
	}}
	ondragover={(event) => {
		event.preventDefault();
	}}
/>

<style lang="scss">
	.header {
		width: 100%;
		position: relative;
		z-index: 2;
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
			color: rgba(230, 230, 230, 0.9);
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
	.skin-and-description {
		display: flex;
		flex-direction: row;
		.editor {
			display: contents;
		}
	}
	@media screen and (max-width: 768px) {
		.skin-and-description {
			flex-direction: column;
			.editor {
				display: flex;
				height: 128px;
				margin-top: 16px;
			}
		}
		.skin-container {
			width: 100%;
			height: fit-content;
			display: flex;
			justify-content: center;
		}
	}
</style>
