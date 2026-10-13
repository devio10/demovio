<script>
	import ProfileOverview from "../ProfileOverview.svelte";
	let { data } = $props();
</script>

<svelte:head>
	<title>Demovio profile</title>
</svelte:head>

<ProfileOverview {data} />
