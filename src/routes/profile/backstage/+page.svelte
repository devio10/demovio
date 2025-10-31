<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
	import SettingsSwitch from "$lib/components/SettingsSwitch.svelte";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import { onMount } from "svelte";
	let { data } = $props();
	let additionalPages = $state(false);
	let backstageStatus = $state(false);
	let listResidence = $state(false);
	onMount(() => {
		additionalPages = localStorage.getItem("backstage-additional-pages") === "true";
		backstageStatus = localStorage.getItem("backstage-status") === "true";
		listResidence = localStorage.getItem("backstage-list-residence") === "true";
	});
</script>

<svelte:head>
	<title>Профиль Demovio – Backstage</title>
</svelte:head>

<SettingsHeader title="Backstage"></SettingsHeader>
{#if data.profile && data.profile.administrator}
	<div class="settings-content">
		<div class="settings-buttons">
			<OptionButton tag="div">
				Demovio Backstage <SettingsSwitch
					value={backstageStatus}
					onChange={() => {
						const value = localStorage.getItem("backstage-status");
						if (value === "true") {
							localStorage.setItem("backstage-status", "false");
						} else {
							localStorage.setItem("backstage-status", "true");
						}
						window.location.reload();
					}}
				/>
			</OptionButton>
		</div>
		<OptionDescription>
			Backstage предлагает инструменты для администрирования сервером Demovio и работы с игроками.
			Выключение этого параметра не уберёт права администратора.
		</OptionDescription>
		<div class="settings-buttons-space"></div>
		<div class="settings-buttons">
			<OptionButton tag="div">
				Отображение гражданства в списке игроков <SettingsSwitch
					value={listResidence}
					onChange={() => {
						const value = localStorage.getItem("backstage-list-residence");
						if (value === "true") {
							localStorage.setItem("backstage-list-residence", "false");
						} else {
							localStorage.setItem("backstage-list-residence", "true");
						}
					}}
				/>
			</OptionButton>
		</div>
		<div class="settings-buttons-space"></div>
		<div class="settings-buttons">
			<OptionButton tag="div">
				Страницы Backstage на главном экране <SettingsSwitch
					value={additionalPages}
					onChange={() => {
						const value = localStorage.getItem("backstage-additional-pages");
						if (value === "true") {
							localStorage.setItem("backstage-additional-pages", "false");
						} else {
							localStorage.setItem("backstage-additional-pages", "true");
						}
					}}
				/>
			</OptionButton>
		</div>
		<OptionDescription>
			Отображение страниц «Заявки на Вступление», «Консоль» и «Статистика» на главном экране сайта.
		</OptionDescription>
	</div>
{:else}
	<p>Доступ запрещён</p>
{/if}
