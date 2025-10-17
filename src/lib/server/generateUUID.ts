import crypto from "crypto";
export function constructPlayerUuid(username: string) {
	const md5 = crypto.createHash("md5").update(username, "utf8").digest();
	const bytes = Buffer.from(md5);
	bytes[6] = (bytes[6] & 0x0f) | 0x30;
	bytes[8] = (bytes[8] & 0x3f) | 0x80;
	const hex = bytes.toString("hex");

	return hex;
}
