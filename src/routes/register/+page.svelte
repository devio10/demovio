<script lang="ts">
	import Window from "$lib/Window/Window.svelte";
	import RegisterCheckLicense from "./RegisterCheckLicense.svelte";
	import RegisterCheckUsername from "./RegisterCheckUsername.svelte";
	import RegisterCitizenship from "./RegisterCitizenship.svelte";
	import RegisterCreatePassword from "./RegisterCreatePassword.svelte";
	import { RegisterStage } from "./stages";
	import RegisterSkin from "./RegisterSkin.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import Button from "$lib/components/Button.svelte";
	import { demovioStates } from "$lib/components/demovio-states";
	import RegisterPronouns from "./RegisterPronouns.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import RegisterStepDescription from "./RegisterStepDescription.svelte";
	import Dialog from "$lib/components/Dialog.svelte";
	import IconExclamationMark from "$lib/components/icons/IconExclamationMark.svelte";
	import DialogButton from "$lib/components/DialogButton.svelte";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import { finishRegistration } from "./register.remote";
	import RegisterFormError from "./RegisterFormError.svelte";
	let { form } = $props();
	let page = $state(RegisterStage.applyForCitizenship);
	let formError: any = $derived(form?.error);
	$inspect(formError);
	let submitting = $state(false);
	let haveLicense = $state(false);

	let citizenship = $state(demovioStates[0]);
	let password = $state();
	let playername = $state();
	let skin: File | undefined = $state();
	let skinName: string | undefined = $state();
	let skinError = $state(undefined);
	let pronouns = $state();
	$inspect(skinName);
	$effect(() => {
		if (skin) {
			finishRegistration.fields.skin.set(skin);
		}
	});
</script>

