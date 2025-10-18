import type { DemovioStateCode } from "$lib/components/demovio-states";
import { relations } from "drizzle-orm";
import { serial, pgTable, text, jsonb, boolean, timestamp, integer } from "drizzle-orm/pg-core";

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
	subscriptionFrequency: integer().default(60 * 60 * 12),
});

export const sessionsTable = pgTable("sessions", {
	id: text().primaryKey(),
	name: text()
		.notNull()
		.references(() => playersTable.name),
});
export const sessionRelations = relations(sessionsTable, ({ one }) => ({
	player: one(playersTable, {
		fields: [sessionsTable.name],
		references: [playersTable.name],
		relationName: "player",
	}),
}));

export const notifySubscriptionsTable = pgTable("notify_subscriptions", {
	receiverName: text()
		.notNull()
		.references(() => playersTable.name),
	targetName: text()
		.notNull()
		.references(() => playersTable.name),
	lastSent: timestamp({
		mode: "date",
		withTimezone: true,
	}),
});

export const pushSubscriptionsTable = pgTable("push_subscriptions", {
	endpoint: text().primaryKey(),
	p256dh: text().notNull(),
	auth: text().notNull(),
	receiverName: text()
		.notNull()
		.references(() => playersTable.name),
	expiresAt: timestamp({
		mode: "date",
		withTimezone: true,
	}),
});
export const PushSubscriptionRelations = relations(pushSubscriptionsTable, ({ one }) => ({
	receiverPlayer: one(playersTable, {
		fields: [pushSubscriptionsTable.receiverName],
		references: [playersTable.name],
		relationName: "pushReceiverPlayer",
	}),
}));
export const notifySubscriptionsRelations = relations(notifySubscriptionsTable, ({ one }) => ({
	receiverPlayer: one(playersTable, {
		fields: [notifySubscriptionsTable.receiverName],
		references: [playersTable.name],
		relationName: "notifyReceiverPlayer",
	}),
	targetPlayer: one(playersTable, {
		fields: [notifySubscriptionsTable.targetName],
		references: [playersTable.name],
		relationName: "notifyTargetPlayer",
	}),
}));
export const playerRelations = relations(playersTable, ({ many }) => ({
	sessions: many(sessionsTable),
	notifySubscribers: many(notifySubscriptionsTable),
	notifySubscriptions: many(notifySubscriptionsTable),
}));

export type PlayerData = typeof playersTable.$inferSelect;
