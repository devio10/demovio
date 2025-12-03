<script>
	import Passport from "$lib/components/Passport.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import SettingsContent from "../SettingsContent.svelte";
	let { data } = $props();
</script>

<svelte:head>
	<title>Профиль Demovio – Паспорт</title>
</svelte:head>

<SettingsHeader title="Паспорт"></SettingsHeader>
<SettingsContent style="padding-top: 32px;">
	<div>
		{#if data.profile && data.profile.isActivated}
			<Passport profile={data.profile}></Passport>
		{:else}
			<p>Нет полученных паспортов.</p>
		{/if}
	</div>
</SettingsContent>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
