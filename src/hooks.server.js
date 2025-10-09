/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve, locals }) {
	locals.loggedIn = event.cookies.get("session");
	const response = await resolve(event);
	return response;
}
