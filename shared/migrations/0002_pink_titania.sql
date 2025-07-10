CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text,
	`name` text,
	`github_id` text,
	`createdAt` integer DEFAULT '"2025-04-25T19:59:30.456Z"',
	`updatedAt` integer DEFAULT '"2025-04-25T19:59:30.456Z"'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_github_id_unique` ON `users` (`github_id`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_epocs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`image` text NOT NULL,
	`file` text NOT NULL,
	`createdAt` integer DEFAULT '"2025-04-25T19:59:30.456Z"'
);
--> statement-breakpoint
INSERT INTO `__new_epocs`("id", "title", "image", "file", "createdAt") SELECT "id", "title", "image", "file", "createdAt" FROM `epocs`;--> statement-breakpoint
DROP TABLE `epocs`;--> statement-breakpoint
ALTER TABLE `__new_epocs` RENAME TO `epocs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;