<script lang="ts">
	import type { Profile } from "../routes/profile/+layout.serverer";
	import PassportStamp from "./PassportStamps/PassportStamp.svelte";
	import StampCalifornia from "./PassportStamps/StampCalifornia.svelte";
	import StampConcord from "./PassportStamps/StampConcord.svelte";
	import StampGeorgia from "./PassportStamps/StampGeorgia.svelte";
	import StampNewYork from "./PassportStamps/StampNewYork.svelte";
	import StampOhio from "./PassportStamps/StampOhio.svelte";
	import StampShanghai from "./PassportStamps/StampShanghai.svelte";

	function nameCode(length: number, symbol: string, input: string) {
		return input.length >= length ? input.slice(0, length) : input.padEnd(length, symbol);
	}

	type Citizenship = Profile["citizenship"];
	type Language = "chinese" | "russian";

	let { profile }: { profile: Profile } = $props();
	const languages = {
		chinese: {
			citizenshipPage: {
				code: "国籍 / Citizenship",
				date: "接受日期 / Date of acceptance",
				address: "居住地址 / Residential address",
				protocol: "协议 / Protocol",
			},
			personalDetails: {
				name: "玩家姓名 / Player name",
				contact: "联系方式 / Contact",
				issueDate: "签发日期 / Date of issue",
				pronouns: "代词 / Pronouns",
			},
		},
		russian: {
			citizenshipPage: {
				code: "Гражданство / Citizenship",
				date: "Дата принятия / Date of acceptance",
				address: "Адрес проживания / Residential address",
				protocol: "Протокол / Protocol",
			},
			personalDetails: {
				name: "Игровой ник / Player name",
				contact: "Связь / Contact",
				issueDate: "Дата выдачи / Date of issue",
				pronouns: "Местоимения / Pronouns",
			},
		},
	} as const;
	const states: Record<
		Profile["citizenship"]["code"],
		{
			language: (typeof languages)[Language];
			name: string;
			altName: string;
		}
	> = {
		SH: {
			language: languages.chinese,
			name: "上海 / Шанхай / Shanghai",
			altName: "SHANGHAI",
		},
		CA: {
			language: languages.russian,
			name: "Калифорния / California",
			altName: "CALIFORN",
		},
		NY: {
			language: languages.russian,
			name: "Нью Йорк / New York",
			altName: ">NEWYORK",
		},
		CD: {
			language: languages.russian,
			name: "Конкорд / Concord",
			altName: ">CONCORD",
		},
		OH: {
			language: languages.russian,
			name: "Огайо / Ohio",
			altName: ">OHIO>>>",
		},
		GE: {
			language: languages.russian,
			name: "Джорджия / Georgia",
			altName: "GEORGIA>",
		},
	};
	const state = $derived(states[profile.citizenship.code]);
</script>

