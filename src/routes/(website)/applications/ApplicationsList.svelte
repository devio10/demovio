<script lang="ts">
	import { getSkinURL } from "$lib/scripts";
	import * as Window from "$lib/Window/index.svelte";
	import { getCurrentDemovioStatus } from "../status.remote";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import { onMount } from "svelte";
	import { localPreferences } from "$lib/local-settings.svelte";
	import { getApplications } from "./data.remote";

	let {
		searchQuery,
	}: {
		searchQuery: string;
	} = $props();

	const demovioStatus = getCurrentDemovioStatus();
	let players = getApplications();

	onMount(() => {
		const interval = setInterval(() => {
			getApplications().refresh();
			getCurrentDemovioStatus().refresh();
		}, 5000);
		return () => clearInterval(interval);
	});
</script>

{#if players.error}
	<Window.Placeholder>
		<Window.Error error={players.error} />
	</Window.Placeholder>
{:else if players.current}
	{#if players.current.length}
		<Window.NavigationList>
			{@const list = players.current.filter((p) =>
				p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
			)}
			{#each list as { name, skin, pronouns, featured, citizenship }, i (name)}
				<Window.NavigationPlayer
					{name}
					pronouns={pronouns ?? undefined}
					{i}
					{featured}
					skin={getSkinURL(skin, name)}
				/>
			{/each}
		</Window.NavigationList>
	{:else if searchQuery}
		<Window.Placeholder>
			<Window.PlaceholderWarning>Нет игроков по вашему запросу</Window.PlaceholderWarning>
		</Window.Placeholder>
	{:else}
		<Window.Placeholder>
			<Window.PlaceholderWarning>Все заявки рассмотрены</Window.PlaceholderWarning>
		</Window.Placeholder>
	{/if}
{:else}
	<Window.Placeholder>
		<LoadingWheel --wheel-size="128px" --wheel-color="rgba(255,255,255,0.75)" />
	</Window.Placeholder>
{/if}
