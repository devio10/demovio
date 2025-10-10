import { relations } from "drizzle-orm";
import { int, sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const playersTable = sqliteTable("players", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull().unique(),
	password: text().notNull(),
	skin: text().notNull(),
	citizenship: text({
		mode: "json",
	})
		.$type<{
			code: string;
			date: number;
			protocol: string;
			address: string;
		}>()
		.notNull(),
	pronouns: text().notNull(),
	contact: text().notNull(),
	issueDate: text().notNull(),
	isActivated: integer().notNull(),
});

export const playerRelations = relations(playersTable, ({ many }) => ({
	sessions: many(sessionsTable),
}));

export const sessionsTable = sqliteTable("sessions", {
	id: text().primaryKey(),
	name: text()
		.notNull()
		.references(() => playersTable.name),
});

export const sessionRelations = relations(sessionsTable, ({ one }) => ({
	player: one(playersTable, { fields: [sessionsTable.name], references: [playersTable.name] }),
}));

export type PlayerData = typeof playersTable.$inferSelect;
