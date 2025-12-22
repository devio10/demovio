import { command, getRequestEvent } from "$app/server";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { error } from "console";
import { eq } from "drizzle-orm";
import z from "zod";

export const accountLicenseAvailability = command(z.boolean(), async (value) => {
	const { locals } = getRequestEvent();
	if (!locals.loggedIn || !locals.playerData) {
		return error(401);
	}
	await db
		.update(playersTable)
		.set({ haveLicense: value })
		.where(eq(playersTable.name, locals.playerData.name));
});
