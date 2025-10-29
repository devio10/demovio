import { query } from "$app/server";
import { getDemovioStatus } from "$lib/server/minecraft-status";

export const getCurrentDemovioStatus = query(async () => {
	await new Promise((resolve) => setTimeout(resolve, 200));
	return await getDemovioStatus();
});
