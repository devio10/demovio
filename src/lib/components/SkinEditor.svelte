<script lang="ts">
	let {
		skin = $bindable(),
		skinError = $bindable(),
	}: { skin: File | undefined; skinError: string | undefined } = $props();
	let fileInput: HTMLInputElement;
	function validateFile(file: File) {
		const uploadedSkin = file;
		if (!(uploadedSkin instanceof File)) {
			return;
		}
		if (uploadedSkin.type !== "image/png") {
			skinError = "Неправильный формат изображения.";
			return;
		}
		if (uploadedSkin.size > 10000) {
			skinError = "Слишком большой файл.";
			return;
		}
		skin = uploadedSkin;
	}
</script>

<button
	class="file-picker"
	ondragover={(event) => {
		event.preventDefault();
	}}
	ondrop={(event) => {
		event.preventDefault();
		if (!event.dataTransfer?.files) {
			return;
		}
		validateFile(event.dataTransfer.files[0]);
	}}
	onclick={() => {
		fileInput.click();
	}}
>
	Перетащите сюда скин или нажмите, чтобы открыть выбор файла
</button>
<input
	type="file"
	class="file-input"
	bind:this={fileInput}
	onchange={() => {
		if (!fileInput.files) {
			return;
		}
		validateFile(fileInput.files[0]);
	}}
	accept="image/png"
/>

<style lang="scss">
	.file-picker {
		width: 100%;
		height: 100%;
		border: 2px dashed rgba(230, 230, 230, 0.4);
		background-color: rgba(0, 0, 0, 0.45);
		border-radius: 14px;
		box-shadow: inset 3.84px 3.84px 17.28px rgba(0, 0, 0, 0.25);
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 16px;
		font-size: 14px;
		color: rgba(230, 230, 230, 0.8);
		cursor: pointer;
		&:hover {
			background-color: rgba(0, 0, 0, 0.4);
		}
	}
	.file-input {
		display: none;
	}
	:global([data-prefers-contrast]) {
		.file-picker {
			background-color: var(--general-option-button);
			box-shadow: none;
			color: var(--general-text);
			border-color: var(--general-text-input);
		}
	}
</style>
