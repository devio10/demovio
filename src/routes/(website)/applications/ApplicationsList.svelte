<script lang="ts">
	import { getSkinURL } from "$lib/scripts";
	import * as Window from "$lib/Window/index.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import { getApplications } from "./data.remote";

	let {
		searchQuery,
		applicationsType,
	}: {
		searchQuery: string;
		applicationsType: number;
	} = $props();

	let players = getApplications({ type: applicationsType });
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
