import { getRequestEvent, query } from "$app/server";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { and, desc, eq } from "drizzle-orm";

export const getPlayers = query(async () => {
	const { locals } = getRequestEvent();
	const backstage = locals.playerData?.administrator === true;
	const res = await db.query.playersTable.findMany({
		columns: {
			name: true,
			skin: true,
			contact: true,
			description: true,
			pronouns: true,
			citizenship: true,
		},
		where: and(eq(playersTable.isActivated, true), eq(playersTable.isBanned, false)),
		orderBy: desc(playersTable.lastOnline),
	});
	console.log(res);
	return res.map(({ citizenship, ...player }) => {
		let featured = false;
		const authorizedPlayerData = locals.playerData;
		if (authorizedPlayerData) {
			featured = authorizedPlayerData.favorites.includes(player.name);
		}
		return { featured, ...(backstage && { citizenship }), ...player };
	});
});

export type GetPlayersResponse = Awaited<ReturnType<typeof getPlayers>>[number][];
