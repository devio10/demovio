<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import SettingsContent from "../../SettingsContent.svelte";
</script>

<svelte:head>
	<title>Пригласить друга на Demovio</title>
</svelte:head>
<SettingsHeader title="Пригласить друга"></SettingsHeader>
<SettingsContent>
	<div class="settings-buttons">
		<OptionButton disabled>Создать реферальную ссылку</OptionButton>
	</div>
	<OptionDescription>Реферальные ссылки будут доступны в ближайшем будущем.</OptionDescription>
</SettingsContent>
