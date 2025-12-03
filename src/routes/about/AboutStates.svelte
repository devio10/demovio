<script lang="ts">
	import { scale } from "svelte/transition";
	import { states } from "./states";
	import StateControls from "./StateControls.svelte";

	let currentState = $state(0);
	let stateControls = $state();
</script>

<section class="about-section states grid">
	<div class="whole-content no-max-width grid">
		<div class="menu">
			<div class="states-count">
				<span class="num">{states.length}</span>
				<span>Штатов</span>
			</div>
			<ul class="states-list">
				{#each states as state, i}
					<li>
						<button
							onclick={() => {
								currentState = i;
								if (stateControls) {
									// stateControls.resetSpinning();
								}
							}}
							class={{ selected: state === states[currentState] }}
						>
							{state.name}
						</button>
					</li>
				{/each}
			</ul>
		</div>
		<div class="content">
			<div class="content-card state_preview-card">
				<div class="state-poster">
					<img
						src="/about/statePosters/{states[currentState].poster}"
						alt={states[currentState].name}
					/>
				</div>

				<span class="state-name">{states[currentState].name}</span>

				{#if states[currentState].posterTopLayer}
					<div class="state-poster-top_layer">
						<img src="/about/statePosters/{states[currentState].posterTopLayer}" alt="" />
					</div>
				{/if}

				<StateControls bind:this={stateControls} bind:currentState />
			</div>
			<div class="content-card description-card">
				<p class="state-description">
					{states[currentState].description}
				</p>
				<div class={["state-emojis", states[currentState].codeName]}>
					{#each states[currentState].emoji as emoji}
						<img
							src="/about/emojis/{states[currentState].codeName}/{emoji}.png"
							alt=""
							class={emoji}
							transition:scale={{ duration: 500, opacity: 0 }}
						/>
					{/each}
				</div>
			</div>
			<div class="content-card map-card">
				<img src="/about/maps/{states[currentState].map.image}" alt="Карта штата" />
				<div class="map-card-bottom_part">
					<span class="state-open_map">
						Открыть на <br />
						Карте
					</span>
					<a class="map-button" href={states[currentState].map.link} aria-label="Открыть на карте">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
							<path
								d="M196,64V168a4,4,0,0,1-8,0V73.66L66.83,194.83a4,4,0,0,1-5.66-5.66L182.34,68H88a4,4,0,0,1,0-8H192A4,4,0,0,1,196,64Z"
							></path>
						</svg>
					</a>
				</div>
			</div>
			<div class="content-card mobile_buttons-card">
				<a class="mobile-map_link" href={states[currentState].map.link}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
						<path
							d="M120,103.2V176a8,8,0,0,0,16,0V103.2a40,40,0,1,0-16,0ZM128,40a24,24,0,1,1-24,24A24,24,0,0,1,128,40ZM240,176c0,31.18-57.71,48-112,48S16,207.18,16,176c0-7.74,3.81-19.13,22-29.41,12.26-6.94,29.12-12.27,48.77-15.42A8,8,0,1,1,89.27,147c-17.54,2.82-33,7.63-43.42,13.55C37.05,165.5,32,171.14,32,176c0,13.36,36.52,32,96,32s96-18.64,96-32c0-4.86-5.05-10.5-13.85-15.49-10.46-5.92-25.88-10.73-43.42-13.55a8,8,0,1,1,2.54-15.79c19.65,3.15,36.51,8.48,48.77,15.42C236.19,156.87,240,168.26,240,176Z"
						></path>
					</svg>
					Открыть на Карте
				</a>
				<hr style="display: none;" />
				<a style="display: none;" class="mobile-learn_more" href={states[currentState].link}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
						<path
							d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180Zm28-72c0,17.38-13.76,31.93-32,35.28V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36S168,88.15,168,108Z"
						></path>
					</svg>
					Узнать Подробнее
				</a>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	* {
		font-family: "Montserrat Variable", sans-serif;
		color: white;
	}
	.about-section {
		.grid {
			min-height: 700px;
		}
		.whole-content.grid .content {
			grid-template-columns: 10fr 5fr;
			grid-template-rows: 3fr 2fr;
			padding-right: 0;
			span,
			p {
				color: rgba(0, 0, 0, 0.9);
			}

			.description-card,
			.map-card {
				padding: 24px;
				padding-right: 16px;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
				position: relative;
			}
			.map-card {
				background-color: rgba(30, 30, 30, 1);
				border: 1px solid rgba(255, 255, 255, 0.2);
				border-right: none;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					position: absolute;
					width: 100%;
					object-fit: cover;
					margin: auto 0;
					left: 0;
					z-index: 0;
					opacity: 0.75;
				}
				span {
					z-index: 1;
					color: white !important;
					font-size: 16px;
					font-weight: 700;
					text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
				}
			}
			.description-card {
				display: flex;
				flex-direction: column;
			}
		}
		background-color: #e2f66d11;
		border-top: 1px solid rgba(255, 255, 255, 0.15);
		height: 100vh;
	}

	.map-card-bottom_part {
		display: flex;
		margin-top: auto;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	.map-button {
		width: 64px;
		aspect-ratio: 1/1;
		border-radius: 100%;
		background-color: white;
		cursor: pointer;
		z-index: 4;

		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			fill: black;
			width: 36px;
			aspect-ratio: 1/1;
		}
		&:hover svg {
			animation-name: mapButton;
			animation-duration: 0.5s;
			animation-fill-mode: both;
			animation-iteration-count: 2;
		}
	}

	.state_preview-card {
		grid-row: 1/3;
		position: relative;
		display: flex;
		background-color: black;
	}
	.states-count {
		width: 200px;
		aspect-ratio: 1/1;
		border-radius: 100%;
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: -3px 3px 20px 3px rgba(0, 0, 0, 0.35);
		border-left: none;
		border-bottom: none;
		background-color: rgba(255, 255, 255, 0.05);
		margin: 128px auto 0 auto;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.states-count span.num {
		font-size: 96px;
		font-weight: 900;
	}
	.states-list {
		padding: 0;
		margin-top: 48px;
		list-style: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		button {
			text-align: center;
			background: none;
			border: none;
			font-size: 18px;
			color: rgba(255, 255, 255, 0.9);
			font-weight: 300;
			padding: 4px 6px;
			cursor: pointer;
			transition: 0.3s font-weight ease-out;
			&.selected {
				font-weight: 600;
				text-decoration: underline;
			}
		}
	}

	@keyframes mapButton {
		50% {
			transform: translate(6px, -6px);
		}
	}
	.state-description {
		font-size: 22px;
		font-weight: 600;
		transition-property: opacity, transform;
		transition-duration: 0.5s;
		transition-timing-function: ease-out;
		position: relative;
		z-index: 2;
		text-shadow: 0px 4px 4px white;
		padding: 0;
		margin: 0;
	}
	.description-card.disappear .state-description {
		opacity: 0;
		transform: translateX(10px);
	}
	.state-poster,
	.state-poster-top_layer {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 0;
	}
	.state-poster,
	.state-poster-top_layer {
		animation-name: poster-appear;
		animation-duration: 1.5s;
	}
	.map-card img {
		animation-name: map-appear;
		animation-duration: 1.5s;
	}
	@keyframes poster-appear {
		from {
			filter: brightness(0);
			scale: 1.3;
		}
	}
	@keyframes map-appear {
		from {
			opacity: 0;
			scale: 1.3;
		}
	}
	.state-poster.disappear,
	.state-poster-top_layer.disappear,
	.map-card img.disappear {
		transition:
			1s filter ease-out,
			1s scale ease-in;
		animation: none;
		filter: brightness(0);
		scale: 1.3;
	}
	.state-poster img,
	.state-poster-top_layer img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		top: 0;
		z-index: 2;
	}
	.state-poster-top_layer {
		z-index: 2;
		pointer-events: none;
	}

	.state-emojis {
		width: 100%;
		height: 100px;
		position: absolute;
		bottom: 32px;
		left: 0;
		transition-property: opacity, transform;
		transition-duration: 0.3s;
		transition-timing-function: ease-out;
		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 56px;
			aspect-ratio: 1/1;
			filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35));
		}
		img:first-child {
			top: 45%;
			left: 15%;
			rotate: 6deg;
		}
		img:nth-child(1) {
			top: 36%;
			left: 38%;
			rotate: -14deg;
		}
		img:nth-child(2) {
			top: 0%;
			left: 66%;
			rotate: 10deg;
		}
		img:nth-child(3) {
			top: 75%;
			left: 24%;
			rotate: 4deg;
		}
		img:nth-child(4) {
			top: 65%;
			left: 64%;
			rotate: -4deg;
		}
		img:nth-child(5) {
			top: 64%;
			left: 84%;
			rotate: 0;
		}
		img:nth-child(6) {
			top: 48%;
			left: 12%;
			rotate: -8deg;
		}
	}
	.state-name {
		color: rgba(255, 255, 255, 0.9) !important;
		font-size: 72px;
		text-align: center;
		width: 100%;
		left: 0;
		top: 120px;
		font-weight: 800;
		z-index: 1;
		position: absolute;
		animation-name: stateName-appear;
		animation-duration: 1s;
	}
	@keyframes stateName-appear {
		from {
			transform: translateY(-100px);
			scale: 0.85;
			opacity: 0.3;
		}
		to {
			transform: translateY(0);
			scale: 1;
			opacity: 1;
		}
	}
	.state-name.disappear {
		opacity: 0;
		scale: 1.3;
		filter: blur(10px);
		animation-name: none;

		transition-property: opacity, scale, filter;
		transition-duration: 0.5s;
		transition-timing-function: ease-in;
	}
	.mobile_buttons-card {
		display: none;
	}
	@media screen and (max-width: 1280px) {
		.about-section .whole-content.grid .content {
			grid-template-columns: 8fr 5fr;
			grid-template-rows: 3fr auto;
		}
	}
	@media screen and (max-width: 768px) {
		.about-section {
			.whole-content.grid .content {
				display: grid;
				grid-template-rows: 1fr 1fr 1fr;
				grid-template-columns: 1fr;
				.description-card,
				.map-card {
					border-radius: 28px;
					padding: 24px;
					border-right: 1px solid rgba(255, 255, 255, 0.2);
				}
				.map-card {
					display: none;
				}
				.description-card {
					height: 100%;
				}
				.map-card {
					display: none;
				}
				.state_preview-card {
					height: 100%;
					padding: 24px;
				}
				.mobile_buttons-card {
					display: flex;
					justify-content: center;
					background: none;
					border: none;
					border-radius: 0;
					gap: 8px;
					padding: 16px 0;
					hr {
						border: 0.5px solid rgba(255, 255, 255, 0.3);
					}
					a {
						flex-grow: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						gap: 16px;
						padding: 8px 16px;
						text-decoration: none;
					}
					svg {
						width: 26px;
						aspect-ratio: 1/1;
						fill: white;
						flex-shrink: 0;
					}
				}
			}
		}

		.state-learn_more {
			display: none;
		}
		.state-description {
			font-size: 16px;
		}
		.state-emojis {
			display: none !important;
		}
		.state-name {
			font-size: 42px;
			top: 48px;
		}
		.states-progress_list {
			margin: 0 24px;
		}
	}
</style>
