<script>
	import { scale } from "svelte/transition";
</script>

<div class="main-content" transition:scale|global={{ duration: 500, start: 0.5 }}>
	<span>Нет уведомлений</span>
</div>

<style lang="scss">
	.main-content {
		position: absolute;
	}
</style>
