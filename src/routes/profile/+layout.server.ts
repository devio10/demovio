import { redirect, type ServerLoad } from "@sveltejs/kit";
import type { PlayerData } from "$lib/server/db/schema";
export type Profile = Pick<
	PlayerData,
	"name" | "id" | "uuid" | "skin" | "pronouns" | "citizenship" | "contact" | "issueDate"
>;
export const load: ServerLoad = ({ locals }) => {
	const player = locals.playerData;
	if (!player) {
		return redirect(303, "/login");
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
	};
	return {
		profile,
	};
};
