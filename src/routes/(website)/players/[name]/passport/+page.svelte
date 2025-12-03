<script lang="ts">
	import { page } from "$app/state";
	import Passport from "$lib/components/Passport.svelte";
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

{#if player}
	<Passport profile={player} />
{/if}
