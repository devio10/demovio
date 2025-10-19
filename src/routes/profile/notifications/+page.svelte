<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import SettingsSwitch from "$lib/components/SettingsSwitch.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import { isActionFailure } from "@sveltejs/kit";
	import { pushNotificationsOff, pushNotificationsOn } from "./data.remote";
	import PushNotificationsSwitch from "./PushNotificationsSwitch.svelte";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
</script>

<SettingsHeader title="Уведомления"></SettingsHeader>
<div class="settings-content">
	<div class="settings-buttons">
		<PushNotificationsSwitch />
		<OptionButton tag="div">Уведомления в Telegram <SettingsSwitch /></OptionButton>
	</div>
	<OptionDescription>
		Demovio будет присылать вам уведомления о выбранных вами событиях через этот браузер.
	</OptionDescription>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton tag="div">Приглашения от других игроков <SettingsSwitch /></OptionButton>
		<OptionButton tag="div">Обновления Demovio <SettingsSwitch /></OptionButton>
		<OptionButton tag="div">Активность выбранных игроков <SettingsSwitch /></OptionButton>
	</div>
	<OptionDescription>
		Уведомления об активности игроков выключены. Вы снова будете получать их, когда включите этот
		параметр.
	</OptionDescription>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton tag="div">
			Частота уведомлений <span>12 часов</span>
		</OptionButton>
	</div>
	<OptionDescription>
		Частота уведомлений о каждом игроке ограничена: вы получите сообщение не чаще одного раза в 12
		часов для конкретного игрока.
	</OptionDescription>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton style="color: rgb(235, 52, 79)">Отключить все уведомления</OptionButton>
	</div>
	<div class="settings-buttons-space"></div>
</div>
