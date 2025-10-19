import type { PlayerData } from "$lib/server/db/schema";
import { getDemovioStatus } from "$lib/server/minecraft-status";
import type { FullResponse } from "@hloth/minecraft-query";
import type { LayoutServerLoad } from "./$types";
export type Profile = Pick<
	PlayerData,
	| "name"
	| "id"
	| "uuid"
	| "skin"
	| "pronouns"
	| "citizenship"
	| "contact"
	| "issueDate"
	| "favorites"
	| "isActivated"
	| "isBanned"
>;
export const load: LayoutServerLoad = async ({ locals, depends }) => {
	const status: FullResponse | false = await getDemovioStatus();
	const player = locals.playerData;
	if (!player) {
		return { demovioStatus: status };
	}

	const profile: Profile = {
		name: player.name,
		uuid: player.uuid,
		id: player.id,
		skin: player.skin,
		pronouns: player.pronouns,
		citizenship: player.citizenship,
		contact: player.contact,
		issueDate: player.issueDate,
		favorites: player.favorites,
		isActivated: player.isActivated,
		isBanned: player.isBanned,
	};
	return {
		profile,
		demovioStatus: status,
	};
};
