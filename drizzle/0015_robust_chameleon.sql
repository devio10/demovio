CREATE TABLE "rate_limits" (
	"id" serial PRIMARY KEY NOT NULL,
	"invokerId" integer NOT NULL,
	"actionType" text NOT NULL,
	"data" jsonb NOT NULL,
	"time" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "rate_limits" ADD CONSTRAINT "rate_limits_invokerId_players_id_fk" FOREIGN KEY ("invokerId") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;