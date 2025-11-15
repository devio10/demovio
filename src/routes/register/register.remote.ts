import { form } from "$app/server";
import { accountDataSchemas } from "$lib/server/data-schemas";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { constructPlayerUuid } from "$lib/server/generateUUID";
import { setTimeout } from "timers/promises";
import { checkNameInDB } from "./+page.server";
import { fail } from "assert";
import z from "zod";

const accountDataSchema = z.object({
	name: accountDataSchemas.name,
	password: accountDataSchemas.password,
	contact: accountDataSchemas.contact,
	pronouns: accountDataSchemas.pronouns.optional(),
	citizenship: accountDataSchemas.citizenship,
	skin: accountDataSchemas.skin.optional(),
	haveLicense: accountDataSchemas.haveLicense,
});
export const finishRegistration = form(
	accountDataSchema,
	async ({ name, password, contact, citizenship, skin, pronouns, haveLicense }, invalid) => {
		await setTimeout(1000);
		const formData = await request.formData();
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
);
