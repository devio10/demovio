<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import SettingsSwitch from "$lib/components/SettingsSwitch.svelte";
	let value = $state();
</script>

<OptionButton tag="div">Приглашения от других игроков <SettingsSwitch disabled /></OptionButton>
