<script lang="ts">
	let {
		name,
		src,
	}: {
		name: string;
		src: string;
	} = $props();
</script>

<button>
	<div class="flex">
		<div class="image">
			<img draggable="false" src="/EnvironmentPreview/{src}" alt={name} />
		</div>
		<span class="label">{name}</span>
	</div>
</button>

<style lang="scss">
	button {
		$size: 136px;
		width: calc($size * 1.6);
		display: inline-block;
		user-select: none;
		padding: 16px 0;
		background: none;
		// display: flex;
		transition: scale 300ms ease-out;
		border: none;
		cursor: pointer;
		.flex {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.image {
			overflow: clip;
			width: $size;
			height: $size;
			border-radius: 100px;
			position: relative;
			transition-property: width;
			transition-duration: 300ms;
			transition-timing-function: ease-out;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
		}
		span.label {
			font-size: 14px;
			font-weight: 500;
			color: rgba(230, 230, 230, 0.85);
			text-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
			text-align: center;
			margin-top: 8px;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&:hover {
			scale: 1.1;
			.image {
				width: calc($size * 1.6);
			}
			span.label {
				color: white;
			}
		}
		&:active {
			transition-duration: 75ms;
			filter: brightness(0.9);
			scale: 1.02;
		}
	}
	@media screen and (max-width: 768px) {
		a {
			padding: 8px 12px;
			img {
				$image-size: 36px;
			}
		}
	}
</style>
