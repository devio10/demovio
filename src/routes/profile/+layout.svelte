<script>
	import Window from "$lib/Window/Window.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import WindowNavigationItem from "$lib/Window/Navigation/WindowNavigationItem.svelte";
	import WindowNavigationList from "$lib/Window/Navigation/WindowNavigationList.svelte";
	import WindowNavigationHeader from "$lib/Window/Navigation/WindowNavigationHeader.svelte";
	let { children, data } = $props();
</script>

<main>
	<Window urlName="/profile/">
		{#snippet navigation()}
			<WindowNavigation --width="30%">
				<WindowNavigationHeader title="Профиль"></WindowNavigationHeader>
				<WindowNavigationList>
					<WindowNavigationItem href="/profile" i={0}>Обзор</WindowNavigationItem>
					<WindowNavigationItem href="/profile/notifications" i={1}>
						Уведомления
					</WindowNavigationItem>
					<WindowNavigationItem href="/profile/edit" i={2}>Изменение данных</WindowNavigationItem>
					<WindowNavigationItem href="/profile/change-citizenship" i={3}>
						Смена гражданства
					</WindowNavigationItem>
					<WindowNavigationItem href="/profile/passport" i={4}>Паспорт</WindowNavigationItem>
					<WindowNavigationItem href="/profile/reset-game-password" i={5}>
						Сброс пароля
					</WindowNavigationItem>
					{#if data.profile && data.profile.administrator}
						<WindowNavigationItem href="/profile/backstage" i={5}>Backstage</WindowNavigationItem>
					{/if}
				</WindowNavigationList>
			</WindowNavigation>
		{/snippet}
		{@render children?.()}
	</Window>
</main>
