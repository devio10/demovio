<script lang="ts">
	import type { ComponentProps } from "svelte";
	import Toggle from "svelte-switcher";
	let {
		value = $bindable(),
		onChange,
		...props
	}: {
		value?: boolean;
		onChange?: (event: MouseEvent | TouchEvent) => void;
	} & Omit<ComponentProps<Toggle>, "value"> = $props();
</script>

<div class="switch">
	<Toggle {onChange} checked={value} {...props} />
</div>

<style lang="scss">
	.switch {
		display: flex;
		align-items: center;
		:global {
			.svelte-toggle .svelte-toggle--track {
				height: 32px;
				width: 56px;
				border-radius: 100px;
				background:
					radial-gradient(circle at 16px 16px, rgba(255, 255, 255, 0) 0%, transparent 70%),
					linear-gradient(rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.35) 100%);
				border-top: 0.5px solid rgba(200, 200, 200, 0.1);
				box-shadow:
					inset 0 -0.5px 1px 0 rgba(30, 30, 30, 0.3),
					inset 0 -0.5px 1px 0 rgba(255, 255, 255, 0.2),
					inset 0 3px 3px 0 rgba(0, 0, 0, 0.12),
					inset 0 3px 3px 0 rgba(0, 0, 0, 0.15);
			}
			.svelte-toggle.svelte-toggle--checked .svelte-toggle--track {
				background-color: #32d748;
				background:
					radial-gradient(circle at 32px 16px, rgba(255, 255, 255, 0) 0%, transparent 100%),
					linear-gradient(#32d748 0%, #32d748 100%);
			}
			.svelte-toggle .svelte-toggle--thumb {
				border: none;
				height: 28px;
				width: 28px;
				top: 2px;
				left: 2px;
				box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.22);
				outline: none;
			}
			.svelte-toggle.svelte-toggle--checked .svelte-toggle--thumb {
				left: 26px;
			}
			.svelte-toggle.svelte-toggle:hover:not(.svelte-toggle--disabled) .svelte-toggle--track {
				background:
					radial-gradient(circle at 16px 16px, rgba(255, 255, 255, 0.2) 0%, transparent 70%),
					linear-gradient(rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.35) 100%);
			}
			.svelte-toggle.svelte-toggle--checked:hover:not(.svelte-toggle--disabled)
				.svelte-toggle--track {
				background-color: #32d748;
				background:
					radial-gradient(circle at 32px 16px, rgba(255, 255, 255, 0.3) 0%, transparent 70%),
					linear-gradient(#32d748 0%, #32d748 100%);
			}
			.svelte-toggle--focus .svelte-toggle--thumb,
			.svelte-toggle:active:not(.svelte-toggle--disabled) .svelte-toggle--thumb {
				box-shadow: none;
				-webkit-box-shadow: none;
				-moz-box-shadow: none;
				scale: 0.9;
			}
		}
	}
</style>
