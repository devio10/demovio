export async function handle({ event, resolve, locals }) {
	const response = await resolve(event);
	return response;
}
