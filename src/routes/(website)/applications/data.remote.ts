import { getRequestEvent, query } from "$app/server";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { fail } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";

export const getApplications = query(async () => {
	const { locals } = getRequestEvent();
	if (!locals.loggedIn || !locals.playerData?.administrator) {
		return fail(401);
	}
	const res = await db.query.playersTable.findMany({
		where: and(eq(playersTable.isActivated, false)),
	});
	return res;
});
