<div class="stamp effect">
	<div>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path
				d="M7 14v-3.09c-.72-.33-1.39-.73-2-1.2V14zm-2 4H3v-2H1v-2h2V7h2v1.43C6.8 10 9.27 11 12 11s5.2-1 7-2.57V7h2v7h2v2h-2v2h-2v-2H5zm12-7.09V14h2V9.71c-.61.47-1.28.87-2 1.2M16 14v-2.68c-.64.23-1.31.4-2 .52V14zm-3 0v-2.04L12 12l-1-.04V14zm-3 0v-2.16c-.69-.12-1.36-.29-2-.52V14z"
			/>
		</svg>
		<span class="date">21 OCT 2024</span>
		<span>State Of</span>
		<span class="stamp_ca_name">California</span>
	</div>
</div>

<style lang="scss">
	.stamp {
		border-width: 4px;
		border-radius: 8px;
		padding: 2px;
		height: auto;
		--color: #b45309;
		> div {
			border: 1.5px dashed var(--color);
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 4px 4px 4px;
			border-radius: 2px;
		}
		svg {
			height: 56px;
			width: 56px;
			fill: var(--color);
		}
		span {
			color: var(--color);
			font-size: 16px;
			font-weight: 500;
			padding: 0 4px;
			text-transform: uppercase;
			line-height: 1;
			margin: 0;
		}
		.date {
			border: 1px solid var(--color);
			border-left: none;
			border-right: none;
			margin-bottom: 4px;
			line-height: 1.2;
		}
		.stamp_ca_name {
			font-size: 22px;
			letter-spacing: -2px;
			line-height: 1;
		}
	}
</style>
