<script lang="ts">
	import * as Window from "$lib/Window/index.svelte";
	let {
		error,
	}: {
		error: unknown;
	} = $props();
</script>

{#if error instanceof Error}
	{#if error.name === "TimeoutError"}
		<Window.PlaceholderWarning>Превышено время ожидания</Window.PlaceholderWarning>
	{:else if error.name === "AbortError"}
		<Window.PlaceholderWarning>Неправильный ответ от сервера</Window.PlaceholderWarning>
	{:else}
		<Window.PlaceholderWarning>Ошибка соединения с сервером</Window.PlaceholderWarning>
	{/if}
{/if}
