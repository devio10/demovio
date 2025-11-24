import { db } from "$lib/server/db";
import { playersTable, type PlayerData } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

const citizenships: Record<string, Omit<PlayerData["citizenship"], "date"> & { date: string }> = {
	devio10: {
		code: "SH",
		date: "2024-10-31",
		protocol: "№03:4451",
		address: "11 Бамбуковый Вершитель",
	},
	anastasiz2009: { code: "CA", date: "2024-11-29", protocol: "№01:3184", address: "Pink House 2" },
	cosy4xy: { code: "OH", date: "2024-11-29", protocol: "№04:3952", address: "Ущелье" },
	PeQueno: {
		code: "SH",
		date: "2024-11-29",
		protocol: "№03:1974",
		address: "10 Бамбуковый Вершитель",
	},
	lionleo838: { code: "OH", date: "2024-11-28", protocol: "№04:1062", address: "-" },
	batalayar: {
		code: "SH",
		date: "2024-11-29",
		protocol: "№03:8899",
		address: "4/5 Бамбуковый Вершитель",
	},
	VityaSchel: { code: "NY", date: "2024-11-29", protocol: "№00:8444", address: "-" },
	Noname_Artist: { code: "SH", date: "2024-12-03", protocol: "№03:3131", address: "-" },
	SoftableRass: {
		code: "SH",
		date: "2024-12-07",
		protocol: "№03:8306",
		address: "14 Бамбуковый Вершитель",
	},
	alinkaprogamer: {
		code: "SH",
		date: "2024-12-29",
		protocol: "№03:5409",
		address: "15 Бамбуковый Вершитель",
	},
	Dimanius100: { code: "GE", date: "2024-12-30", protocol: "№05:3779", address: "-" },
	Dr_Coujer: { code: "GE", date: "2025-01-02", protocol: "№05:9462", address: "-" },
	Geni9026: { code: "GE", date: "2025-01-12", protocol: "№05:4176", address: "-" },
	marishaPRO: { code: "CA", date: "2025-02-25", protocol: "№01:8985", address: "г. Похоти, 69" },
	damir1240: { code: "SH", date: "2025-02-25", protocol: "№03:3824", address: "-" },
	YuKi812: { code: "CA", date: "2025-02-26", protocol: "№01:3467", address: "г. Похоти, 69" },
	pri4ina_triaski: { code: "SH", date: "2025-02-27", protocol: "№03:1205", address: "-" },
	wkey2000: { code: "SH", date: "2025-02-27", protocol: "№03:2698", address: "-" },
	ZGGOLDDZ: { code: "OH", date: "2025-03-10", protocol: "№04:5425", address: "Ущелье" },
	DAiSYWhiSPER: { code: "CA", date: "2025-04-18", protocol: "№01:2140", address: "-" },
	sosiska_pv: { code: "CA", date: "2025-04-25", protocol: "№01:3344", address: "-" },
	besty: { code: "GE", date: "2025-08-14", protocol: "№05:7100", address: "-" },
	hloth: { code: "GE", date: "2025-08-31", protocol: "№05:9941", address: "-" },
	mihas: { code: "OH", date: "2025-09-17", protocol: "№03:7073", address: "-" },
	YourOwnSun: { code: "CA", date: "2025-09-18", protocol: "№04:1316", address: "-" },
	AFL04: { code: "CA", date: "2025-10-21", protocol: "№04:5744", address: "-" },
};

export async function GET() {
	for (const [player, citizenship] of Object.entries(citizenships)) {
		const date = new Date(citizenship.date).getTime();
		console.log(citizenship.date, date);
		await db
			.update(playersTable)
			.set({
				citizenship: {
					...citizenship,
					date,
				},
			})
			.where(eq(playersTable.name, player));
	}
	return new Response(null);
}
