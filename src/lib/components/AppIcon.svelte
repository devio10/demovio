<script lang="ts">
	import type { Snippet } from "svelte";
	import { MediaQuery } from "svelte/reactivity";

	let {
		children,
		icon,
		href,
		badge,
	}: {
		children?: Snippet;
		icon: string;
		href: string;
		badge?: string | number | Promise<string | number>;
	} = $props();
	let isMobile = new MediaQuery("screen and (max-width: 768px)");
</script>

<div>
	<a {href} draggable="false">
		{#if isMobile.current}
			<img draggable="false" src="/AppIcons/{icon}-mobile-light.png" alt={icon} />
		{:else}
			<img draggable="false" src="/AppIcons/{icon}.png" alt={icon} />
		{/if}
		<span class="label">{@render children?.()}</span>
		{#if badge}
			<span class="badge">{badge}</span>
		{/if}
	</a>
</div>

<style lang="scss">
	div {
		display: inline-block;
		user-select: none;
	}
	a {
		display: flex;
		flex-direction: column;
		gap: 10px;
		justify-content: center;
		align-items: center;
		padding: 16px 32px;
		text-decoration: none;
		position: relative;
		transition-property: scale, filter;
		transition-duration: 350ms;
		transition-timing-function: ease-in-out;
		img {
			$image-size: 112px;
			width: $image-size;
			height: $image-size;
			border-radius: calc(1px * infinity);
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
			filter: brightness(1);
		}
		span.label {
			font-size: 16px;
			font-weight: 600;
			color: white;
			text-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
			text-align: center;
		}
		span.badge {
			position: absolute;
			right: 20px;
			top: 20px;
			font-size: 20px;
			background-color: rgb(255, 48, 48);
			padding: 10px;
			line-height: 60%;
			border-radius: 100px;
			font-weight: bold;
			color: white;
			text-align: center;
		}

		&:hover {
			transition-duration: 150ms;
			filter: brightness(1.1);
			scale: 1.05;
		}
		&:active {
			transition-duration: 75ms;
			filter: brightness(0.9);
			scale: 1.02;
		}
	}
	@media screen and (max-width: 768px) {
		a {
			padding: 6px;
			gap: 6px;
			img {
				width: 68px;
				height: 68px;
				border-radius: 0;
				box-shadow: none;
				filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.25));
			}
			span.label {
				font-size: 12px;
				font-weight: 500;
				text-shadow: 0 0px 5px rgba(0, 0, 0, 0.45);
			}
			span.badge {
				right: 8px;
				top: 8px;
				font-size: 14px;
			}
			&:hover {
				scale: 0.95;
			}
		}
	}
	@media screen and (max-width: 370px) {
		a {
			padding: 4px;
			img {
				width: 60px;
				height: 60px;
			}
			span.label {
				font-size: 11px;
			}
		}
	}
</style>
