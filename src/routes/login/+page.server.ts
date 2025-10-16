import { fail, redirect, type ServerLoad } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { db } from "$lib/server/db";
import { and, eq } from "drizzle-orm";
import { playersTable, sessionsTable } from "$lib/server/db/schema";
import { nanoid } from "nanoid";

export const load: ServerLoad = ({ locals }) => {
	if (locals.loggedIn) {
		return redirect(303, "/");
	}
	return { loggedIn: locals.loggedIn };
};

export const actions: Actions = {
	default: async ({ locals, cookies, request }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		if (locals.loggedIn) {
			return redirect(303, "/");
		}
		const body = await request.formData();
		const login = body.get("login");
		const password = body.get("password");
		if (typeof login !== "string" || typeof password !== "string") {
			return fail(400);
		}
		const player = await db.query.playersTable.findFirst({
			where: eq(playersTable.name, login),
		});
		if (!player) {
			return fail(403, { error: "Имя игрока не найдено." });
		}
		if (!(await Bun.password.verify(password, player.password))) {
			return fail(401, { error: "Неправильный пароль." });
		}
		const sessionId = nanoid();
		await db.insert(sessionsTable).values({
			id: sessionId,
			name: login,
		});
		cookies.set("session", sessionId, { httpOnly: true, path: "/" });
		return redirect(303, "/profile");
	},
};
