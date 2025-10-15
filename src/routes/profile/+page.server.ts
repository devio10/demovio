import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
export const actions: Actions = {
	logout: ({ cookies }) => {
		cookies.delete("session", { path: "/" });
		return redirect(303, "/");
	},
};

export const load: PageServerLoad = async ({ locals }) => {
	const player = locals.playerData;
	if (!player) {
		return redirect(303, "/login");
	}
};
