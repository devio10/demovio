<script lang="ts">
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
	import { error } from "@sveltejs/kit";
	import { page } from "$app/state";
	import { getCurrentDemovioStatus } from "../../status.remote";

	let {
		name,
	}: {
		name: string;
	} = $props();

	const serverState = await getCurrentDemovioStatus();

	const player = $derived(await getPlayer(name));

	let featured = $derived(player?.featured);
	let subscribed = $derived(player?.subscribed);
	let submitting = $state(false);

	const ourProfile = $derived(page.data.profile);
	const ourName = $derived(ourProfile?.name);
	const isSelf = $derived(player !== undefined && ourName !== undefined && player.name === ourName);
	const isOnline = $derived(
		player !== undefined && serverState !== false && serverState.players.includes(player.name),
	);
</script>

{#if player}
	{#snippet header(disabled: boolean)}
		<WindowHeader title={name}>
			{#snippet subtitle()}
				<LastSeen
					value={Promise.resolve(
						isSelf
							? { isSelf: true }
							: isOnline
								? { online: true }
								: { lastSeen: player.lastOnline, pronouns: player.pronouns },
					)}
				/>
			{/snippet}
			{#if ourProfile !== null}
				<NotifyActivityButton {name} bind:subscribed {disabled} bind:submitting />
				<FeatureButton {name} bind:featured {disabled} bind:submitting />
			{/if}
		</WindowHeader>
	{/snippet}

	{#if name}
		{#await player}
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
					{#if !isSelf}
						{#if isOnline}
							<SettingsButton tag="a" href="https://map.demovio.love/">
								Показать на карте
							</SettingsButton>
						{/if}
						<InvitePlayerButton contact={player.contact} />
						{#if player.contact}
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
