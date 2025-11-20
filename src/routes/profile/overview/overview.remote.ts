import { getRequestEvent, query } from "$app/server";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { setTimeout } from "timers/promises";

export const forceReapplySkin = query(async () => {
	await setTimeout(1000);
	const { locals } = getRequestEvent();
	if (!locals.loggedIn || !locals.playerData) {
		return { error: "Войдите в аккаунт." };
	}
	await db
		.update(playersTable)
		.set({ appliedSkin: true })
		.where(eq(playersTable.name, locals.playerData.name));
	//apply skin here...
	return { success: true };
});
