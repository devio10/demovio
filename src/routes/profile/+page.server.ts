import { redirect, type ServerLoad } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const load: ServerLoad = ({ locals }) => {
	if (!locals.loggedIn) {
		return redirect(303, "/login");
	}
};

export const actions: Actions = {
	default: ({ cookies }) => {
		cookies.delete("session", { path: "/" });
	},
};
