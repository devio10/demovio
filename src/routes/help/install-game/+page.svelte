<script>
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionButtonCheckmark from "$lib/components/OptionButtonCheckmark.svelte";
	import HelpImage from "../HelpImage.svelte";
	import HelpWarn from "../HelpWarn.svelte";
	let { data } = $props();

	let haveLicense = $derived(data.profile?.haveLicense);
</script>

<div>
	<OptionButton
		onclick={() => {
			haveLicense = true;
		}}
	>
		Инструкция для официального лаунчера <OptionButtonCheckmark value={haveLicense} />
	</OptionButton>
	<OptionButton
		onclick={() => {
			haveLicense = false;
		}}
	>
		Инструкция для прочих лаунчеров <OptionButtonCheckmark value={!haveLicense} />
	</OptionButton>
</div>

<HelpWarn>
	<b>Важно:</b>
	{#if haveLicense}
		Вы смотрите инструкцию для лицензионных игроков, у которых стоит официальный лаунчер Minecraft.
		Если вы пользуетесь другими лаунчерами, такими как TLauncher, Legacy Launcher или Modrinth App,
		выберите инструкцию для прочих лаунчеров.
	{:else}
		Вы смотрите инструкцию для игроков, у которых стоит сторонний лаунчер Minecraft. Если вы
		пользуетесь официальным лаунчером, скачанным с сайта
		<a href="https://minecraft.net">minecraft.net,</a>
		выберите инструкцию для официального лаунчера.
	{/if}
</HelpWarn>
{#if haveLicense}
	<p>
		Для начала вам будет необходимо скачать и установить Fabric – загрузчик, позволяющий
		модифицировать игру с помощью модов. Скачать его можно по этой ссылке:
		<a href="https://fabricmc.net/use/installer/">fabricmc.net/use/installer/</a>
	</p>
	<HelpImage src="/Help/fabric_page.png" alt="Изображение страницы скачивания установщика Fabric" />
	<p>
		Если у вас операционная система Windows, то на странице скачивания воспользуйтесь кнопкой
		«Download for Windows». Если у вас иная операционная система, то нажмите на ссылку «Download
		universal jar».
	</p>
	<p>
		Откройте скачанный файл – у вас откроется установщик Fabric. В поле «Minecraft Version» выберите
		версию <b>1.20.1:</b>
		остальные поля оставьте нетронутыми.
	</p>
	<HelpWarn>
		<b>Важно:</b>
		Если вы меняли путь, в котором находится игра, вам нужно будет указать его в поле «Launcher Location».
	</HelpWarn>
	<HelpImage src="/Help/fabric_installer.png" alt="Изображение установщика Fabric" />
	<p>
		Нажмите на кнопку Install и подождите, пока установится загрузчик модов. Как только процесс
		будет завершён, откройте свой лаунчер игры.
	</p>
	<HelpImage src="/Help/launcher.png" alt="Изображение официального лаунчера Minecraft" />
	<p>
		Выберите появившуюся в списке версию, название которой начинается на «fabric-loader» и запустите
		игру. Это займёт некоторое время, так как лаунчеру необходимо скачать необходимые для запуска
		файлы.
	</p>
{:else}
	<p>
		Сторонние лаунчеры, такие как Modrinth Launcher, Legacy Launcher и TLauncher обычно предлагают
		упрощённую установку Fabric – загрузчика, позволяющего модифицировать игру с помощью модов.
		Найдите Fabric 1.20.1 в списке доступных версий для установки.
	</p>
	<HelpImage src="/Help/legacy.png" alt="Изображение Legacy Launcher" />
	<HelpWarn>
		Если вы не можете найти Fabric 1.20.1 в списке версий, попробуйте включить отображение
		модифицированных версий игры в настройках лаунчера. В крайнем случае воспользуйтесь инструкцией
		по установке игры для официального лаунчера.
	</HelpWarn>
	<p>
		Запустите найденную версию. Это займёт некоторое время, так как лаунчеру необходимо скачать
		необходимые для запуска файлы.
	</p>
{/if}
<HelpImage src="/Help/game.png" alt="Изображение запущенной игры Minecraft" />
<p>
	<b>
		Поздравляем, вы запустили игру! Но на этом ещё не всё: вам необходимо установить моды. Для этого
		перейдите к следующей секции.
	</b>
</p>
