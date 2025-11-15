import { demovioStateCodes } from "$lib/components/demovio-states";
import { noNullCharacter } from "$lib/utils";
import z from "zod";
export const accountDataSchemas = {
	name: z
		.string()
		.min(2, "Минимум 2 символа")
		.max(15, "Максимум 15 символов")
		.regex(/^[a-zA-Z_][a-zA-Z0-9_]+$/, "Неправильный формат имени"),
	password: z.string().min(8, "Минимум 8 символов").max(256, "Максимум 256 символов"),
	contact: z
		.string()
		.min(5)
		.max(32)
		.regex(/^(?!_)(?!.*__)[a-zA-Z0-9_]+(?<!_)$/),
	pronouns: z.string().min(2).max(16).refine(noNullCharacter, "Запрещённый символ"),
	citizenship: z.enum(demovioStateCodes),
	skin: z.string().refine(noNullCharacter, "Запрещённый символ"),
	haveLicense: z.boolean(),
	description: z
		.string()
		.max(256, "Максимум 256 символов")
		.refine(noNullCharacter, "Запрещённый символ"),
};
