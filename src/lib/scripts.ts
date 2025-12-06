import { createContext } from "svelte";
import type { EasingFunction, TransitionConfig } from "svelte/transition";

export function getSkinURL(skin: string | undefined | null, name: string | undefined) {
	skin = skin === null || skin === "" || !skin || skin === undefined ? name : skin;
	let output = "skins/default.png";
	if (skin) {
		output = skin.includes("skins/") ? `${skin}` : `https://mc-heads.net/skin/${skin}.png`;
	}
	return output;
}
export enum NotificationType {
	playerJoinedTheGame,
	invitationFromPlayer,
	serverUpdate,
	accountBanned,
	accountActivated,
	other,
}
export const hide = (
	node: HTMLElement,
	{ delay, duration, easing }: { delay?: number; duration?: number; easing?: EasingFunction },
): TransitionConfig => {
	return {
		delay,
		duration,
		easing,
		css: (t) => {
			return `height: ${72 * t}px; opacity: ${t}`;
		},
	};
};

export const [getHeaderHeightContext, setHeaderHeightContext] = createContext<{
	headerHeight: number;
}>();
export const [getContentScrollContext, setContentScrollContext] = createContext<{
	contentScroll: number;
}>();

export function randomNum(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
