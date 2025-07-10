PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_epocs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`image` text NOT NULL,
	`file` text NOT NULL,
	`user` integer NOT NULL,
	`createdAt` integer DEFAULT '"2025-04-27T08:12:19.332Z"',
	FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_epocs`("id", "title", "image", "file", "user", "createdAt") SELECT "id", "title", "image", "file", "user", "createdAt" FROM `epocs`;--> statement-breakpoint
DROP TABLE `epocs`;--> statement-breakpoint
ALTER TABLE `__new_epocs` RENAME TO `epocs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_roles` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`quota` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_roles`("id", "name", "quota") SELECT "id", "name", "quota" FROM `roles`;--> statement-breakpoint
DROP TABLE `roles`;--> statement-breakpoint
ALTER TABLE `__new_roles` RENAME TO `roles`;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text,
	`password_hash` text,
	`name` text,
	`github_id` text,
	`avatar_url` text,
	`role_id` integer DEFAULT 1 NOT NULL,
	`createdAt` integer DEFAULT '"2025-04-27T08:12:19.332Z"',
	`updatedAt` integer DEFAULT '"2025-04-27T08:12:19.332Z"',
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "password_hash", "name", "github_id", "avatar_url", "role_id", "createdAt", "updatedAt") SELECT "id", "email", "password_hash", "name", "github_id", "avatar_url", "role_id", "createdAt", "updatedAt" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_github_id_unique` ON `users` (`github_id`);