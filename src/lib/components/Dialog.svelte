<script lang="ts">
	import { onMount } from "svelte";
	import { fly, scale } from "svelte/transition";
	let { title, description, children, color = "rgb(131, 87, 251)", icon } = $props();
	let dialog: HTMLDialogElement;

	onMount(() => {
		dialog.showModal();
	});
</script>

<dialog closedby="any" transition:scale|global={{ duration: 300, start: 1.5 }} bind:this={dialog}>
	<div class="content">
		<div class="icon" style="--color: {color}">
			{@render icon?.()}
		</div>
		<h3>{title}</h3>
		<p>{description}</p>
		<form method="dialog" class="buttons">
			{@render children?.()}
		</form>
	</div>
</dialog>

<style lang="scss">
	dialog {
		position: fixed;
		width: 380px;
		z-index: 10;
		outline: none;
		padding: 32px 24px;
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

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 9;
			width: 100%;
			height: 100%;
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
			width: 52px;
			height: 52px;
			border-radius: 100%;
			background-color: var(--color);
			// color: rgb(253, 58, 58);
			padding: 4px;
			:global {
				svg {
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
			gap: 8px;
			padding-top: 12px;
			margin-top: 16px;
			border-top: 0.5px solid rgba(230, 230, 230, 0.5);
		}
	}
</style>
