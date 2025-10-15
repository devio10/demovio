import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
export const load: LayoutServerLoad = async ({ fetch }) => {
	async function getPlayers() {
		try {
			const req = await fetch(`https://demovio.love/request/players.php`, {
				signal: AbortSignal.timeout(8000),
			});
			if (!(req.status >= 200 && req.status < 300)) {
				throw new Error("Failed to fetch: " + req.status);
			}
			const data = await req.json();
			if (data.error) {
				throw new Error(data.error);
			}
			return data;
		} catch (e) {
			console.error(e);
			if (e instanceof Error) {
				return error(500);
			}
		}
	}
	return { players: getPlayers() };
};
