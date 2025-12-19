<script lang="ts">
	import WindowHeader from "$lib/Window/WindowHeader.svelte";
	import SettingsButton from "$lib/components/OptionButton.svelte";
	import SkinModel from "./SkinModel.svelte";
	import WindowPlaceholder from "$lib/Window/WindowPlaceholder.svelte";
	import WindowPlaceholderWarning from "$lib/Window/WindowPlaceholderWarning.svelte";
	import { getPlayer, type GetPlayerResponse } from "./data.remote";
	import InvitePlayerButton from "./InvitePlayerButton.svelte";
	import NotifyActivityButton from "./NotifyActivityButton.svelte";
	import FeatureButton from "./FeatureButton.svelte";
	import LastSeen from "./LastSeen.svelte";
	import { page } from "$app/state";
	import { getCurrentDemovioStatus } from "../../status.remote";
	import * as Window from "$lib/Window/index.svelte";
	import { onMount } from "svelte";
	import { localPreferences } from "$lib/local-settings.svelte";
	import IconRight from "$lib/components/icons/IconRight.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import BanPlayer from "./BanPlayer.svelte";

	let {
		name,
	}: {
		name: string;
	} = $props();

	let serverState = $state(null);
	async function fetchDemovioStatus() {
		serverState = (await getCurrentDemovioStatus()) ?? null;
	}

	let player: GetPlayerResponse | undefined | null = $state();
	let playerError = $state();
	$effect(() => {
		async function fetchPlayer() {
			try {
				player = (await getPlayer(name)) ?? null;
			} catch (e) {
				playerError = e;
			}
		}
		fetchPlayer();
		fetchDemovioStatus();
	});

	let featured = $derived(player ? player.featured : false);
	let subscribed = $derived(player?.subscribed);
	let banned = $derived(player && "isBanned" in player ? player.isBanned : false);
	let submitting = $state(false);

	const ourProfile = $derived(page.data.profile);
	const ourName = $derived(ourProfile?.name);
	const isSelf = $derived(
		player !== undefined && player !== null && ourName !== undefined && player.name === ourName,
	);
	const isOnline = $derived(
		player !== undefined &&
			player !== null &&
			serverState &&
			serverState.players.includes(player.name),
	);

	onMount(() => {
		const interval = setInterval(() => {
			fetchDemovioStatus();
		}, 5000);
		return () => clearInterval(interval);
	});
</script>

{#if playerError}
	<Window.Error error={playerError} />
{:else if player}
	{#snippet header(disabled: boolean)}
		<WindowHeader title={name}>
			{#snippet subtitle()}
				{#if player}
					<LastSeen
						value={Promise.resolve(
							isSelf
								? { isSelf: true }
								: isOnline
									? { online: true }
									: banned
										? { isBanned: true, pronouns: player.pronouns }
										: { lastSeen: player.lastOnline, pronouns: player.pronouns },
						)}
					/>
				{/if}
			{/snippet}
			{#if ourProfile === null || ourProfile.name !== name}
				<NotifyActivityButton {name} bind:subscribed {disabled} bind:submitting />
				<FeatureButton {name} bind:featured {disabled} bind:submitting />
			{/if}
		</WindowHeader>
	{/snippet}

	{#if name}
		{#if !player}
			{@render header(true)}
		{:else if player !== null && player !== undefined}
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
					{#if localPreferences.backstageStatus && page.data.profile?.administrator}
						<SettingsButton tag="a" href={`${name}/passport`}>
							Открыть паспорт <div class="option-button-arrow-icon">
								<IconRight />
							</div>
						</SettingsButton>
						<SettingsButton>
							Изменить личные данные <div class="option-button-arrow-icon">
								<IconRight />
							</div>
						</SettingsButton>
					{/if}
					{#if isOnline}
						<SettingsButton tag="a" href="https://map.demovio.love/">
							Показать на карте <div class="option-button-arrow-icon">
								<IconRight />
							</div>
						</SettingsButton>
					{:else if !banned}
						<InvitePlayerButton {name} contact={player.contact} />
					{/if}
					{#if player.contact}
						<SettingsButton tag="a" href="https://t.me/{player.contact}">
							Написать в Telegram...
						</SettingsButton>
					{/if}

					{#if localPreferences.backstageStatus && page.data.profile?.administrator}
						<BanPlayer {name} bind:banned />
					{:else}<SettingsButton disabled style="color: rgb(235, 52, 79)">
							Пожаловаться
						</SettingsButton>{/if}
				{:else}
					<SettingsButton tag="a" href="/profile">
						Открыть свой профиль <div class="option-button-arrow-icon">
							<IconRight />
						</div>
					</SettingsButton>
				{/if}
			</div>
		{/if}
	{/if}
{:else if player === undefined}
	<Window.Placeholder>
		<LoadingWheel --wheel-size="128px" --wheel-color="rgba(255,255,255,0.75)" />
	</Window.Placeholder>
{:else}
	<WindowPlaceholder>
		<WindowPlaceholderWarning>Нет игрока с таким именем</WindowPlaceholderWarning>
	</WindowPlaceholder>
{/if}

<style lang="less">
	.top_flex {
		display: flex;
	}
	.description {
		margin: 16px 24px 24px 36px;
		font-weight: 600;
		font-size: 16px;
		line-height: 1.4;
		overflow-wrap: break-word;
		white-space: pre-wrap;
	}
	.action-buttons {
		margin-top: auto;
		width: 100%;
		padding: 36px;
	}
	@media screen and (max-width: 768px) {
		.description {
			margin: 12px 16px 16px 24px;
		}
		.action-buttons {
			padding: 24px 24px 48px 24px;
		}
	}
</style>
