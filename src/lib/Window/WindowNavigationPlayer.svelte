<script>
	let { name, skin, pronouns, active = $bindable() } = $props();
</script>

<button
	onclick={() => {
		active = name;
	}}
	class={{ active: active === name }}
>
	<img src={skin} alt={name} />
	<div>
		<span class="name">{name}</span>
		<span class="pronouns">{pronouns}</span>
	</div>
</button>

<style lang="scss">
	button {
		display: flex;
		width: 100%;
		height: 72px;
		border-radius: 16px;
		border: none;
		margin: 0;
		cursor: pointer;
		align-items: center;
		flex-shrink: 0;
		padding: 0 24px;
		background: none;
		transition: 300ms background-color ease-out;

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
		img {
			width: 48px;
			height: 48px;
			border-radius: 4px;
			border: 0.5px solid rgba(255, 255, 255, 0.15);
			object-fit: cover;
			margin-right: 16px;
		}
		.name {
			font-size: 16px;
			font-weight: 600;
			color: white;
			display: block;
			text-align: left;
			margin-bottom: 4px;
		}
		.pronouns {
			font-size: 16px;
			display: block;
			text-align: left;
			color: rgba(190, 190, 190, 0.75);
		}
	}
</style>
