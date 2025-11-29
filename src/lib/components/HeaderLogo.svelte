<script>
	import { localPreferences } from "$lib/local-settings.svelte";

	let backstageStatus = $derived(localPreferences.backstageStatus);
</script>

<div>
	{#if backstageStatus}
		<img src="/backstage-header_logo.svg" alt="Demovio logo" />
	{:else}
		<img src="/demovio-header_logo.svg" alt="Demovio logo" />
	{/if}
</div>

<style lang="scss">
	.page_logo {
		font-weight: 800;
		font-size: 16px;

		font-family: "Noto Sans Variable", sans-serif;
		div {
			background-color: white;
			width: 6px;
			aspect-ratio: 1/1;
			display: inline-block;
			margin-bottom: 8px;
			margin-left: -4px;
		}
	}
</style>
