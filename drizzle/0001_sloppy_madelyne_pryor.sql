PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`skin` text,
	`citizenship` text NOT NULL,
	`pronouns` text NOT NULL,
	`contact` text NOT NULL,
	`issueDate` text NOT NULL,
	`isActivated` integer NOT NULL,
	`favorites` text DEFAULT '[]' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_players`("id", "uuid", "name", "password", "skin", "citizenship", "pronouns", "contact", "issueDate", "isActivated", "favorites") SELECT "id", "uuid", "name", "password", "skin", "citizenship", "pronouns", "contact", "issueDate", "isActivated", "favorites" FROM `players`;--> statement-breakpoint
DROP TABLE `players`;--> statement-breakpoint
ALTER TABLE `__new_players` RENAME TO `players`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `players_name_unique` ON `players` (`name`);