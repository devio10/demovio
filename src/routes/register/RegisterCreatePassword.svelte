<script>
	import { enhance } from "$app/forms";
	import Button from "$lib/Button.svelte";
	import TextInput from "$lib/TextInput.svelte";
	import { RegisterStage } from "./stages";

	let {
		formError = $bindable(),
		submitting = $bindable(),
		page = $bindable(),
		password = $bindable(),
	} = $props();
	let repeatPassword = $state();
</script>

<form
	method="POST"
	action="/register?/checkPassword"
	use:enhance={({ cancel }) => {
		formError = undefined;
		submitting = true;
		if (password != repeatPassword) {
			formError = { wrongCombo: "Пароли не совпадают." };
			submitting = false;
			return cancel();
		}
		return ({ update, result }) => {
			submitting = false;
			if (result.type === "success") {
				page = RegisterStage.checkForLicense;
			}
			update({ reset: false });
		};
	}}
>
	<TextInput
		oninput={() => (formError = undefined)}
		style="margin-bottom: 16px"
		placeholder="Пароль"
		name="password"
		type="password"
		bind:value={password}
		disabled={submitting}
	>
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 12.832 24.2449"
		>
			<path
				d="M6.24023 0.144902C2.76367 0.144902 0 2.90857 0 6.36561C0 8.97303 1.5625 11.2777 4.00391 12.2054L4.00391 21.8441C4.00391 22.0883 4.08203 22.2738 4.25781 22.4594L5.88867 24.1C6.05469 24.266 6.38672 24.3148 6.5918 24.1097L9.6875 21.014C9.89258 20.7992 9.88281 20.516 9.6875 20.3109L7.76367 18.4164L10.4004 15.7894C10.5859 15.5941 10.5859 15.3109 10.3809 15.0961L7.77344 12.4691C10.791 11.2679 12.4707 9.04139 12.4707 6.36561C12.4707 2.92811 9.6875 0.144902 6.24023 0.144902ZM6.24023 5.86756C5.33203 5.86756 4.60938 5.13514 4.60938 4.2367C4.60938 3.3285 5.32227 2.60584 6.24023 2.60584C7.13867 2.60584 7.87109 3.3285 7.87109 4.2367C7.87109 5.13514 7.13867 5.86756 6.24023 5.86756Z"
				fill="currentColor"
			/>
		</svg>
	</TextInput>

	<TextInput
		oninput={() => (formError = undefined)}
		style="margin-bottom: 16px"
		placeholder="Повторите пароль"
		type="password"
		bind:value={repeatPassword}
		disabled={submitting}
	>
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 12.832 24.2449"
		>
			<path
				d="M6.24023 0.144902C2.76367 0.144902 0 2.90857 0 6.36561C0 8.97303 1.5625 11.2777 4.00391 12.2054L4.00391 21.8441C4.00391 22.0883 4.08203 22.2738 4.25781 22.4594L5.88867 24.1C6.05469 24.266 6.38672 24.3148 6.5918 24.1097L9.6875 21.014C9.89258 20.7992 9.88281 20.516 9.6875 20.3109L7.76367 18.4164L10.4004 15.7894C10.5859 15.5941 10.5859 15.3109 10.3809 15.0961L7.77344 12.4691C10.791 11.2679 12.4707 9.04139 12.4707 6.36561C12.4707 2.92811 9.6875 0.144902 6.24023 0.144902ZM6.24023 5.86756C5.33203 5.86756 4.60938 5.13514 4.60938 4.2367C4.60938 3.3285 5.32227 2.60584 6.24023 2.60584C7.13867 2.60584 7.87109 3.3285 7.87109 4.2367C7.87109 5.13514 7.13867 5.86756 6.24023 5.86756Z"
				fill="currentColor"
			/>
		</svg>
	</TextInput>

	{#if formError?.wrongPassword}
		<span>{formError.wrongPassword}</span>
	{/if}

	{#if formError?.wrongCombo}
		<span>{formError.wrongCombo}</span>
	{/if}
	<Button type="submit" disabled={submitting} style="margin: 32px 0 0 0">Продолжить</Button>
</form>
