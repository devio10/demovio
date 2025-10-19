<script>
	import SettingsButton from "$lib/components/OptionButton.svelte";
	import { scale } from "svelte/transition";
	import { RegisterStage } from "./stages";

	let { page = $bindable(), haveLicense = $bindable() } = $props();
</script>

<div class="register-page" transition:scale={{ duration: 250, start: 0.95 }}>
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
