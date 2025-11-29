<script lang="ts">
	import { RegisterStage } from "./stages";
	import SkinEditorPreview from "$lib/components/SkinEditorPreview.svelte";
	import IconBack from "$lib/components/icons/IconBack.svelte";
	import RegisterStateDescription from "./RegisterStateDescription.svelte";

	let {
		page = $bindable(),
		citizenship,
		haveLicense,
		skin,
		name,
		skinError = $bindable(),
	} = $props();
</script>

<div class="step-description">
	<span class="step">{page + 1}/{RegisterStage.leaveContact + 1}</span>
	{#if page > 0}
		<button class="back-button mobile" onclick={() => page--}>
			<div class="icon"><IconBack /></div>
			Назад
		</button>
	{/if}
	{#if page === RegisterStage.checkName}
		<h3>Введите имя игрока</h3>
		<p>Мы рассмотрим вашу заявку на вступление.</p>
	{:else if page === RegisterStage.createPassword}
		<h3>Придумайте пароль</h3>
		<p>
			Он будет использоваться на сайте. Для входа на сервер вам будет необходимо использовать другой
			пароль.
		</p>
	{:else if page === RegisterStage.checkForLicense}
		<h3>У вас лицензионный Minecraft?</h3>
		<p>Игроки без лицензионной игры тоже могут заходить на сервер.</p>
	{:else if page === RegisterStage.chooseSkin}
		<div class="skin-flex">
			<div>
				<h3>Выберите скин</h3>
				<p>
					Загрузите корректный файл скина в формате PNG.
					<br />
					{#if haveLicense}
						Вы можете пропустить этот этап, так как у вас есть лицензионная игра.
					{/if}
				</p>
			</div>

			<div class="skin-preview">
				<SkinEditorPreview {skin} bind:skinError name={haveLicense ? name : undefined} />
			</div>
		</div>
	{:else if page === RegisterStage.applyForCitizenship}
		<h3>Выберите гражданство</h3>
		<div class="state-description">
			<RegisterStateDescription {citizenship} />
		</div>
	{:else if page === RegisterStage.choosePronouns}
		<h3>Укажите ваши местоимения</h3>
		<p>Это необходимо для того, чтобы мы знали, как к вам обращаться.</p>
	{:else if page === RegisterStage.leaveContact}
		<h3>Укажите ваш Telegram</h3>
		<p>
			Рассмотрение заявки занимает до двух дней, после этого мы напишем вам и пригласим в общую
			беседу Demovio.
		</p>
	{/if}

	{#if page > 0}
		<button class="back-button" onclick={() => page--}>
			<div class="icon"><IconBack /></div>
			Назад
		</button>
	{/if}
</div>

<style lang="scss">
	.step-description {
		padding: 48px 0 48px 36px;
		display: flex;
		flex-direction: column;
		height: 100%;
		h3 {
			font-size: 24px;
			padding: 0 24px 0 0;
		}
		p {
			padding: 0 24px 0 0;
			margin: 0 0 24px 0;
			line-height: 1.5;
		}
	}
	.step {
		font-size: 96px;
		font-weight: bolder;
		color: rgba(230, 230, 230, 0.5);
	}
	.skin-flex {
		display: flex;
		justify-content: space-between;
	}
	.skin-preview {
		height: 180px;
		width: 120px;
		margin-right: 12px;
		// overflow: clip;
	}
	.back-button {
		background: none;
		cursor: pointer;
		font-size: 16px;
		border: none;
		color: white;
		padding: 0;
		margin-top: auto;
		width: fit-content;
		display: flex;
		align-items: center;
		gap: 4px;
		.icon {
			width: 16px;
			height: 16px;
			:global {
				svg {
					width: 100%;
					height: 100%;
				}
			}
		}
		&.mobile {
			display: none;
		}
	}
	@media screen and (max-width: 768px) {
		.state-description {
			display: none;
			flex: 1;
		}
		.step {
			display: none;
		}
		.step-description {
			padding: 0 0 0 0;
			margin: 0;
			h3 {
				margin-bottom: 16px;
			}
			p {
				margin: 0;
			}
			&.fullHeight {
				flex: 1;
			}
		}
		.back-button {
			display: none;
			&.mobile {
				display: flex;
				margin-top: 24px;
				font-weight: bold;
			}
		}
	}
</style>
