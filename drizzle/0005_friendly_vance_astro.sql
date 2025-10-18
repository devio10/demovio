CREATE TABLE "notify_subscriptions" (
	"receiverName" text NOT NULL,
	"targetName" text NOT NULL,
	"lastSent" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "push_subscriptions" DROP CONSTRAINT "push_subscriptions_name_players_name_fk";
--> statement-breakpoint
ALTER TABLE "push_subscriptions" ADD COLUMN "receiverName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "notify_subscriptions" ADD CONSTRAINT "notify_subscriptions_receiverName_players_name_fk" FOREIGN KEY ("receiverName") REFERENCES "public"."players"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notify_subscriptions" ADD CONSTRAINT "notify_subscriptions_targetName_players_name_fk" FOREIGN KEY ("targetName") REFERENCES "public"."players"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "push_subscriptions" ADD CONSTRAINT "push_subscriptions_receiverName_players_name_fk" FOREIGN KEY ("receiverName") REFERENCES "public"."players"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "push_subscriptions" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "push_subscriptions" DROP COLUMN "lastSent";