<script>
	import Button from "$lib/Button.svelte";
	import { RegisterStage } from "./stages";

	let { page = $bindable(), skin = $bindable() } = $props();
</script>

<div class="register-page">
	<div style="margin-top: 16px"></div>
	<Button
		style="margin: 32px 0 0 0"
		onclick={() => {
			page = RegisterStage.applyForCitizenship;
		}}
	>
		Выбрать скин
	</Button>
	<Button hollow={true} style="margin: 16px 0 0 0">Пропустить</Button>
</div>
