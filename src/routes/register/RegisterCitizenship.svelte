<script>
	import Button from "$lib/components/Button.svelte";
	import CitizenshipSelector from "$lib/components/CitizenshipSelector.svelte";
	import { RegisterStage } from "./stages";
	import RegisterPage from "./RegisterPage.svelte";
	import RegisterStateDescription from "./RegisterStateDescription.svelte";

	let { page = $bindable(), citizenship = $bindable() } = $props();
</script>

<RegisterPage style="min-height: 100%;">
	<div class="citizenship-selector">
		<CitizenshipSelector bind:citizenship />
	</div>
	<div class="mobile-scrollable">
		<div class="mobile-state-description">
			<RegisterStateDescription {citizenship} />
		</div>
	</div>
	<div class="button">
		<Button
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
</RegisterPage>

<style lang="scss">
	.citizenship-selector {
		margin: 16px 0;
	}
	.button {
		margin: auto 0 0 0;
	}
	.mobile-state-description {
		display: none;
	}
	@media screen and (max-width: 768px) {
		.citizenship-selector {
			// margin-top: auto;
			margin-bottom: 0;
			margin-top: 0;
		}
		.mobile-state-description {
			display: block;
		}
	}
</style>
