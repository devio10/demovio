<script>
	import Button from "$lib/components/Button.svelte";
	import { scale } from "svelte/transition";
	import { RegisterStage } from "./stages";
	import Dropzone from "svelte-file-dropzone";

	let { page = $bindable(), skin = $bindable() } = $props();
</script>

<div class="register-page" transition:scale={{ duration: 250, start: 0.95 }}>
	<!-- <div style="margin-top: 16px"></div> -->
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
</div>
