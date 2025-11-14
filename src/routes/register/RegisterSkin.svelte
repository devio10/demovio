<script>
	import Button from "$lib/components/Button.svelte";
	import { RegisterStage } from "./stages";
	import RegisterPage from "./RegisterPage.svelte";
	import SkinEditor from "$lib/components/SkinEditor.svelte";
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionButtonCheckmark from "$lib/components/OptionButtonCheckmark.svelte";
	import { slide } from "svelte/transition";
	import Dialog from "$lib/components/Dialog.svelte";
	import IconExclamationMark from "$lib/components/icons/IconExclamationMark.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";

	let { page = $bindable(), skin = $bindable(), haveLicense, skinError = $bindable() } = $props();
	let chooseCustomSkin = $state(!haveLicense);
</script>

<RegisterPage>
	{#if haveLicense}
		<div class="settings-buttons">
			<OptionButton
				onclick={() => {
					chooseCustomSkin = false;
				}}
			>
				Использовать свой лицензионный скин
				<OptionButtonCheckmark value={!chooseCustomSkin} />
			</OptionButton>
			<OptionButton
				onclick={() => {
					chooseCustomSkin = true;
				}}
			>
				Загрузить свой файл скина
				<OptionButtonCheckmark value={chooseCustomSkin} />
			</OptionButton>
		</div>
	{/if}

	{#if chooseCustomSkin}
		<div class="skin-editor-container" transition:slide={{ duration: 300 }}>
			<div class="skin-editor">
				<SkinEditor bind:skin bind:skinError />
			</div>
		</div>
	{/if}
	<Button
		style="margin: auto 0 0 0"
		disabled={!skin && chooseCustomSkin}
		onclick={() => {
			page = RegisterStage.applyForCitizenship;
		}}
	>
		Продолжить
	</Button>
	<Button
		hollow={true}
		style="margin: 16px 0 0 0"
		onclick={() => {
			skin = null;
			page = RegisterStage.applyForCitizenship;
		}}
	>
		Пропустить
	</Button>
</RegisterPage>

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
	.skin-editor-container {
		margin: 16px 0;
		.skin-editor {
			height: 140px;
		}
	}

	.settings-buttons {
		padding: 0;
	}
</style>
