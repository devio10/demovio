<script lang="ts">
	import { fade } from "svelte/transition";
	let { duration = 300 }: { duration?: number } = $props();
</script>

<div class="container">
	<div class="spinner" in:fade={{ duration: duration }} out:fade={{ duration: duration / 3 }}>
		{#each { length: 12 }}
			<div></div>
		{/each}
	</div>
</div>

<style lang="scss">
	div.container {
		width: var(--wheel-size, 64px);
		height: var(--wheel-size, 64px);
	}
	div.spinner {
		position: relative;
		width: 100%;
		aspect-ratio: 1 / 1;
		display: inline-block;
		color: var(--wheel-color, white);
	}
	:global([data-prefers-contrast]) {
		div.spinner {
			color: var(--wheel-color, var(--general-text));
		}
	}

	div.spinner div {
		width: 5%;
		height: 16%;
		background: currentColor;
		position: absolute;
		left: 49%;
		top: 43%;
		opacity: 0;
		border-radius: 50px;
		animation: fade 1s linear infinite;
	}

	@keyframes fade {
		from {
			opacity: 1;
		}
		to {
			opacity: 0.25;
		}
	}

	div.spinner div:nth-child(1) {
		transform: rotate(0deg) translate(0, -130%);
		animation-delay: 0s;
	}

	div.spinner div:nth-child(2) {
		transform: rotate(30deg) translate(0, -130%);
		animation-delay: -0.9167s;
	}

	div.spinner div:nth-child(3) {
		transform: rotate(60deg) translate(0, -130%);
		animation-delay: -0.833s;
	}
	div.spinner div:nth-child(4) {
		transform: rotate(90deg) translate(0, -130%);
		animation-delay: -0.7497s;
	}
	div.spinner div:nth-child(5) {
		transform: rotate(120deg) translate(0, -130%);
		animation-delay: -0.667s;
	}
	div.spinner div:nth-child(6) {
		transform: rotate(150deg) translate(0, -130%);
		animation-delay: -0.5837s;
	}
	div.spinner div:nth-child(7) {
		transform: rotate(180deg) translate(0, -130%);
		animation-delay: -0.5s;
	}
	div.spinner div:nth-child(8) {
		transform: rotate(210deg) translate(0, -130%);
		animation-delay: -0.4167s;
	}
	div.spinner div:nth-child(9) {
		transform: rotate(240deg) translate(0, -130%);
		animation-delay: -0.333s;
	}
	div.spinner div:nth-child(10) {
		transform: rotate(270deg) translate(0, -130%);
		animation-delay: -0.2497s;
	}
	div.spinner div:nth-child(11) {
		transform: rotate(300deg) translate(0, -130%);
		animation-delay: -0.167s;
	}
	div.spinner div:nth-child(12) {
		transform: rotate(330deg) translate(0, -130%);
		animation-delay: -0.0833s;
	}
</style>
