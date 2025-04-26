import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const epocs = sqliteTable("epocs", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    image: text("image").notNull(),
    file: text("file").notNull(),
    user: integer("user")
        .references(() => users.id)
        .notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).default(new Date()),
});

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").unique(),
    passwordHash: text("password_hash"),
    name: text("name"),
    github_id: text("github_id").unique(),
    avatarUrl: text("avatar_url"),
    createdAt: integer("createdAt", { mode: "timestamp" }).default(new Date()),
    updatedAt: integer("updatedAt", { mode: "timestamp" })
        .default(new Date())
        .$onUpdate(() => new Date()),
});

export const epocInsertSchema = createInsertSchema(epocs, {
    user: (schema) => schema.optional(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

export const registerSchema = loginSchema.extend({});