<div class="passport">
	<div class="residentship">
		<div class="actual_content">
			<div class="clip">
				<div class="country_color {profile.citizenship.code}"></div>
				<div class="grid">
					<div>
						{#each Object.entries(state?.language.citizenshipPage) as [key, translation]}
							{@const citizenship = profile.citizenship}
							{@const citizenshipProperty = key as keyof Citizenship}
							{@const value = citizenship[citizenshipProperty]}
							<section>
								<span>{translation}</span>
								<p>
									{#if citizenshipProperty === "code"}
										{@const stateCode = value as Citizenship["code"]}
										{states[stateCode].name}
									{:else}
										{value}
									{/if}
								</p>
							</section>
						{/each}
					</div>
					<div class="logo"></div>
				</div>

				<PassportStamp>
					{#if profile.citizenship.code === "SH"}
						<StampShanghai />
					{:else if profile.citizenship.code === "NY"}
						<StampNewYork />
					{:else if profile.citizenship.code === "GE"}
						<StampGeorgia />
					{:else if profile.citizenship.code === "CA"}
						<StampCalifornia />
					{:else if profile.citizenship.code === "OH"}
						<StampOhio />
					{:else if profile.citizenship.code === "CD"}
						<StampConcord />
					{/if}
				</PassportStamp>

				<span class="watermark first">DEMOVIO</span>
				<span class="watermark second">DEMOVIO</span>
			</div>
		</div>
		<div class="cover">
			<div class="cover-content">
				<h2>PASSPORT</h2>
				<img src="/de_passport.svg" />
				<span>
					United States
					<br />
					of Demovio
				</span>
			</div>
		</div>
	</div>
	<div class="personal">
		<div class="avatars">
			<div class="avatar_container">
				<img class="avatar" src="https://mc-heads.net/avatar/MHF_Steve/96.png" />
			</div>
			<img class="avatar holo" src="https://mc-heads.net/avatar/MHF_Steve/32.png" />
		</div>
		<div class="information-block">
			{#each Object.entries(state?.language.personalDetails) as [key, value]}
				<section>
					<span>{value}</span>
					<p>{profile[key as keyof Profile]}</p>
				</section>
			{/each}
			<span class="watermark third">DE:</span>
		</div>
		<div class="technical-information">
			<span>
				DE**{state.altName}**3**{nameCode(7, "*", profile.name.toUpperCase())}*********{nameCode(
					3,
					"*",
					profile.id.toString(),
				)}*
				<br />
				*{profile.uuid}*{nameCode(3, "*", profile.name.toUpperCase())}
			</span>
		</div>
	</div>
</div>

<style lang="scss">
	$noise: url("$lib/assets/noise.svg");
	p {
		margin: 0;
	}
	.passport {
		width: 410px;
		aspect-ratio: 1.5 / 2.05;

		display: grid;
		grid-template-rows: 1fr 1fr;
		margin-bottom: 48px;
		color: rgba(0, 0, 0, 0.9);
		transition: 0.5s ease-in-out transform;

		perspective: 1000px;
		padding: 0;

		--radius: 24px;
		hr {
			border: 1px solid rgba(0, 0, 0, 0.2);
			margin: 0 16px;
		}
		&:not(:hover) {
			transform: translateY(-25%);
		}
		&:hover .residentship {
			transform: rotateX(0) scaleY(1);
		}
		.residentship {
			transform-origin: bottom;
			background: linear-gradient(to bottom, #ffedd5ce, #bca7872a), $noise, #ceb18c;
			z-index: 2;

			transform-style: preserve-3d;
			transform: rotateX(-180deg) scaleY(1);
			transition: 0.5s all ease-in-out;

			border-radius: var(--radius) var(--radius) 0 0;

			.grid {
				display: flex;
				justify-content: space-between;
				padding: 0 24px;
			}
			section {
				color: rgba(0, 0, 0, 0.9);
				padding: 6px 0;
			}
			.logo {
				img {
					width: 128px;
					aspect-ratio: 1/1;
					padding: 0 16px;
					opacity: 0.9;
					font-weight: 965;
					flex-shrink: 0;
					fill: var(--color);
					background-color: var(--bg);
					border: 2px solid var(--bg);
					&.OH {
						--color: #1a2e05;
						--bg: #36531409;
					}
					&.SH {
						--color: #450a0a;
						--bg: #450a0a09;
						fill: none;
						stroke: var(--color);
					}
					&.NY {
						--color: #172554;
						--bg: #17255409;
					}
					&.CA {
						--color: rgb(145, 70, 33);
						--bg: #42200609;
					}
					&.GE {
						--color: #431407;
						--bg: #43140709;
					}
					&.CD {
						--color: #390866;
						--bg: #1d074309;
					}
				}
			}
		}
		.personal {
			display: grid;
			grid-template-columns: auto 1fr;
			background: linear-gradient(to bottom, #ffeed78b, #e4d1b72f), $noise, #d2b690;
			z-index: 0;
			border-radius: 0 0 var(--radius) var(--radius);
			overflow: clip;
			border-top: 2px solid rgba(0, 0, 0, 0.1);
			box-shadow: 0px 0 30px 0px rgba(0, 0, 0, 0.6);
			section {
				color: black;
			}
			.avatar_container {
				background: linear-gradient(
					45deg,
					rgba(136, 84, 204, 0.15) 0%,
					rgba(243, 55, 171, 0.1) 100%
				);
				padding: 20px 8px;
				border: 1px solid rgba(136, 84, 204, 0.15);
				border-radius: 6px;
				margin: 24px 0 0 16px;
				height: min-content;
			}
		}
		section {
			span {
				color: inherit;
				font-size: 12px;
				opacity: 0.5;
				display: block;
			}
			p {
				color: black;
				font-size: 18px;
				font-weight: 500;
			}
		}
		.information-block {
			padding: 24px 8px 0 16px;
			display: flex;
			flex-direction: column;
			gap: 8px;
			span:not(.watermark) {
				color: black;
			}
		}
	}
	.country_color {
		height: 16px;
		width: 100%;
		background-color: var(--color);
		opacity: 0.5;
		margin-bottom: 16px;
		&.OH {
			--color: #64a30d;
		}
		&.SH {
			--color: #e11d48;
		}
		&.NY {
			--color: #1f6cf2;
			opacity: 1;
		}
		&.CA {
			--color: #facc15;
		}
		&.GE {
			--color: #f97316;
		}
		&.CD {
			--color: black;
			opacity: 0.9;
			background: linear-gradient(90deg, rgba(154, 22, 249, 1) 30%, rgba(255, 233, 38, 1) 70%);
			border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		}
	}

	.actual_content,
	.cover {
		width: 100%;
		height: 100%;
		position: absolute;
		backface-visibility: hidden;
		border-radius: var(--radius) var(--radius) 0 0;
	}

	.actual_content {
		.clip {
			overflow: clip;
			width: 100%;
			height: 100%;
			border-radius: var(--radius) var(--radius) 0 0;
		}
	}
	.cover {
		background: linear-gradient(to bottom, #082f49cc, #05283f90), $noise, #082f49;
		transform: rotateY(180deg);
		border: 2px solid rgba(0, 0, 0, 0.2);
		z-index: 3;
		.cover-content {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			width: 100%;
			height: 100%;
			img {
				rotate: -90deg;
				transform-origin: center;
				position: absolute;
				left: 30%;
				width: 136px;
				aspect-ratio: 1 / 1;
			}
			h2,
			span {
				rotate: -90deg;
				transform-origin: center;
				/* color: #fddf47c2; */
				background: linear-gradient(to bottom, #cfc09f 27%, #ffecb3 40%, #e5d092b0 78%);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				font-family: "Times New Roman", Times, serif;
				font-size: 32px;
				position: absolute;
				margin: 0;
			}
			span {
				right: 32px;
				font-size: 24px !important;
				opacity: 1 !important;
				font-style: italic;
				text-align: center;
			}
		}
	}
	.avatars {
		display: contents;
		.avatar {
			--size: 72px;
			width: var(--size);
			height: var(--size);
			box-sizing: content-box;
			image-rendering: pixelated;
			image-rendering: crisp-edges;
			&.custom_skin {
				background-image: $noise;
				background-repeat: no-repeat;
				background-position: calc(var(--size) * -1) calc(var(--size) * -1);
				background-size: calc(var(--size) * 8) calc(var(--size) * 8);
			}
			&.holo {
				--size: 28px;
				padding: 0;
				border: none;
				position: absolute;
				filter: sepia(1);
				opacity: 0.15;
				right: 24px;
				margin-top: 24px;
				width: 32px;
				height: 32px;
			}
		}
	}

	.technical-information {
		background: linear-gradient(to bottom, #ffffffa1, #fdf3e583), $noise, #eedcc3;
		width: 100%;
		height: 100%;
		grid-column: 1 / 3;
		margin: 0;
		padding: 0 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0 0 var(--radius) var(--radius);
		span {
			color: rgba(0, 0, 0, 0.4);
			margin: 0;
			font-family: monospace;
			font-size: 16px;
			line-height: 1;
		}
	}
	.watermark {
		position: absolute;
		bottom: 8px;
		right: 2px;
		line-height: 0.8;
		font-size: 48px;
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: #4f46e5;
		color: rgba(0, 0, 0, 0.1);
		font-family: Georgia, "Times New Roman", Times, serif;
		font-style: italic;
		opacity: 0.1;
		&.first {
			left: 2px;
			-webkit-text-stroke-color: #c026d3;
		}
		&.third {
			bottom: 64px;
			-webkit-text-stroke-color: #db2777;
			opacity: 0.15;
			font-size: 64px;
		}
	}
</style>
