import { query } from "$app/server";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { and, eq } from "drizzle-orm";
export const getPlayers = query(async () => {
	return await db.query.playersTable.findMany({
		columns: { name: true, skin: true, contact: true, description: true, pronouns: true },
		where: and(eq(playersTable.isActivated, true), eq(playersTable.isBanned, false)),
	});
});
