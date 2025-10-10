<script>
	import SettingsButton from "$lib/SettingsButton.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import { Switch } from "bits-ui";
</script>

<SettingsHeader title="Уведомления"></SettingsHeader>
<div class="settings-content">
	<div class="settings-buttons">
		<SettingsButton disabled>Уведомления от браузера</SettingsButton>
		<SettingsButton disabled>Уведомления в Telegram</SettingsButton>
	</div>
	<div class="settings-buttons">
		<SettingsButton disabled>Приглашения от других игроков</SettingsButton>
		<SettingsButton disabled>Активность избранных игроков</SettingsButton>
		<SettingsButton disabled>Обновления Demovio</SettingsButton>
	</div>
</div>
