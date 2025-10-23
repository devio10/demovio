<script lang="ts">
	import { page } from "$app/state";
	import type { Snippet } from "svelte";
	import { MediaQuery } from "svelte/reactivity";
	import { fade, fly, scale, slide } from "svelte/transition";

	let {
		children,
		navigation,
		urlName,
	}: {
		children?: Snippet;
		navigation?: Snippet;
		urlName: string;
	} = $props();

	let isMobile = new MediaQuery("screen and (max-width: 768px)");
	let sectionOpened = $state(false);
	$effect(() => {
		sectionOpened = page.route.id === urlName;
	});
</script>

{#if !isMobile.current}
	<div class="window" transition:scale|global={{ duration: 500, start: 0.5 }}>
		{@render navigation?.()}
		<div class="content">
			{@render children?.()}
		</div>
	</div>
{:else}
	<div class="window" transition:fade|global={{ duration: 500 }}>
		{#if !sectionOpened}
			{@render navigation?.()}
		{/if}
		{#if sectionOpened}
			<div
				class={["content", { opened: sectionOpened }]}
				transition:fly|global={{ duration: 500, x: 300 }}
			>
				{@render children?.()}
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.navigation {
		display: contents;
	}
	.window {
		position: absolute;
		width: 80%;
		max-width: 1000px;
		height: 80%;
		max-height: 850px;
		display: flex;
		backdrop-filter: blur(50px);
		border-radius: 52px;
		overflow: clip;
		box-shadow: 0 6px 30px 5px rgba(0, 0, 0, 0.4);
	}

	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100%;
		max-height: 100%;
		min-height: 0;
		overflow-y: auto;
		background-color: #393939;
		position: relative;
		background: linear-gradient(-50deg, rgba(255, 255, 255, 0.37) 0%, rgba(114, 114, 114, 0.6) 95%);
		border-radius: 0 52px 52px 0;
		box-shadow:
			inset 0px 1.92px 5.76px 0px rgba(255, 255, 255, 0.25),
			0px 0.85px 20.48px rgba(0, 0, 0, 0.18);
		min-width: 0;

		&:first-child {
			background-color: rgba(57, 57, 57, 0.6);
			background: linear-gradient(-21deg, rgba(57, 57, 57, 0.6) 0%, rgba(97, 97, 97, 0.6) 100%);
			border-radius: 52px;
		}
	}
	@media screen and (max-width: 768px) {
		.window {
			width: 100%;
			height: 100%;
			border-radius: 0;
			max-height: none;
			// backdrop-filter: none;
			background: linear-gradient(-21deg, rgba(57, 57, 57, 0.6) 0%, rgba(97, 97, 97, 0.6) 100%);

			.content {
				// backdrop-filter: blur(30px);
				width: 100%;
				border-radius: 0;
				position: absolute;
				left: 0;
				z-index: 20;
				background: none;
				box-shadow: none;
				padding-bottom: 52px;
			}
		}
	}
</style>
