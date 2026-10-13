<script>
	import EnvironmentIcon from "$lib/components/EnvironmentIcon.svelte";
	import TabNavigation from "$lib/components/TabNavigation.svelte";
	import TabNavigationButton from "$lib/components/TabNavigationButton.svelte";
	import { MediaQuery } from "svelte/reactivity";
	import { fly, scale } from "svelte/transition";
	let page = $state(0);
	let flyDirection = $state(1);
	let isMobile = new MediaQuery("screen and (max-width: 768px)");
	let tabNavigationSelection = $state(isMobile.current ? 8 : 16);
	let tabNavigationSelectionWidth = $state(82);
</script>

<div
	class="navigation"
	transition:fly|global={{ duration: 500, y: isMobile.current ? -150 : 150, opacity: 1 }}
>
	<TabNavigation selection={tabNavigationSelection} selectionWidth={tabNavigationSelectionWidth}>
		<TabNavigationButton
			onclick={({ target }) => {
				const targetPage = 0;
				flyDirection = page > targetPage ? -1 : 1;
				page = targetPage;
				tabNavigationSelection = target.offsetLeft;
				tabNavigationSelectionWidth = target.clientWidth;
			}}
		>
			States
		</TabNavigationButton>
		<TabNavigationButton
			onclick={({ target }) => {
				const targetPage = 1;
				flyDirection = page > targetPage ? -1 : 1;
				page = targetPage;
				tabNavigationSelection = target.offsetLeft;
				tabNavigationSelectionWidth = target.clientWidth;
			}}
		>
			Panoramas
		</TabNavigationButton>
		<TabNavigationButton
			onclick={({ target }) => {
				const targetPage = 2;
				flyDirection = page > targetPage ? -1 : 1;
				page = targetPage;
				tabNavigationSelection = target.offsetLeft;
				tabNavigationSelectionWidth = target.clientWidth;
			}}
		>
			Seasons
		</TabNavigationButton>
	</TabNavigation>
</div>
<div class="content" transition:scale|global={{ duration: 500, start: 0.5 }}>
	{#if page === 0}
		<div
			class="environment-list"
			in:fly={{ x: 300 * flyDirection, duration: 450 }}
			out:fly={{ x: -300 * flyDirection, duration: 450 }}
		>
			<EnvironmentIcon src="centralstation" name="Central Station" />
			<EnvironmentIcon src="kyoto" name="Kyoto" />
			<EnvironmentIcon src="ohio" name="Ohio" />
			<br />
			<EnvironmentIcon src="shanghai" name="Streets of Shanghai" />
			<EnvironmentIcon src="lighthouse" name="Lighthouse" />
			<EnvironmentIcon src="enchantment" name="Enchantment" />
			<EnvironmentIcon src="newyork" name="Skyscraper" />
			<br />
			<EnvironmentIcon src="georgia" name="Georgia Mountains" />
			<EnvironmentIcon src="shanghai-center" name="Shanghai Center" />
			<EnvironmentIcon src="bank" name="California Bank" />
		</div>
	{:else if page === 1}
		<div
			class="environment-list"
			in:fly={{ x: 300 * flyDirection, duration: 450 }}
			out:fly={{ x: -300 * flyDirection, duration: 450 }}
		>
			<EnvironmentIcon spatial="shanghai" name="Shanghai" />
			<EnvironmentIcon spatial="california" name="California" />
			<EnvironmentIcon spatial="central_station" name="Central Station" />
			<br />
			<EnvironmentIcon spatial="kyoto" name="Kyoto" />
			<EnvironmentIcon spatial="newyork" name="New York" />
			<EnvironmentIcon spatial="georgia" name="Georgia" />
			<EnvironmentIcon spatial="ohio" name="Ohio" />
			<br />
			<EnvironmentIcon spatial="miami" name="Miami" />
			<EnvironmentIcon spatial="daisy" name="Warm Sea" />
			<EnvironmentIcon spatial="lust" name="Town of Lust" />
		</div>
	{:else}
		<div
			class="environment-list"
			in:fly={{ x: 300 * flyDirection, duration: 450 }}
			out:fly={{ x: -300 * flyDirection, duration: 450 }}
		>
			<EnvironmentIcon src="halloween" darkAvailable={false} name="Halloween" />
			<EnvironmentIcon src="autumn" name="Autumn Forest" />
			<EnvironmentIcon disabled name="Available Soon" />
			<br />
			<EnvironmentIcon disabled name="Available Soon" />
			<EnvironmentIcon disabled name="Available Soon" />
			<EnvironmentIcon disabled name="Available Soon" />
			<EnvironmentIcon disabled name="Available Soon" />
			<br />
			<EnvironmentIcon disabled name="Available Soon" />
			<EnvironmentIcon disabled name="Available Soon" />
			<EnvironmentIcon disabled name="Available Soon" />
		</div>
	{/if}
</div>

<style lang="scss">
	.navigation {
		position: fixed;
		bottom: 32px;
		z-index: 3;
	}
	.content {
		position: absolute;
		overflow: clip;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}
	.environment-list {
		// width: 100%;
		// display: flex;
		position: absolute;
		width: 100%;
		justify-items: center;
		text-align: center;
		align-items: center;
		white-space: wrap;
		flex-wrap: wrap;
		// gap: 24px;
	}
	@media screen and (max-width: 768px) {
		.navigation {
			top: calc(max(env(safe-area-inset-top, 0), 8px) + 8px);
			bottom: auto;
		}
		.content {
			align-items: flex-start;
		}
		.environment-list {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			width: 100%;
			justify-content: center;
			align-items: baseline;
			max-height: 100%;
			overflow-y: auto;
			padding: 72px 16px 96px 16px;
			padding-top: calc(max(env(safe-area-inset-top, 0), 16px) + 56px);
			br {
				display: none;
			}
		}
	}
	@media screen and (max-width: 500px) {
		.environment-list {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	@media screen and (max-width: 360px) {
		.environment-list {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
