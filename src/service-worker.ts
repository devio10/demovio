/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />

import z from "zod";

const self = globalThis.self as unknown as ServiceWorkerGlobalScope;

self.addEventListener("push", function (event) {
	if (!event.data) return;
	const data = z.object({ name: z.string(), pronouns: z.string() }).parse(event.data.json());
	let verb = "зашли";
	if (data.pronouns === "он/его") {
		verb = "зашёл";
	} else if (data.pronouns === "она/её") {
		verb = "зашла";
	}
	event.waitUntil(
		self.registration.showNotification("Demovio", {
			body: `${data.name} только что ${verb} на сервер Demovio.`,
			dir: "ltr",
			lang: "ru",
			icon: "https://blog.hloth.dev/notifications-icon.png",
			badge: "https://blog.hloth.dev/notifications-badge.svg",
			// data: {  },
			// image: data.image,
		}),
	);
});

self.addEventListener("notificationclick", function (event) {
	event.notification.close();
	self.clients.openWindow(event.notification.data.url);
});
