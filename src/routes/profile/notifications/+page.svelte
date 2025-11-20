<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import SettingsSwitch from "$lib/components/SettingsSwitch.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	let subscribedToPush = $state(false);
	let { data } = $props();
	let playerActivitySubscription = $derived(data.profile?.notificationsPlayersActivity);
	let demovioUpdatesSubscription = $derived(data.profile?.notificationsServerUpdates);
	import PushNotificationsSwitch from "./PushNotificationsSwitch.svelte";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
	import PlayerInvitesSwitch from "./PlayerInvitesSwitch.svelte";
	import ServerUpdatesSwitch from "./ServerUpdatesSwitch.svelte";
	import PlayersActivitySwitch from "./PlayersActivitySwitch.svelte";
	import SettingsContent from "../SettingsContent.svelte";
</script>

<svelte:head>
	<title>Профиль Demovio – Уведомления</title>
</svelte:head>

<SettingsHeader title="Уведомления"></SettingsHeader>
<SettingsContent>
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
		<PlayerInvitesSwitch />
		<ServerUpdatesSwitch />
		<PlayersActivitySwitch />
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
</SettingsContent>
