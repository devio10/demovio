ALTER TABLE "players" ADD COLUMN "getTelegramNotifications" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "notificationsInvites" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "notificationsServerUpdates" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "notificationsPlayersActivity" boolean DEFAULT false;