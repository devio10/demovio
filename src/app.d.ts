import type { PlayerData } from "$lib/server/db/schema";

export type Profile = Pick<
	PlayerData,
	| "name"
	| "id"
	| "uuid"
	| "skin"
	| "pronouns"
	| "description"
	| "citizenship"
	| "contact"
	| "issueDate"
	| "favorites"
	| "isActivated"
	| "isBanned"
	| "administrator"
	| "notificationsPlayersActivity"
	| "notificationsInvites"
	| "notificationsServerUpdates"
>;

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			loggedIn: boolean;
			playerData?: PlayerData;
		}
		interface PageData {
			profile: Profile | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
