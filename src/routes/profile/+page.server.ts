import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
export const actions: Actions = {
	logout: ({ cookies }) => {
		cookies.delete("session", {
			path: "/",
			secure: false,
			httpOnly: true,
		});
		return redirect(303, "/");
	},
};
