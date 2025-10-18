<script lang="ts">
	import { page } from "$app/state";
	import WindowHeader from "$lib/Window/WindowHeader.svelte";
	import SettingsButton from "$lib/OptionButton.svelte";
	import SkinModel from "./SkinModel.svelte";
	import WindowPlaceholder from "$lib/Window/WindowPlaceholder.svelte";
	import WindowPlaceholderWarning from "$lib/Window/WindowPlaceholderWarning.svelte";
	import { getPlayer } from "./data.remote";
	import InvitePlayerButton from "./InvitePlayerButton.svelte";
	import NotifyActivityButton from "./NotifyActivityButton.svelte";
	import FeatureButton from "./FeatureButton.svelte";
	import { formatDistanceToNowStrict, formatRelative } from "date-fns";
	import { ru } from "date-fns/locale/ru";
	const name = $derived(page.params.name!);
	let { data } = $props();
	let submitting = $state(false);
	const query = $derived(getPlayer(name));
	let featured = $derived(query.current?.featured);
	let subscribed = $derived(query.current?.subscribed);
	const online = $derived(data.demovioStatus.players.includes(name));
</script>

{#snippet header(disabled: boolean)}
	<WindowHeader title={name}>
		{#snippet titleChildren()}
			<span class="last-seen-online">
				{#await query}
					Загрузка...
				{:then player}
					{#if online}
						Сейчас играет
					{:else if data.profile === undefined || name !== data.profile.name}
						{#if player?.pronouns === "он/его"}Играл
						{:else if player?.pronouns === "она/её"}Играла
						{:else}Играли
						{/if}
						{formatDistanceToNowStrict(player?.lastOnline, { locale: ru, addSuffix: true })}
					{:else}
						Это вы!
					{/if}
				{/await}
			</span>
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
				<p class="description">{player.description}</p>
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
					<InvitePlayerButton />
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
	.content {
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}
	.last-seen-online {
		color: rgba(200, 200, 200, 0.7);
		margin: 0;
	}
	.top_flex {
		display: flex;
	}
	.description {
		margin: 16px 24px 24px 36px;
		font-weight: 600;
		line-height: 1.4;
	}
	.player-map {
		margin: 36px;
		margin-top: auto;
		width: calc(100% - 72px);
		aspect-ratio: 2/1;

		background-image: url("$lib/assets/player-map.png");
		opacity: 0.8;
		filter: saturate(0.8);
		border-radius: 16px;
		overflow: clip;
		div {
			width: 100%;
			height: 100%;
			border-radius: 16px;
			backdrop-filter: blur(16px);
			box-shadow: inset 0px 0px 10px 10px rgba(25, 25, 25, 0.4);
		}
	}
	.action-buttons {
		margin-top: auto;
		width: 100%;
		padding: 36px;
	}
</style>
