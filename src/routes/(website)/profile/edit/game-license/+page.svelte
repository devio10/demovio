<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
	import SettingsSwitch from "$lib/components/SettingsSwitch.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import SettingsContent from "../../SettingsContent.svelte";
	import { accountLicenseAvailability } from "./license.remote";
	let { data } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Профиль Demovio – Изменение данных</title>
</svelte:head>
<SettingsHeader title="Наличие лицензионной игры"></SettingsHeader>
<SettingsContent>
	<div class="settings-buttons">
		<OptionButton tag="div">
			Наличие лицензионной игры
			<SettingsSwitch
				disabled={loading}
				onChange={async () => {
					if (!data.profile) {
						return;
					}
					loading = true;
					await accountLicenseAvailability(!data.profile.haveLicense);
					loading = false;
				}}
				value={data.profile?.haveLicense === true}
			/>
		</OptionButton>
	</div>
	<OptionDescription>
		Наличие лицензии для игры Minecraft позволяет входить на сервер Demovio без ввода пароля. Если
		вы уже играли на сервере без лицензии, необходимо пройти процедуру перехода на лицензионный тип
		аккаунта, для этого свяжитесь с администратором.
	</OptionDescription>
</SettingsContent>
