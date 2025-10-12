export function getSkinURL(skin: string, name: string) {
	skin = skin === "" ? name : skin;
	return skin.includes("skins/")
		? `https://demovio.love/${skin}`
		: `https://mc-heads.net/skin/${skin}.png`;
}
