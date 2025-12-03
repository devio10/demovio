import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
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
