<script>
	import IconRight from "$lib/components/icons/IconRight.svelte";
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
	import SettingsSwitch from "$lib/components/SettingsSwitch.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import SettingsContent from "../SettingsContent.svelte";
</script>

<svelte:head>
	<title>Профиль Demovio – Безопасность аккаунта</title>
</svelte:head>
<SettingsHeader title="Privacy & Security"></SettingsHeader>
<SettingsContent>
	<div class="settings-buttons">
		<OptionButton tag="a">
			Change website password <div class="option-button-arrow-icon">
				<IconRight />
			</div>
		</OptionButton>
	</div>
	<OptionDescription>
		If you have forgotten the password for your Demovio website account, you can reset it. You will
		need a verification code from the Telegram bot.
	</OptionDescription>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton tag="div">
			Set up a new passkey
			<SettingsSwitch disabled />
		</OptionButton>
	</div>
	<OptionDescription>
		Adding a passkey to your device or browser allows you to sign in to your Demovio account
		securely without entering a password.
	</OptionDescription>
</SettingsContent>
