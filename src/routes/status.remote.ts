import { query } from "$app/server";
import { getDemovioStatus } from "$lib/server/minecraft-status";

export const getCurrentDemovioStatus = query(async () => {
	return await getDemovioStatus();
});
