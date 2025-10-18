<script>
	import SettingsButton from "$lib/OptionButton.svelte";
	import SettingsSwitch from "$lib/SettingsSwitch.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
</script>

<SettingsHeader title="Уведомления"></SettingsHeader>
<div class="settings-content">
	<div class="settings-buttons">
		<SettingsButton tag="div">Уведомления от браузера <SettingsSwitch /></SettingsButton>
		<SettingsButton tag="div">Уведомления в Telegram <SettingsSwitch /></SettingsButton>
	</div>
	<div class="settings-buttons">
		<SettingsButton tag="div">Приглашения от других игроков <SettingsSwitch /></SettingsButton>
		<SettingsButton tag="div">Активность избранных игроков <SettingsSwitch /></SettingsButton>
		<SettingsButton tag="div">Обновления Demovio <SettingsSwitch /></SettingsButton>
	</div>
	<div class="settings-buttons">
		<SettingsButton tag="div">
			Частота уведомлений <span>12 часов</span>
		</SettingsButton>
	</div>
</div>
