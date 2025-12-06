<script lang="ts">
	import { localPreferences } from "$lib/local-settings.svelte";
	import { scale } from "svelte/transition";
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
		<div class="image-block flex">
			<div class="image">
				{#if disabled || (!src && !spatial)}
					<div class="grayed-out"></div>
				{:else}
					<img
						draggable="false"
						src="/EnvironmentPreview/{spatial ? `spatial-${spatial}` : src}{darkAvailable
							? '-light'
							: ''}.webp"
						alt={name}
					/>
				{/if}
			</div>
			{#if (spatial && localPreferences.spatialEnvironment === spatial) || (src && localPreferences.environment === src)}
				<span class="badge" transition:scale={{ duration: 500, opacity: 0 }}>
					<IconCheckmark />
				</span>
			{/if}
		</div>
		<span class="label">
			{name}
			{#if spatial}
				<span class="spatial">3D</span>{/if}
		</span>
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
			display: flex;
		}
		.image-block {
			width: 100%;
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
			text-shadow: 0 0 5px rgba(0, 0, 0, 0.35);
			text-align: center;
			margin-top: 8px;
			display: flex;
			align-items: center;
		}
		span.badge {
			position: absolute;
			right: 42px;
			top: 24px;
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
		span.spatial {
			background-color: rgba(255, 255, 255, 0.85);
			padding: 0px 2px 1px 2px;
			border-radius: 2px;
			font-size: 11px;
			text-align: center;
			margin: 1px 0 0 6px;
			align-self: center;
			color: rgba(30, 30, 30, 0.85);
			text-shadow: none;
			font-weight: bold;
			width: fit-content;
			line-height: 1;
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
			width: 100%;
			padding: 16px 10px;
			height: auto;
			display: flex;
			flex-direction: column;
			align-self: start;
			span.label {
				font-size: 13px;
				color: white;
				font-weight: 500;
				margin-top: 6px;
				display: inline-block;
			}
			span.badge {
				width: 24px;
				height: 24px;
				top: 8px;
				right: 8px;
				padding: 6px;
			}
			span.spatial {
				margin-left: 2px;
				font-size: 10px;
			}
			.image {
				width: 100%;
				max-width: 128px;
				// margin: 0;
				height: 100%;
				aspect-ratio: 9 / 16;
				border-radius: 16px;
			}
			.image-block {
				max-width: 128px;
				position: relative;
			}
			.grayed-out {
				width: 100%;
				max-width: 128px;
				background-color: rgba(0, 0, 0, 0.75);
			}
			&:hover:not(.disabled) {
				scale: 1;
				.image {
					width: 100%;
				}
			}
			&:active:not(.disabled) {
				transition-duration: 125ms;
				filter: brightness(0.9);
				scale: 0.97;
			}
		}
	}
</style>
