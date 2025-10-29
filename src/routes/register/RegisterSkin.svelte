<script>
	import Button from "$lib/components/Button.svelte";
	import { RegisterStage } from "./stages";
	import Dropzone from "svelte-file-dropzone";
	import RegisterPage from "./RegisterPage.svelte";

	let { page = $bindable(), skin = $bindable() } = $props();
</script>

<RegisterPage>
	<div>
		<Dropzone accept="image/png" maxSize={12240} />
	</div>
	<Button
		style="margin: auto 0 0 0"
		onclick={() => {
			page = RegisterStage.applyForCitizenship;
		}}
	>
		Выбрать скин
	</Button>
	<Button hollow={true} style="margin: 16px 0 0 0">Пропустить</Button>
</RegisterPage>
