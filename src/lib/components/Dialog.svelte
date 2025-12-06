<script lang="ts">
	import { type Snippet } from "svelte";
	import { scale, type EasingFunction, type TransitionConfig } from "svelte/transition";
	import DialogButton from "./DialogButton.svelte";
	import { expoOut } from "svelte/easing";
	import hotkeys from "hotkeys-js";
	import Portal from "svelte-portal";
	let {
		title,
		description,
		children,
		color = "rgb(223, 93, 255)",
		icon,
		opened = $bindable(),
	}: {
		title: string;
		description?: unknown;
		children?: Snippet;
		color?: string;
		icon?: Snippet;
		opened: boolean | undefined;
	} = $props();
	const transparency = (
		node: HTMLElement,
		{ delay, duration, easing }: { delay?: number; duration?: number; easing?: EasingFunction },
	): TransitionConfig => {
		return {
			delay,
			duration,
			easing,
			css: (t) => {
				return `background-color: rgba(0,0,0,${0.5 * t})`;
			},
		};
	};
	$effect(() => {
		if (opened) {
			const closeDialog = () => {
				opened = false;
			};
			hotkeys("esc", closeDialog);
			return () => hotkeys.unbind("esc", closeDialog);
		}
	});
</script>

{#if opened}
	<Portal target="body">
		<div
			class="dialog-background"
			transition:transparency|global={{ duration: 300, easing: expoOut }}
		>
			<div class="dialog" transition:scale|global={{ duration: 300, start: 1.5 }}>
				<div class="content">
					<div class="icon" style="--color: {color}">
						{@render icon?.()}
					</div>
					<h3>{title}</h3>
					<p>{description}</p>
					<div class="buttons">
						{#if children}
							{@render children?.()}
						{:else}
							<DialogButton
								onclick={() => {
									opened = false;
								}}
							>
								Закрыть
							</DialogButton>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</Portal>
{/if}

<style lang="scss">
	.dialog-background {
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 90;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
	}
	.dialog {
		width: 380px;
		z-index: 89;
		outline: none;
		padding: 24px;
		background-color: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(48px);
		box-shadow:
			inset 2.8px 2.8px 1.87px 0 rgba(255, 255, 255, 0.1),
			inset -1.87px 0 1.87px 0 rgba(255, 255, 255, 0.2);
		border-radius: 36px;
		outline: none;
		border: none;

		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		h3 {
			font-weight: bold;
			font-size: 20px;
			text-wrap: balance;
			text-align: center;
			padding-top: 16px;
			line-height: 1.5;
			margin: 0;
			// text-transform: capitalize;
		}
		p {
			font-size: 15px;
			text-wrap: balance;
			text-align: center;
			color: rgba(240, 240, 240, 0.75);
			margin: 6px 0 0 0;
		}
		.icon {
			--red: rgb(253, 58, 58);
			--yellow: rgb(252, 189, 28);
			--purple: rgb(145, 49, 242);
			--green: rgb(123, 242, 49);

			width: 52px;
			height: 52px;
			border-radius: 100%;
			background-color: var(--color);
			color: rgb(223, 93, 255);
			padding: 4px;
			:global {
				svg,
				div {
					width: 100%;
					height: 100%;
					color: white;
				}
			}
		}
		.buttons {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			// gap: 4px;
			padding-top: 12px;
			margin-top: 16px;
			border-top: 0.5px solid rgba(230, 230, 230, 0.5);
		}
	}
	@media screen and (max-width: 768px) {
		.dialog {
			width: calc(100% - 24px);
			max-width: 380px;
			padding: 24px 16px 16px 16px;
			.icon {
				width: 46px;
				height: 46px;
			}
			h3 {
				padding-top: 12px;
				line-height: 1.4;
				font-size: 18px;
			}
		}
	}
</style>
