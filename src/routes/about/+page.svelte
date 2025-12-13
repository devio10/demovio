<script lang="ts">
	import "../../app.scss";
	import "@fontsource-variable/montserrat";
	import HeaderLogo from "$lib/components/HeaderLogo.svelte";
	import AboutStates from "./AboutStates.svelte";
	import { scrollY } from "svelte/reactivity/window";
	import { fade, fly, scale } from "svelte/transition";
	import { onMount } from "svelte";
	let { data } = $props();
	let heroHeight = $state(100);
	let ready = $state(false);
	onMount(() => (ready = true));
</script>

<svelte:head>
	<title>Demovio: Minecraft сервер</title>
</svelte:head>

<div class="top_announcement" style="display: none">
	<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 256 256">
		<path
			d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"
		></path>
	</svg>
	Мы сменили IP адрес сервера! Подключайтесь сейчас:
	<a href="https://demovio.love/">demovio.love</a>
</div>
<header class={{ shrink: scrollY.current && scrollY.current > heroHeight }}>
	<span>
		<HeaderLogo />
	</span>
	<a class="header-menu_button" href="/" aria-label="Статус сервера">
		<div></div>
		<div></div>
	</a>
</header>

<section bind:offsetHeight={heroHeight} class="about-section hero">
	<div class="whole-content">
		{#if ready}
			<img
				src="/about/world_of_your_ideas.svg"
				alt="Мир твоих идей"
				class="hero_title"
				in:fly|global={{ duration: 1500, y: -150 }}
			/>
		{/if}
		<div class="he-row">
			{#if ready}
				<div class="he-row-description">
					<p class="short_description" in:scale={{ duration: 1500, opacity: 0, start: 0.75 }}>
						Частный сервер Minecraft c уютной атмосферой, несколькими городами и заводами Create
					</p>
				</div>
				<a href="/register" class="mobile-signup">Подайте Заявку</a>
				<img
					class="hero_image"
					src="/about/hero.png"
					alt="Игровой персонаж"
					in:fly|global={{ duration: 1500, y: 150 }}
				/>
				<div class="he-row-signup" in:scale={{ duration: 1500, opacity: 0, start: 0.5 }}>
					<a class="signup_balls" href="/register">
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
								<path
									d="M152,84a28,28,0,1,0-28-28A28,28,0,0,0,152,84Zm0-48a20,20,0,1,1-20,20A20,20,0,0,1,152,36Zm65.66,101c-.57.26-6.84,3-18.08,3-13.86,0-35.25-4.15-62.81-22.16a162.59,162.59,0,0,1-19.49,40.78c9.47,2.56,23.08,7.5,35.14,16.67,18.3,13.92,27.58,33,27.58,56.68a4,4,0,0,1-8,0c0-15.89-5.88-53.77-59.7-66.37q-1.56,2.06-3.22,4.08c-18.85,22.83-42.42,34.72-68.6,34.72q-4.4,0-8.89-.45a4,4,0,1,1,.8-8c27.33,2.73,51.06-7.83,70.52-31.41,13.82-16.74,22.89-37.44,26.9-51.32-42.84-26.69-71-4.8-71.32-4.57a4,4,0,1,1-5-6.24c.36-.29,9-7.1,23.84-9.58,13.5-2.27,35-1.26,60.91,16.34,25,17,44.41,21.64,56.29,22.56,12.75,1,19.77-2,19.84-2.05a4,4,0,0,1,3.29,7.29Z"
								></path>
							</svg>
						</div>
						<img src="/about/ball1.png" alt="Инопланетный шар" />
					</a>
					<span>Подайте заявку</span>
				</div>
			{/if}
		</div>
		{#if ready}
			<div class="hero-glowing" transition:fade={{ duration: 1000, delay: 500 }}>
				<div class="hero-glow red"></div>
				<div class="hero-glow orange"></div>
				<div class="hero-glow yellow"></div>
				<div class="hero-glow green"></div>
				<div class="hero-glow blue"></div>
				<div class="rainbow-line"></div>
			</div>
		{/if}
	</div>
</section>

<section class="about-section why-us">
	<div class="whole-content grid">
		<div class="menu">
			<span class="title-pill">О Нас</span>
		</div>
		<div class="content">
			<h2 class="section-header">Почему Мы?</h2>
			<p class="section-paragraph">
				Demovio – единственный в своём роде сервер Minecraft.
				<span>Расскажем почему</span>
			</p>
			<ol>
				<li>
					Несколько городов и штатов. <span>Точно найдётся место по душе</span>
				</li>
				<li>
					Безопасность на высшем уровне. <span>Посторонние люди не смогут зайти на сервер</span>
				</li>
				<li>
					Транспортная инфраструктура. <span>Регулярные поезда между городами</span>
				</li>
				<li>
					Полностью бесплатно. <span>Никаких донатов и платных транзакций</span>
				</li>
				<li>
					Встроенный голосовой чат. <span>Нет необходимости использовать сторонние приложения</span>
				</li>
				<li>
					Механизмы Create. <span>Заводы обеспечат ресурсами всех</span>
				</li>
				<li>
					Мощный сервер. <span>Комфортно играть даже при нагрузке</span>
				</li>
			</ol>
		</div>
	</div>
</section>

<section class="about-section we-have-states">
	<div class="whole-content grid">
		<div class="menu">
			<span class="title-pill">Штаты</span>
		</div>
		<div class="content">
			<img
				src="/about/united_states_of_demovio.svg"
				alt="Карта штатов Демовио"
				class="usd_glow_map"
			/>
			<div style="position: relative;">
				<h2 class="section-header">Стойте, штаты?</h2>
				<p class="section-paragraph">
					У нас действительно несколько штатов! <span>
						Мы создали их для того, чтобы разбавить ваш геймплей.
					</span>
					Вы можете создать свой собственный штат, если есть такое желание
				</p>
			</div>
		</div>
	</div>
</section>

<AboutStates />

<section class="about-section achievements" style="display: none;">
	<div class="whole-content grid">
		<div class="menu"></div>
		<div class="content">
			<div class="achievements-block"></div>
		</div>
	</div>
</section>

<footer>
	<span class="footer-logo">
		<HeaderLogo />
	</span>
	<div class="links">
		<a href="/about">О сервере</a>
		<a href="/register">Подать заявку</a>
		<a href="/login">Войти</a>
		<a href="/">Статус сервера</a>
	</div>
	<span class="ip-address">
		IP адрес: <span>demovio.love</span>
	</span>
</footer>

{#if data.profile}
	<div
		class={[
			"welcome_player",
			{
				shown: ready && ((scrollY.current && scrollY.current < heroHeight / 2) || !scrollY.current),
			},
		]}
	>
		<a href="/">
			Перейти к статусу сервера
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
				<path
					d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"
				></path>
			</svg>
		</a>
	</div>
{/if}

<style lang="scss">
	* {
		font-family: "Montserrat Variable", sans-serif;
		color: white;
		margin: 0;
		padding: 0;
	}
	:global {
		.about-section {
			height: calc(100vh + 64px);
			min-height: fit-content;
			.whole-content {
				max-width: 1400px;
				margin: 0;
				height: 100%;
				&.no-max-width {
					max-width: none;
				}
			}
			.grid {
				display: grid;
				grid-template-columns: 25vw 1fr;
				min-height: fit-content;
			}
			.menu {
				width: 100%;
				height: 100%;
			}
			&.grid {
				.content {
					width: 100%;
					height: 100%;
					padding: 16px 16px 16px 0;
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 16px;
					.content-card {
						border-radius: 28px;
						background-color: white;
						width: 100%;
						height: 100%;
						padding: 48px;
						overflow: clip;
					}
				}
			}
		}
	}
	.top_announcement {
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2px 0 2px;
		font-size: 12px;
		gap: 6px;
	}
	header {
		display: flex;
		padding: 48px;
		width: 100%;
		position: fixed;
		top: 0;
		transition: 0.3s width ease-out;
		:global {
			svg {
				height: 20px;
			}
		}
		span {
			border-radius: 100px;
			color: var(--color);
			padding: 9px 12px 4px 12px;
			transition: 0.3s background-color ease-out;
		}
		&.shrink {
			width: 25vw;
			span {
				background-color: white;
				--color: rgba(0, 0, 0, 0.9);
			}
			.header-menu_button {
				width: 96px;
			}
		}
	}
	.header-menu_button {
		height: 37px;
		width: 140px;
		border-radius: 100px;
		margin-left: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 10px;
		align-items: center;
		transition: 0.3s width ease-out;
		&:hover {
			background-color: rgba(255, 255, 255, 0.15);
		}
		div {
			background-color: white;
			height: 1px;
			width: 60%;
		}
	}

	.about-section.hero {
		background-color: #4e46e5;
		background:
			linear-gradient(145deg, #3a33c7a2 0%, #1d169267 100%), url(/about/noise.svg), #4e46e5;

		overflow: clip;
		position: relative;
		min-height: 700px;
		max-height: 1000px;
		height: 100vh;
		.whole-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 auto;
		}
		.hero_title {
			width: 100%;
			margin-top: 96px;
			max-width: 950px;
		}
		.he-row {
			display: grid;
			grid-template-columns: 1fr 500px 1fr;
			padding: 0 56px;
			> div {
				margin-top: 64px;
			}
		}
		.hero_image {
			margin-top: -86px;
			width: 100%;
			height: 1200px;
			object-fit: cover;
		}
		.short_description {
			font-size: 22px;
			font-weight: 300;
			line-height: 1.4;
			max-width: 416px;
			margin-top: 26px;
			text-align: left;
		}
		.he-row-signup {
			margin-left: auto;
			height: fit-content;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-right: 18px;
			position: relative;
			z-index: 3;
			span {
				text-align: center;
				display: block;
				margin: 24px 0 0 0;
				font-size: 16px;
				font-weight: 300;
			}
		}
		.signup_balls {
			position: relative;
			width: 110px;
			aspect-ratio: 1/1;
			display: flex;
			img,
			div {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				aspect-ratio: 1/1;
				left: -32px;
			}
			div {
				left: 32px;
				border: 1px solid rgba(255, 255, 255, 1);
				border-radius: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			svg {
				width: 50%;
				aspect-ratio: 1/1;
				fill: white;
			}
		}
	}
	.hero-glowing {
		z-index: 2;
		width: 100%;
		height: 200px;
		pointer-events: none;
		position: absolute;
		bottom: 0;
		display: grid;
		align-items: end;
		grid-template-columns: 2fr 3fr 4fr 3fr 2fr;
	}
	.hero-glow {
		--color: red;
		width: 100%;
		background-color: var(--color);
		box-shadow: 0px 0px 36px 16px var(--color);
		height: 50px;
		border-radius: 100%;
		filter: blur(20px);
		z-index: 2;
		margin: 0 0 -18px 0;
		transform: scaleY(1.2);

		opacity: 0.75;

		&.red {
			--color: #ef4444;
			right: -300px;
			bottom: -350px;
		}
		&.orange {
			--color: #fb923c;
			height: 65px;
		}
		&.yellow {
			--color: #fbbf24;
			height: 80px;
		}
		&.green {
			--color: #bef264;
			height: 65px;
		}
		&.blue {
			--color: #38bdf8;
		}
	}
	.rainbow-line {
		background: linear-gradient(
			90deg,
			rgba(239, 68, 68, 1) 0%,
			rgba(251, 146, 60, 1) 25%,
			rgba(251, 191, 36, 1) 50%,
			rgba(190, 242, 100, 1) 75%,
			rgba(56, 185, 242, 1) 100%
		);
		height: 12px;
		width: 100%;
		position: absolute;
		bottom: 0;
		z-index: 3;
	}
	a.mobile-signup {
		display: none;
	}
	.about-section {
		ol {
			margin-top: 32px;
			margin-bottom: 32px;
			max-width: 650px;
			padding: 0;
			li {
				padding: 12px 0;
				font-size: 20px;
				font-weight: 500;
				line-height: 1.4;
				span {
					color: rgba(255, 255, 255, 0.5);
				}
			}
		}

		&.why-us {
			background-color: #38bdf811;
			.title-pill {
				--color: #6de6f62f;
			}
		}
		&.we-have-states {
			border-top: 1px solid rgba(255, 255, 255, 0.15);
			background-color: #64f27011;
			position: relative;
			overflow: clip;
		}
		&.achievements {
			background-color: #fb923c11;
			border-top: 1px solid rgba(255, 255, 255, 0.15);
			.content {
				padding: 16px 16px 16px 0;
			}
		}
	}
	.usd_glow_map {
		position: absolute;
		left: 30vw;
		height: 60%;
		bottom: -64px;
	}
	.achievements-block {
		background-color: #fb923c08;
		width: 100%;
		height: 100%;
		border-radius: 24px;
	}
	.title-pill {
		--color: #e2f66d2f;
		padding: 6px 18px;
		background-color: var(--color);
		border: 1px solid var(--color);
		border-radius: 100px;
		margin: 128px 48px 16px auto;
		display: block;
		width: fit-content;
		position: sticky;
		top: 128px;
		font-weight: 600;
	}
	.welcome_player {
		position: fixed;
		width: 100%;
		bottom: 48px;
		left: 0;
		z-index: 5;
		display: flex;
		justify-content: center;
		pointer-events: none;
		&.shown {
			pointer-events: all;
			a {
				transform: translateY(0) scale(1);
				&:hover {
					transform: scale(1.05);
				}
				&:active {
					transform: scale(0.95);
				}
			}
		}
		&.hidden {
			display: none;
		}
		a {
			padding: 8px 8px 8px 24px;
			border-radius: 100px;

			background-color: rgba(30, 30, 30, 0.65);
			border: 1px solid rgba(230, 230, 230, 0.15);
			border-left: none;
			border-bottom: none;
			backdrop-filter: blur(4px);
			display: flex;
			align-items: center;
			gap: 12px;

			transform: translateY(120px) scale(0.75);
			transition: 0.5s transform cubic-bezier(0.34, 1.56, 0.64, 1);
			text-decoration: none;
		}
		svg {
			height: 42px;
			width: 42px;
			background-color: rgba(255, 255, 255, 0.1);
			border-radius: 100%;
			fill: white;
			padding: 8px;
		}
	}
	.section-header {
		font-size: 72px;
		font-weight: 500;
		margin-top: 96px;
	}
	.section-paragraph {
		font-size: 24px;
		font-weight: 500;
		max-width: 650px;
		line-height: 1.5;
		margin-top: 32px;
		span {
			color: rgba(255, 255, 255, 0.5);
		}
	}
	footer {
		padding: 48px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		:global {
			svg {
				width: 72px;
			}
		}
		.links {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			gap: 48px;
		}
		a {
			color: rgba(255, 255, 255, 0.5);
			text-decoration: none;
			text-align: center;
			text-wrap: nowrap;
		}
		.ip-address {
			text-align: right;
			span {
				font-family: monospace;
				font-size: 18px;
			}
		}
	}
	@media screen and (max-width: 1280px) {
		.about-section.states .content {
			grid-template-columns: 8fr 5fr;
			grid-template-rows: 3fr auto;
		}

		header {
			position: fixed;
			height: 72px;
		}
		header.shrink {
			width: 100%;
		}
		header.shrink .header-menu_button {
			background-color: rgba(255, 255, 255, 0.075);
			backdrop-filter: blur(5px);
			width: 64px;
			border: 1px solid rgba(255, 255, 255, 0.2);
		}
	}
	@media screen and (max-width: 768px) {
		header {
			height: 64px;
			padding: 0 24px;
			/* position: absolute; */
		}
		:global {
			.about-section {
				height: fit-content;
				.menu {
					display: none;
				}
				.whole-content {
					max-width: none;
					width: 100%;
					padding: 0 16px;
					&.grid {
						display: flex;
						flex-direction: column;
					}
				}
				.section-header {
					margin-top: 48px;
					font-size: 42px;
				}
				.section-paragraph {
					font-size: 20px;
				}
			}
		}
		.about-section {
			ol {
				margin-bottom: 32px;
				li {
					list-style-position: inside;
					margin-bottom: 8px;
				}
			}
			.content {
				padding: 0 12px;
			}
			&.hero {
				max-height: 900px;
				.hero_title {
					margin-top: 116px;
				}
				.he-row {
					display: flex;
					flex-direction: column;
					padding: 0;
				}
				.he-row > div {
					margin-top: 24px;
				}
				.short_description {
					font-size: 20px;
					max-width: none;
					margin-top: none;
					text-align: center;
				}
				.he-row-signup {
					display: none;
				}
				.hero_image {
					width: 150%;
					height: auto;
					margin-top: -48px;
					pointer-events: none;
				}
			}
			&.we-have-states .content {
				display: flex;
				flex-direction: column-reverse;
			}
		}

		a.mobile-signup {
			display: block;
			padding: 12px 24px;
			border-radius: 100px;
			border: 1px solid white;
			font-size: 16px;
			font-weight: 400;
			width: fit-content;
			margin: 16px auto 0 auto;
			text-decoration: none;
			&:focus {
				color: black;
				background-color: white;
			}
		}
		.usd_glow_map {
			width: 100%;
			position: static;
			height: auto;
			margin: 32px auto;
		}

		footer {
			display: flex;
			flex-direction: column-reverse;
			align-items: center;
			gap: 32px;
			padding: 32px;
			.links {
				display: flex;
				flex-direction: column;
				gap: 16px;
			}
		}
	}
</style>
