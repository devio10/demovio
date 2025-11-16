import type { DemovioStateCode } from "$lib/components/demovio-states";
import { relations } from "drizzle-orm";
import { serial, pgTable, text, jsonb, boolean, timestamp, integer } from "drizzle-orm/pg-core";

export const playersTable = pgTable("players", {
	id: serial().primaryKey(),
	uuid: text().notNull(),
	name: text().notNull().unique(),
	password: text().notNull(),
	skin: text(),
	appliedSkin: boolean().default(false),
	citizenship: jsonb()
		.$type<{
			code: DemovioStateCode;
			date: Date | number;
			protocol: string;
			address: string;
		}>()
		.notNull(),
	lastOnline: timestamp({
		mode: "date",
		withTimezone: true,
	}),
	currentlyOnline: boolean().default(false),
	pronouns: text(),
	contact: text().notNull(),
	getTelegramNotifications: boolean().default(false),
	notificationsInvites: boolean().default(false),
	notificationsServerUpdates: boolean().default(false),
	notificationsPlayersActivity: boolean().default(false),
	issueDate: timestamp({
		mode: "date",
		withTimezone: true,
	}).notNull(),
	isActivated: boolean().notNull(),
	description: text(),
	administrator: boolean().default(false),
	isBanned: boolean().default(false),
	favorites: jsonb().$type<string[]>().notNull().default([]),
	subscriptionFrequency: integer().default(60 * 60 * 12),
	lastDownloadedBuild: jsonb().$type<{
		version: string;
		minimap: boolean;
		optimized: boolean;
	} | null>(),
	haveLicense: boolean().default(false),
});

export const citizenshipApplicationsTable = pgTable("citizenship_applications", {
	id: serial().primaryKey(),
	playerName: text()
		.notNull()
		.references(() => playersTable.name),
	accepted: boolean().notNull(),
	acceptanceDate: timestamp({ mode: "date", withTimezone: true }),
	desiredCitizenship: text().$type<DemovioStateCode>(),
	creationDate: timestamp({ mode: "date", withTimezone: true }),
	note: text(),
	previousCitizenship: jsonb()
		.$type<{
			code: DemovioStateCode;
			date: Date | number;
			protocol: string;
			address: string;
		}>()
		.notNull(),
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
		relationName: "session_player",
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
		relationName: "push_receiver_player",
	}),
}));
export const notifySubscriptionsRelations = relations(notifySubscriptionsTable, ({ one }) => ({
	receiverPlayer: one(playersTable, {
		fields: [notifySubscriptionsTable.receiverName],
		references: [playersTable.name],
		relationName: "notify_receiver_player",
	}),
	targetPlayer: one(playersTable, {
		fields: [notifySubscriptionsTable.targetName],
		references: [playersTable.name],
		relationName: "notify_target_player",
	}),
}));
export const playerRelations = relations(playersTable, ({ many }) => ({
	sessions: many(sessionsTable),
	notifySubscriptions: many(notifySubscriptionsTable, {
		relationName: "notify_subscriptions",
	}),
	notifySubscribers: many(notifySubscriptionsTable, {
		relationName: "notify_subscribers",
	}),
}));

export type PlayerData = typeof playersTable.$inferSelect;
