<script lang="ts">
	import { setContentScrollContext } from "$lib/scripts";
	import type { Snippet } from "svelte";
	import { MediaQuery } from "svelte/reactivity";
	import { fade, fly, scale } from "svelte/transition";
	let scroll: number = $state(0);
	let contentScrollContext = $state({ contentScroll: 0 });
	setContentScrollContext(contentScrollContext);
	$effect(() => {
		contentScrollContext.contentScroll = scroll;
	});

	let {
		children,
		navigation,
		sectionOpened,
	}: {
		children?: Snippet;
		navigation?: Snippet;
		sectionOpened?: boolean;
	} = $props();

	let isMobile = new MediaQuery("screen and (max-width: 768px)", false);
</script>

{#if !isMobile.current}
	<div class="window" transition:scale|global={{ duration: 500, start: 0.5 }}>
		{@render navigation?.()}
		<div
			class="content"
			onscroll={({ target }) => {
				scroll = (target as HTMLDivElement).scrollTop;
			}}
		>
			{@render children?.()}
		</div>
	</div>
{:else}
	<div class="window" transition:fade|global={{ duration: 500 }}>
		{#if !sectionOpened && navigation !== undefined}
			{@render navigation?.()}
		{/if}
		{#if sectionOpened || navigation === undefined}
			<div
				class={["content", { opened: sectionOpened }]}
				transition:fly|global={{ duration: 500, x: 300 }}
				onscroll={({ target }) => {
					scroll = (target as HTMLDivElement).scrollTop;
				}}
			>
				{@render children?.()}
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.window {
		position: absolute;
		width: 80%;
		max-width: 1000px;
		height: 80%;
		max-height: 850px;
		display: flex;
		backdrop-filter: blur(42px);
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
		background: linear-gradient(-35deg, rgba(215, 215, 215, 0.45) 0%, rgba(114, 114, 114, 0.6) 95%);
		border-radius: 0 52px 52px 0;
		box-shadow:
			inset 0px 1.92px 5.76px 0px rgba(255, 255, 255, 0.25),
			0px 0.85px 20.48px rgba(0, 0, 0, 0.18);
		min-width: 0;

		&:first-child {
			background-color: rgba(57, 57, 57, 0.6);
			background: linear-gradient(35deg, rgba(57, 57, 57, 0.6) 0%, rgba(97, 97, 97, 0.6) 100%);
			border-radius: 52px;
		}
	}
	@media screen and (max-width: 768px) {
		.window {
			width: 100%;
			height: 100%;
			border-radius: 0;
			max-height: none;
			backdrop-filter: blur(30px);
			background: linear-gradient(35deg, rgba(40, 40, 40, 0.6) 0%, rgba(97, 97, 97, 0.6) 100%);
			// background: black;

			.content {
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
