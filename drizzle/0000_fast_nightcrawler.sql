CREATE TABLE `players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`skin` text NOT NULL,
	`citizenship` text NOT NULL,
	`pronouns` text NOT NULL,
	`contact` text NOT NULL,
	`issueDate` text NOT NULL,
	`isActivated` integer NOT NULL,
	`favorites` text DEFAULT '[]' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `players_name_unique` ON `players` (`name`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`name`) REFERENCES `players`(`name`) ON UPDATE no action ON DELETE no action
);
