import { getDemovioStatus } from "$lib/server/minecraft-status";
import type { FullResponse } from "@hloth/minecraft-query";
import type { RequestHandler } from "./$types";
import { SERVER_TOP_SECRET_KEY } from "$env/static/private";
import { db } from "$lib/server/db";
import {
	notifySubscriptionsTable,
	playersTable,
	pushSubscriptionsTable,
} from "$lib/server/db/schema";
import { eq, inArray } from "drizzle-orm";
import webPush from "web-push";

export const POST: RequestHandler = async ({ request }) => {
	const key = request.headers.get("Authorization");
	if (key !== `Bearer ${SERVER_TOP_SECRET_KEY}`) {
		return new Response(null, { status: 401 });
	}
	const status: FullResponse | false = await getDemovioStatus();
	if (!status) {
		return new Response(null, { status: 503 });
	}
	const onlinePlayers = status.players;
	await db
		.update(playersTable)
		.set({ lastOnline: new Date() })
		.where(inArray(playersTable.name, onlinePlayers));

	for (const onlinePlayerName of onlinePlayers) {
		const onlinePlayerNotificationSubscribers = await db.query.notifySubscriptionsTable.findMany({
			where: eq(notifySubscriptionsTable.targetName, onlinePlayerName),
			with: { receiverPlayer: true, targetPlayer: true },
		});

		for (const {
			receiverName,
			lastSent,
			receiverPlayer,
			targetPlayer,
		} of onlinePlayerNotificationSubscribers) {
			if (
				!lastSent ||
				!receiverPlayer.subscriptionFrequency ||
				Date.now() - lastSent.getTime() <= receiverPlayer.subscriptionFrequency
			) {
				const receiverPushSubscriptions = await db.query.pushSubscriptionsTable.findMany({
					where: eq(pushSubscriptionsTable.receiverName, receiverName),
				});
				for (const { endpoint, auth, p256dh } of receiverPushSubscriptions) {
					await webPush.sendNotification(
						{ endpoint: endpoint, keys: { auth: auth, p256dh: p256dh } },
						JSON.stringify({ name: onlinePlayerName, pronouns: targetPlayer.pronouns }),
					);
				}
				//Telegram...
			}
		}
	}

	return new Response();
};
