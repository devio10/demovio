<div class="stamp effect">
	<div>
		<span class="stamp_ny_text">APPROVED CITIZEN OF</span>
		<span class="stamp_ny_cityname">NEW YORK</span>
		<span class="stamp_ny_text">NY REGISTRATION OFFICE</span>
	</div>
</div>

<style lang="scss">
	.stamp {
		display: block;
		--color: #1e3a8a;
		height: 82px;
		border-radius: 100%;
		aspect-ratio: 2.5/1;
		padding: 4px;
		right: 0;
		bottom: 20px;
		border-style: double;

		div {
			border: 2px dashed red;
			border-radius: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.stamp_ny_cityname {
			color: var(--color);
			font-weight: 500;
			font-size: 18px;
			border: 1px solid var(--color);
			border-left: none;
			border-right: none;
			padding: 0 8px;
			font-family: "Times New Roman", Times, serif;
		}
		.stamp_ny_text {
			color: var(--color);
			font-size: 10px;
			font-weight: 500;
			font-family: "Times New Roman", Times, serif;
		}
	}
</style>
