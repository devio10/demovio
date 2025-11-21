import { RCON_PASSWORD } from "$env/static/private";
import { RCONClient } from "@minecraft-js/rcon";

export const applyPlayerSkin = async (
	playerName: string,
	skin: string,
	skinType: string | undefined,
) => {
	try {
		return await new Promise<boolean>((resolve, reject) => {
			const client = new RCONClient("demovio.love", RCON_PASSWORD, 10511);
			client.connect();
			console.log("tap tap tap");
			client.on("authenticated", async () => {
				console.log("beaam");
				client.executeCommand(`execute as ${playerName} run skin set ${skinType} ${skin}`);
				resolve(true);
			});
			client.on("error", () => {
				reject(new Error("Ошибка при подключении к серверу"));
			});
		});
	} catch (e) {
		console.log(e);
		return false;
	}
};
