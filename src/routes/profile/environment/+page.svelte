<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
	import SettingsSwitch from "$lib/components/SettingsSwitch.svelte";
	import { localPreferences } from "$lib/local-settings.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import SettingsContent from "../SettingsContent.svelte";

	let showEnvironment = $state(localPreferences.showEnvironment);
</script>

<svelte:head>
	<title>Профиль Demovio – Уведомления</title>
</svelte:head>
<SettingsHeader title="Окружение"></SettingsHeader>
<SettingsContent>
	<div class="settings-buttons">
		<OptionButton tag="div">
			Показывать окружение <SettingsSwitch
				value={showEnvironment}
				onChange={() => {
					const value = localStorage.getItem("show-environment");
					if (value === "true") {
						localStorage.setItem("show-environment", "false");
						localPreferences.showEnvironment = false;
					} else {
						localStorage.setItem("show-environment", "true");
						localPreferences.showEnvironment = true;
					}
				}}
			/>
		</OptionButton>
	</div>
	<OptionDescription>
		Отображать статическое или панорамное окружение на фоне страницы вместо сплошного фона.
	</OptionDescription>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton tag="div">
			Освещение окружения <span>Светлое</span>
		</OptionButton>
	</div>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton tag="div">
			Скорость прокрутки панорамы <span>1x</span>
		</OptionButton>
	</div>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton tag="div">
			Контрастный режим <SettingsSwitch />
		</OptionButton>
	</div>
	<OptionDescription>
		Интерфейс будет иметь непрозрачный белый или чёрный фон, в зависимости от темы устройства.
	</OptionDescription>
</SettingsContent>
