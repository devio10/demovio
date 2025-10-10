<script lang="ts">
	import type { Profile } from "../routes/profile/+layout.serverer";

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
			name: "Шанхай / Shanghai",
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

				<div class="passport-stamp SH effect">
					<div class="stamp_sh_top">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M4 15.5V6q0-1.325.688-2.113t1.812-1.2t2.563-.55T12 2q1.65 0 3.113.138t2.55.55t1.712 1.2T20 6v9.5q0 1.475-1.012 2.488T16.5 19l.5.5q.425.425.2.963t-.825.537q-.175 0-.337-.062t-.288-.188L14 19h-4l-1.75 1.75q-.125.125-.288.188T7.626 21q-.575 0-.812-.537T7 19.5l.5-.5q-1.475 0-2.488-1.012T4 15.5M12 4q-2.65 0-3.875.313T6.45 5h11.2q-.375-.425-1.612-.712T12 4m-6 6h5V7H6zm10.5 2H6h12zM13 10h5V7h-5zm-4.5 6q.65 0 1.075-.425T10 14.5t-.425-1.075T8.5 13t-1.075.425T7 14.5t.425 1.075T8.5 16m7 0q.65 0 1.075-.425T17 14.5t-.425-1.075T15.5 13t-1.075.425T14 14.5t.425 1.075T15.5 16m-8 1h9q.65 0 1.075-.425T18 15.5V12H6v3.5q0 .65.425 1.075T7.5 17M12 5h5.65h-11.2z"
							/>
						</svg>
						<span>IMMIGRATION 移民</span>
					</div>
					<div class="stamp_sh_name">
						<span>SHANGHAI</span>
					</div>
					<span class="stamp_sh_bottom">APPROVED / 已批准</span>
				</div>
				<div class="passport-stamp NY effect">
					<div>
						<span class="stamp_ny_text">APPROVED CITIZEN OF</span>
						<span class="stamp_ny_cityname">NEW YORK</span>
						<span class="stamp_ny_text">NY REGISTRATION OFFICE</span>
					</div>
				</div>
				<div class="passport-stamp CA effect">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M7 14v-3.09c-.72-.33-1.39-.73-2-1.2V14zm-2 4H3v-2H1v-2h2V7h2v1.43C6.8 10 9.27 11 12 11s5.2-1 7-2.57V7h2v7h2v2h-2v2h-2v-2H5zm12-7.09V14h2V9.71c-.61.47-1.28.87-2 1.2M16 14v-2.68c-.64.23-1.31.4-2 .52V14zm-3 0v-2.04L12 12l-1-.04V14zm-3 0v-2.16c-.69-.12-1.36-.29-2-.52V14z"
							/>
						</svg>
						<span class="date">21 OCT 2024</span>
						<span>State Of</span>
						<span class="stamp_ca_name">California</span>
					</div>
				</div>
				<div class="passport-stamp OH effect">
					<div class="stamp_oh_top">
						<span>OHIO | ОГАЙО</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="42"
							height="42"
							stroke="currentColor"
							viewBox="0 0 48 48"
						>
							<g fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path
									d="M16.327 21.295s.623 1.903-1.673 3.497c0 0 .814 1.195.342 2.64c0 0 2.623 2.658-.688 5.566m0 0s-1.808-5.127-3.48-5.668c0 0-.135-3.744-1.204-6.24m0 0s.107-3.825 2.704-7.018c-.209.205-1.11.952-2.831.358m6.908-5.764l3.399 3.136m-1.704.128s2.982-.807 4.917 2.249m0 0s.918 3.071 2.528 9.354c0 0-.186.97.57 1.406c0 0 .52 1.103 1.473 1.513c0 0 2.57-.417 2.387 1.151m-6.715-3.028l1.488 2.226s1.495.461 2.462 1.992c0 0 2.678-.474 2.952 1.14m-9.022-3.52l2.008 2.827s2.365.562 3.197 1.747c0 0 2.522-1.033 2.926 1.237m-10.756-4.457l2.05 2.978s1.813.467 2.845 1.585c0 0 2.815-.627 3.834.825m-11.026-2.461s1.695 4.037 9.324 3.937"
								/>
								<path
									d="M17.204 32.082s-1.91 2.168 1.509 1.704c0 0-1.003 3.245 3.022 1.04c0 0-2.986 3.132 5.04 1.21c0 0 2.876-.541 4.957-3.306m-.455-12.385c-.077.797-.428 3.917 2.33 5.987c0 0-1.6.955-.714 2.636"
								/>
								<path
									d="M32.893 28.968s-2.95 2.872.288 5.397m0 0s1.561-3.564 3.449-4.976c0 0 .751-3.62 1.915-5.698c0 0 1.05-3.749-2.258-9.06m4.131-1.038l-3.18 2.424m-5.515-6.936L28.95 12.43m-4.67 5.65s.55-6.054 6.253-5.551"
								/>
								<ellipse cx="24" cy="24" rx="21.5" ry="16.738" />
								<path d="m9.497 14.43l-2.276-.678" />
							</g>
						</svg>
					</div>
					<span class="date">21 OCT 2024</span>
				</div>
				<div class="passport-stamp GE effect">
					<span>Citizen of</span>
					<span class="stamp_ge_name">Georgia</span>
					<span class="date">21 OCT 2024</span>
				</div>
				<div class="passport-stamp CD effect">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="42"
						height="42"
						fill="currentColor"
						viewBox="0 0 256 256"
					>
						<path
							d="M238.16,113.89,142.1,17.83a20,20,0,0,0-28.21,0l-96,96.06a20,20,0,0,0,0,28.22l96.05,96.06h0a20,20,0,0,0,28.21,0l96-96.06a20,20,0,0,0,0-28.22ZM128,218.33,37.68,128,128,37.67,218.32,128Z"
						></path>
					</svg>
				</div>

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
		width: 420px;
		aspect-ratio: 1.45 / 2.05;

		display: grid;
		grid-template-rows: 1fr 1fr;
		margin-bottom: 48px;
		color: rgba(0, 0, 0, 0.9);
		transition: 0.5s ease-in-out transform;

		perspective: 1000px;
		padding: 0;

		--radius: 16px;
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
			background: linear-gradient(to bottom, #ffedd56b, #d6c0a00a), $noise, #faddb6;
			z-index: 1;

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
			background: linear-gradient(to bottom, #ffedd56b, #e4d1b72f), $noise, #faddb6;
			z-index: 0;
			border-radius: 0 0 var(--radius) var(--radius);
			overflow: clip;
			border-top: 2px solid rgba(0, 0, 0, 0.1);
			box-shadow: 0px 0 30px 0px rgba(0, 0, 0, 0.6);
			section {
				color: black;
			}
			.avatar_container {
				background-color: rgba(0, 0, 0, 0.1);
				padding: 24px 16px;
				border: 1px solid rgba(0, 0, 0, 0.05);
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
			width: 96px;
			height: 96px;
			box-sizing: content-box;
			image-rendering: pixelated;
			image-rendering: crisp-edges;
			&.custom_skin {
				background-image: $noise;
				background-repeat: no-repeat;
				background-position: -96px -96px;
				background-size: 768px 768px;
			}
			&.holo {
				padding: 0;
				border: none;
				position: absolute;
				filter: sepia(1);
				opacity: 0.15;
				right: 24px;
				margin-top: 24px;
				width: 32px;
				height: 32px;
				&.custom_skin {
					background-position: -32px -32px;
					background-size: 256px 256px;
				}
			}
		}
	}

	.technical-information {
		background: linear-gradient(to bottom, #ffffffa6, #fdf3e583), $noise, #fff7ec;
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
