<script>
	import Button from "$lib/components/Button.svelte";
	import IconRight from "$lib/components/icons/IconRight.svelte";
	import OptionButton from "$lib/components/OptionButton.svelte";
	import OptionButtonCheckmark from "$lib/components/OptionButtonCheckmark.svelte";
	import WindowNavigation from "$lib/Window/Navigation/WindowNavigation.svelte";
	import WindowNavigationHeader from "$lib/Window/Navigation/WindowNavigationHeader.svelte";
	import WindowNavigationList from "$lib/Window/Navigation/WindowNavigationList.svelte";
	import Window from "$lib/Window/Window.svelte";
	import { slide } from "svelte/transition";
	import { downloadBuild } from "./data.remote";
	import { invalidate } from "$app/navigation";
	import LoadingWheel from "$lib/components/LoadingWheel.svelte";
	import { saveAs } from "file-saver";
	let { data } = $props();

	let performance = $derived(data.profile?.lastDownloadedBuild?.optimized);
	let minimap = $derived(data.profile?.lastDownloadedBuild?.minimap);
	let openedModsList = $state(false);
	let loading = $state(false);
	let downloadLink = $state("https://demovio.love/src/demovio-2.6.0-barebones.zip");
	function generateDownloadLink() {
		let keyword = performance ? "optimized" : "barebones";
		keyword = minimap ? keyword + "-minimap" : keyword;
		downloadLink = `https://demovio.love/src/demovio-2.6.0-${keyword}.zip`;
	}
</script>

<Window>
	{#snippet navigation()}
		<WindowNavigation --width="50%">
			<WindowNavigationHeader title="Загрузка модов" />
			<WindowNavigationList>
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
			</WindowNavigationList>
			<div class="button">
				<Button
					onclick={async () => {
						loading = true;
						if (data.profile) {
							await downloadBuild({ version: "2.6.0", optimized: performance, minimap: minimap });
							await invalidate("app:user:profile");
						}
						saveAs(downloadLink);
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
	<div class="about">
		<div class="about-content">
			<h2>Demovio 2.6.0</h2>
			{#if data.profile?.lastDownloadedBuild}
				<p>Ваша версия: {data.profile?.lastDownloadedBuild.version}</p>
			{/if}
			<button
				onclick={(openedModsList = !openedModsList)}
				class={[{ active: openedModsList }, "list-button"]}
			>
				Полный список модов <div class="icon">
					<IconRight />
				</div>
			</button>
			{#if openedModsList}
				<div class="mods-list" transition:slide={{ duration: 500 }}>
					<span>Barebones:</span>
					<ul>
						<li>
							Create 6.0.8.0: <a href="https://modrinth.com/mod/create-fabric">Modrinth</a>
						</li>
						<li>
							Create Numismatics 1.0.15: <a href="https://modrinth.com/mod/numismatics">Modrinth</a>
						</li>
						<li>
							Create Steam 'n' Rails 1.6.14: <a
								href="https://modrinth.com/mod/create-steam-n-rails"
							>
								Modrinth
							</a>
						</li>
						<li>
							Amendments 1.20-2.2.3: <a href="https://modrinth.com/mod/amendments">Modrinth</a>
						</li>
						<li>
							Supplementaries 1.20-3.1.41: <a href="https://modrinth.com/mod/supplementaries">
								Modrinth
							</a>
						</li>
						<li>
							Fabric Seasons 2.4.2: <a href="https://modrinth.com/mod/fabric-seasons">Modrinth</a>
						</li>
						<li>
							Fabric Seasons Extras 1.3.2: <a href="https://modrinth.com/mod/fabric-seasons-extras">
								Modrinth
							</a>
						</li>
						<li>
							Fabric Seasons Delight Compat 1.0: <a
								href="https://modrinth.com/mod/fabric-seasons-delight-compat"
							>
								Modrinth
							</a>
						</li>
						<li>
							Farmer's Delight 2.4.1: <a
								href="https://modrinth.com/mod/farmers-delight-refabricated"
							>
								Modrinth
							</a>
						</li>
						<li>
							Mod Menu 7.2.2: <a href="https://modrinth.com/mod/modmenu">Modrinth</a>
						</li>
					</ul>
					<span>+ Оптимизация:</span>
					<ul>
						<li>
							Sodium 0.5.13: <a href="https://modrinth.com/mod/sodium">Modrinth</a>
						</li>
						<li>
							Sodium Extra 0.5.9: <a href="https://modrinth.com/mod/sodium-extra">Modrinth</a>
						</li>
						<li>
							Indium 1.0.36: <a href="https://modrinth.com/mod/sodium-extra">Modrinth</a>
						</li>
						<li>
							Lithium 0.11.3: <a href="https://modrinth.com/mod/sodium-extra">Modrinth</a>
						</li>
						<li>
							Iris Shaders 1.7.6: <a href="https://modrinth.com/mod/sodium-extra">Modrinth</a>
						</li>
						<li>
							More Culling 0.24.0: <a href="https://modrinth.com/mod/sodium-extra">Modrinth</a>
						</li>
						<li>
							c2me 0.2.0: <a href="https://modrinth.com/mod/sodium-extra">Modrinth</a>
						</li>
						<li>
							Entity Culling 1.9.3: <a href="https://modrinth.com/mod/sodium-extra">Modrinth</a>
						</li>
						<li>
							Entity Model Features 3.0.1: <a href="https://modrinth.com/mod/sodium-extra">
								Modrinth
							</a>
						</li>
						<li>
							Entity Texture Features 7.0.2: <a href="https://modrinth.com/mod/sodium-extra">
								Modrinth
							</a>
						</li>
						<li>
							Model Gap Fix 1.15: <a href="https://modrinth.com/mod/sodium-extra">Modrinth</a>
						</li>
					</ul>
					<span>+ Мини-карта:</span>
					<ul>
						<li>
							JourneyMap 5.10.3: <a href="https://modrinth.com/mod/journeymap">Modrinth</a>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
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
	.about {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: auto;
		.about-content {
			padding: 16px 0;
			width: 100%;
			height: fit-content;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		h2 {
			color: rgba(230, 230, 230, 0.75);
			font-size: 48px;
			margin: 0;
		}
	}
	.list-button {
		border: none;
		background: none;
		font-size: 14px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 6px 12px;
		gap: 10px;
		font-weight: bold;
		color: white;
		&:hover {
			text-decoration: underline;
		}
		.icon {
			width: 12px;
			height: 12px;
			// margin: 2px 0 0 0;
			transition: 0.3s transform;
			transform-origin: center;
			display: flex;
			align-items: center;
			justify-content: center;
			:global {
				svg {
					width: 100%;
					height: 100%;
				}
			}
		}
		&.active {
			.icon {
				transform: rotate(90deg);
			}
		}
	}
	.mods-list {
		span {
			font-weight: bold;
		}
		li {
			a {
				color: rgba(230, 230, 230, 0.85);
			}
		}
	}
</style>
