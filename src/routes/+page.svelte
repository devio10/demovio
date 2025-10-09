<script>
	import AppIcon from "$lib/AppIcon.svelte";
	import { api_url } from "$lib/const";
	import { onMount } from "svelte";
	let { data } = $props();
	let status = $state("Загрузка...");
	let players = $state([]);
	function getPlayerCountText(players_online) {
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
	async function checkStatus() {
		const req = await fetch(`${api_url}status.php`);
		if (req.status >= 200 && req.status < 300) {
			const text = await req.text();
			if (text == "offline") {
				status = "Сервер оффлайн";
				players = "";
				return;
			}
			status = "Сервер онлайн";
			console.log(text);
			players = text.split(",");
		} else {
			status = "Сервер оффлайн";
			console.error("Request failed with status ", req.status);
		}
	}

	onMount(() => {
		checkStatus();
		let timer = setInterval(checkStatus, 3000);
		return () => {
			clearInterval(timer);
		};
	});
</script>

<h2>{status}</h2>
<span class="welcome">Добро пожаловать, devio10</span>
<nav>
	<AppIcon icon="Players" href="players" badge="2">Игроки</AppIcon>
	<AppIcon icon="Passport" href="players" badge="99+">Паспорт</AppIcon>
	<AppIcon icon="Help" href="players">Помощь</AppIcon>
	<br />
	<AppIcon icon="Wiki" href="https://wiki.demovio.love/">Википедия</AppIcon>
	<AppIcon icon="Maps" href="https://map.demovio.love/">Карта</AppIcon>
	<AppIcon icon="Downloads" href="players">Загрузки</AppIcon>
	<AppIcon icon="About" href="https://demovio.love/?no-redirect">О Сервере</AppIcon>
</nav>
<span class="players-number">
	{getPlayerCountText(players)}
</span>

<style lang="scss">
	h2 {
		font-weight: 500;
		font-size: 40px;
		margin: 0;
		text-shadow: 0 0 30px rgba(0, 0, 0, 0.75);
		text-align: center;
		font-weight: bold;
	}
	.welcome {
		margin: 16px 0 0 0;
		color: rgba(255, 255, 255, 0.75);
	}
	nav {
		margin-top: 36px;
		text-align: center;
		justify-items: center;
		align-items: center;
		white-space: wrap;
	}
	.players-number {
		margin-top: 48px;
		font-weight: 600;
		text-shadow: 0 0 30px rgba(0, 0, 0, 0.75);
	}
</style>
