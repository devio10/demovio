<script>
	import EnvironmentIcon from "$lib/components/EnvironmentIcon.svelte";
	import TabNavigation from "$lib/components/TabNavigation.svelte";
	import TabNavigationButton from "$lib/components/TabNavigationButton.svelte";
	import { fly, scale } from "svelte/transition";
	let page = $state(0);
	let flyDirection = $state(1);
	let tabNavigationSelection = $state(16);
	let tabNavigationSelectionWidth = $state(82);
</script>

<div class="navigation" transition:fly|global={{ duration: 300, y: 200, opacity: 1 }}>
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
			Штаты
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
			Панорама
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
			<EnvironmentIcon src="states-1.webp" name="Центральный Вокзал" />
			<EnvironmentIcon src="states-2.webp" name="Киото" />
			<EnvironmentIcon src="states-3.webp" name="Хэллоуин" />
			<br />
			<EnvironmentIcon src="states-4.webp" name="Улицы Шанхая" />
			<EnvironmentIcon src="states-5.webp" name="Огайо" />
			<EnvironmentIcon src="states-6.webp" name="Шанхайская мэрия" />
			<EnvironmentIcon src="states-7.webp" name="Башня Нью Йорка" />
			<br />
			<EnvironmentIcon src="states-8.webp" name="Горы Джорджии" />
			<EnvironmentIcon src="states-9.webp" name="Осенний Лес" />
			<EnvironmentIcon src="states-10.webp" name="Банк Калифорния" />
		</div>
	{:else}
		<div
			class="environment-list"
			in:fly={{ x: 300 * flyDirection, duration: 450 }}
			out:fly={{ x: -300 * flyDirection, duration: 450 }}
		>
			<EnvironmentIcon spatial="shanghai" src="states-4.webp" name="Шанхай" />
			<EnvironmentIcon disabled name="Скоро выйдет" />
			<EnvironmentIcon disabled name="Скоро выйдет" />
			<br />
			<EnvironmentIcon disabled name="Скоро выйдет" />
			<EnvironmentIcon disabled name="Скоро выйдет" />
			<EnvironmentIcon disabled name="Скоро выйдет" />
			<EnvironmentIcon disabled name="Скоро выйдет" />
			<br />
			<EnvironmentIcon disabled name="Скоро выйдет" />
			<EnvironmentIcon disabled name="Скоро выйдет" />
			<EnvironmentIcon disabled name="Скоро выйдет" />
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
			top: 16px;
			bottom: auto;
		}
		.environment-list {
			display: flex;
			width: 100%;
			justify-content: center;
			align-items: baseline;
		}
	}
</style>
