<script lang="ts">
	import { page } from "$app/state";
	import IndexPage from "../IndexPage.svelte";
	import PlayerPage from "./PlayerPage.svelte";

	const name = $derived(page.params.name);
</script>

{#if name}
	<PlayerPage {name} />
{:else}
	<IndexPage />
{/if}
