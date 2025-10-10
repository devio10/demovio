<script>
	import Passport from "$lib/Passport.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	let { data } = $props();
</script>

<SettingsHeader title="Паспорт" style="position: absolute;"></SettingsHeader>
<div>
	<Passport profile={data.profile}></Passport>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
