<script lang="ts">
	import { page } from "$app/state";
	import WindowHeader from "$lib/Window/WindowHeader.svelte";
	import SettingsButton from "$lib/components/OptionButton.svelte";
	import SkinModel from "./SkinModel.svelte";
	import WindowPlaceholder from "$lib/Window/WindowPlaceholder.svelte";
	import WindowPlaceholderWarning from "$lib/Window/WindowPlaceholderWarning.svelte";
	import { getPlayer } from "./data.remote";
	import InvitePlayerButton from "./InvitePlayerButton.svelte";
	import NotifyActivityButton from "./NotifyActivityButton.svelte";
	import FeatureButton from "./FeatureButton.svelte";
	import LastSeen from "./LastSeen.svelte";
	import { getCurrentDemovioStatus } from "../../status.remote";
	const name = $derived(page.params.name!);
	let { data } = $props();
	let submitting = $state(false);
	const query = $derived(getPlayer(name));
	let featured = $derived(query.current?.featured);
	let subscribed = $derived(query.current?.subscribed);
	const online = $state();
</script>

{#snippet header(disabled: boolean)}
	<WindowHeader title={name}>
		{#snippet titleChildren()}
			<LastSeen {query} {online} profile={data.profile} />
		{/snippet}
		{#if (data.profile === undefined || name !== data.profile.name) && name}
			<NotifyActivityButton
				{name}
				loggedIn={data.profile}
				{disabled}
				bind:submitting
				{subscribed}
			/>
			<FeatureButton {name} bind:featured {disabled} bind:submitting loggedIn={data.profile} />
		{/if}
	</WindowHeader>
{/snippet}

{#if name}
	{#await query}
		{@render header(true)}
	{:then player}
		{#if player !== undefined}
			{@render header(false)}
			<div class="top_flex">
				<p class="description">
					{#if player.description?.length === 0 || !player.description}
						<i style="color: rgba(200,200,200,0.5)">Описание отсутствует...</i>
					{:else}
						{player.description}
					{/if}
				</p>
				{#key player.name}
					<SkinModel skin={player.skin} name={player.name} />
				{/key}
			</div>
			<!-- <div class="player-map"><div></div></div> -->
			<div class="action-buttons">
				{#if data.profile === undefined || name !== data.profile.name}
					{#if online}
						<SettingsButton tag="a" href="https://map.demovio.love/">
							Показать на карте
						</SettingsButton>
					{/if}
					<InvitePlayerButton contact={"contact" in player ? player.contact : undefined} />
					{#if "contact" in player}
						<SettingsButton tag="a" href="https://t.me/{player.contact}">
							Написать в Telegram
						</SettingsButton>
					{/if}
					<SettingsButton style="color: rgb(235, 52, 79)">Пожаловаться</SettingsButton>
				{:else}
					<SettingsButton tag="a" href="/profile">Открыть свой профиль</SettingsButton>
				{/if}
			</div>
		{:else}
			<WindowPlaceholder>
				<WindowPlaceholderWarning>Нет игрока с таким именем</WindowPlaceholderWarning>
			</WindowPlaceholder>
		{/if}
	{:catch e}
		<p>{e}</p>
	{/await}
{/if}

<style lang="less">
	.top_flex {
		display: flex;
	}
	.description {
		margin: 16px 24px 24px 36px;
		font-weight: 600;
		line-height: 1.4;
		overflow-wrap: break-word;
		white-space: pre-wrap;
	}
	.action-buttons {
		margin-top: auto;
		width: 100%;
		padding: 36px;
	}
</style>
