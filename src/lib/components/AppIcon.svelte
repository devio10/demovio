<script lang="ts">
	import type { Snippet } from "svelte";

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
</script>

<div>
	<a {href} draggable="false">
		<img draggable="false" src="/AppIcons/{icon}.png" alt={icon} />
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
			padding: 8px 24px;
			img {
				width: 72px;
				height: 72px;
			}
			span.label {
				font-size: 12px;
			}
			span.badge {
				right: 8px;
				top: 8px;
				font-size: 14px;
			}
		}
	}
</style>
