<script>
	import favicon from "$lib/assets/favicon.svg";
	import HeaderLogo from "$lib/HeaderLogo.svelte";
	import SideNavigation from "$lib/SideNavigation.svelte";
	import "../app.scss";
	import "@fontsource-variable/montserrat";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<header>
	<HeaderLogo />
</header>
<SideNavigation />
<main>
	{@render children?.()}
</main>
