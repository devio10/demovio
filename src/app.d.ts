import type { PlayerData } from "$lib/server/db/schema";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			loggedIn: boolean;
			playerData?: PlayerData;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
