import { accountDataSchemas } from "$lib/server/data-schemas";
import { db } from "$lib/server/db";
import { playersTable } from "$lib/server/db/schema";
import { fail, type Actions } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import z from "zod";

const accountDataSchema = z.object({
	description: accountDataSchemas.description,
	pronouns: accountDataSchemas.pronouns,
});
export const actions: Actions = {
	async changeData({ request, locals }) {
		if (!locals.loggedIn || !locals.playerData) {
			return fail(401);
		}
		const formData = await request.formData();
		const bodyParsing = await accountDataSchema.safeParseAsync({
			description: formData.get("description"),
			pronouns: formData.get("pronouns"),
		});
		if (!bodyParsing.success) {
			return fail(400, { error: { wrongData: z.prettifyError(bodyParsing.error) } });
		}
		const body = bodyParsing.data;
		if (formData.get("skin")) {
			console.log("skin uploaded");
		}
		const dbRequest = await db
			.update(playersTable)
			.set({
				description: body.description,
				pronouns: body.pronouns,
			})
			.where(eq(playersTable.name, locals.playerData?.name));
		if (dbRequest) {
			return { success: true };
		}
		return { error: "unknown" };
	},
};
