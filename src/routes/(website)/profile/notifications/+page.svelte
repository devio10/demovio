<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	let subscribedToPush = $state(false);
	let { data } = $props();
	let playerActivitySubscription = $derived(data.profile?.notificationsPlayersActivity);
	let demovioUpdatesSubscription = $derived(data.profile?.notificationsServerUpdates);
	let invitesSubscription = $derived(data.profile?.notificationsInvites);
	import PushNotificationsSwitch from "./PushNotificationsSwitch.svelte";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
	import PlayerInvitesSwitch from "./PlayerInvitesSwitch.svelte";
	import ServerUpdatesSwitch from "./ServerUpdatesSwitch.svelte";
	import PlayersActivitySwitch from "./PlayersActivitySwitch.svelte";
	import SettingsContent from "../SettingsContent.svelte";
	import DisableNotifications from "./DisableNotifications.svelte";
</script>

<svelte:head>
	<title>Профиль Demovio – Уведомления</title>
</svelte:head>

<SettingsHeader title="Уведомления"></SettingsHeader>
<SettingsContent>
	<PushNotificationsSwitch />

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
			Вы будете получать уведомления об активности выбранных игроков.
		{:else if demovioUpdatesSubscription}
			Вы будете получать уведомления об обновлениях сервера Demovio.
		{:else if !invitesSubscription}
			Вы выключили все уведомления от Demovio.
		{/if}
		{#if invitesSubscription}
			Другие игроки могут приглашать вас в игру.
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
		<DisableNotifications />
	</div>
	<div class="settings-buttons-space"></div>
</SettingsContent>
