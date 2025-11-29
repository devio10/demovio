<script>
	import { MediaQuery } from "svelte/reactivity";
	import SideNavigationButton from "./SideNavigationButton.svelte";
	import IconProfile from "./icons/IconProfile.svelte";
	import IconHome from "./icons/IconHome.svelte";
	import IconEnvironment from "./icons/IconEnvironment.svelte";
	import IconBell from "./icons/IconBell.svelte";
	import IconKey from "./icons/IconKey.svelte";
	let isMobile = new MediaQuery("screen and (max-width: 768px)");
	let { loggedIn } = $props();
</script>

<div class="mobile-shadow"></div>
<div class="side-navigation">
	<SideNavigationButton alt="Главная" href="/" test={/^\/$/}>
		<IconHome />
	</SideNavigationButton>
	{#if loggedIn}
		<SideNavigationButton alt="Профиль" href="/profile">
			<div style="padding: 4px"><IconProfile /></div>
		</SideNavigationButton>
	{:else}
		<SideNavigationButton alt="Авторизация" href="/login">
			<div style="padding: 2px"><IconKey /></div>
		</SideNavigationButton>
	{/if}

	<SideNavigationButton alt="Окружение" href="/environment">
		<IconEnvironment />
	</SideNavigationButton>
	{#if !isMobile.current}
		<SideNavigationButton alt="Уведомления" href="/notifications">
			<div style="padding: 4px"><IconBell /></div>
		</SideNavigationButton>
	{/if}
</div>

<style lang="scss">
	.side-navigation {
		background: linear-gradient(
			-10deg,
			rgba(114, 114, 114, 0.32) 0%,
			rgba(255, 255, 255, 0.27) 95%
		);
		display: flex;
		flex-direction: column;
		padding: 12px;
		border-radius: 40px;
		gap: 12px;
		width: 80px;
		z-index: 4;
		position: fixed;
		left: 42px;
		top: 50%;
		transform: translateY(-50%);
		backdrop-filter: blur(24px);
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-left: none;
		border-bottom: none;
		transition-property: transform, background-color, width, left;
		transition-duration: 300ms;
		transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 4px 30px 5px rgba(0, 0, 0, 0.3);

		&:hover {
			// transform: translateY(-50%) scale(1.05);
			width: 240px;
			background-color: rgba(230, 230, 230, 0.2);
			left: 16px;

			:global {
				.button-name {
					opacity: 1;
				}
			}
		}
	}
	@media screen and (max-width: 768px) {
		.mobile-shadow {
			position: fixed;
			bottom: 0;
			height: 102px;
			z-index: 3;
			background: linear-gradient(to bottom, transparent 10%, rgba(0, 0, 0, 0.65) 100%);
			width: 100%;
		}
		.side-navigation {
			left: 50%;
			top: auto;
			bottom: max(min(env(safe-area-inset-bottom, 20px), 20px), 12px);
			transform: translateX(-50%);
			flex-direction: row;
			height: 64px;
			width: fit-content;
			padding: 4px;
			gap: 0px;
			background: linear-gradient(
				-10deg,
				rgba(100, 100, 100, 0.36) 0%,
				rgba(200, 200, 200, 0.36) 95%
			);
			backdrop-filter: blur(2px);
			transition-duration: 1000ms;
			&:hover {
				width: fit-content;
				left: 50%;
				background: linear-gradient(
					-10deg,
					rgba(100, 100, 100, 0.36) 0%,
					rgba(200, 200, 200, 0.36) 95%
				);
			}
			&:active {
				width: fit-content;
				left: 50%;
				background-color: rgba(255, 255, 255, 0.1);
				transform: translateX(-50%) scale(1.05);
				transition-delay: 100ms;
			}
		}
	}
</style>
