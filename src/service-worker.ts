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
	let isSilent = false;
	switch (data.type) {
		case NotificationType.playerJoinedTheGame:
			bodyText = `${data.name} только что ${verb} на сервер Demovio.`;
			isSilent = true;
			break;
		case NotificationType.invitationFromPlayer:
			bodyText = `${data.name} приглашает вас на сервер Demovio.`;
			break;
		case NotificationType.accountBanned:
			bodyText = `Ваш аккаунт Demovio был забанен. Cвяжитесь с администратором, если хотите подать апелляцию.`;
			break;
		case NotificationType.accountActivated:
			bodyText = `Ваш аккаунт Demovio активирован! Узнайте, как начать играть на сервере.`;
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
			icon: "https://demovio.love/web-app-manifest-192x192.png",
			badge: "https://demovio.love/demovio-push_badge.svg",
			silent: isSilent,
			// data: {  },
			// image: data.image,
		}),
	);
});

self.addEventListener("notificationclick", function (event) {
	event.notification.close();
	self.clients.openWindow(event.notification.data.url);
});
