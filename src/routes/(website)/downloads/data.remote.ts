import { command, getRequestEvent } from "$app/server";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { fail } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import z from "zod";

const downloadSchemas = z.object({
	version: z.string().regex(/\d\.\d\.\d/),
	minimap: z.boolean(),
	optimized: z.boolean(),
});
export const downloadBuild = command(downloadSchemas, async ({ version, minimap, optimized }) => {
	const { locals } = getRequestEvent();
	if (!locals.loggedIn || !locals.playerData) {
		return fail(401);
	}
	await db
		.update(playersTable)
		.set({
			lastDownloadedBuild: {
				version,
				minimap,
				optimized,
			},
		})
		.where(eq(playersTable.name, locals.playerData.name));
});
