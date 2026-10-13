import { getFullInfo } from "@hloth/minecraft-query";

export async function getDemovioStatus() {
	try {
		const q = await getFullInfo({ hostname: "localhost", retries: 1, timeoutMs: 500 });
		// const q = { players: ["devio10", "anastasiz2009"] };

		return q;
	} catch (e) {
		console.error(e);
		return false;
	}
}
