import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createUpdateSchema } from "drizzle-zod";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const epocs = sqliteTable("epocs", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    image: text("image"),
    file: text("file").notNull().unique(),
    downloads: integer("downloads").notNull().default(0),
    user: text("user")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).default(new Date()),
});

export const libraries = sqliteTable("libraries", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => generateId(16)),
    user: text("user")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull()
        .unique(),
});

export const users = sqliteTable("users", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    email: text("email").unique(),
    passwordHash: text("password_hash"),
    name: text("name").notNull(),
    github_id: text("github_id").unique(),
    google_id: text("google_id").unique(),
    avatarUrl: text("avatar_url"),
    roleId: integer("role_id")
        .references(() => roles.id)
        .notNull()
        .default(1),
    createdAt: integer("createdAt", { mode: "timestamp" }).default(new Date()),
    updatedAt: integer("updatedAt", { mode: "timestamp" })
        .default(new Date())
        .$onUpdate(() => new Date()),
});

export const roles = sqliteTable("roles", {
    id: integer("id").primaryKey({ autoIncrement: false }),
    name: text("name").notNull(),
    quota: integer("quota").notNull(),
});

export const epocInsertSchema = createInsertSchema(epocs, {
    user: (schema) => schema.optional(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

export const registerSchema = loginSchema.extend({
    name: z.string().min(2).max(100),
});

export const userUpdateSchema = z.object({
    name: z.string().optional(),
});

function generateId(length: number) {
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2))
        .join("")
        .substring(0, length);
}
