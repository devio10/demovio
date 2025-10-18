import { noNullCharacter } from "$lib/utils";
import z from "zod";

export const notificationSchema = z.object({
	endpoint: z.url().refine(noNullCharacter),
	expirationTime: z
		.number()
		.nonnegative()
		.refine((t) => t > Date.now())
		.nullable()
		.default(null),
	keys: z.object({
		p256dh: z.string().min(1).max(1000).refine(noNullCharacter),
		auth: z.string().min(1).max(1000).refine(noNullCharacter),
	}),
});
