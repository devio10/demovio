/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />
/// <reference types="../.svelte-kit/ambient.d.ts" />

import z from "zod";
import { NotificationType } from "./lib/scripts";

const self = globalThis.self as unknown as ServiceWorkerGlobalScope;

self.addEventListener("push", function (event) {
	if (!event.data) return;
	const data = z
		.object({
			name: z.string().optional(),
			pronouns: z.string().optional(),
			type: z.number(),
			text: z.string().optional(),
		})
		.parse(event.data.json());
	let verb = "зашли";
	if (data.pronouns === "он/его") {
		verb = "зашёл";
	} else if (data.pronouns === "она/её") {
		verb = "зашла";
	}
	let bodyText = `Тестовое уведомление.`;
	switch (data.type) {
		case NotificationType.playerJoinedTheGame:
			bodyText = `${data.name} только что ${verb} на сервер Demovio.`;
			break;
		case NotificationType.invitationFromPlayer:
			bodyText = `${data.name} приглашает вас на сервер Demovio.`;
			break;
		default:
			if (data.text) {
				bodyText = data.text;
			}
	}
	event.waitUntil(
		self.registration.showNotification("Demovio", {
			body: bodyText,
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
