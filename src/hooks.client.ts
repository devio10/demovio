import { localPreferences } from "$lib/local-settings.svelte";
import type { ClientInit } from "@sveltejs/kit";

export const init: ClientInit = () => {
	localPreferences.backstageStatus = localStorage.getItem("backstage-status") === "true";
	localPreferences.backstageCitizenship =
		localStorage.getItem("backstage-list-residence") === "true";
	localPreferences.backstagePages = localStorage.getItem("backstage-additional-pages") === "true";
	localPreferences.showEnvironment = localStorage.getItem("show-environment") !== "false";
};
