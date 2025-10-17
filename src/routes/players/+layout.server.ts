import type { LayoutServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { and, eq } from "drizzle-orm";
export const load: LayoutServerLoad = async ({ depends }) => {
	async function getPlayers() {
		depends("players-list");
		return await db.query.playersTable.findMany({
			columns: { name: true, skin: true, contact: true, description: true, pronouns: true },
			where: and(eq(playersTable.isActivated, true), eq(playersTable.isBanned, false)),
		});
	}
	return { players: getPlayers() };
};
