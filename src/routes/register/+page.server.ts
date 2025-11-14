import { db } from "$lib/server/db";
import { playersTable, sessionsTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

import { z } from "zod";
import { accountDataSchemas } from "$lib/server/data-schemas";
import { constructPlayerUuid } from "$lib/server/generateUUID";
import { nanoid } from "nanoid";
import { setTimeout } from "timers/promises";

const accountDataSchema = z.object({
	name: accountDataSchemas.name,
	password: accountDataSchemas.password,
	contact: accountDataSchemas.contact,
	pronouns: accountDataSchemas.pronouns.nullable(),
	citizenship: accountDataSchemas.citizenship,
	skin: accountDataSchemas.skin.nullable(),
	haveLicense: accountDataSchemas.haveLicense,
});

async function checkNameInDB(name: string): Promise<boolean> {
	const existingPlayer = await db.query.playersTable.findFirst({
		where: eq(playersTable.name, name),
	});
	return !!existingPlayer;
}

export const actions: Actions = {
	async checkNameAvailability({ request }) {
		// await setTimeout(1200);
		const formData = await request.formData();
		const bodyParsing = await accountDataSchemas.name.safeParseAsync(formData.get("playername"));
		if (bodyParsing.success) {
			const name = bodyParsing.data;
			if ((await checkNameInDB(name)) || name === "default") {
				return fail(409, { error: { nameTaken: "Имя уже занято." } });
			}
			return { success: true };
		} else {
			const error = bodyParsing.error;
			return fail(400, { error: { nameTaken: z.treeifyError(error).errors[0] } });
		}
	},
	async checkPassword({ request }) {
		await setTimeout(750);
		const formData = await request.formData();
		const bodyParsing = await accountDataSchemas.password.safeParseAsync(formData.get("password"));
		if (bodyParsing.success) {
			return { success: true };
		} else {
			const error = bodyParsing.error;
			return fail(400, { error: { wrongPassword: z.treeifyError(error).errors[0] } });
		}
	},
	async checkPronouns({ request }) {
		await setTimeout(750);
		const formData = await request.formData();
		const bodyParsing = await accountDataSchemas.pronouns.safeParseAsync(formData.get("pronouns"));
		if (bodyParsing.success) {
			return { success: true };
		} else {
			const error = bodyParsing.error;
			return fail(400, { error: { invalidPronouns: z.treeifyError(error).errors[0] } });
		}
	},
	async finishRegistration({ request, cookies }) {
		await setTimeout(1000);
		const formData = await request.formData();
		const bodyParsing = await accountDataSchema.safeParseAsync({
			name: formData.get("playername"),
			password: formData.get("password"),
			contact: formData.get("contact"),
			pronouns: formData.get("pronouns"),
			citizenship: formData.get("citizenship"),
			skin: formData.get("skin"),
			haveLicense: formData.get("haveLicense"),
		});
		if (!bodyParsing.success) {
			console.error(bodyParsing.error);
			return fail(400, { error: { finalError: z.treeifyError(bodyParsing.error).errors[0] } });
		}
		const body = bodyParsing.data;
		if (await checkNameInDB(body.name)) {
			return fail(409, { error: { finalError: "Имя уже занято." } });
		}
		let uuid;
		if (formData.get("haveLicense") === "true") {
			uuid = constructPlayerUuid(body.name);
		} else {
			uuid = constructPlayerUuid(`OfflinePlayer:${body.name}`);
		}
		const hashedPassword = await Bun.password.hash(body.password, {
			algorithm: "bcrypt",
			cost: 10,
		});
		const dbRequest = await db.insert(playersTable).values({
			uuid: uuid,
			name: body.name,
			password: hashedPassword,
			skin: body.skin,
			citizenship: {
				code: body.citizenship,
				date: 0,
				protocol: "-",
				address: "-",
			},
			pronouns: body.pronouns,
			contact: body.contact,
			issueDate: new Date(),
			isActivated: false,
		});
		if (dbRequest) {
			const sessionId = nanoid();
			await db.insert(sessionsTable).values({
				id: sessionId,
				name: body.name,
			});
			cookies.set("session", sessionId, {
				httpOnly: true,
				path: "/",
				secure: false,
				maxAge: 60 * 60 * 24 * 90, //90 days
			});
			return redirect(303, "/profile");
		} else {
			return { error: { finalError: "Произошла неизвестная ошибка." } };
		}
	},
};
