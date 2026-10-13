<script>
	import Window from "$lib/Window/Window.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import WindowNavigationItem from "$lib/Window/Navigation/WindowNavigationItem.svelte";
	import WindowNavigationList from "$lib/Window/Navigation/WindowNavigationList.svelte";
	import WindowNavigationHeader from "$lib/Window/Navigation/WindowNavigationHeader.svelte";
	import NavigationItemIcon from "$lib/Window/Navigation/NavigationItemIcon.svelte";
	import IconHome from "$lib/components/icons/IconHome.svelte";
	import IconBell from "$lib/components/icons/IconBell.svelte";
	import IconPencilCircle from "$lib/components/icons/IconPencilCircle.svelte";
	import IconPencil from "$lib/components/icons/IconPencil.svelte";
	import IconIDCard from "$lib/components/icons/IconIDCard.svelte";
	import IconMove from "$lib/components/icons/IconMove.svelte";
	import IconKey from "$lib/components/icons/IconKey.svelte";
	import IconBackstage from "$lib/components/icons/IconBackstage.svelte";
	import { page } from "$app/state";
	import IconSecurity from "$lib/components/icons/IconSecurity.svelte";
	import IconEnvironment from "$lib/components/icons/IconEnvironment.svelte";
	let { children, data } = $props();
</script>

<main>
	<Window sectionOpened={page.route.id?.startsWith("/(website)/profile/")}>
		{#snippet navigation()}
			<WindowNavigation --width="30%">
				<WindowNavigationHeader title="Profile"></WindowNavigationHeader>
				<WindowNavigationList style="padding-left: 12px; padding-right: 12px">
					<WindowNavigationItem href="/profile/overview" altHref="/profile">
						<NavigationItemIcon color="#8E8E91">
							<IconHome />
						</NavigationItemIcon>
						Overview
					</WindowNavigationItem>
					<WindowNavigationItem href="/profile/edit">
						<NavigationItemIcon color="#8E8E91">
							<div style="padding: 2px"><IconPencil /></div>
						</NavigationItemIcon>Change information
					</WindowNavigationItem>
					<WindowNavigationItem href="/profile/security">
						<NavigationItemIcon color="#8E8E91">
							<div><IconSecurity /></div>
						</NavigationItemIcon>Privacy & Security
					</WindowNavigationItem>

					<div class="navigation-space"></div>

					<WindowNavigationItem href="/profile/passport">
						<NavigationItemIcon>
							<IconIDCard />
						</NavigationItemIcon>
						Passport
					</WindowNavigationItem>
					<WindowNavigationItem href="/profile/change-citizenship">
						<NavigationItemIcon>
							<IconMove />
						</NavigationItemIcon>
						Change Citizenship
					</WindowNavigationItem>
					<WindowNavigationItem href="/profile/reset-game-password">
						<NavigationItemIcon>
							<IconKey />
						</NavigationItemIcon>
						Reset Game Password
					</WindowNavigationItem>

					<div class="navigation-space"></div>

					<WindowNavigationItem href="/profile/notifications">
						<NavigationItemIcon color="rgb(246, 59, 90)">
							<IconBell />
						</NavigationItemIcon>
						Notifications
					</WindowNavigationItem>
					<WindowNavigationItem href="/profile/environment">
						<NavigationItemIcon color="rgb(98, 84, 248)">
							<IconEnvironment />
						</NavigationItemIcon>
						Appearance
					</WindowNavigationItem>
					{#if data.profile && data.profile.administrator}
						<WindowNavigationItem href="/profile/backstage">
							<NavigationItemIcon color="rgb(142, 84, 248)">
								<IconBackstage />
							</NavigationItemIcon>
							Backstage
						</WindowNavigationItem>
					{/if}
				</WindowNavigationList>
			</WindowNavigation>
		{/snippet}
		{@render children?.()}
	</Window>
</main>
