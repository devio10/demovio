import { demovioStates } from "$lib/components/demovio-states";
import { randomNum } from "$lib/scripts";
import { accountDataSchemas } from "$lib/server/data-schemas";
import { db } from "$lib/server/db";
import { citizenshipApplicationsTable, playersTable } from "$lib/server/db/schema";
import { fail, type Actions } from "@sveltejs/kit";
import { differenceInDays } from "date-fns";
import z from "zod";

const citizenshipApplicationSchema = z.object({
	stateCode: accountDataSchemas.citizenship,
});
export const actions: Actions = {
	applyForCitizenship: async ({ locals, request }) => {
		if (!locals.playerData) {
			return fail(401);
		}
		const daysDifference = differenceInDays(new Date(), locals.playerData.citizenship.date);
		if (daysDifference < 30) {
			return fail(403, {
				error: {
					tooEarly: `Смена гражданства будет доступна через следующее количество дней: ${30 - daysDifference}.`,
				},
			});
		}
		const formData = await request.formData();
		const bodyParsing = await citizenshipApplicationSchema.safeParseAsync({
			stateCode: formData.get("stateCode"),
		});
		if (!bodyParsing.success) {
			return fail(400, { error: { wrongData: z.prettifyError(bodyParsing.error) } });
		}
		const body = bodyParsing.data;
		const currentState = demovioStates.find((state) => state.shortCode === body.stateCode);
		if (!currentState) {
			return fail(404, { error: { wrongData: "Штат не найден." } });
		}
		if (locals.playerData.citizenship.code === body.stateCode) {
			return fail(409, { error: { alreadyCitizen: "Вы уже гражданин этого штата." } });
		}
		await db.insert(citizenshipApplicationsTable).values({
			accepted: currentState.autoAcceptSwitch === true,
			playerName: locals.playerData.name,
			previousCitizenship: locals.playerData.citizenship,
			acceptanceDate: currentState.autoAcceptSwitch === true ? new Date() : null,
		});
		if (currentState.autoAcceptSwitch === true) {
			await db.update(playersTable).set({
				citizenship: {
					code: body.stateCode,
					date: new Date(),
					protocol: `№0${demovioStates.indexOf(currentState)}:${randomNum(1000, 9999)}`,
					address: "-",
				},
			});
			console.log("acceptik");
			return { accepted: true };
		}
		console.log("successik");
		return { success: true };
	},
};
