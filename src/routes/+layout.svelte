<script>
	import "../tailwind.css";
	import favicon from "$lib/assets/favicon.svg";
	import HeaderLogo from "$lib/components/HeaderLogo.svelte";
	import SideNavigation from "$lib/components/SideNavigation.svelte";
	import "../app.scss";
	import "@fontsource-variable/montserrat";
	import { localPreferences } from "$lib/local-settings.svelte";
	import { onMount } from "svelte";
	import { scale } from "svelte/transition";
	import SpatialEnvironment from "$lib/components/SpatialEnvironment.svelte";

	let { children } = $props();

	onMount(() => {
		const storageEnvironment = localStorage.getItem("environment");
		const storageSpatialEnvironment = localStorage.getItem("spatialEnvironment");
		localPreferences.spatialEnvironment = storageSpatialEnvironment ?? "";
		localPreferences.environment = storageEnvironment ?? "states-10.webp";
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="page">
	<div class="page-background">
		{#if localPreferences.environment !== ""}
			<img
				src="/EnvironmentPreview/{localPreferences.environment}"
				alt="Website Background"
				in:scale={{ duration: 3000, start: 1.5 }}
			/>
		{/if}
	</div>
	{#if localPreferences.spatialEnvironment !== ""}
		<SpatialEnvironment />
	{/if}

	<header>
		<HeaderLogo />
	</header>
	<SideNavigation />
	<main>
		{@render children?.()}
	</main>
</div>

<style lang="scss">
	.page {
		position: relative;
		min-height: 100vh;
	}
	.page-background {
		position: absolute;
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100%;
		filter: brightness(0.85);
		overflow: clip;
		picture,
		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	:global {
		.settings-content {
			flex: 1;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.settings-buttons {
			width: 100%;
			padding: 0 48px;
		}
		.settings-buttons-space {
			margin: 24px 0;
		}
	}
	@media screen and (max-width: 768px) {
		header {
			display: none;
		}
	}
</style>
