<script lang="ts">
	import { localPreferences } from "$lib/local-settings.svelte";

	let {
		name,
		src,
	}: {
		name: string;
		src: string;
	} = $props();
</script>

<button
	onclick={() => {
		localStorage.setItem("environment", src);
		localPreferences.environment = src;
	}}
>
	<div class="flex">
		<div class="image">
			<img draggable="false" src="/EnvironmentPreview/{src}" alt={name} />
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
		cursor: pointer;
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
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
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

		&:hover {
			scale: 1.1;
			.image {
				width: calc(var(--size) * 1.6);
			}
			span.label {
				color: white;
			}
		}
		&:active {
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
