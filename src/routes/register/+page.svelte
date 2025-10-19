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
	import { enhance } from "$app/forms";
	import { demovioStates } from "$lib/components/demovio-states";
	import RegisterPronouns from "./RegisterPronouns.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import { scale } from "svelte/transition";
	let { data, form } = $props();
	let page = $state(0);
	let formError = $derived(form?.error);
	let submitting = $state(false);
	let haveLicense = $state(false);

	let citizenship = $state(demovioStates[0]);
	let password = $state();
	let playername = $state();
	let contact = $state();
	let skin = $state();
	let pronouns = $state();
	$inspect(password);
</script>

<Window>
	{#snippet navigation()}
		<WindowNavigation --width="50%">
			<div class="main-content">
				<h1 class="title">
					Регистрация
					<br />
					на Demovio
				</h1>
				<div class="steps">
					<!-- <svg
					class="logo"
					width="168"
					height="129"
					viewBox="0 0 168 129"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M7.42 103V28.8H42.506C50.7033 28.8 57.9113 30.3193 64.13 33.358C70.3487 36.3967 75.1893 40.672 78.652 46.184C82.1853 51.696 83.952 58.268 83.952 65.9C83.952 73.4613 82.1853 80.0333 78.652 85.616C75.1893 91.128 70.3487 95.4033 64.13 98.442C57.9113 101.481 50.7033 103 42.506 103H7.42ZM28.408 86.252H41.658C45.898 86.252 49.5727 85.4747 52.682 83.92C55.862 82.2947 58.3353 79.9627 60.102 76.924C61.8687 73.8147 62.752 70.14 62.752 65.9C62.752 61.5893 61.8687 57.9147 60.102 54.876C58.3353 51.8373 55.862 49.5407 52.682 47.986C49.5727 46.3607 45.898 45.548 41.658 45.548H28.408V86.252ZM119.904 103.954C113.12 103.954 107.184 102.682 102.096 100.138C97.0789 97.5233 93.1569 93.99 90.3302 89.538C87.5742 85.0153 86.1962 79.892 86.1962 74.168C86.1962 68.444 87.5389 63.356 90.2242 58.904C92.9802 54.3813 96.7609 50.8833 101.566 48.41C106.372 45.866 111.778 44.594 117.784 44.594C123.438 44.594 128.596 45.76 133.26 48.092C137.924 50.3533 141.634 53.71 144.39 58.162C147.146 62.614 148.524 68.02 148.524 74.38C148.524 75.0867 148.489 75.8993 148.418 76.818C148.348 77.7367 148.277 78.5847 148.206 79.362H102.732V68.762H137.5L129.868 71.73C129.939 69.1153 129.444 66.854 128.384 64.946C127.395 63.038 125.982 61.554 124.144 60.494C122.378 59.434 120.293 58.904 117.89 58.904C115.488 58.904 113.368 59.434 111.53 60.494C109.764 61.554 108.386 63.0733 107.396 65.052C106.407 66.96 105.912 69.2213 105.912 71.836V74.91C105.912 77.7367 106.478 80.1747 107.608 82.224C108.81 84.2733 110.506 85.8633 112.696 86.994C114.887 88.054 117.502 88.584 120.54 88.584C123.367 88.584 125.77 88.1953 127.748 87.418C129.798 86.57 131.812 85.298 133.79 83.602L144.39 94.626C141.634 97.6647 138.242 99.9967 134.214 101.622C130.186 103.177 125.416 103.954 119.904 103.954Z"
						fill="currentColor"
					/>
					<rect x="138" y="14" width="24" height="24" fill="currentColor" />
				</svg> -->
					{#if page === RegisterStage.checkName}
						<RegisterCheckUsername bind:formError bind:submitting bind:page bind:playername />
					{:else if page === RegisterStage.createPassword}
						<RegisterCreatePassword bind:formError bind:submitting bind:page bind:password />
					{:else if page === RegisterStage.checkForLicense}
						<RegisterCheckLicense bind:page bind:haveLicense />
					{:else if page === RegisterStage.chooseSkin}
						<RegisterSkin bind:page bind:skin />
					{:else if page === RegisterStage.applyForCitizenship}
						<RegisterCitizenship bind:page bind:citizenship />
					{:else if page === RegisterStage.choosePronouns}
						<RegisterPronouns bind:page bind:pronouns />
					{:else if page === RegisterStage.leaveContact}
						<form
							method="POST"
							action="/register?/finishRegistration"
							transition:scale={{ duration: 250, start: 0.95 }}
							use:enhance={() => {
								formError = undefined;
								submitting = true;
								console.log(password);
								return ({ update, result }) => {
									submitting = false;
									if (result.type === "success") {
										console.log("Ура");
									}
									update();
								};
							}}
						>
							<input type="hidden" name="playername" value={playername} />
							<input type="hidden" name="password" value={password} />
							<input type="hidden" name="skin" value={skin} />
							<input type="hidden" name="haveLicense" value={haveLicense} />
							<input type="hidden" name="citizenship" value={citizenship.shortCode} />
							<input type="hidden" name="pronouns" value={pronouns} />
							<TextInput placeholder="Юзернейм Telegram" name="contact" bind:value={contact}>
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
							<Button type="submit" style="margin: auto 0 0 0">Завершить</Button>
						</form>
					{/if}
				</div>
			</div>
		</WindowNavigation>
	{/snippet}
	<div class="step-description">
		<span class="step">{page + 1}/{RegisterStage.leaveContact + 1}</span>
		{#if page === RegisterStage.checkName}
			<h3>Введите имя игрока</h3>
			<p>Мы рассмотрим вашу заявку на вступление.</p>
		{:else if page === RegisterStage.createPassword}
			<h3>Придумайте пароль</h3>
			<p>
				Он будет использоваться на сайте. Для входа на сервер вам будет необходимо использовать
				другой пароль.
			</p>
		{:else if page === RegisterStage.checkForLicense}
			<h3>У вас лицензионный Minecraft?</h3>
			<p>Игроки без лицензионной игры тоже могут заходить на сервер.</p>
		{:else if page === RegisterStage.chooseSkin}
			<h3>Выберите скин</h3>
			<p>
				Загрузите свой файл или введите имя игрока, скин которого хотите использовать. Доступные
				варианты есть на сайте <a href="https://skinmc.netskinmc.net">skinmc.net</a>
				.
				<br />
				{#if haveLicense}
					Вы можете пропустить этот этап, так как у вас есть лицензионная игра.
				{/if}
			</p>
		{:else if page === RegisterStage.applyForCitizenship}
			<h3>Выберите гражданство</h3>
			<p>
				{#if citizenship.shortCode === "SH"}
					В штате Шанхай возвышается несколько небоскрёбов, а между ними разъезжают трамваи. Вы
					можете рассчитывать на стартовый бонус в виде бесплатного жилья и 25 фасок (единиц
					валюты), а также комфортную инфраструктуру и благоприятные условия для бизнеса.
				{:else if citizenship.shortCode === "CD"}
					Штат Конкорд рекомендован для новых игроков, которые хотят начать с нуля или если им
					больше по душе ванильное выживание. В нём нет никаких правил и его граждане сами решают,
					каким должен быть штат.
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
	</div>
</Window>

<style lang="scss">
	.logo {
		color: rgba(230, 230, 230, 0.5);
		margin: 0 0 24px 0;
	}
	.main-content {
		width: calc(100% - 48px);
		display: flex;
		flex-direction: column;
		// justify-content: center;
		// align-items: left;
		height: 100%;
		margin: 0 auto;
		max-width: 400px;
		// max-width: 400px;
		// margin: 24px;

		.steps {
			margin-top: 24px;
			display: flex;
			flex-direction: column;
			flex: 1;
			position: relative;
			:global {
				form,
				.register-page {
					width: 100%;
					height: 100%;
					position: absolute;
					display: flex;
					flex-direction: column;
					flex: 1;
					padding-bottom: 32px;
				}
			}
		}
	}
	.title {
		font-size: 48px;
		margin: 48px 0 0 0;
		color: rgba(230, 230, 230, 0.5) !important;
	}
	.step-description {
		padding: 48px 36px;
		h3 {
			font-size: 24px;
		}
		p {
			line-height: 1.5;
		}
	}
	.step {
		font-size: 96px;
		font-weight: bolder;
		color: rgba(230, 230, 230, 0.5);
	}
</style>
