<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../app.scss';
	import '@fontsource-variable/montserrat';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<header>
	<div>
		<span class="page_logo">Demovio<div></div></span>
	</div>
</header>
{@render children?.()}