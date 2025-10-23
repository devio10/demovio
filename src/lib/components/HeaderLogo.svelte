<script>
	import { onMount } from "svelte";

	let backstageStatus = $state(false);
	onMount(() => {
		backstageStatus = localStorage.getItem("backstage-status") === "true";
	});
</script>

<div>
	<span class="page_logo">
		Demovio
		<div></div>
		{#if backstageStatus}
			Backstage
		{/if}
	</span>
</div>

<style lang="scss">
	.page_logo {
		font-weight: 800;
		font-size: 16px;

		font-family: "Montserrat Variable", sans-serif;
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
