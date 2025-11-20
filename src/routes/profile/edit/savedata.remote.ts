import { form, getRequestEvent } from "$app/server";
import { SKINS_PATH } from "$env/static/private";
import { PUBLIC_SKINS_PREFIX } from "$env/static/public";
import { accountDataSchemas } from "$lib/server/data-schemas";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { setTimeout } from "timers/promises";
import z from "zod";
import path from "path";

export const saveData = form(
	z.object({
		description: accountDataSchemas.description.optional(),
		pronouns: accountDataSchemas.pronouns.optional(),
		skin: z.file().optional(),
		skinName: accountDataSchemas.name.optional(),
	}),
	async ({ skin, description, pronouns, skinName }, invalid) => {
		await setTimeout(1000);
		const { locals } = getRequestEvent();
		if (!locals.loggedIn || !locals.playerData) {
			return error(401, "Войдите в аккаунт, чтобы изменить данные");
		}
		let skinFallback = undefined;
		if (skin) {
			if (skin.size > 10 * 1000) {
				invalid(invalid.skin("Слишком большой файл скина"));
			}
			const skinFile = Bun.file(path.join(SKINS_PATH, `${locals.playerData.name}.png`));
			skinFile.write(await skin.bytes());
		} else if (skinName) {
			skinFallback = skinName;
		}
		const dbRequest = await db
			.update(playersTable)
			.set({
				description: description || null,
				pronouns: pronouns || null,
				skin: skin ? `${PUBLIC_SKINS_PREFIX + locals.playerData.name}.png` : skinFallback,
			})
			.where(eq(playersTable.name, locals.playerData?.name));
		if (dbRequest) {
			return { success: true };
		}
		return { error: "unknown" };
	},
);
