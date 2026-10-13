<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
	import SettingsSwitch from "$lib/components/SettingsSwitch.svelte";
	import { localPreferences } from "$lib/local-settings.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import SettingsContent from "../SettingsContent.svelte";

	let showEnvironment = $state(localPreferences.showEnvironment);
	let environmentThemeNames = ["", "Light", "Dark", "Auto"];
</script>

<svelte:head>
	<title>Профиль Demovio – Appearance</title>
</svelte:head>
<SettingsHeader title="Appearance"></SettingsHeader>
<SettingsContent>
	<div class="settings-buttons">
		<OptionButton tag="div">
			Show the environment <SettingsSwitch
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
		<OptionButton
			onclick={() => {
				localPreferences.environmentTheme++;
				if (localPreferences.environmentTheme > 3) {
					localPreferences.environmentTheme = 1;
				}
				localStorage.setItem("environment-theme", localPreferences.environmentTheme.toString());
			}}
		>
			Environment theme <span>{environmentThemeNames[localPreferences.environmentTheme]}</span>
		</OptionButton>
	</div>
	<OptionDescription>
		Display a static or panoramic environment as the page background instead of a solid color
		background.
	</OptionDescription>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton tag="div">
			Panorama speed <span>1x</span>
		</OptionButton>
	</div>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton tag="div">
			Contrast theme <SettingsSwitch
				value={localPreferences.contrastTheme}
				onChange={() => {
					const value = localStorage.getItem("contrast-theme");
					if (value === "true") {
						localStorage.setItem("contrast-theme", "false");
						localPreferences.contrastTheme = false;
					} else {
						localStorage.setItem("contrast-theme", "true");
						localPreferences.contrastTheme = true;
					}
				}}
			/>
		</OptionButton>
	</div>
	<OptionDescription>
		The interface will have an opaque white or black background, depending on the device theme.
	</OptionDescription>
</SettingsContent>
