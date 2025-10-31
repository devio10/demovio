<script>
	import ProfileOverview from "./ProfileOverview.svelte";
	let { data } = $props();
</script>

<svelte:head>
	<title>Профиль Demovio</title>
</svelte:head>
<ProfileOverview {data} />
