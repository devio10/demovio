<script lang="ts">
	import { page } from "$app/state";
	import PlayerHead from "$lib/components/PlayerHead.svelte";
	import type { Snippet } from "svelte";
	import { expoOut } from "svelte/easing";
	import { fly, type EasingFunction, type TransitionConfig } from "svelte/transition";

	let {
		name,
		skin,
		pronouns,
		i,
		online,
		featured,
	}: {
		name: string;
		skin: string;
		pronouns: string;
		i: number;
		children?: Snippet;
		online?: boolean;
		featured?: boolean;
	} = $props();

	const hide = (
		node: HTMLElement,
		{ delay, duration, easing }: { delay?: number; duration?: number; easing?: EasingFunction },
	): TransitionConfig => {
		return {
			delay,
			duration,
			easing,
			css: (t, u) => {
				return `height: ${72 * t}px; opacity: ${t}`;
			},
		};
	};
</script>

<a
	href="/players/{name}"
	class={{ active: page.params.name === name }}
	in:fly|global={{ duration: 150, delay: 10 * i, y: 10 }}
	out:hide={{ duration: 250, easing: expoOut }}
>
	<div class="inner-height">
		<div class="skin">
			<div class={[{ online: online }, "skin-object"]}>
				<PlayerHead url={skin} --width="48px" />
			</div>
			{#if online === true}
				<div class="online-dot"></div>
			{/if}
		</div>
		<div>
			<span class="name">{name}</span>
			{#if pronouns && pronouns !== ""}
				<span class="pronouns">{pronouns}</span>
			{/if}
		</div>
		{#if featured}
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 22.0527 22.1191"
				class="star-icon"
			>
				<path
					d="M4.16109 20.5469C4.56149 20.8594 5.0693 20.752 5.67477 20.3125L10.8408 16.5137L16.0166 20.3125C16.622 20.752 17.1201 20.8594 17.5302 20.5469C17.9306 20.2441 18.0185 19.7461 17.7744 19.0332L15.7334 12.959L20.9482 9.20898C21.5537 8.7793 21.7978 8.33008 21.6416 7.8418C21.4853 7.37305 21.0263 7.14844 20.2744 7.14844L13.8779 7.14844L11.9345 1.08398C11.7002 0.361328 11.3486 0 10.8408 0C10.3427 0 9.99117 0.361328 9.7568 1.08398L7.81344 7.14844L1.41695 7.14844C0.665001 7.14844 0.206017 7.37305 0.0497668 7.8418C-0.116249 8.33008 0.137657 8.7793 0.743126 9.20898L5.95797 12.959L3.91695 19.0332C3.67281 19.7461 3.7607 20.2441 4.16109 20.5469Z"
					fill="currentColor"
				/>
			</svg>
		{/if}
	</div>
</a>

<style lang="scss">
	a {
		width: 100%;
		border-radius: 16px;
		border: none;
		margin: 0;
		cursor: pointer;
		flex-shrink: 0;
		background: none;
		transition: 300ms background-color ease-out;
		text-decoration: none;
		color: white;
		overflow: clip;
		position: relative;

		.inner-height {
			display: flex;
			align-items: center;
			height: 72px;
			min-height: 72px;
			padding: 0 24px;
		}

		&.active {
			background-color: rgba(179, 179, 179, 0.25);
			&:hover {
				background-color: rgba(179, 179, 179, 0.4);
			}
		}
		&:hover {
			transition-duration: 0ms;
			background-color: rgba(179, 179, 179, 0.2);
		}
		.skin {
			margin-right: 16px;
			position: relative;
			.skin-object {
				width: fit-content;
				overflow: clip;
				border: 0.5px solid rgba(0, 0, 0, 0.15);
				border-radius: 4px;
				&.online {
					mask: radial-gradient(
						at calc(100% - 5px) calc(100% - 5px),
						transparent 0,
						transparent 9px,
						black 9.5px
					);
				}
			}
		}
		.name {
			font-size: 16px;
			font-weight: 600;
			color: white;
			display: block;
			text-align: left;
		}
		.pronouns {
			font-size: 16px;
			margin-top: 6px;
			display: block;
			text-align: left;
			color: rgba(190, 190, 190, 0.75);
			line-height: 1.2;
		}
		.online-dot {
			background: linear-gradient(rgb(29, 204, 78), rgb(16, 178, 86));
			border: 0.5px solid rgb(16, 178, 86);
			border-radius: 100%;
			width: 10px;
			aspect-ratio: 1/1;
			position: absolute;
			right: 0;
			bottom: 0;
		}
		.star-icon {
			width: 14px;
			height: 14px;
			color: rgba(190, 190, 190, 0.75);
			margin-left: auto;
		}
	}
</style>
