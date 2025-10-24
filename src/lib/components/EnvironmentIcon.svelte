<script lang="ts">
	import { localPreferences } from "$lib/local-settings.svelte";

	let {
		name,
		src,
		spatial,
		disabled,
	}: {
		name: string;
		src?: string;
		spatial?: string;
		disabled?: boolean;
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
		} else {
			localStorage.setItem("environment", src);
			localPreferences.environment = src;
		}
	}}
	class={{ disabled: disabled }}
>
	<div class="flex">
		<div class="image">
			{#if disabled}
				<div class="grayed-out"></div>
			{:else}
				<img draggable="false" src="/EnvironmentPreview/{src}" alt={name} />
			{/if}
		</div>
		<span class="label">{name}</span>
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
		// display: flex;
		transition: scale 300ms ease-out;
		border: none;
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
			background-color: rgba(230, 230, 230, 0.3);
		}
		span.label {
			font-size: 14px;
			font-weight: 500;
			color: rgba(230, 230, 230, 0.85);
			text-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
			text-align: center;
			margin-top: 8px;
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
		}
	}
</style>
