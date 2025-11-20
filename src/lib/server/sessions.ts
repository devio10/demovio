import type { RequestEvent } from "@sveltejs/kit";
import { db } from "./db";
import { sessionsTable } from "./db/schema";
import { eq } from "drizzle-orm";

export const removeSession = async ({ cookies }: Pick<RequestEvent, "cookies">) => {
	const sessionId = cookies.get("session");
	if (!sessionId) {
		return;
	}
	await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
	cookies.delete("session", {
		path: "/",
		secure: false,
		httpOnly: true,
	});
};
