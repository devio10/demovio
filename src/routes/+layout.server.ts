import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, depends }) => {
	depends("app:user:profile");
	const player = locals.playerData;
	return {
		profile: player
			? {
					name: player.name,
					uuid: player.uuid,
					id: player.id,
					skin: player.skin,
					pronouns: player.pronouns,
					description: player.description,
					citizenship: player.citizenship,
					contact: player.contact,
					issueDate: player.issueDate,
					favorites: player.favorites,
					isActivated: player.isActivated,
					isBanned: player.isBanned,
					administrator: player.administrator,
				}
			: null,
	};
};
