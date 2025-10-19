<script>
	import EnvironmentIcon from "$lib/components/EnvironmentIcon.svelte";
	import { scale } from "svelte/transition";
</script>

<div class="environment-list" transition:scale|global={{ duration: 500, start: 0.5 }}>
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

<style lang="scss">
	.environment-list {
		// width: 100%;
		// display: flex;
		position: absolute;
		justify-items: center;
		text-align: center;
		align-items: center;
		white-space: wrap;
		flex-wrap: wrap;
		// gap: 24px;
	}
</style>
