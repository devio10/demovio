<script>
	import "../tailwind.css";
	import favicon from "$lib/assets/favicon.svg";
	import HeaderLogo from "$lib/components/HeaderLogo.svelte";
	import SideNavigation from "$lib/components/SideNavigation.svelte";
	import "../app.scss";
	import "@fontsource-variable/noto-sans";
	import { localPreferences } from "$lib/local-settings.svelte";
	import { onMount } from "svelte";
	import { scale } from "svelte/transition";
	import SpatialEnvironment from "$lib/components/SpatialEnvironment.svelte";
	import ActivationDialog from "$lib/ActivationDialog.svelte";
	import ReactivationDialog from "$lib/ReactivationDialog.svelte";

	let { children, data } = $props();

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
	{#if localPreferences.showEnvironment}
		<div class="page-background">
			{#if localPreferences.environment !== ""}
				<img
					src="/Environments/{localPreferences.environment}{localPreferences.environmentDarkAvailable
						? '-light'
						: ''}.webp"
					alt="Website Background"
					in:scale={{ duration: 3000, start: 1.5 }}
				/>
			{/if}
		</div>
		{#if localPreferences.spatialEnvironment !== ""}
			<SpatialEnvironment environment={localPreferences.spatialEnvironment} />
		{/if}
	{/if}

	<header>
		<HeaderLogo />
	</header>
	<SideNavigation loggedIn={data.profile} />
	<main>
		{@render children?.()}
	</main>
	<ActivationDialog profile={data.profile} />
	<ReactivationDialog profile={data.profile} />
</div>

<style lang="scss">
	.page {
		position: relative;
		min-height: 100dvh;
	}
	.page-background {
		position: absolute;
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100%;
		filter: brightness(0.85);
		overflow: clip;
		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	:global {
		.settings-buttons {
			width: 100%;
			padding: 0 48px;
		}
		.settings-buttons-space {
			margin: 24px 0;
		}
		.option-button-icon {
			width: 12px;
			height: 12px;
			color: rgba(230, 230, 230, 0.5);
			display: flex;
			svg {
				width: 100%;
				height: 100%;
			}
		}
	}
	@media screen and (max-width: 768px) {
		header {
			display: none;
		}
		:global {
			.settings-buttons {
				padding: 0 20px;
			}
			.settings-buttons-space {
				margin: 16px 0;
			}
		}
	}
</style>
