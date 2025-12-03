<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import SettingsContent from "../../SettingsContent.svelte";
</script>

<svelte:head>
	<title>Профиль Demovio – Изменение данных</title>
</svelte:head>
<SettingsHeader title="Изменение контактной информации"></SettingsHeader>
<SettingsContent>
	<div class="settings-buttons">
		<p style="line-height: 1.4; margin: 12px 0 0 0; font-size: 16px">
			Для того, чтобы изменить юзернейм Telegram, привязанный к вашему аккаунту, вам необходимо
			написать администратору Demovio. Это сделано в целях безопасности.
		</p>
	</div>
	<div class="settings-buttons-space"></div>
	<div class="settings-buttons">
		<OptionButton tag="a" href="https://t.me/devio101">Написать администратору</OptionButton>
	</div>
</SettingsContent>
