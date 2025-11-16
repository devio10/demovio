<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
	import SettingsSwitch from "$lib/components/SettingsSwitch.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
</script>

<svelte:head>
	<title>Профиль Demovio – Безопасность аккаунта</title>
</svelte:head>
<SettingsHeader title="Безопасность аккаунта"></SettingsHeader>
<div class="settings-content">
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton tag="a">Изменить пароль для входа на сайт</OptionButton>
	</div>
	<OptionDescription>
		Если вы забыли пароль от своего аккаунта на сайте Demovio, то можете поменять его. Потребуется
		код из бота в Telegram.
	</OptionDescription>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton tag="div">
			Вход без пароля (Passkey)
			<SettingsSwitch disabled />
		</OptionButton>
	</div>
	<OptionDescription>
		Добавление ключа на устройство или в браузер позволит входить вам в аккаунт Demovio безопасно,
		не вводя пароль.
	</OptionDescription>
</div>
