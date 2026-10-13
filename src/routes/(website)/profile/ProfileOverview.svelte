<script>
	import { enhance } from "$app/forms";
	import { SkinViewer, IdleAnimation } from "skinview3d";
	import { Spring } from "svelte/motion";
	import SettingsHeader from "$lib/Window/SettingsHeader.svelte";
	import OptionButton from "$lib/components/OptionButton.svelte";
	import { getSkinURL } from "$lib/scripts.js";
	import OptionDescription from "$lib/components/OptionDescription.svelte";
	import LogoutButton from "./LogoutButton.svelte";
	import DeactivateAccountButton from "./DeactivateAccountButton.svelte";
	import ReapplySkinButton from "./ReapplySkinButton.svelte";
	import SettingsContent from "./SettingsContent.svelte";
	import IconRight from "$lib/components/icons/IconRight.svelte";
	let { data } = $props();
	const scale = new Spring(0.5, { damping: 0.2, stiffness: 0.1 });
</script>

<SettingsHeader title="Overview"></SettingsHeader>
<SettingsContent>
	{#if data.profile}
		<div class="canvas-block" style="scale: {scale.current}">
			<canvas
				{@attach (canvas) => {
					if (data.profile) {
						scale.set(0.5, { instant: true });
						let skinViewer = new SkinViewer({
							canvas: canvas,
							width: 130,
							height: 270,
							skin: getSkinURL(data.profile?.skin, data.profile.name),
						});
						skinViewer.globalLight.intensity = 2.85;
						skinViewer.controls.enableZoom = false;
						skinViewer.animation = new IdleAnimation();
						scale.target = 1;
						return () => {
							skinViewer.dispose();
						};
					}
				}}
			></canvas>
		</div>
		<span class="name">{data.profile.name}</span>
		<span class="player-contact">@{data.profile.contact}</span>
		<div class="settings-buttons-space"></div>
		<div class="settings-buttons">
			<OptionButton tag="a" href="/profile/edit">
				Change information <div class="option-button-arrow-icon">
					<IconRight />
				</div>
			</OptionButton>
			<OptionButton tag="a" href="/profile/overview/invite">
				Invite a friend <div class="option-button-arrow-icon">
					<IconRight />
				</div>
			</OptionButton>
		</div>
		<OptionDescription>
			You can invite your friends and acquaintances using your referral link. You will receive a
			bonus of 20 facets / emeralds for each friend you invite, and they will receive an additional
			welcome bonus of 10 facets / emeralds upon joining.
		</OptionDescription>

		<div class="settings-buttons-space"></div>
		<div class="settings-buttons">
			<ReapplySkinButton name={data.profile?.name} />
		</div>
		<OptionDescription>
			If your skin is not appearing while playing on the server, you can try forcing it to be
			applied.
		</OptionDescription>
		<div class="settings-buttons-space"></div>
		<LogoutButton />
		<div class="settings-buttons-space"></div>
		<DeactivateAccountButton />
		<OptionDescription>
			You can deactivate your account if you no longer plan to play on the Demovio server. It will
			no longer appear in the player list and will eventually be permanently deleted.
		</OptionDescription>
		<div class="settings-buttons-space"></div>
	{/if}
</SettingsContent>

<style lang="scss">
	.canvas-block {
		--width: 130px;
		width: var(--width);
		height: var(--width);
		aspect-ratio: 1/1;
		overflow: clip;
		right: -90px;
		transform-origin: bottom;
		mask: linear-gradient(
			to bottom,
			black 0%,
			black calc(var(--width) - 28px),
			transparent var(--width)
		);
		mask-size: cover;
		mask-repeat: no-repeat;
	}
	.name {
		font-size: 20px;
		font-weight: bold;
		margin-top: 16px;
	}
	.player-contact {
		font-size: 16px;
		margin: 4px 0 0 0;
	}
</style>
