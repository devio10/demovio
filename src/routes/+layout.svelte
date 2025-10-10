<script>
	import favicon from "$lib/assets/favicon.svg";
	import HeaderLogo from "$lib/HeaderLogo.svelte";
	import SideNavigation from "$lib/SideNavigation.svelte";
	import { fade, scale } from "svelte/transition";
	import "../app.scss";
	import "@fontsource-variable/montserrat";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="page">
	<div class="page-background">
		<enhanced:img src="$lib/assets/home-california-3-light.png" alt="Website Background" />
	</div>
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
		filter: brightness(0.7);
		picture,
		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
