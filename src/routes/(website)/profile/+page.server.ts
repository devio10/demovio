import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { removeSession } from "$lib/server/sessions";
import { db } from "$lib/server/db";
import { playersTable, pushSubscriptionsTable, sessionsTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
export const actions: Actions = {
	logout: async ({ cookies }) => {
		await removeSession({ cookies });
		return redirect(303, "/");
	},
	deactivateAccount: async ({ cookies, locals }) => {
		if (!locals.loggedIn || !locals.playerData) {
			return { error: "Войдите в аккаунт." };
		}
		await db.delete(sessionsTable).where(eq(sessionsTable.name, locals.playerData.name));
		await db
			.delete(pushSubscriptionsTable)
			.where(eq(pushSubscriptionsTable.receiverName, locals.playerData.name));
		await db
			.update(playersTable)
			.set({ isDeactivated: true })
			.where(eq(playersTable.name, locals.playerData.name));
		await removeSession({ cookies });
		return redirect(303, "/");
	},
	reactivateAccount: async ({ locals }) => {
		if (!locals.loggedIn || !locals.playerData) {
			return { error: "Войдите в аккаунт." };
		}
		await db
			.update(playersTable)
			.set({ isDeactivated: false })
			.where(eq(playersTable.name, locals.playerData.name));
	},
};
