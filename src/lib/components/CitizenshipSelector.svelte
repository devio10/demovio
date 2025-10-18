<script lang="ts">
	import { demovioStates } from "./demovio-states";

	let cardHeight = $state(0);
	let stateSelection = $state(0);
	const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
	let { citizenship = $bindable() } = $props();
	const states = [
		{
			name: "Листайте вниз",
			icon: "initial.svg",
		},
		...demovioStates,
	];
	citizenship = states[stateSelection];
</script>

<div class="picker">
	<div
		class="list"
		onscroll={({ target }) => {
			const pos = (target as HTMLDivElement).scrollTop;
			stateSelection = clamp(Math.floor((pos + cardHeight / 2) / cardHeight), 0, states.length - 1);
			citizenship = states[stateSelection];
		}}
	>
		{#each states as state}
			<div class={["state", "code" in state && state.code]} bind:offsetHeight={cardHeight}>
				<img src="/stateIcons/{state.icon}" />
				<span>{state.name}</span>
			</div>
		{/each}
	</div>
	<div class="dots">
		{#each states, i}
			<div class={{ active: i === stateSelection }}></div>
		{/each}
	</div>
</div>

<style lang="scss">
	.picker {
		display: flex;
		position: relative;
		width: fit-content;
		margin: 0 auto;

		align-items: center;
		.list {
			width: 250px;
			box-shadow: inset -3.84px 3.84px 17.28px rgba(0, 0, 0, 0.25);
			aspect-ratio: 1/1;
			border: 1px solid rgba(255, 255, 255, 0.25);
			border-left: none;
			border-bottom: none;
			background: linear-gradient(to bottom, rgba(40, 40, 40, 0.5) 0%, rgba(15, 15, 15, 0.5) 100%);
			border-radius: 32px;
			overflow-y: auto;
			scroll-snap-type: y mandatory;
			scrollbar-width: none;
			&::-webkit-scrollbar {
				display: none;
			}
			.state {
				--color: rgba(255, 255, 255, 0.5);
				width: 100%;
				height: 100%;
				scroll-snap-align: start;
				padding: 32px;

				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: relative;
				&.ohio {
					--color: #83cc1679;
				}
				&.shanghai {
					--color: #e11d4879;
				}
				&.newyork {
					--color: #1f6cf279;
				}
				&.concord {
					--color: #8c1ff279;
				}
				&.california {
					--color: #facc1579;
				}
				&.georgia {
					--color: #f9731679;
				}
				svg,
				img {
					fill: var(--color);
					/* stroke: var(--color); */
					width: 60%;
					aspect-ratio: 1/1;
					filter: drop-shadow(0 0 20px var(--color));
				}
				span {
					position: absolute;
					bottom: 28px;
					font-weight: 600;
					font-size: 16px;
					color: #c8c4c1;
				}
			}
		}
		.dots {
			display: flex;
			flex-direction: column;
			gap: 6px;
			position: absolute;
			right: -16px;
			div {
				width: 6px;
				border-radius: 100%;
				aspect-ratio: 1/1;
				background-color: rgba(255, 255, 255, 0.25);
				border: 1px solid rgba(255, 255, 255, 0.25);
				border-left: none;
				border-bottom: none;
				transition: 300ms background-color;
				&.active {
					background-color: rgba(255, 255, 255, 0.75);
					transition-duration: 75ms;
				}
			}
		}
	}
</style>
