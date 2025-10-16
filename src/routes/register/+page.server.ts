import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { Actions } from "./$types";
import { fail, isActionFailure } from "@sveltejs/kit";
import crypto from "crypto";

async function validateName(name: Bun.FormDataEntryValue | null) {
	if (typeof name !== "string") {
		return fail(400);
	}

	const checkRequest = await db.query.playersTable.findFirst({
		where: eq(playersTable.name, name),
	});
	if (checkRequest) {
		return fail(409, { error: { username: "Такой игрок уже существует." } });
	}
	return { success: true };
}
async function validatePassword(password: Bun.FormDataEntryValue | null) {
	if (typeof password !== "string") {
		return fail(400, {
			error: { wrongPassword: "Ваш пароль должен состоять из символов и цифр." },
		});
	}
	if (password.length < 8) {
		return fail(400, {
			error: { wrongPassword: "Длина вашего пароля должна быть минимум 8 символов." },
		});
	}
	return { success: true };
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
		const name = formData.get("playername");
		return await validateName(name);
	},
	async checkPassword({ request }) {
		const formData = await request.formData();
		const password = formData.get("password");
		return await validatePassword(password);
	},
	async finishRegistration({ request }) {
		const formData = await request.formData();
		const name = formData.get("playername");
		if (typeof name !== "string") {
			return fail(400);
		}
		console.log("moss");
		const nameAvailability = await validateName(name);
		console.log("piss");
		if (isActionFailure(nameAvailability)) {
			return fail(400);
		}
		console.log("pissi");
		const password = formData.get("password");
		console.log(password);
		const passwordCorrect = await validatePassword(password);
		if (isActionFailure(passwordCorrect)) {
			return fail(400);
		}
		const contact = formData.get("contact");
		if (typeof contact !== "string") {
			return fail(400);
		}
		const pronouns = formData.get("pronouns");
		if (typeof pronouns !== "string") {
			return fail(400);
		}
		const skin = formData.get("skin");
		if (typeof skin !== "string") {
			return fail(400);
		}
		const stateCode = formData.get("citizenship");
		if (typeof stateCode !== "string") {
			return fail(400);
		}
		let uuid;
		if (formData.get("haveLicense") === "true") {
			uuid = constructOfflinePlayerUuid(name);
		} else {
			uuid = constructOfflinePlayerUuid(`OfflinePlayer:${name}`);
		}
		const hashedPassword = await Bun.password.hash(password, { algorithm: "bcrypt", cost: 10 });
		const dbRequest = await db.insert(playersTable).values({
			uuid: uuid,
			name: name,
			password: hashedPassword,
			skin: skin,
			citizenship: {
				code: stateCode,
				date: 0,
				protocol: "-",
				address: "-",
			},
			pronouns: pronouns,
			contact: contact,
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
