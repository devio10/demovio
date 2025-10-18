<script>
	import { enhance } from "$app/forms";
	import Button from "$lib/Button.svelte";
	import TextInput from "$lib/TextInput.svelte";
	import { scale } from "svelte/transition";
	import { RegisterStage } from "./stages";

	let {
		formError = $bindable(),
		submitting = $bindable(),
		page = $bindable(),
		playername = $bindable(),
	} = $props();
</script>

<form
	method="POST"
	action="/register?/checkNameAvailability"
	transition:scale={{ duration: 250, start: 0.95 }}
	use:enhance={() => {
		formError = undefined;
		submitting = true;
		return ({ update, result }) => {
			submitting = false;
			if (result.type === "success") {
				page = RegisterStage.createPassword;
			}
			update({ reset: false });
		};
	}}
>
	<TextInput
		oninput={() => (formError = undefined)}
		style="margin-bottom: 16px"
		placeholder="Имя игрока"
		name="playername"
		bind:value={playername}
		disabled={submitting}
	>
		<svg
			style="padding: 4px;"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 16.7969 17.5684"
		>
			<path
				d="M1.66992 17.5586L14.7656 17.5586C15.8105 17.5586 16.4355 17.0703 16.4355 16.2598C16.4355 13.7402 13.2812 10.2637 8.21289 10.2637C3.1543 10.2637 0 13.7402 0 16.2598C0 17.0703 0.625 17.5586 1.66992 17.5586ZM8.22266 8.51562C10.3125 8.51562 12.1289 6.64062 12.1289 4.19922C12.1289 1.78711 10.3125 0 8.22266 0C6.13281 0 4.31641 1.82617 4.31641 4.21875C4.31641 6.64062 6.12305 8.51562 8.22266 8.51562Z"
				fill="currentColor"
			/>
		</svg>
	</TextInput>
	{#if formError?.username}
		<span>{formError.username}</span>
	{/if}
	<Button tag="a" href="/login" hollow={true} style="margin: auto 0 0 0">
		Войти в существующий аккаунт
	</Button>
	<Button type="submit" disabled={submitting} style="margin: 16px 0 0 0">Продолжить</Button>
</form>
