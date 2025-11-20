import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

import { z } from "zod";
import { accountDataSchemas } from "$lib/server/data-schemas";
import { setTimeout } from "timers/promises";

const checkNameInDB = async (name: string): Promise<boolean> => {
	const existingPlayer = await db.query.playersTable.findFirst({
		where: eq(playersTable.name, name),
	});
	return !!existingPlayer;
};

export const actions: Actions = {
	async checkNameAvailability({ request }) {
		await setTimeout(750);
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
		await setTimeout(500);
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
		await setTimeout(500);
		const formData = await request.formData();
		const bodyParsing = await accountDataSchemas.pronouns
			.nullable()
			.safeParseAsync(formData.get("pronouns"));
		if (bodyParsing.success) {
			return { success: true };
		} else {
			const error = bodyParsing.error;
			return fail(400, { error: { invalidPronouns: z.treeifyError(error).errors[0] } });
		}
	},
};
