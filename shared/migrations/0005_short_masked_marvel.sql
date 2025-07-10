PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_epocs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`image` text NOT NULL,
	`file` text NOT NULL,
	`user` integer NOT NULL,
	`createdAt` integer DEFAULT '"2025-04-25T20:09:26.627Z"',
	FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_epocs`("id", "title", "image", "file", "user", "createdAt") SELECT "id", "title", "image", "file", "user", "createdAt" FROM `epocs`;--> statement-breakpoint
DROP TABLE `epocs`;--> statement-breakpoint
ALTER TABLE `__new_epocs` RENAME TO `epocs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text,
	`name` text,
	`github_id` text,
	`avatar_url` text,
	`createdAt` integer DEFAULT '"2025-04-25T20:09:26.628Z"',
	`updatedAt` integer DEFAULT '"2025-04-25T20:09:26.628Z"'
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "name", "github_id", "avatar_url", "createdAt", "updatedAt") SELECT "id", "email", "name", "github_id", "avatar_url", "createdAt", "updatedAt" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_github_id_unique` ON `users` (`github_id`);