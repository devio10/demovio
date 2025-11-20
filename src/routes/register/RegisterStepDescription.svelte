<script lang="ts">
	import { RegisterStage } from "./stages";
	import SkinEditorPreview from "$lib/components/SkinEditorPreview.svelte";
	import IconBack from "$lib/components/icons/IconBack.svelte";

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
		<p class="state-description">
			{#if citizenship.shortCode === "SH"}
				В штате Шанхай возвышается несколько небоскрёбов, а между ними разъезжают трамваи. Вы можете
				рассчитывать на стартовый бонус в виде бесплатного жилья и 25 фасок (единиц валюты), а также
				комфортную инфраструктуру и благоприятные условия для бизнеса.
			{:else if citizenship.shortCode === "CD"}
				Штат Конкорд рекомендован для новых игроков, которые хотят начать с нуля или если им больше
				по душе ванильное выживание. В нём нет никаких правил и его граждане сами решают, каким
				должен быть штат.
			{:else if citizenship.shortCode === "NY"}
				Штат Нью Йорк подходит для тех, кто гонется за «Американской мечтой». Он основан на
				одноимённом реальном городе и лидирует в инновациях в сфере строительства и заводов.
			{:else if citizenship.shortCode === "OH"}
				Ну про этот штат я не знаю что написать...
			{:else if citizenship.shortCode === "CA"}
				Солнечная Калифорния! В этом штате находятся два уютных города и Мировой Суд, решающий все
				конфликты в игровом пространстве.
			{:else if citizenship.shortCode === "GE"}
				Территория самого большого штата, Джорджии, находится в лесу и имеет множество красивых
				пейзажей. Граждане могут рассчитывать на полную свободу при строительстве и отсутствие
				правил.
			{:else}
				Гражданство определённого штата может дать вам разные преимущества. В будущем его можно
				поменять.
			{/if}
		</p>
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
		// align-items: flex-start;
		padding-right: 24px;
		align-items: center;
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
		.step {
			display: none;
		}
		.step-description {
			padding: 16px 0 0 0;
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
		.state-description {
			flex: 1;
		}
		.back-button {
			display: none;
			&.mobile {
				display: flex;
				margin-top: 8px;
				font-weight: bold;
			}
		}
	}
</style>
