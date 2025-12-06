<script lang="ts">
	import { page } from "$app/state";
	import Passport from "$lib/components/Passport.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import { fade } from "svelte/transition";
	import SettingsContent from "../../../profile/SettingsContent.svelte";
	import type { GetPlayerResponse } from "../data.remote";
	import { getPlayer } from "../data.remote";
	let player: GetPlayerResponse | undefined = $state();
	$inspect(player);

	const name = $derived(page.params.name);
	$effect(() => {
		async function fetchPlayer() {
			if (name) {
				try {
					player = await getPlayer(name);
				} catch (e) {
					console.log(e);
				}
			}
		}
		fetchPlayer();
	});
</script>

<SettingsHeader doFade={false} title="Паспорт"></SettingsHeader>

<SettingsContent doFade={false} style="padding-top: 32px;">
	<div in:fade={{ duration: 250 }}>
		{#if player}
			<Passport profile={player} />
		{/if}
	</div>
</SettingsContent>
