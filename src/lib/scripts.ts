import { createContext } from "svelte";
import type { EasingFunction, TransitionConfig } from "svelte/transition";

export function getSkinURL(skin: string | undefined | null, name: string) {
	skin = skin === null || skin === "" || !skin ? name : skin;
	return skin.includes("skins/")
		? `https://demovio.love/${skin}`
		: `https://mc-heads.net/skin/${skin}.png`;
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
