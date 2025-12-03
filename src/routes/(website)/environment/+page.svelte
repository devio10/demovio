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
		<TabNavigationButton
			onclick={({ target }) => {
				const targetPage = 2;
				flyDirection = page > targetPage ? -1 : 1;
				page = targetPage;
				tabNavigationSelection = target.offsetLeft;
				tabNavigationSelectionWidth = target.clientWidth;
			}}
		>
			Сезоны
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
			<EnvironmentIcon src="centralstation" name="Центральный Вокзал" />
			<EnvironmentIcon src="kyoto" name="Киото" />
			<EnvironmentIcon src="ohio" name="Огайо" />
			<br />
			<EnvironmentIcon src="shanghai" name="Улицы Шанхая" />
			<EnvironmentIcon disabled name="Скоро выйдет" />
			<EnvironmentIcon disabled name="Скоро выйдет" />
			<EnvironmentIcon src="newyork" name="Башня Нью Йорка" />
			<br />
			<EnvironmentIcon src="georgia" name="Горы Джорджии" />
			<EnvironmentIcon src="shanghai-center" name="Шанхайская мэрия" />
			<EnvironmentIcon src="bank" name="Банк Калифорния" />
		</div>
	{:else if page === 1}
		<div
			class="environment-list"
			in:fly={{ x: 300 * flyDirection, duration: 450 }}
			out:fly={{ x: -300 * flyDirection, duration: 450 }}
		>
			<EnvironmentIcon spatial="shanghai" name="Шанхай" />
			<EnvironmentIcon spatial="california" name="Калифорния" />
			<EnvironmentIcon spatial="central_station" name="Центральный вокзал" />
			<br />
			<EnvironmentIcon spatial="kyoto" name="Киото" />
			<EnvironmentIcon spatial="newyork" name="Нью Йорк" />
			<EnvironmentIcon spatial="georgia" name="Джорджия" />
			<EnvironmentIcon spatial="ohio" name="Огайо" />
			<br />
			<EnvironmentIcon spatial="miami" name="Майами" />
			<EnvironmentIcon spatial="daisy" name="Тёплое море" />
			<EnvironmentIcon spatial="dick" name="Город Похоти" />
		</div>
	{:else}
		<div
			class="environment-list"
			in:fly={{ x: 300 * flyDirection, duration: 450 }}
			out:fly={{ x: -300 * flyDirection, duration: 450 }}
		>
			<EnvironmentIcon src="halloween" darkAvailable={false} name="Хэллоуин" />
			<EnvironmentIcon src="autumn" name="Осенний Лес" />
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
