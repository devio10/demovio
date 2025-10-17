import { getRequestEvent, query } from "$app/server";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { and, eq } from "drizzle-orm";
export const getPlayers = query(async () => {
	const { locals } = getRequestEvent();
	const res = await db.query.playersTable.findMany({
		columns: { name: true, skin: true, contact: true, description: true, pronouns: true },
		where: and(eq(playersTable.isActivated, true), eq(playersTable.isBanned, false)),
	});
	return res.map((player) => {
		let featured = false;
		if (locals.playerData) {
			featured = locals.playerData.favorites.includes(player.name);
		}
		return { featured, ...player };
	});
});
