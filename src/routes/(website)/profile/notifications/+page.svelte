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
	<title>Профиль Demovio – Notifications</title>
</svelte:head>

<SettingsHeader title="Notifications"></SettingsHeader>
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
			You will receive notifications about the activity of selected players and updates from the
			Demovio server.
		{:else if playerActivitySubscription}
			You will receive notifications about the activity of selected players.
		{:else if demovioUpdatesSubscription}
			You will receive notifications about updates from the Demovio server.
		{:else if !invitesSubscription}
			You have disabled all notifications from Demovio.
		{/if}
		{#if invitesSubscription}
			Other players can invite you to play.
		{/if}
	</OptionDescription>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton tag="div">
			Frequency of notifications <span>12 hours</span>
		</OptionButton>
	</div>
	<OptionDescription>
		The frequency of notifications for each player is limited: you will receive a message no more
		than once every 12 hours for a specific player.
	</OptionDescription>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<DisableNotifications />
	</div>
	<div class="settings-buttons-space"></div>
</SettingsContent>
