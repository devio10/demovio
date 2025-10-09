import { db } from "$lib/server/db";
import { sessionsTable } from "$lib/server/db/schema";
import type { Handle } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, cookies } = event;
	const sessionId = cookies.get("session");
	locals.loggedIn = false;
	if (sessionId !== undefined) {
		const session = await db.query.sessionsTable.findFirst({
			where: eq(sessionsTable.id, sessionId),
			with: { player: true },
		});
		if (session) {
			locals.loggedIn = true;
			locals.playerData = session.player;
		}
	}
	const response = await resolve(event);
	return response;
};
