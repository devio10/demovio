<script lang="ts">
	import AppIcon from "$lib/AppIcon.svelte";
	import { scale } from "svelte/transition";
	let { data } = $props();
	$inspect(data.demovioStatus);
	function getPlayerCountText(players_online: string[]) {
		let players_text = "Сейчас никто не играет";
		if (players_online.length === 1 && players_online[0] !== "0") {
			players_text = `Сейчас играет ${players_online[0]}`;
		} else if (players_online.length === 2) {
			players_text = `Сейчас играют ${players_online[0]} и ${players_online[1]}`;
		} else if (players_online.length > 2) {
			const otherPlayersCount = players_online.length - 1;

			let playerWord;
			if (otherPlayersCount % 10 === 1 && otherPlayersCount % 100 !== 11) {
				playerWord = "другой игрок";
			} else if (
				[2, 3, 4].includes(otherPlayersCount % 10) &&
				![12, 13, 14].includes(otherPlayersCount % 100)
			) {
				playerWord = "других игрока";
			} else {
				playerWord = "других игроков";
			}

			players_text = `Сейчас играют ${players_online[0]} и ${otherPlayersCount} ${playerWord}`;
		}

		return players_text;
	}
</script>

<div class="container" transition:scale|global={{ duration: 500, start: 0.5 }}>
	<div>
		<h2>{data.demovioStatus ? "Сервер онлайн" : "Сервер оффлайн"}</h2>
		<span class="players-number">
			{getPlayerCountText(data.demovioStatus.players)}
		</span>
	</div>

	<nav>
		<AppIcon icon="Players" href="players" badge={data.demovioStatus.players.length}>
			Игроки
		</AppIcon>
		<AppIcon icon="Passport" href="profile/passport">Паспорт</AppIcon>
		<AppIcon icon="Help" href="help">Помощь</AppIcon>
		<br />
		<AppIcon icon="Wiki" href="https://wiki.demovio.love/">Википедия</AppIcon>
		<AppIcon icon="Maps" href="https://map.demovio.love/">Карта</AppIcon>
		<AppIcon icon="Downloads" href="downloads">Загрузки</AppIcon>
		<AppIcon icon="About" href="https://demovio.love/?no-redirect">О Сервере</AppIcon>
	</nav>
	<div>
		<span class="welcome">
			{data.profile ? `Добро пожаловать, ${data.profile.name}` : "Войдите в аккаунт"}
		</span>
	</div>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		&.container {
			position: absolute;
			display: grid;
			grid-template-rows: 1fr auto 1fr;
		}
	}
	h2 {
		font-weight: 500;
		font-size: 40px;
		margin: 0;
		text-shadow: 0 0 30px rgba(0, 0, 0, 0.75);
		text-align: center;
		font-weight: bold;
	}
	.welcome {
		color: rgba(255, 255, 255, 0.85);
		font-weight: 500;
	}
	nav {
		padding: 32px 0;
		text-align: center;
		justify-items: center;
		align-items: center;
		white-space: wrap;
	}
	.players-number {
		margin-top: 8px;
		font-weight: 600;
		text-shadow: 0 0 30px rgba(0, 0, 0, 0.75);
	}
</style>
