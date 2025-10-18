CREATE TABLE "push_subscriptions" (
	"endpoint" text PRIMARY KEY NOT NULL,
	"p256dh" text NOT NULL,
	"name" text NOT NULL,
	"auth" text NOT NULL,
	"expiresAt" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "push_subscriptions" ADD CONSTRAINT "push_subscriptions_name_players_name_fk" FOREIGN KEY ("name") REFERENCES "public"."players"("name") ON DELETE no action ON UPDATE no action;