<script lang="ts">
	import { page } from "$app/state";
	import IndexPage from "../IndexPage.svelte";
	import PlayerPage from "./PlayerPage.svelte";

	const name = $derived(page.params.name);
</script>

<svelte:head>
	<title>Профиль игрока {name}</title>
</svelte:head>
{#if name}
	<PlayerPage {name} />
{:else}
	<IndexPage />
{/if}
