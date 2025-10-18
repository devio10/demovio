<script>
	import SettingsButton from "$lib/OptionButton.svelte";
	import SettingsSwitch from "$lib/SettingsSwitch.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import { isActionFailure } from "@sveltejs/kit";
	import { pushNotificationsOff, pushNotificationsOn } from "./data.remote";
	import PushNotificationsSwitch from "./PushNotificationsSwitch.svelte";
</script>

<SettingsHeader title="Уведомления"></SettingsHeader>
<div class="settings-content">
	<div class="settings-buttons">
		<PushNotificationsSwitch />
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
