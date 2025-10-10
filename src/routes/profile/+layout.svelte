<script>
	import Window from "$lib/Window/Window.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import WindowNavigationItem from "$lib/Window/Navigation/WindowNavigationItem.svelte";
	import WindowNavigationList from "$lib/Window/Navigation/WindowNavigationList.svelte";
	import WindowNavigationHeader from "$lib/Window/Navigation/WindowNavigationHeader.svelte";
	let { children } = $props();
</script>

<main>
	<Window>
		{#snippet navigation()}
			<WindowNavigation --width="30%">
				<WindowNavigationHeader title="Профиль"></WindowNavigationHeader>
				<WindowNavigationList>
					<WindowNavigationItem href="/profile" i={0}>Обзор</WindowNavigationItem>
					<WindowNavigationItem href="/profile/notifications" i={1}>
						Уведомления
					</WindowNavigationItem>
					<WindowNavigationItem href="/profile/edit" i={2}>Изменение данных</WindowNavigationItem>
					<WindowNavigationItem href="/profile/edit" i={3}>Смена гражданства</WindowNavigationItem>
					<WindowNavigationItem href="/profile/passport" i={4}>Паспорт</WindowNavigationItem>
				</WindowNavigationList>
			</WindowNavigation>
		{/snippet}
		{@render children?.()}
	</Window>
</main>
