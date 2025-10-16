import { getFullInfo } from "@hloth/minecraft-query";

export async function getDemovioStatus() {
	try {
		// const q = await getFullInfo({ hostname: "demovio.love", retries: 10 });
		const q = { players: ["devio10"] };

		return q;
	} catch (e) {
		console.error(e);
		return false;
	}
}
