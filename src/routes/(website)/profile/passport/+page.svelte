<script>
	import Passport from "$lib/components/Passport.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import SettingsContent from "../SettingsContent.svelte";
	let { data } = $props();
</script>

<svelte:head>
	<title>Профиль Demovio – Passport</title>
</svelte:head>

<SettingsHeader title="Passport"></SettingsHeader>
<SettingsContent>
	<div>
		{#if data.profile && data.profile.isActivated}
			<Passport profile={data.profile}></Passport>
		{:else}
			<p>You don't have any passports.</p>
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
