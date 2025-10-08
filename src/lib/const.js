import { PUBLIC_NODE_ENV } from "$env/static/public";
export let api_url =
	PUBLIC_NODE_ENV === "development" ? "https://demovio.love/request/" : "request/";
