import { getRequestEvent, query } from "$app/server";
import { db } from "$lib/server/db";
import { citizenshipApplicationsTable, playersTable } from "$lib/server/db/schema";
import { fail } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import z from "zod";

const applicationsSchemas = z.object({
	type: z.number(),
	citizenshipAccepted: z.boolean().optional(),
});

export const getApplications = query(applicationsSchemas, async ({ type, citizenshipAccepted }) => {
	const { locals } = getRequestEvent();
	if (!locals.loggedIn || !locals.playerData?.administrator) {
		return fail(401);
	}
	let res;
	switch (type) {
		case 0:
			res = await db.query.playersTable.findMany({
				where: and(eq(playersTable.isActivated, false)),
			});
			break;
		case 1:
			res = await db.query.citizenshipApplicationsTable.findMany({
				where: and(eq(citizenshipApplicationsTable.accepted, false)),
			});
			break;
	}

	return res;
});
