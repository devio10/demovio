import { redirect, type ServerLoad } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const load: ServerLoad = ({ locals }) => {
	const player = locals.playerData;
	if (!player) {
		return redirect(303, "/login");
	}
	return {
		profile: {
			name: player.name,
			skin: player.skin,
			pronouns: player.pronouns,
			citizenship: player.citizenship,
			contact: player.contact,
			issueDate: player.issueDate,
		},
	};
};

export const actions: Actions = {
	default: ({ cookies }) => {
		cookies.delete("session", { path: "/" });
		return redirect(303, "/");
	},
};
