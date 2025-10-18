import { command, getRequestEvent } from "$app/server";
import { db } from "$lib/server/db";
import { pushSubscriptionsTable } from "$lib/server/db/schema";
import { fail } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import { notificationSchema } from "./notification-schema";
import z from "zod";
import { noNullCharacter } from "$lib/utils";

export const pushNotificationsOn = command(notificationSchema, async (subdata) => {
	const { locals } = getRequestEvent();
	if (!locals.loggedIn || !locals.playerData) {
		return fail(401);
	}
	console.log("did it on 'em");
	await db.insert(pushSubscriptionsTable).values({
		receiverName: locals.playerData.name,
		auth: subdata.keys.auth,
		endpoint: subdata.endpoint,
		p256dh: subdata.keys.p256dh,
		expiresAt: subdata.expirationTime === null ? null : new Date(subdata.expirationTime),
	});
});
export const pushNotificationsOff = command(z.url().refine(noNullCharacter), async (endpoint) => {
	const { locals } = getRequestEvent();
	if (!locals.loggedIn || !locals.playerData) {
		return fail(401);
	}
	await db
		.delete(pushSubscriptionsTable)
		.where(
			and(
				eq(pushSubscriptionsTable.receiverName, locals.playerData.name),
				eq(pushSubscriptionsTable.endpoint, endpoint),
			),
		);
	console.log("shitted on 'em");
});
