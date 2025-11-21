import { command, getRequestEvent, query } from "$app/server";
import { accountDataSchemas } from "$lib/server/data-schemas";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { getDemovioStatus } from "$lib/server/minecraft-status";
import { applyPlayerSkin } from "$lib/server/rcon";
import { eq } from "drizzle-orm";
import z from "zod";

export const getCurrentDemovioStatus = query(async () => {
	return { players: ["devio10"] };
	return await getDemovioStatus();
});
export const applySkin = command(
	z.object({ playerName: accountDataSchemas.name }),
	async ({ playerName }) => {
		const { locals } = getRequestEvent();
		if (!locals.loggedIn || !locals.playerData) {
			return { error: "Войдите в аккаунт." };
		}
		let skin = locals.playerData?.skin?.includes("/skins/")
			? `/var/www/demovio.love/website${locals.playerData?.skin}`
			: locals.playerData?.skin;
		if (skin === null) {
			skin = playerName;
		}
		const skinType = skin?.includes("/skins/") ? "upload slim" : "player";
		const request = await applyPlayerSkin(playerName, skin, skinType);
		if (request !== false) {
			await db
				.update(playersTable)
				.set({ appliedSkin: true })
				.where(eq(playersTable.name, locals.playerData.name));
		}
	},
);
