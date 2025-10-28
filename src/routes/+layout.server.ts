import type { PlayerData } from "$lib/server/db/schema";
import type { LayoutServerLoad } from "./$types";
export type Profile = Pick<
	PlayerData,
	| "name"
	| "id"
	| "uuid"
	| "skin"
	| "pronouns"
	| "description"
	| "citizenship"
	| "contact"
	| "issueDate"
	| "favorites"
	| "isActivated"
	| "isBanned"
	| "administrator"
>;
export const load: LayoutServerLoad = async ({ locals }) => {
	const player = locals.playerData;
	if (!player) {
		return {};
	}

	const profile: Profile = {
		name: player.name,
		uuid: player.uuid,
		id: player.id,
		skin: player.skin,
		pronouns: player.pronouns,
		description: player.description,
		citizenship: player.citizenship,
		contact: player.contact,
		issueDate: player.issueDate,
		favorites: player.favorites,
		isActivated: player.isActivated,
		isBanned: player.isBanned,
		administrator: player.administrator,
	};
	return {
		profile,
	};
};
