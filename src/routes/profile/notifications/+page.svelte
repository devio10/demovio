<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import SettingsSwitch from "$lib/components/SettingsSwitch.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import { isActionFailure } from "@sveltejs/kit";
	import { pushNotificationsOff, pushNotificationsOn } from "./data.remote";
	let subscribedToPush = $state(false);
	let playerActivitySubscription = $state(false);
	let demovioUpdatesSubscription = $state(false);
	import PushNotificationsSwitch from "./PushNotificationsSwitch.svelte";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
</script>

<SettingsHeader title="Уведомления"></SettingsHeader>
<div class="settings-content">
	<div class="settings-buttons">
		<PushNotificationsSwitch />
		<OptionButton tag="div">Уведомления в Telegram <SettingsSwitch disabled /></OptionButton>
	</div>
	<OptionDescription>
		{#if subscribedToPush}
			Demovio будет присылать вам уведомления о выбранных вами событиях через этот браузер.
		{:else}
			Demovio может присылать вам уведомления о выбранных вами событиях через этот браузер.
		{/if}
		Уведомления в Telegram будут доступны в будущем.
	</OptionDescription>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton tag="div">Приглашения от других игроков <SettingsSwitch disabled /></OptionButton>
		<OptionButton tag="div">Обновления Demovio <SettingsSwitch /></OptionButton>
		<OptionButton tag="div">Активность выбранных игроков <SettingsSwitch /></OptionButton>
	</div>
	<OptionDescription>
		{#if playerActivitySubscription && demovioUpdatesSubscription}
			Вы будете получать уведомления об активности выбранных игроков и обновлениях сервера Demovio.
			{:else if playerActivitySubscription}
			Вы будете получать уведомления только об активности выбранных игроков.
			{:else if demovioUpdatesSubscription}
			Вы будете получать уведомления только об обновлениях сервера Demovio.
			{:else}
			Вы выключили все уведомления от Demovio.
		{/if}
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
