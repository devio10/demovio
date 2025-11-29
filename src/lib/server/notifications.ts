import webPush from "web-push";
import { PUBLIC_PUSH_KEY } from "$env/static/public";
import { PRIVATE_PUSH_KEY } from "$env/static/private";
import { db } from "./db";
import { pushSubscriptionsTable } from "./db/schema";
import { eq } from "drizzle-orm";

export const sendPushNotification = async ({
	name,
	content,
}: {
	name: string;
	content: string;
}) => {
	webPush.setVapidDetails("https://demovio.love", PUBLIC_PUSH_KEY, PRIVATE_PUSH_KEY);

	const receiverPushSubscriptions = await db.query.pushSubscriptionsTable.findMany({
		where: eq(pushSubscriptionsTable.receiverName, name),
	});
	for (const { endpoint, auth, p256dh } of receiverPushSubscriptions) {
		await webPush.sendNotification(
			{ endpoint: endpoint, keys: { auth: auth, p256dh: p256dh } },
			content,
		);
	}
};
