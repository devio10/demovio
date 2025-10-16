<script>
	import Button from "$lib/Button.svelte";
	import CitizenshipSelector from "$lib/components/CitizenshipSelector.svelte";
	import { RegisterStage } from "./stages";

	let { page = $bindable(), citizenship = $bindable() } = $props();
</script>

<div class="register-page">
	<div style="margin-top: 16px">
		<CitizenshipSelector bind:citizenship />
	</div>
	<Button
		style="margin: 32px 0 0 0"
		onclick={() => {
			if (citizenship.code === undefined) {
				return;
			}
			page = RegisterStage.leaveContact;
		}}
	>
		{#if citizenship.code === undefined}
			Выберите штат
		{:else}
			Выбрать ({citizenship.name})
		{/if}
	</Button>
</div>
