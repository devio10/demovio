import { command, form, getRequestEvent } from "$app/server";
import { accountDataSchemas } from "$lib/server/data-schemas";
import { db } from "$lib/server/db";
import { rateLimitsTable } from "$lib/server/db/schema";
import { rconExecuteCommand } from "$lib/server/rcon";
import { error } from "console";
import { subDays } from "date-fns";
import { and, eq, gt } from "drizzle-orm";
import { setTimeout } from "timers/promises";
import z from "zod";

export const resetGamePassword = command(
	z.object({
		password: accountDataSchemas.password,
	}),
	async ({ password }) => {
		await setTimeout(750);
		const { locals } = getRequestEvent();
		if (!locals.loggedIn || !locals.playerData) {
			return error(401);
		}
		if (
			!locals.playerData.isActivated ||
			locals.playerData.isDeactivated ||
			locals.playerData.isBanned
		) {
			return error(403, `Некоторые возможности для вашего аккаунта Demovio ограничены.`);
		}

		const invokerPasswordUpdates = await db.query.rateLimitsTable.findMany({
			where: and(
				eq(rateLimitsTable.actionType, "reset_game_password"),
				eq(rateLimitsTable.invokerId, locals.playerData.id),
				gt(rateLimitsTable.time, subDays(new Date(), 1)),
			),
		});
		if (invokerPasswordUpdates.length > 0) {
			return error(403, "Вы можете обновлять пароль минимум раз в сутки.");
		}
		await rconExecuteCommand(`auth update ${locals.playerData.name} ${password}`);
		await db.insert(rateLimitsTable).values({
			actionType: "reset_game_password",
			invokerId: locals.playerData.id,
			time: new Date(),
		});
	},
);
