<script>
	import Passport from "$lib/Passport.svelte";
	let { data } = $props();
</script>

<Passport profile={data.profile}></Passport>
