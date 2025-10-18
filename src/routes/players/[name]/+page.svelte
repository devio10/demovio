<script lang="ts">
	import { page } from "$app/state";
	import WindowHeaderButton from "$lib/Window/WindowHeaderButton.svelte";
	import WindowHeader from "$lib/Window/WindowHeader.svelte";
	import SettingsButton from "$lib/OptionButton.svelte";
	import SkinModel from "./SkinModel.svelte";
	import WindowPlaceholder from "$lib/Window/WindowPlaceholder.svelte";
	import WindowPlaceholderWarning from "$lib/Window/WindowPlaceholderWarning.svelte";
	import { favoritePlayer, getPlayer } from "./data.remote";
	import { getPlayers } from "../data.remote";
	import { isActionFailure } from "@sveltejs/kit";
	import * as dialog from "$lib/components/Dialog.svelte";
	import NoInvitation from "$lib/components/icons/NoInvitation.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import FeatureButton from "./FeatureButton.svelte";
	const name = $derived(page.params.name!);
	let { data } = $props();
	let submitting = $state(false);
	const query = $derived(getPlayer(name));
	let featured = $derived(query.current?.features);
	const online = $derived(data.demovioStatus.players.includes(name));
	let dialogOpened = $state(false);
</script>

{#snippet header(disabled: boolean)}
	<WindowHeader title={name}>
		{#snippet titleChildren()}
			<span class="last-seen-online">
				{#await query}
					Загрузка...
				{:then query}
					{#if online}
						Сейчас играет
					{:else if data.profile === undefined || name !== data.profile.name}
						Последний раз играл вчера
					{:else}
						Это вы!
					{/if}
				{/await}
			</span>
		{/snippet}
		{#if (data.profile === undefined || name !== data.profile.name) && name}
			<div>
				<WindowHeaderButton disabled={disabled || submitting} name="Уведомления об активности">
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 21.6407 21.5479"
					>
						<path
							d="M5.85213 8.45156C5.77278 9.00724 5.72604 9.64201 5.71292 10.3589C5.63479 12.2632 5.29299 13.523 4.59963 14.3042C4.08206 14.8706 3.50588 15.4468 3.3301 15.73L3.3301 15.8472L13.256 15.8472L14.7323 17.3218L14.2578 17.3218C14.1797 19.2163 12.7051 20.857 10.6446 20.857C8.57424 20.857 7.09963 19.2066 7.02151 17.3218L2.90042 17.3218C1.98245 17.3218 1.42581 16.8531 1.42581 16.1402C1.42581 15.1636 2.4219 14.2847 3.27151 13.4156C3.91604 12.7417 4.08206 11.355 4.16018 10.232C4.18101 9.05961 4.28797 8.01419 4.50155 7.10248ZM8.54495 17.3218C8.62307 18.6499 9.46292 19.48 10.6446 19.48C11.8164 19.48 12.666 18.6499 12.7344 17.3218ZM13.4668 2.96633C16.0645 3.90383 17.0508 6.3843 17.1289 10.232C17.1973 11.355 17.3731 12.7417 18.0176 13.4156C18.8672 14.2847 19.8535 15.1636 19.8535 16.1402C19.8535 16.4153 19.7721 16.654 19.618 16.8429L16.0911 13.318C15.7877 12.5784 15.6274 11.6071 15.5762 10.3589C15.4883 6.09133 14.2188 4.73391 12.5489 4.27493C12.3047 4.21633 12.168 4.09914 12.1582 3.84524C12.1289 2.82961 11.543 2.11672 10.6446 2.11672C9.73635 2.11672 9.16018 2.82961 9.12112 3.84524C9.11135 4.09914 8.9844 4.21633 8.74026 4.27493C8.32447 4.38854 7.93382 4.55721 7.5804 4.81205L6.46956 3.70183C6.86016 3.39603 7.31009 3.15119 7.82229 2.96633C8.15432 1.68704 9.19924 0.681176 10.6446 0.681176C12.0801 0.681176 13.1348 1.68704 13.4668 2.96633Z"
							fill="currentColor"
						/>
						<path
							d="M1.67971 2.6636L19.2188 20.1831C19.5117 20.4859 20 20.4859 20.2832 20.1831C20.5762 19.8902 20.5762 19.4214 20.2832 19.1187L2.75393 1.59914C2.46096 1.30618 1.98245 1.30618 1.67971 1.59914C1.39651 1.88235 1.39651 2.38039 1.67971 2.6636Z"
							fill="currentColor"
						/>
					</svg>
				</WindowHeaderButton>
			</div>
			<FeatureButton {name} bind:featured {disabled} bind:submitting loggedIn={data.profile} />
		{/if}
	</WindowHeader>
{/snippet}

{#if name}
	{#await query}
		{@render header(true)}
	{:then { player }}
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
					{#snippet noInvitationIcon()}
						<NoInvitation />
					{/snippet}
					{#snippet noInvitationButtons()}
						<DialogButton
							accent
							onclick={() => {
								dialog.closeDialog();
							}}
						>
							Закрыть
						</DialogButton>
						<DialogButton
							onclick={() => {
								dialog.closeDialog();
							}}
						>
							Написать в Telegram
						</DialogButton>
					{/snippet}
					<SettingsButton
						onclick={() => {
							dialog.showDialog({
								title: "Не Получилось Отправить Приглашение",
								description: "Игрок запретил приглашать себя в игру.",
								color: "rgb(253, 58, 58)",
								icon: noInvitationIcon,
								children: noInvitationButtons,
							});
						}}
					>
						Пригласить на сервер
					</SettingsButton>
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
