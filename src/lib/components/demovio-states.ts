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
		name: "Concord",
		icon: "concord.svg",
		code: "concord",
		shortCode: "CD",
		autoAcceptSwitch: true,
	},
	{
		name: "New York",
		icon: "newyork.svg",
		code: "newyork",
		shortCode: "NY",
		autoAcceptSwitch: "Штат Нью Йорк рассматривает заявки вручную. Это может занять до двух суток.",
	},
	{
		name: "Ohio",
		icon: "ohio.svg",
		code: "ohio",
		shortCode: "OH",
		autoAcceptSwitch: true,
	},
	{
		name: "California",
		icon: "california.svg",
		code: "california",
		shortCode: "CA",
		autoAcceptSwitch: true,
	},
	{
		name: "Georgia",
		icon: "georgia.svg",
		code: "georgia",
		shortCode: "GE",
		autoAcceptSwitch: true,
	},
	{
		name: "Shanghai",
		icon: "shanghai.svg",
		code: "shanghai",
		shortCode: "SH",
		autoAcceptSwitch: true,
		acceptOldPlayers: true,
	},
];

export const demovioStateCodes = ["SH", "CA", "NY", "GE", "OH", "CD"] as const;
export type DemovioStateCode = (typeof demovioStateCodes)[number];
