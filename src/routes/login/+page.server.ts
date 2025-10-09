import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = ({ locals }) => {
	if (locals.loggedIn) {
		return redirect(303, "/");
	}
	return { loggedIn: locals.loggedIn };
};
