import { getFullInfo } from "@hloth/minecraft-query";

export async function getDemovioStatus() {
	try {
		const q = await getFullInfo("demovio.love");
		return q;
	} catch (e) {
		console.error(e);
		return false;
	}
}
