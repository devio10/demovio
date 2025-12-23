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
			client.on("authenticated", async () => {
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

export const rconExecuteCommand = async (command: string) => {
	try {
		return await new Promise<boolean>((resolve, reject) => {
			const client = new RCONClient("demovio.love", RCON_PASSWORD, 10511);
			client.connect();
			client.on("authenticated", async () => {
				console.log(`Выполнена команда на сервере: ${command}`);
				client.executeCommand(command);
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

export const rconBanPlayer = async (playerName: string, value: boolean | undefined) => {
	try {
		return await new Promise<boolean>((resolve, reject) => {
			const client = new RCONClient("demovio.love", RCON_PASSWORD, 10511);
			client.connect();
			client.on("authenticated", async () => {
				client.executeCommand(`easy${value === true ? "ban" : "pardon"} ${playerName}`);
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
export const rconWhitelistPlayer = async (playerName: string) => {
	try {
		return await new Promise<boolean>((resolve, reject) => {
			const client = new RCONClient("demovio.love", RCON_PASSWORD, 10511);
			client.connect();
			client.on("authenticated", async () => {
				client.executeCommand(`easywhitelist add ${playerName}`);
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
