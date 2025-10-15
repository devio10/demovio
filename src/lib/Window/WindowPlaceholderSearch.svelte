<script lang="ts">
	let { placeholder, value = $bindable() }: { placeholder: string; value: string } = $props();
</script>

<div>
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 19.4434 19.2676"
	>
		<path
			d="M0 7.79297C0 12.0898 3.49609 15.5859 7.79297 15.5859C9.49219 15.5859 11.0449 15.0391 12.3242 14.1211L17.1289 18.9355C17.3535 19.1602 17.6465 19.2676 17.959 19.2676C18.623 19.2676 19.082 18.7695 19.082 18.1152C19.082 17.8027 18.9648 17.5195 18.7598 17.3145L13.9844 12.5098C14.9902 11.2012 15.5859 9.57031 15.5859 7.79297C15.5859 3.49609 12.0898 0 7.79297 0C3.49609 0 0 3.49609 0 7.79297ZM1.66992 7.79297C1.66992 4.41406 4.41406 1.66992 7.79297 1.66992C11.1719 1.66992 13.916 4.41406 13.916 7.79297C13.916 11.1719 11.1719 13.916 7.79297 13.916C4.41406 13.916 1.66992 11.1719 1.66992 7.79297Z"
			fill="currentColor"
		/>
	</svg>
	<input type="text" bind:value {placeholder} />
</div>

<style>
	div {
		background-color: rgba(0, 0, 0, 0.25);
		display: flex;
		padding-left: 18px;
		height: 42px;
		gap: 12px;
		border-radius: 12px;
		align-items: center;
		box-shadow: inset 0px 3.4px 3.4px 0px rgba(25, 25, 25, 0.25);
		border: 1px solid rgba(30, 30, 30, 0.4);
		flex-shrink: 0;
		overflow: hidden;
		svg {
			width: 18px;
			height: 18px;
			flex-shrink: 0;
			color: #c8c4c1;
		}
		input {
			color: #c8c4c1;
			background: none;
			border: none;
			font-size: 14px;
			flex: 1;
			height: 100%;
			min-width: 0;
			outline: none;
		}
	}
</style>
