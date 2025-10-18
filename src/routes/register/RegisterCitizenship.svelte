<script>
	import Button from "$lib/Button.svelte";
	import CitizenshipSelector from "$lib/components/CitizenshipSelector.svelte";
	import { scale } from "svelte/transition";
	import { RegisterStage } from "./stages";

	let { page = $bindable(), citizenship = $bindable() } = $props();
</script>

<div class="register-page" transition:scale={{ duration: 250, start: 0.95 }}>
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
</div>
