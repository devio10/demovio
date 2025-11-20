import { form, getRequestEvent } from "$app/server";
import { accountDataSchemas } from "$lib/server/data-schemas";
import { db } from "$lib/server/db";
import { playersTable, sessionsTable } from "$lib/server/db/schema";
import { constructPlayerUuid } from "$lib/server/generateUUID";
import { setTimeout } from "timers/promises";
import z from "zod";
import { error, redirect } from "@sveltejs/kit";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import path from "path";
import { SKINS_PATH } from "$env/static/private";
import { PUBLIC_SKINS_PREFIX } from "$env/static/public";

const checkNameInDB = async (name: string): Promise<boolean> => {
	const existingPlayer = await db.query.playersTable.findFirst({
		where: eq(playersTable.name, name),
	});
	return !!existingPlayer;
};

const accountDataSchema = z.object({
	name: accountDataSchemas.name,
	password: accountDataSchemas.password,
	contact: accountDataSchemas.contact,
	pronouns: accountDataSchemas.pronouns.optional(),
	citizenship: accountDataSchemas.citizenship,
	skin: z.file().optional(),
	skinName: accountDataSchemas.name.optional(),
	haveLicense: accountDataSchemas.haveLicense.optional(),
});
export const finishRegistration = form(
	accountDataSchema,
	async (
		{ name, password, contact, citizenship, skin, pronouns, haveLicense, skinName },
		invalid,
	) => {
		await setTimeout(1000);
		const { cookies } = getRequestEvent();
		if (await checkNameInDB(name)) {
			return invalid.name("Имя уже занято.");
		}
		let uuid;
		if (haveLicense === true) {
			uuid = constructPlayerUuid(name);
		} else {
			uuid = constructPlayerUuid(`OfflinePlayer:${name}`);
		}
		const hashedPassword = await Bun.password.hash(password, {
			algorithm: "bcrypt",
			cost: 10,
		});
		if (skin) {
			if (skin.size > 10 * 1000) {
				invalid(invalid.skin("Слишком большой файл скина"));
			}
			const skinFile = Bun.file(path.join(SKINS_PATH, `${name}.png`));
			skinFile.write(await skin.bytes());
		}
		const dbRequest = await db.insert(playersTable).values({
			uuid: uuid,
			name: name,
			password: hashedPassword,
			skin: skin ? `${PUBLIC_SKINS_PREFIX + name}.png` : skinName,
			citizenship: {
				code: citizenship,
				date: 0,
				protocol: "-",
				address: "-",
			},
			pronouns: pronouns,
			contact: contact,
			issueDate: new Date(),
			isActivated: false,
			haveLicense: haveLicense === true,
		});
		if (dbRequest) {
			const sessionId = nanoid();
			await db.insert(sessionsTable).values({
				id: sessionId,
				name: name,
			});
			cookies.set("session", sessionId, {
				httpOnly: true,
				path: "/",
				secure: false,
				maxAge: 60 * 60 * 24 * 90, //90 days
			});
			return redirect(303, "/profile");
		} else {
			return error(401, "Произошла неизвестная ошибка.");
		}
	},
);
