<script>
	import SettingsButton from "$lib/components/OptionButton.svelte";
	import { RegisterStage } from "./stages";
	import RegisterPage from "./RegisterPage.svelte";

	let { page = $bindable(), haveLicense = $bindable() } = $props();
</script>

<RegisterPage>
	<div class="settings-buttons" style="padding: 0">
		<SettingsButton
			onclick={() => {
				page = RegisterStage.chooseSkin;
				haveLicense = true;
			}}
		>
			У меня есть лицензия
		</SettingsButton>
		<SettingsButton
			onclick={() => {
				page = RegisterStage.chooseSkin;
				haveLicense = false;
			}}
		>
			У меня нет лицензии
		</SettingsButton>
	</div>
</RegisterPage>
