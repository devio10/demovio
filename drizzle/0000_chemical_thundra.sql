CREATE TABLE "players" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" text NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	"skin" text,
	"citizenship" jsonb NOT NULL,
	"pronouns" text NOT NULL,
	"contact" text NOT NULL,
	"issueDate" timestamp with time zone NOT NULL,
	"isActivated" boolean NOT NULL,
	"description" text,
	"isBanned" boolean DEFAULT false,
	"favorites" jsonb DEFAULT '[]'::jsonb NOT NULL,
	CONSTRAINT "players_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_name_players_name_fk" FOREIGN KEY ("name") REFERENCES "public"."players"("name") ON DELETE no action ON UPDATE no action;