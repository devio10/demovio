<script>
	import IconBackstage from "$lib/components/icons/IconBackstage.svelte";
	import IndexPage from "../players/IndexPage.svelte";
</script>

<svelte:head>
	<title>Список игроков</title>
</svelte:head>
<div>
	<IconBackstage />
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;

		:global {
			svg {
				color: rgba(230, 230, 230, 0.5);
				width: 40%;
			}
		}
	}
</style>
