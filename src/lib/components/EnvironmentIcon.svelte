<script lang="ts">
	import { localPreferences } from "$lib/local-settings.svelte";
	import IconCheckmark from "./icons/IconCheckmark.svelte";

	let {
		name,
		src,
		spatial,
		disabled,
		darkAvailable = true,
	}: {
		name: string;
		src?: string;
		spatial?: string;
		disabled?: boolean;
		darkAvailable?: boolean;
	} = $props();
</script>

<button
	onclick={() => {
		if (disabled) {
			return;
		}
		localStorage.setItem("spatialEnvironment", "");
		localPreferences.spatialEnvironment = "";
		localStorage.setItem("environment", "");
		localPreferences.environment = "";

		if (spatial) {
			localStorage.setItem("spatialEnvironment", spatial);
			localPreferences.spatialEnvironment = spatial;
		} else if (src) {
			localStorage.setItem("environment", src);
			localPreferences.environment = src;
			localPreferences.environmentDarkAvailable = darkAvailable;
		}
	}}
	class={{ disabled: disabled }}
>
	<div class="flex">
		<div class="image">
			{#if disabled || !src}
				<div class="grayed-out"></div>
			{:else}
				<img
					draggable="false"
					src="/EnvironmentPreview/{src}{darkAvailable ? '-light' : ''}.webp"
					alt={name}
				/>
			{/if}
		</div>
		<span class="label">{name}</span>
		{#if (spatial && localPreferences.spatialEnvironment === spatial) || (src && localPreferences.environment === src)}
			<span class="badge"><IconCheckmark /></span>
		{/if}
	</div>
</button>

<style lang="scss">
	button {
		--size: 136px;
		width: calc(var(--size) * 1.6);
		display: inline-block;
		user-select: none;
		padding: 16px 0;
		background: none;
		transition: scale 300ms ease-out;
		border: none;
		position: relative;
		&:not(.disabled) {
			cursor: pointer;
			.image {
				box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
			}
		}

		.flex {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.image {
			overflow: clip;
			width: var(--size);
			height: var(--size);
			border-radius: 100px;
			position: relative;
			transition-property: width;
			transition-duration: 300ms;
			transition-timing-function: ease-out;
		}
		.grayed-out {
			width: 100%;
			height: 100%;
			background-color: rgba(220, 220, 220, 0.5);
			// backdrop-filter: blur(10px);
		}
		span.label {
			font-size: 14px;
			font-weight: 500;
			color: rgba(240, 240, 240, 0.9);
			text-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
			text-align: center;
			margin-top: 8px;
		}
		span.badge {
			position: absolute;
			right: 40px;
			top: 28px;
			width: 30px;
			height: 30px;
			background-color: white;
			padding: 8px;
			border-radius: 100px;
			box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.25);
			font-weight: bold;
			color: black;
			display: flex;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&:hover:not(.disabled) {
			scale: 1.1;
			.image {
				width: calc(var(--size) * 1.6);
			}
			span.label {
				color: white;
			}
		}
		&:active:not(.disabled) {
			transition-duration: 75ms;
			filter: brightness(0.9);
			scale: 1.02;
		}
	}
	@media screen and (max-width: 768px) {
		button {
			--size: 72px;
			padding: 8px 12px;
			display: flex;
			flex-direction: column;
			span.label {
				font-size: 12px;
				color: white;
				font-weight: 500;
			}
			span.badge {
				width: 24px;
				height: 24px;
				top: 10px;
				right: 14px;
				padding: 6px;
			}
		}
	}
</style>
