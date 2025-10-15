import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const actions: Actions = {
	default: async ({ locals, request }) => {
		if (!locals.loggedIn || !locals.playerData) {
			return fail(401);
		}
		const favorites = locals.playerData.favorites;
		const body = await request.formData();
		const name = body.get("name");
		if (name === null || typeof name !== "string") {
			return fail(400);
		}
		if (favorites.includes(name)) {
			favorites.splice(favorites.indexOf(name), 1);
		} else {
			favorites.push(name);
		}
		await db
			.update(playersTable)
			.set({ favorites: favorites })
			.where(eq(playersTable.name, locals.playerData.name));
		return { success: true };
	},
};

export const load: PageServerLoad = async ({ params, parent, locals }) => {
	const name = params.name;
	return {
		player: parent()
			.then((data) => data.players)
			.then((players) => {
				return players.find((p) => p.name === name);
			}),
		features: locals.playerData?.favorites.includes(name),
	};
};
