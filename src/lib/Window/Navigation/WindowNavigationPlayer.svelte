<script lang="ts">
	import { page } from "$app/state";
	import PlayerHead from "$lib/PlayerHead.svelte";
	import type { Snippet } from "svelte";
	import { expoOut } from "svelte/easing";
	import { fly, type EasingFunction, type TransitionConfig } from "svelte/transition";

	let {
		name,
		skin,
		pronouns,
		i,
		online,
	}: {
		name: string;
		skin: string;
		pronouns: string;
		i: number;
		children?: Snippet;
		online?: boolean;
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
			<span class="pronouns">{pronouns}</span>
		</div>
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
			margin-bottom: 4px;
		}
		.pronouns {
			font-size: 16px;
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
	}
</style>
