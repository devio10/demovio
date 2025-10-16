<script>
	import SettingsButton from "$lib/SettingsButton.svelte";
	import { RegisterStage } from "./stages";

	let { page = $bindable(), haveLicense = $bindable() } = $props();
</script>

<div class="register-page">
	<div style="margin-top: 16px">
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
</div>
