<script>
	import { invalidate } from "$app/navigation";
	import { page } from "$app/state";
	import OptionButton from "$lib/components/OptionButton.svelte";
	import SettingsSwitch from "$lib/components/SettingsSwitch.svelte";
	import { notificationsPlayersActivity } from "./data.remote";
	let value = $derived(page.data.profile?.notificationsPlayersActivity);
	let updating = $state(false);
</script>

<OptionButton tag="div">
	Активность игроков <SettingsSwitch
		value={value === true}
		disabled={updating}
		onChange={async () => {
			updating = true;
			await notificationsPlayersActivity(!value);
			await invalidate("app:user:profile");
			updating = false;
		}}
	/>
</OptionButton>
