import { command, getRequestEvent, query } from "$app/server";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { fail } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import z from "zod";
import { getPlayers } from "../data.remote";

export const favoritePlayer = command(z.string(), async (name) => {
	const { locals } = getRequestEvent();
	if (!locals.loggedIn || !locals.playerData) {
		return fail(401);
	}
	const favorites = locals.playerData.favorites;
	if (name === null || typeof name !== "string") {
		return fail(400);
	}
	const featured = favorites.includes(name);
	if (featured) {
		favorites.splice(favorites.indexOf(name), 1);
	} else {
		favorites.push(name);
	}
	await db
		.update(playersTable)
		.set({ favorites: favorites })
		.where(eq(playersTable.name, locals.playerData.name));
	getPlayers().refresh();
	return { featured: !featured };
});
export const getPlayer = query(z.string(), async (name) => {
	const { locals } = getRequestEvent();
	return {
		player: await db.query.playersTable.findFirst({
			columns: { name: true, skin: true, contact: true, description: true, pronouns: true },
			where: and(
				eq(playersTable.isActivated, true),
				eq(playersTable.isBanned, false),
				eq(playersTable.name, name),
			),
		}),
		features: await locals.playerData?.favorites.includes(name),
	};
});
