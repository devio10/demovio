import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import crypto from "crypto";
import { z } from "zod";
import { demovioStateCodes } from "$lib/components/demovio-states";

const accountDataSchemas = {
	name: z
		.string()
		.min(2, "Минимум 2 символа")
		.max(15, "Максимум 15 символов")
		.regex(/^[a-zA-Z_][a-zA-Z0-9_]+$/, "Неправильный формат имени"),
	password: z.string().min(8, "Минимум 8 символов").max(256, "Максимум 256 символов"),
	contact: z
		.string()
		.min(5)
		.max(32)
		.regex(/^(?!_)(?!.*__)[a-zA-Z0-9_]+(?<!_)$/),
	pronouns: z.string().min(2).max(16),
	citizenship: z.enum(demovioStateCodes),
	skin: z.string().nullable(),
	haveLicense: z.coerce.boolean(),
};
const accountDataSchema = z.object(accountDataSchemas);

async function checkNameInDB(name: string): Promise<boolean> {
	const existingPlayer = await db.query.playersTable.findFirst({
		where: eq(playersTable.name, name),
	});
	return !!existingPlayer;
}
function constructOfflinePlayerUuid(username: string) {
	const md5 = crypto.createHash("md5").update(username, "utf8").digest();
	const bytes = Buffer.from(md5);
	bytes[6] = (bytes[6] & 0x0f) | 0x30;
	bytes[8] = (bytes[8] & 0x3f) | 0x80;
	const hex = bytes.toString("hex");

	return hex;
}

export const actions: Actions = {
	async checkNameAvailability({ request }) {
		const formData = await request.formData();
		const bodyParsing = await accountDataSchemas.name.safeParseAsync(formData.get("playername"));
		if (bodyParsing.success) {
			const name = bodyParsing.data;
			if (await checkNameInDB(name)) {
				return fail(409, { error: { nameTaken: "Имя уже занято." } });
			}
			return { success: true };
		} else {
			const error = bodyParsing.error;
			return fail(400, { error: { nameTaken: z.prettifyError(error) } });
		}
	},
	async checkPassword({ request }) {
		const formData = await request.formData();
		const bodyParsing = await accountDataSchemas.password.safeParseAsync(formData.get("password"));
		if (bodyParsing.success) {
			return { success: true };
		} else {
			const error = bodyParsing.error;
			return fail(400, { error: { nameTaken: z.prettifyError(error) } });
		}
	},
	async finishRegistration({ request }) {
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
			return fail(400, { error: { nameToken: z.prettifyError(bodyParsing.error) } });
		}
		const body = bodyParsing.data;
		if (await checkNameInDB(body.name)) {
			return fail(409, { error: "Имя уже занято." });
		}
		let uuid;
		if (formData.get("haveLicense") === "true") {
			uuid = constructOfflinePlayerUuid(body.name);
		} else {
			uuid = constructOfflinePlayerUuid(`OfflinePlayer:${body.name}`);
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
		console.log("missi");
		if (dbRequest) {
			return { success: true };
		} else {
			return { error: "lol" };
		}
	},
};
