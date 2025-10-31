<script>
	import Passport from "$lib/components/Passport.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	let { data } = $props();
</script>

<svelte:head>
	<title>Профиль Demovio – Паспорт</title>
</svelte:head>

<SettingsHeader title="Паспорт" style="position: absolute;"></SettingsHeader>
<div>
	{#if data.profile && data.profile.isActivated}
		<Passport profile={data.profile}></Passport>
	{:else}
		<p>Нет полученных паспортов.</p>
	{/if}
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
