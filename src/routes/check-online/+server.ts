import { getDemovioStatus } from "$lib/server/minecraft-status";
import type { FullResponse } from "@hloth/minecraft-query";
import type { RequestHandler } from "./$types";
import { PRIVATE_PUSH_KEY, SERVER_TOP_SECRET_KEY } from "$env/static/private";
import { db } from "$lib/server/db";
import {
	notifySubscriptionsTable,
	playersTable,
	pushSubscriptionsTable,
} from "$lib/server/db/schema";
import { and, eq, inArray, notInArray } from "drizzle-orm";
import webPush from "web-push";
import { PUBLIC_PUSH_KEY } from "$env/static/public";

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
	// const onlinePlayers = ["anastasiz2009"];

	webPush.setVapidDetails("https://demovio.love", PUBLIC_PUSH_KEY, PRIVATE_PUSH_KEY);
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
				(!lastSent ||
					!receiverPlayer.subscriptionFrequency ||
					Date.now() - lastSent.getTime() >= receiverPlayer.subscriptionFrequency) &&
				!receiverPlayer.currentlyOnline
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
				await db
					.update(notifySubscriptionsTable)
					.set({
						lastSent: new Date(),
					})
					.where(
						and(
							eq(notifySubscriptionsTable.targetName, onlinePlayerName),
							eq(notifySubscriptionsTable.receiverName, receiverName),
						),
					);
				//Telegram...
			}
		}
	}

	await db
		.update(playersTable)
		.set({ lastOnline: new Date(), currentlyOnline: true })
		.where(inArray(playersTable.name, onlinePlayers));

	await db
		.update(playersTable)
		.set({ currentlyOnline: false })
		.where(notInArray(playersTable.name, onlinePlayers));

	return new Response();
};
