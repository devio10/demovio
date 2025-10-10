import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
export const actions: Actions = {
	logout: ({ cookies }) => {
		cookies.delete("session", { path: "/" });
		return redirect(303, "/");
	},
};
