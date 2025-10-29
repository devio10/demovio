CREATE TABLE "citizenship_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"playerName" text NOT NULL,
	"accepted" boolean NOT NULL,
	"acceptanceDate" timestamp with time zone,
	"desiredCitizenship" text,
	"creationDate" timestamp with time zone,
	"note" text,
	"previousCitizenship" jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "citizenship_applications" ADD CONSTRAINT "citizenship_applications_playerName_players_name_fk" FOREIGN KEY ("playerName") REFERENCES "public"."players"("name") ON DELETE no action ON UPDATE no action;