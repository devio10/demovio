import type { DemovioStateCode } from "$lib/components/demovio-states";
import { relations } from "drizzle-orm";
import { serial, pgTable, text, jsonb, boolean, timestamp } from "drizzle-orm/pg-core";

export const playersTable = pgTable("players", {
	id: serial().primaryKey(),
	uuid: text().notNull(),
	name: text().notNull().unique(),
	password: text().notNull(),
	skin: text(),
	citizenship: jsonb()
		.$type<{
			code: DemovioStateCode;
			date: number;
			protocol: string;
			address: string;
		}>()
		.notNull(),
	lastOnline: timestamp({
		mode: "date",
		withTimezone: true,
	}),
	pronouns: text().notNull(),
	contact: text().notNull(),
	issueDate: timestamp({
		mode: "date",
		withTimezone: true,
	}).notNull(),
	isActivated: boolean().notNull(),
	description: text(),
	isBanned: boolean().default(false),
	favorites: jsonb().$type<string[]>().notNull().default([]),
});

export const playerRelations = relations(playersTable, ({ many }) => ({
	sessions: many(sessionsTable),
}));

export const sessionsTable = pgTable("sessions", {
	id: text().primaryKey(),
	name: text()
		.notNull()
		.references(() => playersTable.name),
});

export const sessionRelations = relations(sessionsTable, ({ one }) => ({
	player: one(playersTable, { fields: [sessionsTable.name], references: [playersTable.name] }),
}));

export type PlayerData = typeof playersTable.$inferSelect;
