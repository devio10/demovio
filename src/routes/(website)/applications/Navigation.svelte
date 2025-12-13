<script lang="ts">
	import { onMount } from "svelte";
	import * as Window from "$lib/Window/index.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import { getApplications } from "./data.remote";
	import ApplicationsList from "./ApplicationsList.svelte";

	let { applicationsType } = $props();
	let searchQuery = $state("");
	let updating = $state(false);

	onMount(() => {
		const reloadInterval = setInterval(() => {
			updating = true;
			getApplications({ type: applicationsType })
				.refresh()
				.finally(() => (updating = false));
		}, 10000);
		return () => clearInterval(reloadInterval);
	});
</script>

<Window.Navigation --width="45%">
	<Window.NavigationHeader title="Заявки">
		{#snippet subtitle()}
			{#if updating}
				<LoadingWheel --wheel-size="33px" --wheel-color="rgba(255,255,255,0.75)" />
			{/if}
		{/snippet}
		<Window.PlaceholderSearch bind:value={searchQuery} placeholder="Поиск по заявкам" />
		<Window.NavigationTabsList>
			{#if applicationsType === 0}
				<Window.NavigationTab>Новые игроки</Window.NavigationTab>
				<Window.NavigationTab>Гражданство</Window.NavigationTab>
				<Window.NavigationTab>Жалобы</Window.NavigationTab>
				<Window.NavigationTab>Ещё что-нибудь</Window.NavigationTab>
			{:else if applicationsType === 1}
				<Window.NavigationTab>Новые</Window.NavigationTab>
				<Window.NavigationTab>Рассмотренные</Window.NavigationTab>
			{/if}
		</Window.NavigationTabsList>
	</Window.NavigationHeader>
	<ApplicationsList {searchQuery} {applicationsType} />
</Window.Navigation>
