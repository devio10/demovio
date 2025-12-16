<script lang="ts">
	import { page } from "$app/state";
	import type { Snippet } from "svelte";

	let { href, altHref, children }: { href: string; altHref?: string; children?: Snippet } =
		$props();
</script>

<a {href} class={{ active: page.url.pathname === href || page.url.pathname === altHref }}>
	<div class="inner-height">
		{@render children?.()}
	</div>
</a>

<style lang="scss">
	a {
		width: 100%;
		font-size: 14px;
		font-weight: 600;
		border-radius: 16px;
		border: none;
		margin: 0;
		cursor: pointer;
		flex-shrink: 0;
		background: none;
		transition: 300ms background-color ease-out;
		text-decoration: none;
		color: #dddbd6;
		overflow: clip;

		.inner-height {
			display: flex;
			align-items: center;
			height: 56px;
			min-height: 56px;
			padding: 0 16px;
		}

		&.active {
			background-color: rgba(179, 179, 179, 0.3);
			&:hover {
				background-color: rgba(179, 179, 179, 0.5);
			}
		}
		&:hover {
			transition-duration: 75ms;
			background-color: rgba(179, 179, 179, 0.2);
		}
	}
	:global([data-prefers-contrast]) {
		a {
			color: var(--general-text);
		}
	}
	@media screen and (max-width: 768px) {
		a {
			&:hover {
				background-color: rgba(0, 0, 0, 0);
			}
			&:active {
				background-color: rgba(179, 179, 179, 0.2);
			}
			&.active {
				background-color: rgba(0, 0, 0, 0);
				&:hover {
					background-color: rgba(0, 0, 0, 0);
				}
				&:active {
					background-color: rgba(179, 179, 179, 0.2);
				}
			}
		}
	}
</style>
