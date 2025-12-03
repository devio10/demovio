<script>
	import Button from "$lib/components/Button.svelte";
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionButtonCheckmark from "$lib/components/OptionButtonCheckmark.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import WindowNavigationHeader from "$lib/Window/Navigation/WindowNavigationHeader.svelte";
	import WindowNavigationList from "$lib/Window/Navigation/WindowNavigationList.svelte";
	import Window from "$lib/Window/Window.svelte";
	import { downloadBuild } from "./data.remote";
	import { invalidate } from "$app/navigation";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import { saveAs } from "file-saver";
	import DownloadsDescription from "./DownloadsDescription.svelte";
	import { MediaQuery } from "svelte/reactivity";
	import WindowHeaderButton from "$lib/Window/WindowHeaderButton.svelte";
	import IconHelpCircle from "$lib/components/icons/IconHelpCircle.svelte";
	let { data } = $props();
	let isMobile = new MediaQuery("screen and (max-width: 768px)");

	let performance = $derived(data.profile?.lastDownloadedBuild?.optimized ?? false);
	let minimap = $derived(data.profile?.lastDownloadedBuild?.minimap ?? false);
	let loading = $state(false);
	let downloadFile = $state(`demovio-${data.latestBuild}-barebones.zip`);
	function generateDownloadLink() {
		let keyword = performance ? "optimized" : "barebones";
		keyword = minimap ? keyword + "-minimap" : keyword;
		downloadFile = `demovio-${data.latestBuild}-${keyword}.zip`;
	}
</script>

<Window>
	{#snippet navigation()}
		<WindowNavigation --width="50%">
			<WindowNavigationHeader
				title="Загрузка модов"
				style="flex-direction: row; justify-content: space-between;"
			>
				<WindowHeaderButton name="Помощь" tag="a" href="/help/choose-modpack">
					<IconHelpCircle />
				</WindowHeaderButton>
			</WindowNavigationHeader>
			<WindowNavigationList>
				{#if isMobile.current}
					<DownloadsDescription
						currentBuild={data.latestBuild}
						lastDownloadedBuild={data.profile?.lastDownloadedBuild}
					/>
				{/if}
				<div>
					<OptionButton>
						<div class="option-leftside">
							<img src="/mod_icons/barebones.png" class="mod-icon" alt="Иконка Barebones" />
							Основные моды (Barebones)
						</div>
						<OptionButtonCheckmark value={true} />
					</OptionButton>
					<OptionButton
						onclick={() => {
							performance = !performance;
							generateDownloadLink();
						}}
					>
						<div class="option-leftside">
							<img src="/mod_icons/sodium.webp" class="mod-icon" alt="Иконка Sodium" />
							Улучшение производительности
						</div>

						<OptionButtonCheckmark value={performance} />
					</OptionButton>
					<OptionButton
						onclick={() => {
							minimap = !minimap;
							generateDownloadLink();
						}}
					>
						<div class="option-leftside">
							<img src="/mod_icons/journeymap.webp" class="mod-icon" alt="Иконка JourneyMap" />
							Мини-карта (JourneyMap)
						</div>

						<OptionButtonCheckmark value={minimap} />
					</OptionButton>
					<!-- <OptionButton disabled>
					Визуальные улучшения
					<OptionButtonCheckmark value={false} />
				</OptionButton> -->
				</div>
			</WindowNavigationList>

			<div class="button">
				<Button
					onclick={async () => {
						loading = true;
						generateDownloadLink();
						if (data.profile) {
							await downloadBuild({
								version: data.latestBuild,
								optimized: performance,
								minimap: minimap,
							});
							await invalidate("app:user:profile");
						}
						saveAs(`https://demovio.love/res/${downloadFile}`, downloadFile);
						loading = false;
					}}
				>
					{#if loading}
						<LoadingWheel duration={0} --wheel-size="36px" />
					{:else}
						Скачать архив
					{/if}
				</Button>
			</div>
		</WindowNavigation>
	{/snippet}
	<DownloadsDescription
		currentBuild={data.latestBuild}
		lastDownloadedBuild={data.profile?.lastDownloadedBuild}
	/>
</Window>

<style lang="scss">
	.button {
		margin: auto 0 0 0;
		padding: 32px;
	}
	.option-leftside {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.mod-icon {
		width: 42px;
		height: 42px;
		image-rendering: crisp-edges;
	}

	@media screen and (max-width: 768px) {
		.button {
			margin-bottom: 80px;
			padding: 16px;
		}
	}
</style>
