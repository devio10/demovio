<script lang="ts">
	import { page } from "$app/state";
	import PlayerHead from "$lib/PlayerHead.svelte";
	import type { Snippet } from "svelte";
	import { flip } from "svelte/animate";
	import { expoOut } from "svelte/easing";
	import { fly, scale, type EasingFunction, type TransitionConfig } from "svelte/transition";

	let {
		name,
		skin,
		pronouns,
		i,
	}: { name: string; skin: string; pronouns: string; i: number; children?: Snippet } = $props();

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
			<PlayerHead url={skin} --width="48px" />
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
			background-color: rgba(179, 179, 179, 0.3);
			&:hover {
				background-color: rgba(179, 179, 179, 0.5);
			}
		}
		&:hover {
			transition-duration: 75ms;
			background-color: rgba(179, 179, 179, 0.2);
		}
		.skin {
			border: 0.5px solid rgba(0, 0, 0, 0.15);
			border-radius: 4px;
			margin-right: 16px;
			width: fit-content;
			overflow: clip;
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
	}
</style>
