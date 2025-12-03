<script lang="ts">
	import AboutIconLeft from "./AboutIconLeft.svelte";
	import AboutIconRight from "./AboutIconRight.svelte";
	import { states } from "./states";
	let { currentState = $bindable() } = $props();

	function nextState() {
		currentState++;
		if (currentState > states.length - 1) {
			currentState = 0;
		}
	}
	let spinning = setInterval(() => {
		nextState();
	}, 9000);
	export const resetSpinning = () => {
		clearInterval(spinning);
		spinning = setInterval(() => {
			nextState();
		}, 9000);
	};
</script>

<div class="state-controls">
	<div class="states-progress">
		<button
			class="state-button button-previous_state"
			aria-label="Прошлый штат"
			onclick={() => {
				currentState--;
				if (currentState < 0) {
					currentState = states.length - 1;
				}
			}}
		>
			<AboutIconLeft />
		</button>
		<div class="progress-list">
			{#each states as state}
				<div class={{ active: states[currentState] === state }}><span></span></div>
			{/each}
		</div>
		<button
			class="state-button button-next_state"
			aria-label="Следующий штат"
			onclick={() => {
				nextState();
				resetSpinning();
			}}
		>
			<AboutIconRight />
		</button>
	</div>
	<div class="state-learn_more" style="display: none;">
		<a class="state-button" href={states[currentState].link} aria-label="Узнать больше">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
				<path
					d="M223,105.58c-4-4.2-8.2-8.54-10-12.8-1.65-4-1.73-9.53-1.82-15.41-.14-9-.29-19.19-6.83-25.74s-16.74-6.69-25.74-6.83c-5.88-.09-11.43-.17-15.41-1.82-4.26-1.76-8.6-5.93-12.8-9.95-6.68-6.41-13.59-13-22.42-13s-15.74,6.62-22.42,13c-4.2,4-8.54,8.2-12.8,10-4,1.65-9.53,1.73-15.41,1.82-9,.14-19.19.29-25.74,6.83S44.94,68.37,44.8,77.37c-.09,5.88-.17,11.43-1.82,15.41-1.76,4.26-5.93,8.6-9.95,12.8-6.41,6.68-13,13.59-13,22.42s6.62,15.74,13,22.42c4,4.2,8.2,8.54,10,12.8,1.65,4,1.73,9.53,1.82,15.41.14,9,.29,19.19,6.83,25.74s16.74,6.69,25.74,6.83c5.88.09,11.43.17,15.41,1.82,4.26,1.76,8.6,5.93,12.8,9.95,6.68,6.41,13.59,13,22.42,13s15.74-6.62,22.42-13c4.2-4,8.54-8.2,12.8-10,4-1.65,9.53-1.73,15.41-1.82,9-.14,19.19-.29,25.74-6.83s6.69-16.74,6.83-25.74c.09-5.88.17-11.43,1.82-15.41,1.76-4.26,5.93-8.6,9.95-12.8,6.41-6.68,13-13.59,13-22.42S229.38,112.26,223,105.58Zm-5.78,39.3c-4.54,4.73-9.24,9.63-11.57,15.28-2.23,5.39-2.33,12-2.43,18.35-.12,8.2-.24,16-4.49,20.2s-12,4.37-20.2,4.49c-6.37.1-13,.2-18.35,2.43-5.65,2.33-10.55,7-15.28,11.57C139.09,222.75,133.62,228,128,228s-11.09-5.25-16.88-10.8c-4.73-4.54-9.63-9.24-15.28-11.57-5.39-2.23-12-2.33-18.35-2.43-8.2-.12-15.95-.24-20.2-4.49s-4.37-12-4.49-20.2c-.1-6.37-.2-13-2.43-18.35-2.33-5.65-7-10.55-11.57-15.28C33.25,139.09,28,133.62,28,128s5.25-11.09,10.8-16.88c4.54-4.73,9.24-9.63,11.57-15.28,2.23-5.39,2.33-12,2.43-18.35.12-8.2.24-15.95,4.49-20.2s12-4.37,20.2-4.49c6.37-.1,13-.2,18.35-2.43,5.65-2.33,10.55-7,15.28-11.57C116.91,33.25,122.38,28,128,28s11.09,5.25,16.88,10.8c4.73,4.54,9.63,9.24,15.28,11.57,5.39,2.23,12,2.33,18.35,2.43,8.2.12,16,.24,20.2,4.49s4.37,12,4.49,20.2c.1,6.37.2,13,2.43,18.35,2.33,5.65,7,10.55,11.57,15.28,5.55,5.79,10.8,11.26,10.8,16.88S222.75,139.09,217.2,144.88ZM136,180a8,8,0,1,1-8-8A8,8,0,0,1,136,180Zm28-72c0,16.44-14,30-32,31.8V144a4,4,0,0,1-8,0v-8a4,4,0,0,1,4-4c15.44,0,28-10.77,28-24s-12.56-24-28-24-28,10.77-28,24v4a4,4,0,0,1-8,0v-4c0-17.64,16.15-32,36-32S164,90.36,164,108Z"
				></path>
			</svg>
		</a>
	</div>
</div>

<style lang="scss">
	.state-controls {
		display: flex;
		justify-content: center;
		width: 100%;
		gap: 8px;
		margin: auto 0 0 0;
		z-index: 2;

		.states-progress,
		.state-learn_more {
			position: relative;

			padding: 8px;
			height: 64px;
			border-radius: 100px;
			background: linear-gradient(-10deg, #3939395c, #7a7a7a5c 95%);
			border: 1px solid rgba(255, 255, 255, 0.4);
			border-left: none;
			border-bottom: none;
			backdrop-filter: blur(2px);

			display: flex;
			z-index: 4;
		}
		.state-learn_more {
			aspect-ratio: 1/1;
		}

		button {
			height: 100%;
			aspect-ratio: 1/1;
			border: none;
			border-radius: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #ffffff26;
			cursor: pointer;
			&:hover {
				background-color: rgba(255, 255, 255, 0.2);
			}
			:global {
				svg {
					fill: rgba(255, 255, 255, 0.75);
					width: 75%;
					height: 75%;
					aspect-ratio: 1/1;
				}
			}
		}

		.progress-list {
			margin: 0 32px;
			width: 92px;
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 6px;
			div {
				height: 7px;
				width: 7px;
				border-radius: 100px;
				background-color: rgba(255, 255, 255, 0.35);
				transition: width 0.3s ease-out;
				border: 0.5px solid rgba(255, 255, 255, 0.35);
				border-left: none;
				border-bottom: none;
				display: flex;
				// overflow: clip;
				&.active {
					width: 42px;
					span {
						background-color: rgba(255, 255, 255, 0.85);
						width: 6.5px;
						border-radius: 100px;
						height: 6.5px;
						animation-name: progress;
						animation-duration: 9s;
						animation-fill-mode: forwards;
						animation-timing-function: linear;
					}
				}
			}
		}
	}
	@keyframes progress {
		to {
			width: 100%;
		}
	}
	@media screen and (max-width: 768px) {
		.state-controls {
			.states-progress,
			.states-learn_more {
				height: 56px;
				padding: 4px;
			}
			.progress-list {
				margin: 0 16px;
			}
		}
	}
</style>
