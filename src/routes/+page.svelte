<script>
	import AppIcon from "$lib/AppIcon.svelte";
</script>

<h2>Сервер онлайн</h2>
<nav>
	<AppIcon icon="Players" href="players">Игроки</AppIcon>
	<AppIcon icon="Passport" href="players">Паспорт</AppIcon>
	<AppIcon icon="Help" href="players">Помощь</AppIcon>
	<br />
	<AppIcon icon="Wiki" href="players">Википедия</AppIcon>
	<AppIcon icon="Maps" href="players">Карта</AppIcon>
	<AppIcon icon="Downloads" href="players">Загрузки</AppIcon>
	<AppIcon icon="About" href="players">О Сервере</AppIcon>
</nav>

<style lang="scss">
	h2 {
		font-weight: 500;
		font-size: 40px;
		margin: 0;
		text-shadow: 0 0 30px rgba(0, 0, 0, 0.75);
		text-align: center;
		font-weight: bold;
	}
	nav {
		margin-top: 48px;
		text-align: center;
		justify-items: center;
		align-items: center;
		white-space: wrap;
	}
</style>
