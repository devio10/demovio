import { command, getRequestEvent, query } from "$app/server";
import { db } from "$lib/server/db";
import { notifySubscriptionsTable, playersTable } from "$lib/server/db/schema";
import { fail } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import { getPlayers } from "../data.remote";
import { accountDataSchemas } from "$lib/server/data-schemas";

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
export const getPlayer = query(accountDataSchemas.name, async (name) => {
	const { locals } = getRequestEvent();
	const player = await db.query.playersTable.findFirst({
		columns: {
			name: true,
			skin: true,
			contact: true,
			description: true,
			pronouns: true,
			lastOnline: true,
		},
		where: and(
			eq(playersTable.isActivated, true),
			eq(playersTable.isBanned, false),
			eq(playersTable.name, name),
		),
	});
	if (!player) {
		return undefined;
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
