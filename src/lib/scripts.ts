export function getSkinURL(skin: string | undefined | null, name: string) {
	skin = skin === null || skin === "" || !skin ? name : skin;
	return skin.includes("skins/")
		? `https://demovio.love/${skin}`
		: `https://mc-heads.net/skin/${skin}.png`;
}
