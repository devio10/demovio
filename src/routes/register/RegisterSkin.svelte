<script>
	import Button from "$lib/components/Button.svelte";
	import { RegisterStage } from "./stages";
	import RegisterPage from "./RegisterPage.svelte";
	import SkinEditor from "$lib/components/SkinEditor.svelte";

	let { page = $bindable(), skin = $bindable() } = $props();
</script>

<RegisterPage>
	<SkinEditor />
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
