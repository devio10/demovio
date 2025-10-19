<script>
	import EnvironmentIcon from "$lib/components/EnvironmentIcon.svelte";
	import { scale } from "svelte/transition";
</script>

<div class="environment-list" transition:scale|global={{ duration: 500, start: 0.5 }}>
	<EnvironmentIcon src="states-1.webp" name="Безмятежность" />
	<EnvironmentIcon src="states-2.webp" name="Безмятежность" />
	<EnvironmentIcon src="states-3.webp" name="Безмятежность" />
	<br />
	<EnvironmentIcon src="states-4.webp" name="Безмятежность" />
	<EnvironmentIcon src="states-5.webp" name="Безмятежность" />
	<EnvironmentIcon src="states-5.webp" name="Безмятежность" />
	<EnvironmentIcon src="states-5.webp" name="Безмятежность" />
	<br />
	<EnvironmentIcon src="states-1.webp" name="Безмятежность" />
	<EnvironmentIcon src="states-2.webp" name="Безмятежность" />
	<EnvironmentIcon src="states-3.webp" name="Безмятежность" />
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
