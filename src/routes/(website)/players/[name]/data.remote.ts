import { command, getRequestEvent, query } from "$app/server";
import { db } from "$lib/server/db";
import {
	notifySubscriptionsTable,
	playersTable,
	pushSubscriptionsTable,
	rateLimitsTable,
	type PlayerCitizenship,
} from "$lib/server/db/schema";
import { error, fail } from "@sveltejs/kit";
import { and, eq, gt, sql } from "drizzle-orm";
import { getPlayers } from "../data.remote";
import { accountDataSchemas } from "$lib/server/data-schemas";
import { sendPushNotification } from "$lib/server/notifications";
import { NotificationType } from "$lib/scripts";
import { setTimeout } from "timers/promises";
import { subDays } from "date-fns";
import { rconBanPlayer } from "$lib/server/rcon";
import z from "zod";

export const favoritePlayer = command(accountDataSchemas.name, async (name) => {
	const { locals } = getRequestEvent();
	if (!locals.loggedIn || !locals.playerData) {
		return fail(401);
	}
	const favorites = locals.playerData.favorites;
	const featured = favorites.includes(name);
	if (featured) {
		favorites.splice(favorites.indexOf(name), 1);
	} else {
		favorites.push(name);
	}
	await db
		.update(playersTable)
		.set({ favorites: favorites })
		.where(eq(playersTable.name, locals.playerData.name));
	getPlayers().refresh();
	return { featured: !featured };
});

const banSchemas = z.object({ name: accountDataSchemas.name, value: z.boolean() });

export const backstageBanPlayer = command(banSchemas, async ({ name, value }) => {
	const { locals } = getRequestEvent();
	await setTimeout(750);
	if (!locals.loggedIn || !locals.playerData || !locals.playerData.administrator) {
		return fail(401);
	}
	await db.update(playersTable).set({ isBanned: value }).where(eq(playersTable.name, name));

	sendPushNotification({
		name: name,
		content: JSON.stringify({
			type: NotificationType.accountBanned,
			url: "https://t.me/devio101",
		}),
	});

	const rconBan = await rconBanPlayer(name, value);
	if (rconBan) {
		return { success: true };
	} else {
		return error(
			405,
			"Не удалось применить бан. Пожалуйста, выполните вручную команду бана на сервере.",
		);
	}
});

export const invitePlayer = command(accountDataSchemas.name, async (name) => {
	const { locals } = getRequestEvent();
	await setTimeout(750);
	if (!locals.loggedIn || !locals.playerData) {
		return fail(401);
	}
	const playerToInvite = await db.query.playersTable.findFirst({
		where: eq(playersTable.name, name),
	});
	if (!playerToInvite) {
		return fail(400);
	}
	if (!playerToInvite.notificationsInvites) {
		return error(403, `Игрок запретил приглашать себя в игру.`);
	}

	if (locals.playerData.administrator !== true) {
		const invokerSentInvites = await db.query.rateLimitsTable.findMany({
			where: and(
				eq(rateLimitsTable.actionType, "invitation"),
				eq(rateLimitsTable.invokerId, locals.playerData.id),
				gt(rateLimitsTable.time, subDays(new Date(), 1)),
			),
		});
		if (invokerSentInvites.length > 2) {
			return error(403, "Вы можете приглашать максимум трёх игроков в сутки.");
		}

		const invokerSentInvitesToPlayer = await db
			.select()
			.from(rateLimitsTable)
			.where(
				and(
					eq(rateLimitsTable.actionType, "invitation"),
					eq(rateLimitsTable.invokerId, locals.playerData.id),
					gt(rateLimitsTable.time, subDays(new Date(), 1)),
					sql`${rateLimitsTable.data}->>'receiver' = ${name}`,
				),
			);
		if (invokerSentInvitesToPlayer.length > 0) {
			return error(403, "Вы уже пригласили этого игрока.");
		}

		const inviteeReceivedInvites = await db
			.select()
			.from(rateLimitsTable)
			.where(
				and(
					eq(rateLimitsTable.actionType, "invitation"),
					gt(rateLimitsTable.time, subDays(new Date(), 1)),
					sql`${rateLimitsTable.data}->>'receiver' = ${name}`,
				),
			);
		if (inviteeReceivedInvites.length > 1) {
			return error(403, "Игрок уже получил слишком много приглашений за сутки.");
		}
	}

	const inviteePushSubscriptions = await db
		.select()
		.from(pushSubscriptionsTable)
		.where(eq(pushSubscriptionsTable.receiverName, name));
	if (inviteePushSubscriptions.length === 0) {
		return error(403, "Игрок в данный момент не подписан на уведомления от Demovio.");
	}

	sendPushNotification({
		name: name,
		content: JSON.stringify({
			name: locals.playerData.name,
			type: NotificationType.invitationFromPlayer,
		}),
	});

	await db.insert(rateLimitsTable).values({
		actionType: "invitation",
		invokerId: locals.playerData.id,
		time: new Date(),
		data: {
			receiver: name,
		},
	});

	return { success: true };
});

export const subscribeToPlayer = command(accountDataSchemas.name, async (targetName) => {
	const { locals } = getRequestEvent();
	if (!locals.loggedIn || !locals.playerData) {
		return fail(401);
	}
	const subscribed = await db.query.notifySubscriptionsTable.findFirst({
		where: and(
			eq(notifySubscriptionsTable.receiverName, locals.playerData.name),
			eq(notifySubscriptionsTable.targetName, targetName),
		),
	});
	if (!subscribed) {
		await db.insert(notifySubscriptionsTable).values({
			receiverName: locals.playerData.name,
			targetName: targetName,
		});
	} else {
		await db
			.delete(notifySubscriptionsTable)
			.where(
				and(
					eq(notifySubscriptionsTable.receiverName, locals.playerData.name),
					eq(notifySubscriptionsTable.targetName, targetName),
				),
			);
	}
	return { subscribed: !subscribed };
});

export type GetPlayerResponse = Awaited<ReturnType<typeof getPlayer>>;

export const getPlayer = query(accountDataSchemas.name, async (name) => {
	const { locals } = getRequestEvent();
	const backstage = locals.playerData?.administrator === true;
	const showForBackstage = locals.loggedIn && locals.playerData?.administrator ? true : false;
	const player = (await db.query.playersTable.findFirst({
		columns: {
			name: true,
			skin: true,
			contact: locals.loggedIn && locals.playerData?.isActivated,
			description: true,
			pronouns: true,
			lastOnline: true,
			isBanned: true,
			issueDate: showForBackstage,
			citizenship: showForBackstage,
			id: showForBackstage,
			uuid: showForBackstage,
		},
		where: and(
			eq(playersTable.isActivated, true),
			backstage ? undefined : eq(playersTable.isBanned, false),
			eq(playersTable.name, name),
		),
	})) as {
		name: string;
		skin: string | null;
		lastOnline: Date | null;
		pronouns: string;
		issueDate: Date | number;
		description: string | null;
		contact: string | undefined;
		citizenship: PlayerCitizenship | undefined;
		isBanned: boolean;
		id: number;
		uuid: string;
	};
	if (!player) {
		return null;
	}

	let featured = false;
	let subscribed = false;
	const authorizedPlayerData = locals.playerData;
	if (authorizedPlayerData) {
		featured = authorizedPlayerData.favorites.includes(player.name);
		const subcriptions = await db.query.notifySubscriptionsTable.findMany({
			where: eq(notifySubscriptionsTable.targetName, player.name),
		});
		subscribed = subcriptions.some(
			(subscription) => subscription.receiverName === authorizedPlayerData.name,
		);
	}

	return { featured, subscribed, ...player };
});
