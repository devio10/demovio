import { redirect, type ServerLoad } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const load: ServerLoad = ({ locals }) => {
	if (locals.loggedIn) {
		return redirect(303, "/");
	}
	return { loggedIn: locals.loggedIn };
};

export const actions: Actions = {
	default: ({ locals, cookies }) => {
		if (locals.loggedIn) {
			return redirect(303, "/");
		}
		cookies.set("session", "piss", { httpOnly: true, path: "/" });
	},
};
