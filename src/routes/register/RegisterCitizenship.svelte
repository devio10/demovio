<script>
	import Button from "$lib/components/Button.svelte";
	import CitizenshipSelector from "$lib/components/CitizenshipSelector.svelte";
	import { RegisterStage } from "./stages";
	import RegisterPage from "./RegisterPage.svelte";

	let { page = $bindable(), citizenship = $bindable() } = $props();
</script>

<RegisterPage>
	<div style="margin-top: 16px">
		<CitizenshipSelector bind:citizenship />
	</div>
	<Button
		style="margin: auto 0 0 0"
		onclick={() => {
			if (citizenship.code === undefined) {
				return;
			}
			page = RegisterStage.choosePronouns;
		}}
	>
		{#if citizenship.code === undefined}
			Выберите штат
		{:else}
			Выбрать ({citizenship.name})
		{/if}
	</Button>
</RegisterPage>
