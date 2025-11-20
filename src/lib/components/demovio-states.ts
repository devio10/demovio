export const demovioStates: {
	name: string;
	icon: string;
	code: string;
	shortCode: DemovioStateCode;
	autoAcceptSwitch: boolean | string;
	acceptOldPlayers?: boolean;
	acceptNewPlayers?: boolean;
}[] = [
	{
		name: "Конкорд",
		icon: "concord.svg",
		code: "concord",
		shortCode: "CD",
		autoAcceptSwitch: true,
	},
	{
		name: "Нью Йорк",
		icon: "newyork.svg",
		code: "newyork",
		shortCode: "NY",
		autoAcceptSwitch: "Штат Нью Йорк рассматривает заявки вручную. Это может занять до двух суток.",
	},
	{
		name: "Огайо",
		icon: "ohio.svg",
		code: "ohio",
		shortCode: "OH",
		autoAcceptSwitch: true,
	},
	{
		name: "Калифорния",
		icon: "california.svg",
		code: "california",
		shortCode: "CA",
		autoAcceptSwitch: true,
	},
	{
		name: "Джорджия",
		icon: "georgia.svg",
		code: "georgia",
		shortCode: "GE",
		autoAcceptSwitch: true,
	},
	{
		name: "Шанхай",
		icon: "shanghai.svg",
		code: "shanghai",
		shortCode: "SH",
		autoAcceptSwitch: true,
		acceptOldPlayers: true,
	},
];

export const demovioStateCodes = ["SH", "CA", "NY", "GE", "OH", "CD"] as const;
export type DemovioStateCode = (typeof demovioStateCodes)[number];
