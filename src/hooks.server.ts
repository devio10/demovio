import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, cookies } = event;
	locals.loggedIn = Boolean(cookies.get("session"));
	const response = await resolve(event);
	return response;
};