<Window>
	{#snippet navigation()}
		<WindowNavigation --width="50%">
			<div class="scrollable">
				<div class="main-content">
					<div class="title-block">
						<h1 class="title">
							Регистрация
							<br />
							на Demovio
						</h1>
						<span class="mobile-step">{page + 1}/{RegisterStage.leaveContact + 1}</span>
					</div>
					<div class="register-content">
						<div class="mobile-description">
							<RegisterStepDescription
								bind:page
								{citizenship}
								{haveLicense}
								{skin}
								name={playername}
								bind:skinError
							/>
						</div>

						<div class="steps">
							{#if page === RegisterStage.checkName}
								<RegisterCheckUsername bind:formError bind:submitting bind:page bind:playername />
							{:else if page === RegisterStage.createPassword}
								<RegisterCreatePassword bind:formError bind:submitting bind:page bind:password />
							{:else if page === RegisterStage.checkForLicense}
								<RegisterCheckLicense bind:page bind:haveLicense />
							{:else if page === RegisterStage.chooseSkin}
								<RegisterSkin
									bind:page
									bind:skin
									bind:skinError
									bind:skinName
									{haveLicense}
									{playername}
								/>
							{:else if page === RegisterStage.applyForCitizenship}
								<RegisterCitizenship bind:page bind:citizenship />
							{:else if page === RegisterStage.choosePronouns}
								<RegisterPronouns bind:formError bind:page bind:pronouns bind:submitting />
							{:else if page === RegisterStage.leaveContact}
								<form
									{...finishRegistration.enhance(async ({ submit, data }) => {
										formError = undefined;
										submitting = true;
										finishRegistration.fields.allIssues();
										try {
											console.log(data.haveLicense);
											await submit();
											submitting = false;
											formError = finishRegistration.fields.contact.issues();
										} catch (e) {
											console.error(e);
											formError = e;
										}
									})}
									enctype="multipart/form-data"
									class="register-page"
								>
									<div style="display: none;">
										{#if pronouns}
											<input {...finishRegistration.fields.pronouns.as("text")} value={pronouns} />
										{/if}
										<input {...finishRegistration.fields.name.as("text")} value={playername} />
										<input {...finishRegistration.fields.password.as("text")} value={password} />
										{#if haveLicense}
											<input
												{...finishRegistration.fields.haveLicense.as("checkbox")}
												value={true}
											/>
										{/if}
										<input
											{...finishRegistration.fields.citizenship.as("text")}
											value={citizenship.shortCode}
										/>
										{#if skin}
											<input {...finishRegistration.fields.skin.as("file")} />
										{/if}
										{#if skinName}
											<input {...finishRegistration.fields.skinName.as("text")} value={skinName} />
										{/if}
									</div>

									<TextInput
										placeholder="Юзернейм Telegram"
										style="margin-bottom: 16px"
										{...finishRegistration.fields.contact.as("text")}
									>
										<svg
											version="1.1"
											style="padding: 2px 0"
											xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink"
											viewBox="0 0 20.6152 21.5918"
										>
											<path
												d="M0 11.25C0 17.6855 4.35547 21.5918 10.3516 21.5918C11.9727 21.5918 13.5156 21.3672 14.4727 21.0547C15.1465 20.8398 15.3613 20.4883 15.3613 20.127C15.3613 19.7656 15.0781 19.4922 14.7168 19.4922C14.5996 19.4922 14.4434 19.5117 14.2578 19.5605C13.0664 19.8535 12.041 20.0488 10.6641 20.0488C5.32227 20.0488 1.67969 16.8262 1.67969 11.3086C1.67969 6.02539 5.11719 2.34375 10.293 2.34375C14.873 2.34375 18.7012 5.16602 18.7012 10.2344C18.7012 13.1934 17.7051 15.1855 16.0938 15.1855C15.0195 15.1855 14.4141 14.5605 14.4141 13.4961L14.4141 6.875C14.4141 6.34766 14.1211 6.02539 13.623 6.02539C13.1348 6.02539 12.832 6.34766 12.832 6.875L12.832 7.98828L12.7441 7.98828C12.2461 6.78711 11.0254 6.02539 9.57031 6.02539C7.04102 6.02539 5.26367 8.18359 5.26367 11.2793C5.26367 14.4043 7.03125 16.582 9.60938 16.582C11.123 16.582 12.2949 15.7617 12.8613 14.375L12.9492 14.375C13.1348 15.752 14.2969 16.5918 15.8398 16.5918C18.5645 16.5918 20.2539 13.916 20.2539 10.166C20.2539 4.49219 16.084 0.810547 10.3125 0.810547C4.24805 0.810547 0 4.96094 0 11.25ZM9.87305 15.0391C8.125 15.0391 7.01172 13.584 7.01172 11.2695C7.01172 8.99414 8.13477 7.53906 9.88281 7.53906C11.6797 7.53906 12.8125 8.96484 12.8125 11.2305C12.8125 13.5449 11.6504 15.0391 9.87305 15.0391Z"
												fill="currentColor"
											/>
										</svg>
									</TextInput>
									{#if Array.isArray(formError)}
										<RegisterFormError>{formError[0]?.message}</RegisterFormError>
									{/if}
									<Button type="submit" style="margin: auto 0 0 0">
										{#if submitting}
											<LoadingWheel duration={0} --wheel-size="36px" />
										{:else}
											Завершить
										{/if}
									</Button>
								</form>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</WindowNavigation>
	{/snippet}
	<RegisterStepDescription
		bind:page
		{citizenship}
		{haveLicense}
		{skin}
		name={playername}
		bind:skinError
	/>
</Window>

{#if formError !== undefined && "finalError" in formError}
	<Dialog
		opened={"finalError" in formError}
		color="var(--red)"
		title="Произошла Ошибка При Регистрации"
		description="Код ошибки: {formError.finalError}"
	>
		{#snippet icon()}
			<div style="padding: 6px"><IconExclamationMark /></div>
		{/snippet}
		<DialogButton
			onclick={() => {
				formError = undefined;
			}}
		>
			Закрыть
		</DialogButton>
	</Dialog>
{/if}

<style lang="scss">
	.scrollable {
		overflow-y: auto;
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}
	.main-content {
		width: calc(100% - 48px);
		display: flex;
		flex-direction: column;
		min-height: 100%;
		margin: 0 auto 0 auto;
		max-width: 400px;
		flex-shrink: 0;
		.steps {
			margin-top: 24px;
			display: flex;
			flex-direction: column;
			flex: 1;
			position: relative;
			flex-shrink: 0;
		}
		.register-content {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			flex-shrink: 0;
		}
	}
	.title {
		font-size: 48px;
		margin: 48px 0 0 0;
		color: rgba(230, 230, 230, 0.5) !important;
	}
	.mobile-description,
	.mobile-step {
		display: none;
	}
	.register-page {
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		flex-direction: column;
		padding-bottom: 32px;
		flex-shrink: 0;
		min-height: fit-content;
	}
	:global {
		.lower-button {
			margin: 16px 0 0 0;
		}
	}

	@media screen and (max-width: 768px) {
		.register-page {
			padding-bottom: 92px;
		}
		.title {
			font-size: 28px;
			margin: 0;
		}
		.mobile-description {
			display: block;
		}
		.title-block {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 24px;
		}
		.mobile-step {
			display: block;
			font-size: 48px;
			font-weight: bolder;
			color: rgba(230, 230, 230, 0.5);
		}
		.main-content {
			.steps {
				margin-top: 16px;
			}
		}
		:global {
			.mobile-scrollable {
				max-height: 100%;
				overflow-y: auto;
				flex: 1;
				scrollbar-width: thin;
				// padding-top: 16px;
				scrollbar-base-color: rgba(0, 0, 0, 0);
				mask: linear-gradient(to top, transparent 0%, transparent 12px, black 24px);
				mask-size: cover;
				mask-repeat: no-repeat;
				list-style: none;
			}
			.lower-button {
				margin: 8px 0 0 0;
			}
		}
	}
</style>
