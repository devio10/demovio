<script>
	import Passport from "$lib/Passport.svelte";
	import WindowHeader from "$lib/Window/WindowHeader.svelte";
	let { data } = $props();
</script>

<WindowHeader title="Паспорт" style="position: absolute;"></WindowHeader>
<div>
	<Passport profile={data.profile}></Passport>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		height: max-content;
	}
</style>
